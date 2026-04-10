import { useState } from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 300 },
  { name: 'Mar', uv: 500 },
  { name: 'Apr', uv: 200 },
  { name: 'May', uv: 600 },
  { name: 'Jun', uv: 400 },
];

export default function AdminStats() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <p className="text-sm mb-4">Enter password to view admin stats:</p>
          <div className="flex gap-2">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black"
              placeholder="Enter password"
            />
            <button 
              onClick={() => setIsAuthenticated(true)}
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:bg-gray-50">
      <header className="p-4 flex items-center justify-between border-b border-gray-100 bg-white md:max-w-5xl md:mx-auto md:w-full md:mt-8 md:rounded-t-2xl md:border-x md:border-t">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12L10 6V18L4 12Z" fill="black"/>
            <path d="M20 12L14 6V18L20 12Z" fill="black"/>
          </svg>
          <span className="font-semibold">Admin Stats</span>
        </div>
        <div className="flex gap-4">
          <button><Menu className="w-6 h-6" /></button>
        </div>
      </header>

      <div className="p-4 flex-1 overflow-y-auto bg-white md:max-w-5xl md:mx-auto md:w-full md:mb-8 md:rounded-b-2xl md:border-x md:border-b md:shadow-sm">
        <div className="flex gap-2 mb-6">
          <button className="flex-1 py-1.5 border border-black bg-black text-white rounded-full text-xs">All Time</button>
          <button className="flex-1 py-1.5 border border-gray-300 rounded-full text-xs">Today</button>
          <button className="flex-1 py-1.5 border border-gray-300 rounded-full text-xs">Custom Date</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
          <StatCard title="Total Leads" value="856" />
          <StatCard title="Total New Leads" value="256" />
          <StatCard title="Total Pending Visits" value="19" />
          <StatCard title="Total Visit Completed" value="120" />
          <StatCard title="Total Reschedule Made" value="15" />
          <StatCard title="Total Whatsapp Sent" value="750" />
          <StatCard title="Total Confirm Deals" value="325" />
          <StatCard title="Total Failed Deals" value="98" />
          <StatCard title="Total Quotation Sent" value="600" />
          <StatCard title="Total Call Done" value="626" />
          <StatCard title="Total Not Interested" value="16" />
          <StatCard title="Total Call Later" value="23" />
        </div>

        <div className="border border-gray-200 rounded-xl p-4">
          <h3 className="text-xs text-gray-500 mb-4">Growth Chart</h3>
          <div className="h-40 md:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="uv" stroke="#000" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: string }) {
  return (
    <div className="border border-gray-200 rounded-xl p-3">
      <p className="text-[10px] text-gray-500 mb-1">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
