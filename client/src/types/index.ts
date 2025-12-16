export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Blog {
  title: string,
  content: string,
  category: string
} 

export interface Comment {
  id: string;
  content: string;
  author: User;
  blogId: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  userVote?: 'like' | 'dislike' | null; // Track if current user liked/disliked
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}
