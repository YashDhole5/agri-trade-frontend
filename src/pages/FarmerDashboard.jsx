
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tab, Tabs } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import FarmerProfile from '../components/farmer/FarmerProfile';
import CropManagement from '../components/farmer/CropManagement';
import FarmerBookings from '../components/farmer/FarmerBookings';
import FarmerStats from '../components/farmer/FarmerStats';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <Container>
          <Row>
            <Col>
              <h1 className="display-6 fw-bold mb-0">
                🌾 Farmer Dashboard
              </h1>
              <p className="lead mb-0">Welcome back, {user?.name}!</p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
          justify
        >
          <Tab eventKey="overview" title="📊 Overview">
            <FarmerStats />
          </Tab>
          
          <Tab eventKey="profile" title="👤 Profile">
            <FarmerProfile />
          </Tab>
          
          <Tab eventKey="crops" title="🌾 My Crops">
            <CropManagement />
          </Tab>
          
          <Tab eventKey="bookings" title="📋 Bookings">
            <FarmerBookings />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default FarmerDashboard;
