import { Platform } from "react-native";

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  full: 9999,
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  "2xl": 30,
  "3xl": 38,
} as const;

/**
 * 시스템 한글 폰트.
 * Pretendard TTF가 assets/fonts에 들어오면 여기를 'Pretendard-*'로 교체.
 */
export const fontFamily = {
  regular: Platform.select({
    ios: "Apple SD Gothic Neo",
    android: "sans-serif",
  }),
  medium: Platform.select({
    ios: "Apple SD Gothic Neo",
    android: "sans-serif-medium",
  }),
  bold: Platform.select({
    ios: "Apple SD Gothic Neo",
    android: "sans-serif",
  }),
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  black: "800",
} as const;

export const shadow = {
  subtle: Platform.select({
    ios: {
      shadowColor: "#0F1311",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
    },
    android: { elevation: 1 },
    default: {},
  }),
  card: Platform.select({
    ios: {
      shadowColor: "#0F1311",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
    },
    android: { elevation: 3 },
    default: {},
  }),
  lifted: Platform.select({
    ios: {
      shadowColor: "#0F1311",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.1,
      shadowRadius: 24,
    },
    android: { elevation: 8 },
    default: {},
  }),
} as const;
