import { useLanguage } from '../context/LanguageContext';
import { Brain, AlertTriangle, Droplets, Pill, Footprints, CircleOff } from 'lucide-react';

export default function AIPrediction() {
  const { t } = useLanguage();

  const tips = [
    { icon: CircleOff, text: t('tipReduceSalt'), color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: Droplets, text: t('tipDrinkWater'), color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Pill, text: t('tipMedicine'), color: 'text-teal-500', bg: 'bg-teal-50' },
    { icon: Footprints, text: t('tipWalk'), color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
          <Brain className="w-4 h-4 text-violet-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-800">{t('aiPrediction')}</h2>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-800 leading-relaxed">{t('aiAlert')}</p>
      </div>

      <h3 className="text-sm font-semibold text-gray-600 mb-3">{t('tips')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 ${tip.bg} rounded-xl px-4 py-3 transition-transform hover:scale-[1.02]`}
            >
              <Icon className={`w-4 h-4 ${tip.color} shrink-0`} />
              <span className="text-sm font-medium text-gray-700">{tip.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
