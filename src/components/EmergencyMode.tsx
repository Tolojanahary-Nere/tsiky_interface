import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, PhoneIcon, HeartIcon, HeadphonesIcon, ArrowRightIcon } from 'lucide-react';
import { MiniSun } from './animations/MiniSun';
interface EmergencyModeProps {
  onClose: () => void;
}
export const EmergencyMode: React.FC<EmergencyModeProps> = ({
  onClose
}) => {
  const [step, setStep] = useState(1);
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const maxBreaths = 3;
  useEffect(() => {
    // Focus trap - prevent scrolling when emergency mode is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  useEffect(() => {
    let breathingInterval: NodeJS.Timeout;
    if (isBreathing && breathCount < maxBreaths) {
      breathingInterval = setInterval(() => {
        setBreathCount(prev => prev + 1);
      }, 12000); // Each breath cycle takes 12 seconds
    }
    return () => {
      clearInterval(breathingInterval);
    };
  }, [isBreathing, breathCount]);
  const startBreathing = () => {
    setIsBreathing(true);
  };
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 bg-calm-100/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{
      scale: 0.9,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} className="bg-white rounded-3xl max-w-lg w-full border border-comfort-200 shadow-lg overflow-hidden clay-card">
        <div className="bg-gradient-to-r from-hope to-comfort-100 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <HeartIcon size={20} className="text-gentle animate-pulse mr-2" />
            <h2 className="text-lg font-comic text-comfort-600">
              Mode Urgence Émotionnelle
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
            <XIcon size={20} className="text-comfort-600 hover:text-comfort-700" />
          </button>
        </div>
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && <motion.div key="step1" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: 20
          }} transition={{
            duration: 0.3
          }}>
                <h3 className="text-xl font-comic text-comfort-600 mb-4">
                  Comment te sens-tu ?
                </h3>
                <p className="text-text mb-6">
                  Tu traverses un moment difficile, mais nous sommes là pour
                  t'aider. Commençons par quelques exercices de respiration pour
                  t'apaiser.
                </p>
                <div className="bg-calm-50 rounded-3xl p-4 mb-6 border border-calm-200">
                  <p className="text-text text-sm">
                    Si tu es en danger immédiat ou si tu as des pensées
                    suicidaires, appelle immédiatement le numéro d'urgence
                    ci-dessous :
                  </p>
                  <div className="mt-3 flex items-center justify-center">
                    <a href="tel:3114" className="flex items-center bg-gentle hover:bg-gentle/90 text-white px-4 py-2 rounded-full">
                      <PhoneIcon size={18} className="mr-2" />
                      <span>3114 - Numéro national prévention suicide</span>
                    </a>
                  </div>
                </div>
                <div className="flex justify-end">
                  <motion.button className="btn-calm flex items-center" onClick={nextStep}>
                    <span>Commencer la respiration</span>
                    <ArrowRightIcon size={18} className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>}
            {step === 2 && <motion.div key="step2" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: 20
          }} transition={{
            duration: 0.3
          }}>
                <h3 className="text-xl font-comic text-comfort-600 mb-4">
                  Exercice de cohérence cardiaque
                </h3>
                <p className="text-text mb-6">
                  Suis le mouvement et respire profondément. Inspire pendant que
                  le cercle s'agrandit, et expire pendant qu'il se réduit.
                </p>
                <div className="flex flex-col items-center justify-center py-6">
                  {!isBreathing ? <motion.button className="btn-calm" onClick={startBreathing}>
                      Démarrer l'exercice
                    </motion.button> : <div className="text-center">
                      <div className="relative flex items-center justify-center mb-8">
                        <motion.div animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }} transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }} className="absolute w-40 h-40 bg-calm-200 rounded-full" />
                        <motion.div animate={{
                    scale: [1, 1.3, 1]
                  }} transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }} className="w-32 h-32 bg-calm-300 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl font-comic">
                            {breathCount < maxBreaths ? `${breathCount + 1}/${maxBreaths}` : '✓'}
                          </span>
                        </motion.div>
                      </div>
                      <p className="text-comfort-600 mb-2 font-comic">
                        {breathCount < maxBreaths ? 'Inspire... Expire...' : 'Excellent !'}
                      </p>
                      <p className="text-sm text-text">
                        {breathCount < maxBreaths ? 'Respire lentement et profondément' : "Tu as complété l'exercice de respiration"}
                      </p>
                    </div>}
                </div>
                <div className="flex justify-between mt-6">
                  <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={prevStep} className="text-comfort-500 hover:text-comfort-600 font-comic">
                    Retour
                  </motion.button>
                  <motion.button className={`flex items-center px-4 py-2 rounded-full ${breathCount < maxBreaths && isBreathing ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'btn-calm'}`} onClick={nextStep} disabled={breathCount < maxBreaths && isBreathing}>
                    <span>Continuer</span>
                    <ArrowRightIcon size={18} className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>}
            {step === 3 && <motion.div key="step3" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: 20
          }} transition={{
            duration: 0.3
          }}>
                <h3 className="text-xl font-comic text-comfort-600 mb-4">
                  Comment te sens-tu maintenant ?
                </h3>
                <p className="text-text mb-6">
                  Si tu te sens mieux, tu peux fermer cette fenêtre. Si tu as
                  encore besoin d'aide, voici quelques ressources
                  supplémentaires :
                </p>
                <div className="space-y-4 mb-6">
                  <div className="clay-card p-4 flex items-center">
                    <div className="mr-4">
                      <MiniSun size={40} />
                    </div>
                    <div>
                      <h4 className="font-comic text-comfort-600">
                        Écouter un son apaisant
                      </h4>
                      <p className="text-sm text-text">
                        Sons naturels pour calmer ton esprit
                      </p>
                    </div>
                  </div>
                  <div className="clay-card p-4 flex items-center">
                    <div className="bg-calm-100 p-3 rounded-full mr-4">
                      <PhoneIcon size={24} className="text-calm-500" />
                    </div>
                    <div>
                      <h4 className="font-comic text-comfort-600">
                        Parler à un écoutant
                      </h4>
                      <p className="text-sm text-text">
                        SOS Amitié: 09 72 39 40 50 (24h/24)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={prevStep} className="text-comfort-500 hover:text-comfort-600 font-comic">
                    Retour
                  </motion.button>
                  <motion.button className="btn-calm" onClick={onClose}>
                    Fermer
                  </motion.button>
                </div>
              </motion.div>}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>;
};