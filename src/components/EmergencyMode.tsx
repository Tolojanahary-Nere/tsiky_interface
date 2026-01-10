import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, PhoneIcon, HeartIcon, HeadphonesIcon, ArrowRightIcon } from 'lucide-react';
import { MiniSun } from './animations/MiniSun';
import { useTranslation } from 'react-i18next';

interface EmergencyModeProps {
  onClose: () => void;
}
export const EmergencyMode: React.FC<EmergencyModeProps> = ({
  onClose
}) => {
  const { t } = useTranslation();
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
            {t('emergencyMode.title')}
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
              {t('emergencyMode.step1Title')}
            </h3>
            <p className="text-text mb-6">
              {t('emergencyMode.step1Desc')}
            </p>
            <div className="bg-calm-50 rounded-3xl p-4 mb-6 border border-calm-200">
              <p className="text-text text-sm">
                {t('emergencyMode.dangerWarning')}
              </p>
              <div className="mt-3 flex items-center justify-center">
                <a href="tel:3114" className="flex items-center bg-gentle hover:bg-gentle/90 text-white px-4 py-2 rounded-full">
                  <PhoneIcon size={18} className="mr-2" />
                  <span>{t('emergencyMode.suicideNumber')}</span>
                </a>
              </div>
            </div>
            <div className="flex justify-end">
              <motion.button className="btn-calm flex items-center" onClick={nextStep}>
                <span>{t('emergencyMode.startBreathing')}</span>
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
              {t('emergencyMode.step2Title')}
            </h3>
            <p className="text-text mb-6">
              {t('emergencyMode.step2Desc')}
            </p>
            <div className="flex flex-col items-center justify-center py-6">
              {!isBreathing ? <motion.button className="btn-calm" onClick={startBreathing}>
                {t('emergencyMode.startExercise')}
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
                  {breathCount < maxBreaths ? t('emergencyMode.inhaleExhale') : t('emergencyMode.excellent')}
                </p>
                <p className="text-sm text-text">
                  {breathCount < maxBreaths ? t('emergencyMode.instruction') : t('emergencyMode.completed')}
                </p>
              </div>}
            </div>
            <div className="flex justify-between mt-6">
              <motion.button whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} onClick={prevStep} className="text-comfort-500 hover:text-comfort-600 font-comic">
                {t('emergencyMode.back')}
              </motion.button>
              <motion.button className={`flex items-center px-4 py-2 rounded-full ${breathCount < maxBreaths && isBreathing ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'btn-calm'}`} onClick={nextStep} disabled={breathCount < maxBreaths && isBreathing}>
                <span>{t('emergencyMode.continue')}</span>
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
              {t('emergencyMode.step3Title')}
            </h3>
            <p className="text-text mb-6">
              {t('emergencyMode.step3Desc')}
            </p>
            <div className="space-y-4 mb-6">
              <div className="clay-card p-4 flex items-center">
                <div className="mr-4">
                  <MiniSun size={40} />
                </div>
                <div>
                  <h4 className="font-comic text-comfort-600">
                    {t('emergencyMode.soothingSoundTitle')}
                  </h4>
                  <p className="text-sm text-text">
                    {t('emergencyMode.soothingSoundDesc')}
                  </p>
                </div>
              </div>
              <div className="clay-card p-4 flex items-center">
                <div className="bg-calm-100 p-3 rounded-full mr-4">
                  <PhoneIcon size={24} className="text-calm-500" />
                </div>
                <div>
                  <h4 className="font-comic text-comfort-600">
                    {t('emergencyMode.talkTitle')}
                  </h4>
                  <p className="text-sm text-text">
                    {t('emergencyMode.talkDesc')}
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
                {t('emergencyMode.back')}
              </motion.button>
              <motion.button className="btn-calm" onClick={onClose}>
                {t('emergencyMode.close')}
              </motion.button>
            </div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </motion.div>
  </motion.div>;
};