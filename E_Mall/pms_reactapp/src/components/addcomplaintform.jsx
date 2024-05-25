import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ComplaintService from './services/complaintservice';

const AddComplaintForm = ({ show, handleClose, userId, spaceId }) => {
  const [formData, setFormData] = useState({
    description: '',
    status: 'In progress',
    subject: '',
    spaceId,
    userId,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    // console.log("hitting-----------");
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:8080/emall/complaints', {
      //   ...formData,
      //   createDate: new Date().toISOString().split('T')[0], // Set the create date
      // });
      const response = ComplaintService.createComplaint( {
          ...formData,
          createDate: new Date().toISOString().split('T')[0], // Set the create date
        })
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error('Error adding complaint:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Complaint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        {/* <Form.Group controlId="subject">
            <Form.Label>userId</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter userid"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </Form.Group>
 
          <Form.Group controlId="subject">
            <Form.Label>SpaceId</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter SpaceId"
              value={formData.spaceId}
              onChange={handleChange}
              required
            />
          </Form.Group> */}
          <Form.Group controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit Complaint
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddComplaintForm;
