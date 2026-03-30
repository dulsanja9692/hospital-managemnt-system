import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types';

export const LoginPage = ({ onLoginSuccess }: { onLoginSuccess: (u: User) => void }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = { 
      id: '1', 
      name: 'Sanjana', 
      role: 'Receptionist', 
      email 
    };
    
    localStorage.setItem('token', 'mock_token_2026');
    onLoginSuccess(mockUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) p-6 animate-soft-load">
      <div className="w-full max-w-md bg-(--code-bg) border border-(--border) p-10 rounded-3xl shadow-(--shadow) transition-all duration-500">
        
        {/* CENTERED Titles */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-(--text-h)">
            {isRegistering ? 'Join Staff' : 'Staff Portal'}
          </h2>
          <p className="text-(--text) mt-2 font-medium">
            {isRegistering ? 'Request access below' : 'Welcome back, please login'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          {/* LEFT aligned labels and inputs */}
          {isRegistering && (
            <div className="flex flex-col items-start animate-in fade-in duration-300">
              <label className="text-sm font-bold mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full p-4 bg-(--bg) border border-(--border) rounded-xl outline-none focus:border-(--accent) text-left" 
                placeholder="Your Name" 
                required 
              />
            </div>
          )}

          <div className="flex flex-col items-start">
            <label className="text-sm font-bold mb-2">Hospital Email</label>
            <input 
              type="email" 
              className="w-full p-4 bg-(--bg) border border-(--border) rounded-xl outline-none focus:border-(--accent) text-left" 
              placeholder="nameofhospital@hospital.lk" 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="flex flex-col items-start">
            <label className="text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-4 bg-(--bg) border border-(--border) rounded-xl outline-none focus:border-(--accent) text-left" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-(--accent) text-white font-bold rounded-xl shadow-(--shadow) hover:brightness-110 active:scale-95 transition-all"
          >
            {isRegistering ? 'Request Access' : 'Sign In'}
          </button>
        </form>

        {/* CENTERED Footer Link */}
        <div className="mt-8 pt-6 border-t border-(--border) text-center">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-(--accent) font-bold hover:underline underline-offset-4"
          >
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Contact Admin'}
          </button>
        </div>
      </div>
    </div>
  );
};