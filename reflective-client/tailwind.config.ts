import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        "custom-gray": "var(--custom-gray)",
      },
      borderWidth: {
        "0.5": "0.5px",
      },
      width: {
        "1301": "1301px",
      },
      height: {
        "800": "800px",
      },
    },
  },
  plugins: [],
};
export default config;
