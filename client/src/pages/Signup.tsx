import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';
import { toast } from 'react-toastify';
// import api from "../api/axiosInstance.ts";
// import axios from 'axios';

const Signup = () => {

  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signup, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    if (signupData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    if(!loading) {
      signup(signupData.username, signupData.email, signupData.password);
    }
  }

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSignupData({
    ...signupData,
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
                Create Account
              </h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-500">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose a username"
                    value={signupData.username}
                    name='username'
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="input-field"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-500">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    name='email'
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="input-field"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-500">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={signupData.password}
                    name='password'
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="input-field"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-500">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    name='confirmPassword'
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
                      Creating Account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </Form>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary fw-bold">
                    Login here
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

export default Signup;
