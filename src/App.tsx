/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from './pages/Loader';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LeadDetails from './pages/LeadDetails';
import ScheduleVisit from './pages/ScheduleVisit';
import Quotation from './pages/Quotation';
import AdminStats from './pages/AdminStats';
import UninterestedLeads from './pages/UninterestedLeads';
import AllQuotations from './pages/AllQuotations';
import Unavailability from './pages/Unavailability';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans w-full max-w-md md:max-w-full mx-auto relative shadow-xl md:shadow-none overflow-x-hidden">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lead/:id" element={<LeadDetails />} />
          <Route path="/schedule/:id" element={<ScheduleVisit />} />
          <Route path="/quotation/:id" element={<Quotation />} />
          <Route path="/admin-stats" element={<AdminStats />} />
          <Route path="/uninterested" element={<UninterestedLeads />} />
          <Route path="/all-quotations" element={<AllQuotations />} />
          <Route path="/unavailability" element={<Unavailability />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
