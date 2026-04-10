import { useState } from 'react';
import { useAppStore, VisitStatus } from '../store';
import { useNavigate } from 'react-router-dom';
import { MapPin, Filter } from 'lucide-react';

export default function VisitTab() {
  const { visits, leads } = useAppStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<VisitStatus>('New Visit');
  const [showSubdivisions, setShowSubdivisions] = useState(false);
  const [selectedSubdivisions, setSelectedSubdivisions] = useState<string[]>([]);

  const filteredVisits = visits.filter(v => {
    if (v.status !== filter) return false;
    if (selectedSubdivisions.length > 0 && !selectedSubdivisions.includes(v.subdivision)) return false;
    return true;
  });

  const allSubdivisions = Array.from(new Set(visits.map(v => v.subdivision)));

  const toggleSubdivision = (sub: string) => {
    setSelectedSubdivisions(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  return (
    <div className="p-4 md:p-0">
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:mb-6 scrollbar-hide">
        {(['New Visit', 'Rescheduled', 'Visit Done'] as VisitStatus[]).map(status => (
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

      <div className="flex justify-end mb-4 md:mb-6 relative">
        <button 
          onClick={() => setShowSubdivisions(!showSubdivisions)}
          className="p-2 border rounded-md hover:bg-gray-50 bg-white"
        >
          <Filter className="w-4 h-4" />
        </button>

        {showSubdivisions && (
          <div className="absolute top-10 right-0 bg-white border rounded-lg shadow-lg p-2 z-20 w-48">
            <p className="text-xs text-gray-500 mb-2 px-2">Filter by subdivisions</p>
            {allSubdivisions.map(sub => (
              <label key={sub} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                <span className="text-sm">{sub}</span>
                <input 
                  type="checkbox" 
                  checked={selectedSubdivisions.includes(sub)}
                  onChange={() => toggleSubdivision(sub)}
                  className="accent-black"
                />
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 md:space-y-0">
        {filteredVisits.map(visit => {
          const lead = leads.find(l => l.id === visit.leadId);
          if (!lead) return null;

          return (
            <div key={visit.id} className="border border-gray-200 rounded-xl p-4 bg-white">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-md mb-1 inline-block">
                    {visit.status}
                  </span>
                  <p className="text-[10px] text-gray-400">{visit.date}</p>
                </div>
                <div className="border rounded-full px-3 py-1 text-xs">
                  {visit.time}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <MapPin className="w-3 h-3" />
                  <span>{lead.distance} Km</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg">{lead.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{lead.address}</p>

              <div className="flex gap-2">
                <button 
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                  onClick={() => window.location.href = `tel:${lead.phone.split(',')[0]}`}
                >
                  Call
                </button>
                <button 
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                  onClick={() => window.open(lead.addressLink, '_blank')}
                >
                  Open Map
                </button>
                <button 
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                >
                  Visit Done
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
