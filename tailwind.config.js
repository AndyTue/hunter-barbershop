/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coal: '#111111', gold: '#FED700', amber: '#D87000', steel: '#C0C0C0', mercury: '#E0E0E0'
      }
    }
  },
  plugins: []
};
