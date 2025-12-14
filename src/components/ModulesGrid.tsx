import React from 'react';
import type { Lang } from '../site';
import {
    ShoppingBag,
    MessageCircle,
    Share2,
    Send,
    MessageSquareText,
    Database,
    FileText,
    Brain,
    Briefcase
} from 'lucide-react';

type ModulesGridProps = {
    lang: Lang;
};

const ModulesGrid: React.FC<ModulesGridProps> = ({ lang }) => {
    const title = lang === 'en' ? 'AI as a modular system for your business' : 'AI как конструктор под ваш бизнес';
    const subtitle = lang === 'en'
        ? 'Choose a base package — we add the modules your business needs'
        : 'Вы выбираете базовый пакет — мы подключаем нужные модули под задачи бизнеса';

    const bottomText = lang === 'en'
        ? 'We build AI solutions as a modular system — tailored to your business processes.'
        : 'Мы собираем AI-решение как конструктор — под конкретные задачи вашего бизнеса.';

    const modulesRu = [
        {
            title: 'AI-бот для Avito',
            desc: ['Мгновенно реагирует на сообщения', 'Принимает заявки 24/7', 'Задаёт уточняющие вопросы', 'Сохраняет контакты и условия'],
            icon: <ShoppingBag className="w-10 h-10 text-neon-cyan" />
        },
        {
            title: 'AI-менеджер в WhatsApp',
            desc: ['Ведёт диалог как человек', 'Помнит контекст разговора', 'Не теряет детали заказа', 'Разгружает менеджеров'],
            icon: <MessageCircle className="w-10 h-10 text-green-500" />
        },
        {
            title: 'AI для ВКонтакте',
            desc: ['Работает в личных сообщениях', 'В группах и сообществах', 'Консультирует и фиксирует заявки'],
            icon: <Share2 className="w-10 h-10 text-blue-500" />
        },
        {
            title: 'AI-ассистент в Telegram',
            desc: ['Отвечает клиентам 24/7', 'Сохраняет историю общения', 'Передаёт диалог человеку при готовности'],
            icon: <Send className="w-10 h-10 text-sky-400" />
        },
        {
            title: 'AI-консультант на сайте',
            desc: ['Встречает посетителей сайта', 'Объясняет услуги и отвечает на вопросы', 'Помогает клиенту дойти до решения'],
            icon: <MessageSquareText className="w-10 h-10 text-indigo-400" />
        },
        {
            title: 'CRM и учёт заявок',
            desc: ['Интеграция с Bitrix24, AmoCRM', 'Google Таблицы', 'AI сохраняет заявки и наводит порядок'],
            icon: <Database className="w-10 h-10 text-orange-400" />
        },
        {
            title: 'Расширенная база знаний',
            desc: ['Загружаются документы и договоры', 'Инструкции и регламенты', 'AI использует их при ответах'],
            icon: <FileText className="w-10 h-10 text-gray-300" />
        },
        {
            title: 'Память клиента',
            desc: ['Запоминает имя и историю', 'Учитывает прошлые договорённости', 'Продолжает диалог даже через месяцы'],
            icon: <Brain className="w-10 h-10 text-purple-400" />
        },
        {
            title: 'Внутренний AI для команды',
            desc: ['Помнит контрагентов, договоры, итоги встреч и отвечает сотрудникам вместо поисков по чатам, файлам и CRM'],
            icon: <Briefcase className="w-10 h-10 text-teal-400" />
        }
    ];

    const modulesEn = [
        {
            title: 'AI consultant on your website',
            desc: ['answers questions 24/7', 'explains your services', 'qualifies requests', 'collects leads and contact details'],
            icon: <MessageSquareText className="w-10 h-10 text-indigo-400" />
        },
        {
            title: 'AI manager in WhatsApp',
            desc: ['natural conversation style', 'remembers context and details', 'handles repetitive questions', 'reduces workload for your team'],
            icon: <MessageCircle className="w-10 h-10 text-green-500" />
        },
        {
            title: 'AI for Instagram & Facebook',
            desc: ['Instagram Direct Messages', 'Facebook Messenger', 'business inboxes', 'Captures inquiries automatically'],
            icon: <Share2 className="w-10 h-10 text-blue-500" />
        },
        {
            title: 'AI for marketplaces and listing platforms',
            desc: ['service marketplaces', 'listing platforms', 'classified or booking platforms', 'Instant replies increase conversion'],
            icon: <ShoppingBag className="w-10 h-10 text-neon-cyan" />
        },
        {
            title: 'AI assistant in Telegram',
            desc: ['responds to clients 24/7', 'accepts inquiries', 'keeps conversation history', 'escalates only when client is ready'],
            icon: <Send className="w-10 h-10 text-sky-400" />
        },
        {
            title: 'AI connected to your CRM',
            desc: ['HubSpot / Pipedrive', 'Zoho / Google Sheets', 'or your custom CRM', 'Organizes incoming requests'],
            icon: <Database className="w-10 h-10 text-orange-400" />
        },
        {
            title: 'AI powered by documents and files',
            desc: ['upload documents', 'contracts & policies', 'instructions', 'AI uses this info when responding'],
            icon: <FileText className="w-10 h-10 text-gray-300" />
        },
        {
            title: 'AI that remembers your customers',
            desc: ['remembers client names', 'keeps conversation history', 'takes previous agreements into account', 'continues conversation months later'],
            icon: <Brain className="w-10 h-10 text-purple-400" />
        },
        {
            title: 'AI assistant for employees',
            desc: ['onboard new employees', 'answer internal questions', 'provide quick access to policies', 'Useful for growing companies'],
            icon: <Briefcase className="w-10 h-10 text-teal-400" />
        }
    ];

    const modules = lang === 'en' ? modulesEn : modulesRu;

    return (
        <section className="py-20 relative bg-ocean-900/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {title}
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((mod, idx) => (
                        <div key={idx} className="bg-ocean-800/50 border border-white/5 p-6 rounded-2xl hover:border-neon-cyan/30 transition-colors group">
                            <div className="mb-4 group-hover:scale-110 transition-transform duration-300 transform origin-left">
                                {mod.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                                {mod.title}
                            </h3>
                            <ul className="space-y-2">
                                {mod.desc.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                                        <span className="text-neon-cyan/70 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-block bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-neon-cyan/20 rounded-xl p-6 md:p-8">
                        <p className="text-lg md:text-xl text-white font-medium">
                            {bottomText}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModulesGrid;
