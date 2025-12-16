import React, { useEffect, useState } from 'react';
import { Container, Image, Row, Col, ListGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

interface MockBlog { id: string; title: string; excerpt: string }

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; username: string; avatar?: string } | null>(null);
  const [blogs, setBlogs] = useState<MockBlog[]>([]);
  const [activity, setActivity] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetch
    setLoading(true);
    setTimeout(() => {
      setUser({ id: id || '0', username: `user_${id}`, avatar: undefined });
      setBlogs(Array.from({ length: 5 }).map((_, i) => ({ id: `${(id || '0')}-${i + 1}`, title: `Blog ${(i + 1)} by ${id}`, excerpt: 'This is a short excerpt of the blog.' })));
      setActivity([`Followed by user 12`, `Posted a new blog`, `Commented on a blog`]);
      setLoading(false);
    }, 600);
  }, [id]);

  if (loading) return <Container className="py-5">Loading...</Container>;

  return (
    <Container className="py-5">
      <Row>
        <Col md={4} className="text-center">
          <Image src={user?.avatar} roundedCircle width={140} height={140} />
          <h3 className="mt-3">{user?.username}</h3>
          <p className="text-muted">@{user?.id}</p>
        </Col>

        <Col md={8}>
          <h4>Blogs</h4>
          <ListGroup className="mb-4">
            {blogs.map((b) => (
              <ListGroup.Item key={b.id} as={Link} to={`/blog/${b.id}`} action>
                <div className="fw-bold">{b.title}</div>
                <div className="text-muted small">{b.excerpt}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h4>Activity</h4>
          <ListGroup>
            {activity.map((a, i) => (
              <ListGroup.Item key={i}>{a}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;