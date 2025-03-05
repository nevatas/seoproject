/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./evelone.ru/public/**/*.{html,js}",
    "./*/public/**/*.{html,js}" // Для будущих доменов
  ],
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