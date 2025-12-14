from fastapi import FastAPI, Depends, HTTPException, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security.api_key import APIKeyHeader
from starlette.status import HTTP_403_FORBIDDEN
from fastapi import APIRouter # Added APIRouter
from dotenv import load_dotenv
import os

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "../.env"))
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from .database import get_db
from .schemas import ChatRequest, PromptUpdate, Prompt as PromptSchema
from .services import UserService, AIService
from .models import UserSource, Prompt, User
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat")
async def chat(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    # 1. Identify User
    user_source = UserSource.WEB
    external_id = request.user_id 
    if not external_id:
        # Generate a temporary session ID if none provided
        external_id = str(uuid.uuid4())
    
    user_service = UserService(db)
    user = await user_service.get_or_create_user(external_id=external_id, source=user_source)
    
    # 2. Save User Message
    await user_service.add_message(user.id, "user", request.message)
    
    # 3. Generate Answer
    ai_service = AIService(db)
    response_text = await ai_service.generate_response(user, request.message)
    
    # 4. Save Assistant Message
    await user_service.add_message(user.id, "assistant", response_text)
    
    return {"response": response_text, "user_id": external_id}

# --- SECURITY ---
ADMIN_SECRET = os.getenv("ADMIN_SECRET", "cachalot2025")
API_KEY_HEADER = APIKeyHeader(name="X-Cachalot-Secret", auto_error=False)

async def verify_admin(secret: str = Security(API_KEY_HEADER)):
    if secret != ADMIN_SECRET:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials"
        )
    return secret

# --- ADMIN ROUTER ---
admin_router = APIRouter(prefix="/api/admin", tags=["admin"], dependencies=[Depends(verify_admin)])

@admin_router.get("/prompts/{channel}")
async def get_prompt(channel: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Prompt).where(Prompt.channel == channel))
    prompt = result.scalars().first()
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return prompt

@admin_router.post("/prompts/{channel}")
async def update_prompt(channel: str, update: PromptUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Prompt).where(Prompt.channel == channel))
    prompt = result.scalars().first()
    
    if not prompt:
        prompt = Prompt(channel=channel, content=update.content, is_active=True)
        db.add(prompt)
    else:
        if update.content:
            prompt.content = update.content
        if update.is_active is not None:
            prompt.is_active = update.is_active
            
    await db.commit()
    await db.refresh(prompt)
    return prompt

@admin_router.get("/users")
async def get_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    users = result.scalars().all()
    return users

app.include_router(admin_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
