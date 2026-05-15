import { Brain, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';
import { useApp } from '../../context/AppContext';

const recommendations = [
  { icon: '🧂', labelKey: 'rec1' as const },
  { icon: '💧', labelKey: 'rec2' as const },
  { icon: '💊', labelKey: 'rec3' as const },
  { icon: '🚶', labelKey: 'rec4' as const },
];

export default function AIPredictiveCard() {
  const { tr, isRTL } = useApp();

  return (
    <Card className="p-5">
      {/* Header */}
      <div className={`flex items-start gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <Brain className="w-5 h-5 text-blue-500" />
        </div>
        <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
          <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              {tr.predictionBadge}
            </span>
          </div>
          <h2 className="text-base font-bold text-gray-900 leading-snug">{tr.nextWeekHealth}</h2>
        </div>
      </div>

      {/* Alert banner */}
      <div className={`flex items-start gap-3 p-3.5 bg-orange-50 rounded-xl border border-orange-100 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
        <p className={`text-sm text-orange-700 font-medium leading-snug ${isRTL ? 'text-right' : ''}`}>
          {tr.aiAlert}
        </p>
      </div>

      {/* Recommendations */}
      <div>
        <p className={`text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 ${isRTL ? 'text-right' : ''}`}>
          {tr.recommendations}
        </p>
        <ul className="space-y-2">
          {recommendations.map((rec, i) => (
            <li
              key={i}
              className={`flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50/50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className={`text-sm text-gray-700 font-medium leading-snug ${isRTL ? 'text-right' : ''}`}>
                {tr[rec.labelKey]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
