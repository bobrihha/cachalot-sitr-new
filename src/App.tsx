import OceanBackground from './components/OceanBackground';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import SpecGenerator from './components/SpecGenerator';
import SolutionScenarios from './components/SolutionScenarios';
import GettingStarted from './components/GettingStarted';
import PricingFormats from './components/PricingFormats';
import ChatWidget from './components/ChatWidget';
import ApproachPage from './components/ApproachPage';
import Services from './components/Services';
import Cases from './components/Cases';
import Footer from './components/Footer'; // <-- Импортируем Footer
import { approachPath, homePath, type Lang, type Page } from './site';

type AppProps = {
    lang: Lang;
    page: Page;
};

function App({ lang, page }: AppProps) {
    const isApproachPage = page === 'approach';
    const homeHref = homePath(lang);
    const approachHref = approachPath(lang);

    const labels = lang === 'en'
        ? {
            approach: 'Approach',
            services: 'Solutions',
            pricing: 'Pricing',
            cases: 'Cases',
            cta: 'Pick an AI solution'
        }
        : {
            approach: 'Подход',
            services: 'Решения',
            pricing: 'Цены',
            cases: 'Кейсы',
            cta: 'Подобрать AI-решение'
        };

    return (
        <div className="min-h-screen text-slate-200 selection:bg-neon-cyan selection:text-ocean-950 font-sans">

            {/* Глобальный фон */}
            <OceanBackground />

            {/* Навигация */}
            <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-ocean-950/80 backdrop-blur-md border-b border-white/5 transition-all">
                <a href={homeHref} className="text-xl font-bold tracking-widest text-white flex items-center gap-2 select-none">
                    CACHALOT<span className="text-neon-cyan">.</span>
                </a>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                    <a href={approachHref} className="hover:text-neon-cyan transition-colors">{labels.approach}</a>
                    <a href={isApproachPage ? `${homeHref}#services` : '#services'} className="hover:text-neon-cyan transition-colors">{labels.services}</a>
                    <a href={isApproachPage ? `${homeHref}#pricing` : '#pricing'} className="hover:text-neon-cyan transition-colors">{labels.pricing}</a>
                    <a href={isApproachPage ? `${homeHref}#cases` : '#cases'} className="hover:text-neon-cyan transition-colors">{labels.cases}</a>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
                        <a
                            href={isApproachPage ? '/approach/' : '/'}
                            className={lang === 'ru' ? 'text-white' : 'hover:text-neon-cyan transition-colors'}
                        >
                            RU
                        </a>
                        <span className="text-slate-600">|</span>
                        <a
                            href={isApproachPage ? '/en/approach/' : '/en/'}
                            className={lang === 'en' ? 'text-white' : 'hover:text-neon-cyan transition-colors'}
                        >
                            EN
                        </a>
                    </div>
                    <a href={isApproachPage ? `${homeHref}#ai-architect` : '#ai-architect'} className="px-5 py-2 text-xs font-bold bg-white text-ocean-950 rounded hover:bg-neon-cyan transition-colors">
                        {labels.cta}
                    </a>
                </div>
            </nav>

            {isApproachPage ? (
                <ApproachPage lang={lang} />
            ) : (
                <main className="relative z-10">
                    <Hero lang={lang} />
                    <PainPoints lang={lang} />
                    <Services lang={lang} />
                    <Cases lang={lang} />

                    <SolutionScenarios lang={lang} />

                    <GettingStarted lang={lang} />

                    {/* AI Architect (главный вход) */}
                    <section id="ai-architect" className="py-28 md:py-32 relative">
                        <div className="max-w-7xl mx-auto px-4">
                            <SpecGenerator lang={lang} />
                        </div>
                    </section>

                    <PricingFormats lang={lang} />
                </main>
            )}

            {/* Финальный блок контактов */}
            <Footer lang={lang} page={page} />

            <ChatWidget />
        </div>
    );
}

export default App;
