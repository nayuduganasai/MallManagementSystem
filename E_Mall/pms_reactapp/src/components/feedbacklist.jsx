import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table } from 'react-bootstrap';
import GiveFeedBackFrom from './feedbackform'
import SpaceFeedBackCard from './feedbackcard'
import { fetchAllFeedbacks } from './services/feedbackservice';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [spaceIdFilter, setSpaceIdFilter] = useState('');

  useEffect(() => {
    // axios.get('http://localhost:8080/emall/feedbacks').then((response) => {
    //   setFeedbacks(response.data);
    //   setFilteredFeedbacks(response.data);
    // });
    async function fetchFeedBacks(){
      fetchAllFeedbacks().then((response) => {
          setFeedbacks(response);
          setFilteredFeedbacks(response)})
    }
    fetchFeedBacks()
  }, []);

  const handleFilter = () => {
    const filtered = spaceIdFilter
      ? feedbacks.filter((feedback) => feedback.spaceId === parseInt(spaceIdFilter))
      : feedbacks;
    setFilteredFeedbacks(filtered);
  };

  return (
    <Container>
      {/* <SpaceFeedBackCard/> */}
      {/* <GiveFeedBackFrom/> */}
      <div className="d-flex justify-content-end mb-3">
        <Form inline>

          <Form.Control
            type="number"
            placeholder="Enter Space ID to filter feedbacks"
            value={spaceIdFilter}
            onChange={(e) => setSpaceIdFilter(e.target.value)}
            className="mr-2"
          />
          <Button variant="primary" onClick={handleFilter}>
            Filter
          </Button>
        
        </Form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Comment</th>
            <th>Space ID</th>
            {/* Add other table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.rating}</td>
              <td>{feedback.comment}</td>
              <td>{feedback.spaceId}</td>
              {/* Display other feedback details */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FeedbackList;
