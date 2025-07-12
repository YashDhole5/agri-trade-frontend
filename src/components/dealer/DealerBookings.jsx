
import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { User, Eye } from 'lucide-react';
import PaymentButton from './PaymentButton';
import FarmerInfoModal from './FarmerInfoModal';
import axios from 'axios';

const DealerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showFarmerModal, setShowFarmerModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Mock data for demonstration
      setBookings([
        {
          id: 1,
          cropName: 'Wheat',
          farmerName: 'Ram Singh',
          quantity: 50,
          totalAmount: 1250,
          status: 'pending',
          bookingDate: '2024-01-15',
          farmerDetails: {
            id: 1,
            name: 'Ram Singh',
            email: 'ram.singh@example.com',
            mobile: '+91 9876543210',
            location: 'Punjab',
            bankAccount: {
              accountNumber: 'XXXX-XXXX-1234',
              ifscCode: 'HDFC0001234',
              bankName: 'HDFC Bank'
            },
            rating: 4.5,
            totalCrops: 15,
            joinedDate: '2023-06-15',
            address: 'Village Rampur, Punjab, India - 123456'
          }
        },
        {
          id: 2,
          cropName: 'Rice',
          farmerName: 'Shyam Patel',
          quantity: 30,
          totalAmount: 900,
          status: 'paid',
          bookingDate: '2024-01-14',
          farmerDetails: {
            id: 2,
            name: 'Shyam Patel',
            email: 'shyam.patel@example.com',
            mobile: '+91 9876543211',
            location: 'Gujarat',
            bankAccount: {
              accountNumber: 'XXXX-XXXX-5678',
              ifscCode: 'SBI0002345',
              bankName: 'State Bank of India'
            },
            rating: 4.8,
            totalCrops: 20,
            joinedDate: '2023-03-20',
            address: 'Village Anand, Gujarat, India - 388001'
          }
        }
      ]);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
    setLoading(false);
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: { bg: 'warning', text: 'PENDING' },
      paid: { bg: 'success', text: 'PAID' },
      cancelled: { bg: 'danger', text: 'CANCELLED' },
      delivered: { bg: 'info', text: 'DELIVERED' }
    };
    const variant = variants[status] || { bg: 'secondary', text: 'UNKNOWN' };
    return <Badge bg={variant.bg}>{variant.text}</Badge>;
  };

  const handlePaymentSuccess = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'paid' }
        : booking
    ));
  };

  const handleViewFarmer = (booking) => {
    setSelectedFarmer(booking.farmerDetails);
    setSelectedBooking({
      cropName: booking.cropName,
      quantity: booking.quantity,
      deliveryAddress: 'Sample delivery address' // This would come from booking details
    });
    setShowFarmerModal(true);
  };

  return (
    <>
      <Card className="animate-fade-in">
        <Card.Header>
          <h5 className="mb-0">📋 My Bookings</h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading your bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3">
                <Package size={48} className="text-muted" />
              </div>
              <h6 className="text-muted">No bookings yet</h6>
              <p className="text-muted">Your crop bookings will appear here</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Crop</th>
                    <th>Farmer</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id} className="align-middle">
                      <td>
                        <div className="fw-bold">{booking.cropName}</div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <User size={16} className="me-2 text-muted" />
                          <span>{booking.farmerName}</span>
                        </div>
                      </td>
                      <td>
                        <span className="fw-bold">{booking.quantity} KG</span>
                      </td>
                      <td>
                        <span className="fw-bold text-success">₹{booking.totalAmount}</span>
                      </td>
                      <td>
                        {getStatusBadge(booking.status)}
                      </td>
                      <td>
                        <small className="text-muted">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </small>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => handleViewFarmer(booking)}
                            title="View Farmer Details"
                          >
                            <Eye size={14} />
                          </Button>
                          {booking.status === 'pending' && (
                            <PaymentButton
                              amount={booking.totalAmount}
                              bookingId={booking.id}
                              onSuccess={() => handlePaymentSuccess(booking.id)}
                              size="sm"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      <FarmerInfoModal
        show={showFarmerModal}
        onHide={() => setShowFarmerModal(false)}
        farmerDetails={selectedFarmer}
        bookingDetails={selectedBooking}
      />
    </>
  );
};

export default DealerBookings;
