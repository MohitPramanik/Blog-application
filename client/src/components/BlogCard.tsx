import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Blog } from '../types';
import '../styles/Blog.css';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/blog/${blog.id}`} className="blog-card-link">
      <Card className="blog-card h-100 shadow-sm">
        <Card.Body>
      {blog.image && (
        <div className="mb-3">
          <img src={blog.image} alt={blog.title} className="w-100 rounded mb-3" style={{ maxHeight: 160, objectFit: 'cover' }} />
        </div>
      )}

            <h5 className="card-title mb-0 flex-grow-1">{blog.title}</h5>
        

          <p className="card-text text-muted small mb-3">{blog.excerpt}</p>

          <div className="blog-footer">
            <div className="d-flex align-items-center gap-2 mb-2">
              <img
                src={blog.author.avatar}
                alt={blog.author.username}
                className="author-avatar"
              />
              <div className="author-info">
                <p className="mb-0 fw-500">{blog.author.username}</p>
                <p className="mb-0 text-muted small">{formatDate(blog.createdAt)}</p>
              </div>
            </div>

            <div className="blog-meta">
              <Badge bg="light" text="dark" className="me-2">
                💬 {blog.comments.length}
              </Badge>
              <Badge bg="light" text="dark">
                👍 {blog.likes || 0}
              </Badge>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default BlogCard;
