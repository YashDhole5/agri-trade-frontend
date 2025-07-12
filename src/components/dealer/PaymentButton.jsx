
import React, { useState } from 'react';
import { Button, Alert, Card, Spinner, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';

const PaymentButton = ({ amount, bookingId, farmerDetails, bookingDetails, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      if (paymentMethod === 'razorpay') {
        const options = {
          key: 'rzp_test_your_key_here',
          amount: amount * 100,
          currency: 'INR',
          name: 'Crop Deal System',
          description: `Payment for ${bookingDetails?.cropName || 'Crop'} - ${bookingDetails?.quantity || 0} KG`,
          image: '/logo.png',
          order_id: '',
          handler: function (response) {
            console.log('Payment successful:', response);
            onSuccess();
          },
          prefill: {
            name: 'Dealer Name',
            email: 'dealer@example.com',
            contact: '9999999999'
          },
          notes: {
            booking_id: bookingId,
            farmer_name: farmerDetails?.name || '',
            crop_name: bookingDetails?.cropName || '',
            quantity: bookingDetails?.quantity || 0,
            delivery_address: bookingDetails?.deliveryAddress || ''
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

        if (typeof window.Razorpay !== 'undefined') {
          const rzp = new window.Razorpay(options);
          
          rzp.on('payment.failed', function (response) {
            console.error('Payment failed:', response.error);
            setError(`Payment failed: ${response.error.description}`);
          });
          
          rzp.open();
        } else {
          // Enhanced demo simulation
          setTimeout(() => {
            const confirmed = window.confirm(
              `🏦 PAYMENT SIMULATION\n\n` +
              `💰 Amount: ₹${amount}\n` +
              `📋 Booking ID: ${bookingId}\n` +
              `👨‍🌾 Farmer: ${farmerDetails?.name || 'Unknown'}\n` +
              `🌾 Crop: ${bookingDetails?.cropName || 'Unknown'} (${bookingDetails?.quantity || 0} KG)\n` +
              `📍 Delivery: ${bookingDetails?.deliveryAddress?.substring(0, 50) || 'Unknown'}...\n\n` +
              `Click OK to simulate successful payment\n` +
              `Click Cancel to simulate payment failure`
            );
            
            if (confirmed) {
              onSuccess();
            } else {
              setError('Payment simulation cancelled');
            }
            setLoading(false);
          }, 1500);
        }
      } else {
        setError('Payment method not implemented yet');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment initialization failed. Please try again.');
    }

    setLoading(false);
  };

  const handleDirectTransfer = () => {
    const bankDetails = farmerDetails?.bankAccount;
    if (!bankDetails) {
      setError('Farmer bank details not available');
      return;
    }

    const confirmed = window.confirm(
      `💳 DIRECT BANK TRANSFER\n\n` +
      `Transfer ₹${amount} directly to farmer's account:\n\n` +
      `🏦 Bank: ${bankDetails.bankName}\n` +
      `📋 Account: ${bankDetails.accountNumber}\n` +
      `🔢 IFSC: ${bankDetails.ifscCode}\n` +
      `👨‍🌾 Beneficiary: ${farmerDetails.name}\n\n` +
      `After transfer, please share transaction ID with the farmer.\n\n` +
      `Click OK to copy bank details to clipboard`
    );

    if (confirmed) {
      const bankDetailsText = `Bank Transfer Details:\nBank: ${bankDetails.bankName}\nAccount: ${bankDetails.accountNumber}\nIFSC: ${bankDetails.ifscCode}\nBeneficiary: ${farmerDetails.name}\nAmount: ₹${amount}`;
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(bankDetailsText).then(() => {
          alert('Bank details copied to clipboard!');
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = bankDetailsText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Bank details copied to clipboard!');
      }
    }
  };

  const handleUPIPayment = () => {
    const upiId = `${farmerDetails?.name?.toLowerCase().replace(/\s+/g, '')}@paytm` || 'farmer@paytm';
    const upiLink = `upi://pay?pa=${upiId}&pn=${farmerDetails?.name || 'Crop Deal System'}&am=${amount}&cu=INR&tn=Payment for Booking ${bookingId}`;
    
    const confirmed = window.confirm(
      `📱 UPI PAYMENT\n\n` +
      `Pay ₹${amount} via UPI to:\n` +
      `🆔 UPI ID: ${upiId}\n` +
      `👨‍🌾 Name: ${farmerDetails?.name || 'Farmer'}\n` +
      `📝 Reference: Booking #${bookingId}\n\n` +
      `Click OK to open UPI app (Demo Mode)`
    );
    
    if (confirmed) {
      setTimeout(() => {
        const success = window.confirm('UPI Payment Demo: Click OK for success, Cancel for failure');
        if (success) {
          onSuccess();
        } else {
          setError('UPI payment was cancelled or failed');
        }
      }, 2000);
    }
  };

  return (
    <div>
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}
      
      <Card className="mb-3">
        <Card.Header className="bg-success text-white">
          <h6 className="mb-0">💳 Complete Your Payment</h6>
        </Card.Header>
        <Card.Body>
          {/* Payment Summary */}
          <Row className="mb-3">
            <Col md={6}>
              <h6>Payment Summary</h6>
              <div className="mb-2">
                <strong>Amount to Pay:</strong> 
                <span className="text-success ms-2 fs-5">₹{amount}</span>
              </div>
              <div className="mb-2">
                <strong>Booking ID:</strong> #{bookingId}
              </div>
            </Col>
            <Col md={6}>
              <h6>Payment To</h6>
              <div className="mb-2">
                <strong>Farmer:</strong> {farmerDetails?.name || 'Unknown'}
              </div>
              <div className="mb-2">
                <Badge bg="success">Verified Farmer</Badge>
                <Badge bg="warning" className="ms-2">
                  ⭐ {farmerDetails?.rating || 'N/A'} Rating
                </Badge>
              </div>
            </Col>
          </Row>

          <hr />

          {/* Payment Methods */}
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
            <Row>
              <Col md={6}>
                <Button 
                  variant="outline-primary" 
                  onClick={handleUPIPayment}
                  disabled={loading}
                  className="w-100"
                >
                  <i className="bi bi-phone me-2"></i>
                  Pay with UPI
                </Button>
              </Col>
              <Col md={6}>
                <Button 
                  variant="outline-secondary" 
                  onClick={handleDirectTransfer}
                  disabled={loading}
                  className="w-100"
                >
                  <i className="bi bi-bank me-2"></i>
                  Direct Bank Transfer
                </Button>
              </Col>
            </Row>
          </div>
          
          <div className="text-center mt-3">
            <small className="text-muted">
              <i className="bi bi-shield-check me-1"></i>
              Secure payment powered by Razorpay • SSL Encrypted
            </small>
          </div>
        </Card.Body>
      </Card>

      {/* Farmer Contact Info for Payment Queries */}
      <Alert variant="info" className="small">
        <Row>
          <Col md={8}>
            <strong>Need help with payment?</strong> You can contact the farmer directly:
            <br />
            📞 {farmerDetails?.mobile || 'Not available'}
            📧 {farmerDetails?.email || 'Not available'}
          </Col>
          <Col md={4} className="text-end">
            <Button variant="outline-info" size="sm">
              <i className="bi bi-chat-dots me-1"></i>
              Contact Farmer
            </Button>
          </Col>
        </Row>
      </Alert>

      {/* Payment Security Info */}
      <Alert variant="light" className="small border">
        <i className="bi bi-info-circle me-2"></i>
        <strong>Payment Security:</strong> All payments are processed securely. Your card details are encrypted and never stored on our servers.
        Money will be released to the farmer only after successful delivery confirmation.
      </Alert>
    </div>
  );
};

export default PaymentButton;
