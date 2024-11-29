/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          500: "#f87171",
        },
        green: {
          500: "#34d399",
        },
        purple: {
          500: "#a78bfa",
        },
      },
    },
  },
  plugins: [],
}
