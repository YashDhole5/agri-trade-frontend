
import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const PaymentButton = ({ amount, bookingId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // In a real implementation, you would:
      // 1. Create payment order on your backend
      // 2. Initialize Razorpay with the order details
      // 3. Handle payment success/failure
      
      // Mock payment implementation
      const options = {
        key: 'rzp_test_your_key_here', // Replace with your Razorpay key
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Crop Deal System',
        description: `Payment for Booking #${bookingId}`,
        handler: function (response) {
          console.log('Payment successful:', response);
          // Verify payment on backend
          onSuccess();
        },
        prefill: {
          name: 'Dealer Name',
          email: 'dealer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#28a745'
        }
      };

      // Check if Razorpay is loaded
      if (typeof window.Razorpay !== 'undefined') {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback for demo - simulate successful payment
        setTimeout(() => {
          alert('Payment simulation successful!');
          onSuccess();
        }, 1000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <div className="d-grid">
        <Button 
          variant="success" 
          size="lg" 
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing Payment...' : `Pay ₹${amount}`}
        </Button>
      </div>
      
      <div className="text-center mt-2">
        <small className="text-muted">
          Secure payment powered by Razorpay
        </small>
      </div>
    </div>
  );
};

export default PaymentButton;
