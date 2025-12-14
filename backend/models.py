from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base

class UserSource(str, enum.Enum):
    WEB = "web"
    TELEGRAM = "telegram"

class LeadStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    CLIENT = "client"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, default=UserSource.WEB)
    external_id = Column(String, index=True) # Telegram ID or UUID for web
    name = Column(String, nullable=True)
    username = Column(String, nullable=True) # Telegram username
    phone = Column(String, nullable=True)
    niche = Column(String, nullable=True)
    language = Column(String, default="ru")
    notes = Column(Text, nullable=True)
    lead_status = Column(String, default=LeadStatus.NEW)
    created_at = Column(DateTime, default=datetime.utcnow)

    messages = relationship("Message", back_populates="user", cascade="all, delete-orphan")

class Prompt(Base):
    __tablename__ = "prompts"

    id = Column(Integer, primary_key=True, index=True)
    channel = Column(String, unique=True) # web, telegram
    content = Column(Text)
    description = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    role = Column(String) # user, assistant, system
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="messages")
