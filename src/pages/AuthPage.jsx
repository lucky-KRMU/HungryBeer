import React, { useState } from 'react';
import { 
  Beer, 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Gift, 
  Clock 
} from 'lucide-react';

export default function AuthPage({ 
  initialMode = 'login', 
  onBackToHome, 
  onLoginSuccess 
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form fields
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'signup' && !agreedToTerms) {
      setErrorMessage('Please confirm you are of legal drinking age (21+)');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: fullName || (emailOrPhone.split('@')[0] || 'Hungry Friend'),
        email: emailOrPhone.includes('@') ? emailOrPhone : 'member@hungrybeer.com',
        phone: phoneNumber || (!emailOrPhone.includes('@') ? emailOrPhone : '+91 98765 00000'),
      };
      onLoginSuccess(user);
    }, 700);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const demoUser = {
        name: 'Rohan Sharma',
        email: 'rohan.sharma@hungrybeer.com',
        phone: '+91 98765 43210',
      };
      onLoginSuccess(demoUser);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] flex flex-col justify-between text-gray-100 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Floating Bar */}
      <nav className="p-4 sm:p-6 max-w-7xl w-full mx-auto flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-400 hover:text-amber-400 transition-colors bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-zinc-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to HungryBeer</span>
        </button>

        <div className="flex items-center gap-2.5 cursor-pointer" onClick={onBackToHome}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center shadow-md shadow-amber-500/20">
            <Beer className="w-6 h-6 text-black stroke-[2.2]" />
          </div>
          <span className="text-xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
            Hungry<span className="text-amber-400">Beer</span>
          </span>
        </div>
      </nav>

      {/* Main Container: Split Hero & Dedicated Form */}
      <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-12 my-auto">
        
        {/* Left Side: Brand Story & Member Perks */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>HungryBeer Club Membership</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-['Cabinet_Grotesk',sans-serif]">
            The Ultimate Pass to <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-red-500 bg-clip-text text-transparent">
              Chilled Brews & Hot Bites
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Log in to unlock member-only dining discounts, reserved brewery tables, and 25-minute ice-chilled craft beer delivery.
          </p>

          {/* Perks list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-left">
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
                <Beer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Chilled Growlers</div>
                <div className="text-[11px] text-zinc-400">Poured fresh from local microbrewery taps</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Flat 25% Off</div>
                <div className="text-[11px] text-zinc-400">Exclusive member savings with every order</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Table Priority</div>
                <div className="text-[11px] text-zinc-400">Skip the weekend line at top taprooms</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Welcome Bonus</div>
                <div className="text-[11px] text-zinc-400">Free craft sampler on your first dine-in</div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-zinc-400">
            <div className="flex -space-x-2">
              <img className="w-7 h-7 rounded-full border-2 border-[#0a0b0e]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="user" />
              <img className="w-7 h-7 rounded-full border-2 border-[#0a0b0e]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="user" />
              <img className="w-7 h-7 rounded-full border-2 border-[#0a0b0e]" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" alt="user" />
            </div>
            <span>Trusted by <strong>250,000+</strong> foodies & beer enthusiasts across India</span>
          </div>
        </div>

        {/* Right Side: Dedicated Auth Form Card */}
        <div className="lg:w-1/2 w-full max-w-md mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top Amber Light Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-red-500"></div>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800/80 mb-6">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  mode === 'login'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMessage(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  mode === 'signup'
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Heading */}
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
                {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                {mode === 'login' 
                  ? 'Enter your credentials to access your food orders & table reservations.'
                  : 'Join today and get instant 25% discount voucher on your first order.'}
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-700/60 text-red-300 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Hunter"
                      className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  Email Address or Mobile
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="alex@hungrybeer.com or 9876543210"
                    className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    Mobile Number (For Delivery SMS & OTP)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-zinc-300">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to your registered email/phone.')}
                      className="text-[11px] font-semibold text-amber-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Checkboxes */}
              {mode === 'login' ? (
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-amber-400 focus:ring-amber-400"
                  />
                  <label htmlFor="remember" className="ml-2 text-xs text-zinc-300 font-medium">
                    Keep me signed in on this device
                  </label>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start">
                    <input
                      id="drinking-age"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded bg-zinc-950 border-zinc-700 text-amber-400 focus:ring-amber-400"
                    />
                    <label htmlFor="drinking-age" className="ml-2 text-[11px] text-zinc-300">
                      I confirm I am 21 years of age or older, and agree to the Terms of Service.
                    </label>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-red-600 hover:from-amber-300 hover:to-red-500 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Log In to Feast' : 'Create Free Account'}</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                <span className="bg-zinc-900 px-3 text-zinc-400 font-bold">Or Instant Access</span>
              </div>
            </div>

            {/* One-click Demo Button */}
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-zinc-700 hover:border-amber-500/40 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>One-Click Demo Login (Rohan Sharma)</span>
            </button>

            {/* Switch mode footer */}
            <div className="text-center mt-5 text-xs text-zinc-400">
              {mode === 'login' ? (
                <span>
                  Don't have a HungryBeer account?{' '}
                  <button
                    onClick={() => { setMode('signup'); setErrorMessage(''); }}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Sign up now
                  </button>
                </span>
              ) : (
                <span>
                  Already a HungryBeer member?{' '}
                  <button
                    onClick={() => { setMode('login'); setErrorMessage(''); }}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Log in here
                  </button>
                </span>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Page Footer */}
      <footer className="p-4 sm:p-6 border-t border-zinc-900 text-center text-xs text-zinc-400">
        © 2026 HungryBeer™ Ltd. Drink responsibly. Must be of legal drinking age.
      </footer>

    </div>
  );
}
