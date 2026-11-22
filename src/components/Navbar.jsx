import React, { useState } from 'react';
import { 
  Beer, 
  MapPin, 
  Search, 
  ShoppingBag, 
  User, 
  ChevronDown, 
  X, 
  Sparkles,
  LogOut
} from 'lucide-react';
import { LOCATIONS } from '../data/mockData';

export default function Navbar({ 
  currentLocation, 
  setCurrentLocation, 
  searchQuery, 
  setSearchQuery, 
  cartCount, 
  onOpenCart, 
  onOpenAuth, 
  user, 
  onLogout 
}) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f12]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group select-none shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-red-600 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Beer className="w-7 h-7 text-black stroke-[2.2]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full border-2 border-[#0d0f12] flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></span>
              </div>
            </div>
            
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-['Cabinet_Grotesk',sans-serif]">
                  Hungry<span className="text-amber-400">Beer</span>
                </span>
              </div>
              <p className="text-[11px] font-medium text-amber-400/90 tracking-wide">
                Bites • Brews • Delivery
              </p>
            </div>
          </div>

          {/* Center Search & Location Bar (Zomato Style) */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl bg-zinc-900 border border-zinc-700/70 rounded-xl overflow-hidden shadow-inner focus-within:border-amber-500/80 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
            
            {/* Location selector */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-2 px-3.5 py-2.5 text-sm text-gray-200 hover:text-amber-400 border-r border-zinc-700/80 bg-zinc-900/50 transition-colors whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-medium truncate max-w-[120px]">{currentLocation.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* Location Dropdown Modal */}
              {showLocationDropdown && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                    Select Your City / Area
                  </div>
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setCurrentLocation(loc);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-zinc-800 transition-colors ${
                        currentLocation.id === loc.id ? 'text-amber-400 font-semibold bg-zinc-800/60' : 'text-gray-300'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{loc.name}</div>
                        <div className="text-xs text-zinc-400">{loc.city}</div>
                      </div>
                      {currentLocation.id === loc.id && (
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Search Input */}
            <div className="relative flex-1 flex items-center px-3.5">
              <Search className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for craft beer, burgers, pizza, or dining spots..."
                className="w-full bg-transparent text-sm text-gray-100 placeholder-zinc-500 focus:outline-none py-2.5"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-gray-200 border border-zinc-700 hover:border-amber-400/50 transition-all duration-200 group"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-amber-500/30 text-sm">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-black font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-200 hidden sm:inline truncate max-w-[90px]">
                    {user.name}
                  </span>
                  <button 
                    onClick={onLogout}
                    title="Log Out"
                    className="text-zinc-400 hover:text-red-400 p-1 ml-1"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-sm font-semibold text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-red-600 text-black hover:from-amber-300 hover:to-red-500 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="flex items-center bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brews, burgers, or restaurants..."
              className="w-full bg-transparent text-sm text-gray-100 placeholder-zinc-500 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-zinc-400">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
