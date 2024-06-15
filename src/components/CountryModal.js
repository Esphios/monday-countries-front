import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CountryModal = ({ show, onHide, rowData }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Additional Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {rowData && (
          <div>
            <p>ID: {rowData.id}</p>
            <p>Name: {rowData.name}</p>
            {/* Render additional data fields here */}
            {Object.keys(rowData.additionalData).map((key) => (
              <p key={key}>
                {key}: {renderCellValue(key, rowData.additionalData[key])}
              </p>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const renderCellValue = (headerId, value) => {
  if (typeof value === 'object' && value !== null) {
    if (headerId === 'location') {
      return `${value.lat}, ${value.lng}`;
    } else if (headerId === 'timezones') {
      const timezones = JSON.parse(value);
      return timezones.map((zone) => zone.zoneName).join(', ');
    } else {
      return JSON.stringify(value); 
    }
  } else {
    return value;
  }
};

export default CountryModal;
