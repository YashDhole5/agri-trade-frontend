
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, LogOut, Sprout } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'farmer':
        return '/farmer/dashboard';
      case 'dealer':
        return '/dealer/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <BootstrapNavbar bg="white" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand href="/" className="fw-bold d-flex align-items-center">
          <Sprout size={28} className="me-2 text-success icon-spin" />
          <span className="text-success">Crop Deal System</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="d-flex align-items-center">
              <Home size={18} className="me-1" />
              Home
            </Nav.Link>
            {user && (
              <Nav.Link href={getDashboardLink()} className="d-flex align-items-center">
                <LayoutDashboard size={18} className="me-1" />
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          
          <Nav>
            {user ? (
              <>
                <Nav.Item className="d-flex align-items-center me-3">
                  <span className="text-muted">
                    Welcome, <strong>{user.name}</strong> 
                    <span className="badge bg-success ms-2">{user.role}</span>
                  </span>
                </Nav.Item>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={handleLogout}
                  className="d-flex align-items-center"
                >
                  <LogOut size={16} className="me-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register/farmer">Register as Farmer</Nav.Link>
                <Nav.Link href="/register/dealer">Register as Dealer</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
