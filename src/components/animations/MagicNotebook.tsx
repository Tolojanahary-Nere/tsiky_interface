import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../App';
interface MagicNotebookProps {
  size?: number;
}
export const MagicNotebook: React.FC<MagicNotebookProps> = ({
  size = 100
}) => {
  const [isFilled, setIsFilled] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);
  const {
    isDarkMode
  } = useContext(ThemeContext);
  // Couleurs adaptées au mode
  const lightColors = ['#A8E6CF', '#FFAAA5', '#FFD3B6', '#C4B5FD', '#FDFFB6'];
  const darkColors = ['#366699', '#8C7361', '#1F4D40', '#4D2D2A', '#6E5A4D'];
  const colors = isDarkMode ? darkColors : lightColors;
  const handleClick = () => {
    if (!isFilled) {
      setIsFilled(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setFillProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 50);
    } else {
      setIsFilled(false);
      setFillProgress(0);
    }
  };
  return <motion.div className="relative cursor-pointer" style={{
    width: size,
    height: size * 1.2
  }} onClick={handleClick} whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }}>
      {/* Couverture */}
      <motion.div className={`absolute w-full h-full ${isDarkMode ? 'bg-dark-calm-500' : 'bg-calm-300'} rounded-lg shadow-lg theme-transition`} animate={isFilled ? {
      rotateY: 180
    } : {
      rotateY: 0
    }} transition={{
      duration: 0.5
    }}>
        {/* Spirales */}
        <div className={`absolute left-2 top-4 w-4 h-4 border-2 ${isDarkMode ? 'border-dark-calm-700' : 'border-calm-500'} rounded-full theme-transition`} />
        <div className={`absolute left-2 top-12 w-4 h-4 border-2 ${isDarkMode ? 'border-dark-calm-700' : 'border-calm-500'} rounded-full theme-transition`} />
        <div className={`absolute left-2 top-20 w-4 h-4 border-2 ${isDarkMode ? 'border-dark-calm-700' : 'border-calm-500'} rounded-full theme-transition`} />
        {/* Titre */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-comic text-lg">
          Notes
        </div>
      </motion.div>
      {/* Pages */}
      <motion.div className={`absolute w-[95%] h-[95%] ${isDarkMode ? 'bg-dark-calm-50' : 'bg-white'} rounded-lg left-[2.5%] top-[2.5%] theme-transition`} animate={isFilled ? {
      rotateY: 0
    } : {
      rotateY: -180
    }} style={{
      backfaceVisibility: 'hidden'
    }} transition={{
      duration: 0.5
    }}>
        {/* Lignes */}
        {Array.from({
        length: 10
      }).map((_, i) => <div key={i} className={`absolute w-[80%] h-0.5 ${isDarkMode ? 'bg-dark-calm-300' : 'bg-gray-200'} left-[10%] theme-transition`} style={{
        top: `${15 + i * 8}%`
      }} />)}
        {/* Contenu coloré */}
        {isFilled && Array.from({
        length: Math.floor(fillProgress / 10)
      }).map((_, i) => <motion.div key={i} className="absolute h-6 rounded-sm" style={{
        width: `${Math.random() * 40 + 40}%`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        left: '10%',
        top: `${15 + i * 8}%`,
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.3,
        delay: i * 0.1
      }} />)}
      </motion.div>
    </motion.div>;
};