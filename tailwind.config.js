/** @type {import('tailwindcss').Config} */
import { AVIABLE_COLORS } from "./src/utils/constants"
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: AVIABLE_COLORS,
    theme: {
    extend: {},
  },
  plugins: [],
}