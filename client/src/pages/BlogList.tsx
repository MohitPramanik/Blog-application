import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import type { Blog } from '../types';
import '../styles/BlogList.css';
import Loader from '../components/Loader';
import api from '../api/axiosInstance';
import axios from 'axios';
import { toast } from 'react-toastify';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // to change url based on search
      if (!searchText.length) {
        setSearchParams()
      }
      else {
        setSearchParams({
          search: searchText,
        });
      }

      /* 
        to stop preventing api call when there is nothing to search in searchbox 
        or when already have results for the searched element and still searching for the same
      */
      if ((!searchParams.size && !searchText.length) || (searchParams.get("search") === searchText)) {
        return;
      }

      let response = await api.get(`blog?search=${searchText}`);
      setBlogs(response.data.data);

    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
    finally {
      setLoading(false);
    }
  }

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
            <InputGroup as={"form"} onSubmit={handleSearch} className="search-input">
              <InputGroup.Text as={"button"} className="bg-white border-end-0">
                🔍
              </InputGroup.Text>
              <Form.Control
                placeholder="Search blogs by title, content, or author..."
                value={searchText}
                onChange={handleChange}
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
                  {searchText
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
