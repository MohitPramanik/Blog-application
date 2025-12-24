import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Categories.css';
import Loader from '../components/Loader';
import { useBlog } from '../context/BlogContext';
import BlogCategoryCard from '../components/BlogCategoryCard';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
  const { blogCategories, getAllBlogsCategories, loading } = useBlog();

  useEffect(() => {
    getAllBlogsCategories();
  }, [])

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
            {blogCategories.length > 0 ? (
              <Row className="g-4 mb-4">
                {blogCategories.map((category) => (
                  <Col key={category} xs={12} sm={6} md={4} lg={3}>
                    <Link to={category}>
                      <BlogCategoryCard category={category} />
                    </Link>
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
