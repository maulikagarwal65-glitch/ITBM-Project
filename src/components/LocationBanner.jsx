import React from 'react';
import { Zap, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export default function LocationBanner({ city, pincode }) {
  const pinNum = parseInt(pincode, 10) || 560038;
  const isSurge = pinNum % 2 !== 0;

  return (
    <div className={`border-b transition-colors ${
      isSurge 
        ? 'bg-amber-500/10 border-amber-500/20 text-amber-900 dark:text-amber-200' 
        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-950 dark:text-emerald-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs gap-1.5 font-bold">
        
        <div className="flex items-center gap-2">
          {isSurge ? (
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-extrabold uppercase text-[10px] bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full">
              <AlertTriangle className="w-3 h-3" /> High Demand Zone
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-extrabold uppercase text-[10px] bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Full Coverage
            </span>
          )}
          <span>
            Showing real-time stock & delivery speeds for <strong>{city} ({pincode || '560038'})</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> 
            5 of 5 Dark Stores Online
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" /> 
            Avg Delivery: {isSurge ? '11-14 mins' : '7-10 mins'}
          </span>
        </div>

      </div>
    </div>
  );
}
