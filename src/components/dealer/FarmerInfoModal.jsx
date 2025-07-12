
import React from 'react';
import { Modal, Row, Col, Button, Badge } from 'react-bootstrap';
import { User, Mail, Phone, MapPin, Star, Calendar, Package, CreditCard } from 'lucide-react';

const FarmerInfoModal = ({ show, onHide, farmerDetails, bookingDetails }) => {
  if (!farmerDetails) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="d-flex align-items-center">
          <User className="me-2 text-success" size={24} />
          Farmer Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <div className="mb-4">
              <h5 className="text-success mb-3">👨‍🌾 Personal Details</h5>
              <div className="space-y-3">
                <div className="d-flex align-items-center mb-2">
                  <User size={16} className="me-2 text-muted" />
                  <span className="fw-bold">{farmerDetails.name}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Mail size={16} className="me-2 text-muted" />
                  <span>{farmerDetails.email}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Phone size={16} className="me-2 text-muted" />
                  <span>{farmerDetails.mobile}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <MapPin size={16} className="me-2 text-muted" />
                  <span>{farmerDetails.address}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Star size={16} className="me-2 text-warning" />
                  <span>{farmerDetails.rating}/5 Rating</span>
                  <Badge bg="success" className="ms-2">Verified</Badge>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="text-info mb-3">📊 Farmer Stats</h6>
              <div className="space-y-2">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">
                    <Calendar size={14} className="me-1" />
                    Member Since:
                  </span>
                  <span>{new Date(farmerDetails.joinedDate).toLocaleDateString()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">
                    <Package size={14} className="me-1" />
                    Total Crops:
                  </span>
                  <span>{farmerDetails.totalCrops}</span>
                </div>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="mb-4">
              <h6 className="text-primary mb-3">🏦 Bank Details</h6>
              <div className="bg-light p-3 rounded">
                <div className="mb-2">
                  <strong>Bank:</strong> {farmerDetails.bankAccount.bankName}
                </div>
                <div className="mb-2">
                  <strong>Account:</strong> {farmerDetails.bankAccount.accountNumber}
                </div>
                <div className="mb-2">
                  <strong>IFSC:</strong> {farmerDetails.bankAccount.ifscCode}
                </div>
              </div>
            </div>

            {bookingDetails && (
              <div className="mb-4">
                <h6 className="text-warning mb-3">📋 Current Booking</h6>
                <div className="bg-light p-3 rounded">
                  <div className="mb-2">
                    <strong>Crop:</strong> {bookingDetails.cropName}
                  </div>
                  <div className="mb-2">
                    <strong>Quantity:</strong> {bookingDetails.quantity} KG
                  </div>
                  <div className="mb-2">
                    <strong>Delivery To:</strong> {bookingDetails.deliveryAddress}
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>

        <div className="mt-4 pt-3 border-top">
          <h6 className="mb-3">💬 Contact Options</h6>
          <Row>
            <Col md={4}>
              <Button variant="outline-success" size="sm" className="w-100 mb-2">
                <Phone size={16} className="me-1" />
                Call Farmer
              </Button>
            </Col>
            <Col md={4}>
              <Button variant="outline-primary" size="sm" className="w-100 mb-2">
                <Mail size={16} className="me-1" />
                Send Email
              </Button>
            </Col>
            <Col md={4}>
              <Button variant="outline-info" size="sm" className="w-100 mb-2">
                <User size={16} className="me-1" />
                View Profile
              </Button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FarmerInfoModal;
