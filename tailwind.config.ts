import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
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
      colors: {
        "orange": "#D97927",
        "orange-2": "#BC9322",
        "blue": "#2783D9",
        "blue-2": "#3D4B59",
      },
      keyframes: {
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(-2%)', AnimationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', AnimationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        }
      },
      animation: {
        'bounce-slow': 'bounceSlow 2s infinite',
      },

    },
  },
  plugins: [],
}
export default config
