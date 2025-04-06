/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2196F3",
        accent: "#FF4081",
        background: "#f5f5f5",
      },
    },
  },
  plugins: [],
}
