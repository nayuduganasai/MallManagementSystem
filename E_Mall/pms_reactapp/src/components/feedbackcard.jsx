import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import GiveFeedbackForm from './feedbackform'; // Import the feedback form component

const SpaceFeedbackCard = ({userId,spaceId}) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleFeedbackClick = () => {
    setShowFeedbackForm(true);
  };

  const handleClose = () => {
    setShowFeedbackForm(false);
  };

  return (
    <div>
          <Button variant="primary" className='w-100 m-1' onClick={handleFeedbackClick}>
            Give Feedback
          </Button>
       
      {showFeedbackForm && (
        <GiveFeedbackForm
          show={showFeedbackForm}
          handleClose={handleClose}
          spaceId={spaceId}
          userId={userId}
        
        />
      )}
    </div>
  );
};

export default SpaceFeedbackCard;
