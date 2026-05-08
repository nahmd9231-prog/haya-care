import { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';

function AppLayout() {
  const { dir } = useLanguage();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div dir={dir} className="min-h-screen bg-gray-50 flex" style={{ fontFamily: dir === 'rtl' ? "'Segoe UI', Tahoma, 'Arial', sans-serif" : "'Inter', 'Segoe UI', sans-serif" }}>
      <Sidebar
        activeItem={activeItem}
        onItemClick={setActiveItem}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-6">
          <Dashboard />
        </main>

        <Footer />
      </div>

      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppLayout />
    </LanguageProvider>
  );
}

export default App;
