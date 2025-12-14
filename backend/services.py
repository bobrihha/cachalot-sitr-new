from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from .models import User, Message, Prompt, UserSource
from .schemas import UserCreate
import google.generativeai as genai
import os
import json
import logging

class UserService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_or_create_user(self, external_id: str, source: str, **kwargs) -> User:
        result = await self.db.execute(
            select(User).where(User.external_id == external_id, User.source == source)
        )
        user = result.scalars().first()
        
        if not user:
            user = User(external_id=external_id, source=source, **kwargs)
            self.db.add(user)
            await self.db.commit()
            await self.db.refresh(user)
        
        return user

    async def add_message(self, user_id: int, role: str, content: str):
        msg = Message(user_id=user_id, role=role, content=content)
        self.db.add(msg)
        await self.db.commit()
        return msg
    
    async def get_history(self, user_id: int, limit: int = 10):
        result = await self.db.execute(
            select(Message).where(Message.user_id == user_id).order_by(Message.created_at.desc()).limit(limit)
        )
        messages = result.scalars().all()
        return list(reversed(messages)) # Return chronological order

class AIService:
    def __init__(self, db: AsyncSession):
        self.db = db
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            logging.error("GEMINI_API_KEY not found in environment variables.")
        else:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-2.0-flash')

    async def get_system_prompt(self, channel: str) -> str:
        result = await self.db.execute(
            select(Prompt).where(Prompt.channel == channel, Prompt.is_active == True)
        )
        prompt = result.scalars().first()
        if prompt:
            return prompt.content
        return "You are a helpful assistant." # Fallback

    async def generate_response(self, user: User, user_message: str) -> str:
        try:
            # 1. Get History from DB
            history_db = await UserService(self.db).get_history(user.id, limit=10)
            
            # 2. Get System Prompt
            system_instruction = await self.get_system_prompt(user.source)
            
            # 3. Construct Gemini History
            # Gemini history format: [{'role': 'user'|'model', 'parts': ['text']}]
            # We treat 'system' prompt as the first message or instruction.
            # However, for simplicity and control, we will construct a prompt chain or use chat session.
            
            # Approach: ChatSession with history
            gemini_history = []
            
            # Inject System Prompt as context in the first user message or separate logic
            # Gemini 1.5 allows system instruction in configuration, but let's keep it simple for now and prepend.
            
            # IMPORTANT: We need to map 'assistant' -> 'model'
            for msg in history_db:
                role = "model" if msg.role == "assistant" else "user"
                # If msg.role is system, we might skip it here or merge it.
                if msg.role == "system":
                    continue
                gemini_history.append({'role': role, 'parts': [msg.content]})

            # Start Chat Session
            chat = self.model.start_chat(history=gemini_history)
            
            # 4. Prepare Message with Context
            user_context = f"Context: User Name={user.name or 'Unknown'}, Niche={user.niche or 'Unknown'}.\n"
            full_prompt = f"{system_instruction}\n\n{user_context}\n\nUser Message: {user_message}"
            
            # 5. Send to Gemini
            response = await chat.send_message_async(full_prompt)
            return response.text
            
        except Exception as e:
            logging.error(f"Gemini AI Error: {e}")
            return "Извините, сейчас я не могу ответить. Попробуйте позже."
