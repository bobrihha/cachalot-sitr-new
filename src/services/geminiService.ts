import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Lang } from "../site";

// ⚠️ ВАЖНО: В реальном проекте ключ лучше хранить в .env файле (VITE_GOOGLE_API_KEY)
// Но для быстрого старта можно временно вставить сюда, если не будешь пушить в публичный репозиторий.
// Получить ключ: https://aistudio.google.com/app/apikey
const API_KEY = "AIzaSyA1DeFmtZktqW048cD7iUy-ZSxvBVqjbxY";

const genAI = new GoogleGenerativeAI(API_KEY);

const systemPromptRu = `
Ты — AI-Архитектор студии Cachalot Digital Lab.

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
Ты говоришь простым, деловым языком.
`.trim();

const systemPromptEn = `
You are an AI Architect at Cachalot Digital Lab.

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
You speak in a simple, business tone.
`.trim();

export const generateProjectSpec = async (userIdea: string, lang: Lang): Promise<string> => {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        systemInstruction: lang === 'en' ? systemPromptEn : systemPromptRu
    });

    const promptRu = `
Описание задачи пользователя:
"${userIdea}"

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
Предложи пользователю описать задачу подробнее или подтвердить, что предложенный формат ему подходит. Без навязывания созвона.
`.trim();

    const promptEn = `
User task description:
"${userIdea}"

Analyze the task and respond in Markdown.

Response structure:

1. 🧩 **What’s happening in the business right now**
Describe the problem in simple terms, as if you were explaining it to a business owner.

2. 🤖 **What role AI will take**
Describe the role of AI:
- assistant
- memory
- control
- automation
For the “control” role, use this wording: “AI helps capture tasks, remind about them, and keep deadlines under control.”

3. 🧱 **Recommended solution format**
Choose ONE:
- Start
- Growth
- Scale

Explain why this format fits the task.

4. ⚙️ **What will be included**
List 5–7 items:
- channels (Telegram / website chat, etc.). Do not promise every channel at once. If a channel is not explicitly mentioned, use “as needed”.
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
Ask the user to describe the task in more detail or confirm that the suggested format fits. No pushing for a call.
`.trim();

    try {
        const result = await model.generateContent(lang === 'en' ? promptEn : promptRu);
        const response = await result.response;
        return response.text();
    } catch (error: unknown) {
        console.error("Gemini Error Details:", error);
        const message = error instanceof Error ? error.message : JSON.stringify(error);
        return `⚠️ Ошибка: ${message}`;
    }
};
