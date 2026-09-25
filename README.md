# QuickCompare – Quick-Commerce Price Comparison (ITBM Project)

A production-ready, dynamic Quick-Commerce Price Comparison web application for the Indian market. The app allows users to search for everyday grocery items and compare real-time prices, stock status, and delivery times across India's top 5 quick-commerce platforms: **Blinkit**, **Zepto**, **Swiggy Instamart**, **BigBasket BB Now**, and **Flipkart Minutes**, alongside an un-manipulated **Fair Price** benchmark and a **Smart Basket** cumulative cart optimizer.

## Features

- **Location & Pincode Selector**: Select from 7 major Indian cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata, Pune) and enter a 6-digit pincode with dynamic delivery availability & surge zone alerts.
- **Real-Time Product Search & Filtering**: Instant search across 50+ real Indian FMCG products with category chips (*Dairy & Bread*, *Fresh Produce*, *Snacks & Drinks*, *Cooking Essentials*, *Household Care*, *Instant Food*).
- **5-Store Comparison Matrix**: Side-by-side comparison displaying live prices, delivery ETAs, stock status, "Best Deal" (Green) badge, and "Fastest" (Lightning) badge with direct "Order Now" links.
- **Fair Price & Transparency Engine**: Highlights whether discounts are genuine with deal integrity badges (*Authentic Discount*, *Fair Market Value*, *Surge / Marked Up*).
- **Smart Basket Multi-Product Optimizer**: Add items to your basket to calculate cumulative landed checkout totals across all 5 stores simultaneously, including platform handling and delivery fees, with a single-store recommendation and split-order savings preview.

## Tech Stack

- **Framework**: Next.js / React
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Architecture**: Modular API data service with 50+ seeded Indian FMCG products (`data/products.json`, `api/compare.js`)

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note**: A standalone version is also available in `index.html`, which can be launched directly in any web browser without requiring a Node.js runtime.
