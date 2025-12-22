import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import type { Blog } from '../types';
import '../styles/BlogList.css';
import Loader from '../components/Loader';
import api from '../api/axiosInstance';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      let response = await api.get("/blog");
      setBlogs(response.data.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchBlogs();
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term)
      );
      setFilteredBlogs(filtered);
    }
  };

  return (
    <div className="blog-list-page">
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={8}>
            <h1 className="mb-2 fw-bold">📚 Explore Blogs</h1>
            <p className="text-muted">Discover interesting articles from our community</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={8}>
            <InputGroup className="search-input">
              <InputGroup.Text className="bg-white border-end-0">
                🔍
              </InputGroup.Text>
              <Form.Control
                placeholder="Search blogs by title, content, or author..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-start-0"
              />
            </InputGroup>
          </Col>
          <Col md={4} className="text-end d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
            <Button variant="primary" className="w-100 w-md-auto" onClick={() => navigate('/write')}>
              ✍️ Write Blog
            </Button>
          </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : (
          <>
            {blogs.length > 0 ? (
              <Row className="g-4">
                {blogs.map((blog) => (
                  <Col key={blog?._id} xs={12} md={6} lg={4}>
                    <BlogCard blog={blog} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-5">
                <h3 className="text-muted">No blogs found</h3>
                <p className="text-muted">
                  {searchTerm
                    ? 'Try searching with different keywords'
                    : 'No blogs available at the moment'}
                </p>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default BlogList;
