import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, VideoIcon, HeadphonesIcon, BookmarkIcon, SearchIcon } from 'lucide-react';
interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'podcast' | 'book';
  author: string;
  isFavorite: boolean;
  tags: string[];
  imageUrl: string;
}
export const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const resources: Resource[] = [{
    id: 1,
    title: "Gérer l'anxiété au quotidien",
    description: "Techniques pratiques pour réduire l'anxiété dans votre vie de tous les jours.",
    type: 'article',
    author: 'Dr. Sophie Martin',
    isFavorite: false,
    tags: ['anxiété', 'techniques', 'quotidien'],
    imageUrl: 'https://images.unsplash.com/photo-1474418397713-2f1761aeaa78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80'
  }, {
    id: 2,
    title: 'Méditation guidée pour débutants',
    description: 'Une vidéo de 10 minutes pour apprendre les bases de la méditation pleine conscience.',
    type: 'video',
    author: 'Jean Dubois',
    isFavorite: true,
    tags: ['méditation', 'débutant', 'pleine conscience'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }, {
    id: 3,
    title: 'Podcast: Traverser une dépression',
    description: "Témoignages et conseils d'experts pour comprendre et surmonter la dépression.",
    type: 'podcast',
    author: 'Marie Lefort',
    isFavorite: false,
    tags: ['dépression', 'témoignages', 'rétablissement'],
    imageUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }, {
    id: 4,
    title: 'Le pouvoir du moment présent',
    description: 'Un guide spirituel pour transcender la pensée égoïque et accéder à la plénitude.',
    type: 'book',
    author: 'Eckhart Tolle',
    isFavorite: true,
    tags: ['spiritualité', 'pleine conscience', 'développement personnel'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
  }, {
    id: 5,
    title: 'Techniques de respiration anti-stress',
    description: 'Apprenez 5 exercices de respiration efficaces pour réduire rapidement votre niveau de stress.',
    type: 'article',
    author: 'Dr. Pierre Moreau',
    isFavorite: false,
    tags: ['stress', 'respiration', 'techniques'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }];
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpenIcon size={16} />;
      case 'video':
        return <VideoIcon size={16} />;
      case 'podcast':
        return <HeadphonesIcon size={16} />;
      case 'book':
        return <BookOpenIcon size={16} />;
      default:
        return null;
    }
  };
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-500/20 text-blue-300';
      case 'video':
        return 'bg-red-500/20 text-red-300';
      case 'podcast':
        return 'bg-green-500/20 text-green-300';
      case 'book':
        return 'bg-amber-500/20 text-amber-300';
      default:
        return 'bg-slate-500/20 text-slate-300';
    }
  };
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || resource.description.toLowerCase().includes(searchTerm.toLowerCase()) || resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === null || resource.type === selectedType;
    return matchesSearch && matchesType;
  });
  return <section className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-lavender-200 mb-2">
          Ressources thérapeutiques
        </h1>
        <p className="text-slate-400">
          Des articles, vidéos et podcasts sélectionnés pour t'accompagner
        </p>
      </div>
      <div className="bg-slate-800 rounded-lg p-4 mb-8 border border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Rechercher par titre, description ou tag..." className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-lavender-400" />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button onClick={() => setSelectedType(null)} className={`px-3 py-1 rounded-full whitespace-nowrap ${selectedType === null ? 'bg-lavender-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              Tous
            </button>
            <button onClick={() => setSelectedType('article')} className={`px-3 py-1 rounded-full whitespace-nowrap flex items-center ${selectedType === 'article' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              <BookOpenIcon size={14} className="mr-1" />
              Articles
            </button>
            <button onClick={() => setSelectedType('video')} className={`px-3 py-1 rounded-full whitespace-nowrap flex items-center ${selectedType === 'video' ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              <VideoIcon size={14} className="mr-1" />
              Vidéos
            </button>
            <button onClick={() => setSelectedType('podcast')} className={`px-3 py-1 rounded-full whitespace-nowrap flex items-center ${selectedType === 'podcast' ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              <HeadphonesIcon size={14} className="mr-1" />
              Podcasts
            </button>
            <button onClick={() => setSelectedType('book')} className={`px-3 py-1 rounded-full whitespace-nowrap flex items-center ${selectedType === 'book' ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              <BookOpenIcon size={14} className="mr-1" />
              Livres
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map(resource => <motion.div key={resource.id} whileHover={{
        y: -5
      }} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 flex flex-col h-full">
            <div className="h-48 overflow-hidden">
              <img src={resource.imageUrl} alt={resource.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-1 rounded-full text-xs flex items-center ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                  <span className="ml-1 capitalize">{resource.type}</span>
                </span>
                <button className="text-slate-400 hover:text-amber-400">
                  <BookmarkIcon size={18} className={resource.isFavorite ? 'fill-amber-400 text-amber-400' : ''} />
                </button>
              </div>
              <h3 className="text-lg font-medium text-lavender-100 mb-2">
                {resource.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 flex-1">
                {resource.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-slate-500">
                  Par {resource.author}
                </span>
                <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className="text-sm text-lavender-400 hover:text-lavender-300">
                  En savoir plus →
                </motion.button>
              </div>
            </div>
          </motion.div>)}
      </div>
      {filteredResources.length === 0 && <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
          <SearchIcon size={48} className="mx-auto mb-4 text-slate-600" />
          <h3 className="text-lg font-medium text-lavender-100 mb-2">
            Aucun résultat trouvé
          </h3>
          <p className="text-slate-400">
            Essaie avec d'autres termes de recherche ou catégories
          </p>
        </div>}
    </section>;
};