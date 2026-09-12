/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bark: {
          50: '#f7f4ef',
          100: '#ece5d8',
          200: '#d9cbb3',
          300: '#c2a886',
          400: '#ad8860',
          500: '#9a714c',
          600: '#835b3f',
          700: '#6b4936',
          800: '#5a3e32',
          900: '#4d362d',
          950: '#2b1d17',
        },
        sage: {
          400: '#8fa37a',
          500: '#6f865c',
          600: '#576b48',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
