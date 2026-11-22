import React from 'react';
import { 
  SlidersHorizontal, 
  Star, 
  Beer, 
  Leaf, 
  Flame, 
  Zap, 
  ArrowUpDown, 
  X 
} from 'lucide-react';

export default function FilterBar({
  selectedFilter,
  setSelectedFilter,
  sortBy,
  setSortBy,
  beerOnly,
  setBeerOnly,
  vegOnly,
  setVegOnly,
  happyHourOnly,
  setHappyHourOnly,
  activeCount,
  onResetAll
}) {
  return (
    <div className="py-4 border-b border-zinc-800/80 bg-[#0d0f12] sticky top-20 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          
          {/* Main Filter Icon */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-xs font-semibold text-zinc-300 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeCount}
              </span>
            )}
          </div>

          {/* Beer on Tap Filter */}
          <button
            onClick={() => setBeerOnly(!beerOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              beerOnly
                ? 'bg-amber-400 text-black border border-amber-400 shadow-md shadow-amber-400/20'
                : 'border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-amber-400/50'
            }`}
          >
            <Beer className="w-3.5 h-3.5" />
            <span>Craft Beer on Tap</span>
          </button>

          {/* Rating 4.0+ */}
          <button
            onClick={() => setSelectedFilter(selectedFilter === 'rating' ? null : 'rating')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              selectedFilter === 'rating'
                ? 'bg-amber-400 text-black border border-amber-400 shadow-md'
                : 'border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-amber-400/50'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Rating: 4.5+</span>
          </button>

          {/* Pure Veg */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              vegOnly
                ? 'bg-emerald-500 text-black border border-emerald-500 shadow-md'
                : 'border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-emerald-400/50'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Pure Veg</span>
          </button>

          {/* Happy Hours */}
          <button
            onClick={() => setHappyHourOnly(!happyHourOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              happyHourOnly
                ? 'bg-red-600 text-white border border-red-600 shadow-md'
                : 'border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-red-400/50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Happy Hours</span>
          </button>

          {/* Express Delivery */}
          <button
            onClick={() => setSelectedFilter(selectedFilter === 'express' ? null : 'express')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              selectedFilter === 'express'
                ? 'bg-amber-400 text-black border border-amber-400 shadow-md'
                : 'border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-amber-400/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Express (&lt;25m)</span>
          </button>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-700 bg-zinc-900 text-xs font-semibold text-zinc-300 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer py-0.5"
            >
              <option value="popularity" className="bg-zinc-900 text-white">Popularity</option>
              <option value="rating" className="bg-zinc-900 text-white">Rating: High to Low</option>
              <option value="cost_asc" className="bg-zinc-900 text-white">Cost: Low to High</option>
              <option value="cost_desc" className="bg-zinc-900 text-white">Cost: High to Low</option>
              <option value="delivery_time" className="bg-zinc-900 text-white">Fastest Delivery</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {activeCount > 0 && (
            <button
              onClick={onResetAll}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/60 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
