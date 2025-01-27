/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          primary: "#384959",  // Muted Blue
          secondary: "#BDDDFC", // Light Blue
        },
    },
  },
  plugins: [],
}