import React from 'react';
import { motion } from 'framer-motion';

interface GlowingButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    glowColor?: string;
    isDarkMode?: boolean;
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
    children,
    onClick,
    className = '',
    glowColor,
    isDarkMode = false,
}) => {
    const defaultGlowColor = isDarkMode ? '#99CCFF' : '#FF7531';
    const finalGlowColor = glowColor || defaultGlowColor;

    return (
        <motion.button
            onClick={onClick}
            className={`relative overflow-hidden ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-full blur-xl opacity-50"
                style={{ backgroundColor: finalGlowColor }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                animate={{
                    x: ['-100%', '200%'],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Button content */}
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};
