import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Spinner,
  Alert,
  Dropdown
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Blog } from '../types';
import '../styles/BlogDetail.css';
import api from '../api/axiosInstance';
import { formatTimeToPeriod } from "../utils/formatDate";
import profileImagePlaceholder from '../assets/common/profile-placeholder.jpg';
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import CommentArea from '../components/CommentArea';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();

  // const truncatedHtml = truncate(blog.content, 120, { ellipsis: "..." });

  const fetchBlogData = async () => {
    try {
      let response = await api.get(`/blog/${id}`);
      setBlog(response.data.data);
      setCommentCount(response.data.data.commentsCount);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchBlogData();
    setLoading(false);
  }, [])

  const handleDeleteBlog = async () => {
    setLoading(true);
    try {
      let response = await api.delete(`blog/${id}`);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/blogs");
      }, 500)
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      // console.log(error);
      setLoading(false);
    }
  }

  const increaseCommentCount = () => {
    setCommentCount((prev) => prev + 1);
  }

  const decreaseCommentCount = () => {
    setCommentCount((prev) => prev < 1 ? 0 : prev - 1);
  }

  if (loading) {
    return (
      <div className="blog-detail-page d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!blog) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Blog not found</Alert>
      </Container>
    );
  }

  return (
    <div className="blog-detail-page">
      <Container className="py-5">
        <Row className="justify-content-center mb-5">
          <Col lg={8}>
            {/* Blog Header */}
            <Card className="blog-header-card border-0 shadow-sm mb-4 overflow-hidden">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between">
                  <h1 className="mb-3 fw-bold" style={{ width: "90%" }}>{blog.title || "Title"}</h1>

                  {/* menu to display only if owned by logged in user */}
                  {
                    blog.author._id === user?.userId ? (
                      <Dropdown>
                        <Dropdown.Toggle className='blog-update-toggle-menu'>
                          <BsThreeDotsVertical />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item as={Button}> <MdEdit className='me-2' />Edit</Dropdown.Item>
                          <Dropdown.Item as={Button} onClick={handleDeleteBlog}><MdDelete className='me-2' />Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : null
                  }

                </div>

                <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                  <Image
                    src={blog.author?.profileImageUrl || profileImagePlaceholder}
                    alt={blog.author?.username || "profile image"}
                    roundedCircle
                    width={48}
                    height={48}
                    className='object-fit-cover'
                  />
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-bold">{blog.author?.username || "User"}</p>
                    <small className="text-muted">{formatTimeToPeriod(blog.createdAt || "")}</small>
                  </div>

                  {
                    (user?.userId !== blog.author?._id) &&
                    <div className="d-flex align-items-center gap-2">
                      <Button className='save-btn' size="sm">
                        {saved ? 'Saved' : 'Save'}
                      </Button>
                      <Button className='primary-btn' size="sm">
                        Follow
                      </Button>
                    </div>
                  }
                </div>

                <div className="blog-stats d-flex gap-3 mb-4">
                  <div>
                    <span className="fw-bold">{blog.likesCount || 0}</span>
                    <span className="text-muted ms-2">Likes</span>
                  </div>
                  <div>
                    <span className="fw-bold">{commentCount}</span>
                    <span className="text-muted ms-2">Comments</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Blog Content */}
            <Card className="blog-content-card border-0 shadow-sm mb-4 overflow-hidden">
              <Card.Body className="p-4">
                <div className="blog-content">{blog.content}</div>
              </Card.Body>
            </Card>

            <CommentArea blogId={id} increaseCommentCount={increaseCommentCount} decreaseCommentCount={decreaseCommentCount} />
          </Col>
        </Row>

        {/* Back Button */}
        <Row className="justify-content-center">
          <Col lg={8}>
            <Button
              variant="light"
              onClick={() => navigate('/blogs')}
              className="w-100 w-md-auto"
            >
              ← Back to Blogs
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogDetail;
