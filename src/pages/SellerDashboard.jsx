import React, { useState } from 'react';
import { 
  Beer, 
  Store, 
  ShoppingBag, 
  Calendar, 
  TrendingUp, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Power, 
  Trash2, 
  Edit3, 
  ArrowLeft,
  DollarSign,
  Users,
  Star,
  Check,
  X,
  LogOut
} from 'lucide-react';

export default function SellerDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'menu' | 'tables' | 'analytics' | 'profile'
  const [isOpen, setIsOpen] = useState(true);

  // Simulated initial seller orders
  const [orders, setOrders] = useState([
    {
      id: 'HB-94821',
      buyerName: 'Rohan Sharma',
      buyerPhone: '+91 98765 43210',
      items: [
        { name: 'Belgian Golden Witbier (500ml Growler)', quantity: 2, price: 360, isBeer: true },
        { name: 'Truffle Cheddar Smashed Burger', quantity: 1, price: 420, isBeer: false }
      ],
      total: 1150,
      status: 'Preparing',
      address: 'Apartment 4B, Emerald Heights, Ring Road',
      time: '12 mins ago'
    },
    {
      id: 'HB-68192',
      buyerName: 'Priya Verma',
      buyerPhone: '+91 98765 11223',
      items: [
        { name: 'Hoppy Sunset IPA (500ml Growler)', quantity: 1, price: 390, isBeer: true },
        { name: 'Beer-Battered Buffalo Hot Wings', quantity: 1, price: 340, isBeer: false }
      ],
      total: 780,
      status: 'Accepted',
      address: 'Villa 12, Palm Meadows, Indiranagar',
      time: '24 mins ago'
    },
    {
      id: 'HB-38291',
      buyerName: 'Amit Kapoor',
      buyerPhone: '+91 98765 77889',
      items: [
        { name: 'Texas Smoked BBQ Chicken Platter', quantity: 1, price: 490, isBeer: false }
      ],
      total: 530,
      status: 'Delivered',
      address: 'Tower C, Cyber Gateway',
      time: '1 hour ago'
    }
  ]);

  // Seller menu items
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Belgian Golden Witbier (500ml Growler)', category: 'Signature Brews', price: 360, isVeg: true, isBeer: true, inStock: true },
    { id: 2, name: 'Hoppy Sunset IPA (500ml Growler)', category: 'Signature Brews', price: 390, isVeg: true, isBeer: true, inStock: true },
    { id: 3, name: 'Beer-Battered Buffalo Hot Wings', category: 'Starters & Wings', price: 340, isVeg: false, isBeer: false, inStock: true },
    { id: 4, name: 'Truffle Cheddar Smashed Burger', category: 'Gourmet Burgers', price: 420, isVeg: false, isBeer: false, inStock: true },
    { id: 5, name: 'Cheesy Garlic Pull-Apart Loaf', category: 'Starters & Wings', price: 260, isVeg: true, isBeer: false, inStock: false },
  ]);

  // Table bookings
  const [tableBookings, setTableBookings] = useState([
    { id: 'HB-TBL-89123', guestName: 'Kunal Singhal', phone: '+91 98765 55443', guests: '4 Guests', time: 'Today, 8:30 PM (Prime DJ Hour)', status: 'Confirmed' },
    { id: 'HB-TBL-45192', guestName: 'Aarav Malhotra', phone: '+91 98765 33221', guests: '2 Guests', time: 'Today, 9:30 PM (Late Night Brews)', status: 'Confirmed' },
    { id: 'HB-TBL-12984', guestName: 'Meera Iyer', phone: '+91 98765 99881', guests: '6 Guests', time: 'Tomorrow, 1:00 PM (Sunday Drunch)', status: 'Completed' },
  ]);

  // New Menu Item Modal form state
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Signature Brews',
    price: '',
    isBeer: true,
    isVeg: true
  });

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleToggleStock = (itemId) => {
    setMenuItems(prev => prev.map(item => item.id === itemId ? { ...item, inStock: !item.inStock } : item));
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    setMenuItems(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newItem.name,
        category: newItem.category,
        price: Number(newItem.price),
        isVeg: newItem.isVeg,
        isBeer: newItem.isBeer,
        inStock: true
      }
    ]);
    setShowAddItemModal(false);
    setNewItem({ name: '', category: 'Signature Brews', price: '', isBeer: true, isVeg: true });
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-gray-100 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col">
      
      {/* Top Seller Bar */}
      <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-red-600 flex items-center justify-center shadow-md shadow-amber-500/20 text-black">
            <Store className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base text-white font-['Cabinet_Grotesk',sans-serif]">The Hoppy Keg Taproom</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-400 font-extrabold px-2 py-0.5 rounded-full border border-amber-500/30">
                Seller Portal
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">
              Partner: {user?.name || user?.email || 'Authorized Brewery'} • Connaught Place, Central Delhi
            </span>
          </div>
        </div>

        {/* Right Status Switch & Logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              isOpen 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                : 'bg-red-500/20 text-red-400 border border-red-500/40'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isOpen ? 'Taproom OPEN' : 'Taproom CLOSED'}</span>
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 border border-zinc-700 hover:border-red-500/30 text-xs font-bold transition-all"
              title="Log Out of Seller Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'orders'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Live Kitchen Orders ({orders.filter(o => o.status !== 'Delivered').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'menu'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Beer className="w-4 h-4" />
            <span>Craft Beers & Menu ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tables')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'tables'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Table Reservations ({tableBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'analytics'
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Sales & Analytics</span>
          </button>
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">Incoming Customer Orders</h3>
                <p className="text-xs text-zinc-400">Accept, prepare, and dispatch orders for delivery riders</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div>
                        <span className="font-mono text-xs font-black text-amber-400">#{order.id}</span>
                        <div className="text-xs font-bold text-white mt-0.5">{order.buyerName}</div>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                        order.status === 'Placed' ? 'bg-yellow-500/20 text-yellow-400' :
                        order.status === 'Accepted' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'Preparing' ? 'bg-amber-500/20 text-amber-400' :
                        order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-zinc-800 text-zinc-300'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="py-3 space-y-1.5 text-xs">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-zinc-300">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-semibold text-white">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                      <div>📍 {order.address}</div>
                      <div>⏱️ {order.time}</div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-amber-400">Total: ₹{order.total}</span>
                    
                    <div className="flex items-center gap-1.5">
                      {order.status === 'Placed' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Accepted')}
                          className="px-3 py-1 bg-amber-400 text-black font-extrabold text-xs rounded-lg hover:bg-amber-300"
                        >
                          Accept
                        </button>
                      )}
                      {order.status === 'Accepted' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Preparing')}
                          className="px-3 py-1 bg-amber-500 text-black font-extrabold text-xs rounded-lg hover:bg-amber-400"
                        >
                          Start Prep
                        </button>
                      )}
                      {order.status === 'Preparing' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                          className="px-3 py-1 bg-emerald-500 text-black font-extrabold text-xs rounded-lg hover:bg-emerald-400"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {order.status === 'Delivered' && (
                        <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Menu Management */}
        {activeTab === 'menu' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">Craft Brews & Kitchen Menu</h3>
                <p className="text-xs text-zinc-400">Manage tap items, toggle live stock status, and add seasonal brews</p>
              </div>

              <button
                onClick={() => setShowAddItemModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-black uppercase tracking-wider hover:from-amber-300 hover:to-amber-400 shadow"
              >
                <Plus className="w-4 h-4" /> Add Brew or Dish
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-zinc-800 text-amber-300 uppercase">
                            {item.category}
                          </span>
                          {item.isBeer && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-600/20 text-red-400 uppercase flex items-center gap-0.5">
                              <Beer className="w-2.5 h-2.5" /> Brew
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-white">{item.name}</h4>
                      </div>

                      <span className="text-sm font-black text-amber-400 shrink-0">₹{item.price}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleStock(item.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        item.inStock
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {item.inStock ? '● In Stock' : '○ Sold Out'}
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Table Bookings */}
        {activeTab === 'tables' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">Brewery Table Reservations</h3>
              <p className="text-xs text-zinc-400">View guest seating requests and confirm brewery slots</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950 text-zinc-400 font-bold border-b border-zinc-800">
                  <tr>
                    <th className="p-3.5">Booking ID</th>
                    <th className="p-3.5">Guest</th>
                    <th className="p-3.5">Party Size</th>
                    <th className="p-3.5">Time Slot</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {tableBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="p-3.5 font-mono text-amber-400 font-bold">{b.id}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-white">{b.guestName}</div>
                        <div className="text-[11px] text-zinc-400">{b.phone}</div>
                      </td>
                      <td className="p-3.5 text-zinc-300 font-medium">{b.guests}</td>
                      <td className="p-3.5 text-zinc-300">{b.time}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-300'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">Taproom & Kitchen Analytics</h3>
              <p className="text-xs text-zinc-400">Summary of sales, delivery orders, and customer ratings</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Sales Revenue</div>
                <div className="text-3xl font-black text-amber-400 mt-1">₹48,920</div>
                <div className="text-[11px] text-emerald-400 mt-1 font-semibold">+18.5% this week</div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Completed Orders</div>
                <div className="text-3xl font-black text-white mt-1">142</div>
                <div className="text-[11px] text-zinc-400 mt-1">Express Avg: 24 mins</div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Table Guests Served</div>
                <div className="text-3xl font-black text-white mt-1">68</div>
                <div className="text-[11px] text-zinc-400 mt-1">Weekend tables 95% full</div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Customer Rating</div>
                <div className="text-3xl font-black text-emerald-400 mt-1 flex items-center gap-1">
                  4.8 <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">Based on 240+ reviews</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add Menu Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-black text-white text-base">Add New Brew or Dish</h4>
              <button onClick={() => setShowAddItemModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMenuItem} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Roasted Stout (500ml Growler)"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option>Signature Brews</option>
                  <option>Starters & Wings</option>
                  <option>Woodfired Pizzas</option>
                  <option>Gourmet Burgers</option>
                  <option>Mains & Combos</option>
                  <option>Biryani Handis</option>
                  <option>Desserts & Bakes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Price (₹ INR)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 380"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.isBeer}
                    onChange={(e) => setNewItem({ ...newItem, isBeer: e.target.checked })}
                    className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-amber-400"
                  />
                  <span>Is Craft Beer / Brew</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.isVeg}
                    onChange={(e) => setNewItem({ ...newItem, isVeg: e.target.checked })}
                    className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-amber-400"
                  />
                  <span>Vegetarian</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black bg-amber-400 text-black hover:bg-amber-300 shadow"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
