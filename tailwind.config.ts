import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nex-black': '#191a1b',
        'nex-dark':  '#1b1b1c',
        'nex-grey':  '#8a8c8b',
        'nex-green': '#22b561',
      },
    },
  },
  plugins: [],
}

export default config
