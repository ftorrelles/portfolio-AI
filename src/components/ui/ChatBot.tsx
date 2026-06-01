'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatBot({ t }: { t: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: t.chatbot.welcome }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply || 'Error: No response' }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Error: Cannot connect to webhook' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hidden md:block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-16 w-16 rounded-full bg-nex-green text-black shadow-lg hover:brightness-110 transition-all"
        aria-label={t.chatbot.title}
      >
        <span className="text-2xl">{isOpen ? '✖' : '🤖'}</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#262626] border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-nex-green flex items-center justify-center text-black font-bold">🤖</div>
              <div>
                <h3 className="text-white font-semibold text-sm">{t.chatbot.title}</h3>
                <p className="text-white/50 text-xs">AI Agent • Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${m.role === 'user' ? 'bg-nex-green text-black rounded-tr-none' : 'bg-[#262626] text-white rounded-tl-none prose prose-invert prose-p:my-2 prose-li:my-1 prose-ul:my-2 prose-ul:pl-4'}`}>
                  {m.role === 'user' ? (
                    m.text
                  ) : (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({children}) => <p className="my-2">{children}</p>,
                        ul: ({children}) => <ul className="my-2 pl-4 list-disc">{children}</ul>,
                        li: ({children}) => <li className="my-1">{children}</li>,
                      }}
                    >
                      {m.text}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {loading && <div className="p-3 text-white/50 text-sm self-start">Typing...</div>}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#262626] border-t border-white/5">
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl px-3 py-2 border border-white/10 focus-within:border-nex-green/50">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="flex-1 bg-transparent border-none text-white focus:ring-0 text-sm placeholder:text-white/30 resize-none overflow-hidden"
                placeholder="Message..."
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
              <button onClick={sendMessage} className="text-nex-green hover:text-white transition-colors self-end pb-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m0 0l-4-4m4 4l-4 4" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
