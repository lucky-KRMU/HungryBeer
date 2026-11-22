import React from 'react';
import { Beer, Globe, Shield, Heart, Share2, MessageCircle, Send, Radio } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-800/80 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Branding Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-zinc-800 gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-red-600 shadow-md shadow-amber-500/20">
              <Beer className="w-6 h-6 text-black stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white font-['Cabinet_Grotesk',sans-serif]">
                Hungry<span className="text-amber-400">Beer</span>
              </span>
              <p className="text-xs text-zinc-400">The Ultimate Food & Chilled Brews Destination</p>
            </div>
          </div>

          {/* Regional Pickers */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>India (English)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <span>₹ INR</span>
            </div>
          </div>
        </div>

        {/* Links Grid (Zomato Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-10 text-xs">
          <div>
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs mb-3">
              About HungryBeer
            </h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-amber-400 transition-colors">Who We Are</a></li>
              <li><a href="#blog" className="hover:text-amber-400 transition-colors">The Hop Blog</a></li>
              <li><a href="#careers" className="hover:text-amber-400 transition-colors">Careers & Brews</a></li>
              <li><a href="#press" className="hover:text-amber-400 transition-colors">Report Fraud</a></li>
              <li><a href="#investor" className="hover:text-amber-400 transition-colors">Investor Relations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs mb-3">
              Hungryverse
            </h4>
            <ul className="space-y-2">
              <li><a href="#zomato" className="hover:text-amber-400 transition-colors">HungryBeer Express</a></li>
              <li><a href="#blinkit" className="hover:text-amber-400 transition-colors">BrewPulse Taprooms</a></li>
              <li><a href="#feeding" className="hover:text-amber-400 transition-colors">Responsible Drinking</a></li>
              <li><a href="#hyper" className="hover:text-amber-400 transition-colors">Growler Exchange</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs mb-3">
              For Breweries & Restaurants
            </h4>
            <ul className="space-y-2">
              <li><a href="#partner" className="hover:text-amber-400 transition-colors">Partner With Us</a></li>
              <li><a href="#apps" className="hover:text-amber-400 transition-colors">Apps For You</a></li>
              <li><a href="#hygiene" className="hover:text-amber-400 transition-colors">Craft Standards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs mb-3">
              Learn More
            </h4>
            <ul className="space-y-2">
              <li><a href="#privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#security" className="hover:text-amber-400 transition-colors">Security</a></li>
              <li><a href="#terms" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
              <li><a href="#help" className="hover:text-amber-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs mb-3">
              Community & Social
            </h4>
            <div className="flex items-center gap-2 mb-4">
              <a href="#social" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 transition-colors" title="Social Hub">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#chat" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 transition-colors" title="Chat Community">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#channel" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 transition-colors" title="Beer Channel">
                <Send className="w-4 h-4" />
              </a>
              <a href="#radio" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 transition-colors" title="Brew Radio">
                <Radio className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2 text-[11px] text-zinc-300">
                <div className="text-amber-400 font-bold">App Store</div>
                <span className="text-zinc-500">•</span>
                <span>iOS Download</span>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2 text-[11px] text-zinc-300">
                <div className="text-amber-400 font-bold">Google Play</div>
                <span className="text-zinc-500">•</span>
                <span>Android App</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 border-t border-zinc-900 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-zinc-500 text-[11px] gap-2">
          <p>
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, and Privacy Policy. 
            All trademarks are properties of their respective owners. 2026 © HungryBeer™ Ltd. All rights reserved.
          </p>
          <p className="shrink-0 text-amber-500/80 font-medium">
            Yellow, Black & Red Theme • Built with ReactJS
          </p>
        </div>

      </div>
    </footer>
  );
}

