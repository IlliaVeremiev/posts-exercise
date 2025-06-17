export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: PostReactions;
  views: number;
  userId: number;
}

interface PostReactions {
  likes: number;
  dislikes: number;
}
