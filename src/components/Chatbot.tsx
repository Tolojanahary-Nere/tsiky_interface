import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendIcon, MicIcon, StopCircle, Trash2Icon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export const Chatbot: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: t('chat.welcome'),
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Update welcome message if language changes and it's the only message
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome-msg') {
      setMessages([{
        id: 'welcome-msg',
        sender: 'bot',
        text: t('chat.welcome'),
        timestamp: new Date()
      }]);
    }
  }, [i18n.language, t]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // N8N Webhook URL from environment variables
  const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

  const handleSend = async (textToSend: string = input) => {
    const finalInput = textToSend.trim();
    if (!finalInput || isStreaming) return;

    if (!N8N_WEBHOOK_URL || N8N_WEBHOOK_URL.includes('your-n8n-instance')) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text: '⚠️ Configuration manquante : Veuillez configurer VITE_N8N_WEBHOOK_URL dans le fichier .env',
        timestamp: new Date()
      }]);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: finalInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    const botMsgId = (Date.now() + 1).toString();
    // Add placeholder bot message
    setMessages(prev => [...prev, {
      id: botMsgId,
      sender: 'bot',
      text: '...',
      timestamp: new Date(),
      isStreaming: true
    }]);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          language: i18n.language // Pass current language code (fr, en, es)
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      // Read response as plain text
      const botResponseText = await response.text();

      setMessages(prev => prev.map(msg =>
        msg.id === botMsgId
          ? { ...msg, text: botResponseText || t('chat.emptyResponse') || "Réponse vide.", isStreaming: false }
          : msg
      ));

    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages(prev => prev.map(msg =>
        msg.id === botMsgId
          ? { ...msg, text: `Erreur: Impossible de joindre le chatbot. (${err.message})`, isStreaming: false }
          : msg
      ));
    } finally {
      setIsStreaming(false);
    }
  };

  const stopGeneration = () => {
    setIsStreaming(false);
  };

  const clearHistory = () => {
    if (window.confirm(t('chat.clearConfirm'))) {
      setMessages([{
        id: 'welcome-msg',
        sender: 'bot',
        text: t('chat.welcome'),
        timestamp: new Date()
      }]);
    }
  };

  const isEmpty = false;

  // Translations for suggestions
  const suggestions = [
    { key: 'panic', text: t('chat.suggestions.panic') },
    { key: 'help', text: t('chat.suggestions.help') },
    { key: 'lonely', text: t('chat.suggestions.lonely') },
    { key: 'mood', text: t('chat.suggestions.mood') },
  ];

  return (
    <div className="flex flex-col h-[85vh] w-full max-w-5xl mx-auto bg-slate-900/50 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl relative my-4">

      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 md:px-20 py-8 scrollbar-thin scrollbar-thumb-white/10 scroll-smooth"
      >
        {/* Messages List - Always visible now */}
        <div className="space-y-8 pb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start group'}`}
            >
              {/* Bot Avatar */}
              {msg.sender === 'bot' && (
                <div className="flex-none w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 mt-1 shadow-lg overflow-hidden">
                  <img src="/bot-avatar.png" alt="Bot" className="w-full h-full object-cover bg-slate-900" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[95%] md:max-w-[85%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm
                    ${msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-md'
                    : 'text-slate-200 w-full'
                  }`}
              >
                {msg.sender === 'bot' ? (
                  <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-800 prose-pre:p-2 prose-pre:rounded-lg w-full">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0 break-words w-full" {...props} />,
                        a: ({ node, ...props }) => <a className="text-blue-400 hover:underline break-all" {...props} />,
                        code: ({ node, ...props }) => <code className="bg-slate-800 px-1 rounded text-sm break-all whitespace-pre-wrap" {...props} />,
                        pre: ({ node, ...props }) => <pre className="overflow-x-auto w-full my-2" {...props} />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                    {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse rounded-full align-middle" />}
                  </div>
                ) : (
                  <div className="break-words overflow-anywhere">{msg.text}</div>
                )}
              </div>
            </div>
          ))}

          {/* Suggestions appear if only the welcome message is present (or no user messages) */}
          {!messages.some(m => m.sender === 'user') && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg mx-auto">
              {suggestions.map(suggestion => (
                <button
                  key={suggestion.key}
                  onClick={() => handleSend(suggestion.text)}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm text-slate-300 transition-all text-left"
                >
                  {suggestion.text}
                </button>
              ))}
            </div>
          )}

          <div className="h-4" />
        </div>
      </div>

      {/* Fixed Bottom Input */}
      <div className="flex-none p-4 md:p-6 bg-slate-900/80 backdrop-blur-xl border-t border-white/5 z-20 rounded-b-3xl">
        <div className="max-w-3xl mx-auto relative">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-2 pl-4 flex items-end shadow-xl transition-all focus-within:ring-1 focus-within:ring-white/20 focus-within:bg-white/10">

            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t('chat.placeholder')}
              disabled={isStreaming}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-base py-3 min-h-[44px] max-h-32 resize-none scrollbar-none"
              rows={1}
            />

            <div className="flex items-center gap-2 pb-2 pr-2">
              {!isEmpty && messages.length > 1 && (
                <button
                  onClick={clearHistory}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title={t('chat.clear')}
                >
                  <Trash2Icon size={20} />
                </button>
              )}

              {isStreaming ? (
                <button
                  onClick={stopGeneration}
                  className="p-2 bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <StopCircle size={20} />
                </button>
              ) : (
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={`p-2 rounded-full transition-all ${input.trim()
                    ? 'bg-white text-slate-900 hover:bg-blue-50'
                    : 'bg-white/10 text-slate-500 cursor-not-allowed'
                    }`}
                >
                  <SendIcon size={20} />
                </button>
              )}
            </div>
          </div>
          <p className="text-center text-slate-600 text-xs mt-3">
            {t('footer.disclaimer').slice(0, 80)}...
          </p>
        </div>
      </div>

    </div>
  );
};
