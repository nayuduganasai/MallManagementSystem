import React from 'react';
import { Modal, Button, Form, ModalFooter } from 'react-bootstrap';

const CustomModal = ({ show, onClose, title, formElements, handleSubmit, isUpdate, extraButtons }) => {
  const handleInputChange = (e, handleChange) => {
    handleChange(e); // Propagate the change to the parent component
  };

  const hasSelector = formElements.some((element) => element.type === 'select');

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {formElements.map((element) => {
            if (isUpdate && hasSelector && element.type === 'select') {
              return null; // Skip rendering selector if it's an update and hasSelector is true
            }

            return (
              <Form.Group key={element.id} controlId={element.id}>
                <Form.Label>{element.label}</Form.Label>
                {element.type === 'select' && (!isUpdate || hasSelector) ? (
                  <Form.Control
                    as="select"
                    name={element.name}
                    value={element.value}
                    onChange={(e) => handleInputChange(e, element.handleChange)}
                    required={element.required}
                  >
                    {element.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    type={element.type}
                    name={element.name}
                    value={element.value}
                    onChange={(e) => handleInputChange(e, element.handleChange)}
                    required={element.required}
                  />
                )}
              </Form.Group>
            );
          })}
          {/* Display Space Buttons */}
          <div>{extraButtons}</div>
          <ModalFooter>
            {isUpdate ? (
              <>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" onClick={onClose}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="primary" type='submit' onClick={onClose}>
                Add
              </Button>
            )}
          </ModalFooter>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
