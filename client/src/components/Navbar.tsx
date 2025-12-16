import React from 'react';
import { Navbar, Nav, Container, Button, Image, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/Navbar.css';

const NavBar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, removeNotification, clearAll, notify } = useNotification();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg={theme} expand="lg" sticky="top" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-5">
          📝 BlogHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/blogs">Feed</Nav.Link>
                <Nav.Link as={Link} to="/write">Create</Nav.Link>
                <Nav.Link as={Link} to="/categories">Categories</Nav.Link>

                {/* Notifications Dropdown */}
                <Dropdown align="end" className="me-1">
                  <Dropdown.Toggle variant="light" id="notifications-toggle">
                    🔔 { /* simple badge */ }
                    {notifications.length > 0 && (
                      <span className="badge bg-danger ms-1">{notifications.length}</span>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {notifications.length === 0 ? (
                      <Dropdown.Item disabled>No notifications</Dropdown.Item>
                    ) : (
                      <>
                        {notifications.slice(0, 3).map((n) => (
                          <Dropdown.Item
                            key={n.id}
                            className="d-flex justify-content-between align-items-start"
                            onClick={() => {
                              // navigate to target if present
                              if (n.target?.kind === 'blog') navigate(`/blog/${n.target.id}`);
                              else if (n.target?.kind === 'profile') navigate(`/user/${n.target.id}`);
                            }}
                          >
                            <div>
                              <div className="fw-bold small">{n.type}</div>
                              <div className="small text-truncate" style={{ maxWidth: 220 }}>{n.message}</div>
                            </div>
                            <div>
                              <button className="btn btn-link btn-sm" onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}>✕</button>
                            </div>
                          </Dropdown.Item>
                        ))}

                        <Dropdown.Divider />
                        <Dropdown.Item as={Button} onClick={() => navigate('/notifications')}>See all</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => clearAll()}>Clear all</Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>

                {/* Theme Toggle Dropdown */}
                <Dropdown>
                  <Dropdown.Toggle variant="light">
                    {theme === 'light' ? '☀️' : '🌜'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => toggleTheme("light")}>☀️ Light Mode</Dropdown.Item>
                    <Dropdown.Item onClick={() => toggleTheme("dark")}>🌙 Dark Mode</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Profile Dropdown */}
                <Dropdown>
                  <Dropdown.Toggle variant="light">
                    <Image
                      src={user?.avatar ? user.avatar : ''}
                      roundedCircle
                      width={28}
                      height={28}
                      alt="Avatar"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/my-blogs">My Blogs</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/saved-blogs">Saved Blogs</Dropdown.Item>
                    <Dropdown.Item as={Button} onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
