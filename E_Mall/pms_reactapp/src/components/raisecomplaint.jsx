import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import AddComplaintForm from './addcomplaintform';

const RaiseComplaintButton = ({ userId, spaceId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="danger" className='w-100 m-1' onClick={handleShowModal}>
        Raise Complaint
      </Button>
      <AddComplaintForm show={showModal} handleClose={handleCloseModal} userId={userId} spaceId={spaceId} />
      </div>
  );
};

export default RaiseComplaintButton;
