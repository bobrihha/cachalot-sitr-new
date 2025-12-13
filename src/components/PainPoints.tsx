import { motion } from 'framer-motion';
import { AlertTriangle, Files, Mail, MessageSquareText, UserRoundX } from 'lucide-react';
import type { Lang } from '../site';

const icons = [
    <MessageSquareText size={22} className="text-neon-cyan" />,
    <UserRoundX size={22} className="text-neon-cyan" />,
    <Files size={22} className="text-neon-cyan" />,
    <AlertTriangle size={22} className="text-neon-cyan" />,
    <Mail size={22} className="text-neon-cyan" />
];

type PainPointsProps = {
    lang: Lang;
};

const PainPoints = ({ lang }: PainPointsProps) => {
    const t = lang === 'en'
        ? {
            label: 'Common problems',
            title: 'Where order breaks down',
            subtitle: 'These issues show up in most businesses — regardless of size.',
            items: [
                'Key agreements stay in chats and email threads',
                'Teams forget important client and project details',
                'Policies and instructions are scattered across folders',
                'Requirements resurface at the last minute',
                'Leadership learns about issues too late'
            ]
        }
        : {
            label: 'Проблемы',
            title: 'Где бизнес теряет порядок и контроль',
            subtitle: 'Эти проблемы есть почти в каждой компании — независимо от размера.',
            items: [
                'Важные договорённости остаются в чатах и почте',
                'Сотрудники забывают детали по клиентам и проектам',
                'Регламенты и инструкции разбросаны по папкам',
                'Нормы и требования вспоминают в последний момент',
                'Руководитель узнаёт о проблемах слишком поздно'
            ]
        };

    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-14 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <span className="text-neon-cyan tracking-widest uppercase text-sm font-bold">{t.label}</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            {t.title}
                        </h2>
                        <p className="text-slate-400 font-light leading-relaxed max-w-xl">
                            {t.subtitle}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 gap-4"
                    >
                        {t.items.map((text, idx) => (
                            <div
                                key={text}
                                className="group rounded-2xl bg-ocean-900/30 border border-white/5 p-5 hover:bg-ocean-900/45 hover:border-neon-cyan/25 transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan/40 transition-colors">
                                        {icons[idx]}
                                    </div>
                                    <p className="text-slate-300/90 font-light leading-relaxed">
                                        {text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
