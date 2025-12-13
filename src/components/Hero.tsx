import { motion } from 'framer-motion';
import { ChevronDown, Brain, Database, Layers } from 'lucide-react';
import type { Lang } from '../site';

type HeroProps = {
    lang: Lang;
};

const Hero = ({ lang }: HeroProps) => {
    const t = lang === 'en'
        ? {
            brandWord: 'DEPTH',
            badge: 'CACHALOT • AI SYSTEMS FOR BUSINESS',
            h1: 'AI assistants that bring order and visibility to your business.',
            subtitle: 'Contracts, policies, messages, and deadlines — what usually gets lost across chats and CRMs becomes searchable in seconds.',
            micro: 'For small businesses and teams. Ready-to-use solutions without a heavy rollout.',
            primary: 'Pick an AI solution',
            secondary: 'See case studies',
            icon1: 'AI assistants',
            icon2: 'CRM + visibility',
            icon3: 'Automation'
        }
        : {
            brandWord: 'ГЛУБИНА',
            badge: 'CACHALOT • AI SYSTEMS FOR BUSINESS',
            h1: 'AI-помощники для порядка и контроля в бизнесе.',
            subtitle: 'Контрагенты, договоры, регламенты, нормы, переписки и сроки — всё, что обычно теряется в чатах и CRM, становится доступно за секунды.',
            micro: 'Подходит малому бизнесу и компаниям. Есть готовые решения без сложных внедрений.',
            primary: 'Подобрать AI-решение',
            secondary: 'Посмотреть примеры',
            icon1: 'AI-помощники',
            icon2: 'CRM + контроль',
            icon3: 'Автоматизация'
        };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">

            {/* Декор: Свечение из глубины */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse-slow"></div>

            {/* Декоративное слово бренда */}
            <div className="pointer-events-none absolute top-16 md:top-12 left-1/2 -translate-x-1/2 text-5xl md:text-7xl lg:text-8xl font-black text-slate-500/10 tracking-tight">
                {t.brandWord}
            </div>

            <div className="z-10 max-w-5xl text-center space-y-8">

                {/* Бейдж "System Online" */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-800/50 border border-neon-cyan/20 text-neon-cyan text-xs font-mono tracking-widest uppercase backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                    </span>
                    {t.badge}
                </motion.div>

                {/* Заголовок */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
                >
                    {t.h1}
                </motion.h1>

                {/* Подзаголовок */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    {t.subtitle}
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto"
                >
                    {t.micro}
                </motion.p>

                {/* Кнопки */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                >
                    <a href="#ai-architect" className="px-8 py-4 bg-neon-cyan text-ocean-950 font-bold text-lg rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105">
                        {t.primary}
                    </a>
                    <a href="#cases" className="px-8 py-4 border border-slate-700 text-slate-300 font-medium text-lg rounded-xl hover:bg-white/5 hover:border-neon-cyan/50 transition-all backdrop-blur-sm">
                        {t.secondary}
                    </a>
                </motion.div>
            </div>

            {/* Иконки стека внизу */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 flex gap-12 text-slate-600"
            >
                <div className="flex flex-col items-center gap-2 hover:text-neon-cyan transition-colors"><Brain size={24} /> <span className="text-[10px] tracking-widest uppercase">{t.icon1}</span></div>
                <div className="flex flex-col items-center gap-2 hover:text-neon-cyan transition-colors"><Database size={24} /> <span className="text-[10px] tracking-widest uppercase">{t.icon2}</span></div>
                <div className="flex flex-col items-center gap-2 hover:text-neon-cyan transition-colors"><Layers size={24} /> <span className="text-[10px] tracking-widest uppercase">{t.icon3}</span></div>
            </motion.div>

            {/* Стрелка вниз */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-4 text-slate-500"
            >
                <ChevronDown size={24} />
            </motion.div>

        </section>
    );
};

export default Hero;
