import { Lightbulb, Salad, Droplets, Activity, Moon, Heart, Pill } from 'lucide-react';
import Card from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { personalizedTips } from "@/utils/mockData";

const iconMap: Record<string, React.ElementType> = {
  Salad, Droplets, Activity, Moon, Heart, Pill,
};

const priorityStyle: Record<string, { bg: string; text: string; label: string; labelEn: string }> = {
  high: { bg: 'bg-orange-50 border-orange-100', text: 'text-orange-600', label: 'أولوية عالية', labelEn: 'High Priority' },
  medium: { bg: 'bg-blue-50 border-blue-100', text: 'text-blue-600', label: 'أولوية متوسطة', labelEn: 'Medium Priority' },
  low: { bg: 'bg-gray-50 border-gray-100', text: 'text-gray-600', label: 'أولوية منخفضة', labelEn: 'Low Priority' },
};

const categoryColors: Record<string, { icon: string; bg: string }> = {
  nutrition: { icon: 'text-green-500', bg: 'bg-green-50' },
  hydration: { icon: 'text-blue-500', bg: 'bg-blue-50' },
  exercise: { icon: 'text-orange-500', bg: 'bg-orange-50' },
  sleep: { icon: 'text-sky-500', bg: 'bg-sky-50' },
  stress: { icon: 'text-rose-500', bg: 'bg-rose-50' },
  medication: { icon: 'text-teal-500', bg: 'bg-teal-50' },
};

export default function Tips() {
  const { isRTL, lang } = useApp();

  const high = personalizedTips.filter((t) => t.priority === 'high');
  const rest = personalizedTips.filter((t) => t.priority !== 'high');

  const renderTip = (tip: typeof personalizedTips[0]) => {
    const Icon = iconMap[tip.icon] ?? Lightbulb;
    const pStyle = priorityStyle[tip.priority];
    const cStyle = categoryColors[tip.category];

    return (
      <div
        key={tip.id}
        className={`p-4 rounded-2xl border ${pStyle.bg} hover:shadow-sm transition-all duration-200 cursor-default`}
      >
        <div className={`flex items-start gap-3.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`w-10 h-10 ${cStyle.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${cStyle.icon}`} />
          </div>
          <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
            <div className={`flex items-center gap-2 mb-1.5 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h3 className="text-sm font-bold text-gray-900">
                {lang === 'ar' ? tip.titleAr : tip.titleEn}
              </h3>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pStyle.bg} ${pStyle.text} border`}>
                {lang === 'ar' ? pStyle.label : pStyle.labelEn}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {lang === 'ar' ? tip.contentAr : tip.contentEn}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className={isRTL ? 'text-right' : ''}>
        <h1 className="text-2xl font-bold text-gray-900">
          {isRTL ? 'نصائح مخصصة لك' : 'Personalized Tips for You'}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {isRTL ? 'توصيات مبنية على حالتك الصحية' : 'Recommendations based on your health condition'}
        </p>
      </div>

      {/* Weekly highlighted tip */}
      <Card className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 border-0">
        <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white fill-white/30" />
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <p className="text-xs font-bold text-white/70 uppercase tracking-wide mb-1">
              {isRTL ? 'نصيحة الأسبوع' : 'Tip of the Week'}
            </p>
            <p className="text-base font-semibold text-white leading-relaxed">
              {lang === 'ar' ? personalizedTips[0].contentAr : personalizedTips[0].contentEn}
            </p>
          </div>
        </div>
      </Card>

      {/* High priority */}
      <div>
        <h2 className={`text-sm font-bold text-orange-600 uppercase tracking-wide mb-3 ${isRTL ? 'text-right' : ''}`}>
          {isRTL ? 'توصيات عاجلة' : 'Urgent Recommendations'}
        </h2>
        <div className="space-y-3">{high.map(renderTip)}</div>
      </div>

      {/* Other tips */}
      <div>
        <h2 className={`text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 ${isRTL ? 'text-right' : ''}`}>
          {isRTL ? 'نصائح عامة' : 'General Tips'}
        </h2>
        <div className="space-y-3">{rest.map(renderTip)}</div>
      </div>
    </div>
  );
}
