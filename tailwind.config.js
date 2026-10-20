/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}', '!./src/components/**'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
        zighead: ['zighead', 'serif'],
        saint: ['saint', 'serif'],
      },
      borderRadius: { card: '24px' },
      boxShadow: {
        hard: '4px 4px 0 0 rgb(var(--ink))',
        'hard-sm': '2px 2px 0 0 rgb(var(--ink))',
      },
    },
  },
  safelist: ['font-zighead', 'font-saint'],
  plugins: [],
};
