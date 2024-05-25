import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { addRentType } from "./services/renttypeservice";

const AddRentTypeModal = ({ show, onClose, terms }) => {
  const [rentTypeName, setRentTypeName] = useState('');
  const [selectedTermId, setSelectedTermId] = useState('');
  const [message, setMessage] = useState('');

  const handleAddRentType = () => {
    const newRentType = [{
      rentTypeName: rentTypeName,
    }];
    try{
    // axios.post(`http://localhost:8080/emall/${selectedTermId}/rentTypes`, newRentType)
     const response = addRentType(selectedTermId,newRentType)
        setMessage(response.data);
        alert(response.data)
        onClose();
     
    }
      catch(error){
        setMessage(error.response.data.message);
        alert(error.response.data.message)
      };
  };

  const handleTermChange = (termId) => {
    setSelectedTermId(termId);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!selectedTermId) {
      setMessage("Please select a term");
      return;
    }

    if (!rentTypeName.trim()) {
      setMessage("Please enter a term name");
      return;
    }

    handleAddRentType();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Term</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="termSelect">
            <Form.Label>Select a Term</Form.Label>
            <Form.Control as="select" onChange={(e) => handleTermChange(e.target.value)}>
              <option value="">Select a Term</option>
              {terms.map((term) => (
                <option key={term.termId} value={term.termId}>
                  {term.termName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="rentTypeName">
            <Form.Label>RentType Name</Form.Label>
            <Form.Control type="text" name="rentTypeName" value={rentTypeName} onChange={(e) => setRentTypeName(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add RentType
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRentTypeModal;
