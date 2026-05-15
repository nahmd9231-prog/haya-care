import { useState } from 'react';
import { Bell, Menu, Heart, X, CheckCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const { tr, isRTL, lang, setLang, setSidebarOpen, notifications, unreadCount, markAllRead } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);

  const toggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar');

  return (
    <header
      className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Left side (RTL: logo + app name) */}
      <div className={`flex items-center gap-3 ${isRTL ? 'order-last' : 'order-first'}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-gray-900 text-sm leading-tight">HayaCare</p>
            <p className="text-xs text-blue-500">منصة حياه</p>
          </div>
        </div>
      </div>

      {/* Right side: profile + notifications + lang toggle + hamburger */}
      <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'order-first' : 'order-last'}`}>
        {/* Welcome + avatar */}
        <div className={`hidden md:flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <p className="text-sm font-semibold text-gray-800">{tr.welcome}</p>
            <p className="text-xs text-gray-400">{isRTL ? 'السبت، 2 مايو 2026' : 'Sat, May 2, 2026'}</p>
          </div>
          <img
            src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=80"
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-blue-100 shadow-sm"
          />
        </div>

        <div className="w-px h-6 bg-gray-200 hidden md:block" />

        {/* Language toggle */}
        <button
          onClick={toggleLang}
          className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
        >
          {tr.language}
        </button>

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div
              className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden`}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-800 text-sm">{tr.notifications}</span>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button onClick={() => setNotifOpen(false)}>
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 text-sm transition-colors ${
                      n.read ? 'bg-white' : 'bg-blue-50/50'
                    }`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <span
                      className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                        n.type === 'warning'
                          ? 'bg-orange-400'
                          : n.type === 'reminder'
                          ? 'bg-blue-400'
                          : 'bg-green-400'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-gray-800 leading-snug ${isRTL ? 'text-right' : ''}`}>
                        {isRTL ? n.titleAr : n.titleEn}
                      </p>
                      <p className={`text-xs text-gray-400 mt-0.5 ${isRTL ? 'text-right' : ''}`}>{n.time}</p>
                    </div>
                    {!n.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
