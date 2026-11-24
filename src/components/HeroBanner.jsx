import React from 'react';
import { Beer, Flame, Sparkles, Clock, ShieldCheck, Heart, Wine } from 'lucide-react';

export default function HeroBanner({ onSelectOffer, activeTab, theme }) {
  const isValentine = theme === 'valentine';

  return (
    <div className={`relative overflow-hidden border-b py-8 px-4 sm:px-6 lg:px-8 transition-colors ${
      isValentine
        ? 'bg-gradient-to-r from-[#200716] via-[#2a091d] to-[#18040f] border-rose-900/50'
        : 'bg-gradient-to-r from-[#111317] via-[#181a20] to-[#120d0f] border-zinc-800/80'
    }`}>
      {/* Decorative ambient glows */}
      <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isValentine ? 'bg-rose-600/20' : 'bg-amber-500/10'
      }`}></div>
      <div className={`absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isValentine ? 'bg-pink-500/20' : 'bg-red-600/10'
      }`}></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Headline */}
        <div className="max-w-2xl text-center md:text-left">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${
            isValentine
              ? 'bg-rose-500/15 border-rose-400/40 text-rose-200'
              : 'bg-amber-400/10 border-amber-400/30 text-amber-300'
          }`}>
            {isValentine ? (
              <>
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
                <span>Valentine Candlelight & Romantic Brews Special!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Weekend Brewfest & Feast is Live!</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-['Cabinet_Grotesk',sans-serif]">
            {isValentine ? (
              <>
                Love & Craft Brews: <br />
                <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                  Romantic Date Night Feast
                </span>
              </>
            ) : (
              <>
                Fresh Craft Beers & <br />
                <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Fiery Gourmet Bites
                </span>
              </>
            )}
          </h1>

          <p className="mt-2 text-zinc-300 text-sm sm:text-base leading-relaxed">
            {isValentine
              ? 'Handcrafted strawberry witbiers, candlelit brewery booths, woodfired pizzas & artisanal chocolates for two. Celebrate romance!'
              : 'From smoky pulled pork to woodfired sourdough pizzas and microbrewed IPAs. Delivered ice cold & piping hot under 30 minutes!'}
          </p>

          {/* Quick Perks */}
          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-zinc-400">
            {isValentine ? (
              <>
                <span className="flex items-center gap-1.5 text-rose-300">
                  <Wine className="w-4 h-4 text-rose-400" /> Rose & Craft Sangrias
                </span>
                <span className="flex items-center gap-1.5 text-pink-200">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> Candlelight Tables
                </span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Free Chocolate Dessert
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Beer className="w-4 h-4 text-amber-400" /> 100% Chilled Delivery
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <Clock className="w-4 h-4 text-red-400" /> Avg. 25 Mins
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-green-400" /> Hygiene & Brew Certified
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right Promo Box / Coupon Card */}
        <div className="w-full md:w-auto shrink-0">
          <div className={`p-5 rounded-2xl border shadow-xl relative overflow-hidden group ${
            isValentine
              ? 'bg-gradient-to-br from-[#2c091f] to-[#1d0515] border-rose-500/40 shadow-rose-950/40'
              : 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-amber-500/30 shadow-amber-500/10'
          }`}>
            <div className={`absolute top-0 right-0 text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 shadow ${
              isValentine ? 'bg-rose-600' : 'bg-red-600'
            }`}>
              {isValentine ? <Heart className="w-3 h-3 fill-current" /> : <Flame className="w-3 h-3 fill-current" />}
              <span>Save 25%</span>
            </div>

            <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${
              isValentine ? 'text-rose-300' : 'text-amber-400'
            }`}>
              {isValentine ? 'Date Night Promo' : 'Special Brew Promo'}
            </div>
            <div className="text-2xl font-black text-white">
              FLAT 25% OFF
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 max-w-[220px]">
              {isValentine
                ? 'On romantic couple combos & craft pours today!'
                : 'On all brewery combos and taproom favorites today!'}
            </p>

            <div className={`mt-4 flex items-center justify-between gap-3 p-2 rounded-xl border border-dashed ${
              isValentine
                ? 'bg-rose-950/60 border-rose-500/50'
                : 'bg-zinc-800/80 border-amber-500/40'
            }`}>
              <span className={`font-mono text-sm font-extrabold tracking-wider ${
                isValentine ? 'text-rose-300' : 'text-amber-300'
              }`}>
                {isValentine ? 'VALENTINE25' : 'HUNGRYBEER'}
              </span>
              <button
                onClick={() => onSelectOffer(isValentine ? 'VALENTINE25' : 'HUNGRYBEER')}
                className={`px-3 py-1 text-black text-xs font-black rounded-lg transition-transform active:scale-95 shadow ${
                  isValentine
                    ? 'bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-300 hover:to-pink-300'
                    : 'bg-amber-400 hover:bg-amber-300'
                }`}
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
