import { useState } from 'react';
import { Plus, Filter, Calendar, Activity } from 'lucide-react';
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import { useApp } from "@/context/AppContext";
import { readingsHistory } from "@/utils/mockData";

interface NewReading {
  type: string;
  value: string;
  unit: string;
  note: string;
}

const readingTypes = [
  { key: 'bloodSugarFasting', unitAr: 'ملغ/دل', unitEn: 'mg/dL' },
  { key: 'bloodPressure', unitAr: 'مم زئبق', unitEn: 'mmHg' },
  { key: 'heartRate', unitAr: 'نبضة/دقيقة', unitEn: 'bpm' },
  { key: 'oxygen', unitAr: '%', unitEn: '%' },
];

export default function Readings() {
  const { tr, isRTL, lang } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [readings, setReadings] = useState(readingsHistory);
  const [form, setForm] = useState<NewReading>({ type: 'bloodSugarFasting', value: '', unit: 'mg/dL', note: '' });
  const [filterType, setFilterType] = useState('all');

  const typeLabel: Record<string, keyof typeof tr> = {
    bloodSugarFasting: 'bloodSugarFasting',
    bloodPressure: 'bloodPressure',
    heartRate: 'heartRate',
    oxygen: 'oxygen',
  };

  const handleSubmit = () => {
    if (!form.value.trim()) return;
    const today = new Date().toISOString().split('T')[0];
    setReadings([
      { id: Date.now(), date: today, type: form.type, value: `${form.value} ${form.unit}`, status: 'normal' },
      ...readings,
    ]);
    setForm({ type: 'bloodSugarFasting', value: '', unit: 'mg/dL', note: '' });
    setShowForm(false);
  };

  const filtered = filterType === 'all' ? readings : readings.filter((r) => r.type === filterType);

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className="text-2xl font-bold text-gray-900">{tr.readingsHistory}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{isRTL ? `${readings.length} قراءة مسجلة` : `${readings.length} readings recorded`}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className={`flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Plus className="w-4 h-4" />
          {tr.addReading}
        </button>
      </div>

      {/* Add reading modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <Card className="w-full max-w-md p-6" >
            <h2 className={`text-lg font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : ''}`}>{tr.addReading}</h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${isRTL ? 'text-right' : ''}`}>{tr.type}</label>
                <select
                  value={form.type}
                  onChange={(e) => {
                    const t = readingTypes.find((r) => r.key === e.target.value);
                    setForm({ ...form, type: e.target.value, unit: lang === 'ar' ? t?.unitAr ?? '' : t?.unitEn ?? '' });
                  }}
                  className={`w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${isRTL ? 'text-right' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {readingTypes.map((t) => (
                    <option key={t.key} value={t.key}>
                      {tr[typeLabel[t.key]] as string}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${isRTL ? 'text-right' : ''}`}>{tr.value}</label>
                <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <input
                    type="text"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                    className={`flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${isRTL ? 'text-right' : ''}`}
                    placeholder={isRTL ? 'أدخل القيمة' : 'Enter value'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <span className="px-3 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-500 font-medium">{form.unit}</span>
                </div>
              </div>
              <div className={`flex gap-3 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  {tr.save}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
                >
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Filter tabs */}
      <div className={`flex gap-2 mb-4 overflow-x-auto pb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {['all', ...readingTypes.map((r) => r.key)].map((f) => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`flex-shrink-0 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              filterType === f
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {f === 'all' ? (isRTL ? 'الكل' : 'All') : (tr[typeLabel[f]] as string)}
          </button>
        ))}
      </div>

      <Card>
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Activity className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">{tr.noReadings}</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((reading) => (
              <div
                key={reading.id}
                className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50/60 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Activity className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-sm font-semibold text-gray-800">
                      {tr[typeLabel[reading.type]] as string}
                    </p>
                    <div className={`flex items-center gap-1.5 text-xs text-gray-400 mt-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="w-3 h-3" />
                      {reading.date}
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-bold text-gray-900">{reading.value}</span>
                  <StatusBadge status={reading.status as 'normal' | 'slightlyHigh' | 'high' | 'low'} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Filter info */}
      <div className={`flex items-center gap-2 mt-4 text-xs text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Filter className="w-3.5 h-3.5" />
        <span>{isRTL ? `عرض ${filtered.length} قراءة` : `Showing ${filtered.length} readings`}</span>
      </div>
    </div>
  );
}
