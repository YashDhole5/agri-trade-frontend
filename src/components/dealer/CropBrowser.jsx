
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import CropCard from '../common/CropCard';
import BookingForm from './BookingForm';
import axios from 'axios';

const CropBrowser = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const cropTypes = [
    'grains', 'pulses', 'root', 'vegetables', 'cereals', 
    'fruits', 'oilseeds', 'cashcrops', 'foddercrops'
  ];

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    filterCrops();
  }, [crops, searchTerm, selectedType]);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await axios.get('/api/dealer/available-crops');
      // setCrops(response.data);
      
      // Mock data for demonstration
      setCrops([
        {
          id: 1,
          name: 'Wheat',
          type: 'grains',
          quantity: 100,
          pricePerUnit: 25,
          location: 'Punjab',
          farmerName: 'Ram Singh'
        },
        {
          id: 2,
          name: 'Rice',
          type: 'grains',
          quantity: 50,
          pricePerUnit: 30,
          location: 'Punjab',
          farmerName: 'Shyam Patel'
        },
        {
          id: 3,
          name: 'Tomato',
          type: 'vegetables',
          quantity: 200,
          pricePerUnit: 15,
          location: 'Maharashtra',
          farmerName: 'Geeta Sharma'
        }
      ]);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
    setLoading(false);
  };

  const filterCrops = () => {
    let filtered = crops;

    if (searchTerm) {
      filtered = filtered.filter(crop =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(crop => crop.type === selectedType);
    }

    setFilteredCrops(filtered);
  };

  const handleBookCrop = (crop) => {
    setSelectedCrop(crop);
    setShowBookingModal(true);
  };

  const handleBookingComplete = () => {
    setShowBookingModal(false);
    setSelectedCrop(null);
    // Optionally refresh crops or show success message
  };

  return (
    <div>
      {/* Search and Filter Controls */}
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search crops by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Crop Types</option>
            {cropTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Crops Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Row>
          {filteredCrops.length === 0 ? (
            <Col>
              <div className="text-center py-5">
                <h5 className="text-muted">No crops found</h5>
                <p className="text-muted">Try adjusting your search criteria</p>
              </div>
            </Col>
          ) : (
            filteredCrops.map(crop => (
              <Col lg={4} md={6} key={crop.id} className="mb-4">
                <CropCard 
                  crop={crop} 
                  onBook={handleBookCrop}
                />
              </Col>
            ))
          )}
        </Row>
      )}

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book Crop - {selectedCrop?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCrop && (
            <BookingForm 
              crop={selectedCrop} 
              onComplete={handleBookingComplete}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CropBrowser;
