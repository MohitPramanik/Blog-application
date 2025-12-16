import React, { useState } from 'react';
import { Container, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 10;

const NotificationsPage: React.FC = () => {
  const { notifications, removeNotification, clearAll, fetchOlder } = useNotification();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigate = useNavigate();

  const visible = notifications.slice(0, page * PAGE_SIZE);

  const handleSeeMore = async () => {
    // If we have more already loaded, just increase page
    if (notifications.length > page * PAGE_SIZE) {
      setPage((p) => p + 1);
      return;
    }

    // Otherwise fetch more from the "server"
    setLoadingMore(true);
    await fetchOlder(PAGE_SIZE);
    setLoadingMore(false);
    setPage((p) => p + 1);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Notifications</h1>
        <div>
          <Button variant="secondary" className="me-2" onClick={() => clearAll()}>Clear all</Button>
        </div>
      </div>

      <ListGroup>
        {visible.length === 0 && <div className="text-muted">No notifications yet.</div>}

        {visible.map((n) => (
          <ListGroup.Item key={n.id} action onClick={() => {
            if (n.target?.kind === 'blog') navigate(`/blog/${n.target.id}`);
            else if (n.target?.kind === 'profile') navigate(`/user/${n.target.id}`);
          }} className="d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold small-cap text-uppercase small">{n.type}</div>
              <div className="mt-1">{n.message}</div>
            </div>
            <div>
              <Button variant="link" size="sm" onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}>✕</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="mt-3 d-flex justify-content-center">
        {loadingMore ? (
          <Spinner animation="border" />
        ) : (
          <Button onClick={handleSeeMore} disabled={loadingMore}>See more</Button>
        )}
      </div>
    </Container>
  );
};

export default NotificationsPage;