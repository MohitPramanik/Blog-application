import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Login: React.FC = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
      navigate('/blogs');
    } catch {
      // Error is handled by context
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="auth-page min-h-max p-3">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={12} sm={10} md={8} lg={5}>
            <Card className="auth-card shadow-lg">
              <Card.Body className="p-4 p-sm-5">
                <h2 className="mb-4 text-center fw-bold text-primary">
                  Welcome Back
                </h2>

                {error && (
                  <Alert variant="danger" dismissible>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-500">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      name='email'
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="input-field"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-500">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      name='password'
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="input-field"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-bold py-2 submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Form>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary fw-bold">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
