import WeeklyOverviewCard from "@/components/dashboard/WeeklyOverviewCard";
import AIPredictiveCard from "@/components/dashboard/AIPredictiveCard";
import LatestReadingsCard from "@/components/dashboard/LatestReadingsCard";
import WeeklyTipCard from "@/components/dashboard/WeeklyTipCard";
import { useApp } from "@/context/AppContext";

export default function Dashboard() {
  const { tr, isRTL } = useApp();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page title */}
      <div className={`mb-6 ${isRTL ? 'text-right' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{tr.dashboard}</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {isRTL ? 'نظرة عامة على صحتك' : 'Your health overview'}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: isRTL ? 'سكر الدم' : 'Blood Sugar', value: '110', unit: 'mg/dL', color: 'text-green-600', bg: 'bg-green-50', trend: '▼ 2%' },
          { label: isRTL ? 'ضغط الدم' : 'Blood Pressure', value: '130/85', unit: 'mmHg', color: 'text-orange-600', bg: 'bg-orange-50', trend: '▲ 1%' },
          { label: isRTL ? 'ضربات القلب' : 'Heart Rate', value: '74', unit: 'bpm', color: 'text-blue-600', bg: 'bg-blue-50', trend: '— 0%' },
          { label: isRTL ? 'الأكسجين' : 'Oxygen', value: '98', unit: '%', color: 'text-teal-600', bg: 'bg-teal-50', trend: '▲ 0%' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm ${isRTL ? 'text-right' : ''}`}>
            <p className="text-xs text-gray-500 font-medium mb-1.5">{stat.label}</p>
            <div className={`flex items-end gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-xs text-gray-400 mb-0.5">{stat.unit}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <WeeklyOverviewCard />
        <div className="flex flex-col gap-5">
          <AIPredictiveCard />
        </div>
        <LatestReadingsCard />
        <WeeklyTipCard />
      </div>
    </div>
  );
}
