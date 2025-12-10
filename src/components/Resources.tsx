import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, VideoIcon, HeadphonesIcon, PhoneIcon, SearchIcon, ExternalLinkIcon, MapPinIcon, Globe } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'podcast' | 'hotline' | 'organization';
  author?: string;
  contact?: string;
  link?: string;
  tags: string[];
  country: string;
}

export const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const resources: Resource[] = [
    // Lignes d'aide / Numéros d'urgence
    {
      id: 1,
      title: "SOS Amitié",
      description: "Service d'écoute par téléphone destiné à accueillir la parole de ceux qui, à un moment de leur vie, traversent une période difficile. Anonyme et confidentiel, 24h/24 et 7j/7.",
      type: 'hotline',
      contact: "09 72 39 40 50",
      link: "https://www.sos-amitie.com",
      tags: ['urgence', 'écoute', 'gratuit', '24h/24'],
      country: "France"
    },
    {
      id: 2,
      title: "Suicide Écoute",
      description: "Numéro national de prévention du suicide. Ligne d'écoute anonyme et confidentielle pour toute personne confrontée au suicide.",
      type: 'hotline',
      contact: "01 45 39 40 00",
      link: "https://www.suicide-ecoute.fr",
      tags: ['suicide', 'prévention', 'écoute', 'crise'],
      country: "France"
    },
    {
      id: 3,
      title: "Fil Santé Jeunes",
      description: "Service anonyme et gratuit pour les jeunes de 12 à 25 ans. Écoute, information et orientation sur tous les sujets de santé, y compris la santé mentale.",
      type: 'hotline',
      contact: "0 800 235 236",
      link: "https://www.filsantejeunes.com",
      tags: ['jeunes', 'santé mentale', 'gratuit', 'anonyme'],
      country: "France"
    },

    // Organisations et centres
    {
      id: 4,
      title: "Psychologies.com - Dépression",
      description: "Articles d'experts, témoignages et conseils pratiques pour comprendre et surmonter la dépression. Base de données de psychologues et psychiatres.",
      type: 'organization',
      link: "https://www.psychologies.com/Therapies/Toutes-les-therapies/Therapies-comportementales/Articles-et-Dossiers/Depression",
      tags: ['information', 'professionnels', 'dépression'],
      country: "France"
    },
    {
      id: 5,
      title: "Psycom - Santé Mentale Info",
      description: "Organisme public d'information sur la santé mentale. Brochures gratuites, guides pratiques et annuaire des structures de soins.",
      type: 'organization',
      link: "https://www.psycom.org",
      tags: ['information', 'santé publique', 'ressources'],
      country: "France"
    },

    // Articles et guides
    {
      id: 6,
      title: "Comprendre la Dépression - Santé Publique France",
      description: "Guide complet sur la dépression : symptômes, causes, traitements disponibles et conseils pour les proches.",
      type: 'article',
      author: "Santé Publique France",
      link: "https://www.santepubliquefrance.fr",
      tags: ['guide', 'dépression', 'symptômes', 'traitement'],
      country: "France"
    },
    {
      id: 7,
      title: "Techniques de Gestion du Stress et de l'Anxiété",
      description: "Exercices pratiques de respiration, méditation guidée et techniques cognitivo-comportementales validées scientifiquement.",
      type: 'article',
      author: "Association Française des TCC",
      link: "https://www.aftcc.org",
      tags: ['techniques', 'anxiété', 'stress', 'pratique'],
      country: "France"
    },

    // Vidéos éducatives
    {
      id: 8,
      title: "La Dépression Expliquée - Série Éducative",
      description: "Série de vidéos pédagogiques sur la dépression : mécanismes biologiques, psychologiques et solutions thérapeutiques.",
      type: 'video',
      author: "Unafam",
      link: "https://www.youtube.com/@unafam",
      tags: ['éducation', 'comprendre', 'dépression'],
      country: "France"
    },
    {
      id: 9,
      title: "Méditation Guidée pour l'Anxiété",
      description: "Collection de méditations guidées spécialement conçues pour gérer l'anxiété et retrouver le calme intérieur.",
      type: 'video',
      author: "Christophe André",
      link: "https://www.youtube.com/results?search_query=christophe+andré+méditation",
      tags: ['méditation', 'anxiété', 'relaxation'],
      country: "France"
    },

    // Podcasts
    {
      id: 10,
      title: "Les Maux Bleus - Podcast sur la Dépression",
      description: "Témoignages de personnes ayant vécu la dépression et interviews d'experts en santé mentale.",
      type: 'podcast',
      author: "France Culture",
      link: "https://www.radiofrance.fr",
      tags: ['témoignages', 'dépression', 'experts'],
      country: "France"
    },
    {
      id: 11,
      title: "Tête en l'air - Podcast Santé Mentale",
      description: "Podcast hebdomadaire qui décomplexe la santé mentale avec des invités variés et des sujets concrets.",
      type: 'podcast',
      link: "https://podcast.ausha.co/tete-en-l-air",
      tags: ['santé mentale', 'quotidien', 'bien-être'],
      country: "France"
    },

    // Ressources Madagascar
    {
      id: 12,
      title: "Centre Psychiatrique de Befelatanana",
      description: "Principal centre psychiatrique public à Antananarivo. Consultations et suivis psychiatriques accessibles.",
      type: 'organization',
      contact: "+261 20 22 232 60",
      tags: ['madagascar', 'psychiatrie', 'consultation'],
      country: "Madagascar"
    },
    {
      id: 13,
      title: "Croix Rouge Malagasy - Soutien Psychologique",
      description: "Service d'écoute et de soutien psychologique gratuit. Aide d'urgence en cas de crise.",
      type: 'hotline',
      contact: "+261 20 22 655 00",
      link: "https://www.croix-rouge.mg",
      tags: ['madagascar', 'urgence', 'gratuit', 'écoute'],
      country: "Madagascar"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpenIcon size={16} />;
      case 'video':
        return <VideoIcon size={16} />;
      case 'podcast':
        return <HeadphonesIcon size={16} />;
      case 'hotline':
        return <PhoneIcon size={16} />;
      case 'organization':
        return <Globe size={16} />;
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
      case 'hotline':
        return 'bg-rose-500/20 text-rose-300';
      case 'organization':
        return 'bg-amber-500/20 text-amber-300';
      default:
        return 'bg-slate-500/20 text-slate-300';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === null || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <section className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-lavender-200 mb-2">
          Ressources d'Aide
        </h1>
        <p className="text-slate-400">
          Lignes d'écoute, organisations et ressources pour t'accompagner dans ton parcours
        </p>
        <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg">
          <p className="text-rose-300 text-sm font-medium flex items-center">
            <PhoneIcon size={16} className="mr-2" />
            En cas d'urgence : SOS Amitié <strong className="ml-2">09 72 39 40 50</strong> (France) • <strong className="ml-2">+261 20 22 655 00</strong> (Madagascar)
          </p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-4 mb-8 border border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Rechercher par titre, description ou tag..."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-lavender-400"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button onClick={() => setSelectedType(null)} className={`px-3 py-1 rounded-full whitespace-nowrap ${selectedType === null ? 'bg-lavender-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              Tous
            </button>
            <button onClick={() => setSelectedType('hotline')} className={`px-3 py-1 rounded-full whitespace-nowrap flex items-center ${selectedType === 'hotline' ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              <PhoneIcon size={14} className="mr-1" />
              Urgence
            </button>
            <button onClick={() => setSelectedType('organization')} className={`px-3 py-1 rounded-full whitespace-nowrap flex items-center ${selectedType === 'organization' ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              <Globe size={14} className="mr-1" />
              Organisations
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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map(resource => (
          <motion.div
            key={resource.id}
            whileHover={{ y: -5 }}
            className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 flex flex-col h-full"
          >
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-1 rounded-full text-xs flex items-center ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                  <span className="ml-1 capitalize">{resource.type === 'hotline' ? 'Urgence' : resource.type}</span>
                </span>
                <span className="flex items-center text-xs text-slate-500">
                  <MapPinIcon size={12} className="mr-1" />
                  {resource.country}
                </span>
              </div>

              <h3 className="text-lg font-medium text-lavender-100 mb-2">
                {resource.title}
              </h3>

              <p className="text-slate-400 text-sm mb-4 flex-1">
                {resource.description}
              </p>

              {resource.contact && (
                <div className="mb-3 p-2 bg-lavender-500/10 rounded border border-lavender-500/30">
                  <p className="text-lavender-300 font-medium text-sm flex items-center">
                    <PhoneIcon size={14} className="mr-2" />
                    {resource.contact}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {resource.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto">
                {resource.author && (
                  <span className="text-xs text-slate-500">
                    Par {resource.author}
                  </span>
                )}
                {resource.link && (
                  <motion.a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-lavender-400 hover:text-lavender-300 flex items-center"
                  >
                    Visiter <ExternalLinkIcon size={14} className="ml-1" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
          <SearchIcon size={48} className="mx-auto mb-4 text-slate-600" />
          <h3 className="text-lg font-medium text-lavender-100 mb-2">
            Aucun résultat trouvé
          </h3>
          <p className="text-slate-400">
            Essaie avec d'autres termes de recherche ou catégories
          </p>
        </div>
      )}
    </section>
  );
};