
import React from 'react';
import { Card, Badge, Button, ButtonGroup } from 'react-bootstrap';

const CropCard = ({ crop, showActions = false, onDelete, onBook }) => {
  const getCropTypeColor = (type) => {
    const colors = {
      grains: 'warning',
      pulses: 'info',
      vegetables: 'success',
      fruits: 'danger',
      cereals: 'primary',
      oilseeds: 'secondary'
    };
    return colors[type] || 'secondary';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{crop.name}</h5>
          <Badge bg={getCropTypeColor(crop.type)} className="crop-type-badge">
            {crop.type}
          </Badge>
        </div>
        
        <div className="mb-3">
          <small className="text-muted">📍 {crop.location}</small>
        </div>

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

        {showActions && (
          <ButtonGroup className="w-100">
            <Button variant="outline-primary" size="sm">
              Edit
            </Button>
            <Button variant="outline-danger" size="sm" onClick={onDelete}>
              Delete
            </Button>
          </ButtonGroup>
        )}

        {onBook && (
          <div className="d-grid">
            <Button variant="success" onClick={() => onBook(crop)}>
              Book This Crop
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CropCard;
