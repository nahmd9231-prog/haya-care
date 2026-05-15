import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { initialChatMessages } from '../../utils/mockData';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  textAr: string;
  textEn: string;
  time: string;
}

const botResponses = [
  {
    textAr: 'شكراً على مشاركتك. هل يمكنك وصف الأعراض بشكل أدق؟',
    textEn: "Thank you for sharing. Can you describe the symptoms more precisely?",
  },
  {
    textAr: 'يُنصح بقياس ضغط الدم وسكر الدم الآن. هل معك جهاز القياس؟',
    textEn: 'It is advised to measure blood pressure and blood sugar now. Do you have your device?',
  },
  {
    textAr: 'هذا مفيد جداً. بناءً على قراءاتك الأخيرة، قد تحتاج لشرب الماء والراحة.',
    textEn: 'That is very helpful. Based on your recent readings, you may need to drink water and rest.',
  },
  {
    textAr: 'إذا استمرت الأعراض أكثر من 30 دقيقة، يرجى التواصل مع طبيبك مباشرة.',
    textEn: 'If symptoms persist for more than 30 minutes, please contact your doctor directly.',
  },
  {
    textAr: 'تذكر تناول دوائك في الموعد المحدد. هل احتجت أي مساعدة أخرى؟',
    textEn: 'Remember to take your medication on time. Do you need any other assistance?',
  },
];

export default function ChatWidget() {
  const { tr, isRTL, lang } = useApp();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialChatMessages as Message[]);
  const [input, setInput] = useState('');
  const [botIndex, setBotIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, minimized]);

  const handleSend = () => {
    if (!input.trim()) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      textAr: input,
      textEn: input,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResp = botResponses[botIndex % botResponses.length];
      const botMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        textAr: botResp.textAr,
        textEn: botResp.textEn,
        time,
      };
      setMessages((prev) => [...prev, botMsg]);
      setBotIndex((i) => i + 1);
      setIsTyping(false);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50`}>
      {/* Chat window */}
      {open && (
        <div
          className={`mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${minimized ? 'h-14' : 'h-[480px]'} flex flex-col`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className={`flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white/50" />
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm font-semibold text-white leading-tight">{tr.aiChatTitle}</p>
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/80">{tr.online}</span>
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => setMinimized((v) => !v)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className={`w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 ${isRTL ? 'ms-2 order-last' : 'me-2'}`}>
                        <Heart className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                      } ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      {lang === 'ar' ? msg.textAr : msg.textEn}
                      <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'} ${isRTL ? 'text-left' : 'text-right'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'} items-center gap-2`}>
                    <div className={`w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center ${isRTL ? 'ms-2 order-last' : 'me-2'}`}>
                      <Heart className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-gray-100">
                <div className={`flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-50 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={tr.chatPlaceholder}
                    className={`flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none ${isRTL ? 'text-right' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-7 h-7 flex items-center justify-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex-shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          setMinimized(false);
        }}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          open ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:shadow-blue-200 hover:shadow-xl'
        }`}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>
    </div>
  );
}
