import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Boxes, Building2, MessageCircle, ShieldCheck } from 'lucide-react';
import type { Lang } from '../site';

type FormatCard = {
    name: string;
    subtitle: string;
    oneTime: string;
    monthly: string;
    description: string;
    bullets: string[];
    note: string;
    cta: string;
    icon: React.ReactNode;
    monthlyIncludes?: string[];
};

const formatsByLang: Record<Lang, FormatCard[]> = {
    ru: [
        {
            name: 'Start',
            subtitle: 'AI-ассистент для общения с клиентами',
            oneTime: 'Разово: 15 000 ₽',
            monthly: 'Ежемесячно: 3 500 ₽ / месяц',
            description: 'Подходит для малого бизнеса и первого внедрения AI.',
            bullets: [
                'AI-ассистент для общения с клиентами',
                '1 канал на выбор: Telegram ИЛИ чат на сайте',
                'Админка: простая CRM (контакты и история диалогов)',
                'Админка: редактируемая текстовая база знаний',
                '1 месяц обслуживания включён'
            ],
            monthlyIncludes: [
                'сервер и инфраструктура',
                'API-ключи',
                'стабильная работа AI',
                'поддержка',
                'хранение данных'
            ],
            note: 'Подходит, если нужно перестать терять заявки и навести порядок в общении с клиентами.',
            cta: 'Подобрать AI-решение',
            icon: <MessageCircle size={22} className="text-neon-cyan" />
        },
        {
            name: 'Growth',
            subtitle: 'Мультиканальный AI для клиентов и процессов',
            oneTime: 'Разово: от 30 000 ₽',
            monthly: 'Ежемесячно: от 6 000 ₽ / месяц',
            description: 'Для бизнеса с несколькими источниками заявок.',
            bullets: [
                'AI-ассистент для клиентов',
                'Несколько каналов общения (по необходимости)',
                'Единая база диалогов и контактов',
                'Расширенная админка (статусы, заметки, контроль обращений)',
                'Возможность интеграции с CRM'
            ],
            monthlyIncludes: [
                'инфраструктура',
                'API',
                'поддержка',
                'хранение данных'
            ],
            note: 'Подходит, если клиенты приходят из разных каналов и важно ничего не потерять.',
            cta: 'Обсудить конфигурацию',
            icon: <Boxes size={22} className="text-neon-cyan" />
        },
        {
            name: 'Scale',
            subtitle: 'AI-память и контроль бизнеса',
            oneTime: 'Разово: от 70 000 ₽',
            monthly: 'Ежемесячно: от 10 000 ₽ / месяц',
            description: 'Для компаний и команд с высокой ценой ошибок.',
            bullets: [
                'Внутренний AI-помощник для сотрудников',
                'Память бизнеса: клиенты, договоры, регламенты, нормы, процессы',
                'Поддержка сотрудников в работе',
                'Роли доступа и контроль',
                'Интеграции с внутренними системами'
            ],
            monthlyIncludes: [
                'стабильная работа AI‑памяти',
                'инфраструктура',
                'поддержка'
            ],
            note: 'Подходит, если знания и процессы нельзя держать в головах и чатах.',
            cta: 'Запросить архитектуру решения',
            icon: <ShieldCheck size={22} className="text-neon-cyan" />
        }
    ],
    en: [
        {
            name: 'Start',
            subtitle: 'AI assistant for client conversations',
            oneTime: 'Setup: 15,000 ₽',
            monthly: 'Monthly: 3,500 ₽',
            description: 'For small businesses and a first AI rollout.',
            bullets: [
                'AI assistant for client conversations',
                '1 channel: Telegram OR website chat',
                'Admin: simple CRM (contacts + dialog history)',
                'Admin: editable text knowledge base',
                '1 month of support included'
            ],
            monthlyIncludes: [
                'servers & infrastructure',
                'API keys',
                'stable AI operation',
                'support',
                'data storage'
            ],
            note: 'Best if you want to stop losing leads and bring order to client communication.',
            cta: 'Pick an AI solution',
            icon: <MessageCircle size={22} className="text-neon-cyan" />
        },
        {
            name: 'Growth',
            subtitle: 'Multi-channel AI for clients and processes',
            oneTime: 'Setup: from 30,000 ₽',
            monthly: 'Monthly: from 6,000 ₽',
            description: 'For businesses with multiple lead sources.',
            bullets: [
                'AI assistant for clients',
                'Multiple communication channels (as needed)',
                'Unified database of dialogs and contacts',
                'Advanced admin (statuses, notes, request control)',
                'CRM integration (as needed)'
            ],
            monthlyIncludes: [
                'infrastructure',
                'API',
                'support',
                'data storage'
            ],
            note: 'Best if leads come from multiple channels and you want to lose nothing.',
            cta: 'Discuss configuration',
            icon: <Boxes size={22} className="text-neon-cyan" />
        },
        {
            name: 'Scale',
            subtitle: 'AI memory and business control',
            oneTime: 'Setup: from 70,000 ₽',
            monthly: 'Monthly: from 10,000 ₽',
            description: 'For teams where mistakes are costly.',
            bullets: [
                'Internal AI assistant for employees',
                'Business memory: clients, contracts, policies, requirements, processes',
                'Employee support in daily work',
                'Access roles and control',
                'Integrations with internal systems'
            ],
            monthlyIncludes: [
                'stable AI memory operation',
                'infrastructure',
                'support'
            ],
            note: 'Best if knowledge and processes can’t live in heads and chats.',
            cta: 'Request solution architecture',
            icon: <ShieldCheck size={22} className="text-neon-cyan" />
        }
    ]
};

type PricingFormatsProps = {
    lang: Lang;
};

const PricingFormats = ({ lang }: PricingFormatsProps) => {
    const formats = formatsByLang[lang];
    const t = lang === 'en'
        ? {
            badge: 'Guides',
            title: 'AI implementation formats',
            subtitle: 'Not pricing plans — just reference points. The setup is tailored to your task.',
            monthlyLabel: 'Monthly service includes',
            footer:
                'An AI assistant is a living tool. Monthly service covers stable operation, data storage, knowledge base updates, and support.',
            finalText: 'Not sure which format fits? Describe your task — AI Architect will propose a solution.',
            finalCta: 'Pick an AI solution'
        }
        : {
            badge: 'Ориентиры',
            title: 'Форматы внедрения AI-решений',
            subtitle: 'Это не тарифы, а ориентиры. Конфигурация подбирается под задачу.',
            monthlyLabel: 'Ежемесячное обслуживание',
            footer:
                'AI-помощник — это живой инструмент. Ежемесячное обслуживание обеспечивает стабильную работу, хранение данных, обновление базы знаний и поддержку.',
            finalText: 'Не уверены, какой формат подойдёт? Опишите задачу — AI-Архитектор предложит решение.',
            finalCta: 'Подобрать AI-решение'
        };

    return (
        <section id="pricing" className="py-20 relative bg-ocean-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                    <span className="text-neon-cyan tracking-widest uppercase text-sm font-bold">{t.badge}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{t.title}</h2>
                    <p className="text-slate-400 font-light mt-4 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {formats.map((f, idx) => (
                        <motion.div
                            key={f.name}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.08 }}
                            viewport={{ once: true }}
                            className="rounded-3xl bg-ocean-900/30 border border-white/5 p-7 flex flex-col"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">{f.name}</div>
                                    <div className="text-slate-400 font-light mt-1">{f.subtitle}</div>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    {f.icon}
                                </div>
                            </div>

                            <div className="mt-5 space-y-1">
                                <div className="text-slate-200 font-semibold">{f.oneTime}</div>
                                <div className="text-slate-400 font-light">{f.monthly}</div>
                            </div>

                            <p className="text-slate-400 font-light leading-relaxed mt-4 text-sm">
                                {f.description}
                            </p>

                            <ul className="mt-5 space-y-2 text-slate-300/90 font-light text-sm leading-relaxed">
                                {f.bullets.map((b) => (
                                    <li key={b} className="flex gap-2">
                                        <BadgeCheck size={16} className="text-neon-cyan mt-0.5 shrink-0" />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>

                            {f.monthlyIncludes && (
                                <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4">
                                    <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
                                        <Building2 size={16} className="text-neon-cyan" />
                                        {t.monthlyLabel}
                                    </div>
                                    <ul className="mt-3 space-y-1 text-slate-400 font-light text-sm">
                                        {f.monthlyIncludes.map((m) => (
                                            <li key={m} className="flex gap-2">
                                                <span className="text-slate-600">•</span>
                                                <span>{m}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <p className="mt-5 text-slate-500 font-light text-sm leading-relaxed">
                                {f.note}
                            </p>

                            <a
                                href="#ai-architect"
                                className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-semibold text-sm hover:bg-neon-cyan hover:text-ocean-950 hover:border-neon-cyan transition-all"
                            >
                                {f.cta} <ArrowRight size={16} />
                            </a>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto mt-10 text-center">
                    <p className="text-slate-500 font-light text-sm leading-relaxed">
                        {t.footer}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto mt-10">
                    <div className="rounded-3xl bg-ocean-900/25 border border-white/5 p-8 md:p-10 text-center">
                        <p className="text-slate-300/90 font-light leading-relaxed text-lg">
                            {t.finalText}
                        </p>
                        <a
                            href="#ai-architect"
                            className="inline-flex mt-7 px-7 py-3 rounded-xl bg-neon-cyan text-ocean-950 font-bold hover:bg-cyan-400 transition-colors"
                        >
                            {t.finalCta}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingFormats;
