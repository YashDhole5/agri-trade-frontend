
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { 
  Wheat, 
  Handshake, 
  CreditCard, 
  BarChart3, 
  Bell, 
  Shield,
  UserPlus,
  Users,
  ArrowRight
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Wheat,
      title: "Crop Management",
      description: "Farmers can easily add, update, and manage their crop listings with detailed information.",
      color: "success"
    },
    {
      icon: Handshake,
      title: "Easy Booking",
      description: "Dealers can browse and book crops from farmers with just a few clicks.",
      color: "primary"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Integrated payment gateway ensures secure and hassle-free transactions.",
      color: "info"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive dashboards for farmers, dealers, and administrators.",
      color: "warning"
    },
    {
      icon: Bell,
      title: "Subscription Service",
      description: "Dealers can subscribe to specific crop types for regular updates.",
      color: "secondary"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "JWT-based authentication and role-based access control for security.",
      color: "danger"
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div className="mb-4">
                <Wheat size={80} className="text-white icon-bounce mb-3" />
              </div>
              <h1 className="display-4 fw-bold mb-4">
                Welcome to Crop Deal System
              </h1>
              <p className="lead mb-4">
                A comprehensive platform connecting farmers and dealers for seamless agricultural trade. 
                Manage crops, handle bookings, and process payments all in one place.
              </p>
              {!user && (
                <div className="d-grid gap-3 d-md-flex justify-content-md-center">
                  <Button 
                    href="/register/farmer" 
                    variant="light" 
                    size="lg" 
                    className="me-2 d-flex align-items-center fw-bold"
                  >
                    <UserPlus size={24} className="me-2" />
                    Register as Farmer
                    <ArrowRight size={20} className="ms-2" />
                  </Button>
                  <Button 
                    href="/register/dealer" 
                    variant="outline-light" 
                    size="lg"
                    className="d-flex align-items-center fw-bold"
                  >
                    <Users size={24} className="me-2" />
                    Register as Dealer
                    <ArrowRight size={20} className="ms-2" />
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold text-success mb-3">Features</h2>
            <p className="lead text-muted">Everything you need for modern agricultural trade</p>
          </Col>
        </Row>

        <Row>
          {features.map((feature, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <div className={`bg-${feature.color} bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3`}>
                      <feature.icon size={32} className={`text-${feature.color}`} />
                    </div>
                  </div>
                  <Card.Title className="h5 fw-bold mb-3">{feature.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Call to Action */}
        {!user && (
          <Row className="mt-5">
            <Col className="text-center">
              <div className="bg-light rounded p-5">
                <h3 className="fw-bold mb-3">Ready to get started?</h3>
                <p className="text-muted mb-4">Join thousands of farmers and dealers already using our platform</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button variant="success" size="lg" href="/register/farmer" className="me-2">
                    Start as Farmer
                  </Button>
                  <Button variant="primary" size="lg" href="/register/dealer">
                    Start as Dealer
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
