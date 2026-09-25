import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'Dairy & Bread', label: 'Dairy & Bread' },
  { id: 'Fresh Produce', label: 'Fresh Produce' },
  { id: 'Snacks & Drinks', label: 'Snacks & Drinks' },
  { id: 'Cooking Essentials', label: 'Cooking Essentials' },
  { id: 'Household Care', label: 'Household Care' },
  { id: 'Instant Food', label: 'Instant Food' }
];

export default function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  totalResults
}) {
  return (
    <div className="space-y-4">
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search milk, atta, coffee, coke, maggi, oil, soap..."
            className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2 shadow-sm text-xs font-bold text-slate-700 dark:text-slate-200">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <span className="text-slate-400 font-extrabold uppercase text-[10px]">Sort:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-transparent font-bold outline-none cursor-pointer"
          >
            <option value="best_deal" className="dark:bg-slate-800">Highest % Discount</option>
            <option value="lowest_price" className="dark:bg-slate-800">Lowest Price (₹)</option>
            <option value="fastest" className="dark:bg-slate-800">Fastest Delivery (Mins)</option>
          </select>
        </div>
      </div>

      {/* Pre-populated Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map(cat => {
          const isActive = selectedCategory.toLowerCase() === cat.id.toLowerCase();
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results Header Count */}
      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-semibold px-1">
        <span>Showing <strong>{totalResults}</strong> grocery products</span>
        <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live dark store rates compiled
        </span>
      </div>
    </div>
  );
}
