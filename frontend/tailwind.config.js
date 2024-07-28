/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      boxShadow: {
        'brown': '0 10px 20px rgba(128, 79, 14, 0.15), 0 6px 6px rgba(128, 79, 14, 0.10)',
      },
      scale: {
        '105': '1.05',
      },
      transitionProperty: {
        'transform-opacity': 'transform, opacity',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-in-out forwards',
        'pulse-text': 'pulse 1.5s ease-in-out infinite',
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      pink: "#fae4e7",
      primary: "#435334",
      secondary: "#cedebd",
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require('tailwindcss-filters'),
  ],
};
