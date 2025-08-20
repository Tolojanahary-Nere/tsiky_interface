import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../App';
// Composant pour générer des étoiles animées en arrière-plan
export const StarAnimation: React.FC = () => {
  const [stars, setStars] = useState<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
  }[]>([]);
  const {
    isDarkMode
  } = useContext(ThemeContext);
  useEffect(() => {
    // Créer des étoiles aléatoires
    const starsCount = isDarkMode ? 25 : 15; // Plus d'étoiles en mode sombre
    const newStars = [];
    for (let i = 0; i < starsCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 5 // délai d'animation
      });
    }
    setStars(newStars);
  }, [isDarkMode]);
  return <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map(star => <motion.div key={star.id} className={`absolute rounded-full ${isDarkMode ? 'bg-white/30' : 'bg-white'}`} style={{
      left: `${star.x}%`,
      top: `${star.y}%`,
      width: `${star.size}px`,
      height: `${star.size}px`
    }} animate={{
      opacity: isDarkMode ? [0.3, 0.9, 0.3] : [0.2, 0.8, 0.2],
      scale: [1, 1.2, 1]
    }} transition={{
      duration: 4,
      delay: star.delay,
      repeat: Infinity,
      ease: 'easeInOut'
    }} />)}
    </div>;
};