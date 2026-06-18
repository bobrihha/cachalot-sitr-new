import { motion } from 'framer-motion';

type DividerType = 'wave' | 'diagonal' | 'circuit';

type SectionDividerProps = {
    type?: DividerType;
    flip?: boolean;
    className?: string;
};

const SectionDivider = ({ type = 'wave', flip = false, className = '' }: SectionDividerProps) => {
    const transform = flip ? 'rotate(180deg)' : 'none';

    if (type === 'wave') {
        return (
            <div className={`relative w-full overflow-hidden ${className}`} style={{ transform }}>
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
                        fill="url(#waveGradient)"
                    />
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
                            <stop offset="50%" stopColor="rgba(124, 58, 237, 0.15)" />
                            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
                        </linearGradient>
                    </defs>
                </svg>
                {/* Animated glow line */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                    initial={{ x: '-100%' }}
                    whileInView={{ x: '100%' }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
                    viewport={{ once: false }}
                />
            </div>
        );
    }

    if (type === 'diagonal') {
        return (
            <div className={`relative w-full h-24 overflow-hidden ${className}`} style={{ transform }}>
                <svg
                    viewBox="0 0 1440 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                >
                    <motion.polygon
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        points="0,100 1440,0 1440,100"
                        fill="url(#diagGradient)"
                    />
                    <defs>
                        <linearGradient id="diagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.08)" />
                            <stop offset="100%" stopColor="rgba(124, 58, 237, 0.12)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    if (type === 'circuit') {
        return (
            <div className={`relative w-full h-16 overflow-hidden ${className}`} style={{ transform }}>
                <svg
                    viewBox="0 0 1440 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                >
                    {/* Circuit-like horizontal lines */}
                    <motion.line
                        x1="0" y1="30" x2="1440" y2="30"
                        stroke="rgba(6, 182, 212, 0.3)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                    />
                    {/* Nodes */}
                    {[120, 360, 600, 840, 1080, 1320].map((x, i) => (
                        <motion.circle
                            key={x}
                            cx={x}
                            cy="30"
                            r="4"
                            fill="#06b6d4"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                            viewport={{ once: true }}
                        />
                    ))}
                </svg>
                {/* Traveling pulse */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-20 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent blur-sm"
                    initial={{ x: '-80px' }}
                    whileInView={{ x: 'calc(100vw + 80px)' }}
                    transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
                    viewport={{ once: false }}
                />
            </div>
        );
    }

    return null;
};

export default SectionDivider;
