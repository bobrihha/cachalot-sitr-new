from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
import os

# Ensure the backend directory exists for the db file
DATABASE_URL = "sqlite+aiosqlite:///./cachalot.db"

engine = create_async_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}, # Needed for SQLite
    echo=False
)

SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with SessionLocal() as session:
        yield session
