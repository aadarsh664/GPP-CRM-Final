import { useState } from 'react';
import { Menu, RefreshCw, Circle, Star } from 'lucide-react';
import LeadsTab from '../components/LeadsTab';
import VisitTab from '../components/VisitTab';
import ClientsTab from '../components/ClientsTab';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'visit' | 'clients'>('leads');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setToast('No new leads added yet.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r border-gray-200 bg-gray-50 h-screen sticky top-0">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3 bg-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12L10 6V18L4 12Z" fill="black"/>
            <path d="M20 12L14 6V18L20 12Z" fill="black"/>
          </svg>
          <span className="font-bold text-xl tracking-wide">GPP CRM</span>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-2 mb-8">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'leads' ? 'bg-black text-white shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
            >
              <Circle className={`w-5 h-5 ${activeTab === 'leads' ? 'fill-white' : ''}`} />
              <span className="font-medium">Leads</span>
            </button>
            <button 
              onClick={() => setActiveTab('visit')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'visit' ? 'bg-black text-white shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
            >
              <Circle className={`w-5 h-5 ${activeTab === 'visit' ? 'fill-white' : ''}`} />
              <span className="font-medium">Visit</span>
            </button>
            <button 
              onClick={() => setActiveTab('clients')}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'clients' ? 'bg-black text-white shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}
            >
              <Circle className={`w-5 h-5 ${activeTab === 'clients' ? 'fill-white' : ''}`} />
              <span className="font-medium">Clients</span>
            </button>
          </div>

          <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Profile</p>
              <Star 
                className="w-4 h-4 cursor-pointer text-gray-400 hover:text-yellow-500 transition-colors" 
                onClick={() => navigate('/unavailability')}
              />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900">Sonu Kumar Singh</h3>
                <span className="text-xs text-gray-500">Marketing Executive</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Active
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Quick Actions</p>
            <button onClick={() => navigate('/admin-stats')} className="w-full text-left p-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">Admin Stats</button>
            <button className="w-full text-left p-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">Export Data</button>
            <button onClick={() => navigate('/uninterested')} className="w-full text-left p-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">Uninterested Leads</button>
            <button onClick={() => navigate('/all-quotations')} className="w-full text-left p-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">All Quotations</button>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <button onClick={() => navigate('/login')} className="w-full text-center text-sm font-bold text-red-600 hover:bg-red-50 py-3 rounded-xl transition-colors">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-gray-100 md:bg-white p-4 md:px-8 md:py-6 flex items-center justify-between sticky top-0 z-10 md:border-b md:border-gray-100">
          <div className="flex items-center gap-2 md:hidden">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L10 6V18L4 12Z" fill="black"/>
              <path d="M20 12L14 6V18L20 12Z" fill="black"/>
            </svg>
            <span className="font-semibold">{activeTab === 'clients' ? 'Clients' : activeTab === 'visit' ? 'Visit' : 'GPP CRM'}</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <h1 className="font-bold text-2xl capitalize text-gray-900">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleRefresh} className="hover:bg-gray-200 md:hover:bg-gray-100 p-2 rounded-full transition-colors">
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-8 md:px-8 md:pt-6 bg-gray-50 md:bg-white">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'leads' && <LeadsTab />}
            {activeTab === 'visit' && <VisitTab />}
            {activeTab === 'clients' && <ClientsTab />}
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium z-50 shadow-xl">
          {toast}
        </div>
      )}

      {/* Footer Navigation (Mobile Only) */}
      <div className="md:hidden">
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Sidebar (Mobile Only) */}
      <div className="md:hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
    </div>
  );
}
