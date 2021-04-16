module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  presets: [
    require('@zakodium/tailwind-config')({
      colors: {
        additional: [
          'gray',
          'blue',
          'red',
          'blue-gray',
          'true-gray',
          'cool-gray',
          'light-blue',
        ],
      },
    }),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        themePrimary: {
          DEFAULT: '#30475e',
          100: '#83919e',
          200: '#6e7e8e',
          300: '#596c7e',
          400: '#45596e',
          500: '#30475e',
          600: '#2b4055',
          700: '#26394b',
          800: '#223242',
          900: '#051128',
        },
        themeSecondary: {
          DEFAULT: '#f05454',
          100: '#fcdddd',
          200: '#f9bbbb',
          300: '#f69898',
          400: '#f37676',
          500: '#f05454',
          600: '#d84c4c',
          700: '#c04343',
          800: '#a83b3b',
          900: '#903232',
        },
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['group-hover', 'hover'],
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
