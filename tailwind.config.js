/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['monospace'], // Keeping it simple as per original
        serif: ['serif'],
      },
    },
  },
  plugins: [],
}
