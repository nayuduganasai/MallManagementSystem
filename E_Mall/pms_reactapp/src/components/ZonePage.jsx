import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SpaceCardUser from './spacecarduser2';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import SpaceService from './services/spaceservice';

const ZonePage = () => {
  const {shopNumber} = useParams();
  const navigate = useNavigate();
return (
  <div>
     <Container className=' p-2 mx-6' >
      <Button variant='primary' onClick={()=>navigate("/customer-dashboard")}>Go Back</Button>
      <SpaceCardUser shopNumber={shopNumber}/>
    </Container>
  </div>
   
  );
};

export default ZonePage;