import { ArrowLeft, Menu, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UninterestedLeads() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col md:bg-gray-50">
      <header className="p-4 flex items-center justify-between border-b border-gray-100 bg-white md:max-w-4xl md:mx-auto md:w-full md:mt-8 md:rounded-t-2xl md:border-x md:border-t">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Uninterested Leads</span>
        </div>
        <div className="flex gap-4">
          <button><Menu className="w-6 h-6" /></button>
        </div>
      </header>

      <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-white md:max-w-4xl md:mx-auto md:w-full md:mb-8 md:rounded-b-2xl md:border-x md:border-b md:shadow-sm md:grid md:grid-cols-2 md:gap-6 md:space-y-0 md:p-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border border-gray-200 rounded-xl p-4 bg-white">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[10px] text-gray-400">05-02-2026</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>14.2 Km</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg">Company Name</h3>
            <p className="text-xs text-gray-500 mb-4">Business Industry</p>

            <div className="flex gap-2">
              <button className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                Call
              </button>
              <button className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                Whatsapp
              </button>
              <button className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                Move to Leads
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
