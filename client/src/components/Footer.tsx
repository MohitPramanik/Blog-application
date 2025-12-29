import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer py-4 mt-5">
      <Container>
        <div className="d-flex justify-content-md-between justify-content-center align-items-center flex-column flex-md-row gap-3">

          <div className="mb-md-0 mb-3 w-max">
            <small>© {year} Blogging App. All rights reserved.</small>
          </div>

          {/* Social icons */}
          <div className="ms-md-auto me-md-3 d-flex align-items-center gap-3 social-icons">
            <a
              href="https://www.linkedin.com/in/mohitkumarpramanik/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="social-icon"
            >
              {/* LinkedIn SVG */}
              <FaLinkedin />
            </a>

            <a
              href="https://www.instagram.com/mohitpramanik_/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="social-icon"
            >
              {/* Instagram SVG */}
              <FaInstagram />
            </a>

            <a
              href="https://github.com/MohitPramanik"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="social-icon"
            >
              {/* GitHub SVG */}
              <FaGithub />
            </a>
          </div>

          {/* Footer links */}
          <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3">
            <Link to="/help">Help</Link>
            <Link to="/support">Support</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
          </div>


        </div>
      </Container>
    </footer>
  );
};


export default memo(Footer);
