import { Button, Card, Container, Form } from "react-bootstrap";

export default function ResetPassword() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary-subtle min-vh-100">
      <Container className="py-4">
        <Card className="p-4 w-100 mx-auto" style={{ maxWidth: "30rem" }}>

          <h1 className="text-center">Change Your Password</h1>
          <small className="text-center text-muted mb-3 px-3">Enter a new password below to change your password</small>

          <Form className="d-flex flex-column">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>New password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Re-enter new password</Form.Label>
              <Form.Control type="password" placeholder="Confirm your password" />
            </Form.Group>

            <Button variant="primary">Reset password</Button>
          </Form>

        </Card>
      </Container>
    </div>
  )
}
