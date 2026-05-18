import { Button, Col, Row } from 'react-bootstrap'
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router';

interface BlogHeaderProps {
  title: string;
  author: string;
  createdAt: string;
  content: string;
}

export default function BlogHeader({ title, author, createdAt, content }: BlogHeaderProps) {

  const navigate = useNavigate();
  const createdDate = new Date(createdAt);

  const formattedDate = createdDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const readingTime = Math.ceil(content.length / 1000);

  return (
    <>
      <div className="mb-4">
        <Button
          variant="dark"
          className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 border-0"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack size={20} />
          <span>Back</span>
        </Button>
      </div>

      <Row className="justify-content-center mb-5">
        <Col lg={10}>
          <div className="text-center">

            <h1 className="display-4 fw-bold mb-4">
              {title}
            </h1>

            <div className="d-flex justify-content-center gap-3 text-muted flex-wrap">
              <span>By {author}</span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>

          </div>
        </Col>
      </Row>
    </>

  )
}
