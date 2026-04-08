import { useState } from 'react';
import { Menu, RefreshCw } from 'lucide-react';
import LeadsTab from '../components/LeadsTab';
import VisitTab from '../components/VisitTab';
import ClientsTab from '../components/ClientsTab';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'visit' | 'clients'>('leads');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleRefresh = () => {
    setToast('No new leads added yet.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Header */}
      <header className="bg-gray-100 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12L10 6V18L4 12Z" fill="black"/>
            <path d="M20 12L14 6V18L20 12Z" fill="black"/>
          </svg>
          <span className="font-semibold">{activeTab === 'clients' ? 'Clients' : activeTab === 'visit' ? 'Visit' : 'GPP CRM'}</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleRefresh}>
            <RefreshCw className="w-5 h-5" />
          </button>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'leads' && <LeadsTab />}
        {activeTab === 'visit' && <VisitTab />}
        {activeTab === 'clients' && <ClientsTab />}
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm z-20 shadow-lg">
          {toast}
        </div>
      )}

      {/* Footer Navigation */}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
