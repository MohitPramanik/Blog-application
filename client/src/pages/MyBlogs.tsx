import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import type { Blog } from '../types';
import '../styles/BlogList.css';
import Loader from '../components/Loader';

const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    content: 'React Hooks provide a more direct API to the React concepts you already know...',
    excerpt: 'Learn the fundamentals of React Hooks and how to use them in your projects.',
    author: {
      id: '1',
      username: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    categories: ['react', 'hooks'],
    comments: [
      {
        id: '1',
        content: 'This is a great introduction to hooks!',
        author: {
          id: '2',
          username: 'Mike Chen',
          email: 'mike@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
        },
        blogId: '1',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 5,
        dislikes: 0,
        userVote: null
      }
    ],
    likes: 12
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    content: 'TypeScript is a powerful tool for building large-scale JavaScript applications...',
    excerpt: 'Discover best practices for writing scalable TypeScript code.',
    author: {
      id: '2',
      username: 'Mike Chen',
      email: 'mike@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    categories: ['typescript'],
    comments: [],
    likes: 8
  },
  {
    id: '3',
    title: 'Responsive Design with Bootstrap 5',
    content: 'Bootstrap 5 is the latest version of the popular CSS framework...',
    excerpt: 'Master responsive design principles with Bootstrap 5.',
    author: {
      id: '3',
      username: 'Emma Wilson',
      email: 'emma@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    categories: ['bootstrap', 'design'],
    comments: [
      {
        id: '2',
        content: 'Very helpful guide!',
        author: {
          id: '1',
          username: 'Sarah Johnson',
          email: 'sarah@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
        },
        blogId: '3',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 3,
        dislikes: 0,
        userVote: null
      }
    ],
    likes: 15
  },
  {
    id: '4',
    title: 'State Management with React Context',
    content: 'Context API provides a way to pass data through the component tree...',
    excerpt: 'Explore how to manage global state using React Context.',
    author: {
      id: '1',
      username: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    categories: ['react', 'context'],
    comments: [],
    likes: 20
  }
  ,
  {
    id: '5',
    title: "A Day in the Life of a Frontend Dev",
    content: 'From morning standups to shipping features — best practices and routines that help me stay productive.',
    excerpt: 'Practical tips and routines for frontend developers.',
    author: {
      id: '1',
      username: 'John Doe',
      email: 'user@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    categories: ['career', 'tips'],
    comments: [],
    likes: 4
  },
  {
    id: '6',
    title: 'Improving App Performance',
    content: 'Small optimizations that yield big improvements in perceived performance.',
    excerpt: 'Simple performance tweaks for web apps.',
    author: {
      id: '1',
      username: 'John Doe',
      email: 'user@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    categories: ['performance'],
    comments: [],
    likes: 6
  },
  {
    id: '7',
    title: 'Writing Reusable UI Components',
    content: 'Patterns and tips for building composable, testable UI components.',
    excerpt: 'Designing components that scale across projects.',
    author: {
      id: '4',
      username: 'Alex Turner',
      email: 'alex@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    categories: ['components', 'ui'],
    comments: [],
    likes: 9
  }
];

const MyBlogs: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('blogs') || 'null');
        if (Array.isArray(stored) && stored.length > 0) {
          // setBlogs(stored.filter((b: Blog) => b.author.id === user?.id));
          setBlogs(mockBlogs);
        } else {
          // Nothing saved yet — fallback to whatever exists in BlogList mock
          setBlogs([]);
        }
      } catch (err) {
        setBlogs([]);
      }
      setLoading(false);
    }, 400);
  }, [isAuthenticated, navigate, user]);

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
                  <Col key={blog.id} xs={12} md={6} lg={4}>
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


