import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { weeklyBloodSugar, weeklyBloodPressure } from '../../utils/mockData';

const DAYS_AR = ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];
const DAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WeeklyOverviewCard() {
  const { tr, isRTL, lang } = useApp();

  const days = lang === 'ar' ? DAYS_AR : DAYS_EN;

  const sugarData = weeklyBloodSugar.map((d, i) => ({
    day: days[i],
    [isRTL ? 'سكر الدم' : 'Blood Sugar']: d.value,
  }));

  const bpData = weeklyBloodPressure.map((d, i) => ({
    day: days[i],
    [isRTL ? 'الانقباضي' : 'Systolic']: d.systolic,
    [isRTL ? 'الانبساطي' : 'Diastolic']: d.diastolic,
  }));

  const sugarKey = isRTL ? 'سكر الدم' : 'Blood Sugar';
  const systolicKey = isRTL ? 'الانقباضي' : 'Systolic';
  const diastolicKey = isRTL ? 'الانبساطي' : 'Diastolic';

  return (
    <Card className="p-5">
      {/* Header */}
      <div className={`flex items-start justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-xs font-semibold text-green-500 bg-green-50 px-2.5 py-0.5 rounded-full">
              {isRTL ? 'ممتاز' : 'Excellent'}
            </span>
          </div>
          <h2 className="text-base font-bold text-gray-900 leading-tight">{tr.weeklyReport}</h2>
        </div>
      </div>

      {/* Blood Sugar Chart */}
      <div className="mb-5">
        <p className={`text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide ${isRTL ? 'text-right' : ''}`}>
          {tr.bloodSugarChart}
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={sugarData} margin={{ top: 5, right: 10, left: isRTL ? 10 : -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              reversed={isRTL}
            />
            <YAxis
              domain={[60, 160]}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              orientation={isRTL ? 'right' : 'left'}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
            />
            <ReferenceLine y={130} stroke="#22c55e" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: tr.normalRange, fill: '#22c55e', fontSize: 10, position: isRTL ? 'insideBottomLeft' : 'insideBottomRight' }} />
            <Line
              type="monotone"
              dataKey={sugarKey}
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Blood Pressure Chart */}
      <div>
        <p className={`text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide ${isRTL ? 'text-right' : ''}`}>
          {tr.bloodPressureChart}
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={bpData} margin={{ top: 5, right: 10, left: isRTL ? 10 : -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              reversed={isRTL}
            />
            <YAxis
              domain={[60, 160]}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              orientation={isRTL ? 'right' : 'left'}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <ReferenceLine y={120} stroke="#22c55e" strokeDasharray="4 4" strokeWidth={1.5} />
            <Line type="monotone" dataKey={systolicKey} stroke="#f97316" strokeWidth={2.5} dot={{ r: 4, fill: '#f97316', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            <Line type="monotone" dataKey={diastolicKey} stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
