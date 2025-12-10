import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SendIcon, SmileIcon, ImageIcon, MicIcon, InfoIcon } from 'lucide-react';

const DJANGO_API_URL = 'https://tsiky-backend.onrender.com/chat/';  // Backend de production

// Fonction pour envoyer un message au backend Django
async function sendMessageToDjango(message: string, signal?: AbortSignal) {
  try {
    const response = await fetch(DJANGO_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal,  // Pour permettre l'annulation
    });

    if (!response.ok) return ["Erreur serveur : " + response.status];

    const data = await response.json();
    console.log("Réponse brute du backend:", data); // Debug

    let botReply = "Désolé, je n'ai pas de réponse pour le moment.";

    if (typeof data.reply === "string") {
      // Nettoyage plus robuste du 'undefined'
      botReply = data.reply
        .replace(/undefined/gi, "")  // Supprime tous les 'undefined' (case insensitive)
        .replace(/\s+/g, " ")         // Normalise les espaces multiples
        .trim();                      // Supprime les espaces aux extrémités
    } else if (data.reply !== undefined && data.reply !== null) {
      // Si ce n'est pas une string mais existe, convertir et nettoyer
      botReply = String(data.reply)
        .replace(/undefined/gi, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    return [botReply];
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return ["⏱️ La requête a pris trop de temps (30s). Réessaie avec une question plus courte."];
    }
    console.error("Error in sendMessageToDjango:", err);
    return ["Désolé, je n'arrive pas à contacter le serveur."];
  }
}

// Composant Typewriter pour effet machine à taper
const Typewriter: React.FC<{ text?: string; speed?: number }> = ({ text = "", speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    console.log("🔍 Typewriter - Texte reçu:", text);

    // Nettoyage robuste du texte
    const cleanText = String(text || "")
      .replace(/undefined/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    console.log("🔍 Typewriter - Texte nettoyé:", cleanText);

    if (!cleanText) {
      setDisplayedText("");
      return;
    }

    // Réinitialiser avant de commencer
    setDisplayedText("");

    let i = 0;
    const interval = setInterval(() => {
      if (i < cleanText.length) {
        setDisplayedText(cleanText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <>{displayedText}</>;
};

// Composant principal Chatbot
export const Chatbot: React.FC = () => {
  // Charger les messages depuis localStorage ou utiliser le message par défaut
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('tsiky_chat_history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Convertir les timestamps en objets Date et marquer comme anciens (pas de typewriter)
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
          isNew: false  // Messages chargés = pas d'animation
        }));
      } catch (error) {
        console.error('Erreur lors du chargement de l\'historique:', error);
      }
    }
    // Message par défaut si pas d'historique
    return [
      {
        id: 1,
        sender: 'bot',
        text: "Bonjour, je suis là pour t'écouter et t'aider. Comment te sens-tu aujourd'hui ?",
        timestamp: new Date(),
        isNew: false  // Message initial = pas d'animation
      }
    ];
  });
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Sauvegarder les messages dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('tsiky_chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user' as const,
      text: inputText,
      timestamp: new Date(),
      isNew: true  // Nouveau message utilisateur
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsBotTyping(true);
    setElapsedTime(0);

    // Timeout de 30 secondes
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 30000);

    // Compteur de temps
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    try {
      const responses = await sendMessageToDjango(userMessage.text, abortController.signal);

      responses
        .filter(text => text !== undefined && text !== null)
        .forEach(text => {
          setMessages(prev => [
            ...prev,
            {
              id: prev.length + 1,
              sender: 'bot' as const,
              text: String(text),
              timestamp: new Date(),
              isNew: true  // Nouveau message bot = animation typewriter
            },
          ]);
        });
    } finally {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      setIsBotTyping(false);
      setElapsedTime(0);
    }
  };

  // Fonction pour effacer l'historique
  const clearHistory = () => {
    if (confirm("Êtes-vous sûr de vouloir effacer tout l'historique de conversation ?")) {
      const defaultMessage = {
        id: 1,
        sender: 'bot' as const,
        text: "Bonjour, je suis là pour t'écouter et t'aider. Comment te sens-tu aujourd'hui ?",
        timestamp: new Date(),
        isNew: false
      };
      setMessages([defaultMessage]);
      localStorage.removeItem('tsiky_chat_history');
    }
  };

  return (
    <section className="max-w-2xl mx-auto">
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="bg-slate-700 p-4 flex items-center">
          <div className="w-3 h-3 bg-lavender-400 rounded-full mr-2 animate-pulse"></div>
          <h2 className="text-lavender-100 font-medium">Assistant Bienveillant</h2>
          <div className="ml-auto flex items-center">
            <button type="button" aria-label="Infos" className="p-2 text-slate-300 hover:text-lavender-300 rounded-full">
              <InfoIcon size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 bg-slate-900/50">
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs sm:max-w-sm px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-lavender-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                <p>
                  {message.sender === "bot" && (message as any).isNew !== false
                    ? <Typewriter text={message.text} speed={25} />
                    : message.text}
                </p>
                <div className="text-right mt-1">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {isBotTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex justify-start">
              <div className="max-w-xs sm:max-w-sm px-4 py-2 rounded-lg bg-slate-700 text-slate-200 rounded-bl-none">
                <p className="flex items-center gap-2">
                  <span className="animate-pulse">🤔</span>
                  Le bot réfléchit...
                  {elapsedTime > 0 && (
                    <span className="text-xs opacity-70">({elapsedTime}s)</span>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-800 border-t border-slate-700">
          <div className="flex items-center">
            <button type="button" aria-label="Emoji" className="p-2 text-slate-400 hover:text-lavender-300 rounded-full"><SmileIcon size={20} /></button>
            <button type="button" aria-label="Image" className="p-2 text-slate-400 hover:text-lavender-300 rounded-full"><ImageIcon size={20} /></button>
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Écris ton message ici..."
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 mx-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-lavender-400"
            />
            <button type="button" aria-label="Vocal" className="p-2 text-slate-400 hover:text-lavender-300 rounded-full"><MicIcon size={20} /></button>
            <button type="button" aria-label="Envoyer" onClick={handleSendMessage} className="p-2 bg-lavender-500 hover:bg-lavender-400 text-white rounded-full"><SendIcon size={20} /></button>
          </div>
          <div className="mt-2 text-xs text-center text-slate-500">
            Cet assistant est là pour t'écouter, mais ne remplace pas un professionnel de santé.
          </div>
        </div>
      </div>
    </section>
  );
};
