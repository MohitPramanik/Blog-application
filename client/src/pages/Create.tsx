import { Button, Container, Form } from "react-bootstrap";
import { SiLibreofficewriter } from "react-icons/si";

export default function Create() {
  return (
    <div>
      <Container className="py-5" style={{ maxWidth: "50rem" }}>
        <div className="mb-4">
          <h1 className="fw-bold display-6 mb-2 text-primary">
            <SiLibreofficewriter className="text-success" /> Write a New Blog 
          </h1>

          <p className="text-muted mb-0">
            Share your thoughts, tutorials, or opinions.
          </p>
        </div>

        <Form>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label className="fw-semibold">Title</Form.Label>
            <Form.Control type="email" placeholder="Your blog title..." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="content">
            <Form.Label className="fw-semibold">Content</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Write here..." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select aria-label="Category">
              <option>Select</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary">Publish</Button>
            <Button variant="outline-dark">Cancel</Button>
          </div>

        </Form>
      </Container>
    </div>
  )
}


