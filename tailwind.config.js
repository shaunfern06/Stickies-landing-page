/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'cream': '#fefcf8',
        'charcoal': '#0f0f14',
        'accent': '#6366f1',
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideUp': 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 10s ease-in-out infinite',
        'float-gentle': 'float-gentle 12s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'drift-reverse': 'drift-reverse 14s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slideUp': {
          '0%': { transform: 'translate(-50%, 60px)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 0)', opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-15px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(15px) translateX(-10px)' },
          '66%': { transform: 'translateY(-10px) translateX(20px)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(1deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-3px) rotate(0.5deg)' },
        },
        'drift': {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(30px) translateY(-20px)' },
          '50%': { transform: 'translateX(-20px) translateY(-40px)' },
          '75%': { transform: 'translateX(-40px) translateY(20px)' },
        },
        'drift-reverse': {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-25px) translateY(30px)' },
          '50%': { transform: 'translateX(40px) translateY(10px)' },
          '75%': { transform: 'translateX(20px) translateY(-30px)' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
      boxShadow: {
        '3xl': '0 20px 40px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};