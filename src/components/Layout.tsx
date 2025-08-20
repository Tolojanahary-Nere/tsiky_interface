import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { QuoteDisplay } from './shared/QuoteDisplay';
import { ThemeContext } from '../App';
interface LayoutProps {
  children: React.ReactNode;
  currentSection: string;
  setCurrentSection: (section: string) => void;
  onEmergencyClick: () => void;
  showGlow?: boolean;
}
export const Layout: React.FC<LayoutProps> = ({
  children,
  currentSection,
  setCurrentSection,
  onEmergencyClick,
  showGlow = false
}) => {
  const {
    isDarkMode
  } = useContext(ThemeContext);
  return <div className="flex flex-col min-h-screen theme-transition">
      <Header currentSection={currentSection} setCurrentSection={setCurrentSection} onEmergencyClick={onEmergencyClick} showGlow={showGlow} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <div className={`${isDarkMode ? 'bg-dark-calm-200/50' : 'bg-slate-800/50'} py-4 theme-transition`}>
        <div className="max-w-7xl mx-auto px-4">
          <QuoteDisplay />
        </div>
      </div>
      <Footer />
    </div>;
};