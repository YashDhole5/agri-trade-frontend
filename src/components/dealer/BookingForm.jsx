
import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Card, InputGroup } from 'react-bootstrap';
import PaymentButton from './PaymentButton';
import axios from 'axios';

const BookingForm = ({ crop, onComplete }) => {
  const [formData, setFormData] = useState({
    quantity: 1,
    notes: '',
    deliveryAddress: '',
    preferredDeliveryDate: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [bookingCreated, setBookingCreated] = useState(false);
  const [bookingId, setBookingId] = useState(null);

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

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    } else if (formData.quantity > crop.quantity) {
      newErrors.quantity = `Maximum available quantity is ${crop.quantity} KG`;
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery address is required';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (formData.preferredDeliveryDate) {
      const deliveryDate = new Date(formData.preferredDeliveryDate);
      const today = new Date();
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 30);
      
      if (deliveryDate < today) {
        newErrors.preferredDeliveryDate = 'Delivery date cannot be in the past';
      } else if (deliveryDate > maxDate) {
        newErrors.preferredDeliveryDate = 'Delivery date cannot be more than 30 days from today';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const totalAmount = formData.quantity * crop.pricePerUnit;
  const deliveryCharges = totalAmount > 2000 ? 0 : 100;
  const finalAmount = totalAmount + deliveryCharges;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      // const response = await axios.post('/api/dealer/bookings', {
      //   cropId: crop.id,
      //   quantity: formData.quantity,
      //   notes: formData.notes,
      //   deliveryAddress: formData.deliveryAddress,
      //   preferredDeliveryDate: formData.preferredDeliveryDate,
      //   contactNumber: formData.contactNumber,
      //   totalAmount: finalAmount
      // });
      
      // Mock booking creation
      const bookingData = {
        id: Date.now(),
        cropId: crop.id,
        quantity: formData.quantity,
        totalAmount: finalAmount,
        status: 'pending',
        deliveryDetails: {
          address: formData.deliveryAddress,
          preferredDate: formData.preferredDeliveryDate,
          contactNumber: formData.contactNumber
        }
      };
      
      setBookingId(bookingData.id);
      setBookingCreated(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      setErrors({ general: 'Failed to create booking. Please try again.' });
    }

    setLoading(false);
  };

  const handlePaymentSuccess = () => {
    onComplete();
  };

  if (bookingCreated) {
    return (
      <div>
        <Alert variant="success">
          <h5>🎉 Booking Created Successfully!</h5>
          <p>Your booking has been created. Please proceed with payment to confirm your order.</p>
        </Alert>
        
        <Card className="mb-3">
          <Card.Header>
            <h6>📋 Booking Summary</h6>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="d-flex justify-content-between mb-2">
                  <span>Crop:</span>
                  <span><strong>{crop.name}</strong></span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Farmer:</span>
                  <span>{crop.farmerName}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Location:</span>
                  <span>{crop.location}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Quantity:</span>
                  <span>{formData.quantity} KG</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-between mb-2">
                  <span>Price per KG:</span>
                  <span>₹{crop.pricePerUnit}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Charges:</span>
                  <span className={deliveryCharges === 0 ? 'text-success' : ''}>
                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold text-success">
                  <span>Total Amount:</span>
                  <span>₹{finalAmount}</span>
                </div>
              </Col>
            </Row>
            
            {deliveryCharges === 0 && (
              <Alert variant="success" className="mt-3 mb-0">
                🎁 Free delivery on orders above ₹2000!
              </Alert>
            )}
          </Card.Body>
        </Card>

        <PaymentButton 
          amount={finalAmount}
          bookingId={bookingId}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {errors.general && <Alert variant="danger">{errors.general}</Alert>}
      
      <Card className="mb-3">
        <Card.Header>
          <h6>🌾 Crop Details</h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <div className="d-flex justify-content-between mb-2">
                <span>Name:</span>
                <span><strong>{crop.name}</strong></span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Type:</span>
                <span className="text-capitalize">{crop.type}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Available:</span>
                <span>{crop.quantity} KG</span>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-between mb-2">
                <span>Price:</span>
                <span className="text-success fw-bold">₹{crop.pricePerUnit}/KG</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Location:</span>
                <span>{crop.location}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Farmer:</span>
                <span>{crop.farmerName}</span>
              </div>
            </Col>
          </Row>
          
          {crop.description && (
            <div className="mt-3">
              <small className="text-muted">
                <strong>Description:</strong> {crop.description}
              </small>
            </div>
          )}
        </Card.Body>
      </Card>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Quantity (KG) *</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                max={crop.quantity}
                isInvalid={!!errors.quantity}
              />
              <InputGroup.Text>KG</InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.quantity}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Maximum available: {crop.quantity} KG
            </Form.Text>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Contact Number *</Form.Label>
            <Form.Control
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              isInvalid={!!errors.contactNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contactNumber}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Delivery Address *</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          placeholder="Enter complete delivery address with pincode..."
          isInvalid={!!errors.deliveryAddress}
        />
        <Form.Control.Feedback type="invalid">
          {errors.deliveryAddress}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Preferred Delivery Date (Optional)</Form.Label>
        <Form.Control
          type="date"
          name="preferredDeliveryDate"
          value={formData.preferredDeliveryDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          isInvalid={!!errors.preferredDeliveryDate}
        />
        <Form.Control.Feedback type="invalid">
          {errors.preferredDeliveryDate}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Leave empty for standard delivery (3-5 business days)
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Special Instructions (Optional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any special requirements, handling instructions, or notes for the farmer..."
        />
      </Form.Group>

      {/* Price Calculation */}
      <Card className="mb-3 bg-light">
        <Card.Body>
          <h6>💰 Price Breakdown</h6>
          <div className="d-flex justify-content-between mb-2">
            <span>Quantity:</span>
            <span>{formData.quantity} KG</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Price per KG:</span>
            <span>₹{crop.pricePerUnit}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Delivery Charges:</span>
            <span className={deliveryCharges === 0 ? 'text-success' : ''}>
              {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
            </span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold text-success">
            <span>Total Amount:</span>
            <span>₹{finalAmount}</span>
          </div>
          
          {totalAmount >= 2000 && (
            <small className="text-success">
              🎁 You qualify for free delivery!
            </small>
          )}
        </Card.Body>
      </Card>

      <div className="d-grid">
        <Button 
          variant="success" 
          size="lg" 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Creating Booking...' : `Create Booking - ₹${finalAmount}`}
        </Button>
      </div>
    </Form>
  );
};

export default BookingForm;
