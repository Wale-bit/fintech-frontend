module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS/TS/React files in the src folder
  ],
  theme: {
    extend: {
        colors: {
            'primary-yellow': '#FFC107',
            'primary-black': '#1A1A1A',
            'background-dark': '#1A2526',
            'background-light': '#F5F6FA',
    },
    fontFamily: {
        sans: ['Inter', 'sans-serif'], // Define the Inter font
      }, // You can customize your theme here
  }},
  plugins: [],
};