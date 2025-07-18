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
  const [farmerDetails, setFarmerDetails] = useState(null);

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
      // Mock booking creation with farmer details
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

      // Mock farmer details fetch
      const mockFarmerDetails = {
        id: crop.farmerId || 1,
        name: crop.farmerName,
        email: 'farmer@example.com',
        mobile: '+91 9876543210',
        location: crop.location,
        bankAccount: {
          accountNumber: 'XXXX-XXXX-1234',
          ifscCode: 'HDFC0001234',
          bankName: 'HDFC Bank'
        },
        rating: 4.5,
        totalCrops: 15,
        joinedDate: '2023-06-15',
        address: `Village Rampur, ${crop.location}, India - 123456`
      };
      
      setBookingId(bookingData.id);
      setFarmerDetails(mockFarmerDetails);
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
          <p>Your booking has been created. Below are the farmer details and payment options.</p>
        </Alert>

        {/* Farmer Information Card */}
        <Card className="mb-3 border-info">
          <Card.Header className="bg-light">
            <h6 className="mb-0">👨‍🌾 Farmer Information</h6>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <h6 className="text-success">{farmerDetails.name}</h6>
                  <div className="mb-2">
                    <i className="bi bi-envelope me-2 text-muted"></i>
                    <span>{farmerDetails.email}</span>
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-telephone me-2 text-muted"></i>
                    <span>{farmerDetails.mobile}</span>
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-geo-alt me-2 text-muted"></i>
                    <span>{farmerDetails.address}</span>
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-star-fill me-2 text-warning"></i>
                    <span>{farmerDetails.rating}/5 Rating</span>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <h6>Bank Details</h6>
                  <div className="mb-2">
                    <strong>Bank:</strong> {farmerDetails.bankAccount.bankName}
                  </div>
                  <div className="mb-2">
                    <strong>Account:</strong> {farmerDetails.bankAccount.accountNumber}
                  </div>
                  <div className="mb-2">
                    <strong>IFSC:</strong> {farmerDetails.bankAccount.ifscCode}
                  </div>
                  <div className="mt-3">
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      Farmer since: {new Date(farmerDetails.joinedDate).toLocaleDateString()}
                    </small>
                    <br />
                    <small className="text-muted">
                      <i className="bi bi-box me-1"></i>
                      Total crops listed: {farmerDetails.totalCrops}
                    </small>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        {/* Booking Summary */}
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
                  <span>Type:</span>
                  <span className="text-capitalize">{crop.type}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Quantity Booked:</span>
                  <span>{formData.quantity} KG</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Your Contact:</span>
                  <span>{formData.contactNumber}</span>
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

            {/* Delivery Information */}
            <hr />
            <Row>
              <Col md={6}>
                <h6>📦 Delivery Information</h6>
                <div className="mb-2">
                  <strong>Address:</strong>
                  <div className="text-muted">{formData.deliveryAddress}</div>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-2">
                  <strong>Preferred Date:</strong>
                  <div className="text-muted">
                    {formData.preferredDeliveryDate ? 
                      new Date(formData.preferredDeliveryDate).toLocaleDateString() : 
                      'Standard delivery (3-5 business days)'
                    }
                  </div>
                </div>
                {formData.notes && (
                  <div className="mb-2">
                    <strong>Special Instructions:</strong>
                    <div className="text-muted">{formData.notes}</div>
                  </div>
                )}
              </Col>
            </Row>
            
            {deliveryCharges === 0 && (
              <Alert variant="success" className="mt-3 mb-0">
                🎁 Free delivery on orders above ₹2000!
              </Alert>
            )}
          </Card.Body>
        </Card>

        {/* Contact Farmer Option */}
        <Card className="mb-3 border-primary">
          <Card.Body className="text-center">
            <h6>💬 Need to Contact the Farmer?</h6>
            <p className="text-muted mb-3">You can reach out to discuss delivery details or crop quality</p>
            <Row>
              <Col md={4}>
                <Button variant="outline-success" size="sm" className="w-100 mb-2">
                  <i className="bi bi-telephone me-1"></i>
                  Call {farmerDetails.name}
                </Button>
              </Col>
              <Col md={4}>
                <Button variant="outline-primary" size="sm" className="w-100 mb-2">
                  <i className="bi bi-envelope me-1"></i>
                  Send Email
                </Button>
              </Col>
              <Col md={4}>
                <Button variant="outline-info" size="sm" className="w-100 mb-2">
                  <i className="bi bi-chat-dots me-1"></i>
                  Chat
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Payment Section */}
        <PaymentButton 
          amount={finalAmount}
          bookingId={bookingId}
          farmerDetails={farmerDetails}
          bookingDetails={{
            cropName: crop.name,
            quantity: formData.quantity,
            deliveryAddress: formData.deliveryAddress
          }}
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
