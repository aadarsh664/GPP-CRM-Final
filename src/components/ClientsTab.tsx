import { useState } from 'react';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

export default function ClientsTab() {
  const { clients, leads } = useAppStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'New Clients' | '<5 Days' | '<9Days'>('New Clients');

  return (
    <div className="p-4 md:p-0">
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:mb-6 scrollbar-hide">
        {(['New Clients', '<5 Days', '<9Days'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap border ${
              filter === status ? 'bg-black text-white border-black' : 'bg-white border-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 md:space-y-0">
        {clients.map(client => {
          const lead = leads.find(l => l.id === client.leadId);
          if (!lead) return null;

          return (
            <div key={client.id} className="border border-gray-200 rounded-xl p-4 bg-white">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>2 Days Ago</span>
                </div>
                <div className="border rounded-md px-2 py-0.5 text-[10px] font-medium bg-gray-50">
                  {client.status}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <MapPin className="w-3 h-3" />
                  <span>{lead.distance} Km</span>
                </div>
              </div>
              <div className="text-[10px] text-gray-400 mb-2">{client.confirmationDate}</div>
              
              <h3 className="font-semibold text-lg">{lead.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{lead.address}</p>

              <div className="flex gap-2">
                <button className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                  Call
                </button>
                <button className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                  Whatsapp
                </button>
                <button className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                  Order Received
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
