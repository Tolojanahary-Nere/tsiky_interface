export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Palette mode clair
        calm: {
          50: '#F7FBFF',
          100: '#E6F2FF', // Couleur dominante - Bleu ciel lavande
          200: '#CCE5FF',
          300: '#99CAFF',
          400: '#66AFFF',
          500: '#3394FF',
          600: '#0077FF',
          700: '#0055CC',
          800: '#004499',
          900: '#002266',
        },
        comfort: {
          50: '#FFFAF5',
          100: '#FFEED9', // Couleur secondaire - Pêche lumineux
          200: '#FFD3B6', // Pour les séparateurs
          300: '#FFBD95',
          400: '#FFA674',
          500: '#FF8F52',
          600: '#FF7531',
          700: '#E65A00',
          800: '#B34700',
          900: '#803300',
        },
        hope: '#A8E6CF', // Accent positif - Vert menthe
        gentle: '#FFAAA5', // Accent positif - Rose pâle
        text: '#5A5A5A', // Gris foncé velouté
        lavender: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // Palette mode sombre
        dark: {
          calm: {
            50: '#0C1824',
            100: '#112233', // Couleur dominante - Bleu nuit profond
            200: '#1A3349',
            300: '#234466',
            400: '#2C5580',
            500: '#366699',
            600: '#4477B2',
            700: '#5588CC',
            800: '#77AAEE',
            900: '#99CCFF',
          },
          comfort: {
            50: '#251A14',
            100: '#2D2019', // Couleur secondaire - Brun chaud foncé
            200: '#40332D',
            300: '#594940',
            400: '#6E5A4D',
            500: '#8C7361',
            600: '#A68C78',
            700: '#BFAA99',
            800: '#D9C8BA',
            900: '#F2E6DB',
          },
          hope: '#1F4D40', // Accent positif - Vert forêt profond
          gentle: '#4D2D2A', // Accent positif - Bordeaux doux
          text: '#E0E0E0', // Gris clair pour le texte
        }
      },
      fontFamily: {
        'comic': ['"Comic Neue"', 'cursive'],
        'inter': ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'stars-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        'stars-pattern-dark': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        bloom: {
          '0%': { transform: 'scale(0.8)', opacity: 0.8 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        shine: {
          '0%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
          '100%': { filter: 'brightness(1)' },
        },
        starAppear: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        goldenGlow: {
          '0%': { boxShadow: '0 0 0 rgba(255, 215, 0, 0)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          '100%': { boxShadow: '0 0 0 rgba(255, 215, 0, 0)' },
        },
        moonGlow: {
          '0%': { boxShadow: '0 0 0 rgba(173, 216, 230, 0)' },
          '50%': { boxShadow: '0 0 20px rgba(173, 216, 230, 0.5)' },
          '100%': { boxShadow: '0 0 0 rgba(173, 216, 230, 0)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 3s ease-in-out infinite',
        bloom: 'bloom 2s ease-out forwards',
        shine: 'shine 2s ease-in-out',
        starAppear: 'starAppear 0.5s ease-out forwards',
        goldenGlow: 'goldenGlow 2s ease-in-out',
        moonGlow: 'moonGlow 2s ease-in-out',
      }
    },
  },
  plugins: [],
}