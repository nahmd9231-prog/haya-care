import { useLanguage } from '../context/LanguageContext';
import { sidebarItems } from '../data/mockData';
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Lightbulb,
  Bot,
  Settings,
  Heart,
  X,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Lightbulb,
  Bot,
  Settings,
};

interface SidebarProps {
  activeItem: string;
  onItemClick: (key: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeItem, onItemClick, isOpen, onClose }: SidebarProps) {
  const { t, dir } = useLanguage();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} z-50 h-full w-72 bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen
            ? 'translate-x-0'
            : dir === 'rtl'
            ? 'translate-x-full'
            : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:shadow-none lg:border flex flex-col`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">{t('appName')}</h1>
                <p className="text-[10px] text-gray-400">{t('developer')}</p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = activeItem === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onItemClick(item.key);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                {Icon && <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />}
                <span>{t(item.key)}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-teal-50 rounded-xl p-4 text-center">
            <p className="text-xs text-teal-700 font-medium">{t('weeklyTip')}</p>
            <p className="text-[11px] text-teal-600 mt-1 leading-relaxed">{t('weeklyTipText')}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
