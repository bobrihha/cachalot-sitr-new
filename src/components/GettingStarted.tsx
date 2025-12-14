import { motion } from 'framer-motion';
import { BadgeCheck, Layers, PackageCheck, WalletMinimal } from 'lucide-react';
import type { Lang } from '../site';

type GettingStartedProps = {
    lang: Lang;
};

const GettingStarted = ({ lang }: GettingStartedProps) => {
    const t = lang === 'en'
        ? {
            title: 'How implementation starts',
            subtitle: 'No heavy rollout and no unnecessary spend.',
            items: [
                'Ready-made solutions — no need to build everything from scratch',
                'Start with a single process or task',
                'Scales as your business grows',
                'No “air” subscriptions or hidden fees'
            ],
            micro: 'Cost depends on the task, but you can start without a big budget.'
        }
        : {
            title: 'С чего начинается внедрение',
            subtitle: 'Без сложных внедрений и лишних затрат.',
            items: [
                'Есть готовые решения — не нужно разрабатывать всё с нуля',
                'Можно начать с одного процесса или задачи',
                'Масштабируется по мере роста бизнеса',
                'Без подписки на «воздух» и скрытых платежей'
            ],
            micro: 'Стоимость зависит от задачи, но старт возможен без больших бюджетов.'
        };

    const icons = [
        <PackageCheck size={20} className="text-neon-cyan" />,
        <BadgeCheck size={20} className="text-neon-cyan" />,
        <Layers size={22} className="text-neon-cyan" />,
        <WalletMinimal size={22} className="text-neon-cyan" />
    ];

    return (
        <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {lang === 'en' ? (
                                <>How <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">implementation</span> starts</>
                            ) : (
                                <>С чего начинается <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">внедрение</span></>
                            )}
                        </h2>
                        <p className="text-slate-400 font-light mt-3">
                            {t.subtitle}
                        </p>
                    </div>

                    <div className="rounded-3xl bg-ocean-900/25 border border-white/5 px-6 py-6 md:px-8 md:py-7">
                        <ul className="space-y-4">
                            {t.items.map((text, idx) => (
                                <li key={text} className="flex items-start gap-3">
                                    <div className="mt-0.5 w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        {icons[idx]}
                                    </div>
                                    <p className="text-slate-300/90 font-light leading-relaxed">
                                        {text}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <p className="text-center text-slate-500 font-light mt-6 text-sm">
                            {t.micro}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GettingStarted;
