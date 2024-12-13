import { Item } from "../hooks/useContentsData";

export const processContentData = (rawContent: any, id: string): Item => {
  if (!rawContent) {
    console.warn(`No content found for ID: ${id}`);
    return {
      content: "",
      date: "",
      id: id,
      response: "",
      username: "",
      comments: [],
      like: 0,
      likedBy: [],
      level: 1,
      open: true
    };
  }

  return {
    content: rawContent.content || "",
    date: rawContent.date || "",
    id: id,
    response: rawContent.response || "",
    username: rawContent.username || "",
    comments: Array.isArray(rawContent.comments) ? rawContent.comments : [],
    like: typeof rawContent.like === 'number' ? rawContent.like : 0,
    likedBy: Array.isArray(rawContent.likedBy) ? rawContent.likedBy : [],
    level: typeof rawContent.level === 'number' ? rawContent.level : 1,
    open: typeof rawContent.open === 'boolean' ? rawContent.open : true
  };
};

export const processContentsData = (contentsData: Record<string, any>): Item[] => {
  if (!contentsData || typeof contentsData !== 'object') {
    console.warn('Invalid contents data:', contentsData);
    return [];
  }

  return Object.entries(contentsData)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => processContentData(value, key));
};
