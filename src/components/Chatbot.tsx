import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendIcon, SmileIcon, ImageIcon, MicIcon, Trash2Icon, StopCircle } from 'lucide-react';

const DJANGO_API_URL = 'https://tsiky-backend.onrender.com/chat/';

interface Message {
  id: string; // Changed to string for UUIDs if needed, or keeping number is fine but string is more robust
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('tsiky_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved).map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    return [{
      id: 'init',
      sender: 'bot',
      text: "Bonjour, je suis là pour t'écouter. Comment te sens-tu aujourd'hui ?",
      timestamp: new Date()
    }];
  });

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    localStorage.setItem('tsiky_chat_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    // Create a placeholder bot message
    const botMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: botMsgId,
      sender: 'bot',
      text: '',
      timestamp: new Date(),
      isStreaming: true
    }]);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(DJANGO_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
        signal: abortControllerRef.current.signal
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });

        setMessages(prev => prev.map(msg =>
          msg.id === botMsgId
            ? { ...msg, text: msg.text + chunkValue }
            : msg
        ));
      }

    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setMessages(prev => prev.map(msg =>
          msg.id === botMsgId
            ? { ...msg, text: msg.text + "\n\n(Désolé, une erreur est survenue.)" }
            : msg
        ));
      }
    } finally {
      setIsStreaming(false);
      setMessages(prev => prev.map(msg =>
        msg.id === botMsgId ? { ...msg, isStreaming: false } : msg
      ));
      abortControllerRef.current = null;
    }
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  const clearHistory = () => {
    setMessages([{
      id: 'init',
      sender: 'bot',
      text: "Bonjour, je suis là pour t'écouter. Comment te sens-tu aujourd'hui ?",
      timestamp: new Date()
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-[80vh] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-lavender-400/50">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm backdrop-blur-md ${msg.sender === 'user'
                    ? 'bg-gradient-to-br from-lavender-600 to-indigo-600 text-white rounded-br-sm'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-white/20 rounded-bl-sm'
                  }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                {msg.isStreaming && (
                  <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
                )}
                <div className={`text-[10px] mt-1 opacity-60 ${msg.sender === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 glass p-2 rounded-2xl flex items-center gap-2 border border-white/20 shadow-lg">
        <button
          onClick={clearHistory}
          className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
          title="Effacer l'historique"
        >
          <Trash2Icon size={20} />
        </button>

        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Écris quelque chose..."
          className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 px-2"
          disabled={isStreaming}
        />

        {isStreaming ? (
          <button
            onClick={stopGeneration}
            className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
          >
            <StopCircle size={24} />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-lavender-600 hover:bg-lavender-700 text-white rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendIcon size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
