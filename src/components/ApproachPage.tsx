import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed, Target, Wand2 } from 'lucide-react';
import { homePath, type Lang } from '../site';

type ApproachPageProps = {
    lang: Lang;
};

const icons = [
    <Target size={22} className="text-neon-cyan" />,
    <Wand2 size={22} className="text-neon-cyan" />,
    <CircleDashed size={22} className="text-neon-cyan" />,
    <CheckCircle2 size={22} className="text-neon-cyan" />
];

const ApproachPage = ({ lang }: ApproachPageProps) => {
    const t = lang === 'en'
        ? {
            h1: 'How we work with AI business tasks',
            sub: 'No unnecessary tech, heavy rollouts, or empty promises.',
            text: 'We don’t sell AI for AI. We bring order to your processes and give leaders visibility and control.',
            processBadge: 'Process',
            processTitle: 'Work stages',
            stageLabel: 'Stage',
            stages: [
                {
                    title: 'Understanding the task',
                    text: 'We map your context, processes, and real pain points.'
                },
                {
                    title: 'Solution architecture',
                    text: 'We propose a clear AI solution without unnecessary technologies.'
                },
                {
                    title: 'Pilot launch',
                    text: 'We start with one process or scenario — low risk, fast feedback.'
                },
                {
                    title: 'Iteration and scaling',
                    text: 'We improve and expand the solution as needs grow.'
                }
            ],
            rulesBadge: 'Principles',
            rulesTitle: 'Our principles',
            principles: [
                'Practicality over tech demos',
                'Visibility and transparency for leadership',
                'Solutions that work in real processes',
                'AI as a tool, not an experiment'
            ],
            ctaText: 'Not sure where to start? Describe your task — we’ll propose a solution.',
            ctaButton: 'Pick an AI solution'
        }
        : {
            h1: 'Как мы работаем с AI-задачами бизнеса',
            sub: 'Без лишних технологий, сложных внедрений и пустых обещаний.',
            text: 'Мы не продаём AI ради AI. Наша задача — навести порядок в процессах и дать бизнесу контроль.',
            processBadge: 'Процесс',
            processTitle: 'Этапы работы',
            stageLabel: 'Этап',
            stages: [
                {
                    title: 'Понимание задачи',
                    text: 'Мы разбираемся в контексте бизнеса, процессах и реальных болях.'
                },
                {
                    title: 'Архитектура решения',
                    text: 'Предлагаем понятное AI-решение без лишних технологий.'
                },
                {
                    title: 'Запуск пилота',
                    text: 'Начинаем с одного процесса или сценария, без риска.'
                },
                {
                    title: 'Доработка и масштабирование',
                    text: 'Улучшаем решение и расширяем по мере роста задач.'
                }
            ],
            rulesBadge: 'Правила',
            rulesTitle: 'Наши принципы',
            principles: [
                'Практичность вместо демонстрации технологий',
                'Контроль и прозрачность для бизнеса',
                'Решения, которые работают в реальных процессах',
                'AI как инструмент, а не эксперимент'
            ],
            ctaText: 'Если не уверены, с чего начать — опишите задачу, и мы предложим решение.',
            ctaButton: 'Подобрать AI-решение'
        };

    const ctaHref = `${homePath(lang)}#ai-architect`;

    return (
        <main className="relative z-10 pt-28 pb-20">
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl md:text-5xl font-bold text-white leading-tight"
                    >
                        {t.h1}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-slate-300/90 font-light mt-5 text-lg md:text-xl"
                    >
                        {t.sub}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-slate-400 font-light mt-6 leading-relaxed max-w-3xl mx-auto"
                    >
                        {t.text}
                    </motion.p>
                </div>
            </section>

            <section className="py-16 bg-ocean-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-neon-cyan tracking-widest uppercase text-sm font-bold">{t.processBadge}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{t.processTitle}</h2>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {t.stages.map((s, idx) => (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="rounded-2xl bg-ocean-900/30 border border-white/5 p-6 md:p-7"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        {icons[idx]}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[11px] tracking-widest uppercase text-slate-500 font-mono">
                                            {t.stageLabel} {idx + 1}
                                        </div>
                                        <div className="text-white font-semibold text-lg mt-1">
                                            {s.title}
                                        </div>
                                        <div className="text-slate-400 font-light mt-2 leading-relaxed">
                                            {s.text}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <span className="text-neon-cyan tracking-widest uppercase text-sm font-bold">{t.rulesBadge}</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{t.rulesTitle}</h2>
                    </div>

                    <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4">
                        {t.principles.map((p) => (
                            <div key={p} className="rounded-2xl bg-white/5 border border-white/10 px-6 py-5 text-slate-300/90 font-light leading-relaxed">
                                {p}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="rounded-3xl bg-ocean-900/30 border border-white/5 p-8 md:p-10 text-center">
                        <p className="text-slate-300/90 font-light leading-relaxed text-lg">
                            {t.ctaText}
                        </p>
                        <a
                            href={ctaHref}
                            className="inline-flex mt-7 px-7 py-3 rounded-xl bg-neon-cyan text-ocean-950 font-bold hover:bg-cyan-400 transition-colors"
                        >
                            {t.ctaButton}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ApproachPage;
