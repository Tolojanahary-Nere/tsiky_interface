import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { BookmarkIcon } from 'lucide-react';
import { ThemeContext } from '../../App';
export const QuoteDisplay: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const {
    isDarkMode
  } = useContext(ThemeContext);
  const quotes = [{
    text: "La vie n'est pas d'attendre que les orages passent, c'est d'apprendre à danser sous la pluie.",
    author: 'Sénèque'
  }, {
    text: 'Tu ne peux pas arrêter les vagues, mais tu peux apprendre à surfer.',
    author: 'Jon Kabat-Zinn'
  }, {
    text: "Ce n'est pas parce que les choses sont difficiles que nous n'osons pas, c'est parce que nous n'osons pas qu'elles sont difficiles.",
    author: 'Sénèque'
  }, {
    text: "La plus grande gloire n'est pas de ne jamais tomber, mais de se relever à chaque chute.",
    author: 'Confucius'
  }, {
    text: "La santé mentale n'est pas une destination mais un processus. C'est la façon dont vous pensez, ressentez et agissez.",
    author: 'Noam Spencer'
  }];
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  useEffect(() => {
    // Select a random quote when component mounts
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setShowStars(true);
    setTimeout(() => setShowStars(false), 1500);
  };
  return <div className="flex items-center justify-center py-4">
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1
    }} className="flex items-center relative">
        <div className={`italic text-sm ${isDarkMode ? 'text-dark-comfort-100' : 'text-white'} font-comic theme-transition`}>
          "{currentQuote.text}"{' '}
          <span className={isDarkMode ? 'text-dark-comfort-500' : 'text-comfort-200'}>
            — {currentQuote.author}
          </span>
        </div>
        <button onClick={toggleFavorite} className="ml-3 relative" aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
          <BookmarkIcon size={18} className={isFavorite ? isDarkMode ? 'fill-dark-comfort-500 text-dark-comfort-700' : 'fill-comfort-300 text-comfort-500' : isDarkMode ? 'text-dark-comfort-100 hover:text-dark-comfort-400' : 'text-white hover:text-comfort-400'} />
          {/* Étoiles d'animation au clic */}
          {showStars && <>
              {[...Array(3)].map((_, i) => <motion.div key={i} className={`absolute text-${isDarkMode ? 'amber' : 'yellow'}-400 text-xs`} initial={{
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0
          }} animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: [(i - 1) * 5, (i - 1) * 15],
            y: [0, -20]
          }} transition={{
            duration: 1.5
          }}>
                  ★
                </motion.div>)}
            </>}
        </button>
      </motion.div>
    </div>;
};