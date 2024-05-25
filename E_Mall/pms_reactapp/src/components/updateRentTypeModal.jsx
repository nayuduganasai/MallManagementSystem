import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { getRentTypes, updateRentType } from './services/renttypeservice';
import { getTerms } from './services/termservice';

const UpdateRentTypeModal = ({ show, rentType, onClose }) => {
  const [updatedRentType, setUpdatedRentType] = useState({ ...rentType });
  const [terms, setTerms] = useState([]);
  const[rentTypes,setRentTypes]=useState();
  

  useEffect(() => {
    setUpdatedRentType({ ...rentType });
  }, [show, rentType]);


  const fetchRentTypes =async()=>{
    try{
    const response=  await getRentTypes()
    // axios.get("http://localhost:8080/emall/rentTypes")
      setRentTypes(response)
    }
    catch (error) {
     console.error (error.response.data);
   }
    
  }

  const fetchTerms =async()=>{
    try{
    const response=  await getTerms()
    // axios.get("http://localhost:8080/emall/rentTypes")
      setRentTypes(response)
    }
    catch (error) {
     console.error (error.response.data);
   }
    
  }



  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/emall/terms")
      fetchTerms()
      .then((response) => {
        setTerms(response);

      })
      .catch((error) => {
        console.error("Error in fetching term List", error.response.message);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const termWithRentType = terms.find((term) =>
        term.rentTypes.some((rentTypeItem) => rentTypeItem.rentTypeId === updatedRentType.rentTypeId)
      );

      if (termWithRentType) {
        const { termId } = termWithRentType;
        await updateRentType(termId,updatedRentType.rentTypeId,updatedRentType)        
        //axios.put(`http://localhost:8080/emall/rentTypes/${termId}/${updatedRentType.rentTypeId}`, updatedRentType);
        onClose();
        fetchRentTypes();
      } else {
        console.error("RentType ID does not belong to any term.");
        // Handle the case where the term ID doesn't belong to any category
      }
    } catch (error) {
      console.error("Error in updating rentType:", error.response.data);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRentType((prevRentType) => ({
      ...prevRentType,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit RentType</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="rentTypeName">
            <Form.Label>RentType Name</Form.Label>
            <Form.Control
              type="text"
              name="rentTypeName"
              value={updatedRentType.rentTypeName}
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
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateRentTypeModal;
