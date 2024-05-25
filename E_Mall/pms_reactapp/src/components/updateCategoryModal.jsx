import React, { useEffect, useState } from 'react'
import { Modal,Button,Form } from 'react-bootstrap';

 const UpdateCategoryModal=({show,category,onClose,handleUpdate})=> {
    const [updatedCategory,setUpdatedCategory]=useState({...category})

    useEffect(()=>{
        setUpdatedCategory({...category})
    },[show,category]);

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setUpdatedCategory(preCategory=>({
          ...preCategory,[name]:value
        }))
    }
        const handleSubmit=()=>{
            handleUpdate(updatedCategory)
            onClose();
        }

  return (
    <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="categoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            name="categoryName"
            value={updatedCategory.categoryName}
            onChange={handleChange}
          />
          </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={onClose}>
                Close
            </Button>
            <Button variant='primary' onClick={handleSubmit}>
                Save Changes
            </Button>
          </Modal.Footer>
          </Modal>
  )
  };

export default UpdateCategoryModal

