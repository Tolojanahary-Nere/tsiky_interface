import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SmileIcon, MehIcon, FrownIcon, CloudRainIcon, SunIcon } from 'lucide-react';
export const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [moodHistory, setMoodHistory] = useState([{
    date: '2023-06-15',
    mood: 'happy',
    note: "Bonne journée, j'ai réussi mon examen."
  }, {
    date: '2023-06-14',
    mood: 'neutral',
    note: 'Journée ordinaire, un peu de stress.'
  }, {
    date: '2023-06-13',
    mood: 'sad',
    note: "Difficile aujourd'hui, beaucoup d'anxiété."
  }, {
    date: '2023-06-12',
    mood: 'happy',
    note: "Sortie avec des amis, ça m'a fait du bien."
  }]);
  const moods = [{
    id: 'happy',
    icon: <SmileIcon size={32} />,
    label: 'Heureux',
    color: 'text-green-400'
  }, {
    id: 'neutral',
    icon: <MehIcon size={32} />,
    label: 'Neutre',
    color: 'text-blue-400'
  }, {
    id: 'sad',
    icon: <FrownIcon size={32} />,
    label: 'Triste',
    color: 'text-amber-400'
  }, {
    id: 'anxious',
    icon: <CloudRainIcon size={32} />,
    label: 'Anxieux',
    color: 'text-purple-400'
  }, {
    id: 'peaceful',
    icon: <SunIcon size={32} />,
    label: 'Apaisé',
    color: 'text-lavender-400'
  }];
  const handleMoodSubmit = () => {
    if (!selectedMood) return;
    const today = new Date().toISOString().split('T')[0];
    setMoodHistory([{
      date: today,
      mood: selectedMood,
      note: journalEntry
    }, ...moodHistory]);
    setSelectedMood(null);
    setJournalEntry('');
  };
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy':
        return <SmileIcon size={20} className="text-green-400" />;
      case 'neutral':
        return <MehIcon size={20} className="text-blue-400" />;
      case 'sad':
        return <FrownIcon size={20} className="text-amber-400" />;
      case 'anxious':
        return <CloudRainIcon size={20} className="text-purple-400" />;
      case 'peaceful':
        return <SunIcon size={20} className="text-lavender-400" />;
      default:
        return null;
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };
  return <div>
      <h3 className="text-xl font-medium text-lavender-100 mb-6">
        Comment te sens-tu aujourd'hui ?
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {moods.map(mood => <motion.button key={mood.id} whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={() => setSelectedMood(mood.id)} className={`flex flex-col items-center p-4 rounded-lg ${selectedMood === mood.id ? 'bg-slate-700 border border-lavender-400' : 'bg-slate-800 hover:bg-slate-700'}`}>
            <div className={`mb-2 ${mood.color}`}>{mood.icon}</div>
            <span className="text-sm">{mood.label}</span>
          </motion.button>)}
      </div>
      <div className="mb-6">
        <label htmlFor="journal" className="block mb-2 text-lavender-200">
          Journal d'aujourd'hui (optionnel)
        </label>
        <textarea id="journal" value={journalEntry} onChange={e => setJournalEntry(e.target.value)} placeholder="Décris tes émotions ou les événements qui ont marqué ta journée..." className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-slate-200 h-24 focus:outline-none focus:ring-2 focus:ring-lavender-400" />
      </div>
      <div className="flex justify-end">
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={handleMoodSubmit} disabled={!selectedMood} className={`px-4 py-2 rounded-lg ${selectedMood ? 'bg-lavender-600 hover:bg-lavender-500 text-white' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}>
          Enregistrer
        </motion.button>
      </div>
      <div className="mt-8 pt-6 border-t border-slate-700">
        <h3 className="text-lg font-medium text-lavender-100 mb-4">
          Historique récent
        </h3>
        <div className="space-y-3">
          {moodHistory.map((entry, index) => <div key={index} className="bg-slate-800 rounded-lg p-4 flex items-start">
              <div className="mr-3 mt-1">{getMoodIcon(entry.mood)}</div>
              <div>
                <div className="text-sm text-lavender-300 mb-1">
                  {formatDate(entry.date)}
                </div>
                <p className="text-slate-300">{entry.note}</p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};