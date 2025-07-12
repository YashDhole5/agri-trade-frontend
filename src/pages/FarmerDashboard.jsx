
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tab, Tabs } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, User, Wheat, FileText, TrendingUp, Sprout } from 'lucide-react';
import FarmerProfile from '../components/farmer/FarmerProfile';
import CropManagement from '../components/farmer/CropManagement';
import FarmerBookings from '../components/farmer/FarmerBookings';
import FarmerStats from '../components/farmer/FarmerStats';
import AIAssistant from '../components/common/AIAssistant';

const FarmerDashboard = () => {
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
                <Sprout size={40} className="me-3 icon-bounce" />
                <div>
                  <h1 className="display-6 fw-bold mb-0">
                    Farmer Dashboard
                  </h1>
                  <p className="lead mb-0">Welcome back, {user?.name || 'Farmer'}!</p>
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
            <FarmerStats />
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
            <FarmerProfile />
          </Tab>
          
          <Tab 
            eventKey="crops" 
            title={
              <span className="d-flex align-items-center">
                <Wheat size={18} className="me-2" />
                My Crops
              </span>
            }
          >
            <CropManagement />
          </Tab>
          
          <Tab 
            eventKey="bookings" 
            title={
              <span className="d-flex align-items-center">
                <FileText size={18} className="me-2" />
                Bookings
              </span>
            }
          >
            <FarmerBookings />
          </Tab>
        </Tabs>
      </Container>

      {/* AI Assistant */}
      <AIAssistant userRole="farmer" />
    </div>
  );
};

export default FarmerDashboard;
