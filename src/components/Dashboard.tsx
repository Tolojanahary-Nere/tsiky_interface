import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3Icon, CheckCircleIcon, CalendarIcon, LineChartIcon, PlusIcon } from 'lucide-react';
import { MoodTracker } from './Dashboard/MoodTracker';
import { SelfCareGoals } from './Dashboard/SelfCareGoals';
export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mood');
  return <section className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-lavender-200 mb-2">
            Mon tableau de bord
          </h1>
          <p className="text-slate-400">
            Suivi de ton bien-être et de tes objectifs personnels
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} className="flex items-center bg-lavender-600 hover:bg-lavender-500 text-white px-4 py-2 rounded-lg">
            <PlusIcon size={18} className="mr-2" />
            <span>Nouvelle entrée</span>
          </motion.button>
        </div>
      </div>
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
        <div className="flex overflow-x-auto">
          <button onClick={() => setActiveTab('mood')} className={`flex items-center px-6 py-4 border-b-2 ${activeTab === 'mood' ? 'border-lavender-400 text-lavender-200' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            <BarChart3Icon size={18} className="mr-2" />
            <span>Suivi d'humeur</span>
          </button>
          <button onClick={() => setActiveTab('goals')} className={`flex items-center px-6 py-4 border-b-2 ${activeTab === 'goals' ? 'border-lavender-400 text-lavender-200' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            <CheckCircleIcon size={18} className="mr-2" />
            <span>Objectifs</span>
          </button>
          <button onClick={() => setActiveTab('calendar')} className={`flex items-center px-6 py-4 border-b-2 ${activeTab === 'calendar' ? 'border-lavender-400 text-lavender-200' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            <CalendarIcon size={18} className="mr-2" />
            <span>Calendrier</span>
          </button>
          <button onClick={() => setActiveTab('stats')} className={`flex items-center px-6 py-4 border-b-2 ${activeTab === 'stats' ? 'border-lavender-400 text-lavender-200' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            <LineChartIcon size={18} className="mr-2" />
            <span>Statistiques</span>
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'mood' && <MoodTracker />}
          {activeTab === 'goals' && <SelfCareGoals />}
          {activeTab === 'calendar' && <div className="text-center py-12 text-slate-400">
              <CalendarIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>Le calendrier de bien-être sera bientôt disponible.</p>
            </div>}
          {activeTab === 'stats' && <div className="text-center py-12 text-slate-400">
              <LineChartIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>Les statistiques personnalisées seront bientôt disponibles.</p>
            </div>}
        </div>
      </div>
    </section>;
};