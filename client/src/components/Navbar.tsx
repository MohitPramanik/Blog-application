import React, { memo, useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Image,
  Dropdown,
  Offcanvas
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
// import { useNotification } from '../context/NotificationContext';
import { RiSunFill } from "react-icons/ri";
import { BsMoonStarsFill } from "react-icons/bs";
// import { FaBell } from "react-icons/fa6";
import profileImgagePlaceholder from '../assets/common/profile-placeholder.jpg';
import '../styles/Navbar.css';

/* ---------- Theme Toggler ---------- */
const ThemeToggler = memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light">
        {theme === 'light'
          ? <RiSunFill className="fs-5" />
          : <BsMoonStarsFill className="fs-6" />}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          as="button"
          active={theme === 'light'}
          onClick={() => toggleTheme('light')}
        >
          <RiSunFill className="me-2" /> Light Mode
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          active={theme === 'dark'}
          onClick={() => toggleTheme('dark')}
        >
          <BsMoonStarsFill className="me-2" /> Dark Mode
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});

/* ---------- Profile Dropdown ---------- */
const ProfileDropDown = memo(() => {
  const { logout, user } = useAuth();

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light">
        <Image
          src={user?.profileImageUrl || profileImgagePlaceholder}
          roundedCircle
          width={28}
          height={28}
          alt="Avatar"
          loading="lazy"
          className="object-fit-cover"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
        <Dropdown.Item as={Link} to="/my-blogs">My Blogs</Dropdown.Item>
        <Dropdown.Item as={Link} to="/saved-blogs">Saved Blogs</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});

/* ---------- Navbar ---------- */
// const NavBar: React.FC = () => {
//   const { isAuthenticated } = useAuth();
//   const { theme } = useTheme();

//   return (
//     <Navbar bg={theme} expand="lg" sticky="top" className="navbar-custom">
//       <Container fluid>

//         {/* Hamburger (LEFT – small screens only) */}
//         <Navbar.Toggle
//           aria-controls="offcanvas-navbar"
//           className="me-2 d-lg-none"
//         />

//         {/* Brand */}
//         <Navbar.Brand as={Link} to="/" className="fw-bold fs-5 mb-0">
//           📝 BlogHub
//         </Navbar.Brand>

//         <div className="d-flex align-items-center gap-2 ms-auto">
//           {/* Right-side icons (always visible) */}
//           {isAuthenticated && (
//             <>
//               <ThemeToggler />
//               <ProfileDropDown />
//             </>
//           )}
//         </div>

//         {/* Offcanvas Menu (small screens) */}
//         <Navbar.Offcanvas
//           id="offcanvas-navbar"
//           aria-labelledby="offcanvas-navbar-label"
//           placement="start"
//           bg={theme}
//           variant={theme === 'dark' ? 'dark' : 'light'}
//         >
//           <Offcanvas.Header
//             closeButton
//             className={theme === 'dark' ? 'offcanvas-dark-header' : ''}
//           >
//             <Offcanvas.Title id="offcanvas-navbar-label">
//               📝 BlogHub
//             </Offcanvas.Title>
//           </Offcanvas.Header>

//           <Offcanvas.Body>
//             <Nav className="flex-column gap-2">
//               {isAuthenticated ? (
//                 <>
//                   <Nav.Link as={Link} to="/blogs">Feed</Nav.Link>
//                   <Nav.Link as={Link} to="/write">Create</Nav.Link>
//                   <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
//                 </>
//               ) : (
//                 <>
//                   <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                   <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
//                 </>
//               )}
//             </Nav>
//           </Offcanvas.Body>
//         </Navbar.Offcanvas>

//       </Container>
//     </Navbar>
//   );
// };

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleCloseExpanded = () => {
    setExpanded(false);
  }

  const handleOpenExpanded = () => {
    setExpanded(true);
  }

  return (
    <Navbar
      bg={theme}
      variant={theme === 'dark' ? 'dark' : 'light'}
      expand="lg"
      sticky="top"
      className="navbar-custom"
    >
      <Container>

        <div>
          {/* Mobile: Hamburger (LEFT) */}
          <Navbar.Toggle
            aria-controls="offcanvas-navbar"
            className="me-2 d-lg-none"
            onClick={handleOpenExpanded}
          />

          {/* Brand */}
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-5">
            📝 BlogHub
          </Navbar.Brand>
        </div>


        {/* Desktop Nav Links */}
        {isAuthenticated && (
          <Nav className="ms-auto d-none d-lg-flex gap-2">
            <Nav.Link as={Link} to="/blogs">Feed</Nav.Link>
            <Nav.Link as={Link} to="/write">Create</Nav.Link>
            <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
          </Nav>
        )}

        {/* Right-side icons (ALL sizes) */}
        <div className="ms-2 d-flex align-items-center gap-2">
          {isAuthenticated && (
            <>
              <ThemeToggler />
              <ProfileDropDown />
            </>
          )}
        </div>

        {/* Mobile Offcanvas */}
        <Navbar.Offcanvas
          id="offcanvas-navbar"
          show={expanded}
          placement="start"
          className="d-lg-none"
          bg={theme}
          variant={theme === 'dark' ? 'dark' : 'light'}
        >
          <Offcanvas.Header
            closeButton
            onHide={handleCloseExpanded}
            className={theme === 'dark' ? 'offcanvas-dark-header' : ''}
          >
            <Offcanvas.Title>📝 BlogHub</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="flex-column gap-2">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} onClick={handleCloseExpanded} to="/blogs">Feed</Nav.Link>
                  <Nav.Link as={Link} onClick={handleCloseExpanded} to="/write">Create</Nav.Link>
                  <Nav.Link as={Link} onClick={handleCloseExpanded} to="/categories">Categories</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} onClick={handleCloseExpanded} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} onClick={handleCloseExpanded} to="/signup">Signup</Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

      </Container>
    </Navbar>
  );
};


export default NavBar;
