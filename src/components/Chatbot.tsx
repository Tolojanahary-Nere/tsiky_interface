import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SendIcon, SmileIcon, ImageIcon, MicIcon, InfoIcon, Trash2Icon } from 'lucide-react';

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const recognitionRef = React.useRef<any>(null);


  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

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
    const defaultMessage = {
      id: 1,
      sender: 'bot' as const,
      text: "Bonjour, je suis là pour t'écouter et t'aider. Comment te sens-tu aujourd'hui ?",
      timestamp: new Date(),
      isNew: false
    };
    setMessages([defaultMessage]);
    localStorage.removeItem('tsiky_chat_history');
    setShowDeleteConfirm(false);
  };

  // Fonction pour gérer l'enregistrement vocal
  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert('La reconnaissance vocale n\'est pas supportée sur votre navigateur.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-light rounded-3xl shadow-2xl overflow-hidden border border-white/20 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="glass p-5 flex items-center border-b border-white/10">
          <motion.div
            className="w-3 h-3 bg-gradient-to-r from-lavender-400 to-lavender-600 rounded-full mr-3"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <h2 className="text-lavender-100 font-comic text-lg">Assistant Bienveillant</h2>
          <div className="ml-auto flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-slate-300 hover:text-red-400 rounded-full hover:bg-red-500/10 transition-colors"
              aria-label="Supprimer l'historique"
            >
              <Trash2Icon size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="p-2 text-slate-300 hover:text-lavender-300 rounded-full hover:bg-lavender-500/10 transition-colors"
              aria-label="Infos"
            >
              <InfoIcon size={18} />
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[550px] overflow-y-auto p-6 bg-gradient-to-b from-slate-900/30 to-slate-900/50 backdrop-blur-sm">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`mb-5 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`max-w-md px-5 py-3 rounded-2xl shadow-lg ${message.sender === 'user'
                  ? 'bg-gradient-to-br from-lavender-600 to-lavender-700 text-white rounded-br-sm'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-bl-sm border border-slate-200 dark:border-transparent'
                  }`}
              >
                <p className="text-sm leading-relaxed">
                  {message.sender === "bot" && (message as any).isNew !== false
                    ? <Typewriter text={message.text} speed={25} />
                    : message.text}
                </p>
                <div className="text-right mt-2">
                  <span className="text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {isBotTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex justify-start"
            >
              <div className="bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 px-5 py-3 rounded-2xl rounded-bl-sm shadow-lg border border-slate-200 dark:border-transparent">
                <p className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    🤔
                  </motion.span>
                  Le bot réfléchit...
                  {elapsedTime > 0 && (
                    <span className="text-xs opacity-70">({elapsedTime}s)</span>
                  )}
                </p>
              </div>
            </motion.div>
          )}

          {/* Invisible element for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-5 glass border-t border-white/10">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="p-2 text-slate-400 hover:text-lavender-300 rounded-full hover:bg-lavender-500/10 transition-colors"
              aria-label="Emoji"
            >
              <SmileIcon size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="p-2 text-slate-400 hover:text-lavender-300 rounded-full hover:bg-lavender-500/10 transition-colors"
              aria-label="Image"
            >
              <ImageIcon size={20} />
            </motion.button>
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Écris ton message ici..."
              className="flex-1 glass-light border border-white/20 rounded-xl px-5 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={toggleVoiceRecording}
              className={`p-2 rounded-full transition-colors ${isRecording ? 'text-red-500 bg-red-100 animate-pulse' : 'text-slate-400 hover:text-lavender-300 hover:bg-lavender-500/10'}`}
              aria-label="Vocal"
            >
              <MicIcon size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleSendMessage}
              className="p-3 bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-400 hover:to-lavender-500 text-white rounded-xl shadow-lg animate-pulseGlow transition-all"
              aria-label="Envoyer"
            >
              <SendIcon size={20} />
            </motion.button>
          </div>
          <div className="mt-3 text-xs text-center text-slate-400">
            💜 Cet assistant est là pour t'écouter, mais ne remplace pas un professionnel de santé.
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="glass-light rounded-2xl p-6 max-w-md w-full shadow-2xl border border-white/20"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <Trash2Icon size={48} className="text-red-400" />
              </motion.div>
              <h3 className="text-xl font-comic text-white mb-2">Supprimer l'historique ?</h3>
              <p className="text-slate-300 mb-6">
                Es-tu sûr(e) de vouloir effacer toute la conversation ? Cette action est irréversible.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 glass border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  Annuler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearHistory}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-400 hover:to-red-500 shadow-lg transition-all"
                >
                  Supprimer
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
