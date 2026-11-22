import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  Bike, 
  ShoppingBag, 
  Beer, 
  Check, 
  MapPin, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { PROMO_COUPONS } from '../data/mockData';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  restaurant,
  onUpdateQuantity,
  onClearCart,
  onCheckout
}) {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('Ring bell & leave at door');

  if (!isOpen) return null;

  // Calculate Subtotal
  const itemTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Delivery fee calculation (Free above ₹400)
  const deliveryFee = itemTotal >= 400 || itemTotal === 0 ? 0 : 40;
  const platformFee = itemTotal > 0 ? 10 : 0;
  const taxes = Math.round(itemTotal * 0.05);

  // Calculate Coupon discount
  let discount = 0;
  if (appliedCoupon && itemTotal >= (appliedCoupon.minOrder || 0)) {
    if (appliedCoupon.flatDiscount) {
      discount = appliedCoupon.flatDiscount;
    } else if (appliedCoupon.discountPercent) {
      discount = Math.min(
        Math.round((itemTotal * appliedCoupon.discountPercent) / 100),
        appliedCoupon.maxDiscount || 999
      );
    }
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + platformFee + taxes - discount);

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    const found = PROMO_COUPONS.find(c => c.code === code);
    if (!found) {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
      return;
    }
    if (itemTotal < (found.minOrder || 0)) {
      setCouponError(`Min order of ₹${found.minOrder} required for this coupon`);
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(found);
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl relative">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Your Cart</h3>
              {restaurant && (
                <p className="text-xs text-zinc-400 truncate max-w-[200px]">
                  From: <span className="text-amber-400 font-semibold">{restaurant.name}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-zinc-400 hover:text-red-400 p-1 flex items-center gap-1 transition-colors"
                title="Clear Cart"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
              <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-600">
                <Beer className="w-10 h-10 text-amber-500/40" />
              </div>
              <h4 className="text-lg font-bold text-white">Your cart is thirsty!</h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-[220px]">
                Add fresh craft brews, crispy wings, and mouthwatering burgers to begin.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider shadow"
              >
                Explore Restaurants
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Items Ordered ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                </div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-3 h-3 rounded-xs border flex items-center justify-center ${
                            item.isVeg ? 'border-emerald-500' : 'border-red-600'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.isVeg ? 'bg-emerald-500' : 'bg-red-600'
                            }`}
                          ></span>
                        </span>
                        <span className="font-semibold text-sm text-white line-clamp-1">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-xs text-amber-400 font-bold mt-0.5">
                        ₹{item.price * item.quantity}
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-zinc-400 font-normal ml-1">
                            (₹{item.price} each)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-zinc-950 border border-zinc-700 text-xs font-bold">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-3 text-center text-amber-400">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address & Instructions */}
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                <div className="flex items-center gap-2 text-zinc-200 font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>Delivery Address</span>
                </div>
                <p className="text-zinc-400 text-xs">
                  Apartment 4B, Emerald Heights, Central Ring Road
                </p>
                <div className="mt-2 pt-2 border-t border-zinc-800">
                  <input
                    type="text"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder="Add delivery instruction (e.g. Leave with guard)"
                    className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 text-zinc-200 placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Promo Coupon Section */}
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" /> Offers & Coupons
                  </span>
                  {appliedCoupon && (
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-[11px] text-red-400 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="bg-emerald-950/40 border border-emerald-600/50 rounded-xl p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-extrabold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> '{appliedCoupon.code}' Applied!
                      </div>
                      <div className="text-[11px] text-emerald-300/80">
                        You saved ₹{discount} with this coupon!
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-lg transition-colors"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {couponError}
                      </p>
                    )}

                    {/* Quick Suggest Coupons */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {PROMO_COUPONS.slice(0, 3).map((cpn) => (
                        <button
                          key={cpn.code}
                          onClick={() => handleApplyCoupon(cpn.code)}
                          className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-dashed border-amber-500/40 hover:bg-amber-400/20 transition-colors"
                        >
                          {cpn.code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bill Details */}
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
                <div className="font-bold text-zinc-300 mb-1">Bill Summary</div>
                
                <div className="flex justify-between text-zinc-400">
                  <span>Item Total</span>
                  <span className="text-zinc-200">₹{itemTotal}</span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Bike className="w-3 h-3 text-amber-400" /> Delivery Partner Fee
                  </span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>Restaurant Packaging & Platform</span>
                  <span>₹{platformFee}</span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>Govt. Taxes & GST (5%)</span>
                  <span>₹{taxes}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-zinc-800">
                    <span>Coupon Savings</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-zinc-700/80">
                  <span>Grand Total</span>
                  <span className="text-amber-400 text-base">₹{grandTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer / Place Order Bar */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-zinc-900 border-t border-zinc-800">
            <button
              onClick={() => onCheckout({ grandTotal, discount, deliveryNote, appliedCoupon })}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-red-600 hover:from-amber-300 hover:to-red-500 text-black font-black text-sm uppercase tracking-wider flex items-center justify-between shadow-xl shadow-amber-500/20 active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-2">
                <span>Place Order</span>
                <span className="text-xs bg-black/20 px-2 py-0.5 rounded font-extrabold text-black">
                  ₹{grandTotal}
                </span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-zinc-400 text-center mt-2">
              ⚡ Guaranteed fresh draft temperature & safe contactless delivery
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
