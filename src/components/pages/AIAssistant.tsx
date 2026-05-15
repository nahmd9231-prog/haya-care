import { useState, useRef, useEffect } from 'react';
import { Send, Heart, Sparkles } from 'lucide-react';
import Card from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { initialChatMessages } from "@/utils/mockData";

interface Message {
  id: number;
  sender: 'user' | 'bot';
  textAr: string;
  textEn: string;
  time: string;
}

const botResponses = [
  { textAr: 'بناءً على قراءاتك الأخيرة، ضغط دمك مستقر بشكل عام. واصل شرب الماء وتجنب الأطعمة المالحة.', textEn: 'Based on your recent readings, your blood pressure is generally stable. Keep drinking water and avoid salty foods.' },
  { textAr: 'مستوى السكر لديك ضمن النطاق الطبيعي. حافظ على وجباتك المنتظمة وتجنب السكريات المكررة.', textEn: 'Your blood sugar level is within normal range. Maintain regular meals and avoid refined sugars.' },
  { textAr: 'أنصحك بالمشي 15-20 دقيقة بعد العشاء، هذا يساعد كثيراً في ضبط السكر والضغط.', textEn: 'I recommend walking 15-20 minutes after dinner, this helps a lot in controlling blood sugar and pressure.' },
  { textAr: 'هل تناولت دوائك اليوم في الوقت المحدد؟ الانتظام في الدواء مهم جداً لاستقرار حالتك.', textEn: 'Did you take your medication on time today? Regularity in medication is very important for your stability.' },
  { textAr: 'إذا شعرت بأي أعراض غير عادية مثل الصداع الشديد أو ضيق التنفس، تواصل مع طبيبك فوراً.', textEn: 'If you feel any unusual symptoms like severe headache or shortness of breath, contact your doctor immediately.' },
];

const quickQuestions = {
  ar: ['ما هو مستوى ضغطي؟', 'هل سكري طبيعي؟', 'ما الأطعمة المناسبة لي؟', 'متى آخذ الدواء؟'],
  en: ['What is my blood pressure?', 'Is my sugar normal?', 'What foods suit me?', 'When to take medication?'],
};

export default function AIAssistant() {
  const { tr, isRTL, lang } = useApp();
  const [messages, setMessages] = useState<Message[]>(initialChatMessages as Message[]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botIndex, setBotIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', textAr: text, textEn: text, time }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = botResponses[botIndex % botResponses.length];
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', textAr: resp.textAr, textEn: resp.textEn, time }]);
      setBotIndex((i) => i + 1);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-120px)] flex flex-col gap-4">
      {/* Header card */}
      <Card className="p-4 flex-shrink-0">
        <div className={`flex items-center gap-3.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6 text-white fill-white/40" />
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h1 className="text-base font-bold text-gray-900">{tr.aiChatTitle}</h1>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-600 font-medium">{tr.online}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick question chips */}
      <div className={`flex flex-wrap gap-2 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {quickQuestions[lang].map((q, i) => (
          <button
            key={i}
            onClick={() => sendMessage(q)}
            className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-full hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <Card className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30" dir={isRTL ? 'rtl' : 'ltr'}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${
                msg.sender === 'user'
                  ? isRTL ? 'justify-start' : 'justify-end'
                  : isRTL ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className={`w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 self-end ${isRTL ? 'order-last ms-2' : 'me-0'}`}>
                  <Heart className="w-4 h-4 text-blue-500" />
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-3 rounded-2xl shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
                } ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <p className="text-sm leading-relaxed">{lang === 'ar' ? msg.textAr : msg.textEn}</p>
                <p className={`text-[11px] mt-1.5 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'} ${isRTL ? 'text-left' : 'text-right'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className={`flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
              <div className={`w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ${isRTL ? 'order-last ms-2' : 'me-0'}`}>
                <Heart className="w-4 h-4 text-blue-500" />
              </div>
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex gap-1">
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 bg-white border-t border-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className={`flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-50 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
              placeholder={tr.chatPlaceholder}
              className={`flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none ${isRTL ? 'text-right' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 flex items-center justify-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 text-white rounded-xl transition-colors flex-shrink-0 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
