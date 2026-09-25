import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import LocationBanner from './components/LocationBanner';
import SearchAndFilter from './components/SearchAndFilter';
import ProductCard from './components/ProductCard';
import SmartBasket from './components/SmartBasket';
import { getProductComparisons } from '../api/compare';
import productsData from '../data/products.json';

export default function App() {
  // State: Location
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('560038');

  // State: Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('best_deal');

  // State: Smart Basket
  const [basketItems, setBasketItems] = useState([
    { ...productsData[0], qty: 1 },
    { ...productsData[14], qty: 1 } // Pre-seed 2 items for demonstration
  ]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  // Compute enriched comparison products
  const comparisonResult = useMemo(() => {
    return getProductComparisons({
      q: searchQuery,
      category: selectedCategory,
      city,
      pincode,
      sort: sortOption
    }, productsData);
  }, [searchQuery, selectedCategory, city, pincode, sortOption]);

  const products = comparisonResult.data;
  const locationModifier = comparisonResult.location;

  // Basket Handlers
  const handleAddToBasket = (product) => {
    setBasketItems(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsBasketOpen(true);
  };

  const handleUpdateQty = (productId, delta) => {
    setBasketItems(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleRemoveItem = (productId) => {
    setBasketItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearBasket = () => {
    setBasketItems([]);
  };

  const totalBasketCount = basketItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 flex flex-col antialiased">
      
      {/* 1. Header with Location & Pincode Selector */}
      <Header
        city={city}
        setCity={setCity}
        pincode={pincode}
        setPincode={setPincode}
        basketCount={totalBasketCount}
        onOpenBasket={() => setIsBasketOpen(true)}
      />

      {/* 2. Dynamic Delivery Availability Banner */}
      <LocationBanner city={city} pincode={pincode} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1 w-full space-y-8">
        
        {/* Hero Section Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full inline-block">
            Fair Price Transparency
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Stop Overpaying on Groceries. <br className="hidden sm:inline"/>
            Compare 5 Quick-Commerce Stores in Real Time.
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl font-medium leading-relaxed">
            Real-time shelf prices, dark store dispatch times, and un-manipulated <strong>Fair Price</strong> benchmarks across Blinkit, Zepto, Swiggy Instamart, BigBasket BB Now, and Flipkart Minutes.
          </p>
        </div>

        {/* 3. Search Bar & Category Filter Chips */}
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOption={sortOption}
          setSortOption={setSortOption}
          totalResults={products.length}
        />

        {/* 4. Product Comparison Matrix Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-3">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">No products matched your search.</h3>
            <p className="text-xs text-slate-400">
              Try searching for common terms like "milk", "atta", "coke", "sugar", or select "All Products".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                locationModifier={locationModifier}
                onAddToBasket={handleAddToBasket}
              />
            ))}
          </div>
        )}

      </main>

      {/* 5. Smart Cart Multi-Product Optimizer Modal / Drawer */}
      <SmartBasket
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        basketItems={basketItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearBasket={handleClearBasket}
        locationModifier={locationModifier}
      />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-10 text-center text-xs border-t border-slate-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="font-black text-slate-300 text-sm">BuyWise Co. • India Quick-Commerce Price Index</p>
          <p className="text-slate-500 text-[11px] max-w-xl mx-auto">
            All trademarks, logos, and product brand vectors (Blinkit, Zepto, Swiggy Instamart, BigBasket, Flipkart Minutes) belong to their respective owners. Fair Price metrics are calculated from official brand MRPs and un-surged retail distribution standards.
          </p>
          <p className="text-slate-600 text-[10px]">© 2026 BuyWise Co. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
