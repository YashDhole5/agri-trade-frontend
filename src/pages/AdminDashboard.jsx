
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <Container>
          <Row>
            <Col>
              <h1 className="display-6 fw-bold mb-0">
                👨‍💼 Admin Dashboard
              </h1>
              <p className="lead mb-0">Welcome back, {user?.name}!</p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        <Row>
          <Col lg={3} md={6} className="mb-4">
            <Card className="stats-card border-primary">
              <Card.Body>
                <div className="stats-number text-primary">
                  150
                </div>
                <h6 className="text-muted mb-0">Total Farmers</h6>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <Card className="stats-card border-success">
              <Card.Body>
                <div className="stats-number text-success">
                  75
                </div>
                <h6 className="text-muted mb-0">Total Dealers</h6>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <Card className="stats-card border-warning">
              <Card.Body>
                <div className="stats-number text-warning">
                  1,250
                </div>
                <h6 className="text-muted mb-0">Total Crops</h6>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <Card className="stats-card border-info">
              <Card.Body>
                <div className="stats-number text-info">
                  ₹2,50,000
                </div>
                <h6 className="text-muted mb-0">Total Revenue</h6>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5 className="mb-0">Recent Activities</h5>
              </Card.Header>
              <Card.Body>
                <div className="text-center py-4">
                  <h6 className="text-muted">Admin features coming soon...</h6>
                  <p className="text-muted">
                    User management, system monitoring, and analytics will be available here.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5 className="mb-0">System Health</h5>
              </Card.Header>
              <Card.Body>
                <div className="text-center py-4">
                  <div className="text-success mb-2">
                    <span style={{ fontSize: '2rem' }}>✅</span>
                  </div>
                  <h6 className="text-success">All Systems Operational</h6>
                  <p className="text-muted">
                    Platform is running smoothly with no reported issues.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
