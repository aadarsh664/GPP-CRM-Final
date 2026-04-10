import { useState } from 'react';
import { useAppStore, VisitStatus } from '../store';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisitTab() {
  const { visits, leads, selectedSubdivisions } = useAppStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<VisitStatus>('New Visit');
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);

  const filteredVisits = visits.filter(v => {
    if (v.status !== filter) return false;
    if (selectedSubdivisions.length > 0 && !selectedSubdivisions.includes(v.subdivision)) return false;
    return true;
  });

  const handleVisitDone = (visitId: string) => {
    setSelectedVisitId(visitId);
    setShowOutcomeModal(true);
  };

  const handleOutcome = (outcome: 'Failed' | 'Confirm') => {
    // Here you would typically update the store based on the outcome
    console.log(`Visit ${selectedVisitId} outcome: ${outcome}`);
    setShowOutcomeModal(false);
    setSelectedVisitId(null);
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

              <div className="grid grid-cols-3 gap-2 mb-2">
                <button 
                  className="py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                  onClick={() => window.location.href = `tel:${lead.phone.split(',')[0]}`}
                >
                  Call
                </button>
                <button 
                  className="py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                  onClick={() => window.open(lead.addressLink, '_blank')}
                >
                  Open Map
                </button>
                <button 
                  className="py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                  onClick={() => handleVisitDone(visit.id)}
                >
                  Visit Done
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className="py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                  onClick={() => navigate(`/quotation/${lead.id}`)}
                >
                  Send Quotation
                </button>
                <button 
                  className="py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50"
                  onClick={() => navigate(`/schedule/${lead.id}`)}
                >
                  Reschedule
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visit Done Modal */}
      <AnimatePresence>
        {showOutcomeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowOutcomeModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
              className="fixed top-1/2 left-1/2 w-[90%] max-w-sm bg-white rounded-2xl p-6 z-50 shadow-xl"
            >
              <h3 className="text-center text-lg font-medium mb-6">Select the deal is:</h3>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleOutcome('Failed')}
                  className="flex-1 py-3 border-2 border-black rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Failed
                </button>
                <button 
                  onClick={() => handleOutcome('Confirm')}
                  className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
