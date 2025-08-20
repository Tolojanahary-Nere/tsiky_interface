import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../App';
interface MiniSunProps {
  size?: number;
}
export const MiniSun: React.FC<MiniSunProps> = ({
  size = 60
}) => {
  const [isShining, setIsShining] = useState(false);
  const {
    isDarkMode
  } = useContext(ThemeContext);
  return <motion.div className="relative cursor-pointer" style={{
    width: size,
    height: size
  }} onMouseEnter={() => setIsShining(true)} onMouseLeave={() => setIsShining(false)} animate={isShining ? {
    filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
  } : {}} transition={{
    duration: 1.5,
    repeat: isShining ? Infinity : 0
  }}>
      {/* Corps du soleil ou de la lune */}
      <motion.div className={`absolute inset-0 ${isDarkMode ? 'bg-dark-calm-600' : 'bg-comfort-300'} rounded-full theme-transition`} animate={isShining ? {
      scale: [1, 1.1, 1]
    } : {}} transition={{
      duration: 2,
      repeat: isShining ? Infinity : 0
    }} />
      {/* Rayons */}
      {Array.from({
      length: isDarkMode ? 8 : 12
    }).map((_, i) => <motion.div key={i} className={`absolute ${isDarkMode ? 'bg-dark-calm-500' : 'bg-comfort-200'} rounded-full theme-transition`} style={{
      width: size * 0.1,
      height: isDarkMode ? size * 0.25 : size * 0.3,
      left: '50%',
      top: '50%',
      transformOrigin: 'center bottom',
      transform: `rotate(${i * (isDarkMode ? 45 : 30)}deg) translateX(-50%) translateY(-100%)`
    }} animate={isShining ? {
      height: isDarkMode ? [size * 0.25, size * 0.35, size * 0.25] : [size * 0.3, size * 0.4, size * 0.3],
      opacity: isDarkMode ? [0.4, 0.8, 0.4] : [0.6, 1, 0.6]
    } : {}} transition={{
      duration: 2,
      repeat: isShining ? Infinity : 0,
      delay: i * 0.1 % 1
    }} />)}
      {/* Visage */}
      {isShining && <>
          {/* Yeux */}
          <motion.div className={`absolute ${isDarkMode ? 'bg-dark-calm-800' : 'bg-comfort-600'} rounded-full theme-transition`} style={{
        width: size * 0.08,
        height: size * 0.08,
        top: size * 0.35,
        left: size * 0.3
      }} initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        duration: 0.3
      }} />
          <motion.div className={`absolute ${isDarkMode ? 'bg-dark-calm-800' : 'bg-comfort-600'} rounded-full theme-transition`} style={{
        width: size * 0.08,
        height: size * 0.08,
        top: size * 0.35,
        right: size * 0.3
      }} initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        duration: 0.3
      }} />
          {/* Sourire */}
          <motion.div className={`absolute ${isDarkMode ? 'bg-dark-calm-800' : 'bg-comfort-600'} rounded-full theme-transition`} style={{
        width: size * 0.3,
        height: size * 0.15,
        bottom: size * 0.25,
        left: size * 0.35
      }} initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        duration: 0.3
      }}>
            <div className={`absolute ${isDarkMode ? 'bg-dark-calm-600' : 'bg-comfort-300'} rounded-full theme-transition`} style={{
          width: size * 0.3,
          height: size * 0.1,
          bottom: size * 0.05
        }} />
          </motion.div>
        </>}
    </motion.div>;
};