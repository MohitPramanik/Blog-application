import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <small>© {year} Blogging App. All rights reserved.</small>
          </Col>
          <Col md={6} className="text-center text-md-end d-flex justify-content-end align-items-center">
            <div className="d-inline-flex align-items-center me-3 social-icons">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon me-3">
                {/* LinkedIn SVG */}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.604 4.09 5.5 2.99 5.5 1.89 5.5 1 4.604 1 3.5 1 2.396 1.89 1.5 2.99 1.5c1.1 0 1.99.896 1.99 2z" fill="currentColor"/>
                  <path d="M1 8.25h4v12.75H1V8.25zM8.5 8.25h3.82v1.74h.05c.53-1.01 1.82-2.08 3.75-2.08 4.01 0 4.75 2.64 4.75 6.08v7.01h-4V14.1c0-1.46-.03-3.33-2.03-3.33-2.03 0-2.34 1.58-2.34 3.22v6.26h-4V8.25z" fill="currentColor"/>
                </svg>
              </a>

              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon me-3">
                {/* Instagram SVG */}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon">
                {/* GitHub SVG */}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                  <path d="M12 .5C5.73.5.97 5.26.97 11.53c0 4.66 3.03 8.62 7.24 10.01.53.1.72-.23.72-.51 0-.25-.01-1.09-.02-1.98-2.95.64-3.57-1.29-3.57-1.29-.48-1.23-1.17-1.56-1.17-1.56-.96-.66.07-.65.07-.65 1.06.08 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.09-.69.37-1.15.67-1.41-2.36-.27-4.85-1.18-4.85-5.24 0-1.16.41-2.1 1.08-2.84-.11-.27-.47-1.36.1-2.84 0 0 .88-.28 2.88 1.08a9.97 9.97 0 0 1 2.62-.35c.89 0 1.79.12 2.62.35 2-1.36 2.88-1.08 2.88-1.08.57 1.48.21 2.57.1 2.84.67.74 1.08 1.68 1.08 2.84 0 4.07-2.49 4.96-4.86 5.23.38.33.72.98.72 1.98 0 1.43-.01 2.58-.01 2.93 0 .28.19.61.73.51C19 20.15 21 16.19 21 11.53 21 5.26 16.27.5 12 .5z" fill="currentColor"/>
                </svg>
              </a>
            </div>

            <Link to="/help" className="me-3">Help</Link>
            <Link to="/support" className="me-3">Support</Link>
            <Link to="/terms" className="me-3">Terms</Link>
            <Link to="/privacy">Privacy</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default memo(Footer);
