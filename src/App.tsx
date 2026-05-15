import { AppProvider, useApp } from './context/AppContext';
import Layout from "@/components/layout/Layout";
import ChatWidget from "@/components/chat/ChatWidget";
import Dashboard from "@/components/pages/Dashboard";
import Readings from "@/components/pages/Readings";
import MedicalHistory from "@/components/pages/MedicalHistory";
import Tips from "@/components/pages/Tips";
import AIAssistant from "@/components/pages/AIAssistant";
import Settings from "@/components/pages/Settings";

function AppContent() {
  const { currentPage } = useApp();

  const pages = {
    dashboard: <Dashboard />,
    readings: <Readings />,
    medicalHistory: <MedicalHistory />,
    tips: <Tips />,
    aiAssistant: <AIAssistant />,
    settings: <Settings />,
  };

  return (
    <Layout>
      {pages[currentPage]}
      <ChatWidget />
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
