import React from 'react';
import { Star, Beer, Heart, Clock, Flame, Utensils } from 'lucide-react';

export default function RestaurantCard({ 
  restaurant, 
  onSelectRestaurant, 
  isFavorite, 
  onToggleFavorite 
}) {
  return (
    <div 
      onClick={() => onSelectRestaurant(restaurant)}
      className="group bg-zinc-900/90 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-amber-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Image Section */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

        {/* Offer Ribbon (Zomato style in red/amber) */}
        {restaurant.offer && (
          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{restaurant.offer}</span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(restaurant.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-red-500 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Delivery Time Badge */}
        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-zinc-700/60 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{restaurant.deliveryTime}</span>
          <span className="text-zinc-400">•</span>
          <span className="text-zinc-300">{restaurant.distance}</span>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header row with name and rating badge */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-1">
              <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors truncate">
                {restaurant.name}
              </h3>
              {restaurant.hasBeer && (
                <span title="Craft Beer on Tap" className="shrink-0">
                  <Beer className="w-4 h-4 text-amber-400" />
                </span>
              )}
            </div>

            {/* Rating badge */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-xs font-black shadow shrink-0">
              <span>{restaurant.rating}</span>
              <Star className="w-3 h-3 fill-current" />
            </div>
          </div>

          {/* Cuisines & Price for two */}
          <div className="mt-1 flex items-center justify-between text-xs text-zinc-400">
            <p className="truncate max-w-[200px]">
              {restaurant.cuisines.join(', ')}
            </p>
            <span className="font-semibold text-zinc-300">
              ₹{restaurant.priceForTwo} for two
            </span>
          </div>

          {/* Tags */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {restaurant.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-800 text-amber-300/90 border border-zinc-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Featured dish footer bar */}
        <div className="mt-3.5 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-zinc-400 truncate max-w-[200px]">
            <Utensils className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate italic">{restaurant.featuredDish}</span>
          </div>

          <button className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-0.5">
            Order & Menu →
          </button>
        </div>
      </div>
    </div>
  );
}
