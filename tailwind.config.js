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
      spacing: {
        'safe-top': 'var(--sat)',
        'safe-bottom': 'var(--sab)',
        'safe-left': 'var(--sal)',
        'safe-right': 'var(--sar)',
      },
      height: {
        'screen-safe': 'calc(100vh - var(--sat) - var(--sab))'
      }
    },
  },
  plugins: [],
};
