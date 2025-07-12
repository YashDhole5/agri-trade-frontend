
import React, { useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, Users, Settings, FileText, Shield } from 'lucide-react';
import AdminStats from '../components/admin/AdminStats';
import AIAssistant from '../components/common/AIAssistant';

const AdminDashboard = () => {
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
                <Shield size={40} className="me-3 icon-bounce" />
                <div>
                  <h1 className="display-6 fw-bold mb-0">
                    Admin Dashboard
                  </h1>
                  <p className="lead mb-0">Welcome back, {user?.name || 'Admin'}!</p>
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
            <AdminStats />
          </Tab>
          
          <Tab 
            eventKey="users" 
            title={
              <span className="d-flex align-items-center">
                <Users size={18} className="me-2" />
                User Management
              </span>
            }
          >
            <div className="text-center py-5">
              <Users size={48} className="text-muted mb-3" />
              <h5 className="text-muted">User Management</h5>
              <p className="text-muted">Manage farmers and dealers</p>
            </div>
          </Tab>
          
          <Tab 
            eventKey="reports" 
            title={
              <span className="d-flex align-items-center">
                <FileText size={18} className="me-2" />
                Reports
              </span>
            }
          >
            <div className="text-center py-5">
              <FileText size={48} className="text-muted mb-3" />
              <h5 className="text-muted">Reports & Analytics</h5>
              <p className="text-muted">View detailed reports and analytics</p>
            </div>
          </Tab>
          
          <Tab 
            eventKey="settings" 
            title={
              <span className="d-flex align-items-center">
                <Settings size={18} className="me-2" />
                Settings
              </span>
            }
          >
            <div className="text-center py-5">
              <Settings size={48} className="text-muted mb-3" />
              <h5 className="text-muted">Platform Settings</h5>
              <p className="text-muted">Configure platform settings</p>
            </div>
          </Tab>
        </Tabs>
      </Container>

      {/* AI Assistant */}
      <AIAssistant userRole="admin" />
    </div>
  );
};

export default AdminDashboard;
