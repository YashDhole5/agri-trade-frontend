
import React, { useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, Search, FileText, Bell, User, Handshake } from 'lucide-react';
import DealerProfile from '../components/dealer/DealerProfile';
import CropBrowser from '../components/dealer/CropBrowser';
import DealerBookings from '../components/dealer/DealerBookings';
import SubscriptionManager from '../components/dealer/SubscriptionManager';
import DealerStats from '../components/dealer/DealerStats';
import AIAssistant from '../components/common/AIAssistant';

const DealerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="fade-in">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <Container>
          <Row>
            <Col>
              <div className="d-flex align-items-center">
                <Handshake size={40} className="me-3 icon-bounce" />
                <div>
                  <h1 className="display-6 fw-bold mb-0">
                    Dealer Dashboard
                  </h1>
                  <p className="lead mb-0">Welcome back, {user?.name || 'Dealer'}!</p>
                </div>
              </div>
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
          <Tab 
            eventKey="overview" 
            title={
              <span className="d-flex align-items-center">
                <BarChart3 size={18} className="me-2" />
                Overview
              </span>
            }
          >
            <DealerStats />
          </Tab>
          
          <Tab 
            eventKey="crops" 
            title={
              <span className="d-flex align-items-center">
                <Search size={18} className="me-2" />
                Browse Crops
              </span>
            }
          >
            <CropBrowser />
          </Tab>
          
          <Tab 
            eventKey="bookings" 
            title={
              <span className="d-flex align-items-center">
                <FileText size={18} className="me-2" />
                My Bookings
              </span>
            }
          >
            <DealerBookings />
          </Tab>
          
          <Tab 
            eventKey="subscriptions" 
            title={
              <span className="d-flex align-items-center">
                <Bell size={18} className="me-2" />
                Subscriptions
              </span>
            }
          >
            <SubscriptionManager />
          </Tab>
          
          <Tab 
            eventKey="profile" 
            title={
              <span className="d-flex align-items-center">
                <User size={18} className="me-2" />
                Profile
              </span>
            }
          >
            <DealerProfile />
          </Tab>
        </Tabs>
      </Container>

      {/* AI Assistant */}
      <AIAssistant userRole="dealer" />
    </div>
  );
};

export default DealerDashboard;
