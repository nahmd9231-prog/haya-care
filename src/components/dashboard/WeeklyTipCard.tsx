import { Lightbulb, ChevronRight, ChevronLeft } from 'lucide-react';
import Card from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { personalizedTips } from '../../utils/mockData';

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  nutrition: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
  hydration: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  exercise: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
  sleep: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-100' },
  stress: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
  medication: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100' },
};

export default function WeeklyTipCard() {
  const { tr, isRTL, lang, setCurrentPage } = useApp();

  const tip = personalizedTips[0];
  const colors = categoryColors[tip.category];

  return (
    <Card className="p-5">
      {/* Header */}
      <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-200" />
        </div>
        <h2 className="text-base font-bold text-gray-900">{tr.weeklyTip}</h2>
      </div>

      {/* Tip content */}
      <div className={`p-4 rounded-xl border ${colors.bg} ${colors.border} mb-4`}>
        <p className={`text-sm font-medium text-gray-700 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
          {lang === 'ar' ? tip.contentAr : tip.contentEn}
        </p>
      </div>

      {/* All tips preview */}
      <div className="space-y-2">
        {personalizedTips.slice(1, 4).map((t) => {
          const c = categoryColors[t.category];
          return (
            <div
              key={t.id}
              className={`flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 ${c.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <span className="text-sm">
                  {t.category === 'hydration' ? '💧' : t.category === 'exercise' ? '🏃' : '😴'}
                </span>
              </div>
              <p className={`text-xs text-gray-600 font-medium flex-1 leading-snug ${isRTL ? 'text-right' : ''}`}>
                {lang === 'ar' ? t.titleAr : t.titleEn}
              </p>
            </div>
          );
        })}
      </div>

      {/* View all */}
      <button
        onClick={() => setCurrentPage('tips')}
        className={`w-full mt-3 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        {tr.viewAll}
        {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </Card>
  );
}
