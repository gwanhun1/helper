export const moodLabels = [
  "많이 힘들어요",
  "조금 지쳤어요",
  "보통이에요",
  "편안해요",
  "기분 좋아요",
];
export const moodEmoji = (level?: number) =>
  level && level >= 1 && level <= 5
    ? ["😔", "😕", "😐", "🙂", "😊"][Math.round(level) - 1]
    : "📝";
export const moodLabel = (level?: number) =>
  level && level >= 1 && level <= 5
    ? moodLabels[Math.round(level) - 1]
    : "기분 미기록";
export const moodBucket = (level: number) =>
  level >= 4 ? "good" : level >= 3 ? "neutral" : "bad";
export function koreaDate(date = new Date()) {
  return new Date(date.getTime() + 9 * 3600000).toISOString().slice(0, 10);
}
