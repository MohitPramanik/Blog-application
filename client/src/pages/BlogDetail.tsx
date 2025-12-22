import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
  Spinner,
  Alert,
  Dropdown
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CommentItem from '../components/CommentItem';
import DOMPurify from "dompurify";
import truncate from "html-truncate";
import type { Blog, Comment as CommentType } from '../types';
import '../styles/BlogDetail.css';
import api from '../api/axiosInstance';
import { formatTimeToPeriod } from "../utils/formatDate";
import profileImagePlaceholder from '../assets/common/profile-placeholder.jpg';
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [userCommentVotes, setUserCommentVotes] = useState<{ [key: string]: 'like' | 'dislike' | null }>({});
  const [saved, setSaved] = useState(false);
  const {user} = useAuth();

  // const truncatedHtml = truncate(blog.content, 120, { ellipsis: "..." });

  const fetchBlogData = async () => {
    try {
      let response = await api.get(`/blog/${id}`);
      setBlog(response.data.data);
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

  const handleAddComment = () => { }

  console.log(user);


  // useEffect(() => {

  //   // Simulate API call
  //   setLoading(true);
  //   setTimeout(() => {
  //     try {
  //       const stored = JSON.parse(localStorage.getItem('blogs') || 'null');
  //       if (Array.isArray(stored)) {
  //         const found = stored.find((b: any) => b.id === id);
  //         if (found) {
  //           setBlog(found);
  //           setLoading(false);
  //           return;
  //         }
  //       }
  //     } catch (err) {
  //       // ignore
  //     }

  //     const foundBlog = mockBlogs[id || '1'];
  //     if (foundBlog) {
  //       setBlog(foundBlog);
  //     } else {
  //       navigate('/blogs');
  //     }
  //     setLoading(false);
  //   }, 500);
  // }, [id, isAuthenticated, navigate]);

  // track whether current user has saved this blog
  // useEffect(() => {
  //   if (!user || !blog) return;
  //   try {
  //     const key = `saved_blogs_${user.id}`;
  //     const arr: string[] = JSON.parse(localStorage.getItem(key) || '[]');
  //     setSaved(arr.includes(blog.id));
  //   } catch (err) {
  //     setSaved(false);
  //   }
  // }, [user, blog]);

  // const toggleSave = () => {
  //   if (!user || !blog) return;
  //   const key = `saved_blogs_${user.id}`;
  //   const arr: string[] = JSON.parse(localStorage.getItem(key) || '[]');

  //   let newArr: string[];
  //   if (arr.includes(blog.id)) {
  //     newArr = arr.filter((i) => i !== blog.id);
  //     setSaved(false);
  //   } else {
  //     newArr = [blog.id, ...arr];
  //     setSaved(true);
  //   }

  //   localStorage.setItem(key, JSON.stringify(newArr));
  // };

  // const handleAddComment = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!commentText.trim() || !user || !blog) return;

  //   setSubmittingComment(true);

  //   try {
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 500));

  //     const newComment: CommentType = {
  //       id: String(Math.random()),
  //       content: commentText,
  //       author: {
  //         id: user.id,
  //         username: user.username,
  //         email: user.email,
  //         avatar: user.avatar
  //       },
  //       blogId: blog.id,
  //       createdAt: new Date().toISOString(),
  //       likes: 0,
  //       dislikes: 0,
  //       userVote: null
  //     };

  //     setBlog({
  //       ...blog,
  //       comments: [newComment, ...blog.comments]
  //     });

  //     setCommentText('');
  //   } catch (error) {
  //     console.error('Failed to add comment:', error);
  //   } finally {
  //     setSubmittingComment(false);
  //   }
  // };

  // const handleCommentLike = (commentId: string) => {
  //   if (!blog) return;

  //   setUserCommentVotes((prev) => ({
  //     ...prev,
  //     [commentId]: prev[commentId] === 'like' ? null : 'like'
  //   }));

  //   // Update blog comments
  //   const updatedComments = blog.comments.map((comment) => {
  //     if (comment.id === commentId) {
  //       const currentVote = userCommentVotes[commentId];
  //       let likes = comment.likes;
  //       let dislikes = comment.dislikes;

  //       if (currentVote === 'like') {
  //         likes -= 1;
  //       } else if (currentVote === 'dislike') {
  //         dislikes -= 1;
  //         likes += 1;
  //       } else {
  //         likes += 1;
  //       }

  //       return { ...comment, likes, dislikes, userVote: 'like' as const };
  //     }
  //     return comment;
  //   });

  //   setBlog({ ...blog, comments: updatedComments });
  // };

  // const handleCommentDislike = (commentId: string) => {
  //   if (!blog) return;

  //   setUserCommentVotes((prev) => ({
  //     ...prev,
  //     [commentId]: prev[commentId] === 'dislike' ? null : 'dislike'
  //   }));

  //   // Update blog comments
  //   const updatedComments = blog.comments.map((comment) => {
  //     if (comment.id === commentId) {
  //       const currentVote = userCommentVotes[commentId];
  //       let likes = comment.likes;
  //       let dislikes = comment.dislikes;

  //       if (currentVote === 'dislike') {
  //         dislikes -= 1;
  //       } else if (currentVote === 'like') {
  //         likes -= 1;
  //         dislikes += 1;
  //       } else {
  //         dislikes += 1;
  //       }

  //       return { ...comment, likes, dislikes, userVote: 'dislike' as const };
  //     }
  //     return comment;
  //   });

  //   setBlog({ ...blog, comments: updatedComments });
  // };

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   });
  // };

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
            <Card className="blog-header-card border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between">
                  <h1 className="mb-3 fw-bold">{blog.title}</h1>

                  {/* menu to display only if owned by logged in user */}

                  <Dropdown>
                    <Dropdown.Toggle className='bg-transparent text-black border-0' id="dropdown-basic">
                      <BsThreeDotsVertical />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Button}> <MdEdit className='me-2' />Edit</Dropdown.Item>
                      <Dropdown.Item as={Button}><MdDelete className='me-2' />Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
                    <p className="mb-0 fw-bold">{blog.author.username}</p>
                    <small className="text-muted">{formatTimeToPeriod(blog.createdAt)}</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Button variant={saved ? 'success' : 'outline-primary'} size="sm">
                      {saved ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      Follow
                    </Button>
                  </div>
                </div>

                <div className="blog-stats d-flex gap-3 mb-4">
                  <div>
                    <span className="fw-bold">{blog.likesCount || 0}</span>
                    <span className="text-muted ms-2">Likes</span>
                  </div>
                  <div>
                    <span className="fw-bold">{blog.commentsCount}</span>
                    <span className="text-muted ms-2">Comments</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Blog Content */}
            <Card className="blog-content-card border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <div className="blog-content" dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(truncate(blog.content, 120, { ellipsis: "..." })),
                }}>
                </div>
              </Card.Body>
            </Card>

            {/* Comments Section */}
            <Card className="comments-section border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className="mb-4 fw-bold">Comments ({blog.commentsCount})</h4>

                {/* Add Comment Form */}
                <Form onSubmit={handleAddComment} className="mb-5 pb-4 border-bottom">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-500">Add your comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Share your thoughts..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      disabled={submittingComment}
                      className="comment-textarea"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!commentText.trim() || submittingComment}
                  >
                    {submittingComment ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Posting...
                      </>
                    ) : (
                      'Post Comment'
                    )}
                  </Button>
                </Form>

                {/* Comments List */}
                {/* <div className="comments-list">
                  {blog.comments.length > 0 ? (
                    blog.comments.map((comment) => (
                      <CommentItem
                        key={comment.id}
                        comment={comment}
                        onLike={() => handleCommentLike(comment.id)}
                        onDislike={() => handleCommentDislike(comment.id)}
                      />
                    ))
                  ) : (
                    <p className="text-muted text-center py-4">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div> */}
              </Card.Body>
            </Card>
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
