import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { submitFeedback } from './services/feedbackservice';


const GiveFeedbackForm = ({ show, handleClose,userId,spaceId }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    userId: userId,
    spaceId: spaceId,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post("http://localhost:8080/emall/feedbacks",formData).then((res)=>console.log(res.data))
    // .then(handleClose())
    submitFeedback(formData).then(handleClose());
     // Close the modal after submission
  };

  const renderStarIcons = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const className = i <= formData.rating ? 'bi-star-fill' : 'bi-star';
      stars.push(
        <span
          key={i}
          className={`${className} text-warning mr-1`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleStarClick(i)}
        ></span>
      );
    }
    return stars;
  };
  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Give Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="spaceId">
            <Form.Label>Space Id</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter spaceId"
              value={formData.spaceId}
              onChange={handleChange}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="userId">
            <Form.Label>User Id</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter userId"
              value={formData.userId}
              onChange={handleChange}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Rating : {renderStarIcons()}</Form.Label>
          </Form.Group>

          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit Feedback
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

export default GiveFeedbackForm;
