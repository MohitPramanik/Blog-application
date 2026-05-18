import { Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router";

export default function ForgotPassword() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary-subtle min-vh-100">
      <Container className="py-4">
        <Card className="p-4 w-100 mx-auto" style={{ maxWidth: "30rem" }}>

          <h1 className="text-center">Forgot password?</h1>
          <small className="text-center text-muted mb-3 px-3">Enter the email used for your account and we'll send you a link to reset your password</small>

          <Form className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Button variant="primary">Get OTP</Button>
          </Form>

          <small className="text-center mt-3">
            <Link to="/login">Back to Login</Link>
          </small>
        </Card>
      </Container>
    </div>
  )
}
