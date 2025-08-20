import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XIcon, PlusIcon, TrashIcon } from 'lucide-react';
interface Goal {
  id: number;
  text: string;
  completed: boolean;
  category: string;
}
export const SelfCareGoals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([{
    id: 1,
    text: 'Méditer 10 minutes chaque matin',
    completed: true,
    category: 'mindfulness'
  }, {
    id: 2,
    text: "Boire 2L d'eau par jour",
    completed: false,
    category: 'physical'
  }, {
    id: 3,
    text: 'Limiter les réseaux sociaux à 30 minutes',
    completed: false,
    category: 'digital'
  }, {
    id: 4,
    text: 'Écrire 3 choses positives chaque soir',
    completed: true,
    category: 'gratitude'
  }, {
    id: 5,
    text: "Faire 20 minutes d'exercice",
    completed: false,
    category: 'physical'
  }]);
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('mindfulness');
  const categories = [{
    id: 'mindfulness',
    label: 'Pleine conscience'
  }, {
    id: 'physical',
    label: 'Bien-être physique'
  }, {
    id: 'digital',
    label: 'Bien-être numérique'
  }, {
    id: 'social',
    label: 'Relations sociales'
  }, {
    id: 'gratitude',
    label: 'Gratitude'
  }];
  const toggleGoalCompletion = (id: number) => {
    setGoals(goals.map(goal => goal.id === id ? {
      ...goal,
      completed: !goal.completed
    } : goal));
  };
  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };
  const addNewGoal = () => {
    if (newGoalText.trim() === '') return;
    const newGoal: Goal = {
      id: Math.max(0, ...goals.map(g => g.id)) + 1,
      text: newGoalText,
      completed: false,
      category: newGoalCategory
    };
    setGoals([...goals, newGoal]);
    setNewGoalText('');
  };
  const getCategoryLabel = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.label || categoryId;
  };
  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'mindfulness':
        return 'bg-lavender-500/20 text-lavender-300';
      case 'physical':
        return 'bg-blue-500/20 text-blue-300';
      case 'digital':
        return 'bg-purple-500/20 text-purple-300';
      case 'social':
        return 'bg-pink-500/20 text-pink-300';
      case 'gratitude':
        return 'bg-amber-500/20 text-amber-300';
      default:
        return 'bg-slate-500/20 text-slate-300';
    }
  };
  return <div>
      <h3 className="text-xl font-medium text-lavender-100 mb-6">
        Mes objectifs de bien-être
      </h3>
      <div className="space-y-3 mb-8">
        {goals.map(goal => <motion.div key={goal.id} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} className={`flex items-center p-4 rounded-lg border ${goal.completed ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-800 border-slate-700'}`}>
            <button onClick={() => toggleGoalCompletion(goal.id)} className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${goal.completed ? 'bg-green-500 text-white' : 'border border-slate-600 text-transparent hover:border-lavender-400'}`}>
              {goal.completed && <CheckIcon size={14} />}
            </button>
            <div className="flex-1">
              <p className={`${goal.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                {goal.text}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${getCategoryColor(goal.category)}`}>
                {getCategoryLabel(goal.category)}
              </span>
            </div>
            <button onClick={() => deleteGoal(goal.id)} className="p-2 text-slate-400 hover:text-red-400 rounded-full">
              <TrashIcon size={16} />
            </button>
          </motion.div>)}
      </div>
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h4 className="text-lavender-200 font-medium mb-3">
          Ajouter un nouvel objectif
        </h4>
        <div className="flex flex-col space-y-3">
          <input type="text" value={newGoalText} onChange={e => setNewGoalText(e.target.value)} placeholder="Décris ton objectif de bien-être..." className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-lavender-400" />
          <select value={newGoalCategory} onChange={e => setNewGoalCategory(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-lavender-400">
            {categories.map(category => <option key={category.id} value={category.id}>
                {category.label}
              </option>)}
          </select>
          <div className="flex justify-end">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={addNewGoal} disabled={newGoalText.trim() === ''} className={`flex items-center px-4 py-2 rounded-lg ${newGoalText.trim() !== '' ? 'bg-lavender-600 hover:bg-lavender-500 text-white' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}>
              <PlusIcon size={18} className="mr-2" />
              <span>Ajouter</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>;
};