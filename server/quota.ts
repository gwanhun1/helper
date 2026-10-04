export const DAILY_LIMIT = 10;
export function koreaDay(now = new Date()) {
  return new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
export function nextReset(now = new Date()) {
  return new Date(`${koreaDay(now)}T00:00:00+09:00`).getTime() + 24 * 60 * 60 * 1000;
}
export interface Quota { day: string; used: number; active?: string | null; leaseUntil?: number; }
export function normalizeQuota(quota: Quota | null, now = new Date()): Quota {
  return quota?.day === koreaDay(now) ? quota : { day: koreaDay(now), used: 0 };
}
