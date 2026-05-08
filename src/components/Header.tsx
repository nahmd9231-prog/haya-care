import { useLanguage } from '../context/LanguageContext';
import { Bell, Menu, Globe, Heart } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { t, dir, toggleLang, lang } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden lg:flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800">{t('appName')}</h1>
            <p className="text-[9px] text-gray-400">{t('developer')}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="font-medium">{lang === 'ar' ? 'EN' : 'عربي'}</span>
        </button>

        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-400 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
            م
          </div>
          <span className={`text-sm font-medium text-gray-700 hidden sm:block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {t('welcome')}
          </span>
        </div>
      </div>
    </header>
  );
}
