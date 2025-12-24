import type { SetStateAction } from "react";

export type User = {
  userId: string;
  username: string;
  email: string;
  profileImageUrl?: string;
  dob?: string;
  role?: "Admin" | "User" | "";
}

export interface Blog {
  _id?: string;
  title: string;
  content: string;
  category: string;
  author: {
    _id?: string;
    username: string;
    profileImageUrl?: string
  };
  createdAt: string;
  likesCount?: number;
  commentsCount?: number;
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

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, email: string) => void;
  signup: (username: string, email: string, password: string) => void;
  loading: boolean;
  logout: () => void;
  isAuthchecked: boolean;
}

export type BlogContextType = {
  blogCategories: [];
  getAllBlogsCategories: () => void;
  loading: boolean;
}

export type AuthContextProps = {
  children: React.ReactNode;
}

export type BlogContextProps = {
  children: React.ReactNode;
}