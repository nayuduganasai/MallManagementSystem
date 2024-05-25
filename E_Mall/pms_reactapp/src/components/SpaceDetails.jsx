import React from 'react';
import { Card, Button } from 'react-bootstrap';

const SpaceDetails = ({ spaceDetails }) => {
  const { location, categoryId, size, availableDate } = spaceDetails;

  return (
    <Card>
      <Card.Body>
        <Card.Title>Space Details</Card.Title>
        <Card.Text>
          <strong>Location:</strong> {location} <br />
          <strong>Category ID:</strong> {categoryId} <br />
          <strong>Size:</strong> {size} <br />
          <strong>Available Date:</strong> {availableDate} <br />
        </Card.Text>
        {/* <Button variant="primary">Book Space</Button> */}
      </Card.Body>
    </Card>
  );
};

export default SpaceDetails;
