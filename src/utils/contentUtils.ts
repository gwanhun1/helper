import type { Item, Comment } from "../hooks/useContentsData";
const objectValues = (value: unknown): any[] =>
  value && typeof value === "object" ? Object.values(value) : [];
const likedUsers = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((id) => typeof id === "string")
    : value && typeof value === "object"
      ? Object.keys(value).filter(
          (id) => (value as Record<string, boolean>)[id],
        )
      : [];
export const processContentData = (raw: any, id: string): Item => {
  const content = raw || {};
  return {
    id,
    category: content.category || "마음",
    content: typeof content.content === "string" ? content.content : "",
    response: typeof content.response === "string" ? content.response : "",
    date: typeof content.date === "string" ? content.date : "",
    timestamp: Date.parse(content.date) || 0,
    username: content.username || "익명의 숲지기",
    userId: content.userId || "",
    open: content.open === true,
    level:
      content.moodSource === "self" &&
      Number.isInteger(content.level) &&
      content.level >= 1 &&
      content.level <= 5
        ? content.level
        : undefined,
    moodSource: content.moodSource,
    comments: objectValues(content.comments)
      .filter((comment) => comment?.id && typeof comment.content === "string")
      .map((comment): Comment => ({
        ...comment,
        username: "익명의 숲지기",
        likedBy: likedUsers(comment.likedBy),
      })),
    like: typeof content.like === "number" ? content.like : 0,
    likedBy: likedUsers(content.likedBy),
    who: content.who || "",
    how: content.how || "",
  };
};
export const processContentsData = (
  contents: Record<string, unknown> | null,
): Item[] => {
  if (!contents || typeof contents !== "object") return [];
  return Object.entries(contents)
    .filter(([, value]) => value && typeof value === "object")
    .map(([id, value]) => processContentData(value, id))
    .sort((a, b) => a.timestamp - b.timestamp || a.id.localeCompare(b.id));
};
