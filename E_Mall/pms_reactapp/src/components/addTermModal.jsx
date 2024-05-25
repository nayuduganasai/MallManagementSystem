import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { addTerm } from "./services/termservice";

const AddTermModal = ({ show, onClose, categories }) => {
  const [termName, setTermName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [message, setMessage] = useState('');

  const handleAddTerm = () => {
    const newTerm = [{
      termName: termName,
    }];

    // axios.post(`http://localhost:8080/emall/${selectedCategoryId}/terms`, newTerm)
    //   .then((response) => {
        
    //   })
    //   .catch((error) => {
       
    //   });

      try {
        const response = addTerm(selectedCategoryId,newTerm)
        setMessage(response.data);
        alert(response.data)
        onClose();
        
      } catch (error) {
        setMessage(error.response.data.message);
        alert(error.response.data.message)
      }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!selectedCategoryId) {
      setMessage("Please select a category");
      return;
    }

    if (!termName.trim()) {
      setMessage("Please enter a term name");
      return;
    }

    handleAddTerm();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Term</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="categorySelect">
            <Form.Label>Select a Category</Form.Label>
            <Form.Control as="select" onChange={(e) => handleCategoryChange(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="termName">
            <Form.Label>Term Name</Form.Label>
            <Form.Control type="text" name="termName" value={termName} onChange={(e) => setTermName(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Term
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTermModal;
