import React, { useState } from 'react';
import { api, setAuthToken } from '../services/api';
import { X, Beer, Mail, Phone, Lock, Sparkles, Check, AlertCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const trimmed = emailOrPhone.trim().toLowerCase();
      const validEmail = trimmed.includes('@')
        ? trimmed
        : `${trimmed.replace(/[^a-z0-9]/g, '')}@hungrybeer.com`;

      if (mode === 'signup') {
        const res = await api.auth.register({
          name: fullName.trim() || 'Hungry Friend',
          email: validEmail,
          password: password,
          role: 'buyer'
        });

        if (res.success && res.user) {
          setAuthToken(res.token);
          onLoginSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.message || res.error || 'Registration failed');
        }
      } else {
        const res = await api.auth.login({
          email: validEmail,
          password: password
        });

        if (res.success && res.user) {
          setAuthToken(res.token);
          onLoginSuccess(res.user);
          onClose();
        } else {
          setErrorMessage(res.message || res.error || 'Invalid credentials');
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error communicating with backend');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const res = await api.auth.login({
        email: 'buyer@hungrybeer.com',
        password: 'password123'
      });
      if (res.success && res.user) {
        setAuthToken(res.token);
        onLoginSuccess(res.user);
        onClose();
      }
    } catch (err) {
      console.warn('Demo login error', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden p-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-red-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <Beer className="w-8 h-8 text-black stroke-[2.2]" />
          </div>
          <h3 className="text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
            {mode === 'login' ? 'Welcome Back!' : 'Join HungryBeer'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            {mode === 'login'
              ? 'Log in to track orders, claim brew points & discounts'
              : 'Sign up for instant 25% discount & free craft pints'}
          </p>
        </div>

        {/* Switcher Tab */}
        <div className="flex rounded-xl bg-zinc-950 p-1 mb-5 border border-zinc-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-amber-400 text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-amber-400 text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Hunter"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Email or Mobile Number
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="name@hungrybeer.com or 9876543210"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-red-600 hover:from-amber-300 hover:to-red-500 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all"
          >
            {mode === 'login' ? 'Log In to Feast' : 'Create HungryBeer Account'}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-zinc-400 font-semibold">Or continue with</span>
          </div>
        </div>

        {/* Demo Fast Login */}
        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-zinc-700 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>One-Click Demo User (Quick Test)</span>
        </button>

        <p className="text-[11px] text-zinc-400 text-center mt-4">
          By signing in, you agree to HungryBeer's Terms of Service and Privacy Policy. You must be of legal drinking age in your state.
        </p>

      </div>
    </div>
  );
}
