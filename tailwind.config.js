/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React 파일들
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#242f44", // 기본 색
          100: "#e1e5ec", // 밝은 단계
          200: "#b3bcc9",
          300: "#8890a2",
          400: "#4b5866",
          500: "#242f44", // 기본 색
          600: "#1e283b", // 어두운 단계
          700: "#181f2e",
          800: "#121720",
          900: "#0b0d12",
        },
        green: {
          DEFAULT: "#50b196",
          100: "#e3f4ed",
          200: "#b7dfd1",
          300: "#86c7b2",
          400: "#5bb797",
          500: "#50b196", // 기본 색
          600: "#459a81",
          700: "#388064",
          800: "#2a6549",
          900: "#1b4831",
        },
        pink: {
          DEFAULT: "#cf364d",
          100: "#fde4e7",
          200: "#fab6bd",
          300: "#f48792",
          400: "#ea5867",
          500: "#cf364d", // 기본 색
          600: "#b42f44",
          700: "#962738",
          800: "#791e2c",
          900: "#55151e",
        },
        gray: {
          DEFAULT: "#555555",
          100: "#f7f7f7",
          200: "#ebebeb",
          300: "#d7d7d7",
          400: "#999999",
          500: "#555555", // 기본 색
          600: "#4a4a4a",
          700: "#3f3f3f",
          800: "#2a2a2a",
          900: "#1a1a1a",
        },
      },
      keyframes: {
        ping: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.5' },
          '100%': { transform: 'scale(2)', opacity: '0' }
        },
        wave: {
          '0%': { 
            transform: 'scale(0.95) rotate(0deg)',
            opacity: '0.9'
          },
          '25%': { 
            transform: 'scale(1.2) rotate(1deg)',
            opacity: '0.7'
          },
          '50%': { 
            transform: 'scale(1.5) rotate(-1deg)',
            opacity: '0.5'
          },
          '75%': { 
            transform: 'scale(1.8) rotate(1deg)',
            opacity: '0.3'
          },
          '100%': { 
            transform: 'scale(2) rotate(0deg)',
            opacity: '0'
          }
        }
      },
      animation: {
        'ping-slow': 'ping 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slower': 'ping 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 1.3s',
        'ping-slowest': 'ping 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 2.6s',
        'wave-slow': 'wave 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave-slower': 'wave 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s',
        'wave-slowest': 'wave 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s',
        'wave-final': 'wave 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 3s',
      },
    },
  },
  plugins: [],
};
