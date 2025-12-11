import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
}

export const MagicParticles: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const colors = isDarkMode
            ? ['#99CCFF', '#D9C8BA', '#77AAEE', '#BFAA99', '#5588CC']
            : ['#FFD3B6', '#A8E6CF', '#99CAFF', '#FFAAA5', '#CCE5FF'];

        const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5,
        }));

        setParticles(newParticles);
    }, [isDarkMode]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full blur-sm"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.sin(particle.id) * 50, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};
