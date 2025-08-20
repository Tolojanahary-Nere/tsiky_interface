import React from 'react';
import { motion } from 'framer-motion';
export const BearMascot: React.FC = () => {
  return <motion.div className="relative w-32 h-32 mx-auto" animate={{
    y: [0, -10, 0]
  }} transition={{
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }}>
      {/* Corps de l'ours */}
      <div className="absolute w-24 h-20 bg-comfort-200 rounded-3xl left-4 top-10" />
      {/* Tête */}
      <div className="absolute w-20 h-16 bg-comfort-200 rounded-full left-6 top-0">
        {/* Oreilles */}
        <div className="absolute w-6 h-6 bg-comfort-200 rounded-full -left-1 -top-1" />
        <div className="absolute w-6 h-6 bg-comfort-200 rounded-full right-0 -top-1" />
        {/* Yeux */}
        <div className="absolute w-2 h-3 bg-text rounded-full left-5 top-6" />
        <div className="absolute w-2 h-3 bg-text rounded-full right-5 top-6" />
        {/* Museau */}
        <div className="absolute w-8 h-5 bg-comfort-100 rounded-full left-6 top-9" />
        <div className="absolute w-4 h-2 bg-text rounded-full left-8 top-10" />
      </div>
      {/* Bras */}
      <div className="absolute w-6 h-12 bg-comfort-200 rounded-full left-1 top-14" />
      <div className="absolute w-6 h-12 bg-comfort-200 rounded-full right-1 top-14" />
      {/* Jambes */}
      <div className="absolute w-6 h-8 bg-comfort-200 rounded-full left-6 top-24" />
      <div className="absolute w-6 h-8 bg-comfort-200 rounded-full right-6 top-24" />
      {/* Pancarte */}
      <motion.div className="absolute -right-2 top-12 bg-white p-2 rounded-lg border-2 border-comfort-300 shadow-lg" animate={{
      rotate: [-3, 3, -3]
    }} transition={{
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut'
    }}>
        <p className="text-xs font-comic text-comfort-600 whitespace-nowrap">
          Tu n'es pas seul
        </p>
      </motion.div>
    </motion.div>;
};