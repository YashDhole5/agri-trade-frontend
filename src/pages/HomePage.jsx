
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <h1 className="display-4 fw-bold mb-4">
                Welcome to Crop Deal System
              </h1>
              <p className="lead mb-4">
                A comprehensive platform connecting farmers and dealers for seamless agricultural trade. 
                Manage crops, handle bookings, and process payments all in one place.
              </p>
              {!user && (
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button href="/register/farmer" variant="light" size="lg" className="me-2">
                    Register as Farmer
                  </Button>
                  <Button href="/register/dealer" variant="outline-light" size="lg">
                    Register as Dealer
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
            <h2 className="display-5 fw-bold text-success">Features</h2>
            <p className="lead text-muted">Everything you need for modern agricultural trade</p>
          </Col>
        </Row>

        <Row>
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>🌾</span>
                </div>
                <Card.Title>Crop Management</Card.Title>
                <Card.Text>
                  Farmers can easily add, update, and manage their crop listings with detailed information.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>🤝</span>
                </div>
                <Card.Title>Easy Booking</Card.Title>
                <Card.Text>
                  Dealers can browse and book crops from farmers with just a few clicks.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>💳</span>
                </div>
                <Card.Title>Secure Payments</Card.Title>
                <Card.Text>
                  Integrated payment gateway ensures secure and hassle-free transactions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>📊</span>
                </div>
                <Card.Title>Analytics Dashboard</Card.Title>
                <Card.Text>
                  Comprehensive dashboards for farmers, dealers, and administrators.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>🔔</span>
                </div>
                <Card.Title>Subscription Service</Card.Title>
                <Card.Text>
                  Dealers can subscribe to specific crop types for regular updates.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>🔒</span>
                </div>
                <Card.Title>Secure & Reliable</Card.Title>
                <Card.Text>
                  JWT-based authentication and role-based access control for security.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
