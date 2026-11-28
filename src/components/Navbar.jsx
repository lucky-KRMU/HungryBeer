import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Beer, 
  MapPin, 
  Search, 
  ShoppingBag, 
  User, 
  ChevronDown, 
  X, 
  Sparkles,
  LogOut,
  Store,
  Heart,
  LocateFixed
} from 'lucide-react';
import { LOCATIONS } from '../data/mockData';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar({ 
  currentLocation, 
  setCurrentLocation, 
  searchQuery, 
  setSearchQuery, 
  cartCount, 
  onOpenCart, 
  onOpenAuth, 
  user, 
  onLogout,
  theme,
  setTheme
}) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showMobileLocation, setShowMobileLocation] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState('All');
  const [isDetecting, setIsDetecting] = useState(false);
  const locationRef = useRef(null);
  const mobileLocationRef = useRef(null);

  // Click outside & Escape key to close location dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setShowLocationDropdown(false);
      }
      if (mobileLocationRef.current && !mobileLocationRef.current.contains(e.target)) {
        setShowMobileLocation(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowLocationDropdown(false);
        setShowMobileLocation(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filtered locations
  const cityCategories = ['All', 'Delhi NCR', 'Bengaluru', 'Mumbai', 'Pune', 'Hyderabad', 'Goa', 'Kolkata'];

  const filteredLocations = useMemo(() => {
    return LOCATIONS.filter((loc) => {
      const matchesCity = selectedCityFilter === 'All' || loc.state === selectedCityFilter || loc.city.includes(selectedCityFilter);
      if (!matchesCity) return false;

      if (!locationSearch.trim()) return true;
      const q = locationSearch.toLowerCase();
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.area.toLowerCase().includes(q) ||
        (loc.state && loc.state.toLowerCase().includes(q))
      );
    });
  }, [selectedCityFilter, locationSearch]);

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setTimeout(() => {
      // Pick a popular hub or keep user informed
      const randomNear = LOCATIONS[Math.floor(Math.random() * 5)];
      setCurrentLocation(randomNear);
      setIsDetecting(false);
      setShowLocationDropdown(false);
    }, 600);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f12]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-red-600 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Beer className="w-5 h-5 sm:w-7 sm:h-7 text-black stroke-[2.2]" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-600 rounded-full border-2 border-[#0d0f12] flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></span>
              </div>
            </div>
            
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Cabinet_Grotesk',sans-serif] flex items-center">
                  Hungry
                  {theme === 'valentine' && (
                    <span className="mx-1 text-lg sm:text-xl animate-pulse select-none inline-block filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" role="img" aria-label="Kiss" title="Happy Valentine's! 💋">
                      💋
                    </span>
                  )}
                  <span className={theme === 'valentine' ? 'text-rose-400' : 'text-amber-400'}>Beer</span>
                </span>
              </div>
              <p className={`text-[11px] font-medium tracking-wide hidden sm:flex items-center gap-1 ${
                theme === 'valentine' ? 'text-rose-300' : 'text-amber-400/90'
              }`}>
                {theme === 'valentine' ? (
                  <>
                    <span>Love • Brews • Romance</span>
                    <Heart className="w-2.5 h-2.5 fill-rose-400 text-rose-400" />
                  </>
                ) : (
                  'Bites • Brews • Delivery'
                )}
              </p>
            </div>
          </div>

          {/* Center Search & Location Bar (Zomato Style) */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl bg-zinc-900 border border-zinc-700/70 rounded-xl shadow-inner focus-within:border-amber-500/80 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all relative">
            
            {/* Location selector */}
            <div className="relative" ref={locationRef}>
              <button 
                type="button"
                onClick={() => setShowLocationDropdown((prev) => !prev)}
                className="flex items-center gap-2 px-3.5 py-2.5 text-sm text-gray-200 hover:text-amber-400 border-r border-zinc-700/80 bg-zinc-900/50 rounded-l-xl transition-colors whitespace-nowrap cursor-pointer select-none"
              >
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <div className="text-left">
                  <span className="font-semibold truncate max-w-[130px] block leading-tight">{currentLocation.name}</span>
                  <span className="text-[10px] text-zinc-400 block truncate max-w-[130px] leading-tight">{currentLocation.city}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${showLocationDropdown ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {/* Enhanced Location Dropdown Modal */}
              {showLocationDropdown && (
                <div className={`absolute left-0 top-full mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl border py-2.5 z-[100] animate-in fade-in zoom-in-95 duration-150 ${
                  theme === 'valentine'
                    ? 'bg-[#220718] border-rose-800/80 text-rose-100 shadow-rose-950/80'
                    : theme === 'light'
                    ? 'bg-white border-slate-300 text-slate-900 shadow-xl'
                    : 'bg-zinc-900 border-zinc-700 text-gray-100 shadow-black/80'
                }`}>
                  {/* Dropdown Header & Search */}
                  <div className="px-3 pb-2 border-b border-zinc-800/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                        Select Dining & Craft Beer Hub
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {filteredLocations.length} Places
                      </span>
                    </div>

                    {/* Location search input */}
                    <div className="flex items-center bg-zinc-950/80 border border-zinc-700/80 rounded-xl px-2.5 py-1.5 focus-within:border-amber-400">
                      <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
                      <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        placeholder="Search city, area, or hub..."
                        className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
                      />
                      {locationSearch && (
                        <button onClick={() => setLocationSearch('')} className="text-zinc-400 hover:text-white">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* GPS Detect Button */}
                    <button
                      onClick={handleDetectLocation}
                      disabled={isDetecting}
                      className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 text-xs font-bold border border-amber-500/30 transition-colors cursor-pointer"
                    >
                      <LocateFixed className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
                      <span>{isDetecting ? 'Detecting nearby hub...' : 'Detect Current Location (GPS)'}</span>
                    </button>

                    {/* City Filter Pills */}
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-2">
                      {cityCategories.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => setSelectedCityFilter(city)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                            selectedCityFilter === city
                              ? 'bg-amber-400 text-black'
                              : 'bg-zinc-800/70 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Location List */}
                  <div className="max-h-72 overflow-y-auto py-1 divide-y divide-zinc-800/40">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((loc) => {
                        const isCurrent = currentLocation.id === loc.id;
                        return (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => {
                              setCurrentLocation(loc);
                              setShowLocationDropdown(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                              isCurrent
                                ? theme === 'valentine'
                                ? 'bg-rose-900/30 text-rose-300 font-bold border-l-2 border-rose-500'
                                : 'bg-amber-500/15 text-amber-300 font-bold border-l-2 border-amber-400'
                                : 'hover:bg-zinc-800/50 text-gray-300'
                            }`}
                          >
                            <div>
                              <div className="font-semibold text-sm flex items-center gap-1.5">
                                <MapPin className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-amber-400' : 'text-zinc-500'}`} />
                                <span>{loc.name}</span>
                              </div>
                              <div className="text-[11px] text-zinc-400 ml-5">
                                {loc.area} • <span className="text-zinc-500">{loc.city}</span>
                              </div>
                            </div>
                            {isCurrent && (
                              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400 shrink-0"></span>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="p-4 text-center text-xs text-zinc-500">
                        No locations matching "{locationSearch}"
                      </div>
                    )}
                  </div>
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
                className="w-full bg-transparent text-sm text-gray-100 placeholder-zinc-500 focus:outline-none py-2.5 rounded-r-xl"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-zinc-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Visual Theme Selector (Dark, Light, Valentine) */}
            <ThemeSwitcher theme={theme} setTheme={setTheme} />

            {/* Seller Portal Button — only visible to logged-in sellers */}
            {user?.role === 'seller' && (
              <button
                onClick={() => onOpenAuth('seller')}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 rounded-xl border border-amber-500/30 transition-colors"
                title="Open Brewery & Restaurant Manager"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Seller Portal</span>
              </button>
            )}

            {/* Cart Button — hidden for sellers, only buyers can order food */}
            {user?.role !== 'seller' && (
              <button
                onClick={onOpenCart}
                className="relative flex items-center gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-gray-200 border border-zinc-700 hover:border-amber-400/50 transition-all duration-200 group"
              >
                <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow-lg animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-xl bg-zinc-900 border border-amber-500/30 text-sm">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-black font-bold text-xs shrink-0">
                    {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-200 hidden sm:inline truncate max-w-[90px]">
                    {user?.name || user?.email || 'User'}
                  </span>
                  <button 
                    onClick={onLogout}
                    title="Log Out"
                    className="text-zinc-400 hover:text-red-400 p-1 ml-0.5 sm:ml-1"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-2 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-300 hover:text-amber-400 transition-colors whitespace-nowrap"
                >
                  Log in
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-red-600 text-black hover:from-amber-300 hover:to-red-500 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all whitespace-nowrap"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search & Location Bar */}
        <div className="md:hidden pb-3 space-y-2">
          {/* Mobile Location Selector Button */}
          <div className="relative" ref={mobileLocationRef}>
            <button
              type="button"
              onClick={() => setShowMobileLocation((prev) => !prev)}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-700/80 text-gray-200 hover:border-amber-400/50 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <div className="text-left truncate">
                  <span className="font-bold text-amber-400 truncate">{currentLocation.name}</span>
                  <span className="text-zinc-400 text-[10px] ml-1.5">({currentLocation.city})</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-zinc-400 text-[11px] shrink-0 font-medium">
                <span>Change</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showMobileLocation ? 'rotate-180 text-amber-400' : ''}`} />
              </div>
            </button>

            {/* Mobile Dropdown Popup */}
            {showMobileLocation && (
              <div className={`absolute left-0 right-0 top-full mt-1.5 rounded-2xl shadow-2xl border py-2.5 z-[100] animate-in fade-in duration-150 ${
                theme === 'valentine'
                  ? 'bg-[#220718] border-rose-800 text-rose-100 shadow-rose-950/80'
                  : theme === 'light'
                  ? 'bg-white border-slate-300 text-slate-900 shadow-xl'
                  : 'bg-zinc-900 border-zinc-700 text-gray-100 shadow-black/80'
              }`}>
                {/* Search & Location Items */}
                <div className="px-3 pb-2 border-b border-zinc-800/60">
                  <div className="flex items-center bg-zinc-950/80 border border-zinc-700/80 rounded-xl px-2.5 py-1.5 focus-within:border-amber-400">
                    <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      placeholder="Search city, area, or hub..."
                      className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
                    />
                    {locationSearch && (
                      <button onClick={() => setLocationSearch('')} className="text-zinc-400 hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  {/* City Filter Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-2">
                    {cityCategories.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setSelectedCityFilter(city)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                          selectedCityFilter === city
                            ? 'bg-amber-400 text-black'
                            : 'bg-zinc-800/70 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile scrollable list */}
                <div className="max-h-60 overflow-y-auto py-1 divide-y divide-zinc-800/40">
                  {filteredLocations.map((loc) => {
                    const isCurrent = currentLocation.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => {
                          setCurrentLocation(loc);
                          setShowMobileLocation(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isCurrent
                            ? theme === 'valentine'
                              ? 'bg-rose-900/30 text-rose-300 font-bold border-l-2 border-rose-500'
                              : 'bg-amber-500/15 text-amber-300 font-bold border-l-2 border-amber-400'
                            : 'hover:bg-zinc-800/50 text-gray-300'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-sm flex items-center gap-1.5">
                            <MapPin className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-amber-400' : 'text-zinc-500'}`} />
                            <span>{loc.name}</span>
                          </div>
                          <div className="text-[11px] text-zinc-400 ml-5">
                            {loc.area} • <span className="text-zinc-500">{loc.city}</span>
                          </div>
                        </div>
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400 shrink-0"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Search input */}
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
