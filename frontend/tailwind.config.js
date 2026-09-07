/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12110F',
        charcoal: '#1D1B18',
        ivory: '#F5F1EA',
        stone: '#B9B2A6',
        brass: '#B08D57',
        brassLight: '#CBA871'
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif']
      },
      letterSpacing: {
        widest2: '0.25em'
      }
    }
  },
  plugins: []
}
