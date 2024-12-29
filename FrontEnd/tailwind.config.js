/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      width: {
        '49%': '49%',
        '176': '44rem',
        '30vw': '30vw'
      },
      minHeight: {
        '50vh': '50vh'
      },
      fontFamily: {
        rock: ['New Rocker', 'Arial', 'Helvetica', 'sans-serif', 'cursive'],
        alkatra: ['Alkatra', 'Arial', 'sans-serif']
      },
      textColor: {
        bluegray: "#111111"
      },
      backgroundColor: {
        blueblack: "#0a0a0a",
        bluegray: "#111111"
      },
      margin: {
        '5%': '5%',
        '15vw': '15vw'
      },
      screens: {
        'own': '730px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}

