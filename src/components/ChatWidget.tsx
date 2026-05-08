import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const botResponses: Record<string, string[]> = {
  ar: [
    'معاك المهندس احمد ناصر ، هل يمكنك قياس ضغط الدم الآن؟',
    'أنصحك بالراحة وشرب الماء.',
    'يرجى تناول الدواء في الوقت المحدد.',
    'هل تشعر بأعراض أخرى؟',
    'انت تروح تموت احسن.',
  ],
  en: [
    'Can you measure your blood pressure now?',
    'I advise you to rest and drink water.',
    'Please take your medicine on time.',
    'Do you feel any other symptoms?',
    'I recommend visiting a doctor if symptoms persist.',
  ],
};

export default function ChatWidget() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'user', text: lang === 'ar' ? 'أشعر بدوار' : 'I feel dizzy' },
    { role: 'bot', text: lang === 'ar' ? 'هل يمكنك قياس ضغط الدم الآن؟' : 'Can you measure your blood pressure now?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input.trim() };
    const responses = botResponses[lang];
    const botMsg: Message = {
      role: 'bot',
      text: responses[Math.floor(Math.random() * responses.length)],
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ maxHeight: '460px' }}>
          <div className="bg-teal-500 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-bold text-sm">{t('chatTitle')}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-teal-600 rounded-lg p-1 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: '280px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'bot' ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {msg.role === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'bot'
                    ? 'bg-gray-100 text-gray-800 rounded-bl-md'
                    : 'bg-teal-500 text-white rounded-br-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 p-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chatPlaceholder')}
              className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-200 transition-all"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 bg-teal-500 hover:bg-teal-600 text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
