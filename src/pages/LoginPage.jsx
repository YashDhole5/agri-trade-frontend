
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, UserPlus, Users } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Redirect based on user role
      const userData = JSON.parse(localStorage.getItem('user'));
      switch (userData.role) {
        case 'farmer':
          navigate('/farmer/dashboard');
          break;
        case 'dealer':
          navigate('/dealer/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="fade-in">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <LogIn size={48} className="text-success icon-bounce" />
                  </div>
                  <h2 className="fw-bold text-success">Login</h2>
                  <p className="text-muted">Access your Crop Deal System account</p>
                </div>

                {error && (
                  <Alert variant="danger" className="error-message">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="d-flex align-items-center">
                      <Mail size={18} className="me-2 text-muted" />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <Lock size={18} className="me-2 text-muted" />
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your password"
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button 
                      variant="success" 
                      size="lg" 
                      type="submit" 
                      disabled={loading}
                      className="fw-bold"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Logging in...
                        </>
                      ) : (
                        <>
                          <LogIn size={20} className="me-2" />
                          Login
                        </>
                      )}
                    </Button>
                  </div>
                </Form>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="text-muted mb-3">Don't have an account?</p>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button 
                      href="/register/farmer" 
                      variant="outline-success" 
                      size="sm" 
                      className="me-2 d-flex align-items-center"
                    >
                      <UserPlus size={16} className="me-1" />
                      Register as Farmer
                    </Button>
                    <Button 
                      href="/register/dealer" 
                      variant="outline-success" 
                      size="sm"
                      className="d-flex align-items-center"
                    >
                      <Users size={16} className="me-1" />
                      Register as Dealer
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
