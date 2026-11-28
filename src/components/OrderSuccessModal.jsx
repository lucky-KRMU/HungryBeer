import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  Bike, 
  Beer, 
  Clock, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  X,
  Sparkles
} from 'lucide-react';

export default function OrderSuccessModal({ orderDetails, onClose, restaurant }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Fire confetti celebration on mount
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#FBBF24', '#ffffff']
      });
    } catch (e) {
      // Fallback
    }

    const timer1 = setTimeout(() => setStep(2), 3000);
    const timer2 = setTimeout(() => setStep(3), 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!orderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 my-auto text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-red-500 p-1 mx-auto shadow-lg shadow-amber-500/20 mb-4 animate-pulse">
          <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-amber-400">
            <Beer className="w-9 h-9" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
          <CheckCircle className="w-3.5 h-3.5" /> Order Placed & Confirmed!
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
          Cheers! Your Feast is on the Way
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Order ID: <span className="font-mono text-amber-400 font-bold">#HB-{Math.floor(100000 + Math.random() * 900000)}</span> • Total Paid: <span className="text-white font-bold">₹{orderDetails.grandTotal}</span>
        </p>

        {/* Live Delivery Progress */}
        <div className="my-6 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-3 border-b border-zinc-800 pb-2">
            <span className="font-bold text-zinc-200">Estimated Delivery</span>
            <span className="text-amber-400 font-extrabold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 22-26 Mins
            </span>
          </div>

          {/* Stepper */}
          <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-800">
            
            {/* Step 1 */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-black flex items-center justify-center text-xs font-black shadow">
                ✓
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Order Accepted & Sent to Kitchen</div>
                <div className="text-zinc-400 text-[11px]">{restaurant?.name || 'HungryBeer Kitchen'}</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 relative z-10">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow transition-all ${
                step >= 2 ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {step >= 2 ? '✓' : '2'}
              </div>
              <div className="text-xs">
                <div className={`font-bold ${step >= 2 ? 'text-white' : 'text-zinc-400'}`}>
                  Brewmaster Tapping & Packaging
                </div>
                <div className="text-zinc-500 text-[11px]">Sealing growlers & packing hot food</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3 relative z-10">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow transition-all ${
                step >= 3 ? 'bg-red-600 text-white animate-bounce' : 'bg-zinc-800 text-zinc-400'
              }`}>
                <Bike className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className={`font-bold ${step >= 3 ? 'text-white' : 'text-zinc-400'}`}>
                  Delivery Partner Assigned
                </div>
                <div className="text-zinc-500 text-[11px]">Vikram S. is on the way (EV Scooter)</div>
              </div>
            </div>

          </div>
        </div>

        {/* Rider card */}
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between gap-2 text-left text-xs mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-amber-400 font-bold border border-zinc-700 shrink-0">
              VS
            </div>
            <div className="min-w-0">
              <div className="font-bold text-white truncate">Vikram S. (HungryBeer Express)</div>
              <div className="text-zinc-400 text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">Insulated Beer Pack • Sanitized</span>
              </div>
            </div>
          </div>
          <button className="p-2 rounded-lg bg-zinc-800 text-amber-400 hover:bg-zinc-700 transition-colors shrink-0">
            <PhoneCall className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all active:scale-95"
        >
          Track in Background & Browse More
        </button>
      </div>
    </div>
  );
}
