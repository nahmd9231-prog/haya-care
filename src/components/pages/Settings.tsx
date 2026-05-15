import { useState } from 'react';
import { User, Bell, Palette, Save, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Card from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

export default function Settings() {
  const { tr, isRTL, lang, setLang } = useApp();
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(lang === 'ar' ? 'ناصر عبدالشافي خضير' : 'Nasser Abd-Elshafi Khodair');
  const [age, setAge] = useState('53');
  const [phone, setPhone] = useState('+966 50 123 4567');
  const [remindMed, setRemindMed] = useState(true);
  const [remindMeasure, setRemindMeasure] = useState(true);
  const [fontSize, setFontSize] = useState<'large' | 'medium' | 'small'>('large');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="max-w-2xl mx-auto space-y-5" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={isRTL ? 'text-right' : ''}>
        <h1 className="text-2xl font-bold text-gray-900">{tr.settingsTitle}</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {isRTL ? 'إدارة حسابك وتفضيلاتك' : 'Manage your account and preferences'}
        </p>
      </div>

      {/* Profile */}
      <Card className="p-5">
        <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <User className="w-4 h-4 text-blue-500" />
          </div>
          <h2 className="text-base font-bold text-gray-900">{tr.profile}</h2>
        </div>

        <div className={`flex items-center gap-4 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <img
            src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Profile"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-100 shadow-sm"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{isRTL ? 'صورة الملف الشخصي' : 'Profile Photo'}</p>
            <button className="text-xs text-blue-500 hover:text-blue-700 mt-1 font-medium">
              {isRTL ? 'تغيير الصورة' : 'Change photo'}
            </button>
          </div>
        </div>

        <div className="space-y-3.5">
          {[
            { label: tr.name, value: name, setter: setName, type: 'text' },
            { label: tr.age, value: age, setter: setAge, type: 'number' },
            { label: tr.phone, value: phone, setter: setPhone, type: 'tel' },
          ].map(({ label, value, setter, type }) => (
            <div key={label}>
              <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${isRTL ? 'text-right' : ''}`}>{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className={`w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${isRTL ? 'text-right' : ''}`}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Reminders */}
      <Card className="p-5">
        <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
            <Bell className="w-4 h-4 text-orange-500" />
          </div>
          <h2 className="text-base font-bold text-gray-900">{tr.reminders}</h2>
        </div>

        <div className="space-y-3">
          {[
            { label: tr.reminderMed, value: remindMed, setter: setRemindMed },
            { label: tr.reminderMeasure, value: remindMeasure, setter: setRemindMeasure },
          ].map(({ label, value, setter }) => (
            <div key={label} className={`flex items-center justify-between p-3.5 bg-gray-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-medium text-gray-700">{label}</span>
              <button
                onClick={() => setter(!value)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-blue-500' : 'bg-gray-300'}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${value ? (isRTL ? 'translate-x-0 right-0.5' : 'translate-x-5') : (isRTL ? 'translate-x-5 right-0.5' : 'translate-x-0.5')}`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-5">
        <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center">
            <Palette className="w-4 h-4 text-teal-500" />
          </div>
          <h2 className="text-base font-bold text-gray-900">{tr.appearance}</h2>
        </div>

        {/* Language */}
        <div className={`flex items-center justify-between p-3.5 bg-gray-50 rounded-xl mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm font-medium text-gray-700">
            {isRTL ? 'اللغة' : 'Language'}
          </span>
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-100"
          >
            {tr.language}
            <Chevron className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Font size */}
        <div className={`${isRTL ? 'text-right' : ''}`}>
          <p className="text-sm font-medium text-gray-700 mb-2">{tr.fontSize}</p>
          <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {(['large', 'medium', 'small'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-colors border ${
                  fontSize === size
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tr[size]}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Save button */}
      <button
        onClick={handleSave}
        className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md active:scale-98 ${
          saved
            ? 'bg-green-500 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        } ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
        {saved ? (isRTL ? 'تم الحفظ!' : 'Saved!') : tr.save}
      </button>
    </div>
  );
}
