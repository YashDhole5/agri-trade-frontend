
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import AddCropForm from './AddCropForm';
import CropCard from '../common/CropCard';
import axios from 'axios';

const CropManagement = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const cropTypes = [
    'grains', 'pulses', 'root', 'vegetables', 'cereals', 
    'fruits', 'oilseeds', 'cashcrops', 'foddercrops'
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'quantity', label: 'Quantity (High to Low)' },
    { value: 'type', label: 'Type' }
  ];

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    filterAndSortCrops();
  }, [crops, searchTerm, selectedType, sortBy]);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await axios.get('/api/farmer/crops');
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
          status: 'available',
          harvestDate: '2024-01-10',
          description: 'High quality wheat suitable for flour production'
        },
        {
          id: 2,
          name: 'Organic Rice',
          type: 'grains',
          quantity: 75,
          pricePerUnit: 35,
          location: 'Punjab',
          status: 'available',
          harvestDate: '2024-01-08',
          description: 'Certified organic basmati rice'
        },
        {
          id: 3,
          name: 'Fresh Tomatoes',
          type: 'vegetables',
          quantity: 200,
          pricePerUnit: 12,
          location: 'Punjab',
          status: 'available',
          harvestDate: '2024-01-15',
          description: 'Farm fresh tomatoes, perfect for cooking'
        }
      ]);
    } catch (error) {
      console.error('Error fetching crops:', error);
      setError('Failed to load crops. Please try again.');
    }
    setLoading(false);
  };

  const filterAndSortCrops = () => {
    let filtered = crops;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(crop =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter(crop => crop.type === selectedType);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerUnit - b.pricePerUnit;
        case 'quantity':
          return b.quantity - a.quantity;
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredCrops(filtered);
  };

  const handleAddCrop = (newCrop) => {
    const cropWithId = { ...newCrop, id: Date.now(), status: 'available' };
    setCrops([...crops, cropWithId]);
    setShowAddModal(false);
    setSuccess('Crop added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleEditCrop = (crop) => {
    setSelectedCrop(crop);
    setShowEditModal(true);
  };

  const handleUpdateCrop = (updatedCrop) => {
    setCrops(crops.map(crop => 
      crop.id === updatedCrop.id ? updatedCrop : crop
    ));
    setShowEditModal(false);
    setSelectedCrop(null);
    setSuccess('Crop updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteCrop = async (cropId) => {
    if (window.confirm('Are you sure you want to delete this crop? This action cannot be undone.')) {
      try {
        // Replace with your actual API endpoint
        // await axios.delete(`/api/farmer/crops/${cropId}`);
        setCrops(crops.filter(crop => crop.id !== cropId));
        setSuccess('Crop deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        console.error('Error deleting crop:', error);
        setError('Failed to delete crop. Please try again.');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSortBy('name');
  };

  return (
    <div>
      {/* Header with Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>🌾 My Crops</h4>
          <small className="text-muted">
            {filteredCrops.length} of {crops.length} crops
          </small>
        </div>
        <Button 
          variant="success" 
          onClick={() => setShowAddModal(true)}
          disabled={loading}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Crop
        </Button>
      </div>

      {/* Alerts */}
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Filters and Search */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search crops by name, type, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
              />
            </Col>
            <Col md={3}>
              <Form.Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="mb-2"
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
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mb-2"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    Sort by {option.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button 
                variant="outline-secondary" 
                onClick={clearFilters}
                className="w-100"
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Crops Grid */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-2">Loading your crops...</p>
        </div>
      ) : (
        <Row>
          {filteredCrops.length === 0 ? (
            <Col>
              <Card className="text-center py-5">
                <Card.Body>
                  <h5 className="text-muted">
                    {crops.length === 0 ? 'No crops added yet' : 'No crops match your filters'}
                  </h5>
                  <p className="text-muted">
                    {crops.length === 0 
                      ? 'Click "Add New Crop" to get started'
                      : 'Try adjusting your search criteria'
                    }
                  </p>
                  {crops.length === 0 && (
                    <Button 
                      variant="success" 
                      onClick={() => setShowAddModal(true)}
                    >
                      Add Your First Crop
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
                  showActions={true}
                  onEdit={() => handleEditCrop(crop)}
                  onDelete={() => handleDeleteCrop(crop.id)}
                />
              </Col>
            ))
          )}
        </Row>
      )}

      {/* Add Crop Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Crop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCropForm 
            onSubmit={handleAddCrop} 
            onCancel={() => setShowAddModal(false)}
          />
        </Modal.Body>
      </Modal>

      {/* Edit Crop Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Crop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCrop && (
            <AddCropForm 
              crop={selectedCrop}
              onSubmit={handleUpdateCrop} 
              onCancel={() => setShowEditModal(false)}
              isEdit={true}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CropManagement;
