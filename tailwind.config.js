/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#6e35bf",

          "secondary": "#f2e021",

          "accent": "#eda3bf",

          "neutral": "#292c38",

          "base-100": "#f1ebf5",

          "info": "#2779ec",

          "success": "#169c78",

          "warning": "#fbcb6a",

          "error": "#f6555b",
        },
      },
    ],
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
}
