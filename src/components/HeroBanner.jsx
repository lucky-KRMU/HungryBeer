import React from 'react';
import { Beer, Flame, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export default function HeroBanner({ onSelectOffer, activeTab }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#111317] via-[#181a20] to-[#120d0f] border-b border-zinc-800/80 py-8 px-4 sm:px-6 lg:px-8">
      {/* Decorative ambient glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Headline */}
        <div className="max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Weekend Brewfest & Feast is Live!</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-['Cabinet_Grotesk',sans-serif]">
            Fresh Craft Beers & <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
              Fiery Gourmet Bites
            </span>
          </h1>

          <p className="mt-2 text-zinc-300 text-sm sm:text-base leading-relaxed">
            From smoky pulled pork to woodfired sourdough pizzas and microbrewed IPAs. 
            Delivered ice cold & piping hot under 30 minutes!
          </p>

          {/* Quick Perks */}
          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-zinc-400">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Beer className="w-4 h-4 text-amber-400" /> 100% Chilled Delivery
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <Clock className="w-4 h-4 text-red-400" /> Avg. 25 Mins
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <ShieldCheck className="w-4 h-4 text-green-400" /> Hygiene & Brew Certified
            </span>
          </div>
        </div>

        {/* Right Promo Box / Coupon Card */}
        <div className="w-full md:w-auto shrink-0">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 rounded-2xl border border-amber-500/30 shadow-xl shadow-amber-500/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 shadow">
              <Flame className="w-3 h-3 fill-current" /> Save 25%
            </div>

            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              Special Brew Promo
            </div>
            <div className="text-2xl font-black text-white">
              FLAT 25% OFF
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 max-w-[220px]">
              On all brewery combos and taproom favorites today!
            </p>

            <div className="mt-4 flex items-center justify-between gap-3 bg-zinc-800/80 p-2 rounded-xl border border-dashed border-amber-500/40">
              <span className="font-mono text-sm font-extrabold text-amber-300 tracking-wider">
                HUNGRYBEER
              </span>
              <button
                onClick={() => onSelectOffer('HUNGRYBEER')}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-lg transition-transform active:scale-95 shadow"
              >
                Copy Code
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
