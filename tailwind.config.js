/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['"Archivo"', "sans-serif"],
      },
      colors: {
        "icing-red": "#F85741",
        "icing-orange": "#F39708",
        "icing-blue": "#0E9094",
        "icing-beige": "#DACDAC",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lofi"],
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
