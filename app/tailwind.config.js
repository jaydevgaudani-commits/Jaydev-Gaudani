/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: "#131313",
        "surface-low": "#1C1B1B",
        primary: "#00F2FF",
        "primary-dim": "#00DBE7",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        "40px": "40px",
      },
    },
  },
  plugins: [],
}
