import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCategoryModal = ({ show, onClose, handleAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    setCategoryName('');
  }, [show]);

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = () => {
    const newCategory = {
      categoryName: categoryName,
    };
    handleAddCategory(newCategory);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryModal;
