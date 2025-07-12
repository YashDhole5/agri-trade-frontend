
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const AddCropForm = ({ crop, onSubmit, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    quantity: '',
    pricePerUnit: '',
    location: '',
    harvestDate: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const cropTypes = [
    'grains', 'pulses', 'root', 'vegetables', 'cereals', 
    'fruits', 'oilseeds', 'cashcrops', 'foddercrops'
  ];

  useEffect(() => {
    if (crop && isEdit) {
      setFormData({
        name: crop.name || '',
        type: crop.type || '',
        quantity: crop.quantity || '',
        pricePerUnit: crop.pricePerUnit || '',
        location: crop.location || '',
        harvestDate: crop.harvestDate || '',
        description: crop.description || ''
      });
    }
  }, [crop, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Crop name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Crop name must be at least 2 characters';
    }

    if (!formData.type) {
      newErrors.type = 'Crop type is required';
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }

    if (!formData.pricePerUnit) {
      newErrors.pricePerUnit = 'Price per unit is required';
    } else if (isNaN(formData.pricePerUnit) || parseFloat(formData.pricePerUnit) <= 0) {
      newErrors.pricePerUnit = 'Price must be a positive number';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.harvestDate) {
      newErrors.harvestDate = 'Harvest date is required';
    } else {
      const harvestDate = new Date(formData.harvestDate);
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      
      if (harvestDate > today) {
        newErrors.harvestDate = 'Harvest date cannot be in the future';
      } else if (harvestDate < oneYearAgo) {
        newErrors.harvestDate = 'Harvest date cannot be more than a year ago';
      }
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const cropData = {
        ...formData,
        quantity: parseFloat(formData.quantity),
        pricePerUnit: parseFloat(formData.pricePerUnit),
        ...(isEdit && { id: crop.id })
      };
      
      await onSubmit(cropData);
      
      // Reset form if not editing
      if (!isEdit) {
        setFormData({
          name: '',
          type: '',
          quantity: '',
          pricePerUnit: '',
          location: '',
          harvestDate: '',
          description: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    
    setLoading(false);
  };

  const totalValue = formData.quantity && formData.pricePerUnit 
    ? (parseFloat(formData.quantity) * parseFloat(formData.pricePerUnit)).toFixed(2)
    : 0;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Crop Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="e.g., Premium Wheat"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Crop Type *</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              isInvalid={!!errors.type}
            >
              <option value="">Select crop type</option>
              {cropTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.type}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Quantity (KG) *</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              isInvalid={!!errors.quantity}
              placeholder="e.g., 100"
              min="0"
              step="0.1"
            />
            <Form.Control.Feedback type="invalid">
              {errors.quantity}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Price per KG (₹) *</Form.Label>
            <Form.Control
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              isInvalid={!!errors.pricePerUnit}
              placeholder="e.g., 25"
              min="0"
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">
              {errors.pricePerUnit}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Total Value</Form.Label>
            <Form.Control
              type="text"
              value={`₹${totalValue}`}
              readOnly
              className="bg-light"
            />
            <Form.Text className="text-muted">
              Calculated automatically
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Location *</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              isInvalid={!!errors.location}
              placeholder="e.g., Punjab, Haryana"
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Harvest Date *</Form.Label>
            <Form.Control
              type="date"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleChange}
              isInvalid={!!errors.harvestDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.harvestDate}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              When was this crop harvested?
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-4">
        <Form.Label>Description (Optional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          isInvalid={!!errors.description}
          placeholder="Describe the quality, variety, or any special features of your crop..."
          maxLength={500}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          {formData.description.length}/500 characters
        </Form.Text>
      </Form.Group>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mb-3">
          <strong>Please fix the following errors:</strong>
          <ul className="mb-0 mt-2">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <div className="d-flex gap-2 justify-content-end">
        <Button 
          variant="secondary" 
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          variant="success" 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Saving...' : (isEdit ? 'Update Crop' : 'Add Crop')}
        </Button>
      </div>
    </Form>
  );
};

export default AddCropForm;
