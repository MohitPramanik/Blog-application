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

export interface BlogCardProps {
  blog: Blog;
}