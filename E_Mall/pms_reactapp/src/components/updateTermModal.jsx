import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { getTerms, updateTerm } from './services/termservice';
import { getAllCategories } from './services/categoryservice';

const UpdateTermModal = ({ show, term, onClose }) => {
  const [updatedTerm, setUpdatedTerm] = useState({ ...term });
  const [categories, setCategories] = useState([]);
  const[terms,setTerms]=useState();
  

  useEffect(() => {
    setUpdatedTerm({ ...term });
  }, [show, term]);


  const fetchTerms =async()=>{
    try{
    const response=  await getTerms()
    // axios.get("http://localhost:8080/emall/terms")
      setTerms(response)
    }
    catch (error) {
     console.error (error.response.data);
   }
    
  }



  useEffect(() => {
    // axios.get("http://localhost:8080/emall/categories")
    getAllCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.error("Error in fetching category List", error.response.message);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const categoryWithTerm = categories.find((category) =>
        category.terms.some((termItem) => termItem.termId === updatedTerm.termId)
      );

      if (categoryWithTerm) {
        const { categoryId } = categoryWithTerm;
        await updateTerm(categoryId,updatedTerm.termId,updatedTerm)
        // axios.put(`http://localhost:8080/emall/terms/${categoryId}/${updatedTerm.termId}`, updatedTerm);
        onClose();
        fetchTerms();
      } else {
        console.error("Term ID does not belong to any category.");
        // Handle the case where the term ID doesn't belong to any category
      }
    } catch (error) {
      console.error("Error in updating term:", error.response.data);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTerm((prevTerm) => ({
      ...prevTerm,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Term</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="termName">
            <Form.Label>Term Name</Form.Label>
            <Form.Control
              type="text"
              name="termName"
              value={updatedTerm.termName}
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

export default UpdateTermModal;
