import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon, VolumeIcon, Volume2Icon, HeartPulseIcon, CloudIcon, SunIcon, MoonIcon } from 'lucide-react';
import { ThemeContext } from '../App';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';
interface HeaderProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  onEmergencyClick: () => void;
  showGlow?: boolean;
}
export const Header: React.FC<HeaderProps> = ({
  currentSection,
  setCurrentSection,
  onEmergencyClick,
  showGlow = false
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const {
    isDarkMode,
    toggleDarkMode
  } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navItems = [{
    id: 'home',
    label: t('nav.home'),
    icon: <SunIcon size={16} />
  }, {
    id: 'chatbot',
    label: t('nav.chat'),
    icon: <CloudIcon size={16} />
  }, {
    id: 'dashboard',
    label: t('nav.dashboard'),
    icon: <HeartPulseIcon size={16} />
  }, {
    id: 'resources',
    label: t('nav.resources'),
    icon: <CloudIcon size={16} />
  }, {
    id: 'community',
    label: t('nav.community'),
    icon: <CloudIcon size={16} />
  }];
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    // Sound functionality would be implemented here
  };
  return <header className={`${isDarkMode ? 'bg-dark-calm-100/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} sticky top-0 z-50 shadow-md theme-transition`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center">
          <motion.div className={`cursor-pointer ${showGlow ? isDarkMode ? 'animate-moonGlow' : 'animate-goldenGlow' : ''}`} whileHover={{
            scale: 1.05
          }} onClick={() => setCurrentSection('home')}>
            <span className={`font-comic ${isDarkMode ? 'text-dark-comfort-800' : 'text-comfort-600'} text-2xl flex items-center theme-transition`}>
              <CloudIcon className={`${isDarkMode ? 'text-dark-calm-700' : 'text-calm-400'} mr-2 theme-transition`} />
              Tsiky
            </span>
          </motion.div>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-3">
            {navItems.map(item => <motion.li key={item.id} whileHover={{
              y: -2
            }}>
              <button onClick={() => setCurrentSection(item.id)} className={`px-4 py-2 rounded-3xl flex items-center ${currentSection === item.id ? isDarkMode ? 'bg-dark-calm-200 text-dark-calm-900 font-medium' : 'bg-calm-100 text-calm-600 font-medium' : isDarkMode ? 'text-dark-text hover:bg-dark-calm-50/30' : 'text-text hover:bg-calm-50'} theme-transition`}>
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </button>
            </motion.li>)}
          </ul>
        </nav>
        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }} onClick={toggleSound} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-dark-calm-200/50' : 'hover:bg-calm-50'} theme-transition`} aria-label={isSoundOn ? 'Désactiver le son' : 'Activer le son'}>
            {isSoundOn ? <Volume2Icon size={20} className={isDarkMode ? 'text-dark-comfort-500' : 'text-comfort-500'} /> : <VolumeIcon size={20} className={isDarkMode ? 'text-dark-text' : 'text-text'} />}
          </motion.button>
          <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }} onClick={toggleDarkMode} className={`p-2 rounded-full ${isDarkMode ? 'bg-dark-calm-200/50' : 'bg-calm-50/50'} theme-transition`} aria-label={isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}>
            {isDarkMode ? <SunIcon size={20} className="text-dark-comfort-400" /> : <MoonIcon size={20} className="text-comfort-500" />}
          </motion.button>
          <LanguageSelector />
          <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }} onClick={onEmergencyClick} className={`hidden sm:flex items-center space-x-2 ${isDarkMode ? 'bg-dark-gentle text-dark-comfort-100' : 'bg-gentle text-white'} px-4 py-2 rounded-full shadow-md theme-transition`} aria-label="Mode urgence">
            <HeartPulseIcon size={18} />
            <span>Urgence</span>
          </motion.button>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={`p-2 rounded-md ${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} theme-transition`}>
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* Mobile menu */}
    {isMenuOpen && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }} className="md:hidden">
      <div className={`px-2 pt-2 pb-4 space-y-1 ${isDarkMode ? 'bg-dark-calm-100' : 'bg-white'} theme-transition`}>
        {navItems.map(item => <button key={item.id} onClick={() => {
          setCurrentSection(item.id);
          setIsMenuOpen(false);
        }} className={`flex items-center w-full text-left px-4 py-3 rounded-3xl ${currentSection === item.id ? isDarkMode ? 'bg-dark-calm-200 text-dark-calm-900' : 'bg-calm-100 text-calm-600' : isDarkMode ? 'text-dark-text hover:bg-dark-calm-50/30' : 'text-text hover:bg-calm-50'} theme-transition`}>
          <span className="mr-2">{item.icon}</span>
          {item.label}
        </button>)}
        <div className="flex items-center space-x-2 px-4 py-2">
          <button onClick={toggleDarkMode} className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-dark-calm-200/50 text-dark-comfort-400' : 'bg-calm-50/50 text-comfort-500'} theme-transition`}>
            {isDarkMode ? <>
              <SunIcon size={18} />
              <span>Mode clair</span>
            </> : <>
              <MoonIcon size={18} />
              <span>Mode sombre</span>
            </>}
          </button>
        </div>
        <button onClick={() => {
          onEmergencyClick();
          setIsMenuOpen(false);
        }} className={`flex items-center w-full space-x-2 ${isDarkMode ? 'bg-dark-gentle hover:bg-dark-gentle/90 text-dark-comfort-100' : 'bg-gentle hover:bg-gentle/90 text-white'} px-4 py-3 rounded-3xl theme-transition`}>
          <HeartPulseIcon size={18} />
          <span>Mode Urgence</span>
        </button>
      </div>
    </motion.div>}
  </header>;
};