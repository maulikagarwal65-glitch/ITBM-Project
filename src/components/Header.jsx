import React from 'react';
import { MapPin, ShoppingBag, TrendingDown, ChevronDown } from 'lucide-react';

export const CITIES = [
  { name: 'Bengaluru', defaultPin: '560038', state: 'KA' },
  { name: 'Mumbai', defaultPin: '400050', state: 'MH' },
  { name: 'Delhi NCR', defaultPin: '110001', state: 'DL' },
  { name: 'Hyderabad', defaultPin: '500081', state: 'TS' },
  { name: 'Chennai', defaultPin: '600001', state: 'TN' },
  { name: 'Kolkata', defaultPin: '700001', state: 'WB' },
  { name: 'Pune', defaultPin: '411001', state: 'MH' }
];

export default function Header({ 
  city, 
  setCity, 
  pincode, 
  setPincode, 
  basketCount, 
  onOpenBasket 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="bg-emerald-600 text-white p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                BuyWise <span className="text-emerald-600">Co.</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded-md">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden sm:block">
              5-Store Quick-Commerce Matrix
            </p>
          </div>
        </div>

        {/* Location & Pincode Selector */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-1 pl-2 text-emerald-600">
            <MapPin className="w-4 h-4" />
          </div>

          {/* City Dropdown */}
          <div className="relative">
            <select
              value={city}
              onChange={(e) => {
                const selected = CITIES.find(c => c.name === e.target.value);
                setCity(e.target.value);
                if (selected) setPincode(selected.defaultPin);
              }}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 py-1 pr-6 pl-1 outline-none cursor-pointer appearance-none"
            >
              {CITIES.map(c => (
                <option key={c.name} value={c.name} className="dark:bg-slate-800">
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <span className="text-slate-300 dark:text-slate-600">|</span>

          {/* Pincode Input */}
          <div className="flex items-center pr-1">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Pincode"
              maxLength={6}
              className="w-16 bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 py-1 px-1 outline-none text-center"
            />
          </div>
        </div>

        {/* Smart Basket Button */}
        <button
          onClick={onOpenBasket}
          className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-black text-xs px-4 py-2.5 rounded-2xl transition shadow-md shadow-slate-900/10"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">Smart Basket</span>
          <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] flex items-center justify-center">
            {basketCount}
          </span>
        </button>

      </div>
    </header>
  );
}
