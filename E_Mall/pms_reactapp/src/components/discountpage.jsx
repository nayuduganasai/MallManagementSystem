import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import DiscountForm from './discountform';
import DiscountList from './discountlist';
import DiscountUpdateModal from './discountupdatemodal';
import axios from 'axios';
import { deleteDiscount, getDiscounts } from './services/discountservice';
import SpaceService from './services/spaceservice';

const DiscountPage = ({spaceId}) => {
  const [discounts, setDiscounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);


  useEffect(() => {
    // axios.get('http://localhost:8080/emall/discounts').then((response) => {
    //   setDiscounts(response.data);
    // });
   spaceId? fetchDiscountBySpaceId():fetchDiscounts();
  
   
  }, [showModal,showSuccessModal,showDeleteConfirmationModal]);

  const handleSuccess = () => {
    setShowSuccessModal(true); // Show success modal
  };

  async function fetchDiscountBySpaceId(){
    try {
      const data = await SpaceService.getDiscountsBySpaceId(spaceId); // Fetch spaces using the service
      // console.log(data);
      setDiscounts(data);
    } catch (error) {
      console.error('Error fetching Discounts:', error);
    }
  }

  async function fetchDiscounts() {
    try {
      const data = await getDiscounts(); // Fetch spaces using the service
      // console.log(data);
      setDiscounts(data);
    } catch (error) {
      console.error('Error fetching Discounts:', error);
    }
  }

  const handleDelete = (id) => {
    // Make DELETE request to delete discount by ID
    // Update discounts after successful deletion
    // axios.delete('http://localhost:8080/emall/discounts/'+id)
    // .then(()=>{ setShowDeleteConfirmationModal(false);})// Close delete confirmation modal
    deleteDiscount(id).then(()=>{ setShowDeleteConfirmationModal(false);})
  };

  const onDeleteClick = (id) => {
    setSelectedDiscountId(id);
    setShowDeleteConfirmationModal(true); // Show delete confirmation modal
  };

  const handleUpdate = (discount) => {
    setSelectedDiscount(discount);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedDiscount(null);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container className='m-top'>
       <Row>
      <Col>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h2>Discount List</h2>
          <Button variant="secondary" size="sm" onClick={handleShow}>+Add Discount</Button>
        </div>
        <DiscountList discounts={discounts} handleDelete={onDeleteClick} handleUpdate={handleUpdate} />
      </Col>
    </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Discount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DiscountForm handleClose={handleClose} handleSuccess={handleSuccess}/>
        </Modal.Body>
      </Modal>

         {/* Success Modal */}
         <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Discount added successfully!</p>
        </Modal.Body>
      </Modal>

       {/* Delete Confirmation Modal */}
       <Modal show={showDeleteConfirmationModal} onHide={() => setShowDeleteConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this discount?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(selectedDiscountId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {selectedDiscount && (
        <DiscountUpdateModal
          show={showUpdateModal}
          handleClose={handleCloseUpdateModal}
          discount={selectedDiscount}
        />
      )}

    </Container>
  );
};

export default DiscountPage;
