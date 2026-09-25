/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        blinkit: {
          DEFAULT: '#F7D619',
          dark: '#1a1a1a'
        },
        zepto: {
          DEFAULT: '#5C00A3',
          light: '#f3e8ff'
        },
        instamart: {
          DEFAULT: '#FC8019',
          light: '#fff7ed'
        },
        bb: {
          DEFAULT: '#84C225',
          light: '#f7fee7'
        },
        flipkart: {
          DEFAULT: '#2874F0',
          light: '#eff6ff'
        }
      }
    },
  },
  plugins: [],
}
