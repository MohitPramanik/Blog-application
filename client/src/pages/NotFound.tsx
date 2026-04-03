import { Container, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: '100vh' }}
    >

      <Helmet>
        <title>BlogHub - Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Helmet>

      <h1 className="display-1 fw-bold">404</h1>
      <p className="fs-4 text-muted">Page Not Found</p>
      <p className="mb-4">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Button variant="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
