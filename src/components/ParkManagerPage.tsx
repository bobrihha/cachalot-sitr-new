import { motion } from 'framer-motion';
import {
    MessageCircle,
    Clock,
    CheckCircle,
    Brain,
    Sparkles,
    ArrowRight,
    MapPin,
    Ticket,
    PartyPopper,
    Smile,
    Heart,
    Users,
    Calendar,
    Utensils,
    BarChart3,
    FolderOpen,
    Bell
} from 'lucide-react';
import type { Lang } from '../site';

type ParkManagerPageProps = {
    lang: Lang;
};

import TelegramBackground from './TelegramBackground';

const ParkManagerPage = ({ lang: _lang }: ParkManagerPageProps) => {
    // Контент только на русском, так как это B2B для российского рынка
    const t = {
        // Hero Section
        hero: {
            title: 'AI-менеджер для парков развлечений',
            subtitle: 'Закрывает 99% вопросов гостей:\nот «как добраться» до продажи Дня Рождения.\nРаботает на сайте, в Telegram и ВК.',
            badge: '24/7 · без выходных · как живой администратор',
            cta: 'Посмотреть демо'
        },
        // Problem Section
        problem: {
            title: 'Гости пишут. Звонить не хотят.',
            text: 'Если бы гость хотел позвонить — он бы уже позвонил.\nРеальность вашего администратора:',
            points: [
                'Пишут ночью и в выходные',
                'Задают сотни однотипных вопросов',
                'Уходят к конкурентам, если ответа нет 5 минут'
            ]
        },
        // Solution Section
        solution: {
            title: 'AI-администратор полного цикла',
            intro: 'Это не глупый чат-бот с кнопками.\nЭто цифровой сотрудник, который знает о вашем парке всё.\nОн разгружает колл-центр от рутины:',
            features: [
                { icon: MapPin, title: 'Навигация', desc: 'адрес, парковка, карта проезда' },
                { icon: PartyPopper, title: 'Развлечения', desc: 'какие аттракционы работают, ограничения по возрасту' },
                { icon: Ticket, title: 'Условия', desc: 'цены, текущие акции, скидки и афиша' }
            ],
            outro: 'И главное — мягко переводит интерес гостя в продажу.'
        },
        // Emotional Intelligence
        emotional: {
            title: 'Общение с душой, а не скриптами',
            intro: 'Бот создает настроение праздника еще до визита.\nВ отличие от сухих автоответчиков, наш AI:',
            features: [
                { icon: Brain, title: 'Понимает контекст', desc: 'поддержит любую тему.' },
                { icon: Smile, title: 'Умеет шутить', desc: 'разрядит обстановку, если нужно.' },
                { icon: Heart, title: 'Сглаживает углы', desc: 'вежливо ответит даже сложному клиенту.' }
            ],
            outro: 'Он не просто отвечает — он влюбляет в сервис.'
        },
        // Proof Section
        proof: {
            title: 'Справляется даже с нестандартными запросами',
            caption: 'Реальный пример: Гостья спросила совет личного характера. Обычный бот выдал бы ошибку. Наш AI поддержал игру, пошутил и создал вау-эффект.'
        },
        // Scenarios
        scenarios: {
            title: 'Два режима работы',
            mode1: {
                title: '1. Справочное бюро (мгновенно)',
                example: 'Гость: «А есть скидки многодетным?»',
                result: 'Бот: Дает условия и цены.',
                outcome: 'Результат: Гость доволен, администратор не отвлекался'
            },
            mode2: {
                title: '2. Продажа услуг (Лидогенерация)',
                example: 'Гость: «Хотим отметить День Рождения»',
                result: 'Бот: Уточняет дату, количество гостей, бюджет и формирует заявку.',
                outcome: 'Результат: Готовый лид падает менеджеру'
            }
        },
        // Birthday
        birthday: {
            title: 'Оформление праздника — на автопилоте',
            intro: 'AI-менеджер сам выяснит:',
            points: [
                'Дату и время',
                'Количество детей и взрослых',
                'Формат праздника и еду',
                'Контактные данные'
            ],
            outro: 'Диалог доводится до готовой заявки. Вам остается только подтвердить бронь.'
        },
        // Smart Context
        context: {
            title: 'Помнит всё, как опытный админ',
            text: 'Система сохраняет историю диалога.\nЕсли гость написал сегодня «Привет», а завтра «Хочу забронировать», бот не спросит «Как вас зовут?», если уже знает это.\nОбщение бесшовное и естественное.'
        },
        // Channels
        channels: {
            title: 'Ловит гостей везде',
            platforms: ['Чат на сайте', 'Telegram', 'ВКонтакте'],
            text: 'Единая база знаний. Единые стандарты ответов.\nДаже если гость пишет на иностранном языке — бот поймет и ответит на нем же.'
        },
        // Admin Panel
        admin: {
            title: 'Полный контроль для владельца',
            intro: 'Вы получаете:',
            features: [
                { icon: BarChart3, text: 'Структурированные заявки в Telegram или CRM' },
                { icon: FolderOpen, text: 'Историю всех переписок' },
                { icon: Bell, text: 'Мгновенные уведомления о важных клиентах' }
            ],
            outro: 'Ни один лид не потеряется.'
        },
        // Final CTA
        final: {
            title: 'Это уже работает и приносит деньги',
            text: 'Система протестирована, запущена и принимает реальные заявки в парках.\nНе теряйте гостей, пока ваши администраторы заняты.',
            cta1: 'Посмотреть демо',
            cta2: 'Обсудить внедрение',
            brand: 'CACHALOT AI для бизнеса'
        }
    };

    return (
        <div className="min-h-screen relative">
            {/* Фон в стиле Telegram */}
            <TelegramBackground />

            {/* ЭКРАН 1 — HERO */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden">
                {/* Subtle glow for depth */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-neon-purple/5 rounded-full blur-[150px] animate-pulse-slow"></div>

                <div className="z-10 max-w-4xl text-center space-y-6 md:space-y-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight"
                    >
                        AI-менеджер для{' '}
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                            парков развлечений
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed whitespace-pre-line"
                    >
                        {t.hero.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean-800/50 border border-neon-cyan/20 text-neon-cyan text-xs md:text-sm font-mono tracking-wide backdrop-blur-md"
                    >
                        <Clock size={16} />
                        {t.hero.badge}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="pt-8"
                    >
                        <a
                            href="#demo"
                            className="inline-block px-8 md:px-10 py-4 md:py-5 bg-neon-purple text-white font-bold text-base md:text-lg rounded-xl hover:bg-purple-600 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-105"
                        >
                            {t.hero.cta}
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ЭКРАН 2 — ПРОБЛЕМА */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8"
                    >
                        {t.problem.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-slate-300 mb-8 md:mb-12 whitespace-pre-line"
                    >
                        {t.problem.text}
                    </motion.p>

                    <div className="space-y-4 md:space-y-6">
                        {t.problem.points.map((point, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-4 p-4 md:p-6 bg-red-950/20 border border-red-500/30 rounded-xl"
                            >
                                <span className="text-red-400 text-2xl md:text-3xl">❌</span>
                                <p className="text-base md:text-lg text-slate-200 flex-1">{point}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ЭКРАН 3 — РЕШЕНИЕ */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center"
                    >
                        {t.solution.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-slate-300 mb-12 md:mb-16 text-center whitespace-pre-line max-w-3xl mx-auto"
                    >
                        {t.solution.intro}
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                        {t.solution.features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 md:p-8 bg-ocean-800/30 border border-neon-cyan/20 rounded-2xl hover:border-neon-cyan/50 transition-all"
                            >
                                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl mb-4">
                                    <feature.icon className="text-neon-cyan" size={32} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-sm md:text-base text-slate-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl text-neon-cyan font-semibold text-center"
                    >
                        {t.solution.outro}
                    </motion.p>
                </div>
            </section>

            {/* ЭКРАН 4 — ЭМОЦИОНАЛЬНЫЙ ИНТЕЛЛЕКТ */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center"
                    >
                        {t.emotional.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-slate-300 mb-12 md:mb-16 text-center whitespace-pre-line max-w-3xl mx-auto"
                    >
                        {t.emotional.intro}
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                        {t.emotional.features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 md:p-8 bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 border border-neon-purple/30 rounded-2xl hover:border-neon-purple/60 transition-all"
                            >
                                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-neon-purple/10 border border-neon-purple/30 rounded-xl mb-4">
                                    <feature.icon className="text-neon-purple" size={32} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-sm md:text-base text-slate-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl text-white font-semibold text-center italic"
                    >
                        {t.emotional.outro}
                    </motion.p>
                </div>
            </section>

            {/* ЭКРАН 5 — ДОКАЗАТЕЛЬСТВО (Кейс) */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-12 md:mb-16 text-center"
                    >
                        {t.proof.title}
                    </motion.h2>

                    {/* Мокап диалога */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-ocean-800/50 border border-neon-cyan/30 rounded-3xl p-6 md:p-10 mb-8 backdrop-blur-sm"
                    >
                        <div className="space-y-6">
                            {/* Сообщение пользователя */}
                            <div className="flex justify-end">
                                <div className="bg-neon-purple/20 border border-neon-purple/40 rounded-2xl rounded-tr-sm px-5 py-4 max-w-[80%]">
                                    <p className="text-white text-sm md:text-base">
                                        Подскажите, а как познакомиться с инструктором? 😊
                                    </p>
                                </div>
                            </div>

                            {/* Ответ бота */}
                            <div className="flex justify-start">
                                <div className="bg-ocean-900/80 border border-neon-cyan/30 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={16} className="text-neon-cyan" />
                                        <span className="text-xs text-neon-cyan font-semibold">AI-менеджер</span>
                                    </div>
                                    <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                                        Отличный вопрос! 😄 Наши инструкторы всегда рады общению с гостями.
                                        Самый простой способ — подойти после аттракциона и сказать «спасибо за классный опыт!».
                                        А если хотите пригласить на кофе после смены — почему бы и нет? ☕
                                        Главное — искренность и улыбка!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm md:text-base text-slate-400 italic text-center"
                    >
                        {t.proof.caption}
                    </motion.p>
                </div>
            </section>

            {/* ЭКРАН 6 — СЦЕНАРИИ */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-12 md:mb-16 text-center"
                    >
                        {t.scenarios.title}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Режим 1 - Справочное бюро */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-ocean-800/30 border border-neon-cyan/20 rounded-2xl p-6 md:p-8"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-neon-cyan mb-6">{t.scenarios.mode1.title}</h3>

                            {/* Мокап диалога */}
                            <div className="bg-ocean-900/50 border border-neon-cyan/20 rounded-xl p-4 mb-4 space-y-4">
                                {/* Вопрос гостя */}
                                <div className="flex justify-end">
                                    <div className="bg-neon-purple/20 border border-neon-purple/40 rounded-lg rounded-tr-sm px-4 py-3 max-w-[85%]">
                                        <p className="text-white text-sm">А есть скидки многодетным?</p>
                                    </div>
                                </div>

                                {/* Ответ бота */}
                                <div className="flex justify-start">
                                    <div className="bg-ocean-800/80 border border-neon-cyan/30 rounded-lg rounded-tl-sm px-4 py-3 max-w-[90%]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles size={14} className="text-neon-cyan" />
                                            <span className="text-xs text-neon-cyan font-semibold">AI-менеджер</span>
                                        </div>
                                        <p className="text-slate-200 text-sm leading-relaxed">
                                            Да, у нас действует скидка 20% для семей с 3 и более детьми!
                                            Нужно предъявить удостоверение многодетной семьи при входе.
                                            Скидка распространяется на все аттракционы.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-700">
                                <p className="text-sm text-green-400 flex items-center gap-2">
                                    <CheckCircle size={16} />
                                    {t.scenarios.mode1.outcome}
                                </p>
                            </div>
                        </motion.div>

                        {/* Режим 2 - Лидогенерация */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-ocean-800/30 border border-neon-purple/20 rounded-2xl p-6 md:p-8"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-neon-purple mb-6">{t.scenarios.mode2.title}</h3>

                            {/* Мокап диалога */}
                            <div className="bg-ocean-900/50 border border-neon-purple/20 rounded-xl p-4 mb-4 space-y-4">
                                {/* Запрос гостя */}
                                <div className="flex justify-end">
                                    <div className="bg-neon-purple/20 border border-neon-purple/40 rounded-lg rounded-tr-sm px-4 py-3 max-w-[85%]">
                                        <p className="text-white text-sm">Хотим отметить День Рождения</p>
                                    </div>
                                </div>

                                {/* Ответ бота */}
                                <div className="flex justify-start">
                                    <div className="bg-ocean-800/80 border border-neon-purple/30 rounded-lg rounded-tl-sm px-4 py-3 max-w-[90%]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles size={14} className="text-neon-purple" />
                                            <span className="text-xs text-neon-purple font-semibold">AI-менеджер</span>
                                        </div>
                                        <p className="text-slate-200 text-sm leading-relaxed">
                                            Отлично! Мы организуем незабываемый праздник 🎉
                                            <br /><br />
                                            Подскажите, пожалуйста:<br />
                                            • Сколько лет имениннику?<br />
                                            • Сколько будет гостей?<br />
                                            • Какая дата вам подходит?
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-700">
                                <p className="text-sm text-green-400 flex items-center gap-2">
                                    <CheckCircle size={16} />
                                    {t.scenarios.mode2.outcome}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ЭКРАН 7 — ДЕНЬ РОЖДЕНИЯ */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center"
                    >
                        {t.birthday.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-slate-300 mb-10 md:mb-12 text-center"
                    >
                        {t.birthday.intro}
                    </motion.p>

                    {/* Мокап диалога бронирования */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-ocean-800/50 border border-neon-purple/30 rounded-3xl p-6 md:p-8 mb-12 backdrop-blur-sm max-w-2xl mx-auto"
                    >
                        <div className="space-y-5">
                            {/* Вопрос 1 */}
                            <div className="flex justify-start">
                                <div className="bg-ocean-900/80 border border-neon-purple/30 rounded-lg rounded-tl-sm px-4 py-3 max-w-[85%]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar size={14} className="text-neon-purple" />
                                        <span className="text-xs text-neon-purple font-semibold">AI-менеджер</span>
                                    </div>
                                    <p className="text-slate-200 text-sm">На какую дату планируете праздник?</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-neon-purple/20 border border-neon-purple/40 rounded-lg rounded-tr-sm px-4 py-3 max-w-[75%]">
                                    <p className="text-white text-sm">15 марта, суббота</p>
                                </div>
                            </div>

                            {/* Вопрос 2 */}
                            <div className="flex justify-start">
                                <div className="bg-ocean-900/80 border border-neon-purple/30 rounded-lg rounded-tl-sm px-4 py-3 max-w-[85%]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users size={14} className="text-neon-purple" />
                                        <span className="text-xs text-neon-purple font-semibold">AI-менеджер</span>
                                    </div>
                                    <p className="text-slate-200 text-sm">Сколько будет детей и взрослых?</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-neon-purple/20 border border-neon-purple/40 rounded-lg rounded-tr-sm px-4 py-3 max-w-[75%]">
                                    <p className="text-white text-sm">10 детей + 5 взрослых</p>
                                </div>
                            </div>

                            {/* Вопрос 3 */}
                            <div className="flex justify-start">
                                <div className="bg-ocean-900/80 border border-neon-purple/30 rounded-lg rounded-tl-sm px-4 py-3 max-w-[85%]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Utensils size={14} className="text-neon-purple" />
                                        <span className="text-xs text-neon-purple font-semibold">AI-менеджер</span>
                                    </div>
                                    <p className="text-slate-200 text-sm">Нужен ли праздничный стол с угощениями?</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-neon-purple/20 border border-neon-purple/40 rounded-lg rounded-tr-sm px-4 py-3 max-w-[75%]">
                                    <p className="text-white text-sm">Да, с пиццей и напитками</p>
                                </div>
                            </div>

                            {/* Итоговое подтверждение */}
                            <div className="flex justify-start">
                                <div className="bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 border border-neon-purple/50 rounded-lg rounded-tl-sm px-4 py-3 max-w-[90%]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle size={14} className="text-green-400" />
                                        <span className="text-xs text-green-400 font-semibold">Заявка сформирована</span>
                                    </div>
                                    <p className="text-slate-200 text-sm leading-relaxed">
                                        Отлично! Я передал заявку менеджеру:<br />
                                        📅 15 марта (суббота)<br />
                                        👥 10 детей + 5 взрослых<br />
                                        🍕 Праздничный стол<br /><br />
                                        Наш менеджер свяжется с вами в течение 15 минут для уточнения деталей!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-neon-cyan font-semibold text-center"
                    >
                        {t.birthday.outro}
                    </motion.p>
                </div>
            </section>

            {/* ЭКРАН 8 — УМНЫЙ КОНТЕКСТ */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full mb-8">
                            <Brain className="text-neon-cyan" size={32} />
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8">
                            {t.context.title}
                        </h2>

                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
                            {t.context.text}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ЭКРАН 9 — КАНАЛЫ СВЯЗИ */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-12 md:mb-16 text-center"
                    >
                        {t.channels.title}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                        {t.channels.platforms.map((platform, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center justify-center gap-3 p-6 md:p-8 bg-ocean-800/40 border border-neon-cyan/30 rounded-2xl hover:border-neon-cyan/60 transition-all"
                            >
                                <MessageCircle className="text-neon-cyan" size={28} />
                                <span className="text-lg md:text-xl font-semibold text-white">{platform}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-slate-300 text-center whitespace-pre-line max-w-3xl mx-auto"
                    >
                        {t.channels.text}
                    </motion.p>
                </div>
            </section>

            {/* ЭКРАН 10 — АДМИНКА */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center"
                    >
                        {t.admin.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-slate-300 mb-10 md:mb-12 text-center"
                    >
                        {t.admin.intro}
                    </motion.p>

                    <div className="space-y-4 md:space-y-6 mb-12">
                        {t.admin.features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-4 p-5 md:p-6 bg-ocean-800/40 border border-neon-cyan/30 rounded-xl hover:bg-ocean-800/60 transition-all"
                            >
                                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg flex-shrink-0">
                                    <feature.icon className="text-neon-cyan" size={24} />
                                </div>
                                <p className="text-base md:text-lg text-slate-200 flex-1">{feature.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl text-neon-cyan font-bold text-center"
                    >
                        {t.admin.outro}
                    </motion.p>
                </div>
            </section>

            {/* ЭКРАН 11 — ФИНАЛЬНЫЙ CTA */}
            <section id="demo" className="py-24 md:py-40 px-4 md:px-8 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-neon-purple/10 rounded-full blur-[150px]"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight"
                    >
                        {t.final.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-2xl text-slate-300 mb-12 md:mb-16 whitespace-pre-line max-w-3xl mx-auto leading-relaxed"
                    >
                        {t.final.text}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-16"
                    >
                        <a
                            href="https://t.me/cachalot_ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-neon-purple text-white font-bold text-base md:text-lg rounded-xl hover:bg-purple-600 transition-all shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:scale-105 flex items-center justify-center gap-2"
                        >
                            {t.final.cta1}
                            <ArrowRight size={20} />
                        </a>
                        <a
                            href="https://t.me/cachalot_ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 border-2 border-neon-cyan text-neon-cyan font-bold text-base md:text-lg rounded-xl hover:bg-neon-cyan/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                        >
                            {t.final.cta2}
                            <MessageCircle size={20} />
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="pt-8 border-t border-slate-700"
                    >
                        <p className="text-sm md:text-base text-slate-500 font-mono tracking-wider">
                            {t.final.brand}
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ParkManagerPage;
