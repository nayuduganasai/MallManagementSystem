import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Sidebar from './Sidebar';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState(0);
  const [spaceId, setSpaceId] = useState(0);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userRole1 = localStorage.getItem("userRole");
    setUserRole(userRole1);
  }, []); // empty dependency array means this effect runs once after the initial render

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('jwtToken');
      const response = await axios.post(
        'http://localhost:8080/emall/feedbacks',
        {
          rating,
          comment,
          userId,
          spaceId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      console.log('Feedback submitted successfully:', response.data);
      // Handle success, e.g., show a success message or redirect the user
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error, e.g., show an error message to the user
    }
  };


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
     
      {/* Main Content (80%) */}
      <div style={{ flex: '1', padding: '20px' }}>
        <h2>Feedback Form</h2>
        <Form onSubmit={handleFeedbackSubmit}>
        <FormGroup>
          <Label for="rating">Rating</Label>
          <Input
            type="number"
            name="rating"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="comment">Comment</Label>
          <Input
            type="textarea"
            name="comment"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="userId">User ID</Label>
          <Input
            type="number"
            name="userId"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="spaceId">Space ID</Label>
          <Input
            type="number"
            name="spaceId"
            id="spaceId"
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Submit Feedback
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default FeedbackForm;
