const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        permanent: ['Permanent Marker', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    require('postcss-100vh-fix'),
    require('@tailwindcss/forms'),
  ],
}