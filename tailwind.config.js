/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#67E8F9',
          hover: '#22D3EE',
          dark: '#020617',
          surface: '#0F172A',
          card: '#111827',
        },
      },
      boxShadow: {
        cyan: '0 18px 60px rgba(103, 232, 249, 0.18)',
        'cyan-soft': '0 12px 36px rgba(103, 232, 249, 0.10)',
      },
      backgroundImage: {
        'industrial-grid':
          'linear-gradient(rgba(103,232,249,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.07) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
