/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        // Здесь можно добавить кастомные цвета
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 