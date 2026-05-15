import { Activity, Plus } from 'lucide-react';
import Card from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';
import { useApp } from '../../context/AppContext';
import { latestReadings } from '../../utils/mockData';

export default function LatestReadingsCard() {
  const { tr, isRTL, setCurrentPage } = useApp();

  const readingLabel: Record<string, keyof typeof tr> = {
    bloodSugarFasting: 'bloodSugarFasting',
    bloodPressure: 'bloodPressure',
    heartRate: 'heartRate',
    oxygen: 'oxygen',
  };

  return (
    <Card className="p-5">
      {/* Header */}
      <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <h2 className="text-base font-bold text-gray-900">{tr.latestReadings}</h2>
        </div>
        <span className="text-xs text-gray-400">{isRTL ? 'اليوم، 08:05' : 'Today, 08:05'}</span>
      </div>

      {/* Readings table */}
      <div className="space-y-2.5 mb-4">
        {latestReadings.map((reading) => (
          <div
            key={reading.id}
            className={`flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50/40 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div
                className={`w-2 h-8 rounded-full flex-shrink-0 ${
                  reading.status === 'normal'
                    ? 'bg-green-400'
                    : reading.status === 'slightlyHigh'
                    ? 'bg-orange-400'
                    : 'bg-red-400'
                }`}
              />
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm font-semibold text-gray-800">
                  {tr[readingLabel[reading.type]] as string}
                </p>
                <p className="text-xs text-gray-400">{reading.time}</p>
              </div>
            </div>
            <div className={`flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-bold text-gray-900">{reading.value}</span>
              <StatusBadge status={reading.status as 'normal' | 'slightlyHigh' | 'high' | 'low'} />
            </div>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <button
        onClick={() => setCurrentPage('readings')}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <Plus className="w-4 h-4" />
        {tr.addReading}
      </button>
    </Card>
  );
}
