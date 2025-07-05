
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import AddCropForm from './AddCropForm';
import CropCard from '../common/CropCard';
import axios from 'axios';

const CropManagement = () => {
  const [crops, setCrops] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await axios.get('/api/farmer/crops');
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
          status: 'available'
        },
        {
          id: 2,
          name: 'Rice',
          type: 'grains',
          quantity: 50,
          pricePerUnit: 30,
          location: 'Punjab',
          status: 'available'
        }
      ]);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
    setLoading(false);
  };

  const handleAddCrop = (newCrop) => {
    setCrops([...crops, { ...newCrop, id: Date.now() }]);
    setShowAddModal(false);
  };

  const handleDeleteCrop = async (cropId) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      try {
        // Replace with your actual API endpoint
        // await axios.delete(`/api/farmer/crops/${cropId}`);
        setCrops(crops.filter(crop => crop.id !== cropId));
      } catch (error) {
        console.error('Error deleting crop:', error);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>🌾 My Crops</h4>
        <Button 
          variant="success" 
          onClick={() => setShowAddModal(true)}
        >
          + Add New Crop
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Row>
          {crops.length === 0 ? (
            <Col>
              <Card className="text-center py-5">
                <Card.Body>
                  <h5 className="text-muted">No crops added yet</h5>
                  <p className="text-muted">Click "Add New Crop" to get started</p>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            crops.map(crop => (
              <Col lg={4} md={6} key={crop.id} className="mb-4">
                <CropCard 
                  crop={crop} 
                  showActions={true}
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
          <AddCropForm onSubmit={handleAddCrop} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CropManagement;
