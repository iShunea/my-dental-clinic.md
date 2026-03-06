/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0E2338',
        'accent': '#A30B37',
        'bg-light': '#D3E3FD',
        'surface': '#E6E5EC',
        'neutral': '#CCCCCC',
      },
      fontFamily: {
        'sans': ['"Libre Franklin"', 'sans-serif'],
        'heading': ['"Parkinsans"', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 24px rgba(14, 35, 56, 0.08)',
        'hover': '0 12px 40px rgba(14, 35, 56, 0.15)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

