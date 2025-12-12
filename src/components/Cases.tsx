import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, Server, MessageSquare, BarChart3, Globe } from 'lucide-react';

// Данные кейсов (из ТЗ)
const cases = [
    {
        id: 1,
        title: "Jungle Park Ecosystem",
        category: "Enterprise Automation",
        description: "Омниканальная система для сети парков развлечений. Единое окно для операторов и AI-консультант.",
        tags: ["AmoCRM", "Python", "Telegram API", "VK API"],
        details: "Разработана архитектура, объединяющая сообщения с сайта, Telegram и ВКонтакте в одну воронку AmoCRM. Внедрен AI-бот, который квалифицирует лиды, снимая 40% нагрузки с колл-центра.",
        icon: <MessageSquare className="text-neon-cyan" size={32} />
    },
    {
        id: 2,
        title: "Cachalot Assistant",
        category: "AI Development",
        description: "Цифровой сотрудник, работающий прямо на этом сайте. Демонстрация технологии «Сапожник с сапогами».",
        tags: ["OpenAI API", "React", "Voice Recognition"],
        details: "Бот интегрирован в frontend сайта и связан с Python-бэкендом. Умеет вести диалог по сценарию, отвечать на свободные вопросы о компании и собирать контакты. Поддерживает голосовой ввод.",
        icon: <Server className="text-neon-purple" size={32} />
    },
    {
        id: 3,
        title: "Content AI Pipeline",
        category: "Marketing Tech",
        description: "Автоматическая генерация SEO-статей из YouTube видео. Экономия 20+ часов работы редактора.",
        tags: ["Whisper AI", "Parsing", "Content Gen"],
        details: "Бот получает ссылку на видео, транскрибирует голос в текст, структурирует его, выделяет главные мысли и формирует готовую HTML-статью для блога.",
        icon: <Globe className="text-blue-400" size={32} />
    },
    {
        id: 4,
        title: "Web3 Trading Bot",
        category: "Fintech",
        description: "Интерфейс управления высоконагруженным торговым роботом. Аналитика в реальном времени.",
        tags: ["Web3", "Blockchain", "React Admin"],
        details: "Панель управления для трейдера. Отображение графиков доходности, управление кошельками и настройка стратегий торговли в один клик. Безопасное подключение через API.",
        icon: <BarChart3 className="text-green-400" size={32} />
    },
    {
        id: 5,
        title: "Bitrix24 Webhooks",
        category: "Integration",
        description: "Система мгновенного распределения заявок. Данные с лендингов сразу попадают к менеджерам.",
        tags: ["Bitrix24", "Webhooks", "FastAPI"],
        details: "Написан микросервис-прослойка, который ловит данные с форм Tilda/WordPress, проверяет их на дубли и создает сложные сущности в CRM, автоматически назначая ответственного менеджера.",
        icon: <Server className="text-orange-400" size={32} />
    }
];

const Cases = () => {
    const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);

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
                    <span className="text-neon-cyan tracking-widest uppercase text-sm font-bold">Портфолио</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
                        Реализованные <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">Системы</span>
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
                            <p className="text-slate-400 text-sm mb-6 line-clamp-3">{item.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center text-neon-cyan text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                Подробнее <ArrowRight size={16} className="ml-2" />
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
                            className="relative w-full max-w-2xl bg-ocean-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
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

                                <div className="prose prose-invert prose-p:text-slate-300 mb-8">
                                    <p>{selectedCase.details}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedCase.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 rounded-lg bg-neon-cyan/10 text-neon-cyan text-xs font-mono border border-neon-cyan/20">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setSelectedCase(null)} // В будущем здесь может быть ссылка на реальный кейс
                                    className="w-full py-4 bg-white text-ocean-950 font-bold rounded-xl hover:bg-neon-cyan transition-colors flex items-center justify-center gap-2"
                                >
                                    Обсудить похожее решение <ExternalLink size={18} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Cases;
