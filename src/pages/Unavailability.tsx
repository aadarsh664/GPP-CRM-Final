import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Unavailability() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<number | null>(28);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const slots = [
    "11:00 to 12:30", "12:30 to 14:00", "14:00 to 15:00", "16:00 to 17:30"
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col md:bg-gray-50">
      <header className="p-4 flex items-center justify-between border-b border-gray-100 bg-white md:max-w-3xl md:mx-auto md:w-full md:mt-8 md:rounded-t-2xl md:border-x md:border-t">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Book Your Unavailability:</span>
        </div>
      </header>

      <div className="p-4 flex-1 flex flex-col bg-white md:max-w-3xl md:mx-auto md:w-full md:mb-8 md:rounded-b-2xl md:border-x md:border-b md:shadow-sm md:p-8">
        <p className="text-sm text-gray-600 mb-4">Select date that you will be unavailable:</p>

        <div className="border rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">February</h3>
            <span className="font-semibold text-lg">2026</span>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2">
            {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-gray-500">{d}</div>)}
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].map(day => {
              let bg = "bg-white";
              let text = "text-black";
              let border = "border border-gray-200";
              
              if (day < 5) { text = "text-gray-400"; border = "border-transparent"; }
              else if (day === 28) { bg = "bg-blue-900"; text = "text-white"; border = "border-blue-900"; }
              else if ([11,12,15,17,23,24,25,26].includes(day)) { bg = "bg-red-500"; text = "text-white"; border = "border-red-500"; }
              
              return (
                <div 
                  key={day} 
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square rounded-full flex items-center justify-center cursor-pointer ${bg} ${text} ${border}`}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg font-medium">28 Feb, 2026 <span className="text-gray-500 font-normal">Selected</span></p>
        </div>

        <div className="mb-6">
          <p className="text-center text-sm text-gray-500 mb-3">Select Slot:</p>
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {slots.map(slot => (
              <button 
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-3 py-1.5 border rounded-full text-xs ${selectedSlot === slot ? 'border-blue-900 bg-blue-50 text-blue-900' : 'border-gray-300'}`}
              >
                {slot}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setSelectedSlot('FULL DAY')}
            className={`w-full py-2 border rounded-full text-xs font-medium ${selectedSlot === 'FULL DAY' ? 'border-blue-900 bg-blue-50 text-blue-900' : 'border-gray-300'}`}
          >
            BOOK FULL DAY
          </button>
        </div>

        <div className="mb-auto">
          <label className="block text-sm text-gray-600 mb-2">Enter Your Reason:</label>
          <textarea 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Write your reason for booking..."
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-black resize-none h-24 text-sm"
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            className="flex-1 py-3 border border-black rounded-xl font-medium"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-3 bg-black text-white rounded-xl font-medium disabled:opacity-50"
            disabled={!reason.trim() || !selectedSlot}
            onClick={() => navigate('/dashboard')}
          >
            Book Visit
          </button>
        </div>
      </div>
    </div>
  );
}
