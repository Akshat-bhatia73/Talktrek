import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        "xs": "450px"
      },
      keyframes: {
        "pop": {
          "0%": {scale: "0.5"},
          "100%": {scale: "1"},
        }
      },
      animation: {
        "pop": "pop 0.4s ease-in-out"
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class"
    })
  ],
}
export default config
