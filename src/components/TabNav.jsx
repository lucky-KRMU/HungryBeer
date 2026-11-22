import React from 'react';
import { Bike, UtensilsCrossed, Wine } from 'lucide-react';

export const TABS = [
  {
    id: 'delivery',
    label: 'Delivery',
    subtitle: 'Chilled brews & hot food to your door',
    icon: Bike,
    color: 'amber'
  },
  {
    id: 'dining',
    label: 'Dining Out',
    subtitle: 'Explore microbreweries & taprooms',
    icon: UtensilsCrossed,
    color: 'yellow'
  },
  {
    id: 'nightlife',
    label: 'Nightlife & Pubs',
    subtitle: 'Live music, DJ nights & craft beer',
    icon: Wine,
    color: 'red'
  }
];

export default function TabNav({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-zinc-800 bg-[#0d0f12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 sm:gap-12 overflow-x-auto no-scrollbar py-3">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-3.5 pb-2 transition-all relative shrink-0 ${
                  isActive ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-gray-200'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-400 ring-2 ring-amber-400/80 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-zinc-800/80 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-amber-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="text-left">
                  <div className="text-base sm:text-lg tracking-tight font-semibold flex items-center gap-1.5">
                    {tab.label}
                    {tab.id === 'nightlife' && (
                      <span className="text-[10px] bg-red-600/90 text-white font-bold px-1.5 py-0.2 rounded-full uppercase">
                        Hot
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400 hidden sm:block font-normal">
                    {tab.subtitle}
                  </div>
                </div>

                {/* Active Tab Underline */}
                {isActive && (
                  <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-red-500 rounded-t-full shadow-[0_-2px_10px_rgba(245,158,11,0.5)]"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
