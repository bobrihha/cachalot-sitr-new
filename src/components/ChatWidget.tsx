import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Lang } from '../site';

type Message = {
    text: string;
    isUser: boolean;
    seoData?: unknown;
};

const ChatWidget = () => {
    const lang = ((window as unknown as { __APP_LANG__?: string }).__APP_LANG__ === 'en' ? 'en' : 'ru') as Lang;
    const t = lang === 'en'
        ? {
            hello: 'Hi! I’m a digital assistant. Ask a question and I’ll help you find an answer.',
            typing: 'Typing…',
            placeholder: 'Type your question…',
            networkError: 'Connection error. Please try again later.',
            online: 'ONLINE'
        }
        : {
            hello: 'Здравствуйте! Я цифровой помощник. Задайте вопрос, и я найду ответ в нашей базе знаний.',
            typing: 'Печатает…',
            placeholder: 'Введите вопрос...',
            networkError: 'Ошибка соединения с сервером.',
            online: 'ONLINE'
        };

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: t.hello, isUser: false }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Persist unique User ID
    const [userId, setUserId] = useState("");

    useEffect(() => {
        let storedId = localStorage.getItem("chat_user_id");
        if (!storedId) {
            storedId = "web_" + Math.random().toString(36).substr(2, 9);
            localStorage.setItem("chat_user_id", storedId);
        }
        setUserId(storedId);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg = { text: inputValue, isUser: true };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsLoading(true);

        try {
            // Use local PHP proxy to avoid Mixed Content (HTTPS -> HTTP)
            const response = await fetch('/proxy.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    message: userMsg.text,
                    username: "WebGuest"
                })
            });

            if (!response.ok) throw new Error("Network error");

            const data = await response.json();

            // The API returns { response: "AI text..." }
            const botText = data.response || "Нет ответа";

            setMessages(prev => [...prev, { text: botText, isUser: false }]);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { text: t.networkError, isUser: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-[340px] h-[500px] bg-ocean-900/95 backdrop-blur-xl border border-neon-cyan/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Шапка */}
                        <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-4 flex justify-between items-center border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-neon-cyan flex items-center justify-center font-bold text-black text-xs">AI</div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Cachalot Assistant</h4>
                                    <span className="text-[10px] text-green-400 flex items-center gap-1">● {t.online}</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white"><X size={18} /></button>
                        </div>

                        {/* Тело чата */}
                        <div className="flex-1 p-4 bg-black/20 overflow-y-auto space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.isUser
                                            ? 'bg-neon-cyan/20 text-white rounded-br-none border border-neon-cyan/30'
                                            : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5 [&>p]:mb-2 [&>p:last-child]:mb-0 [&>a]:text-neon-cyan [&>a]:underline'
                                            }`}
                                    >
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                a: ({ node, ...props }) => {
                                                    void node;
                                                    return <a {...props} target="_blank" rel="noopener noreferrer" className="text-neon-cyan underline break-all" />;
                                                }
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none text-sm text-slate-400 italic">
                                        {t.typing}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Ввод */}
                        <div className="p-3 bg-ocean-950 border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={t.placeholder}
                                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-slate-600"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading}
                                className="p-2 bg-neon-cyan/20 text-neon-cyan rounded-lg hover:bg-neon-cyan/40 disabled:opacity-50"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-cyan to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-110 transition-transform">
                {isOpen ? <X /> : <MessageCircle className="animate-pulse" />}
            </button>
        </div>
    );
};

export default ChatWidget;
