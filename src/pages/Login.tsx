import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:bg-gray-50">
      <div className="md:bg-white md:p-10 md:rounded-3xl md:shadow-xl md:border md:border-gray-100 w-full max-w-md flex flex-col items-center">
        <div className="flex items-center gap-2 mb-12">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12L10 6V18L4 12Z" fill="black"/>
            <path d="M20 12L14 6V18L20 12Z" fill="black"/>
          </svg>
          <span className="text-xl font-semibold tracking-wide">GPP CRM</span>
        </div>

        <div className="w-full border border-gray-300 rounded-2xl p-6 shadow-sm">
          <h2 className="text-center text-lg mb-4">Welcome</h2>
          
          <div className="flex justify-center gap-2 mb-6 text-sm">
            <button 
              className={`px-3 py-1 border rounded ${isLogin ? 'border-gray-400' : 'border-transparent'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <span className="py-1">or</span>
            <button 
              className={`px-3 py-1 border rounded ${!isLogin ? 'border-gray-400' : 'border-transparent'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign-up
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Mobile Number</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-gray-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email ID</label>
              <input type="email" className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-gray-500" />
            </div>
          </div>

          <div className="text-center my-4 text-sm text-gray-500">or</div>

          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full border border-gray-300 rounded-xl p-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center font-bold text-sm">G</div>
            <span>Login with google</span>
          </button>
        </div>

        <div className="mt-8 border border-gray-300 rounded-md p-3 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-gray-400 rounded-sm"></div>
            <span className="text-sm">I'm not a robot</span>
          </div>
          <div className="flex flex-col items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 13.01 17.75 13.97 17.3 14.8L18.76 16.26C19.54 15.03 20 13.57 20 12C20 7.58 16.42 4 12 4ZM6 12C6 10.99 6.25 10.03 6.7 9.2L5.24 7.74C4.46 8.97 4 10.43 4 12C4 16.42 7.58 20 12 20V23L16 19L12 15V18C8.69 18 6 15.31 6 12Z" fill="#4285F4"/>
            </svg>
            <span className="text-[8px] text-gray-500 mt-1">reCAPTCHA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
