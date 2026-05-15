import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useApp } from '../../context/AppContext';

export default function Layout({ children }: { children: ReactNode }) {
  const { isRTL } = useApp();

  return (
    <div
      className={`min-h-screen bg-gray-50 flex ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
