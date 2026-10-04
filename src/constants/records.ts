export const worryCategories = ["마음", "관계", "일·학업", "일상"] as const;
export type WorryCategory = (typeof worryCategories)[number];
