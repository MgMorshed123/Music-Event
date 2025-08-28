/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#FF2E63",
          blue: "#08F7FE",
          green: "#09FBD3",
        },
      },
    },
  },
  plugins: [],
};
