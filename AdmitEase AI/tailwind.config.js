/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f9',
          100: '#dae2f0',
          200: '#b6c4e0',
          300: '#8aa0cc',
          400: '#5d79b3',
          500: '#3f5b96',
          600: '#314a7d',
          700: '#283c66',
          800: '#1f3052',
          900: '#15233f',
          950: '#0c1730',
        },
        gold: {
          50: '#fbf7ec',
          100: '#f5ebcc',
          200: '#ecd699',
          300: '#e0bd5f',
          400: '#d4a73a',
          500: '#c4912a',
          600: '#a87524',
          700: '#835822',
          800: '#6d4823',
          900: '#5d3e22',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
