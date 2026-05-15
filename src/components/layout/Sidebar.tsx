import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  Lightbulb,
  MessageSquare,
  Settings,
  X,
  Heart,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

type NavItem = {
  key: 'dashboard' | 'readings' | 'medicalHistory' | 'tips' | 'aiAssistant' | 'settings';
  icon: React.ElementType;
  labelKey: keyof ReturnType<typeof useApp>['tr'];
};

const navItems: NavItem[] = [
  { key: 'dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { key: 'readings', icon: ClipboardList, labelKey: 'readings' },
  { key: 'medicalHistory', icon: BookOpen, labelKey: 'medicalHistory' },
  { key: 'tips', icon: Lightbulb, labelKey: 'tips' },
  { key: 'aiAssistant', icon: MessageSquare, labelKey: 'aiAssistant' },
  { key: 'settings', icon: Settings, labelKey: 'settings' },
];

export default function Sidebar() {
  const { tr, currentPage, setCurrentPage, isRTL, sidebarOpen, setSidebarOpen } = useApp();

  const handleNav = (key: NavItem['key']) => {
    setCurrentPage(key);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 h-full w-64 bg-white shadow-2xl z-40 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isRTL ? 'right-0' : 'left-0'}
          ${sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:shadow-none lg:border-s border-gray-100
        `}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">HayaCare</p>
              <p className="text-xs text-blue-500 font-medium">منصة حياه</p>
            </div>
          </div>
          <button
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map(({ key, icon: Icon, labelKey }) => {
              const active = currentPage === key;
              return (
                <li key={key}>
                  <button
                    onClick={() => handleNav(key)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                      ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}
                      ${
                        active
                          ? 'bg-blue-50 text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${
                        active ? 'text-blue-500' : 'text-gray-400'
                      }`}
                    />
                    <span>{tr[labelKey] as string}</span>
                    {active && (
                      <span
                        className={`ms-auto w-1.5 h-1.5 rounded-full bg-blue-500`}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom profile snippet */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div
            className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <img
              src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=80"
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border-2 border-blue-100"
            />
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {isRTL ? 'أ. ناصر خضير' : 'Prof. Nasser'}
              </p>
              <p className="text-xs text-green-500 font-medium">
                {isRTL ? 'بصحة جيدة' : 'Good Health'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
