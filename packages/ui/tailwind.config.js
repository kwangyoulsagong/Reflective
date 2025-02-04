/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      width: {
        1301: "1301px",
      },
      height: {
        800: "800px",
      },
    },
  },
  plugins: [],
};
