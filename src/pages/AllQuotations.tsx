import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AllQuotations() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">All Quotations</span>
        </div>
        <div className="flex gap-4">
          <button><Menu className="w-6 h-6" /></button>
        </div>
      </header>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex gap-2 mb-6">
          <button className="flex-1 py-1.5 border border-black bg-black text-white rounded-full text-xs">All Time</button>
          <button className="flex-1 py-1.5 border border-gray-300 rounded-full text-xs">Today</button>
          <button className="flex-1 py-1.5 border border-gray-300 rounded-full text-xs flex items-center justify-center gap-1">
            Custom Date
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-gray-200 rounded-xl p-4 bg-white">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-gray-400">05-02-2026</span>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px]">3</span>
                  <span>Items</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg">Company Name</h3>
              <p className="text-xs text-gray-500 mb-4">Business Industry</p>

              <div className="flex gap-2">
                <button className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                  View PDF
                </button>
                <button className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                  Call
                </button>
                <button className="flex-1 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">
                  Whatsapp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
