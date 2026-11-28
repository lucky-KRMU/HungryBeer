import React, { useState, useEffect, useRef } from 'react';
import { 
  Beer, 
  Flame, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Wine, 
  Users, 
  Gift, 
  Bike,
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export default function HeroBanner({ onSelectOffer, activeTab, theme }) {
  const isValentine = theme === 'valentine';
  const isLight = theme === 'light';

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);

  // Normal slides (Dark / Light)
  const defaultSlides = [
    {
      id: 'brewfest',
      tag: 'Weekend Brewfest & Feast is Live!',
      title: 'Fresh Craft Beers &',
      titleHighlight: 'Fiery Gourmet Bites',
      description: 'Smoky pulled pork to woodfired sourdough pizzas and microbrewed IPAs. Delivered ice cold & piping hot under 30 minutes!',
      badge: 'Save 25%',
      promoTitle: 'Special Brew Promo',
      offer: 'FLAT 25% OFF',
      offerSub: 'On all brewery combos and taproom favorites today!',
      code: 'HUNGRYBEER',
      bgImage: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=1400&auto=format&fit=crop&q=80',
      perks: [
        { icon: Beer, label: '100% Chilled Delivery', color: isLight ? 'text-amber-700' : 'text-amber-300' },
        { icon: Clock, label: 'Avg. 25 Mins', color: isLight ? 'text-red-700' : 'text-red-400' },
        { icon: ShieldCheck, label: 'Hygiene & Brew Certified', color: isLight ? 'text-emerald-700' : 'text-green-400' }
      ]
    },
    {
      id: 'drunch',
      tag: 'Sunday Drunch & Rooftop Taps',
      title: 'Unlimited Craft Pints &',
      titleHighlight: 'Smoked BBQ Grills',
      description: 'Pour fresh Belgian Witbiers and German Hefeweizens straight from the keg. Reserve prime weekend DJ-hour tables with zero wait.',
      badge: 'Save ₹50',
      promoTitle: 'Weekend Drunch Deal',
      offer: 'FLAT ₹50 OFF',
      offerSub: 'Valid on dine-in brewery slots and craft growler takeaways!',
      code: 'CHEERS50',
      bgImage: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1400&auto=format&fit=crop&q=80',
      perks: [
        { icon: Wine, label: 'Fresh Kegs on Tap', color: isLight ? 'text-amber-700' : 'text-amber-300' },
        { icon: Users, label: 'Prime Table Priority', color: isLight ? 'text-indigo-700' : 'text-blue-400' },
        { icon: Flame, label: 'Live Woodfired Grill', color: isLight ? 'text-orange-700' : 'text-amber-400' }
      ]
    },
    {
      id: 'latenight',
      tag: 'Open Till 3:00 AM • Indiranagar & CP',
      title: 'Midnight Cravings &',
      titleHighlight: 'Ice Cold Growlers',
      description: 'Crispy beer-battered wings, truffle smash burgers, and sealed growlers dispatched in under 20 mins with insulated thermal ice packs.',
      badge: 'Group Deal',
      promoTitle: 'Party Pack Savings',
      offer: 'FLAT ₹250 OFF',
      offerSub: 'Flat ₹250 savings on midnight orders over ₹1000!',
      code: 'PARTYPACK',
      bgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400&auto=format&fit=crop&q=80',
      perks: [
        { icon: Clock, label: 'Open Till 3:00 AM', color: isLight ? 'text-purple-700' : 'text-purple-400' },
        { icon: Bike, label: 'Thermal Pack Delivery', color: isLight ? 'text-emerald-700' : 'text-emerald-400' },
        { icon: Beer, label: 'Sealed Cold Growlers', color: isLight ? 'text-amber-700' : 'text-amber-300' }
      ]
    },
    {
      id: 'firstbrew',
      tag: 'New User VIP Welcome Pass',
      title: 'Join The Brew Club &',
      titleHighlight: 'Get 30% Off First Feast',
      description: 'Become a HungryBeer Club member for instant discounts, free delivery vouchers on all food & pints, and complimentary craft samplers.',
      badge: '30% OFF',
      promoTitle: 'Welcome Voucher',
      offer: 'UP TO ₹200 OFF',
      offerSub: 'Exclusive first-order discount for beer lovers & foodies',
      code: 'FIRSTBREW',
      bgImage: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=1400&auto=format&fit=crop&q=80',
      perks: [
        { icon: Gift, label: 'Free Sampler Pint', color: isLight ? 'text-amber-700' : 'text-amber-300' },
        { icon: Sparkles, label: 'VIP Club Rewards', color: isLight ? 'text-yellow-700' : 'text-yellow-400' },
        { icon: ShieldCheck, label: 'Contactless Safe Pour', color: isLight ? 'text-green-700' : 'text-green-400' }
      ]
    }
  ];

  // Romantic Valentine slides
  const valentineSlides = [
    {
      id: 'val-datenight',
      tag: 'Valentine Candlelight & Romantic Brews Special! 💖',
      title: 'Love & Craft Brews:',
      titleHighlight: 'Romantic Date Night Feast',
      description: 'Handcrafted strawberry witbiers, candlelit brewery booths, woodfired pizzas & artisanal chocolates for two. Celebrate romance!',
      badge: 'Save 25%',
      promoTitle: 'Date Night Promo',
      offer: 'FLAT 25% OFF',
      offerSub: 'On romantic couple combos & craft pours today!',
      code: 'VALENTINE25',
      bgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&auto=format&fit=crop&q=80',
      perks: [
        { icon: Wine, label: 'Rose & Craft Sangrias', color: 'text-rose-300' },
        { icon: Heart, label: 'Candlelight Tables for 2', color: 'text-pink-300' },
        { icon: Sparkles, label: 'Free Chocolate Dessert', color: 'text-amber-300' }
      ]
    },
    {
      id: 'val-candlelight',
      tag: 'Intimate Taproom Booths & Live Acoustic Jazz 🌹',
      title: 'Candlelit Booths &',
      titleHighlight: 'Fairy Light Dinners',
      description: 'Reserve private romantic taproom seating with two artisanal craft pints, chef-curated tapas platters, and warm candlelight ambiance.',
      badge: 'Couples Deal',
      promoTitle: 'Candlelight Drunch',
      offer: 'FLAT ₹50 OFF',
      offerSub: 'Includes complimentary rose petal craft pint on arrival',
      code: 'CHEERS50',
      bgImage: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1400&auto=format&fit=crop&q=80',
      perks: [
        { icon: Heart, label: 'Private Romantic Booths', color: 'text-rose-300' },
        { icon: Wine, label: 'Artisanal Brew Pairings', color: 'text-pink-300' },
        { icon: Clock, label: 'Reserved 2-Hour Slot', color: 'text-amber-300' }
      ]
    },
    {
      id: 'val-sweettreats',
      tag: 'Midnight Sweet & Hoppy Surprise 💋',
      title: 'Handcrafted Chocolates &',
      titleHighlight: 'Berry Wheat Ales',
      description: 'Pair chilled raspberry ales with warm chocolate lava cakes and gourmet woodfired delights delivered right to your romantic movie night.',
      badge: 'Party for 2',
      promoTitle: 'Sweet Romance Pack',
      offer: 'FLAT ₹250 OFF',
      offerSub: 'Save ₹250 on romantic feast bundles over ₹1000',
      code: 'PARTYPACK',
      bgImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1400&auto=format&fit=crop&q=80',
      perks: [
        { icon: Gift, label: 'Molten Cake Included', color: 'text-rose-300' },
        { icon: Beer, label: 'Strawberry Witbiers', color: 'text-pink-300' },
        { icon: Bike, label: 'Chilled 25-Min Delivery', color: 'text-amber-300' }
      ]
    }
  ];

  const slides = isValentine ? valentineSlides : defaultSlides;

  // Auto slide every 5 seconds (paused on hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  // Keep index valid when switching themes
  useEffect(() => {
    setCurrentSlide(0);
  }, [theme]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const slide = slides[currentSlide];

  return (
    <div 
      className={`relative overflow-hidden border-b transition-colors select-none ${
        isValentine
          ? 'bg-gradient-to-r from-[#200716] via-[#2a091d] to-[#18040f] border-rose-900/50'
          : isLight
          ? 'bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-red-50/40 border-amber-200/70 shadow-xs'
          : 'bg-gradient-to-r from-[#111317] via-[#181a20] to-[#120d0f] border-zinc-800/80'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background slide artwork with smooth cross-fade */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform scale-105 pointer-events-none opacity-15"
        style={{ backgroundImage: `url(${slide.bgImage})` }}
      ></div>

      {/* Decorative ambient glows */}
      <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isValentine ? 'bg-rose-600/20' : isLight ? 'bg-amber-400/25' : 'bg-amber-500/10'
      }`}></div>
      <div className={`absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isValentine ? 'bg-pink-500/20' : isLight ? 'bg-red-400/15' : 'bg-red-600/10'
      }`}></div>

      {/* Main Slide Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 min-h-[280px]">
          
          {/* Left Text Column */}
          <div className="max-w-2xl text-center md:text-left flex-1 animate-in fade-in duration-300 key={slide.id}">
            
            {/* Tag Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border shadow-xs transition-colors ${
              isValentine
                ? 'bg-rose-500/15 border-rose-400/40 text-rose-200'
                : isLight
                ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                : 'bg-amber-400/10 border-amber-400/30 text-amber-300'
            }`}>
              {isValentine ? (
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
              ) : (
                <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
              )}
              <span>{slide.tag}</span>
            </div>

            {/* Headline */}
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-['Cabinet_Grotesk',sans-serif] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {slide.title} <br className="hidden sm:inline" />
              <span className={`bg-clip-text text-transparent ${
                isValentine
                  ? 'bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300'
                  : isLight
                  ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600'
                  : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-red-500'
              }`}>
                {slide.titleHighlight}
              </span>
            </h1>

            {/* Subtext description */}
            <p className={`mt-2 text-sm sm:text-base leading-relaxed max-w-xl ${
              isLight ? 'text-slate-700 font-medium' : 'text-zinc-300'
            }`}>
              {slide.description}
            </p>

            {/* Quick Perks Row */}
            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold">
              {slide.perks.map((perk, i) => {
                const PerkIcon = perk.icon;
                return (
                  <span key={i} className={`flex items-center gap-1.5 ${perk.color}`}>
                    <PerkIcon className="w-4 h-4 shrink-0" />
                    <span>{perk.label}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right Promo Box / Coupon Card */}
          <div className="w-full md:w-auto shrink-0 animate-in fade-in zoom-in-95 duration-300">
            <div className={`p-5 rounded-2xl border shadow-xl relative overflow-hidden group transition-all duration-300 ${
              isValentine
                ? 'bg-gradient-to-br from-[#2c091f] to-[#1d0515] border-rose-500/40 shadow-rose-950/40'
                : isLight
                ? 'bg-white border-amber-300 shadow-md shadow-amber-500/10'
                : 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-amber-500/30 shadow-amber-500/10'
            }`}>
              {/* Badge */}
              <div className={`absolute top-0 right-0 text-white text-[11px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 shadow ${
                isValentine ? 'bg-rose-600' : 'bg-red-600'
              }`}>
                {isValentine ? <Heart className="w-3 h-3 fill-current" /> : <Flame className="w-3 h-3 fill-current" />}
                <span>{slide.badge}</span>
              </div>

              <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                isValentine ? 'text-rose-300' : isLight ? 'text-amber-600' : 'text-amber-400'
              }`}>
                {slide.promoTitle}
              </div>
              <div className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {slide.offer}
              </div>
              <p className={`text-xs mt-0.5 max-w-[220px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                {slide.offerSub}
              </p>

              {/* Coupon Box */}
              <div className={`mt-4 flex items-center justify-between gap-3 p-2 rounded-xl border border-dashed ${
                isValentine
                  ? 'bg-rose-950/60 border-rose-500/50'
                  : isLight
                  ? 'bg-amber-50/90 border-amber-300'
                  : 'bg-zinc-800/80 border-amber-500/40'
              }`}>
                <span className={`font-mono text-sm font-extrabold tracking-wider ${
                  isValentine ? 'text-rose-300' : isLight ? 'text-amber-700' : 'text-amber-300'
                }`}>
                  {slide.code}
                </span>
                <button
                  onClick={() => onSelectOffer(slide.code)}
                  className={`px-3 py-1 text-black text-xs font-black rounded-lg transition-transform active:scale-95 shadow ${
                    isValentine
                      ? 'bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-300 hover:to-pink-300'
                      : 'bg-amber-400 hover:bg-amber-300'
                  }`}
                  title="Apply coupon to cart"
                >
                  Apply Code
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Bottom Navigation Bar */}
        <div className="mt-6 pt-4 border-t border-zinc-800/40 flex items-center justify-between gap-4">
          
          {/* Slide counter & Pause Indicator */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold font-mono ${
              isValentine ? 'text-rose-400' : isLight ? 'text-slate-700' : 'text-amber-400'
            }`}>
              0{currentSlide + 1} <span className="opacity-40">/ 0{slides.length}</span>
            </span>
            {isHovered && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                isValentine ? 'bg-rose-950 text-rose-300' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-zinc-800 text-zinc-300'
              }`}>
                Paused
              </span>
            )}
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5">
            {slides.map((s, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? isValentine
                        ? 'w-7 bg-rose-500 shadow-sm shadow-rose-500/50'
                        : isLight
                        ? 'w-7 bg-amber-500 shadow-sm shadow-amber-500/50'
                        : 'w-7 bg-amber-400 shadow-sm shadow-amber-400/50'
                      : isLight
                      ? 'w-2 bg-slate-300 hover:bg-slate-400'
                      : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>

          {/* Left & Right Arrow Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className={`p-1.5 rounded-xl border transition-all active:scale-90 ${
                isValentine
                  ? 'bg-rose-950/60 border-rose-800 text-rose-300 hover:bg-rose-900/60'
                  : isLight
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
                  : 'bg-zinc-900/90 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }`}
              title="Previous slide"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className={`p-1.5 rounded-xl border transition-all active:scale-90 ${
                isValentine
                  ? 'bg-rose-950/60 border-rose-800 text-rose-300 hover:bg-rose-900/60'
                  : isLight
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
                  : 'bg-zinc-900/90 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }`}
              title="Next slide"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
