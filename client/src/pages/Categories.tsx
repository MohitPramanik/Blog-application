import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Blog } from '../types';
import '../styles/Categories.css';
import Loader from '../components/Loader';

const Categories: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('blogs') || 'null');
        const list = Array.isArray(stored) ? stored : [];
        setBlogs(list);

        // derive categories
        const setCat = new Set<string>();
        list.forEach((b: Blog) => {
          const cats = (b as any).categories;
          if (Array.isArray(cats)) {
            cats.forEach((c: string) => setCat.add(c));
          } else {
            setCat.add('Uncategorized');
          }
        });
        setCategories(Array.from(setCat).sort());
      } catch (err) {
        setBlogs([]);
        setCategories([]);
      }
      setLoading(false);
    }, 300);
  }, [isAuthenticated, navigate]);

  // show categories as cards
  const handleOpenCategory = (c: string) => {
    navigate(`/categories/${encodeURIComponent(c)}`);
  };

  return (
    <div className="blog-list-page">
      <Container className="py-5">
        <Row className="mb-4">
          <Col md={8}>
            <h1 className="mb-2 fw-bold">🏷️ Categories</h1>
            <p className="text-muted">Browse posts by category</p>
          </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : (
          <>
            {categories.length > 0 ? (
              <Row className="g-4 mb-4">
                {categories.map((c) => (
                  <Col key={c} xs={12} sm={6} md={4} lg={3}>
                    <div
                      role="button"
                      className="category-card p-4 h-100 d-flex flex-column justify-content-between"
                      onClick={() => handleOpenCategory(c)}
                      onKeyDown={(e) => e.key === 'Enter' && handleOpenCategory(c)}
                      tabIndex={0}
                    >
                      <div>
                        <div className="category-icon mb-3">🏷️</div>

                        <h5 className="category-title mb-1">{c}</h5>

                        <p className="category-count">
                          {
                            blogs.filter(
                              (b) =>
                                (((b as any).categories || []) as string[]).includes(c)
                            ).length
                          }{" "}
                          posts
                        </p>
                      </div>

                      <div className="mt-3">
                        <span className="category-link">
                          View posts →
                        </span>
                      </div>
                    </div>
                  </Col>

                ))}
              </Row>
            ) : (
              <div className="text-center py-5">
                <h3 className="text-muted">No categories yet</h3>
                <p className="text-muted">Categories are derived from posts in the feed</p>
              </div>
            )}


          </>
        )}
      </Container>
    </div>
  );
};

export default Categories;
