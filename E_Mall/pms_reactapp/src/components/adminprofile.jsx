

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AdminProfileModal = ({ show, onHide, adminDetails }) => {
 
  const { firstName, lastName, email, phoneNumber, address } = adminDetails;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Admin Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Address:</strong> {address}</p>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminProfileModal;
