import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BlogCard from '../components/BlogCard';
import type { Blog } from '../types';
import '../styles/BlogList.css';
import Loader from '../components/Loader';
import api from '../api/axiosInstance';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserBlogs = async () => {
    try {
      setLoading(true);
      let response = await api.get("/blog/user");
      setBlogs(response.data.data);
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Error fetching blogs");
      }
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserBlogs();
  }, [])


  return (
    <div className="blog-list-page">
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={8}>
            <h1 className="mb-2 fw-bold">🧑‍💻 My Blogs</h1>
            <p className="text-muted">Blogs you've authored</p>
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
                <h3 className="text-muted">No blogs yet</h3>
                <p className="text-muted">Write your first blog using the Create button</p>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default MyBlogs;


