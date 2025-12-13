import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, Server, MessageSquare, BarChart3, Globe, Database } from 'lucide-react';
import type { Lang } from '../site';

type CaseItem = {
    id: number;
    title: string;
    category: string;
    problem: string;
    solution: string;
    result: string;
    tags: string[];
    icon: React.ReactNode;
};

const casesByLang: Record<Lang, CaseItem[]> = {
    ru: [
        {
            id: 1,
            title: "Jungle Park Ecosystem",
            category: "Enterprise Automation",
            tags: ["AmoCRM", "Python", "Telegram API", "VK API"],
            problem: "Обращения шли из разных каналов, заявки терялись, а операторы перегружались.",
            solution: "Собрали единое окно для коммуникаций и подключили AI, который квалифицирует и распределяет обращения.",
            result: "Меньше ручной рутины и быстрее ответы; нагрузка на колл‑центр снизилась примерно на 40%.",
            icon: <MessageSquare className="text-neon-cyan" size={32} />
        },
        {
            id: 2,
            title: "Cachalot Assistant",
            category: "AI Development",
            tags: ["Gemini 2.0", "React", "Voice Recognition"],
            problem: "Посетители не получали быстрый ответ и часто уходили без контакта.",
            solution: "Встроили AI‑помощника на сайт: отвечает на вопросы, подсказывает следующий шаг и собирает данные.",
            result: "Ответы 24/7 и меньше ручной поддержки; выше вовлечённость и конверсия в обращение.",
            icon: <Server className="text-neon-purple" size={32} />
        },
        {
            id: 3,
            title: "Content AI Pipeline",
            category: "Marketing Tech",
            tags: ["Whisper AI", "Parsing", "Content Gen"],
            problem: "Подготовка статей из видео занимала часы и тормозила контент‑план.",
            solution: "Собрали пайплайн: из ссылки на видео получаем структуру и готовый черновик статьи.",
            result: "Экономия 20+ часов работы редактора; стабильный выпуск контента без провалов.",
            icon: <Globe className="text-blue-400" size={32} />
        },
        {
            id: 4,
            title: "Web3 Trading Bot",
            category: "Fintech",
            tags: ["Web3", "Blockchain", "React Admin"],
            problem: "Не хватало прозрачности: сложно быстро понять, что происходит, и вовремя реагировать.",
            solution: "Сделали панель контроля: статусы, ключевые метрики и управление настройками в одном месте.",
            result: "Быстрее принятие решений и меньше ошибок; контроль в реальном времени без переключения между системами.",
            icon: <BarChart3 className="text-green-400" size={32} />
        },
        {
            id: 5,
            title: "Bitrix24 Webhooks",
            category: "Integration",
            tags: ["Bitrix24", "Webhooks", "FastAPI"],
            problem: "Заявки с форм приходили с задержкой, терялись и дублировались.",
            solution: "Автоматизировали приём: проверка на дубли, создание карточек и распределение по менеджерам.",
            result: "Мгновенная доставка лидов в CRM и меньше дублей; быстрее первая реакция и меньше хаоса.",
            icon: <Database className="text-orange-400" size={32} />
        }
    ],
    en: [
        {
            id: 1,
            title: "Jungle Park Ecosystem",
            category: "Enterprise Automation",
            tags: ["AmoCRM", "Python", "Telegram API", "VK API"],
            problem: "Requests came from multiple channels; leads were lost and operators were overloaded.",
            solution: "Built a single workspace for communication and added AI to qualify and route requests.",
            result: "Less manual work and faster replies; call center load dropped by ~40%.",
            icon: <MessageSquare className="text-neon-cyan" size={32} />
        },
        {
            id: 2,
            title: "Cachalot Assistant",
            category: "AI Development",
            tags: ["Gemini 2.0", "React", "Voice Recognition"],
            problem: "Visitors didn’t get quick answers and left without leaving contacts.",
            solution: "Embedded an AI assistant on the website: answers questions, suggests next steps, and collects details.",
            result: "24/7 responses and less manual support; higher engagement and more qualified inquiries.",
            icon: <Server className="text-neon-purple" size={32} />
        },
        {
            id: 3,
            title: "Content AI Pipeline",
            category: "Marketing Tech",
            tags: ["Whisper AI", "Parsing", "Content Gen"],
            problem: "Turning videos into articles took hours and slowed down the content plan.",
            solution: "Built a pipeline that turns a video link into a structured draft article.",
            result: "Saved 20+ hours of editor time; consistent content output without gaps.",
            icon: <Globe className="text-blue-400" size={32} />
        },
        {
            id: 4,
            title: "Trading Operations Dashboard",
            category: "Operations",
            tags: ["Web3", "Blockchain", "React Admin"],
            problem: "Lack of transparency made it hard to react quickly and avoid mistakes.",
            solution: "Delivered a control panel with statuses, key metrics, and management in one place.",
            result: "Faster decisions and fewer errors; real-time control without switching between tools.",
            icon: <BarChart3 className="text-green-400" size={32} />
        },
        {
            id: 5,
            title: "Bitrix24 Webhooks",
            category: "Integration",
            tags: ["Bitrix24", "Webhooks", "FastAPI"],
            problem: "Form leads arrived with delays, got lost, and were duplicated.",
            solution: "Automated intake: deduplication, creating CRM entries, and routing to the right manager.",
            result: "Instant lead delivery into CRM and fewer duplicates; faster first response and less chaos.",
            icon: <Database className="text-orange-400" size={32} />
        }
    ]
};

type CasesProps = {
    lang: Lang;
};

const Cases = ({ lang }: CasesProps) => {
    const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
    const cases = casesByLang[lang];
    const labels = lang === 'en'
        ? {
            badge: 'Case studies',
            title1: 'Systems',
            title2: 'delivered',
            problem: 'Problem:',
            solution: 'Solution:',
            result: 'Outcome:',
            more: 'Read more',
            action: 'Pick an AI solution'
        }
        : {
            badge: 'Портфолио',
            title1: 'Реализованные',
            title2: 'Системы',
            problem: 'Проблема:',
            solution: 'Решение:',
            result: 'Результат:',
            more: 'Подробнее',
            action: 'Подобрать AI-решение'
        };

    return (
        <section id="cases" className="py-24 relative bg-ocean-950">
            <div className="max-w-7xl mx-auto px-6">

                {/* Заголовок */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-neon-cyan tracking-widest uppercase text-sm font-bold">{labels.badge}</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
                        {labels.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">{labels.title2}</span>
                    </h2>
                </motion.div>

                {/* Сетка кейсов */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cases.map((item) => (
                        <motion.div
                            key={item.id}
                            layoutId={`card-${item.id}`}
                            onClick={() => setSelectedCase(item)}
                            whileHover={{ y: -10 }}
                            className="cursor-pointer group relative overflow-hidden rounded-2xl bg-ocean-900/40 border border-white/5 p-8 transition-colors hover:border-neon-cyan/30 hover:bg-ocean-900/60"
                        >
                            <div className="mb-6 w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <div className="text-slate-400 text-sm mb-6 space-y-2">
                                <p><span className="text-slate-300/90 font-semibold">{labels.problem}</span> {item.problem}</p>
                                <p><span className="text-slate-300/90 font-semibold">{labels.solution}</span> {item.solution}</p>
                                <p><span className="text-slate-300/90 font-semibold">{labels.result}</span> {item.result}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-slate-500 border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center text-neon-cyan text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                {labels.more} <ArrowRight size={16} className="ml-2" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Модальное окно (Overlay) */}
            <AnimatePresence>
                {selectedCase && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        {/* Затемнение фона */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCase(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Само окно */}
                        <motion.div
                            layoutId={`card-${selectedCase.id}`}
                            className="relative w-full max-w-2xl bg-ocean-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-8 md:p-12 relative">
                                <button
                                    onClick={() => setSelectedCase(null)}
                                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <span className="text-neon-cyan text-xs font-bold tracking-widest uppercase mb-2 block">
                                    {selectedCase.category}
                                </span>
                                <h3 className="text-3xl font-bold text-white mb-6">{selectedCase.title}</h3>

                                <div className="text-slate-300/90 font-light leading-relaxed mb-8 space-y-4">
                                    <p><span className="text-slate-200 font-semibold">{labels.problem}</span> {selectedCase.problem}</p>
                                    <p><span className="text-slate-200 font-semibold">{labels.solution}</span> {selectedCase.solution}</p>
                                    <p><span className="text-slate-200 font-semibold">{labels.result}</span> {selectedCase.result}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedCase.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-xs font-mono border border-white/10">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href="#ai-architect"
                                    className="w-full py-4 bg-white text-ocean-950 font-bold rounded-xl hover:bg-neon-cyan transition-colors flex items-center justify-center gap-2"
                                >
                                    {labels.action} <ExternalLink size={18} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Cases;
