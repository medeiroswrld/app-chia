/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green-light': '#E8F5E9',
        'brand-green': '#4CAF50',
        'brand-orange': '#FF9800',
        'brand-dark': '#333333',
        'brand-gray': '#F5F5F5'
      }
    },
  },
  plugins: [],
}
