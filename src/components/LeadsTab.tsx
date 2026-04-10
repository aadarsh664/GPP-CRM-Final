import { useState } from 'react';
import { useAppStore, LeadStatus } from '../store';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function LeadsTab() {
  const { leads } = useAppStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<LeadStatus | null>(null);

  const filteredLeads = filter ? leads.filter(l => l.status === filter) : leads;

  const handleFilter = (status: LeadStatus) => {
    setFilter(prev => prev === status ? null : status);
  };

  return (
    <div className="p-4 md:p-0">
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:mb-6 scrollbar-hide">
        {(['New', 'Old Client', 'Call Done', 'Call Later'] as LeadStatus[]).map(status => (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap border ${
              filter === status ? 'bg-black text-white border-black' : 'bg-white border-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 md:space-y-0">
        {filteredLeads.map(lead => (
          <div 
            key={lead.id} 
            className="border border-gray-200 rounded-xl p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/lead/${lead.id}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-md mb-1 inline-block">
                  {lead.status === 'Old Client' ? 'Old Client' : lead.status}
                </span>
                <p className="text-[10px] text-gray-400">{lead.date}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>{lead.distance} Km</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg">{lead.name}</h3>
            <p className="text-xs text-gray-500 mb-4">{lead.industry}</p>

            <div className="flex gap-2">
              <button 
                className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${lead.phone.split(',')[0]}`; }}
              >
                Call
              </button>
              <button 
                className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${lead.phone.split(',')[0].replace(/[^0-9]/g, '')}`, '_blank'); }}
              >
                Whatsapp
              </button>
              {lead.distance <= 16 && (
                <button 
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                  onClick={(e) => { e.stopPropagation(); navigate(`/schedule/${lead.id}`); }}
                >
                  Schedule Visit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
