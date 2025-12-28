import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Blog } from '../types';
import Loader from '../components/Loader';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { PAGE_SIZE } from "../constants/constant";
import SearchBox from '../components/SearchBox';
import '../styles/BlogList.css';

const BlogCard = React.lazy(() => import('../components/BlogCard'));
const PaginationBtns = React.lazy(() => import('../components/PaginationBtns'));

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalBlogCount, setTotalBlogCount] = useState<number>(0);


  const fetchBlogs = async (page = 1, limit = PAGE_SIZE || 12) => {
    try {
      let response = await api.get(`blog?page=${page}&limit=${limit}`);
      setBlogs(response.data.data);
      setTotalBlogCount(response.data.total_records_count);
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [fetchBlogs])



  const handleSearch = async (searchText:string) => {
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
            <SearchBox handleSearch={handleSearch} />
          </Col>
          <Col md={4} className="text-end d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
            <Button variant="primary" className="w-100 w-md-auto primary-btn" onClick={() => navigate('/write')}>
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
                  {!!searchParams.size
                    ? 'Try searching with different keywords'
                    : 'No blogs available at the moment'}
                </p>
              </div>
            )}
          </>
        )}
      </Container>

      <PaginationBtns fetchBlogs={fetchBlogs} totalCount={totalBlogCount} />
    </div>
  );
};

export default BlogList;
