import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, updateLead } = useAppStore();
  const lead = leads.find(l => l.id === id);
  const [callClicked, setCallClicked] = useState(lead?.callClicked || false);

  if (!lead) return <div>Lead not found</div>;

  const handleCall = () => {
    setCallClicked(true);
    updateLead(lead.id, { callClicked: true });
    window.location.href = `tel:${lead.phone.split(',')[0]}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:bg-gray-50">
      <header className="p-4 flex items-center justify-between border-b border-gray-100 bg-white md:max-w-3xl md:mx-auto md:w-full md:mt-8 md:rounded-t-2xl md:border-x md:border-t">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </div>
        <div className="flex gap-4">
          <button><RefreshCwIcon /></button>
          <button><MenuIcon /></button>
        </div>
      </header>

      <div className="p-4 flex-1 bg-white md:max-w-3xl md:mx-auto md:w-full md:mb-8 md:rounded-b-2xl md:border-x md:border-b md:shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-md mb-1 inline-block">
              {lead.status}
            </span>
            <p className="text-[10px] text-gray-400">{lead.date}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{lead.distance} Km</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-2">
          <button onClick={handleCall} className="py-2 border border-black rounded-full text-xs font-medium">Call</button>
          <button className="py-2 border border-black rounded-full text-xs font-medium">Whatsapp</button>
          <button onClick={() => navigate(`/schedule/${lead.id}`)} className="py-2 border border-black rounded-full text-xs font-medium">Schedule Visit</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-8">
          <button onClick={() => navigate(`/quotation/${lead.id}`)} className="py-2 border border-black rounded-full text-xs font-medium">Send Quotation</button>
          <button disabled={!callClicked} className={`py-2 border rounded-full text-xs font-medium ${!callClicked ? 'border-gray-300 text-gray-400' : 'border-black text-black'}`}>Not Interested</button>
          <button className="py-2 border border-black rounded-full text-xs font-medium">Call Later</button>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">{lead.name}</h2>
            <p className="text-sm text-gray-500">{lead.industry}</p>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs text-gray-400 mb-1">Lead ID:</p>
              <p className="font-medium">{lead.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Phone Number:</p>
              <p className="font-medium">{lead.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Website:</p>
              <p className="font-medium">{lead.website}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Email ID:</p>
              <p className="font-medium">{lead.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Address Link:</p>
              <p className="font-medium text-blue-600">{lead.addressLink}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Address:</p>
              <p className="font-medium leading-relaxed">{lead.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RefreshCwIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>;
}
function MenuIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>;
}
