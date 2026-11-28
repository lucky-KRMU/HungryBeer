import React, { useState } from 'react';
import { api, setAuthToken } from '../services/api';
import { X, Beer, Mail, Phone, Lock, Check, AlertCircle, Store } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [role, setRole] = useState('buyer'); // 'buyer' | 'seller'
  const [restaurantName, setRestaurantName] = useState('');
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

    if (mode === 'signup' && role === 'seller' && !restaurantName.trim()) {
      setErrorMessage('Please provide the name of your restaurant or brewery');
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
          role: role,
          restaurantName: role === 'seller' ? restaurantName.trim() : ''
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 my-auto">
        
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
        <div className="flex rounded-xl bg-zinc-950 p-1 mb-4 border border-zinc-800 text-xs font-bold">
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

        {/* Role Selector for Sign Up in Modal */}
        {mode === 'signup' && (
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 mb-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === 'buyer'
                  ? 'bg-zinc-800 text-amber-400 border border-amber-500/30 shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Beer className="w-3.5 h-3.5" />
              <span>Buyer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('seller')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === 'seller'
                  ? 'bg-zinc-800 text-amber-400 border border-amber-500/30 shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Seller (Partner)</span>
            </button>
          </div>
        )}

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

          {/* Restaurant Name field for Sellers */}
          {mode === 'signup' && role === 'seller' && (
            <div>
              <label className="block text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1">
                <Store className="w-3.5 h-3.5" />
                <span>Restaurant / Brewery Name *</span>
              </label>
              <input
                type="text"
                required
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="e.g. The Hoppy Keg Taproom"
                className="w-full bg-zinc-950 border border-amber-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
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

        <p className="text-[11px] text-zinc-400 text-center mt-4">
          By signing in, you agree to HungryBeer's Terms of Service and Privacy Policy. You must be of legal drinking age in your state.
        </p>

      </div>
    </div>
  );
}
