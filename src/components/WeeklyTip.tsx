import { useLanguage } from '../context/LanguageContext';
import { Sparkles } from 'lucide-react';

export default function WeeklyTip() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-sm p-5 lg:p-6 text-white">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-teal-200" />
        <h2 className="text-lg font-bold">{t('weeklyTip')}</h2>
      </div>
      <p className="text-base leading-relaxed text-teal-50">{t('weeklyTipText')}</p>
    </div>
  );
}
