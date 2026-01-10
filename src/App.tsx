import React, { useEffect, useState, createContext } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Chatbot } from './components/Chatbot';
import { Dashboard } from './components/Dashboard';
import { Resources } from './components/Resources';
import { EmergencyMode } from './components/EmergencyMode';
import { Community } from './components/Community';
import { StarAnimation } from './components/animations/StarAnimation';
import { MagicParticles } from './components/animations/MagicParticles';
import './i18n/config';  // Import i18n configuration
// Contexte pour le thème
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => { }
});
export function App() {
  // Section par défaut : 'home'
  const [currentSection, setCurrentSection] = useState('home');
  const [showEmergencyMode, setShowEmergencyMode] = useState(false);
  const [showWelcomeGlow, setShowWelcomeGlow] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // Light mode by default

  // Vérifier si le mode sombre est préféré ou sauvegardé
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      if (!savedTheme) {
        localStorage.setItem('theme', 'light');
      }
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
        <div className="flex-1">
          {currentSection === 'home' && <Hero setCurrentSection={setCurrentSection} />}
          {currentSection === 'chatbot' && <Chatbot />}
          {currentSection === 'dashboard' && <Dashboard />}
          {currentSection === 'resources' && <Resources />}
          {currentSection === 'community' && <Community />}
        </div>
        {/* Magic floating particles */}
        <MagicParticles isDarkMode={isDarkMode} />
        {/* Étoiles animées en arrière-plan */}
        <StarAnimation />
      </Layout>
    </div>
  </ThemeContext.Provider>;
}