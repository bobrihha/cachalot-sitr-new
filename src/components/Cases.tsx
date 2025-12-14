import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, MessageSquare, Brain, Briefcase, Database } from 'lucide-react';
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
            title: "AI-ассистент для клиентов",
            category: "Communication",
            tags: ["Website Chat", "Telegram", "WhatsApp", "Lead Capture"],
            problem: "Клиенты пишут в разное время, задают одни и те же вопросы, заявки теряются или обрабатываются с задержкой.",
            solution: "AI-ассистент общается с клиентами 24/7, отвечает на вопросы, помогает выбрать услугу и аккуратно доводит диалог до заявки.",
            result: "Мгновенные ответы, больше обращений без роста нагрузки, клиенты доходят до решения быстрее.",
            icon: <MessageSquare className="text-neon-cyan" size={32} />
        },
        {
            id: 2,
            title: "AI для заявок и CRM-контроля",
            category: "Management",
            tags: ["CRM Integration", "Bitrix24", "AmoCRM", "Google Sheets"],
            problem: "Заявки приходят из разных каналов, теряются, дублировались, нет прозрачной картины.",
            solution: "AI принимает обращения, уточняет детали, сохраняет данные и передаёт их в CRM или таблицы.",
            result: "Ни одной потерянной заявки, чистая структура данных, быстрая реакция команды.",
            icon: <Database className="text-orange-400" size={32} />
        },
        {
            id: 3,
            title: "AI-память бизнеса",
            category: "Knowledge Base",
            tags: ["Documents", "Context", "Memory"],
            problem: "Договоры, условия, переписки и регламенты разбросаны по чатам и папкам.",
            solution: "AI хранит и понимает документы, договорённости и историю взаимодействий.",
            result: "AI отвечает на вопросы по документам, ничего не забывается, контекст сохраняется месяцами.",
            icon: <Brain className="text-purple-400" size={32} />
        },
        {
            id: 4,
            title: "Внутренний AI-помощник",
            category: "Team Support",
            tags: ["Internal AI", "Processes", "Team Support"],
            problem: "Сотрудники тратят время на поиск информации и допускают ошибки.",
            solution: "AI помогает сотрудникам: знает регламенты, инструкции, клиентов и процессы.",
            result: "Меньше ошибок, быстрее принятие решений, меньше ручной рутины.",
            icon: <Briefcase className="text-teal-400" size={32} />
        }
    ],
    en: [
        {
            id: 1,
            title: "AI Assistant for Customer Communication",
            category: "Communication",
            tags: ["Website Chat", "Telegram", "WhatsApp", "Lead Capture"],
            problem: "Customers contact the business at different times, ask repetitive questions, and leads are often lost.",
            solution: "An AI assistant handles conversations 24/7, answers questions, guides users to the right solution, and collects leads.",
            result: "Instant responses, higher conversion without extra staff, better customer experience.",
            icon: <MessageSquare className="text-neon-cyan" size={32} />
        },
        {
            id: 2,
            title: "AI for Leads & CRM Management",
            category: "Management",
            tags: ["CRM Integration", "HubSpot", "Pipedrive", "Google Sheets"],
            problem: "Leads come from multiple channels and are hard to track and manage.",
            solution: "AI qualifies incoming requests and sends structured data to CRM systems or spreadsheets.",
            result: "No lost leads, clean data structure, faster response time.",
            icon: <Database className="text-orange-400" size={32} />
        },
        {
            id: 3,
            title: "Business Memory AI",
            category: "Knowledge Base",
            tags: ["Documents", "Context", "Memory"],
            problem: "Important information is scattered across chats, emails, and files.",
            solution: "AI stores and understands documents, agreements, and communication history.",
            result: "AI answers based on real documents, context preserved over time, less dependency on manual search.",
            icon: <Brain className="text-purple-400" size={32} />
        },
        {
            id: 4,
            title: "Internal AI Assistant for Teams",
            category: "Team Support",
            tags: ["Internal AI", "Processes", "Team Support"],
            problem: "Employees waste time searching for information and making avoidable mistakes.",
            solution: "AI supports the team by knowing internal rules, processes, and client details.",
            result: "Fewer errors, faster decisions, reduced routine work.",
            icon: <Briefcase className="text-teal-400" size={32} />
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
            title1: 'Implemented',
            title2: 'AI Systems',
            subtitle: 'Examples of AI solutions we build for real business needs.',
            problem: 'Problem:',
            solution: 'Solution:',
            result: 'Outcome:',
            more: 'Read more',
            action: 'Pick an AI solution'
        }
        : {
            badge: 'Портфолио',
            title1: 'Реализованные',
            title2: 'AI-системы',
            subtitle: 'Примеры решений, которые мы внедряем под задачи бизнеса.',
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
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
                        {labels.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">{labels.title2}</span>
                    </h2>
                    <p className="text-slate-400 font-light max-w-2xl mx-auto">
                        {labels.subtitle}
                    </p>
                </motion.div>

                {/* Сетка кейсов */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {cases.map((item) => (
                        <motion.div
                            key={item.id}
                            layoutId={`card-${item.id}`}
                            onClick={() => setSelectedCase(item)}
                            whileHover={{ y: -5 }}
                            className="cursor-pointer group relative overflow-hidden rounded-3xl bg-ocean-900/40 border border-white/5 p-8 transition-all hover:border-neon-cyan/30 hover:bg-ocean-900/60"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                                    {item.icon}
                                </div>
                                <div className="flex items-center text-neon-cyan text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    {labels.more} <ArrowRight size={16} className="ml-2" />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 leading-snug">{item.title}</h3>

                            <div className="space-y-3 mb-6">
                                <p className="text-slate-400 text-sm line-clamp-3">
                                    <span className="text-slate-300 font-semibold">{labels.problem}</span> {item.problem}
                                </p>
                                <p className="text-slate-400 text-sm line-clamp-3">
                                    <span className="text-slate-300 font-semibold">{labels.result}</span> {item.result}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {item.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-white/5 text-slate-500 border border-white/5 font-medium">
                                        {tag}
                                    </span>
                                ))}
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
                                <h3 className="text-3xl font-bold text-white mb-8">{selectedCase.title}</h3>

                                <div className="space-y-6 mb-8 text-slate-300/90 font-light leading-relaxed">
                                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                        <p className="mb-1 text-red-300 font-semibold">{labels.problem}</p>
                                        <p>{selectedCase.problem}</p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/10">
                                        <p className="mb-1 text-neon-cyan font-semibold">{labels.solution}</p>
                                        <p>{selectedCase.solution}</p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                                        <p className="mb-1 text-green-300 font-semibold">{labels.result}</p>
                                        <p>{selectedCase.result}</p>
                                    </div>
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
                                    onClick={() => setSelectedCase(null)}
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
