import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Beer, 
  Clock, 
  MapPin, 
  Phone, 
  Plus, 
  Minus, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Flame,
  Info
} from 'lucide-react';

export default function RestaurantModal({
  restaurant,
  onClose,
  cartItems,
  onAddToCart,
  onUpdateQuantity
}) {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'book'
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Table Booking State
  const [bookingDate, setBookingDate] = useState('Today, 8:00 PM');
  const [guests, setGuests] = useState('2 Guests');
  const [specialRequest, setSpecialRequest] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!restaurant) return null;

  // Extract unique categories from restaurant menu
  const categories = ['All', ...new Set(restaurant.menu.map(item => item.category))];

  const filteredMenuItems = selectedCategory === 'All'
    ? restaurant.menu
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const getItemCartQty = (itemId) => {
    const found = cartItems.find(ci => ci.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleBookTable = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors border border-zinc-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Banner */}
        <div className="relative h-48 sm:h-64 w-full shrink-0">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>

          {/* Banner Details */}
          <div className="absolute bottom-3 sm:bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                <span className="bg-red-600 text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded uppercase">
                  Verified Brewery & Kitchen
                </span>
                {restaurant.hasBeer && (
                  <span className="bg-amber-400 text-black text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                    <Beer className="w-3 h-3" /> Craft On Tap
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk',sans-serif] truncate">
                {restaurant.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 truncate">
                {restaurant.cuisines.join(' • ')}
              </p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow">
                <span>{restaurant.rating}</span>
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              </div>
              <div className="text-left text-xs text-zinc-400">
                <div className="font-bold text-white">{restaurant.reviewsCount}</div>
                <div>reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Info Bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-x-4 gap-y-1.5 flex-wrap">
            <span className="flex items-center gap-1 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>{restaurant.address}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{restaurant.timings}</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>{restaurant.phone}</span>
            </span>
          </div>

          <div className="font-semibold text-amber-400 shrink-0">
            ₹{restaurant.priceForTwo} for two
          </div>
        </div>

        {/* Modal Tabs (Menu vs Table Booking) */}
        <div className="px-4 sm:px-6 border-b border-zinc-800 flex items-center gap-4 sm:gap-6 bg-zinc-900 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3 sm:py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'menu'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Order Food & Brews Online ({restaurant.menu.length})
          </button>
          <button
            onClick={() => setActiveTab('book')}
            className={`py-3 sm:py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'book'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Book a Table / Visit</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0f1115]">
          {activeTab === 'menu' ? (
            <div>
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-4 border-b border-zinc-800">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Menu Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMenuItems.map((item) => {
                  const qty = getItemCartQty(item.id);
                  return (
                    <div
                      key={item.id}
                      className="p-3 sm:p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start justify-between gap-3 sm:gap-4 hover:border-zinc-700 transition-all"
                    >
                      {/* Left: Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          {/* Veg/NonVeg Indicator */}
                          <span
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                              item.isVeg
                                ? 'border-emerald-500'
                                : 'border-red-600'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                item.isVeg ? 'bg-emerald-500' : 'bg-red-600'
                              }`}
                            ></span>
                          </span>

                          {item.isBestseller && (
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-400 uppercase tracking-wide">
                              ★ Bestseller
                            </span>
                          )}

                          {item.isBeer && (
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 uppercase tracking-wide flex items-center gap-0.5">
                              <Beer className="w-2.5 h-2.5" /> Brew
                            </span>
                          )}
                        </div>

                        <h4 className="mt-1 font-bold text-white text-base">
                          {item.name}
                        </h4>

                        <div className="text-amber-400 font-extrabold text-sm mt-0.5">
                          ₹{item.price}
                        </div>

                        <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Right: Image & Add to Cart button */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex flex-col items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-20 sm:h-24 object-cover rounded-xl border border-zinc-800 shadow"
                        />

                        {/* Add / Stepper Button */}
                        <div className="absolute -bottom-2 z-10">
                          {qty === 0 ? (
                            <button
                              onClick={() => onAddToCart(item, restaurant)}
                              className="px-4 sm:px-5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs shadow-lg uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-zinc-950 border border-amber-400 text-amber-400 font-black text-xs shadow-lg">
                              <button
                                onClick={() => onUpdateQuantity(item.id, qty - 1)}
                                className="hover:text-white p-0.5"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-4 text-center text-white">{qty}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, qty + 1)}
                                className="hover:text-white p-0.5"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Table Booking View */
            <div className="max-w-xl mx-auto py-4">
              {bookingConfirmed ? (
                <div className="text-center p-8 bg-zinc-900 border border-emerald-500/50 rounded-2xl shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Table Reserved Successfully!
                  </h3>
                  <p className="text-sm text-zinc-300 mt-2">
                    Your reservation for <strong className="text-amber-400">{guests}</strong> at{' '}
                    <strong className="text-white">{restaurant.name}</strong> on{' '}
                    <strong className="text-amber-400">{bookingDate}</strong> is confirmed.
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Booking ID: <span className="font-mono text-zinc-200">HB-TBL-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 text-zinc-300 hover:text-white"
                    >
                      Book Another Table
                    </button>
                    <button
                      onClick={() => setActiveTab('menu')}
                      className="px-5 py-2 rounded-xl text-xs font-black bg-amber-400 text-black hover:bg-amber-300 shadow"
                    >
                      Browse Menu While Waiting
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookTable} className="bg-zinc-900 p-4 sm:p-6 rounded-2xl border border-zinc-800 space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-white">
                      Reserve a Table & Draft Experience
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      No waiting in queue. Fresh beer flights and table guaranteed.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" /> Date & Time Slot
                      </label>
                      <select
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                      >
                        <option>Today, 7:30 PM (Dinner & Draughts)</option>
                        <option>Today, 8:30 PM (Prime DJ Hour)</option>
                        <option>Today, 9:30 PM (Late Night Brews)</option>
                        <option>Tomorrow, 1:00 PM (Sunday Drunch)</option>
                        <option>Tomorrow, 8:00 PM (Live Acoustic Night)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-400" /> Party Size
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                      >
                        <option>2 Guests (Cozy Table)</option>
                        <option>4 Guests (Booth Seating)</option>
                        <option>6 Guests (Brewery Long Table)</option>
                        <option>8+ Guests (Party Lounge)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Special Requests / Seating Preference
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Rooftop seating, near brewery tanks, anniversary celebration"
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-200">
                    <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Free reservation • Complimentary house brew sample upon arrival with HungryBeer booking.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-red-600 text-black font-black text-sm uppercase tracking-wider hover:from-amber-300 hover:to-red-500 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all"
                  >
                    Confirm Table Booking
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
