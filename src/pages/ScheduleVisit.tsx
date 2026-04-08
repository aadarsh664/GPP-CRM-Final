import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { ArrowLeft, MapPin, Check } from 'lucide-react';
import { useState } from 'react';

export default function ScheduleVisit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads } = useAppStore();
  const lead = leads.find(l => l.id === id);
  
  const [selectedDate, setSelectedDate] = useState<number | null>(7);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!lead) return <div>Lead not found</div>;

  const slots = [
    "11:00 to 12:30", "12:30 to 14:00", "14:00 to 15:00", "16:00 to 17:30"
  ];

  if (showConfirm) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowConfirm(false)}>
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-8">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Meeting Scheduled</h2>
          <p className="text-gray-600 mb-2">Date: 7 Feb, 2026</p>
          <p className="text-gray-600 mb-12">Time: {selectedSlot || "14:00 to 15:00"}</p>
          <button 
            className="w-full bg-black text-white rounded-xl py-4 font-medium text-lg"
            onClick={() => navigate('/dashboard')}
          >
            Send Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </div>
      </header>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">{lead.name}</h2>
            <p className="text-sm text-gray-500">{lead.industry}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{lead.distance} Km</span>
          </div>
        </div>

        <div className="border rounded-lg p-3 flex items-center gap-3 mb-6">
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">R</div>
          <span className="text-sm font-medium flex-1">Rahul Kumar</span>
          <span className="text-xs text-gray-500">Field Executive</span>
        </div>

        <div className="border rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">February</h3>
            <span className="font-semibold text-lg">2026</span>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2">
            {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-gray-500">{d}</div>)}
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {/* Mock calendar days */}
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].map(day => {
              let bg = "bg-white";
              let text = "text-black";
              let border = "border border-gray-200";
              
              if (day < 5) { text = "text-gray-400"; border = "border-transparent"; } // Past
              else if (day === 7) { bg = "bg-black"; text = "text-white"; border = "border-black"; } // Selected
              else if ([11,12,15,17,23,24,25,26].includes(day)) { bg = "bg-red-500"; text = "text-white"; border = "border-red-500"; } // Booked
              else if (day === 5) { bg = "bg-green-100"; border = "border-green-200"; } // Available
              
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
          <p className="text-lg font-medium">7 Feb, 2026 <span className="text-gray-500 font-normal">Selected</span></p>
        </div>

        <div className="mb-auto">
          <p className="text-center text-sm text-gray-500 mb-3">Select Slot</p>
          <div className="flex flex-wrap justify-center gap-2">
            {slots.map(slot => (
              <button 
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-3 py-1.5 border rounded-full text-xs ${selectedSlot === slot ? 'border-black bg-gray-50' : 'border-gray-300'}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            className="flex-1 py-3 border border-black rounded-xl font-medium"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-3 bg-black text-white rounded-xl font-medium"
            onClick={() => setShowConfirm(true)}
          >
            Book Visit
          </button>
        </div>
      </div>
    </div>
  );
}
