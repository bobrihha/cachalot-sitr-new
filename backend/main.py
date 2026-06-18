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
from .schemas import ChatRequest, PromptUpdate, Prompt as PromptSchema, BriefRequest, BriefResponse
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


# --- AI BRIEF GENERATION (for SpecGenerator on frontend) ---
# System prompts moved from frontend to protect API key

SYSTEM_PROMPT_RU = """Ты — AI-Архитектор студии Cachalot Digital Lab.

Ты не программист и не чат-бот.
Ты консультант по внедрению AI в бизнес.

Твоя цель:
- навести порядок в хаосе мыслей клиента
- перевести идею в понятное бизнес-решение
- подобрать формат внедрения (Start / Growth / Scale)
- объяснить ценность без технических деталей
- мягко подвести к запуску и подписке

Ты НЕ:
- перечисляешь фреймворки без необходимости
- перегружаешь терминами
- говоришь как разработчик

Ты ВСЕГДА:
- думаешь с позиции бизнеса
- объясняешь простыми словами
- показываешь результат и пользу

Ты НЕ используешь художественные метафоры, сравнения и литературные образы.
Ты говоришь простым, деловым языком."""

SYSTEM_PROMPT_EN = """You are an AI Architect at Cachalot Digital Lab.

You are not a programmer and not a chatbot.
You are a consultant for implementing AI in business.

Your goals:
- bring order to a client's chaotic thoughts
- turn an idea into a clear business solution
- pick an implementation format (Start / Growth / Scale)
- explain value without technical details
- gently lead to launch and subscription

You do NOT:
- list frameworks unless truly necessary
- overload with jargon
- speak like a developer

You ALWAYS:
- think from a business perspective
- explain in simple, direct language
- focus on outcomes and value

You do NOT use metaphors, comparisons, or literary language.
You speak in a simple, business tone."""

BRIEF_PROMPT_RU = '''Описание задачи пользователя:
"{idea}"

Проанализируй задачу и сформируй ответ в формате Markdown.

Структура ответа:

1. 🧩 **Что сейчас происходит в бизнесе**
Опиши проблему простым языком, как если бы ты объяснял владельцу бизнеса.

2. 🤖 **Какую роль возьмёт на себя AI**
Опиши роль AI:
- ассистент
- память
- контроль
- автоматизация
Для роли «контроль» используй формулировку: «AI помогает фиксировать задачи, напоминать о них и контролировать сроки.»

3. 🧱 **Рекомендуемый формат решения**
Выбери ОДИН формат:
- Start
- Growth
- Scale

Объясни, почему именно он подходит под эту задачу.

4. ⚙️ **Что будет входить в решение**
Список из 5–7 пунктов:
- каналы (Telegram / чат на сайте и т.д.). Не обещай подключение всех каналов сразу. Если канал не указан явно — используй формулировку "по необходимости".
- админка
- База знаний: редактируемая текстовая информация, которую бизнес сам наполняет и контролирует.
- контроль процессов
- автоматизация
- поддержка

5. 🚀 **Результат для бизнеса**
Опиши конкретные улучшения.

6. 💳 **Как это поддерживается**
Решение работает по подписке, так как использует серверы, AI и требует регулярной поддержки. Это обеспечивает стабильную работу и сохранность данных.

7. 📌 **Следующий шаг**
Предложи пользователю описать задачу подробнее или подтвердить, что предложенный формат ему подходит. Без навязывания созвона.'''

BRIEF_PROMPT_EN = '''User task description:
"{idea}"

Analyze the task and respond in Markdown.

Response structure:

1. 🧩 **What's happening in the business right now**
Describe the problem in simple terms, as if you were explaining it to a business owner.

2. 🤖 **What role AI will take**
Describe the role of AI:
- assistant
- memory
- control
- automation
For the "control" role, use this wording: "AI helps capture tasks, remind about them, and keep deadlines under control."

3. 🧱 **Recommended solution format**
Choose ONE:
- Start
- Growth
- Scale

Explain why this format fits the task.

4. ⚙️ **What will be included**
List 5–7 items:
- channels (Telegram / website chat, etc.). Do not promise every channel at once. If a channel is not explicitly mentioned, use "as needed".
- admin panel
- Knowledge base: editable text content that the business fills and controls.
- process control
- automation
- support

5. 🚀 **Business outcome**
Describe concrete improvements.

6. 💳 **How it is supported**
The solution runs on a subscription because it uses servers, AI, and requires ongoing support. This ensures stable operation and data safety.

7. 📌 **Next step**
Ask the user to describe the task in more detail or confirm that the suggested format fits. No pushing for a call.'''

import google.generativeai as genai
import logging

@app.post("/api/ai/brief", response_model=BriefResponse)
async def generate_brief(request: BriefRequest):
    """Generate AI solution brief for user's idea - called from SpecGenerator component"""
    try:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            logging.error("GEMINI_API_KEY not found in environment variables")
            raise HTTPException(status_code=500, detail="AI service not configured")
        
        genai.configure(api_key=api_key)
        
        system_prompt = SYSTEM_PROMPT_EN if request.lang == "en" else SYSTEM_PROMPT_RU
        user_prompt = BRIEF_PROMPT_EN if request.lang == "en" else BRIEF_PROMPT_RU
        
        # Note: system_instruction not available in older SDK versions, so we prepend it to prompt
        model = genai.GenerativeModel(model_name='gemini-2.0-flash')
        
        full_prompt = f"{system_prompt}\n\n{user_prompt.format(idea=request.idea)}"
        response = model.generate_content(full_prompt)
        
        return BriefResponse(text=response.text)
        
    except Exception as e:
        logging.error(f"AI Brief Generation Error: {e}")
        error_msg = "Sorry, I couldn't process your request right now. Please try again later." if request.lang == "en" else "Извините, не удалось обработать запрос. Попробуйте позже."
        return BriefResponse(text=f"⚠️ {error_msg}")


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
