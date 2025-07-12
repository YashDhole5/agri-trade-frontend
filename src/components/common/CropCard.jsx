
import React from 'react';
import { Card, Badge, Button, ButtonGroup } from 'react-bootstrap';

const CropCard = ({ crop, showActions = false, onEdit, onDelete, onBook }) => {
  const getCropTypeColor = (type) => {
    const colors = {
      grains: 'warning',
      pulses: 'info',
      vegetables: 'success',
      fruits: 'danger',
      cereals: 'primary',
      oilseeds: 'secondary',
      root: 'dark',
      cashcrops: 'success',
      foddercrops: 'info'
    };
    return colors[type] || 'secondary';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getStatusBadge = (status) => {
    const variants = {
      available: 'success',
      sold: 'secondary',
      reserved: 'warning'
    };
    return (
      <Badge bg={variants[status] || 'secondary'} className="mb-2">
        {status?.toUpperCase() || 'AVAILABLE'}
      </Badge>
    );
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{crop.name}</h5>
          <Badge bg={getCropTypeColor(crop.type)} className="crop-type-badge">
            {crop.type}
          </Badge>
        </div>
        
        {crop.status && getStatusBadge(crop.status)}
        
        <div className="mb-3">
          <small className="text-muted">📍 {crop.location}</small>
          {crop.harvestDate && (
            <small className="text-muted ms-3">
              🗓️ Harvested: {formatDate(crop.harvestDate)}
            </small>
          )}
        </div>

        {crop.description && (
          <p className="text-muted small mb-3" style={{ fontSize: '0.9rem' }}>
            {crop.description.length > 100 
              ? `${crop.description.substring(0, 100)}...` 
              : crop.description
            }
          </p>
        )}

        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <span><strong>Quantity:</strong></span>
            <span>{crop.quantity} KG</span>
          </div>
          <div className="d-flex justify-content-between">
            <span><strong>Price:</strong></span>
            <span className="text-success fw-bold">
              {formatPrice(crop.pricePerUnit)}/KG
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span><strong>Total Value:</strong></span>
            <span className="text-primary fw-bold">
              {formatPrice(crop.quantity * crop.pricePerUnit)}
            </span>
          </div>
        </div>

        {crop.farmerName && (
          <div className="mb-3">
            <small className="text-muted">
              <strong>Farmer:</strong> {crop.farmerName}
            </small>
          </div>
        )}

        {showActions && (
          <ButtonGroup className="w-100">
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={onEdit}
              className="flex-fill"
            >
              <i className="bi bi-pencil me-1"></i>
              Edit
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={onDelete}
              className="flex-fill"
            >
              <i className="bi bi-trash me-1"></i>
              Delete
            </Button>
          </ButtonGroup>
        )}

        {onBook && (
          <div className="d-grid">
            <Button 
              variant="success" 
              onClick={() => onBook(crop)}
              disabled={crop.status === 'sold'}
            >
              {crop.status === 'sold' ? 'Sold Out' : 'Book This Crop'}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CropCard;
