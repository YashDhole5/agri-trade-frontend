
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6}>
            <h5>🌾 Crop Deal System</h5>
            <p className="text-muted">
              Connecting farmers and dealers for better agricultural trade.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="text-muted">
              &copy; 2024 Crop Deal System. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
