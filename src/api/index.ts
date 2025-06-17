import axios from 'axios';
import type { Page } from 'src/models/page';
import type { CreatePostForm, CreatePostResponse, Post } from 'src/models/post';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default {
  /**
   * Returns an object with the same type as requested from the API.
   * Since dummyjson.com only returns primitive types (string, array, object, number),
   * for more complex objects that use dates or prices, I would create
   * separate DTO objects with primitives and map them to ready-to-use models
   * using utility methods.
   */
  getPosts: async (limit: number, skip: number): Promise<Page<Post>> => {
    const response = await api.get<Page<Post>>(`/posts`, { params: { limit, skip, sortBy: 'id', order: 'desc' } });
    return response.data;
  },
  createPost: async (form: CreatePostForm): Promise<CreatePostResponse> => {
    const response = await api.post<CreatePostResponse>(`/posts/add`, form);
    return response.data;
  }
};
