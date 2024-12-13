/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        noto: ["Noto Sans KR", "sans-serif"],
        singleday: ["Single Day", "cursive"],
        ibm: ["IBM Plex Sans KR", "sans-serif"],
      },
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
          DEFAULT: "#7ac4a7",
          100: "#f0f9f5",
          200: "#d4efe3",
          300: "#b8e4d1",
          400: "#9cd9c0",
          500: "#8ed3b8", // 기본 색
          600: "#7ac4a7",
          700: "#66b596",
          800: "#52a685",
          900: "#3e9774",
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
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "50%": { transform: "scale(1.5)", opacity: "0.5" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        wave: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.2)", opacity: "0.3" },
          "100%": { transform: "scale(1)", opacity: "0.5" },
        },
        wave2: {
          "0%": { transform: "scale(1)", opacity: "0.3" },
          "50%": { transform: "scale(1.4)", opacity: "0.1" },
          "100%": { transform: "scale(1)", opacity: "0.3" },
        },
        soundwave: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.5)" },
        },
        waveOut: {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(1.5)",
            opacity: "0",
          },
        },
        "wave-slow": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        "wave-slower": {
          "0%, 100%": { transform: "scale(1.05)" },
          "50%": { transform: "scale(1.15)" },
        },
        "wave-slowest": {
          "0%, 100%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1.2)" },
        },
        "float-slow": {
          "0%": { transform: "translateY(0) translateX(0) rotate(0deg)" },
          "33%": {
            transform: "translateY(-10px) translateX(10px) rotate(120deg)",
          },
          "66%": {
            transform: "translateY(10px) translateX(-10px) rotate(240deg)",
          },
          "100%": { transform: "translateY(0) translateX(0) rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      animation: {
        "ping-slow": "ping 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slower": "ping 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 1.3s",
        "ping-slowest": "ping 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 2.6s",
        "wave-slow": "wave 2s ease-in-out infinite",
        "wave-slower": "wave 2s ease-in-out infinite 1s",
        "wave-slowest": "wave 2s ease-in-out infinite 2s",
        "wave-final": "wave 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 3s",
        wave: "wave 2s ease-in-out infinite",
        wave2: "wave2 2s ease-in-out infinite 1s",
        soundwave: "soundwave 1s ease-in-out infinite",
        waveOut: "waveOut 1.5s ease-out infinite",
        "wave-slow": "wave-slow 4s ease-in-out infinite",
        "wave-slower": "wave-slower 4s ease-in-out infinite",
        "wave-slowest": "wave-slowest 4s ease-in-out infinite",
        "float-slow": "float-slow 20s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      transitionDelay: {
        100: "100ms",
        200: "200ms",
      },
    },
  },
  plugins: [],
};
