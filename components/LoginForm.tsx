
import React, { useState } from 'react';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'MADHOBILOTA' && password === 'MAHID_IS_GREAT') {
      onLoginSuccess();
    } else {
      setError('Wait... you are not Dutee! 🤨');
      // Auto clear error after 3 seconds
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md px-6 animate-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white/80 backdrop-blur-xl border border-rose-100 p-8 rounded-[2rem] shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-rose-900 font-serif">Security Check</h2>
          <p className="text-rose-500/70 mt-2 font-medium uppercase tracking-widest text-xs">For Her Eyes Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-rose-900/60 mb-2 uppercase tracking-wider">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 bg-rose-50 border border-rose-100 rounded-2xl focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all placeholder:text-rose-200"
              placeholder="Enter your secret name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-rose-900/60 mb-2 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 bg-rose-50 border border-rose-100 rounded-2xl focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none transition-all placeholder:text-rose-200"
              placeholder="••••••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm font-medium animate-bounce text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Access Vault
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
