import React, { useContext } from 'react';
import { HeartIcon, LanguagesIcon } from 'lucide-react';
import { MagicNotebook } from './animations/MagicNotebook';
import { ThemeContext } from '../App';
export const Footer: React.FC = () => {
  const {
    isDarkMode
  } = useContext(ThemeContext);
  return <footer className={`${isDarkMode ? 'bg-dark-calm-100 border-dark-calm-200' : 'bg-white border-comfort-200'} py-8 border-t theme-transition`}>
      <div className="wave-divider -mt-16 mb-8"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className={`text-lg font-comic ${isDarkMode ? 'text-dark-comfort-700' : 'text-comfort-600'} mb-4 theme-transition`}>
              Douceur
            </h3>
            <p className={`${isDarkMode ? 'text-dark-text' : 'text-text'} text-sm theme-transition`}>
              Une plateforme bienveillante pour accompagner les jeunes adultes
              dans leurs moments de détresse émotionnelle.
            </p>
            <div className="mt-4">
              <MagicNotebook size={70} />
            </div>
          </div>
          <div>
            <h3 className={`text-lg font-comic ${isDarkMode ? 'text-dark-comfort-700' : 'text-comfort-600'} mb-4 theme-transition`}>
              Ressources d'urgence
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors theme-transition`}>
                  SOS Amitié: 09 72 39 40 50
                </a>
              </li>
              <li>
                <a href="#" className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors theme-transition`}>
                  Suicide Écoute: 01 45 39 40 00
                </a>
              </li>
              <li>
                <a href="#" className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors theme-transition`}>
                  Fil Santé Jeunes: 0 800 235 236
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg font-comic ${isDarkMode ? 'text-dark-comfort-700' : 'text-comfort-600'} mb-4 theme-transition`}>
              Langue
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <LanguagesIcon size={16} className={isDarkMode ? 'text-dark-text' : 'text-text'} />
              <select className={`${isDarkMode ? 'bg-dark-calm-100 border-dark-comfort-300 focus:ring-dark-comfort-400 text-dark-text' : 'bg-white border-comfort-200 focus:ring-comfort-300 text-text'} border rounded-full px-3 py-1 focus:outline-none focus:ring-1 theme-transition`}>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
        <div className={`mt-8 pt-6 ${isDarkMode ? 'border-dark-calm-200' : 'border-comfort-200'} border-t flex flex-col sm:flex-row justify-between items-center theme-transition`}>
          <p className={`${isDarkMode ? 'text-dark-text' : 'text-text'} text-sm mb-4 sm:mb-0 theme-transition`}>
            © 2023 Douceur. Tous droits réservés.
          </p>
          <div className={`flex items-center text-sm ${isDarkMode ? 'text-dark-text' : 'text-text'} theme-transition`}>
            <span>Créé avec</span>
            <HeartIcon size={16} className={`mx-1 ${isDarkMode ? 'text-dark-gentle' : 'text-gentle'} animate-pulse theme-transition`} />
            <span>pour votre bien-être</span>
          </div>
        </div>
      </div>
    </footer>;
};