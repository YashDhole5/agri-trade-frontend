
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, InputGroup, Button, Modal, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import CropCard from '../common/CropCard';
import BookingForm from './BookingForm';
import axios from 'axios';

const CropBrowser = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [error, setError] = useState('');

  const cropTypes = [
    'grains', 'pulses', 'root', 'vegetables', 'cereals', 
    'fruits', 'oilseeds', 'cashcrops', 'foddercrops'
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'quantity', label: 'Quantity (High to Low)' },
    { value: 'harvest-date', label: 'Recently Harvested' }
  ];

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    filterAndSortCrops();
  }, [crops, searchTerm, selectedType, priceRange, sortBy, locationFilter]);

  const fetchCrops = async () => {
    setLoading(true);
    setError('');
    try {
      // Replace with your actual API endpoint
      // const response = await axios.get('/api/dealer/available-crops');
      // setCrops(response.data);
      
      // Enhanced mock data
      setCrops([
        {
          id: 1,
          name: 'Premium Wheat',
          type: 'grains',
          quantity: 150,
          pricePerUnit: 28,
          location: 'Punjab',
          farmerName: 'Ram Singh',
          harvestDate: '2024-01-10',
          description: 'High quality wheat suitable for flour production',
          status: 'available'
        },
        {
          id: 2,
          name: 'Organic Rice',
          type: 'grains',
          quantity: 75,
          pricePerUnit: 35,
          location: 'Haryana',
          farmerName: 'Shyam Patel',
          harvestDate: '2024-01-08',
          description: 'Certified organic basmati rice',
          status: 'available'
        },
        {
          id: 3,
          name: 'Fresh Tomatoes',
          type: 'vegetables',
          quantity: 200,
          pricePerUnit: 15,
          location: 'Maharashtra',
          farmerName: 'Geeta Sharma',
          harvestDate: '2024-01-15',
          description: 'Farm fresh tomatoes, perfect for cooking',
          status: 'available'
        },
        {
          id: 4,
          name: 'Red Lentils',
          type: 'pulses',
          quantity: 100,
          pricePerUnit: 45,
          location: 'Rajasthan',
          farmerName: 'Mohan Kumar',
          harvestDate: '2024-01-12',
          description: 'Premium quality red lentils',
          status: 'available'
        },
        {
          id: 5,
          name: 'Sunflower Seeds',
          type: 'oilseeds',
          quantity: 80,
          pricePerUnit: 55,
          location: 'Karnataka',
          farmerName: 'Lakshmi Devi',
          harvestDate: '2024-01-05',
          description: 'High oil content sunflower seeds',
          status: 'available'
        }
      ]);
    } catch (error) {
      console.error('Error fetching crops:', error);
      setError('Failed to load crops. Please try again.');
    }
    setLoading(false);
  };

  const filterAndSortCrops = () => {
    let filtered = crops.filter(crop => crop.status === 'available');

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(crop =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter(crop => crop.type === selectedType);
    }

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter(crop => 
        crop.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Apply price range filter
    if (priceRange.min) {
      filtered = filtered.filter(crop => crop.pricePerUnit >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(crop => crop.pricePerUnit <= parseFloat(priceRange.max));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricePerUnit - b.pricePerUnit;
        case 'price-high':
          return b.pricePerUnit - a.pricePerUnit;
        case 'quantity':
          return b.quantity - a.quantity;
        case 'harvest-date':
          return new Date(b.harvestDate) - new Date(a.harvestDate);
        default:
          return a.name.localeCompare(b.name);
      }
    });

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
    fetchCrops();
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setPriceRange({ min: '', max: '' });
    setLocationFilter('');
    setSortBy('name');
  };

  const getUniqueLocations = () => {
    return [...new Set(crops.map(crop => crop.location))];
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>🌾 Browse Available Crops</h4>
          <small className="text-muted">
            {filteredCrops.length} of {crops.length} crops available
          </small>
        </div>
        <Button variant="outline-secondary" onClick={fetchCrops} disabled={loading}>
          <i className="bi bi-arrow-clockwise me-2"></i>
          Refresh
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      {/* Advanced Filters */}
      <Card className="mb-4">
        <Card.Body>
          <h6 className="mb-3">🎯 Filter & Search</h6>
          
          {/* Search Row */}
          <Row className="mb-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by crop name, type, location, or farmer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Button 
                variant="outline-danger" 
                onClick={clearAllFilters}
                className="w-100"
              >
                Clear All Filters
              </Button>
            </Col>
          </Row>

          {/* Filter Row */}
          <Row>
            <Col md={3}>
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
            <Col md={3}>
              <Form.Select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                {getUniqueLocations().map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>₹</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Min price"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>₹</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Max price"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </InputGroup>
            </Col>
          </Row>

          {/* Active Filters Display */}
          {(searchTerm || selectedType || locationFilter || priceRange.min || priceRange.max) && (
            <div className="mt-3">
              <small className="text-muted">Active filters: </small>
              {searchTerm && <Badge bg="primary" className="me-1">Search: {searchTerm}</Badge>}
              {selectedType && <Badge bg="warning" className="me-1">Type: {selectedType}</Badge>}
              {locationFilter && <Badge bg="info" className="me-1">Location: {locationFilter}</Badge>}
              {priceRange.min && <Badge bg="success" className="me-1">Min: ₹{priceRange.min}</Badge>}
              {priceRange.max && <Badge bg="success" className="me-1">Max: ₹{priceRange.max}</Badge>}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Crops Grid */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-2">Loading available crops...</p>
        </div>
      ) : (
        <Row>
          {filteredCrops.length === 0 ? (
            <Col>
              <Card className="text-center py-5">
                <Card.Body>
                  <h5 className="text-muted">No crops found</h5>
                  <p className="text-muted">
                    {crops.length === 0 
                      ? 'No crops are currently available'
                      : 'Try adjusting your search criteria or filters'
                    }
                  </p>
                  {(searchTerm || selectedType || locationFilter || priceRange.min || priceRange.max) && (
                    <Button variant="outline-primary" onClick={clearAllFilters}>
                      Clear All Filters
                    </Button>
                  )}
                </Card.Body>
              </Card>
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
