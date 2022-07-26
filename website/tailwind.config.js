module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            pre: false,
            code: false,
            'pre code': false,
            'code::before': false,
            'code::after': false
          }
        }
      },
      colors: {
        bg: {
          // DEFAULT: "#21252B",
          // sub: "#282C34",
          // acc: "#333842"
          DEFAULT: "#0e1219",
          sub: "#141920",
          acc: "#1a2028"
        },
        txt: {
          DEFAULT: '#D7D7DB',
          '50': '#F7F7F8',
          '100': '#ECECEE',
          '200': '#D7D7DB',
          '300': '#B9B9C0',
          '400': '#9C9CA6',
          '500': '#7E7E8B',
          '600': '#63636E',
          '700': '#494951',
          '800': '#2E2E33',
          '900': '#141416'
        },
        main: {
          // DEFAULT: "#E84855",
          // DEFAULT: "#63A46C",
          // DEFAULT: "#7871AA",
          DEFAULT: "#AA6373",
          // DEFAULT: "#748CAB",
          // DEFAULT: "#83B692",
          DEFAULT: "#896bff",
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
