import React from 'react';
import type { Lang } from '../site';

type MemorySectionProps = {
    lang: Lang;
};

const MemorySection: React.FC<MemorySectionProps> = ({ lang }) => {
    const content = lang === 'en' ? {
        title: 'AI That Truly Remembers',
        text1: 'Cachalot AI remembers clients, conversations, and agreements. It never loses context and never asks to repeat the same thing.',
        text2: 'Even if a client writes a month later — the AI continues the conversation exactly from where it left off.'
    } : {
        title: 'AI, который действительно помнит',
        text1: 'AI Cachalot помнит клиентов, переписки и договорённости. Он не теряет контекст и не просит повторять одно и то же.',
        text2: 'Даже если клиент написал через месяц — AI продолжает разговор с того места, где остановился.'
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-purple/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple">
                    {content.title}
                </h2>
                <div className="space-y-6 text-xl text-slate-300 leading-relaxed">
                    <p>
                        {content.text1}
                    </p>
                    <p className="font-semibold text-white">
                        {content.text2}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default MemorySection;
