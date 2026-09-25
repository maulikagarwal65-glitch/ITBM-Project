import React from 'react';
import { 
  Zap, 
  Tag, 
  ExternalLink, 
  Plus, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck, 
  Info 
} from 'lucide-react';

export const PLATFORMS_CONFIG = [
  { key: 'blinkit', name: 'Blinkit', color: 'bg-yellow-400', textColor: 'text-slate-950', badgeBorder: 'border-yellow-400' },
  { key: 'zepto', name: 'Zepto', color: 'bg-[#5C00A3]', textColor: 'text-white', badgeBorder: 'border-purple-600' },
  { key: 'instamart', name: 'Instamart', color: 'bg-[#FC8019]', textColor: 'text-white', badgeBorder: 'border-orange-500' },
  { key: 'bb', name: 'BB Now', color: 'bg-[#84c225]', textColor: 'text-white', badgeBorder: 'border-emerald-500' },
  { key: 'flipkart', name: 'Minutes', color: 'bg-[#2874f0]', textColor: 'text-white', badgeBorder: 'border-blue-500' }
];

export default function ProductCard({ 
  product, 
  locationModifier, 
  onAddToBasket 
}) {
  const { prices, delivery, stock, mrp, fairPrice, fairPriceNote, unitPrice, size, name, brand, image, rating } = product;

  // Real deep-link mapping
  const getStoreUrl = (platformKey) => {
    const q = encodeURIComponent(name);
    const pin = locationModifier?.pincode || '560038';
    switch (platformKey) {
      case 'blinkit': return `https://blinkit.com/s/?q=${q}&pincode=${pin}`;
      case 'zepto': return `https://www.zeptonow.com/search?query=${q}&pincode=${pin}`;
      case 'instamart': return `https://www.swiggy.com/instamart/search?query=${q}`;
      case 'bb': return `https://www.bigbasket.com/ps/?q=${q}`;
      case 'flipkart': return `https://www.flipkart.com/search?q=${q}`;
      default: return '#';
    }
  };

  // Determine single lowest price
  let lowestPrice = Infinity;
  let bestDealKey = 'zepto';
  Object.entries(prices).forEach(([key, val]) => {
    if (val < lowestPrice) {
      lowestPrice = val;
      bestDealKey = key;
    }
  });

  // Determine fastest delivery
  let lowestTime = Infinity;
  let fastestKey = 'blinkit';
  const extraMins = locationModifier?.extraMins || 0;
  Object.entries(delivery).forEach(([key, val]) => {
    const t = val + extraMins;
    if (t < lowestTime) {
      lowestTime = t;
      fastestKey = key;
    }
  });

  // Fair Price & Deal Integrity calculation
  const benchmarkFairPrice = fairPrice || Math.round(mrp * 0.90);
  const diffFromFair = lowestPrice - benchmarkFairPrice;
  const isAuthenticDiscount = lowestPrice < benchmarkFairPrice - 2;
  const isSurgeMarkedUp = lowestPrice > benchmarkFairPrice + 3 || lowestPrice >= mrp;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      
      {/* Top Product Header */}
      <div>
        <div className="flex gap-4 items-start">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-100 dark:border-slate-700">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              loading="lazy"
            />
            {mrp > lowestPrice && (
              <span className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
                {Math.round(((mrp - lowestPrice) / mrp) * 100)}% OFF
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {brand}
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {size}
              </span>
              {unitPrice && (
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                  {unitPrice}
                </span>
              )}
            </div>

            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base leading-snug line-clamp-2">
              {name}
            </h3>

            {/* Fair Price & Transparency Benchmark Box */}
            <div className="mt-2.5 p-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">
                  Fair Price: <strong className="text-emerald-700 dark:text-emerald-400">₹{benchmarkFairPrice}</strong>
                </span>
                <span className="text-[11px] text-slate-400 line-through">
                  MRP ₹{mrp}
                </span>
              </div>

              {/* Deal Integrity Badge */}
              {isAuthenticDiscount ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-300/40">
                  <CheckCircle className="w-3 h-3 text-emerald-600" /> Authentic Discount (Save ₹{Math.abs(diffFromFair)})
                </span>
              ) : isSurgeMarkedUp ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-rose-800 bg-rose-100 dark:bg-rose-950 dark:text-rose-300 px-2 py-0.5 rounded-md border border-rose-300/40">
                  <AlertCircle className="w-3 h-3 text-rose-600" /> Surge / Marked Up (+₹{diffFromFair})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-blue-800 bg-blue-100 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded-md border border-blue-300/40">
                  <ShieldCheck className="w-3 h-3 text-blue-600" /> Fair Market Value
                </span>
              )}
            </div>
            
            {fairPriceNote && (
              <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                <Info className="w-3 h-3 flex-shrink-0" /> {fairPriceNote}
              </p>
            )}
          </div>
        </div>

        {/* Platform Comparison Matrix Grid (5 Stores) */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
            Live 5-Store Price & Delivery Comparison
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {PLATFORMS_CONFIG.map(p => {
              const price = prices[p.key];
              const time = (delivery[p.key] || 10) + extraMins;
              const inStock = stock[p.key] !== false;
              const isBestDeal = p.key === bestDealKey;
              const isFastest = p.key === fastestKey;

              return (
                <div 
                  key={p.key}
                  className={`relative p-2.5 rounded-2xl border transition flex flex-col justify-between ${
                    isBestDeal
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80'
                  }`}
                >
                  {/* Platform Brand Header */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${p.color} ${p.textColor}`}>
                      {p.name}
                    </span>
                    
                    {/* Status Pill */}
                    {isBestDeal ? (
                      <span className="text-[9px] font-black text-emerald-800 dark:text-emerald-300 bg-emerald-200/80 dark:bg-emerald-900 px-1 rounded flex items-center gap-0.5">
                        <Tag className="w-2.5 h-2.5" /> Best Deal
                      </span>
                    ) : isFastest ? (
                      <span className="text-[9px] font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-1 rounded flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Fastest
                      </span>
                    ) : null}
                  </div>

                  {/* Price & Delivery ETA */}
                  <div className="my-1">
                    <div className="text-base font-black text-slate-900 dark:text-white">
                      ₹{price}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                      {time} mins
                    </div>
                    <div className="text-[9px] mt-0.5 font-bold">
                      {inStock ? (
                        <span className="text-emerald-600">● In Stock</span>
                      ) : (
                        <span className="text-slate-400">○ Low / OOS</span>
                      )}
                    </div>
                  </div>

                  {/* Direct Platform Order Link */}
                  <a
                    href={getStoreUrl(p.key)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 w-full py-1 px-1.5 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-900 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 font-bold text-[10px] border border-slate-200 dark:border-slate-600 transition flex items-center justify-center gap-1"
                  >
                    Order Now <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Smart Basket Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onAddToBasket(product)}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition duration-150 flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add to Smart Basket
        </button>
      </div>

    </div>
  );
}
