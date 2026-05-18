import React, { memo, useCallback } from 'react';
import { Card, Badge } from 'react-bootstrap';
import profileImagePlaceholder from '../assets/profile-placeholder.jpg';
import { FaComment } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import '../styles/Blog.css';
import { Link } from 'react-router';
import type { BlogCardProps } from '../types/Blog';
import { formatTimeToPeriod } from '../utils/formatDate';


const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {

    const handleImageLoadError = useCallback((e: any) => {
        e.currentTarget.src = profileImagePlaceholder
    }, [])

    return (
        <Link to={`/blogs/${blog._id}`} className="blog-card-link shadow-sm">
            <Card className="blog-card h-100 shadow-sm">
                <Card.Body>
                    <h5 className="card-title mb-0 flex-grow-1">{blog.title}</h5>

                    <p className="card-text text-muted small mb-3">{blog.content}</p>

                    <div className="blog-footer">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <img
                                src={blog.author?.profileImageUrl || profileImagePlaceholder}
                                alt="Username"
                                loading="lazy"
                                className="author-avatar"
                                onError={handleImageLoadError}
                            />
                            <div className="author-info">
                                <p className="mb-0 fw-500">{blog.author?.username}</p>
                                <p className="mb-0 text-muted small">{formatTimeToPeriod(blog.createdAt)}</p>
                            </div>
                        </div>

                        <div className="blog-meta">
                            <Badge bg="light" text="dark" className="me-2">
                                <FaComment /> {blog.commentsCount || 0}
                            </Badge>
                            <Badge bg="light" text="dark">
                                <BiSolidLike /> {blog.likesCount || 0}
                            </Badge>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default memo(BlogCard);
