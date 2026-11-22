import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import TabNav from './components/TabNav';
import HeroBanner from './components/HeroBanner';
import CuisineSlider from './components/CuisineSlider';
import Collections from './components/Collections';
import FilterBar from './components/FilterBar';
import RestaurantCard from './components/RestaurantCard';
import RestaurantModal from './components/RestaurantModal';
import CartDrawer from './components/CartDrawer';
import OrderSuccessModal from './components/OrderSuccessModal';
import AuthModal from './components/AuthModal';
import AuthPage from './pages/AuthPage';
import SellerDashboard from './pages/SellerDashboard';
import Footer from './components/Footer';
import { api, setAuthToken } from './services/api';
import { LOCATIONS, RESTAURANTS, PROMO_COUPONS } from './data/mockData';
import { Beer, Search, RotateCcw, Sparkles } from 'lucide-react';

export default function App() {
  // Page Navigation ('home' | 'login' | 'signup')
  const [currentPage, setCurrentPage] = useState('home');

  // User state restored from MongoDB backend
  const [user, setUser] = useState(null);

  // Restore authenticated session from backend on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('hungrybeer_token');
      if (token) {
        try {
          const res = await api.auth.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            setAuthToken(null);
          }
        } catch (err) {
          console.warn('Could not restore user from backend:', err.message);
        }
      }
    };
    fetchUser();
  }, []);

  // Navigation & Location
  const [activeTab, setActiveTab] = useState('delivery'); // 'delivery' | 'dining' | 'nightlife'
  const [currentLocation, setCurrentLocation] = useState(LOCATIONS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  // Sync hash routing for login / signup / seller
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'login' || hash === 'signup' || hash === 'seller') {
        setCurrentPage(hash);
      } else if (!hash && (currentPage === 'login' || currentPage === 'signup' || currentPage === 'seller')) {
        setCurrentPage('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filters
  const [beerOnly, setBeerOnly] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [happyHourOnly, setHappyHourOnly] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null); // 'rating' | 'express'
  const [sortBy, setSortBy] = useState('popularity');

  // Favorites
  const [favorites, setFavorites] = useState(['hb-1', 'hb-3']);

  // Modals & Drawers
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  // Cart State
  const [cartItems, setCartItems] = useState([
    {
      id: 'm1',
      name: 'Belgian Golden Witbier (500ml Growler)',
      price: 360,
      quantity: 1,
      isVeg: true,
      restaurantId: 'hb-1'
    },
    {
      id: 'm4',
      name: 'Truffle Cheddar Smashed Burger',
      price: 420,
      quantity: 1,
      isVeg: false,
      restaurantId: 'hb-1'
    }
  ]);
  const [cartRestaurant, setCartRestaurant] = useState(RESTAURANTS[0]);

  // Toggle favorite
  const handleToggleFavorite = (restId) => {
    setFavorites((prev) =>
      prev.includes(restId) ? prev.filter((id) => id !== restId) : [...prev, restId]
    );
  };

  // Add item to cart
  const handleAddToCart = (item, rest) => {
    // If cart has items from different restaurant, confirm switch
    if (cartRestaurant && cartRestaurant.id !== rest.id && cartItems.length > 0) {
      if (
        window.confirm(
          `Your cart contains items from ${cartRestaurant.name}. Discard and start a new order from ${rest.name}?`
        )
      ) {
        setCartRestaurant(rest);
        setCartItems([{ ...item, quantity: 1, restaurantId: rest.id }]);
      }
      return;
    }

    setCartRestaurant(rest);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1, restaurantId: rest.id }];
    });
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = (details) => {
    setIsCartOpen(false);
    setOrderSuccessData(details);
    setCartItems([]);
  };

  const handleSelectOffer = (code) => {
    setIsCartOpen(true);
  };

  // Active filter count
  const activeCount = [
    beerOnly,
    vegOnly,
    happyHourOnly,
    selectedFilter !== null,
    selectedCuisine !== null,
    sortBy !== 'popularity'
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setBeerOnly(false);
    setVegOnly(false);
    setHappyHourOnly(false);
    setSelectedFilter(null);
    setSelectedCuisine(null);
    setSortBy('popularity');
    setSearchQuery('');
  };

  // Filtered & Sorted Restaurants
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((rest) => {
      // Tab check
      if (activeTab === 'dining' && !rest.isDining) return false;
      if (activeTab === 'nightlife' && !rest.isNightlife) return false;

      // Beer filter
      if (beerOnly && !rest.hasBeer) return false;

      // Veg filter
      if (vegOnly && !rest.isVeg) return false;

      // Happy hour filter
      if (happyHourOnly && !rest.hasHappyHour) return false;

      // Rating filter
      if (selectedFilter === 'rating' && rest.rating < 4.7) return false;

      // Express filter
      if (selectedFilter === 'express' && !rest.isExpress) return false;

      // Cuisine bubble filter
      if (selectedCuisine) {
        const matchesCuisine = rest.cuisines.some((c) =>
          c.toLowerCase().includes(selectedCuisine.toLowerCase().split(' ')[0])
        );
        const matchesDish = rest.featuredDish.toLowerCase().includes(selectedCuisine.toLowerCase().split(' ')[0]);
        if (!matchesCuisine && !matchesDish) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = rest.name.toLowerCase().includes(q);
        const inCuisines = rest.cuisines.some((c) => c.toLowerCase().includes(q));
        const inDish = rest.featuredDish.toLowerCase().includes(q);
        const inMenu = rest.menu.some(
          (m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
        );
        if (!inName && !inCuisines && !inDish && !inMenu) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'cost_asc') return a.priceForTwo - b.priceForTwo;
      if (sortBy === 'cost_desc') return b.priceForTwo - a.priceForTwo;
      if (sortBy === 'delivery_time') {
        const timeA = parseInt(a.deliveryTime);
        const timeB = parseInt(b.deliveryTime);
        return timeA - timeB;
      }
      return 0; // popularity / default
    });
  }, [
    activeTab,
    beerOnly,
    vegOnly,
    happyHourOnly,
    selectedFilter,
    selectedCuisine,
    searchQuery,
    sortBy
  ]);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Dedicated Login / Sign-up Page
  if (currentPage === 'login' || currentPage === 'signup') {
    return (
      <AuthPage
        initialMode={currentPage}
        onBackToHome={() => navigateTo('home')}
        onLoginSuccess={(userData) => {
          setUser(userData);
          navigateTo('home');
        }}
      />
    );
  }

  // Dedicated Seller Portal
  if (currentPage === 'seller') {
    return <SellerDashboard onBackToBuyer={() => navigateTo('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#0d0f12] text-gray-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. Global Navbar */}
      <Navbar
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={(mode) => navigateTo(mode)}
        user={user}
        onLogout={() => {
          setUser(null);
          setAuthToken(null);
        }}
      />

      {/* 2. Zomato Tab Navigation (Delivery, Dining Out, Nightlife) */}
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Hero Promo Banner */}
      <HeroBanner onSelectOffer={handleSelectOffer} activeTab={activeTab} />

      {/* 4. Collections Section (Featured in Dining & Nightlife or top overview) */}
      {(activeTab === 'dining' || activeTab === 'nightlife') && (
        <Collections onSelectCollection={(col) => setSearchQuery(col.title.split(' ')[0])} />
      )}

      {/* 5. Cuisine Inspiration Bubbles (Featured mostly in Delivery) */}
      {activeTab === 'delivery' && (
        <CuisineSlider
          selectedCuisine={selectedCuisine}
          onSelectCuisine={setSelectedCuisine}
        />
      )}

      {/* 6. Interactive Filter Bar */}
      <FilterBar
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        beerOnly={beerOnly}
        setBeerOnly={setBeerOnly}
        vegOnly={vegOnly}
        setVegOnly={setVegOnly}
        happyHourOnly={happyHourOnly}
        setHappyHourOnly={setHappyHourOnly}
        activeCount={activeCount}
        onResetAll={handleResetFilters}
      />

      {/* 7. Main Restaurant Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Section Heading & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-3 border-b border-zinc-800/60 mb-6">
          <div>
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
              {currentLocation.name}, {currentLocation.city}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
              {activeTab === 'delivery' && `Craft Brews & Food Delivery in ${currentLocation.name}`}
              {activeTab === 'dining' && `Dine-in Microbreweries & Taprooms in ${currentLocation.name}`}
              {activeTab === 'nightlife' && `Nightlife, Pubs & DJ Lounges in ${currentLocation.name}`}
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Showing {filteredRestaurants.length} premium brewery kitchens & dining spots
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs text-zinc-300">
            <Beer className="w-3.5 h-3.5 text-amber-400" />
            <span>Pints on Tap: <strong>48+</strong></span>
            <span className="text-zinc-600">|</span>
            <span className="text-emerald-400 font-bold">Fast Delivery Active</span>
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSelectRestaurant={(rest) => setSelectedRestaurant(rest)}
                isFavorite={favorites.includes(restaurant.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center bg-zinc-900/40 rounded-3xl border border-zinc-800 p-8 my-6">
            <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto mb-4 text-zinc-500">
              <Search className="w-8 h-8 text-amber-500/50" />
            </div>
            <h3 className="text-xl font-black text-white">No spots found matching your filter</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or clear filters to see all available craft taprooms and food kitchens.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-black rounded-xl shadow transition-transform active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
            </button>
          </div>
        )}

        {/* Delivery / Nightlife Collection Banner (if in delivery tab) */}
        {activeTab === 'delivery' && (
          <div className="mt-14">
            <Collections onSelectCollection={(col) => setSearchQuery(col.title.split(' ')[0])} />
          </div>
        )}

      </main>

      {/* 8. Modals & Drawers */}
      
      {/* Restaurant Detail Modal */}
      {selectedRestaurant && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        restaurant={cartRestaurant}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      {/* Order Confirmed & Tracking Modal */}
      {orderSuccessData && (
        <OrderSuccessModal
          orderDetails={orderSuccessData}
          onClose={() => setOrderSuccessData(null)}
          restaurant={cartRestaurant}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        onLoginSuccess={(userData) => setUser(userData)}
      />

      {/* 9. Mega Footer */}
      <Footer />

    </div>
  );
}
