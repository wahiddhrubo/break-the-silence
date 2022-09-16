/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1abc54",
        secondary: "#ecc94b",

        green: {
          light: "#1fdf64",
          medium: "#1ed760",
          dark: "#1abc54",
        },
      },
    },
    plugins: [],
  },
};
