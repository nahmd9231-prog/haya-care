import { useLanguage } from '../context/LanguageContext';
import { latestReadings } from '../data/mockData';
import { Activity, Plus } from 'lucide-react';

export default function LatestReadings() {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
          <Activity className="w-4 h-4 text-teal-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-800">{t('latestReadings')}</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-5 py-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('sugarReading')}</p>
            <p className="text-2xl font-bold text-gray-800 mt-0.5">
              {latestReadings.sugar.value}
              <span className="text-sm font-normal text-gray-400 ml-1">{latestReadings.sugar.unit}</span>
            </p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            {t('normal')}
          </span>
        </div>

        <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-5 py-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('pressureReading')}</p>
            <p className="text-2xl font-bold text-gray-800 mt-0.5">
              {latestReadings.pressure.value}
              <span className="text-sm font-normal text-gray-400 ml-1">mmHg</span>
            </p>
          </div>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            {t('warning')}
          </span>
        </div>
      </div>

      <button className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl py-3 text-base font-semibold transition-colors shadow-sm">
        <Plus className="w-5 h-5" />
        {t('addReading')}
      </button>
    </div>
  );
}
