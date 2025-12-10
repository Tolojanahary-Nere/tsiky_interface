import React, { useEffect, useState, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Chatbot } from './components/Chatbot';
import { Dashboard } from './components/Dashboard';
import { Resources } from './components/Resources';
import { EmergencyMode } from './components/EmergencyMode';
import { Community } from './components/Community';
import { StarAnimation } from './components/animations/StarAnimation';
import './i18n/config';  // Import i18n configuration
// Contexte pour le thème
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => { }
});
export function App() {
  // Charger la section sauvegardée ou 'home' par défaut
  const [currentSection, setCurrentSection] = useState(() => {
    return localStorage.getItem('tsiky_current_section') || 'home';
  });
  const [showEmergencyMode, setShowEmergencyMode] = useState(false);
  const [showWelcomeGlow, setShowWelcomeGlow] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sauvegarder la section actuelle
  useEffect(() => {
    localStorage.setItem('tsiky_current_section', currentSection);
  }, [currentSection]);
  // Vérifier si le mode sombre est préféré ou sauvegardé
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || !savedTheme && prefersDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  // Fonction pour basculer entre les modes
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };
  // Handle emergency mode activation
  const handleEmergencyClick = () => {
    setShowEmergencyMode(true);
  };
  // Handle emergency mode close
  const handleCloseEmergency = () => {
    setShowEmergencyMode(false);
  };
  // Disable welcome glow after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeGlow(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return <ThemeContext.Provider value={{
    isDarkMode,
    toggleDarkMode
  }}>
    <div className={`theme-transition ${isDarkMode ? 'bg-gradient-to-b from-dark-calm-100 to-dark-calm-50 bg-stars-pattern-dark' : 'bg-gradient-to-b from-calm-100 to-white bg-stars-pattern'} min-h-screen text-text flex flex-col`}>
      <Layout currentSection={currentSection} setCurrentSection={setCurrentSection} onEmergencyClick={handleEmergencyClick} showGlow={showWelcomeGlow}>
        {showEmergencyMode && <EmergencyMode onClose={handleCloseEmergency} />}
        <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.5
        }} className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={currentSection} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -20
            }} transition={{
              duration: 0.4
            }}>
              {currentSection === 'home' && <Hero />}
              {currentSection === 'chatbot' && <Chatbot />}
              {currentSection === 'dashboard' && <Dashboard />}
              {currentSection === 'resources' && <Resources />}
              {currentSection === 'community' && <Community />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        {/* Étoiles animées en arrière-plan */}
        <StarAnimation />
      </Layout>
    </div>
  </ThemeContext.Provider>;
}