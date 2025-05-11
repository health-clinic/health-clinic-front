module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./screens/**/*.{ts,tsx,js,jsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E5F1FF",
          200: "#C5DFFF",
          300: "#A2C8F7",
          400: "#5BB6FF",
          500: "#2DB5FD",
          600: "#2AA6F0",
        },
        neutral: {
          100: "#0A1420",
          200: "#121A28",
          300: "#1A2532",
          400: "#3A3F45",
          500: "#5B5F66",
          600: "#8A8A8A",
          700: "#A2AAB1",
          800: "#C3C7CD",
          900: "#FFFFFF",
        },
        accent: {
          100: "#FFEEF2",
          200: "#FFCEDA",
          300: "#FFADC0",
          400: "#FF8CA6",
          500: "#FF6B8B",
        },
        angry: {
          100: "#F2D6CD",
          500: "#C03403",
        },
      },
      fontFamily: {
        interRegular: ["Inter-Regular"],
        interMedium: ["Inter-Medium"],
        interBold: ["Inter-Bold"],
      },
    },
  },
  plugins: [],
}
