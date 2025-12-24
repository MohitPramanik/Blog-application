import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import type { Blog } from '../types';
import '../styles/BlogList.css';
import Loader from '../components/Loader';
import api from '../api/axiosInstance';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoryDetail: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getBlogsByCategory = async () => {
    try {
      setLoading(true);
      let response = await api.get(`/blog?category=${category}`);
      setBlogs(response.data.data);
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Error fetching blogs");
      }
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBlogsByCategory()
  }, [])


  return (
    <div className="blog-list-page">
      <Container className="py-5">
        <Row className="mb-4">
          <Col md={8}>
            <h1 className="mb-2 fw-bold">🏷️ {category}</h1>
            <p className="text-muted">Posts tagged with "{category}"</p>
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
                  <Col key={blog._id} xs={12} md={6} lg={4}>
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
