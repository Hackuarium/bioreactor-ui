module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
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
        secondary: {
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
        neutral: {
          DEFAULT: '#808080',
          50: 'f3f4f6',
          100: '#f2f2f2',
          200: '#d9d9d9',
          300: '#c0c0c0',
          400: '#a6a6a6',
          500: '#8d8d8d',
          600: '#737373',
          700: '#5a5a5a',
          800: '#4d4d4d',
          900: '#404040',
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
