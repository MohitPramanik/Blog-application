import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAppSelector } from '../store/hooks';
import { Link, useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../store/features/auth/authSlice';

export default function AppNavbar() {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", {replace: true})
    }

    return (
        <Navbar expand="md" className="sticky-top bg-body-tertiary shadow-sm">
            <Container fluid className='px-5'>
                <Navbar.Brand as={Link} to="/" className='fw-bold'>BlogHub</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby="offcanvasNavbarLabel-expand-md"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                            Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {
                                isAuthenticated ?
                                    <>
                                        {
                                            user.role === "Admin" && <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
                                        }

                                        <Nav.Link as={Link} to="/blogs">Explore</Nav.Link>
                                        <Nav.Link as={Link} to="/blogs/create">Create</Nav.Link>
                                        <Nav.Link as={Link} to="/blogs/categories">Categories</Nav.Link>
                                        <NavDropdown
                                            title="Dropdown"
                                            id="offcanvasNavbarDropdown-expand-md"
                                        >
                                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                                            <NavDropdown.Item as={Button} onClick={handleLogout}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </> :
                                    <>
                                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                                        <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
                                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                        <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                                    </>
                            }
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}