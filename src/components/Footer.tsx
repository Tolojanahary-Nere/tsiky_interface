import React, { useContext } from 'react';
import { HeartIcon, PhoneIcon, MailIcon, MapPinIcon, GithubIcon, TwitterIcon, LinkedinIcon, ShieldCheckIcon, BookOpenIcon } from 'lucide-react';
import { MagicNotebook } from './animations/MagicNotebook';
import { ThemeContext } from '../App';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <footer className={`${isDarkMode ? 'bg-dark-calm-100 border-dark-calm-200' : 'bg-white border-comfort-200'} py-12 border-t theme-transition`}>
      <div className="wave-divider -mt-16 mb-8"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* About Section */}
          <div className="space-y-4">
            <h3 className={`text-lg font-comic ${isDarkMode ? 'text-dark-comfort-700' : 'text-comfort-600'} mb-4 theme-transition flex items-center`}>
              <HeartIcon size={20} className="mr-2" />
              {t('footer.about')}
            </h3>
            <p className={`${isDarkMode ? 'text-dark-text' : 'text-text'} text-sm leading-relaxed theme-transition`}>
              {t('footer.aboutDesc')}
            </p>
            <div className="mt-4">
              <MagicNotebook size={60} />
            </div>
          </div>

          {/* Emergency Resources */}
          <div className="space-y-4">
            <h3 className={`text-lg font-comic ${isDarkMode ? 'text-dark-comfort-700' : 'text-comfort-600'} mb-4 theme-transition flex items-center`}>
              <PhoneIcon size={20} className="mr-2" />
              {t('footer.emergencies')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:0972394050"
                  className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors theme-transition flex items-start group`}
                >
                  <span className="text-rose-500 mr-2">🇫🇷</span>
                  <div>
                    <div className="font-medium group-hover:underline">{t('footer.sosAmitie')}</div>
                    <div className="text-xs opacity-70">{t('footer.sosAmitieDesc')}</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:0145394000"
                  className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors theme-transition flex items-start group`}
                >
                  <span className="text-rose-500 mr-2">🆘</span>
                  <div>
                    <div className="font-medium group-hover:underline">{t('footer.suicideEcoute')}</div>
                    <div className="text-xs opacity-70">{t('footer.suicideEcouteDesc')}</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:0800235236"
                  className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors theme-transition flex items-start group`}
                >
                  <span className="text-blue-500 mr-2">👥</span>
                  <div>
                    <div className="font-medium group-hover:underline">{t('footer.filSante')}</div>
                    <div className="text-xs opacity-70">{t('footer.filSanteDesc')}</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`text-lg font-comic ${isDarkMode ? 'text-dark-comfort-700' : 'text-comfort-600'} mb-4 theme-transition flex items-center`}>
              <BookOpenIcon size={20} className="mr-2" />
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors hover:underline theme-transition`}>
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#" className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors hover:underline theme-transition`}>
                  {t('footer.howItWorks')}
                </a>
              </li>
              <li>
                <a href="#" className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors hover:underline theme-transition`}>
                  {t('footer.helpCenter')}
                </a>
              </li>
              <li>
                <a href="#" className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors hover:underline theme-transition`}>
                  {t('footer.blog')}
                </a>
              </li>
              <li>
                <a href="#" className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} transition-colors hover:underline theme-transition flex items-center`}>
                  <ShieldCheckIcon size={14} className="mr-1" />
                  {t('footer.privacy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className={`text-lg font-comic ${isDarkMode ? 'text-dark-comfort-700' : 'text-comfort-600'} mb-4 theme-transition flex items-center`}>
              <MailIcon size={20} className="mr-2" />
              {t('footer.contact')}
            </h3>
            <div className="space-y-3 text-sm">
              <div className={`${isDarkMode ? 'text-dark-text' : 'text-text'} flex items-start theme-transition`}>
                <MailIcon size={16} className="mr-2 mt-0.5 opacity-70" />
                <a href="mailto:contact@tsiky.mg" className="hover:underline">
                  {t('footer.email')}
                </a>
              </div>
              <div className={`${isDarkMode ? 'text-dark-text' : 'text-text'} flex items-start theme-transition`}>
                <MapPinIcon size={16} className="mr-2 mt-0.5 opacity-70" />
                <span>{t('footer.location')}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <p className={`text-xs ${isDarkMode ? 'text-dark-text' : 'text-text'} mb-3 opacity-70 theme-transition`}>
                {t('footer.followUs')}
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className={`${isDarkMode ? 'bg-dark-calm-200 hover:bg-dark-calm-300 text-dark-text' : 'bg-calm-50 hover:bg-calm-100 text-text'} p-2 rounded-full transition-all hover:scale-110 theme-transition`}
                  aria-label="Twitter"
                >
                  <TwitterIcon size={18} />
                </a>
                <a
                  href="#"
                  className={`${isDarkMode ? 'bg-dark-calm-200 hover:bg-dark-calm-300 text-dark-text' : 'bg-calm-50 hover:bg-calm-100 text-text'} p-2 rounded-full transition-all hover:scale-110 theme-transition`}
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href="https://github.com/Tolojanahary-Nere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDarkMode ? 'bg-dark-calm-200 hover:bg-dark-calm-300 text-dark-text' : 'bg-calm-50 hover:bg-calm-100 text-text'} p-2 rounded-full transition-all hover:scale-110 theme-transition`}
                  aria-label="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`${isDarkMode ? 'bg-dark-calm-200/30' : 'bg-calm-50'} rounded-lg p-4 mb-8 theme-transition`}>
          <p className={`${isDarkMode ? 'text-dark-text' : 'text-text'} text-xs leading-relaxed theme-transition`}>
            <ShieldCheckIcon size={14} className="inline mr-1 opacity-70" />
            <strong>{t('footer.emergencies')} :</strong> {t('footer.disclaimer')}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 ${isDarkMode ? 'border-dark-calm-200' : 'border-comfort-200'} border-t flex flex-col sm:flex-row justify-between items-center gap-4 theme-transition`}>
          <div className={`${isDarkMode ? 'text-dark-text' : 'text-text'} text-sm theme-transition text-center sm:text-left`}>
            <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
            <p className="text-xs opacity-70 mt-1">
              {t('footer.madeWith')} 💜 {t('footer.forWellness')}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href="#" className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} hover:underline theme-transition`}>
              {t('footer.terms')}
            </a>
            <span className="opacity-30">•</span>
            <a href="#" className={`${isDarkMode ? 'text-dark-text hover:text-dark-comfort-500' : 'text-text hover:text-comfort-500'} hover:underline theme-transition`}>
              {t('footer.privacyPolicy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};