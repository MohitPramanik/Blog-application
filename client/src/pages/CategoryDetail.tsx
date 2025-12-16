import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import type { Blog } from '../types';
import '../styles/BlogList.css';
import Loader from '../components/Loader';

const CategoryDetail: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const decoded = category ? decodeURIComponent(category) : '';
  const { isAuthenticated } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('blogs') || 'null');
        const list: Blog[] = Array.isArray(stored) ? stored : [];
        const filtered = list.filter((b) => (((b as any).categories || []) as string[]).includes(decoded));
        setBlogs(filtered);
      } catch (err) {
        setBlogs([]);
      }
      setLoading(false);
    }, 300);
  }, [decoded, isAuthenticated, navigate]);

  return (
    <div className="blog-list-page">
      <Container className="py-5">
        <Row className="mb-4">
          <Col md={8}>
            <h1 className="mb-2 fw-bold">🏷️ {decoded}</h1>
            <p className="text-muted">Posts tagged with "{decoded}"</p>
          </Col>
          <Col md={4} className="text-end align-self-center">
            <Button variant="light" onClick={() => navigate('/categories')}>← Back to Categories</Button>
          </Col>
        </Row>

        {loading ? (
         <Loader />
        ) : (
          <>
            {blogs.length > 0 ? (
              <Row className="g-4">
                {blogs.map((blog) => (
                  <Col key={blog.id} xs={12} md={6} lg={4}>
                    <BlogCard blog={blog} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-5">
                <h3 className="text-muted">No posts in this category</h3>
                <p className="text-muted">Try another category or create a new post</p>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default CategoryDetail;
