/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow':         '0 0 28px rgba(99,102,241,0.35)',
        'glow-sm':      '0 0 14px rgba(99,102,241,0.22)',
        'glow-cyan':    '0 0 22px rgba(34,211,238,0.25)',
        'glow-emerald': '0 0 22px rgba(16,185,129,0.25)',
        'glow-blue':    '0 0 22px rgba(37,99,235,0.22)',
        'glow-orange':  '0 0 22px rgba(249,115,22,0.30)',
      },
    },
  },
  plugins: [],
}
