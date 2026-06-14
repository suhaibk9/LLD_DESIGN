export interface CommentData {
  id: string | number;
  content: string;
  votes: number;
  timestamp: string;
  replies: CommentData[];
}

export type SortOrder = "newest" | "oldest" | "vote";
export type VoteAction = "up" | "down";
