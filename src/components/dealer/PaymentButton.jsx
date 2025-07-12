import React, { useState } from 'react';
import { Button, Alert, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

const PaymentButton = ({ amount, bookingId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // In a real implementation, you would:
      // 1. Create payment order on your backend
      // 2. Initialize Razorpay with the order details
      // 3. Handle payment success/failure
      
      if (paymentMethod === 'razorpay') {
        // Razorpay implementation
        const options = {
          key: 'rzp_test_your_key_here', // Replace with your Razorpay key
          amount: amount * 100, // Amount in paise
          currency: 'INR',
          name: 'Crop Deal System',
          description: `Payment for Booking #${bookingId}`,
          image: '/logo.png', // Optional: Add your logo
          order_id: '', // This should come from your backend
          handler: function (response) {
            console.log('Payment successful:', response);
            // Here you would verify payment on backend
            // await verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
            onSuccess();
          },
          prefill: {
            name: 'Dealer Name',
            email: 'dealer@example.com',
            contact: '9999999999'
          },
          notes: {
            booking_id: bookingId,
            payment_for: 'crop_booking'
          },
          theme: {
            color: '#28a745'
          },
          modal: {
            ondismiss: function() {
              setLoading(false);
              setError('Payment was cancelled');
            }
          }
        };

        // Check if Razorpay is loaded
        if (typeof window.Razorpay !== 'undefined') {
          const rzp = new window.Razorpay(options);
          
          rzp.on('payment.failed', function (response) {
            console.error('Payment failed:', response.error);
            setError(`Payment failed: ${response.error.description}`);
          });
          
          rzp.open();
        } else {
          // Fallback for demo - simulate successful payment
          setTimeout(() => {
            const confirmed = window.confirm(
              `Demo Payment Simulation\n\nAmount: ₹${amount}\nBooking ID: ${bookingId}\n\nClick OK to simulate successful payment, Cancel to simulate failure.`
            );
            
            if (confirmed) {
              onSuccess();
            } else {
              setError('Payment simulation cancelled');
            }
            setLoading(false);
          }, 1000);
        }
      } else {
        // Other payment methods can be implemented here
        setError('Payment method not implemented yet');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment initialization failed. Please try again.');
    }

    setLoading(false);
  };

  const handleUPIPayment = () => {
    setPaymentMethod('upi');
    // Simulate UPI payment
    const upiId = 'farmer@paytm'; // This would come from farmer's profile
    const upiLink = `upi://pay?pa=${upiId}&pn=Crop Deal System&am=${amount}&cu=INR&tn=Payment for Booking ${bookingId}`;
    
    const confirmed = window.confirm(
      `UPI Payment\n\nAmount: ₹${amount}\nUPI ID: ${upiId}\n\nClick OK to open UPI app (Demo), or Cancel to use Razorpay.`
    );
    
    if (confirmed) {
      // In a real app, this would open the UPI app
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      setPaymentMethod('razorpay');
    }
  };

  return (
    <div>
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      <Card className="mb-3">
        <Card.Header>
          <h6>💳 Payment Options</h6>
        </Card.Header>
        <Card.Body>
          <div className="d-grid gap-2">
            {/* Primary Payment Button */}
            <Button 
              variant="success" 
              size="lg" 
              onClick={handlePayment}
              disabled={loading}
              className="d-flex align-items-center justify-content-center"
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <i className="bi bi-credit-card me-2"></i>
                  Pay ₹{amount} with Razorpay
                </>
              )}
            </Button>

            {/* Alternative Payment Methods */}
            <Button 
              variant="outline-primary" 
              onClick={handleUPIPayment}
              disabled={loading}
            >
              <i className="bi bi-phone me-2"></i>
              Pay with UPI (Demo)
            </Button>
          </div>
          
          <div className="text-center mt-3">
            <small className="text-muted">
              <i className="bi bi-shield-check me-1"></i>
              Secure payment powered by Razorpay
            </small>
          </div>
          
          {/* Payment Methods Accepted */}
          <div className="text-center mt-2">
            <small className="text-muted">
              We accept: Credit Card, Debit Card, Net Banking, UPI, Wallets
            </small>
          </div>
        </Card.Body>
      </Card>

      {/* Payment Security Info */}
      <Alert variant="info" className="small">
        <i className="bi bi-info-circle me-2"></i>
        <strong>Payment Security:</strong> All payments are processed securely through Razorpay. 
        Your card details are encrypted and never stored on our servers.
      </Alert>
    </div>
  );
};

export default PaymentButton;
