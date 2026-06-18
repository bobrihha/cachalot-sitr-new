import { useEffect, useRef } from 'react';

type ParticleGridProps = {
    className?: string;
};

const ParticleGrid = ({ className = '' }: ParticleGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;
            pulse: number;
        }> = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const numParticles = Math.floor((canvas.width * canvas.height) / 15000);

            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.5 + 0.2,
                    pulse: Math.random() * Math.PI * 2,
                });
            }
        };

        const drawGrid = () => {
            const gridSize = 80;
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
            ctx.lineWidth = 1;

            // Vertical lines
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        };

        const drawConnections = () => {
            const connectionDistance = 150;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha = (1 - dist / connectionDistance) * 0.15;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw subtle grid
            drawGrid();

            // Update and draw particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.pulse += 0.02;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Pulsing alpha
                const pulsingAlpha = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3);

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(6, 182, 212, ${pulsingAlpha})`;
                ctx.fill();

                // Glow effect
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(6, 182, 212, ${pulsingAlpha * 0.1})`;
                ctx.fill();
            });

            // Draw connections between nearby particles
            drawConnections();

            animationId = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-0 ${className}`}
            style={{ opacity: 0.6 }}
        />
    );
};

export default ParticleGrid;
