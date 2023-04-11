/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      brightness: {
        25: '.25'
      },
      opacity: {
        65: '0.65',
        75: '0.75',
        85: '0.85'
      }
    }
  },
  plugins: []
}
