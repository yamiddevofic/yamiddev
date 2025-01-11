/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './public/**/*.html',
    './public/**/*.js',
    './public/**/*.css',
    '*.html',
    '*.astro',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
