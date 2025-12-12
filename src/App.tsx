import OceanBackground from './components/OceanBackground';
import Hero from './components/Hero';
import SpecGenerator from './components/SpecGenerator';
import ChatWidget from './components/ChatWidget';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Cases from './components/Cases'; // Импортируем новый компонент

function App() {
    return (
        <div className="min-h-screen text-slate-200 selection:bg-neon-cyan selection:text-ocean-950 font-sans">

            {/* Глобальный фон */}
            <OceanBackground />

            {/* Навигация */}
            <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-ocean-950/80 backdrop-blur-md border-b border-white/5 transition-all">
                <div className="text-xl font-bold tracking-widest text-white flex items-center gap-2 select-none cursor-pointer">
                    CACHALOT<span className="text-neon-cyan">.</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                    <a href="#about" className="hover:text-neon-cyan transition-colors">Философия</a>
                    <a href="#services" className="hover:text-neon-cyan transition-colors">Услуги</a>
                    <a href="#cases" className="hover:text-neon-cyan transition-colors">Кейсы</a>
                </div>
                <button className="px-5 py-2 text-xs font-bold bg-white text-ocean-950 rounded hover:bg-neon-cyan transition-colors">
                    Связаться
                </button>
            </nav>

            <main className="relative z-10">
                <Hero />
                <Philosophy />
                <Services />

                {/* Секция Кейсов */}
                <Cases />

                {/* Генератор ТЗ */}
                <section className="py-24 relative">
                    <div className="max-w-7xl mx-auto px-4">
                        <SpecGenerator />
                    </div>
                </section>

            </main>

            <footer className="py-10 text-center text-slate-600 text-sm border-t border-white/5 bg-ocean-950 relative z-10">
                © 2025 Cachalot Digital Lab. Deep Tech Solutions.
            </footer>

            <ChatWidget />
        </div>
    );
}

export default App;
