export interface Comment {
  id: string;
  username: string;
  content: string;
  date: string;
  likes: number;
  likedBy?: string[];
}

export interface MainContent {
  id: string;
  response: string;
  date: string;
  like?: number;
  who?: string;
  username?: string;
}
