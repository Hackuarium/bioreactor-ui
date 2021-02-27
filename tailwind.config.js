module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#dddddd',
          DEFAULT: '#30475e',
          dark: '#051128',
        },
        secondary: {
          DEFAULT: '#f05454',
        },
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['group-hover', 'hover'],
    },
  },
  plugins: [],
};
