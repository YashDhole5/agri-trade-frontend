
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const DealerStats = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalSpent: 0,
    activeSubscriptions: 0,
    pendingPayments: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Replace with your actual API endpoints
      // const response = await axios.get('/api/dealer/stats');
      // setStats(response.data);
      
      // Mock data for demonstration
      setStats({
        totalBookings: 18,
        totalSpent: 45000,
        activeSubscriptions: 5,
        pendingPayments: 2
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <Row>
      <Col lg={3} md={6} className="mb-4">
        <Card className="stats-card border-primary">
          <Card.Body>
            <div className="stats-number text-primary">
              {stats.totalBookings}
            </div>
            <h6 className="text-muted mb-0">Total Bookings</h6>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={3} md={6} className="mb-4">
        <Card className="stats-card border-success">
          <Card.Body>
            <div className="stats-number text-success">
              ₹{stats.totalSpent.toLocaleString()}
            </div>
            <h6 className="text-muted mb-0">Total Spent</h6>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={3} md={6} className="mb-4">
        <Card className="stats-card border-info">
          <Card.Body>
            <div className="stats-number text-info">
              {stats.activeSubscriptions}
            </div>
            <h6 className="text-muted mb-0">Active Subscriptions</h6>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={3} md={6} className="mb-4">
        <Card className="stats-card border-warning">
          <Card.Body>
            <div className="stats-number text-warning">
              {stats.pendingPayments}
            </div>
            <h6 className="text-muted mb-0">Pending Payments</h6>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DealerStats;
