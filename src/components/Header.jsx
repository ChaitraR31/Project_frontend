import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext'; // Assuming your AuthContext provides user info
import { FaUserAlt, FaSignOutAlt, FaCog, FaSearch } from 'react-icons/fa'; // Icons for aesthetic design
import './Header.css'; // Import the new CSS file for styles
import BookmarkedPatients from './BookmarkedPatients';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Header() {
  const { isLoggedIn, logout, user } = useAuth(); // Assuming 'user' contains the logged-in user's data
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    toast.success("Logged out successfully");
    logout();
    nav('/login'); // Redirect to login page after logout

  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle "Home" click: if logged in, redirect to PatientList
  const handleHomeClick = () => {
    if (isLoggedIn) {
      BookmarkedPatients(); // Call function to bookmark patient
      nav('/patient-list'); // Redirect to PatientList if logged in
    } else {
      nav('/'); // Redirect to home page if not logged in
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar-custom">
      <Container>
        <Navbar.Brand
          as="div"
          className="fw-bold fs-3 text-white"
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: '700', cursor: 'pointer' }}
          onClick={handleHomeClick}
        >
          Treatment-Tracer
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">About</Nav.Link>

            {isLoggedIn && (
              <NavDropdown
                title={<span className="d-flex align-items-center"><FaUserAlt className="me-2" /> {user?.username || 'Profile'}</span>}
                id="collapsible-nav-dropdown"
              >
                {/* Display the username as the first item */}
                <NavDropdown.Item disabled>
                  <strong>{user?.username}</strong>
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/UpdateUser">
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <FaCog className="me-2" /> Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {isLoggedIn && (
            <Nav.Link as={Link} to="/bookmarked-patients" className="nav-link-custom">My Bookings</Nav.Link>
          )}

          <Nav className="ml-auto">
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/register" className="nav-link-custom">Register</Nav.Link>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout} className="nav-link-custom" style={{ cursor: 'pointer' }}>
                <FaSignOutAlt className="me-2" /> Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer />

    </Navbar>
  );
}

export default Header;
