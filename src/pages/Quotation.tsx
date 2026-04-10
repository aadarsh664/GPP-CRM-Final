import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { ArrowLeft, Search, Filter, Check } from 'lucide-react';
import { useState } from 'react';

const products = [
  { id: 1, name: 'Classic VS - S', category: 'Visiting Cards' },
  { id: 2, name: 'Classic VS - B', category: 'Visiting Cards' },
  { id: 3, name: 'Standard VS - B', category: 'Visiting Cards' },
  { id: 4, name: 'Premium VS - B', category: 'Visiting Cards' },
  { id: 5, name: 'Normal VS - B', category: 'Visiting Cards' },
  { id: 6, name: 'PVC VS - B', category: 'Visiting Cards' },
];

export default function Quotation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads } = useAppStore();
  const lead = leads.find(l => l.id === id);
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [step, setStep] = useState(1);

  if (!lead) return <div>Lead not found</div>;

  const toggleItem = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) ? prev.filter(i => i !== itemId) : [...prev, itemId]
    );
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-white flex flex-col md:bg-gray-50">
        <header className="p-4 flex items-center justify-between border-b border-gray-100 bg-white md:max-w-3xl md:mx-auto md:w-full md:mt-8 md:rounded-t-2xl md:border-x md:border-t">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setStep(1)}>
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </div>
          <button className="text-sm font-medium flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Save as PDF
          </button>
        </header>

        <div className="p-4 flex-1 overflow-y-auto bg-gray-50 md:max-w-3xl md:mx-auto md:w-full md:border-x">
          <div className="bg-white border border-gray-200 p-4 text-[10px]">
            <h2 className="text-center font-bold text-sm mb-4 border-b pb-2">Quotation</h2>
            
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-bold">GURU PRINTING</h3>
                <h3 className="font-bold">PRESS'S LOGO</h3>
              </div>
              <div className="text-right">
                <p>Phone: </p>
                <p>Email: </p>
                <p>Website: </p>
                <p>Address: </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-bold">{lead.name}</p>
              <p>{lead.address}</p>
            </div>

            <table className="w-full border-collapse border border-gray-300 mb-8">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-1 text-left">Sl.</th>
                  <th className="border border-gray-300 p-1 text-left">Particulars</th>
                  <th className="border border-gray-300 p-1 text-right">Qty</th>
                  <th className="border border-gray-300 p-1 text-right">Rate</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((itemId, idx) => {
                  const item = products.find(p => p.id === itemId);
                  return (
                    <tr key={itemId}>
                      <td className="border border-gray-300 p-1 align-top">{idx + 1}.</td>
                      <td className="border border-gray-300 p-1 align-top">
                        <p className="font-medium text-[8px] text-gray-500 mb-1">VISITING CARD</p>
                        <p>{item?.name}</p>
                      </td>
                      <td className="border border-gray-300 p-1 text-right align-top">
                        <p>100-500 Pc</p>
                        <p>501-1000 Pc</p>
                        <p>1001-2000+ Pc</p>
                      </td>
                      <td className="border border-gray-300 p-1 text-right align-top">
                        <p>₹3.00</p>
                        <p>₹2.00</p>
                        <p>₹1.00</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-between mt-12">
              <div>
                <p className="font-bold mb-1">Terms & Conditions</p>
                <p>• GST charge will be extra.</p>
              </div>
              <div className="text-right flex flex-col justify-end">
                <p className="border-t border-black pt-1">Authorised Stamp</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex gap-4 bg-white border-t border-gray-100 md:max-w-3xl md:mx-auto md:w-full md:mb-8 md:rounded-b-2xl md:border-x md:border-b md:shadow-sm">
          <button 
            className="flex-1 py-3 border border-black rounded-xl font-medium"
            onClick={() => setStep(1)}
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-3 bg-black text-white rounded-xl font-medium"
            onClick={() => navigate('/dashboard')}
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:bg-gray-50">
      <header className="p-4 flex items-center justify-between border-b border-gray-100 bg-white md:max-w-3xl md:mx-auto md:w-full md:mt-8 md:rounded-t-2xl md:border-x md:border-t">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="w-5 h-5 inline-flex items-center justify-center border rounded-full mr-1 text-xs">{selectedItems.length}</span>
          Items Selected
        </div>
      </header>

      <div className="p-4 flex-1 overflow-y-auto bg-white md:max-w-3xl md:mx-auto md:w-full md:border-x">
        <div className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Products" 
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm outline-none focus:border-black"
            />
          </div>
          <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {products.map(product => (
            <div 
              key={product.id}
              onClick={() => toggleItem(product.id)}
              className={`border rounded-xl p-3 flex justify-between items-center cursor-pointer ${selectedItems.includes(product.id) ? 'border-black' : 'border-gray-200'}`}
            >
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1 uppercase">{product.category}</p>
                <p className="font-medium">{product.name}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedItems.includes(product.id) ? 'bg-black border-black text-white' : 'border-gray-300'}`}>
                {selectedItems.includes(product.id) && <Check className="w-3 h-3" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 flex gap-4 border-t border-gray-100 bg-white md:max-w-3xl md:mx-auto md:w-full md:mb-8 md:rounded-b-2xl md:border-x md:border-b md:shadow-sm">
        <button 
          className="flex-1 py-3 border border-black rounded-xl font-medium"
          onClick={() => setSelectedItems([])}
        >
          Unselect All
        </button>
        <button 
          className="flex-1 py-3 bg-black text-white rounded-xl font-medium disabled:opacity-50"
          disabled={selectedItems.length === 0}
          onClick={() => setStep(2)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
