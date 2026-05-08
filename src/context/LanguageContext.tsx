import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    appName: 'HayaCare - منصة حياه',
    developer: 'Developed by Eng. Ahmed Nasser khodair',
    dashboard: 'لوحة التحكم',
    readings: 'سجل القراءات',
    medicalHistory: 'السجل الطبي',
    personalizedTips: 'نصائح مخصصة',
    aiAssistant: 'مساعد الذكاء الاصطناعي',
    settings: 'الإعدادات',
    welcome: 'أهلاً بك، أستاذ محمد!',
    weeklyReport: 'تقريرك للأسبوع الماضي: ممتاز!',
    sugar: 'السكر',
    pressure: 'الضغط',
    aiPrediction: 'صحتك في الأسبوع القادم: مستقرة، ولكن...',
    aiAlert: 'نتوقع ارتفاع طفيف في ضغط الدم يوم الأربعاء',
    tipReduceSalt: 'تقليل الملح',
    tipDrinkWater: 'شرب 2 لتر ماء',
    tipMedicine: 'تناول الدواء الساعة 9 صباحاً',
    tipWalk: 'المشي 15 دقيقة',
    latestReadings: 'آخر القراءات',
    sugarReading: 'السكر',
    pressureReading: 'الضغط',
    normal: 'طبيعي',
    warning: 'تحذير',
    addReading: 'إضافة قراءة جديدة',
    weeklyTip: 'نصيحة الأسبوع',
    weeklyTipText: 'الأطعمة الغنية بالألياف مثل الشوفان تساعد في استقرار السكر',
    chatPlaceholder: 'اكتب رسالتك...',
    chatTitle: 'مساعد حياه',
    footer: '© 2026 HayaCare | Developed by Eng. Ahmed Nasser khodair',
    daySat: 'السبت',
    daySun: 'الأحد',
    dayMon: 'الاثنين',
    dayTue: 'الثلاثاء',
    dayWed: 'الأربعاء',
    dayThu: 'الخميس',
    dayFri: 'الجمعة',
    normalRange: 'النطاق الطبيعي',
    tips: 'نصائح',
    send: 'إرسال',
  },
  en: {
    appName: 'HayaCare - Health Platform',
    developer: 'Developed by Eng. Ahmed Nasser khodair',
    dashboard: 'Dashboard',
    readings: 'Readings Log',
    medicalHistory: 'Medical History',
    personalizedTips: 'Personalized Tips',
    aiAssistant: 'AI Assistant',
    settings: 'Settings',
    welcome: 'Welcome, Mr. Mohammed!',
    weeklyReport: 'Your report for last week: Excellent!',
    sugar: 'Sugar',
    pressure: 'Pressure',
    aiPrediction: 'Your health next week: Stable, but...',
    aiAlert: 'We expect a slight rise in blood pressure on Wednesday',
    tipReduceSalt: 'Reduce salt',
    tipDrinkWater: 'Drink 2L water',
    tipMedicine: 'Take medicine at 9 AM',
    tipWalk: 'Walk 15 min',
    latestReadings: 'Latest Readings',
    sugarReading: 'Sugar',
    pressureReading: 'Pressure',
    normal: 'Normal',
    warning: 'Warning',
    addReading: 'Add New Reading',
    weeklyTip: 'Weekly Tip',
    weeklyTipText: 'Fiber-rich foods like oats help stabilize blood sugar',
    chatPlaceholder: 'Type your message...',
    chatTitle: 'Haya Assistant',
    footer: '© 2026 HayaCare | Developed by Eng. Ahmed Nasser khodair',
    daySat: 'Sat',
    daySun: 'Sun',
    dayMon: 'Mon',
    dayTue: 'Tue',
    dayWed: 'Wed',
    dayThu: 'Thu',
    dayFri: 'Fri',
    normalRange: 'Normal Range',
    tips: 'Tips',
    send: 'Send',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ar');

  const toggleLang = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));

  const t = (key: string) => translations[lang][key] || key;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
