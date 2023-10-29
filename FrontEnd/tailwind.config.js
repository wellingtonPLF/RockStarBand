/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        rock: ['New Rocker', 'Arial', 'Helvetica', 'sans-serif', 'cursive'],
        alkatra: ['Alkatra', 'Arial', 'sans-serif']
      },
      backgroundColor: {
        blueblack: "#0a0a0a",
        bluegray: "#111111"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}

