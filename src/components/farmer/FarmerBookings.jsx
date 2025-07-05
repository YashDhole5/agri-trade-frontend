
import React, { useState, useEffect } from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import axios from 'axios';

const FarmerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await axios.get('/api/farmer/bookings');
      // setBookings(response.data);
      
      // Mock data for demonstration
      setBookings([
        {
          id: 1,
          cropName: 'Wheat',
          dealerName: 'John Dealer',
          quantity: 50,
          totalAmount: 1250,
          status: 'pending',
          bookingDate: '2024-01-15'
        },
        {
          id: 2,
          cropName: 'Rice',
          dealerName: 'Jane Dealer',
          quantity: 30,
          totalAmount: 900,
          status: 'paid',
          bookingDate: '2024-01-14'
        }
      ]);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
    setLoading(false);
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      paid: 'success',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status.toUpperCase()}</Badge>;
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">📋 Crop Bookings</h5>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center py-3">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-4">
            <h6 className="text-muted">No bookings yet</h6>
            <p className="text-muted">Bookings for your crops will appear here</p>
          </div>
        ) : (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Crop</th>
                <th>Dealer</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.cropName}</td>
                  <td>{booking.dealerName}</td>
                  <td>{booking.quantity} KG</td>
                  <td>₹{booking.totalAmount}</td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default FarmerBookings;
