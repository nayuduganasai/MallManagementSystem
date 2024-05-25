import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import DiscountUpdateForm from './discountupdateform';

const DiscountUpdateModal = ({ show, handleClose, discount }) => {


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Discount</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DiscountUpdateForm prefilledData={discount} close={handleClose}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className='m-1 '>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiscountUpdateModal;
