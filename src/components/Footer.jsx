import React from 'react';
import { Beer, Globe, Shield, Heart, Share2, MessageCircle, Send, Radio } from 'lucide-react';

export default function Footer({ theme }) {
  const isLight = theme === 'light';
  const isValentine = theme === 'valentine';

  return (
    <footer className={`border-t pt-14 pb-8 transition-colors ${
      isValentine
        ? 'bg-[#0f0209] text-rose-300/80 border-rose-950/80'
        : isLight
        ? 'bg-slate-100 text-slate-600 border-slate-200'
        : 'bg-black text-zinc-400 border-zinc-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Branding Row */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b gap-6 ${
          isValentine
            ? 'border-rose-950'
            : isLight
            ? 'border-slate-200'
            : 'border-zinc-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-red-600 shadow-md shadow-amber-500/20">
              <Beer className="w-6 h-6 text-black stroke-[2.2]" />
            </div>
            <div>
              <span className={`text-2xl font-black tracking-tight font-['Cabinet_Grotesk',sans-serif] flex items-center ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Hungry
                {isValentine && (
                  <span className="mx-1 text-xl animate-pulse select-none inline-block filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" role="img" aria-label="Kiss">
                    💋
                  </span>
                )}
                <span className={isValentine ? 'text-rose-400' : 'text-amber-500'}>Beer</span>
              </span>
              <p className={`text-xs ${isLight ? 'text-slate-500' : isValentine ? 'text-rose-300/70' : 'text-zinc-400'}`}>
                {isValentine ? 'Love, Craft Brews & Romantic Food Destination' : 'The Ultimate Food & Chilled Brews Destination'}
              </p>
            </div>
          </div>

          {/* Regional Pickers */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${
              isLight
                ? 'bg-white border-slate-200 text-slate-700 shadow-xs'
                : isValentine
                ? 'bg-[#1b0512] border-rose-900 text-rose-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300'
            }`}>
              <Globe className={`w-3.5 h-3.5 ${isValentine ? 'text-rose-400' : 'text-amber-500'}`} />
              <span>India (English)</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${
              isLight
                ? 'bg-white border-slate-200 text-slate-700 shadow-xs'
                : isValentine
                ? 'bg-[#1b0512] border-rose-900 text-rose-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300'
            }`}>
              <span>₹ INR</span>
            </div>
          </div>
        </div>

        {/* Links Grid (Zomato Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-10 text-xs">
          <div>
            <h4 className={`font-extrabold uppercase tracking-wider text-xs mb-3 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              About HungryBeer
            </h4>
            <ul className="space-y-2">
              <li><a href="#about" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Who We Are</a></li>
              <li><a href="#blog" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>The Hop Blog</a></li>
              <li><a href="#careers" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Careers & Brews</a></li>
              <li><a href="#press" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Report Fraud</a></li>
              <li><a href="#investor" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Investor Relations</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-extrabold uppercase tracking-wider text-xs mb-3 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Hungryverse
            </h4>
            <ul className="space-y-2">
              <li><a href="#zomato" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>HungryBeer Express</a></li>
              <li><a href="#blinkit" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>BrewPulse Taprooms</a></li>
              <li><a href="#feeding" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Responsible Drinking</a></li>
              <li><a href="#hyper" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Growler Exchange</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-extrabold uppercase tracking-wider text-xs mb-3 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              For Breweries & Restaurants
            </h4>
            <ul className="space-y-2">
              <li><a href="#partner" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Partner With Us</a></li>
              <li><a href="#apps" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Apps For You</a></li>
              <li><a href="#hygiene" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Craft Standards</a></li>
            </ul>
          </div>

          <div>
            <h4 className={`font-extrabold uppercase tracking-wider text-xs mb-3 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Learn More
            </h4>
            <ul className="space-y-2">
              <li><a href="#privacy" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Privacy Policy</a></li>
              <li><a href="#security" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Security</a></li>
              <li><a href="#terms" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Terms of Service</a></li>
              <li><a href="#help" className={`transition-colors ${isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}>Contact Support</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className={`font-extrabold uppercase tracking-wider text-xs mb-3 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Community & Social
            </h4>
            <div className="flex items-center gap-2 mb-4">
              <a href="#social" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-400 shadow-xs'
                  : isValentine
                  ? 'bg-[#1b0512] border-rose-900 text-rose-200 hover:text-rose-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-amber-400'
              }`} title="Social Hub">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#chat" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-400 shadow-xs'
                  : isValentine
                  ? 'bg-[#1b0512] border-rose-900 text-rose-200 hover:text-rose-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-amber-400'
              }`} title="Chat Community">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#channel" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-400 shadow-xs'
                  : isValentine
                  ? 'bg-[#1b0512] border-rose-900 text-rose-200 hover:text-rose-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-amber-400'
              }`} title="Beer Channel">
                <Send className="w-4 h-4" />
              </a>
              <a href="#radio" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-400 shadow-xs'
                  : isValentine
                  ? 'bg-[#1b0512] border-rose-900 text-rose-200 hover:text-rose-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-amber-400'
              }`} title="Brew Radio">
                <Radio className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-2">
              <div className={`p-2 rounded-xl border flex items-center gap-2 text-[11px] ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 shadow-xs'
                  : isValentine
                  ? 'bg-[#1b0512] border-rose-900 text-rose-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300'
              }`}>
                <div className="text-amber-500 font-bold">App Store</div>
                <span className={isLight ? 'text-slate-400' : 'text-zinc-500'}>•</span>
                <span>iOS Download</span>
              </div>
              <div className={`p-2 rounded-xl border flex items-center gap-2 text-[11px] ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 shadow-xs'
                  : isValentine
                  ? 'bg-[#1b0512] border-rose-900 text-rose-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300'
              }`}>
                <div className="text-amber-500 font-bold">Google Play</div>
                <span className={isLight ? 'text-slate-400' : 'text-zinc-500'}>•</span>
                <span>Android App</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className={`pt-6 border-t text-center md:text-left flex flex-col md:flex-row items-center justify-between text-[11px] gap-2 ${
          isLight ? 'border-slate-200 text-slate-500' : isValentine ? 'border-rose-950 text-rose-300/60' : 'border-zinc-900 text-zinc-500'
        }`}>
          <p>
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, and Privacy Policy. 
            All trademarks are properties of their respective owners. 2026 © HungryBeer™ Ltd. All rights reserved.
          </p>
          <p className="shrink-0 text-amber-600 font-medium">
            {isValentine ? '💖 Valentine Mode (Romantic) • Built with ReactJS' : isLight ? '☀️ Light Mode • Built with ReactJS' : 'Yellow, Black & Red Theme • Built with ReactJS'}
          </p>
        </div>

      </div>
    </footer>
  );
}
