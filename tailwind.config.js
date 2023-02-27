/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['"Archivo"', "sans-serif"],
      },
      colors: {
        "icing-orange": "#F85741",
        "icing-yellow": "#F39708",
        "icing-blue": "#0E9094",
        "icing-orange-light": "#fff0ee",
        "icing-yellow-light": "#FEF3E2",
        "icing-blue-light": "#F2FEFE",
        "base-400": "#a3a3a3",
        "base-600": "#525252",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lofi"],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
