
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import axios from 'axios';

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);

  const cropTypes = [
    'grains', 'pulses', 'root', 'vegetables', 'cereals', 
    'fruits', 'oilseeds', 'cashcrops', 'foddercrops'
  ];

  useEffect(() => {
    fetchSubscriptions();
    setAvailableTypes(cropTypes);
  }, []);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await axios.get('/api/dealer/subscriptions');
      // setSubscriptions(response.data);
      
      // Mock data for demonstration
      setSubscriptions([
        { id: 1, type: 'grains', createdAt: '2024-01-10', status: 'active' },
        { id: 2, type: 'vegetables', createdAt: '2024-01-12', status: 'active' }
      ]);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
    setLoading(false);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!selectedType) return;

    try {
      // Replace with your actual API endpoint
      // await axios.post('/api/dealer/subscriptions', { type: selectedType });
      
      const newSubscription = {
        id: Date.now(),
        type: selectedType,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      setSubscriptions([...subscriptions, newSubscription]);
      setSelectedType('');
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  const handleUnsubscribe = async (subscriptionId) => {
    if (window.confirm('Are you sure you want to unsubscribe?')) {
      try {
        // Replace with your actual API endpoint
        // await axios.delete(`/api/dealer/subscriptions/${subscriptionId}`);
        
        setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
    }
  };

  const getUnsubscribedTypes = () => {
    const subscribedTypes = subscriptions.map(sub => sub.type);
    return availableTypes.filter(type => !subscribedTypes.includes(type));
  };

  return (
    <Row>
      <Col lg={6}>
        <Card>
          <Card.Header>
            <h5 className="mb-0">🔔 Subscribe to Crop Types</h5>
          </Card.Header>
          <Card.Body>
            <p className="text-muted">
              Get notified when new crops of your preferred types are available.
            </p>
            
            <Form onSubmit={handleSubscribe}>
              <Form.Group className="mb-3">
                <Form.Label>Select Crop Type</Form.Label>
                <Form.Select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  required
                >
                  <option value="">Choose a crop type</option>
                  {getUnsubscribedTypes().map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              <div className="d-grid">
                <Button 
                  variant="success" 
                  type="submit" 
                  disabled={!selectedType || getUnsubscribedTypes().length === 0}
                >
                  Subscribe
                </Button>
              </div>
              
              {getUnsubscribedTypes().length === 0 && (
                <small className="text-muted mt-2 d-block">
                  You are subscribed to all available crop types.
                </small>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={6}>
        <Card>
          <Card.Header>
            <h5 className="mb-0">📋 My Subscriptions</h5>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <div className="text-center py-3">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-4">
                <h6 className="text-muted">No subscriptions yet</h6>
                <p className="text-muted">Subscribe to crop types to get notified</p>
              </div>
            ) : (
              <ListGroup>
                {subscriptions.map(subscription => (
                  <ListGroup.Item 
                    key={subscription.id} 
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h6 className="mb-1">
                        {subscription.type.charAt(0).toUpperCase() + subscription.type.slice(1)}
                      </h6>
                      <small className="text-muted">
                        Subscribed on {new Date(subscription.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <div>
                      <Badge bg="success" className="me-2">
                        {subscription.status}
                      </Badge>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleUnsubscribe(subscription.id)}
                      >
                        Unsubscribe
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SubscriptionManager;
