/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        defaultTheme: {
          "primary": "#111827",
          "secondary": "#1f2937",
          "accent": "#fafafa",
          "neutral": "#374151", 
          "base-100": "#1f2937",
        },
      },
    ],
  },
};
