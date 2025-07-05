
import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';
import PaymentButton from './PaymentButton';
import axios from 'axios';

const BookingForm = ({ crop, onComplete }) => {
  const [formData, setFormData] = useState({
    quantity: 1,
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingCreated, setBookingCreated] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const totalAmount = formData.quantity * crop.pricePerUnit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Replace with your actual API endpoint
      // const response = await axios.post('/api/dealer/bookings', {
      //   cropId: crop.id,
      //   quantity: formData.quantity,
      //   notes: formData.notes,
      //   totalAmount
      // });
      
      // Mock booking creation
      const bookingData = {
        id: Date.now(),
        cropId: crop.id,
        quantity: formData.quantity,
        totalAmount,
        status: 'pending'
      };
      
      setBookingId(bookingData.id);
      setBookingCreated(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
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
          <h5>Booking Created Successfully!</h5>
          <p>Your booking has been created. Please proceed with payment to confirm your order.</p>
        </Alert>
        
        <Card className="mb-3">
          <Card.Body>
            <h6>Booking Summary</h6>
            <div className="d-flex justify-content-between">
              <span>Crop:</span>
              <span>{crop.name}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Quantity:</span>
              <span>{formData.quantity} KG</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Price per KG:</span>
              <span>₹{crop.pricePerUnit}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
          </Card.Body>
        </Card>

        <PaymentButton 
          amount={totalAmount}
          bookingId={bookingId}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card className="mb-3">
        <Card.Body>
          <h6>Crop Details</h6>
          <div className="d-flex justify-content-between">
            <span>Name:</span>
            <span>{crop.name}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Available:</span>
            <span>{crop.quantity} KG</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Price:</span>
            <span>₹{crop.pricePerUnit}/KG</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Location:</span>
            <span>{crop.location}</span>
          </div>
        </Card.Body>
      </Card>

      <Form.Group className="mb-3">
        <Form.Label>Quantity (KG)</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          max={crop.quantity}
          required
        />
        <Form.Text className="text-muted">
          Maximum available: {crop.quantity} KG
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Notes (Optional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any special requirements or notes..."
        />
      </Form.Group>

      <Card className="mb-3 bg-light">
        <Card.Body>
          <div className="d-flex justify-content-between fw-bold">
            <span>Total Amount:</span>
            <span className="text-success">₹{totalAmount}</span>
          </div>
        </Card.Body>
      </Card>

      <div className="d-grid">
        <Button 
          variant="success" 
          size="lg" 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Creating Booking...' : 'Create Booking'}
        </Button>
      </div>
    </Form>
  );
};

export default BookingForm;
