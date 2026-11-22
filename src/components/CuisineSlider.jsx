import React from 'react';
import { CUISINES } from '../data/mockData';

export default function CuisineSlider({ selectedCuisine, onSelectCuisine }) {
  return (
    <section className="py-8 border-b border-zinc-800/80 bg-[#0d0f12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Cabinet_Grotesk',sans-serif]">
              Inspiration for your order
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Explore mouthwatering pairings and artisanal brews
            </p>
          </div>
          {selectedCuisine && (
            <button
              onClick={() => onSelectCuisine(null)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline"
            >
              Show all cuisines
            </button>
          )}
        </div>

        {/* Carousel Row */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
          {CUISINES.map((item) => {
            const isSelected = selectedCuisine === item.name;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCuisine(isSelected ? null : item.name)}
                className="flex flex-col items-center group text-center focus:outline-none"
              >
                <div 
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden p-1 transition-all duration-300 ${
                    isSelected 
                      ? 'ring-4 ring-amber-400 shadow-lg shadow-amber-400/30 scale-105' 
                      : 'hover:ring-2 hover:ring-amber-400/60 group-hover:scale-105'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-full group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <span className={`mt-2 text-xs sm:text-sm font-semibold tracking-tight transition-colors line-clamp-1 ${
                  isSelected ? 'text-amber-400 font-bold' : 'text-gray-300 group-hover:text-amber-300'
                }`}>
                  {item.name}
                </span>
                <span className="text-[10px] text-zinc-400">
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
