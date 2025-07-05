
import React, { useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import DealerProfile from '../components/dealer/DealerProfile';
import CropBrowser from '../components/dealer/CropBrowser';
import DealerBookings from '../components/dealer/DealerBookings';
import SubscriptionManager from '../components/dealer/SubscriptionManager';
import DealerStats from '../components/dealer/DealerStats';

const DealerDashboard = () => {
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
                🤝 Dealer Dashboard
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
            <DealerStats />
          </Tab>
          
          <Tab eventKey="crops" title="🌾 Browse Crops">
            <CropBrowser />
          </Tab>
          
          <Tab eventKey="bookings" title="📋 My Bookings">
            <DealerBookings />
          </Tab>
          
          <Tab eventKey="subscriptions" title="🔔 Subscriptions">
            <SubscriptionManager />
          </Tab>
          
          <Tab eventKey="profile" title="👤 Profile">
            <DealerProfile />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default DealerDashboard;
