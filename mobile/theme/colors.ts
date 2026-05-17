/**
 * 마음 지도 컬러 팔레트
 * 톤: Linear/Stripe/Vercel류의 cool slate 베이스 + Tailwind emerald 포인트.
 *
 * 컬러 위계
 *  1) 베이스: slate-50 화이트 (cool, clean)
 *  2) 메인 포인트: emerald (alive, fresh)
 *  3) 서브 포인트: slate-900 navy (강조/카운트/리버스)
 */

export const colors = {
  // 베이스 — Tailwind slate-50/100/200/300 계열
  bg: "#F8FAFC", // slate-50
  surface: "#FFFFFF",
  surfaceAlt: "#F1F5F9", // slate-100
  border: "#E2E8F0", // slate-200
  borderStrong: "#CBD5E1", // slate-300

  // 텍스트 — slate-900/600/400 (cool gray)
  textPrimary: "#0F172A", // slate-900
  textSecondary: "#475569", // slate-600
  textTertiary: "#94A3B8", // slate-400
  textPlaceholder: "#CBD5E1", // slate-300

  // 민트 — Tailwind emerald 계열 (베이스가 cool해 채도가 더 살아 보임)
  mint: "#10B981", // emerald-500
  mintDeep: "#059669", // emerald-600
  mintSoft: "#D1FAE5", // emerald-100
  mintInk: "#065F46", // emerald-800

  // 네이비 — 강조/리버스 카드/카운트
  navy: "#0F172A", // slate-900
  navyDeep: "#020617", // slate-950
  navySoft: "#E2E8F0", // slate-200
  navyInk: "#334155", // slate-700

  // 코랄 — 좋아요/알림 강조
  coral: "#F43F5E", // rose-500 (조금 더 vivid)
  coralSoft: "#FFE4E6", // rose-100

  // 골드 — 별빛/특별한 순간
  gold: "#EAB308", // yellow-500
  goldSoft: "#FEF9C3", // yellow-100

  // 시스템
  white: "#FFFFFF",
  black: "#020617",
  overlay: "rgba(15, 23, 42, 0.45)",
  shadow: "rgba(15, 23, 42, 0.08)",
} as const;

export type ColorKey = keyof typeof colors;
