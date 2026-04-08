import { Circle } from 'lucide-react';

interface FooterProps {
  activeTab: 'leads' | 'visit' | 'clients';
  setActiveTab: (tab: 'leads' | 'visit' | 'clients') => void;
}

export default function Footer({ activeTab, setActiveTab }: FooterProps) {
  return (
    <footer className="bg-gray-100 fixed bottom-0 w-full max-w-md flex justify-around items-center py-3 border-t border-gray-200 z-10">
      <button 
        onClick={() => setActiveTab('leads')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'leads' ? 'text-black' : 'text-gray-400'}`}
      >
        <Circle className={`w-6 h-6 ${activeTab === 'leads' ? 'fill-black' : ''}`} />
        <span className="text-xs">Leads</span>
      </button>
      <button 
        onClick={() => setActiveTab('visit')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'visit' ? 'text-black' : 'text-gray-400'}`}
      >
        <Circle className={`w-6 h-6 ${activeTab === 'visit' ? 'fill-black' : ''}`} />
        <span className="text-xs">Visit</span>
      </button>
      <button 
        onClick={() => setActiveTab('clients')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'clients' ? 'text-black' : 'text-gray-400'}`}
      >
        <Circle className={`w-6 h-6 ${activeTab === 'clients' ? 'fill-black' : ''}`} />
        <span className="text-xs">Clients</span>
      </button>
    </footer>
  );
}
