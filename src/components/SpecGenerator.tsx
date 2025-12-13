import { useEffect, useRef, useState } from 'react';
import { generateProjectSpec } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Send } from 'lucide-react';
import type { Lang } from '../site';

type SpecGeneratorProps = {
    lang: Lang;
};

const SpecGenerator = ({ lang }: SpecGeneratorProps) => {
    const [idea, setIdea] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const formatToParagraphs = (text: string) => {
        const normalized = text.replace(/\r\n/g, '\n').trim();
        if (!normalized) return '';

        // If the model already returned blank-line-separated blocks, keep them.
        if (/\n{2,}/.test(normalized)) return normalized;

        // If there are single newlines, expand them to paragraph breaks.
        if (normalized.includes('\n')) {
            const lines = normalized.split('\n').map((line) => line.trim()).filter(Boolean);
            return lines.join('\n\n');
        }

        // Otherwise, chunk sentences into paragraphs (2 sentences per block).
        const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean);
        const paragraphs: string[] = [];
        for (let i = 0; i < sentences.length; i += 2) {
            paragraphs.push([sentences[i], sentences[i + 1]].filter(Boolean).join(' '));
        }
        return paragraphs.join('\n\n');
    };

    const handleGenerate = async () => {
        if (!idea.trim()) return;
        setIsLoading(true);
        setResult('');
        try {
            const text = await generateProjectSpec(idea, lang);
            setResult(formatToParagraphs(text));
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const onPrefill = (event: Event) => {
            const custom = event as CustomEvent<string>;
            if (typeof custom.detail !== 'string') return;
            setIdea(custom.detail);
            setResult('');
            requestAnimationFrame(() => textareaRef.current?.focus());
        };

        window.addEventListener('ai-architect-prefill', onPrefill);
        return () => window.removeEventListener('ai-architect-prefill', onPrefill);
    }, []);

    const t = lang === 'en'
        ? {
            title: 'Pick an AI solution for your task',
            subtitle: 'Describe your task in plain language — AI will turn it into a clear spec and propose a solution.',
            placeholder: 'Example: An assistant that books customers into our calendar and sends reminders…',
            micro: 'Free. No commitments. Works for small businesses and teams.',
            loading: 'Generating…',
            cta: 'Generate solution'
        }
        : {
            title: 'Подберите AI-решение под вашу задачу',
            subtitle: 'Опишите задачу своими словами — AI превратит её в понятное техническое задание и предложит решение.',
            placeholder: 'Например: Бот для автосервиса, который сам записывает клиентов в календаре Bitrix24 и напоминает о записи...',
            micro: 'Бесплатно. Без обязательств. Подходит для малого бизнеса и компаний.',
            loading: 'Генерирую…',
            cta: 'Сформировать AI-решение'
        };

    return (
        <div className="w-full max-w-4xl mx-auto font-sans">
            {/* Dark Glass Container */}
            <div className="bg-ocean-900/45 backdrop-blur-xl rounded-[2rem] border border-neon-cyan/25 shadow-[0_0_80px_rgba(6,182,212,0.12)] overflow-hidden relative group hover:border-neon-cyan/40 transition-all duration-500">

                {/* Декоративное свечение */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>

                {/* Header */}
                <div className="p-8 border-b border-white/5 bg-white/5">
                    <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <Sparkles className="text-neon-cyan" />
                        {t.title}
                    </h3>
                    <p className="text-slate-400 mt-2 font-light">
                        {t.subtitle}
                    </p>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">
                    <div className="relative">
                        <textarea
                            ref={textareaRef}
                            className="w-full h-32 p-4 bg-ocean-950/60 rounded-xl border border-white/10 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all outline-none resize-none text-slate-300 font-light leading-relaxed placeholder-slate-600"
                            placeholder={t.placeholder}
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            disabled={isLoading}
                        />
                        <p className="mt-3 text-xs md:text-sm text-slate-500 font-light">
                            {t.micro}
                        </p>
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !idea}
                            className={`absolute bottom-4 right-4 px-4 py-2 rounded-lg transition-all font-semibold text-sm flex items-center gap-2 ${isLoading || !idea
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-neon-cyan text-ocean-950 hover:bg-cyan-400 shadow-lg shadow-cyan-900/20'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin h-4 w-4 border-2 border-ocean-950 border-t-transparent rounded-full" />
                                    {t.loading}
                                </>
                            ) : (
                                <>
                                    {t.cta}
                                    <Send size={18} />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Result */}
                    {result && (
                        <div className="bg-black/20 p-6 rounded-xl border border-white/5 animate-fade-in text-left">
                            <div className="prose prose-invert prose-lg text-slate-300 font-light leading-relaxed prose-p:!text-slate-400 prose-p:font-light prose-p:leading-relaxed prose-headings:!text-slate-300 prose-strong:!text-slate-400 prose-li:!text-slate-400 max-w-none">
                                <ReactMarkdown>{result}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpecGenerator;
