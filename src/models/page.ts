export interface Page<T> {
  posts: T[];
  total: number;
  skip: number;
  limit: number;
}
