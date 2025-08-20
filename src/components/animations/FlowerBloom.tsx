import React, { useState } from 'react';
import { motion } from 'framer-motion';
interface FlowerBloomProps {
  size?: number;
  onClick?: () => void;
}
export const FlowerBloom: React.FC<FlowerBloomProps> = ({
  size = 80,
  onClick
}) => {
  const [isBlossomed, setIsBlossomed] = useState(false);
  const handleClick = () => {
    setIsBlossomed(!isBlossomed);
    if (onClick) onClick();
  };
  return <motion.div className="relative cursor-pointer" style={{
    width: size,
    height: size
  }} onClick={handleClick} whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }}>
      {/* Tige */}
      <motion.div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-hope w-1.5 rounded-full" initial={{
      height: size * 0.3
    }} animate={{
      height: size * 0.5
    }} transition={{
      duration: 1,
      delay: 0.5
    }} />
      {/* Feuille */}
      <motion.div className="absolute bottom-6 left-1/4 w-4 h-6 bg-hope rounded-full origin-bottom -rotate-45" initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      duration: 0.5,
      delay: 1
    }} />
      {/* Pétales */}
      {Array.from({
      length: 8
    }).map((_, i) => <motion.div key={i} className="absolute bg-gentle rounded-full origin-center" style={{
      width: size * 0.25,
      height: size * 0.35,
      top: '25%',
      left: '50%',
      transformOrigin: `${-size * 0.05}px ${size * 0.2}px`,
      transform: `rotate(${i * 45}deg) translateX(-50%)`
    }} initial={{
      scale: 0
    }} animate={{
      scale: isBlossomed ? 1 : 0.4,
      backgroundColor: isBlossomed ? '#FFAAA5' : '#FFC8C5'
    }} transition={{
      duration: 1,
      delay: i * 0.1
    }} />)}
      {/* Centre */}
      <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-comfort-300 rounded-full" initial={{
      width: size * 0.2,
      height: size * 0.2
    }} animate={{
      width: isBlossomed ? size * 0.3 : size * 0.2,
      height: isBlossomed ? size * 0.3 : size * 0.2,
      backgroundColor: isBlossomed ? '#FFCC99' : '#FFD3B6'
    }} transition={{
      duration: 0.8
    }} />
    </motion.div>;
};