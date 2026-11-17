
import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, User, X, MessageCircle } from 'lucide-react';
import { SUGGESTED_QUESTIONS, generateReply } from '@/data/admitEase';
import { useChatUI } from '@/components/chatUIContext';

type Message = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
};

const WELCOME: Message = {
  id: 0,
  role: 'assistant',
  text:
    "Hello, and welcome to Westbridge University. I'm AdmitEase, here to help with questions about our undergraduate programmes, admission requirements, the application process, fees and deadlines. How can I help you today?",
};

export default function FloatingChat() {
  const { isOpen, close, toggle } = useChatUI();
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tooltipTimer = useRef<number | undefined>(undefined);

  // Show welcome tooltip after a short delay on first load.
  useEffect(() => {
    const t = window.setTimeout(() => setShowTooltip(true), 2500);
    tooltipTimer.current = window.setTimeout(
      () => setShowTooltip(false),
      10000
    );

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(tooltipTimer.current);
    };
  }, []);

  // Auto-scroll on new messages / typing.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when opened.
  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 200);
      setShowTooltip(false);
    }
  }, [isOpen]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        text: generateReply(trimmed),
      };

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 650 + Math.random() * 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleSuggestion = (question: string) => {
    send(question);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Floating Chat Launcher */}
      {!isOpen && (
        <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
          {showTooltip && (
            <div className="relative max-w-[240px] animate-fade-up rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm text-navy-700 shadow-lg shadow-navy-900/10">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-white"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </button>

              Need help with admissions? Chat with AdmitEase.
            </div>
          )}

          <button
            onClick={toggle}
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-gold-300 shadow-xl shadow-navy-900/30 transition-all hover:scale-105 hover:bg-navy-800 hover:shadow-2xl"
            aria-label="Open AdmitEase chat"
          >
            <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />

            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-gold-400 ring-2 ring-navy-900" />
            </span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-sm sm:inset-x-auto sm:right-6 sm:bottom-6 sm:mx-0">
          <div className="flex max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl shadow-navy-900/20 sm:max-h-[80vh]">

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-navy-100 bg-navy-900 px-4 py-3.5 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-navy-900">
                <Sparkles className="h-4.5 w-4.5" />
              </div>

              <div className="flex-1">
                <p className="font-serif text-base font-semibold leading-tight">
                  AdmitEase
                </p>
                <p className="text-[11px] text-navy-300">
                  Admissions assistant · Prototype
                </p>
              </div>

              <button
                onClick={close}
                className="flex h-8 w-8 items-center justify-center rounded-full text-navy-200 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="scrollbar-thin flex-1 space-y-3.5 overflow-y-auto bg-navy-50/40 px-3.5 py-4"
              style={{ maxHeight: '320px' }}
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {isTyping && <TypingIndicator />}
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="border-t border-navy-100 bg-white px-3.5 py-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-navy-400">
                  Suggested questions
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.slice(0, 6).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      className="rounded-full border border-navy-200 bg-white px-3 py-1.5 text-xs text-navy-700 transition-colors hover:border-gold-300 hover:bg-gold-50 hover:text-navy-900"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-navy-100 bg-white px-3.5 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about programmes, requirements, deadlines…"
                className="flex-1 rounded-full border border-navy-200 bg-navy-50/60 px-3.5 py-2 text-sm text-navy-900 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white transition-all hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isAssistant = message.role === 'assistant';
  const lines = message.text.split('\n');

  return (
    <div
      className={`flex items-end gap-2 ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      {isAssistant && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-400 text-navy-900">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      )}

      <div
        className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
          isAssistant
            ? 'rounded-bl-sm bg-white text-navy-800 shadow-sm ring-1 ring-navy-100'
            : 'rounded-br-sm bg-navy-900 text-white'
        }`}
      >
        {lines.map((line, i) => (
          <p key={i} className={line.startsWith('•') ? 'pl-1' : ''}>
            {line}
          </p>
        ))}
      </div>

      {!isAssistant && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-700 text-white">
          <User className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-400 text-navy-900">
        <Sparkles className="h-3.5 w-3.5" />
      </div>

      <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-navy-100">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300" />
        </div>
      </div>
    </div>
  );
}

// Re-export open hook for convenience.
export { useChatUI as openChat };
