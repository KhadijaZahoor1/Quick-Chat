/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: { min: "320px", max: "425px" },
      },
    },
  },

  plugins: [],
};
