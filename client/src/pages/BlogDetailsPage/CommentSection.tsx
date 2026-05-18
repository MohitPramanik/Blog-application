import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useGetBlogCommentsQuery } from '../../store/services/blogApi';
import { formatTimeToPeriod } from '../../utils/formatDate';

interface CommentSectionProps {
  blogId: string;
}

interface Comment {
  _id: string;
  author: {
    username: string;
  };
  content: string;
  isLiked: boolean;
  createdAt: string;
}


export default function CommentSection({ blogId }: CommentSectionProps) {

  const { data, isLoading, isError, isSuccess } = useGetBlogCommentsQuery({ blogId })

  const comments = data?.data;

  return (
    <Row className="justify-content-center">
      <Col lg={9}>

        <div className="mb-4">
          <h3 className="fw-bold">
            Comments
          </h3>

          <p className="text-muted">
            Share your thoughts and join the discussion. The internet remains
            operational primarily because people continue commenting on things.
          </p>
        </div>

        {/* Add Comment */}
        <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Your Comment</Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your comment here..."
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="dark" className="px-4 rounded-pill">
                Post Comment
              </Button>
            </div>

          </Form>
        </Card>

        {/* Comment List */}
        <div className="d-flex flex-column gap-4 overflow-auto" style={{ maxHeight: "20rem" }}>

          {
            comments?.map((comment: Comment) => (
              <Card key={comment._id} className="border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
                <Card.Body className="p-4">

                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-start mb-3">

                    <div className="d-flex align-items-center gap-3">

                      {/* Avatar */}
                      <div
                        className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
                        style={{
                          width: '48px',
                          height: '48px',
                          fontSize: '1rem',
                          flexShrink: 0,
                        }}
                      >
                        {comment.author.username[0].toUpperCase()}
                      </div>

                      {/* User Info */}
                      <div>
                        <h6 className="fw-bold mb-1">
                          {comment.author.username}
                        </h6>

                        <small className="text-muted">
                          {formatTimeToPeriod(comment.createdAt)}
                        </small>
                      </div>

                    </div>

                    {/* More Options */}
                    <Dropdown>

                      <Dropdown.Toggle
                        as="button"
                        className="btn btn-light btn-sm rounded-circle border d-flex align-items-center justify-content-center hide-toggle-icon"
                        style={{
                          width: '36px',
                          height: '36px',
                        }}
                      >
                        ⋮
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="border-0 shadow rounded-4 overflow-hidden">
                        <Dropdown.Item className="py-2">Edit</Dropdown.Item>
                        <Dropdown.Item className="py-2 text-danger">Delete</Dropdown.Item>
                      </Dropdown.Menu>

                    </Dropdown>

                  </div>

                  {/* Comment Content */}
                  <div className="mb-4">

                    <p
                      className="mb-0 text-secondary"
                      style={{
                        lineHeight: 1.7,
                        fontSize: '0.97rem',
                      }}
                    >
                      {comment.content}
                    </p>

                  </div>

                  {/* Footer Actions */}
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                    <div className="d-flex align-items-center gap-2">

                      {/* Like Button */}
                      <button
                        className="btn btn-light border rounded-pill d-flex align-items-center gap-2 px-3"
                      >
                        <span style={{ fontSize: '1rem' }}>
                          ❤️
                        </span>

                        <span className="fw-medium">
                          24
                        </span>
                      </button>

                      {/* Reply Button */}
                      <button
                        className="btn btn-light border rounded-pill px-3"
                      >
                        Reply
                      </button>

                    </div>

                    {/* Edited Label */}
                    <small className="text-muted">
                      Edited
                    </small>

                  </div>

                </Card.Body>
              </Card>
            ))
          }

        </div>

      </Col>
    </Row>
  )
}
