import React from 'react';
import { COLLECTIONS } from '../data/mockData';
import { ChevronRight, Award } from 'lucide-react';

export default function Collections({ onSelectCollection }) {
  return (
    <section className="py-8 border-b border-zinc-800/80 bg-[#0a0b0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Curated City Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Cabinet_Grotesk',sans-serif]">
              Collections
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Explore curated lists of top microbreweries, rooftop sundowners, and trendy pubs
            </p>
          </div>
          <button 
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors shrink-0"
          >
            All collections in your city <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection && onSelectCollection(col)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md uppercase tracking-wider">
                {col.tag}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {col.title}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-1 mt-1">
                  {col.subtitle}
                </p>
                <div className="mt-2 flex items-center text-xs font-semibold text-amber-400 gap-1">
                  <span>{col.places}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
