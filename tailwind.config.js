/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "700px",
        md: "970px",
        lg: "1126px",
        xl: "1190px",
      },
    },
  },
  plugins: [],
};
