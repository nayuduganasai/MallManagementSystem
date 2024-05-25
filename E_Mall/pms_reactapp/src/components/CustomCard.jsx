import React from 'react';
import { Card, Button } from 'react-bootstrap'; // Import Bootstrap components
import { CardImage } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function CustomCard({ cardTitle, cardText, image }) {
  const linkTo = `/zone/${cardTitle}/`;

  return (
    <Card className='w-100'>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{cardText}</Card.Text>
        <Link to={linkTo}>
          <Button variant="success">View Spaces</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
