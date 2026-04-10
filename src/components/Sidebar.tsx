import { X, Ban, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { theme, setTheme, language, setLanguage } = useAppStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/30 backdrop-blur-md z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <div className="flex bg-gray-100 rounded-full p-1">
                <button 
                  className={`px-3 py-1 rounded-full text-sm ${theme === 'light' ? 'bg-white shadow' : ''}`}
                  onClick={() => setTheme('light')}
                >
                  Light
                </button>
                <button 
                  className={`px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-black text-white' : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </button>
                <button 
                  className={`px-3 py-1 rounded-full text-sm flex items-center justify-center ${theme === 'system' ? 'bg-white shadow' : ''}`}
                  onClick={() => setTheme('system')}
                >
                  <div className="w-3 h-3 rounded-full border border-black"></div>
                </button>
              </div>
              <div className="flex gap-4">
                <RefreshCw className="w-5 h-5" />
                <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-2">Change Language:</p>
                <div className="space-y-2">
                  {['English', 'Hindi', 'Hinglish'].map((lang) => (
                    <label key={lang} className="flex items-center justify-between p-2 border rounded-lg cursor-pointer">
                      <span className="text-sm">{lang}</span>
                      <input 
                        type="radio" 
                        name="language" 
                        checked={language === lang}
                        onChange={() => setLanguage(lang as any)}
                        className="accent-black"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-gray-500">Your Profile</p>
                  <Ban 
                    className="w-5 h-5 cursor-pointer" 
                    onClick={() => { onClose(); navigate('/unavailability'); }}
                  />
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Sonu Kumar Singh</h3>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm">Marketing Executive</span>
                  <div className="w-4 h-4 rounded-full border-2 border-green-500"></div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <button 
                  onClick={() => { onClose(); navigate('/admin-stats'); }}
                  className="w-full text-left p-3 border rounded-lg text-sm"
                >
                  View Admin Stats
                </button>
                <button className="w-full text-left p-3 border rounded-lg text-sm">
                  Export Data
                </button>
                <button 
                  onClick={() => { onClose(); navigate('/uninterested'); }}
                  className="w-full text-left p-3 border rounded-lg text-sm"
                >
                  Uninterested Leads
                </button>
                <button 
                  onClick={() => { onClose(); navigate('/all-quotations'); }}
                  className="w-full text-left p-3 border rounded-lg text-sm"
                >
                  View All Quotations
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12L10 6V18L4 12Z" fill="black"/>
                    <path d="M20 12L14 6V18L20 12Z" fill="black"/>
                  </svg>
                  <span className="font-semibold">GPP CRM</span>
                </div>
                <p className="text-xs text-gray-500">Design & Developed By</p>
                <p className="text-sm font-semibold">Guru Printing Press</p>
                <p className="text-xs text-gray-400">guruprintingpress.com</p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <button 
                onClick={() => navigate('/login')}
                className="w-full text-center text-sm font-medium"
              >
                logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
