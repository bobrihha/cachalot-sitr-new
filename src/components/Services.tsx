import { Bot, ClipboardCheck, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Lang } from '../site';

type ServicesProps = {
    lang: Lang;
};

const Services = ({ lang }: ServicesProps) => {
    const t = lang === 'en'
        ? {
            label: 'Solutions',
            title: 'What AI can take over in your business',
            cards: [
                {
                    icon: <Bot size={40} />,
                    title: 'An internal AI assistant for your team',
                    desc: 'Keeps track of clients, contracts, and meeting outcomes — and answers employee questions without digging through chats, files, and CRMs.'
                },
                {
                    icon: <Workflow size={40} />,
                    title: 'CRM and process visibility',
                    desc: 'Automatic summaries, deal statuses, alerts, and simple analytics — leaders see what’s happening without manual reporting.'
                },
                {
                    icon: <ClipboardCheck size={40} />,
                    title: 'Automation of routine tasks',
                    desc: 'AI handles repetitive ops, checks, replies, and basic data processing — freeing up your team’s time.'
                }
            ]
        }
        : {
            label: 'Возможности',
            title: 'Что AI может взять на себя в вашем бизнесе',
            cards: [
                {
                    icon: <Bot size={40} />,
                    title: 'Внутренний AI-помощник для команды',
                    desc: 'Помнит контрагентов, договоры, итоги встреч и отвечает сотрудникам вместо поисков по чатам, файлам и CRM.'
                },
                {
                    icon: <Workflow size={40} />,
                    title: 'CRM и контроль процессов',
                    desc: 'Автоматические отчёты, статусы сделок, уведомления и аналитика — руководитель видит реальную картину без ручной работы.'
                },
                {
                    icon: <ClipboardCheck size={40} />,
                    title: 'Автоматизация рутинных задач',
                    desc: 'AI берёт на себя типовые операции, проверки, ответы и обработку данных, освобождая время команды.'
                }
            ]
        };

    return (
        <section id="services" className="py-20 bg-ocean-950 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-neon-cyan tracking-widest uppercase text-sm font-bold">{t.label}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{t.title}</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {t.cards.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-2xl bg-ocean-900/30 border border-white/5 hover:bg-ocean-800/50 hover:border-neon-cyan/30 transition-all duration-300"
                        >
                            <div className="mb-6 text-slate-400 group-hover:text-neon-cyan transition-colors duration-300 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
