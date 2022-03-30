module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        ole: ['Comfortaa', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        shrink: {
          '0%': { width: '100%' },
          '100%': { width: '50%' },
        },
      },
      animation: {
        shrink: 'shrink 3s ease forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
