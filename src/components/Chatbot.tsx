import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendIcon, MicIcon, StopCircle, Trash2Icon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DJANGO_API_URL = 'http://127.0.0.1:8000/chat/';

interface Message {
  id: string;
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
    return [];
  });

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
    localStorage.setItem('tsiky_chat_history', JSON.stringify(messages));
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
            ? { ...msg, text: (msg.text + chunkValue).replace(/^{"reply":\s*"(.*)"}$/, '$1') }
            : msg
        ));
      }

    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setMessages(prev => prev.map(msg =>
          msg.id === botMsgId ? { ...msg, text: msg.text + "\n(Oups, petit souci de connexion...)" } : msg
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
    setMessages([]);
  };

  const isEmpty = messages.length === 0;

  return (
    // FIX: Removed 'overflow-hidden' from main container to prevent clipping
    <div className="flex flex-col h-[85vh] w-full max-w-5xl mx-auto bg-slate-900/50 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl relative my-4">

      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 md:px-20 py-8 scrollbar-thin scrollbar-thumb-white/10 scroll-smooth"
      >
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-32 h-32 mb-6"
            >
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img src="/bot-avatar.png" alt="Tsiky" className="w-full h-full object-contain drop-shadow-2xl" />
            </motion.div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 mb-2">
              Bonjour, je suis Tsiky
            </h2>
            <p className="text-slate-400 max-w-md">
              Je suis là pour vous écouter et échanger avec bienveillance.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
              {['Je me sens un peu anxieux', 'Raconte-moi une histoire', 'Conseils pour mieux dormir', 'Juste envie de parler'].map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => { setInput(suggestion); }}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm text-slate-300 transition-all text-left"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
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
                {/* FIX: Removed 'overflow-hidden' here and increased width to 95% */}
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
            <div className="h-4" />
          </div>
        )}
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
              placeholder="Écrivez à Tsiky..."
              disabled={isStreaming}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-base py-3 min-h-[44px] max-h-32 resize-none scrollbar-none"
              rows={1}
            />

            <div className="flex items-center gap-2 pb-2 pr-2">
              {!isEmpty && (
                <button
                  onClick={clearHistory}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Nouvelle conversation"
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
                  onClick={handleSend}
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
            L'IA peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </div>
      </div>

    </div>
  );
};
