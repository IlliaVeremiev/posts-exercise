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

export interface CreatePostForm {
  title: string,
  body: string,
  tags: string[],
  userId: number
}

export interface CreatePostResponse {
  id: number,
  title: string,
  body: string,
  tags: string[],
  userId: number
}
