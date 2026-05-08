import { useLanguage } from '../context/LanguageContext';
import { weeklyData } from '../data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function WeeklyOverview() {
  const { t } = useLanguage();

  const data = weeklyData.map((d) => ({
    day: t(d.day),
    sugar: d.sugar,
    pressure: d.pressure,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-teal-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-800">{t('weeklyReport')}</h2>
      </div>

      <div className="h-64 lg:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 13, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 13, fill: '#6b7280' }} domain={[60, 160]} />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontSize: '14px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
            <ReferenceLine y={100} stroke="#22c55e" strokeDasharray="6 3" strokeWidth={1.5} label={{ value: t('normalRange'), fill: '#22c55e', fontSize: 11 }} />
            <ReferenceLine y={140} stroke="#22c55e" strokeDasharray="6 3" strokeWidth={1.5} />
            <Line
              type="monotone"
              dataKey="sugar"
              stroke="#0d9488"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#0d9488', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
              name={t('sugar')}
            />
            <Line
              type="monotone"
              dataKey="pressure"
              stroke="#f97316"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
              name={t('pressure')}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
