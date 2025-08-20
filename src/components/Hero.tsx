import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { BearMascot } from './animations/BearMascot';
import { FlowerBloom } from './animations/FlowerBloom';
import { MiniSun } from './animations/MiniSun';
export const Hero: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showStars, setShowStars] = useState(false);
  const inspirationalMessages = ["Un jour à la fois, tu t'en sortiras.", 'Ta valeur ne dépend pas de ta productivité.', "Respire. Tu fais de ton mieux et c'est suffisant.", 'Cette émotion est temporaire, pas ta force.', "Tu n'es pas seul(e) dans cette traversée."];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => prevIndex === inspirationalMessages.length - 1 ? 0 : prevIndex + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  const handleButtonClick = () => {
    setShowStars(true);
    setTimeout(() => setShowStars(false), 2000);
  };
  return <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Soleil miniature animé */}
        <div className="absolute -right-4 top-0 hidden md:block">
          <MiniSun />
        </div>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7
      }}>
          <h1 className="font-comic text-3xl md:text-4xl lg:text-5xl mb-6 text-comfort-600">
            Prends ton temps, respire
          </h1>
        </motion.div>
        <div className="mb-8">
          <BearMascot />
        </div>
        <motion.div key={currentMessageIndex} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 1
      }} className="h-24 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-calm-600 font-comic italic">
            {inspirationalMessages[currentMessageIndex]}
          </p>
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7,
        delay: 0.3
      }} className="mt-8">
          <p className="text-text mb-8 max-w-2xl mx-auto">
            Un espace bienveillant pour t'accompagner dans tes moments
            difficiles. Discute avec notre assistant, explore des ressources
            thérapeutiques, ou rejoins notre communauté de soutien.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 relative">
            <motion.button className="btn-comfort flex items-center justify-center" onClick={handleButtonClick}>
              <span>Explorer</span>
              <ArrowRightIcon size={18} className="ml-2" />
              {/* Étoiles qui apparaissent au clic */}
              {showStars && <>
                  {[...Array(5)].map((_, i) => <motion.div key={i} className="absolute text-yellow-300 text-xl" initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0
              }} animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
                x: [(i - 2) * 10, (i - 2) * 30],
                y: [-5, -30]
              }} transition={{
                duration: 1.5
              }}>
                      ★
                    </motion.div>)}
                </>}
            </motion.button>
            <motion.button className="btn-outline">Discuter</motion.button>
          </div>
        </motion.div>
        <div className="wave-divider my-16"></div>
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 0.6
      }}>
          <h2 className="text-xl font-comic text-comfort-600 mb-6">
            Témoignages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="clay-card">
              <div className="mb-4 flex justify-center">
                <FlowerBloom size={50} />
              </div>
              <p className="text-text italic">
                "Cette plateforme m'a aidé à traverser ma dépression
                post-études. Les exercices de respiration et le suivi quotidien
                ont vraiment fait la différence."
              </p>
              <p className="text-right text-sm text-comfort-500 mt-4">
                — Anonyme, 24 ans
              </p>
            </div>
            <div className="clay-card">
              <div className="mb-4 flex justify-center">
                <FlowerBloom size={50} />
              </div>
              <p className="text-text italic">
                "J'ai trouvé ici un espace où je peux exprimer mes angoisses
                sans jugement. Le chatbot est étonnamment réconfortant dans les
                moments de crise."
              </p>
              <p className="text-right text-sm text-comfort-500 mt-4">
                — Anonyme, 22 ans
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};