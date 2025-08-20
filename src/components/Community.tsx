import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, MessageSquareIcon, FlagIcon, SendIcon, SmileIcon, ImageIcon, UserIcon } from 'lucide-react';
interface Post {
  id: number;
  content: string;
  author: string;
  timestamp: string;
  reactions: {
    hearts: number;
    support: number;
    thanks: number;
  };
  comments: number;
}
export const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([{
    id: 1,
    content: "Aujourd'hui j'ai réussi à sortir de mon lit malgré une nuit sans sommeil. Petit pas, mais je suis fier de moi.",
    author: 'Anonyme',
    timestamp: 'Il y a 2 heures',
    reactions: {
      hearts: 12,
      support: 8,
      thanks: 3
    },
    comments: 4
  }, {
    id: 2,
    content: 'Je me sens submergé par mes études et mon travail. Comment faites-vous pour gérer la pression et trouver un équilibre ?',
    author: 'Anonyme',
    timestamp: 'Il y a 5 heures',
    reactions: {
      hearts: 7,
      support: 15,
      thanks: 2
    },
    comments: 8
  }, {
    id: 3,
    content: "Après des mois de thérapie, j'ai enfin trouvé le courage de parler de mon anxiété à mes amis. Leur soutien a été incroyable et je me sens moins seul maintenant.",
    author: 'Anonyme',
    timestamp: 'Il y a 1 jour',
    reactions: {
      hearts: 24,
      support: 19,
      thanks: 11
    },
    comments: 6
  }]);
  const [newPostContent, setNewPostContent] = useState('');
  const handleAddPost = () => {
    if (newPostContent.trim() === '') return;
    const newPost: Post = {
      id: Math.max(0, ...posts.map(p => p.id)) + 1,
      content: newPostContent,
      author: 'Anonyme',
      timestamp: "À l'instant",
      reactions: {
        hearts: 0,
        support: 0,
        thanks: 0
      },
      comments: 0
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };
  const handleReaction = (postId: number, reactionType: 'hearts' | 'support' | 'thanks') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reactionType]: post.reactions[reactionType] + 1
          }
        };
      }
      return post;
    }));
  };
  return <section className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-lavender-200 mb-2">
          Communauté de soutien
        </h1>
        <p className="text-slate-400">
          Un espace bienveillant pour partager et s'entraider anonymement
        </p>
      </div>
      <div className="bg-slate-800 rounded-lg p-4 mb-8 border border-slate-700">
        <h3 className="text-lg font-medium text-lavender-200 mb-4">
          Partage ton ressenti
        </h3>
        <div className="mb-4">
          <textarea value={newPostContent} onChange={e => setNewPostContent(e.target.value)} placeholder="Comment te sens-tu aujourd'hui ? Partage tes pensées dans cet espace bienveillant..." className="w-full bg-slate-700 border border-slate-600 rounded-lg p-4 text-slate-200 h-32 focus:outline-none focus:ring-2 focus:ring-lavender-400" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button className="p-2 text-slate-400 hover:text-lavender-300 rounded-full">
              <SmileIcon size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-lavender-300 rounded-full">
              <ImageIcon size={20} />
            </button>
            <div className="flex items-center text-slate-400">
              <UserIcon size={16} className="mr-1" />
              <span className="text-sm">Anonyme</span>
            </div>
          </div>
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={handleAddPost} disabled={newPostContent.trim() === ''} className={`flex items-center px-4 py-2 rounded-lg ${newPostContent.trim() !== '' ? 'bg-lavender-600 hover:bg-lavender-500 text-white' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}>
            <SendIcon size={18} className="mr-2" />
            <span>Publier</span>
          </motion.button>
        </div>
        <div className="mt-3 text-xs text-center text-slate-500">
          Ton message sera partagé de façon anonyme. Sois bienveillant et
          respectueux envers les autres.
        </div>
      </div>
      <div className="space-y-6">
        {posts.map(post => <motion.div key={post.id} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-slate-800 rounded-lg p-5 border border-slate-700">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-lavender-300">
                <UserIcon size={20} />
              </div>
              <div className="ml-3">
                <div className="font-medium text-lavender-200">
                  {post.author}
                </div>
                <div className="text-xs text-slate-500">{post.timestamp}</div>
              </div>
              <button className="ml-auto p-2 text-slate-400 hover:text-red-400 rounded-full">
                <FlagIcon size={16} />
              </button>
            </div>
            <p className="text-slate-300 mb-4">{post.content}</p>
            <div className="flex items-center justify-between pt-3 border-t border-slate-700">
              <div className="flex space-x-3">
                <button onClick={() => handleReaction(post.id, 'hearts')} className="flex items-center text-slate-400 hover:text-red-400">
                  <HeartIcon size={18} className="mr-1" />
                  <span>{post.reactions.hearts}</span>
                </button>
                <button onClick={() => handleReaction(post.id, 'support')} className="flex items-center text-slate-400 hover:text-lavender-400">
                  <span className="mr-1">💪</span>
                  <span>{post.reactions.support}</span>
                </button>
                <button onClick={() => handleReaction(post.id, 'thanks')} className="flex items-center text-slate-400 hover:text-amber-400">
                  <span className="mr-1">🙏</span>
                  <span>{post.reactions.thanks}</span>
                </button>
              </div>
              <button className="flex items-center text-slate-400 hover:text-lavender-300">
                <MessageSquareIcon size={18} className="mr-1" />
                <span>{post.comments}</span>
              </button>
            </div>
          </motion.div>)}
      </div>
    </section>;
};