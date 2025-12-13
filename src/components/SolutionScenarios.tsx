import { motion } from 'framer-motion';
import { BookOpenCheck, FileText, UsersRound } from 'lucide-react';
import type { Lang } from '../site';

type Scenario = {
    title: string;
    desc: string;
    icon: React.ReactNode;
    prefill: string;
};

const scenariosByLang: Record<Lang, Scenario[]> = {
    ru: [
        {
            title: 'Порядок в договорах и информации',
            desc: 'AI-помощник, который помнит договоры, контрагентов, сроки, историю договорённостей и отвечает на вопросы сотрудников.',
            icon: <FileText size={28} className="text-neon-cyan" />,
            prefill:
                'Нам нужен AI, который будет хранить и быстро находить информацию\n' +
                'по договорам, контрагентам и срокам, а также отвечать сотрудникам.'
        },
        {
            title: 'Заявки, клиенты и CRM без потерь',
            desc: 'AI принимает обращения, задаёт уточняющие вопросы, квалифицирует клиентов и передаёт данные в CRM.',
            icon: <UsersRound size={28} className="text-neon-cyan" />,
            prefill:
                'Нам нужен AI для приёма и обработки заявок,\n' +
                'который будет задавать вопросы и передавать данные в CRM.'
        },
        {
            title: 'Регламенты, инструкции и нормы',
            desc: 'AI знает внутренние регламенты, инструкции и требования, помогает сотрудникам действовать правильно и без ошибок.',
            icon: <BookOpenCheck size={28} className="text-neon-cyan" />,
            prefill:
                'Нам нужен AI, который будет знать наши регламенты,\n' +
                'инструкции и нормы и помогать сотрудникам в работе.'
        }
    ],
    en: [
        {
            title: 'Order in contracts and key info',
            desc: 'An AI assistant that remembers contracts, clients, deadlines, and agreement history — and answers employee questions.',
            icon: <FileText size={28} className="text-neon-cyan" />,
            prefill:
                'We need AI to store and quickly find information\n' +
                'about contracts, counterparties, and deadlines — and answer employee questions.'
        },
        {
            title: 'Leads, clients, and CRM with zero loss',
            desc: 'AI accepts requests, asks clarifying questions, qualifies clients, and sends structured data into your CRM.',
            icon: <UsersRound size={28} className="text-neon-cyan" />,
            prefill:
                'We need AI for lead intake and processing,\n' +
                'asking questions and passing structured data to the CRM.'
        },
        {
            title: 'Policies, instructions, and requirements',
            desc: 'AI knows internal policies and requirements and helps employees act correctly with fewer mistakes.',
            icon: <BookOpenCheck size={28} className="text-neon-cyan" />,
            prefill:
                'We need AI that knows our policies,\n' +
                'instructions, and requirements and helps employees in daily work.'
        }
    ]
};

type SolutionScenariosProps = {
    lang: Lang;
};

const SolutionScenarios = ({ lang }: SolutionScenariosProps) => {
    const scenarios = scenariosByLang[lang];
    const t = lang === 'en'
        ? {
            badge: 'Scenarios',
            title: 'Ready-made AI scenarios for business',
            subtitle: 'Pick a typical use case — AI Architect will adapt it to your business.',
            button: 'Choose this scenario'
        }
        : {
            badge: 'Сценарии',
            title: 'Готовые сценарии AI-решений для бизнеса',
            subtitle: 'Выберите типовую задачу — AI-Архитектор адаптирует решение под ваш бизнес.',
            button: 'Выбрать сценарий'
        };

    const handlePick = (prefill: string) => {
        window.dispatchEvent(new CustomEvent('ai-architect-prefill', { detail: prefill }));
        document.querySelector('#ai-architect')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className="py-20 relative bg-ocean-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                    <span className="text-neon-cyan tracking-widest uppercase text-sm font-bold">{t.badge}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{t.title}</h2>
                    <p className="text-slate-400 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {scenarios.map((s, idx) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group p-7 rounded-2xl bg-ocean-900/30 border border-white/5 hover:bg-ocean-900/45 hover:border-neon-cyan/25 transition-all"
                        >
                            <div className="mb-5 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan/40 transition-colors">
                                {s.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 leading-snug">{s.title}</h3>
                            <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                                {s.desc}
                            </p>
                            <button
                                type="button"
                                onClick={() => handlePick(s.prefill)}
                                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-semibold text-sm hover:bg-neon-cyan hover:text-ocean-950 hover:border-neon-cyan transition-all"
                            >
                                {t.button}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionScenarios;
