/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Add your default font here
      },
      colors: {
        charcoal: '#1E201E',
        moss: '#3C3D37',
        greyishGreen: '#697565',
        lightBeige: '#ECDFCC',
      },
    },
  },
  plugins: [],
}
