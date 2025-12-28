import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import BlogCard from '../components/BlogCard';
import type { Blog } from '../types';
import '../styles/BlogList.css';
import api from '../api/axiosInstance';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PAGE_SIZE } from "../constants/constant";
import PaginationBtns from '../components/PaginationBtns';

const SavedBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalBlogCount, setTotalBlogCount] = useState<number>(0);

  const fetchSavedBlogs = async (page = 1, limit = PAGE_SIZE || 12) => {
    try {
      setLoading(true);

      let response = await api.get(`saved-blogs?page=${page}&limit=${limit}`);

      setBlogs(response.data.data);
      setTotalBlogCount(response.data.total_records_count);
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSavedBlogs();
  }, [])

  return (
    <div className="blog-list-page">
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={8}>
            <h1 className="mb-2 fw-bold">🔖 Saved Blogs</h1>
            <p className="text-muted">Blogs you've saved to read later</p>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {blogs.length > 0 ? (
              <Row className="g-4">
                {blogs.map((blog, index) => (
                  <Col key={index} xs={12} md={6} lg={4}>
                      <BlogCard blog={blog} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-5">
                <h3 className="text-muted">No saved blogs</h3>
                <p className="text-muted">Save interesting articles from the feed to read later</p>
              </div>
            )}
          </>
        )}
      </Container>

      <PaginationBtns fetchBlogs={fetchSavedBlogs} totalCount={totalBlogCount} />
    </div>
  );
};

export default SavedBlogs;

