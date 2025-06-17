/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Raleway', 'sans-serif']
      }
    }
  },
  plugins: [],
  prefix: 'tw-'
};

