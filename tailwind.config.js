/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        slate: {
          950: '#0b1220',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '2rem',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(93, 64, 255, 0.08)',
        card: '0 10px 22px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}
