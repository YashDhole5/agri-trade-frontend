
import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddCropForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    quantity: '',
    pricePerUnit: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cropTypes = [
    'grains', 'pulses', 'root', 'vegetables', 'cereals', 
    'fruits', 'oilseeds', 'cashcrops', 'foddercrops'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Replace with your actual API endpoint
      // const response = await axios.post('/api/farmer/crops', formData);
      onSubmit(formData);
      
      // Reset form
      setFormData({
        name: '',
        type: '',
        quantity: '',
        pricePerUnit: '',
        location: ''
      });
    } catch (error) {
      console.error('Error adding crop:', error);
      setError('Failed to add crop. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Crop Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Wheat, Rice"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Crop Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select crop type</option>
              {cropTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Quantity (in KG)</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter quantity"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Price per Unit (₹/KG)</Form.Label>
            <Form.Control
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter price per KG"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="Enter location"
        />
      </Form.Group>

      <div className="d-grid">
        <Button 
          variant="success" 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Adding Crop...' : 'Add Crop'}
        </Button>
      </div>
    </Form>
  );
};

export default AddCropForm;
