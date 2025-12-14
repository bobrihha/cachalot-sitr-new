import asyncio
import logging
from dotenv import load_dotenv
import os

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "../.env"))

from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import CommandStart
from aiogram.types import Message
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import SessionLocal
from backend.services import UserService, AIService
from backend.models import UserSource

# Logging setup
logging.basicConfig(level=logging.INFO)

# Check for token strictly. If not present, bot won't start.
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
if not TOKEN:
    logging.warning("TELEGRAM_BOT_TOKEN not set. Bot will not run.")

bot = Bot(token=TOKEN) if TOKEN else None
dp = Dispatcher()

async def get_db_session():
    async with SessionLocal() as session:
        yield session

@dp.message(CommandStart())
async def command_start_handler(message: Message):
    async with SessionLocal() as db:
        user_service = UserService(db)
        user = await user_service.get_or_create_user(
            external_id=str(message.from_user.id),
            source=UserSource.TELEGRAM,
            username=message.from_user.username,
            name=message.from_user.full_name
        )
        
        # Initial greeting could be dynamic too, but keeping it simple for now
        await message.answer(f"Привет, {user.name}! Я готов помочь вам.")

@dp.message()
async def chat_handler(message: Message):
    if not message.text:
        return

    async with SessionLocal() as db:
        user_service = UserService(db)
        ai_service = AIService(db)
        
        # 1. Get/Create User
        user = await user_service.get_or_create_user(
            external_id=str(message.from_user.id),
            source=UserSource.TELEGRAM,
            username=message.from_user.username,
            name=message.from_user.full_name
        )
        
        # 2. Save User Message
        await user_service.add_message(user.id, "user", message.text)
        
        # 3. Generate Answer
        # Send typing action
        await bot.send_chat_action(chat_id=message.chat.id, action="typing")
        
        response_text = await ai_service.generate_response(user, message.text)
        
        # 4. Save Assistant Message
        await user_service.add_message(user.id, "assistant", response_text)
        
        # 5. Send Answer
        await message.answer(response_text)

async def main():
    if not bot:
        print("Bot token not found. Exiting bot process.")
        return
        
    print("Starting Telegram Bot...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
