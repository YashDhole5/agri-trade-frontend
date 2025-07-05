
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const FarmerStats = () => {
  const [stats, setStats] = useState({
    totalCrops: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Replace with your actual API endpoints
      // const response = await axios.get('/api/farmer/stats');
      // setStats(response.data);
      
      // Mock data for demonstration
      setStats({
        totalCrops: 12,
        totalBookings: 25,
        totalRevenue: 15000,
        pendingBookings: 3
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <Row>
      <Col lg={3} md={6} className="mb-4">
        <Card className="stats-card border-success">
          <Card.Body>
            <div className="stats-number text-success">
              {stats.totalCrops}
            </div>
            <h6 className="text-muted mb-0">Total Crops</h6>
          </Card.Body>
        </Card>
      </Col>

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
        <Card className="stats-card border-warning">
          <Card.Body>
            <div className="stats-number text-warning">
              ₹{stats.totalRevenue.toLocaleString()}
            </div>
            <h6 className="text-muted mb-0">Total Revenue</h6>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={3} md={6} className="mb-4">
        <Card className="stats-card border-danger">
          <Card.Body>
            <div className="stats-number text-danger">
              {stats.pendingBookings}
            </div>
            <h6 className="text-muted mb-0">Pending Bookings</h6>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default FarmerStats;
