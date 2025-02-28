import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";

function Header() {
  const { isLoggedIn, logout, user } = useAuth();
  const nav = useNavigate();
  const location = useLocation(); // Get current location (URL)
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    toast.success("Logged out successfully");
    logout();
    nav('/login');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleHomeClick = () => {
    if (isLoggedIn) {
      nav('/patient-list');
    } else {
      nav('/');
    }
  };

  const getActiveLinkStyle = (path) => {
    return location.pathname === path
      ? { 
          background: 'linear-gradient(135deg, #4e73df, #1e3d93)', // Blue gradient for active link
          color: 'white', // Ensure the text is white for visibility
          borderRadius: '8px',
          border: '1px solid transparent' // Remove border when active
        } 
      : {};
  };

  return (
    <div>
    <Navbar collapseOnSelect expand="lg" variant="light" className="sticky-top" style={{ background: 'white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',position: 'fixed',width:'100%',top:'0',right:'0',left:'0',zIndex:'1000' }}>
      <Container>
        <Navbar.Brand
          as={Link}
          to={isLoggedIn ? '/' : '/'}
          className="fw-bold fs-3 text-dark"
          style={{ fontFamily: "'Merriweather', serif", cursor: 'pointer', marginLeft: 'auto' }}
          onClick={handleHomeClick}
        >
        <img 
        src="/logo12.jpg" 
        alt="Logo" 
        style={{ width: '40px', height: '40px', marginRight: '10px' }} 
      />
          InsuraPulse
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-5">
            <Nav.Link 
              as={Link} 
              to="/" 
              className="btn-link border-1 rounded-3 ms-2 me-2 text-decoration-none" 
              style={{ ...getActiveLinkStyle('/'), border: '1px solid #ddd', padding: '10px 15px' }} // Added padding to the button
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/about" 
              className="btn-link border-1 rounded-3 ms-3 text-decoration-none" 
              style={{ ...getActiveLinkStyle('/about'), border: '1px solid #ddd', padding: '10px 15px' }} // Added padding to the button
            >
              About
            </Nav.Link>

            {isLoggedIn && (
              <NavDropdown
                title={<span className="d-flex align-items-center">{user?.username || 'Profile'}</span>}
                id="collapsible-nav-dropdown"
                className=""
              >
                <NavDropdown.Item disabled>
                  <strong>{user?.username}</strong>
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/UpdateUser">
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Item>
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {isLoggedIn && (
            <Nav.Link 
              as={Link} 
              to="/bookmarked-patients" 
              className="btn-link border-1 rounded-3 text-decoration-none" 
              style={{ ...getActiveLinkStyle('/bookmarked-patients'), border: '1px solid #ddd', padding: '10px 15px' }}
            >
              My Bookings
            </Nav.Link>
          )}

          <Nav className="ms-auto">
            {!isLoggedIn ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/register" 
                  className="btn-link border-1 rounded-3 me-2 text-decoration-none" 
                  style={{ ...getActiveLinkStyle('/register'), border: '1px solid #ddd', padding: '10px 15px' }}
                >
                  <FaUserPlus className="me-2" />
                  Register
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  className="btn-link border-1 rounded-3 ms-2 text-decoration-none" 
                  style={{ ...getActiveLinkStyle('/login'), border: '1px solid #ddd', padding: '10px 15px' }}
                >
                  <FaSignInAlt className="me-2" />
                  Login
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout} className="btn-link border-1 rounded-3 text-decoration-none" style={{ cursor: 'pointer', padding: '10px 15px' }}>
                <FaSignOutAlt className="me-2" />
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      
      <ToastContainer />
      
    </Navbar>
    

    </div>
    
  );
}

export default Header;
