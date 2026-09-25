import React from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, CheckCircle2, Sparkles, Truck, ArrowRight } from 'lucide-react';
import { PLATFORMS_CONFIG } from './ProductCard';

export default function SmartBasket({ 
  isOpen, 
  onClose, 
  basketItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearBasket,
  locationModifier
}) {
  if (!isOpen) return null;

  // Calculate Cumulative Totals for each of the 5 platforms
  const storeTotals = {
    blinkit: 0,
    zepto: 0,
    instamart: 0,
    bb: 0,
    flipkart: 0
  };

  basketItems.forEach(item => {
    storeTotals.blinkit += (item.prices.blinkit || 0) * item.qty;
    storeTotals.zepto += (item.prices.zepto || 0) * item.qty;
    storeTotals.instamart += (item.prices.instamart || 0) * item.qty;
    storeTotals.bb += (item.prices.bb || 0) * item.qty;
    storeTotals.flipkart += (item.prices.flipkart || 0) * item.qty;
  });

  // Calculate Landed Fees: Handling fee + Delivery Fee (Free if subtotal > ₹199)
  const isSurge = locationModifier?.surgeActive;
  const surgeFee = isSurge ? 10 : 0;

  const feeConfig = {
    blinkit: { handling: 4, delivery: storeTotals.blinkit > 199 ? 0 : 16 },
    zepto: { handling: 5, delivery: storeTotals.zepto > 199 ? 0 : 15 },
    instamart: { handling: 6, delivery: storeTotals.instamart > 199 ? 0 : 20 },
    bb: { handling: 3, delivery: storeTotals.bb > 199 ? 0 : 12 },
    flipkart: { handling: 4, delivery: storeTotals.flipkart > 199 ? 0 : 15 }
  };

  const finalLandedTotals = {
    blinkit: storeTotals.blinkit + feeConfig.blinkit.handling + feeConfig.blinkit.delivery + surgeFee,
    zepto: storeTotals.zepto + feeConfig.zepto.handling + feeConfig.zepto.delivery + surgeFee,
    instamart: storeTotals.instamart + feeConfig.instamart.handling + feeConfig.instamart.delivery + surgeFee,
    bb: storeTotals.bb + feeConfig.bb.handling + feeConfig.bb.delivery + surgeFee,
    flipkart: storeTotals.flipkart + feeConfig.flipkart.handling + feeConfig.flipkart.delivery + surgeFee
  };

  // Find lowest single store
  let lowestStoreKey = 'zepto';
  let lowestStoreTotal = Infinity;
  Object.entries(finalLandedTotals).forEach(([key, total]) => {
    if (total < lowestStoreTotal) {
      lowestStoreTotal = total;
      lowestStoreKey = key;
    }
  });

  const storeDisplayNames = {
    blinkit: 'Blinkit',
    zepto: 'Zepto',
    instamart: 'Swiggy Instamart',
    bb: 'BigBasket BB Now',
    flipkart: 'Flipkart Minutes'
  };

  // Smart Split Optimizer: Calculate optimal item-by-item split
  let splitItemTotal = 0;
  basketItems.forEach(item => {
    const minItemPrice = Math.min(...Object.values(item.prices));
    splitItemTotal += minItemPrice * item.qty;
  });
  const splitEstimatedFees = 28; // 2 stores combined handling/delivery
  const splitFinalTotal = splitItemTotal + splitEstimatedFees;
  const splitExtraSavings = Math.max(0, lowestStoreTotal - splitFinalTotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-600 text-white p-2 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Smart Basket Optimizer</h3>
              <p className="text-[11px] text-slate-400 font-bold">
                {basketItems.length} products • Live multi-store totals
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {basketItems.length > 0 && (
              <button
                onClick={onClearBasket}
                className="text-[11px] font-bold text-slate-400 hover:text-rose-500 transition px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Basket Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {basketItems.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Your Smart Basket is empty.</p>
              <p className="text-xs max-w-xs mx-auto">
                Add products from the catalog to compare real-time cart checkout totals across all 5 stores.
              </p>
            </div>
          ) : (
            basketItems.map(item => {
              const bestPrice = Math.min(...Object.values(item.prices));
              return (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl gap-3"
                >
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{item.size} • Best: ₹{bestPrice}</p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600 transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-black text-xs text-slate-900 dark:text-white">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-600 transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Comparison Summary & Checkout */}
        {basketItems.length > 0 && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 space-y-4">
            
            {/* 5-Store Cumulative Matrix */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                Cumulative Landed Cart Totals (Fees Included)
              </span>
              <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                {PLATFORMS_CONFIG.map(p => {
                  const total = finalLandedTotals[p.key];
                  const isLowest = p.key === lowestStoreKey;
                  return (
                    <div 
                      key={p.key}
                      className={`p-2 rounded-xl border transition ${
                        isLowest 
                          ? 'bg-emerald-100/80 dark:bg-emerald-950 border-emerald-500 font-black ring-1 ring-emerald-500' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span className={`text-[8px] font-black uppercase px-1 py-0.5 rounded ${p.color} ${p.textColor}`}>
                        {p.name}
                      </span>
                      <div className="text-xs font-black text-slate-900 dark:text-white mt-1">
                        ₹{total}
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold block">
                        {feeConfig[p.key].delivery === 0 ? 'Free Del' : `+₹${feeConfig[p.key].delivery}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendation Summary Banner */}
            <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg shadow-emerald-600/20 space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                  Lowest Single Store Match
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <h4 className="text-base font-black">
                  {storeDisplayNames[lowestStoreKey]}
                </h4>
                <span className="text-xl font-black">₹{lowestStoreTotal}</span>
              </div>
              <p className="text-[10px] text-emerald-100">
                Includes ₹{feeConfig[lowestStoreKey].handling} handling + {feeConfig[lowestStoreKey].delivery === 0 ? 'FREE delivery' : `₹${feeConfig[lowestStoreKey].delivery} delivery fee`}.
              </p>
            </div>

            {/* Smart Split Savings Highlight */}
            {basketItems.length >= 2 && splitExtraSavings > 15 && (
              <div className="bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 p-3 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="font-bold text-purple-900 dark:text-purple-200">
                    Flash Split Savings Available:
                  </span>
                </div>
                <span className="font-black text-purple-700 dark:text-purple-300">
                  Save ₹{splitExtraSavings} extra!
                </span>
              </div>
            )}

            {/* Simulated Checkout Action */}
            <button
              onClick={() => alert(`🎉 Order placed via ${storeDisplayNames[lowestStoreKey]} for ₹${lowestStoreTotal}! Directing to doorstep dispatch...`)}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-black text-sm rounded-xl transition shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" /> Order with Lowest Store ({storeDisplayNames[lowestStoreKey]})
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
