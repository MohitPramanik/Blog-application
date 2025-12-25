import { useEffect, useState } from 'react';
import type { Blog } from '../types';
import BlogDetail from './BlogDetail';
import EditBlog from './EditBlog';

const BlogWrapper: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isEditing, setIsEditing] = useState(false);


  return !isEditing ? (
    <BlogDetail
      blog={blog}
      setBlog={setBlog}
      onEdit={() => setIsEditing(true)}
    />
  ) : (
    <EditBlog
      blog={blog}
      setBlog={setBlog}
      onCancel={() => setIsEditing(false)}
      onSuccess={() => setIsEditing(false)}
    />
  )

};

export default BlogWrapper;
