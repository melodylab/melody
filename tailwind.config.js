/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: { extend: {} },
  plugins: [],
}
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        coffeeTeal:  '#2E7D7A',  // Chat
        coffeeOrange:'#E87D3E',  // bot
      }
    }
  }
}
