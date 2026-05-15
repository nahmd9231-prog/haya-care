import { createContext, useContext, useState, ReactNode } from 'react';
import { Lang, t } from '../utils/translations';
import { notifications as initialNotifications } from '../utils/mockData';

type Page = 'dashboard' | 'readings' | 'medicalHistory' | 'tips' | 'aiAssistant' | 'settings';

interface Notification {
  id: number;
  type: string;
  titleAr: string;
  titleEn: string;
  time: string;
  read: boolean;
}

interface AppContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: typeof t['ar'];
  isRTL: boolean;
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const isRTL = lang === 'ar';
  const tr = t[lang];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        tr,
        isRTL,
        currentPage,
        setCurrentPage,
        sidebarOpen,
        setSidebarOpen,
        notifications,
        unreadCount,
        markAllRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
