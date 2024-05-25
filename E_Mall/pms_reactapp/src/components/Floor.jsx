import React from 'react';
import Zone from './Zone2';
import CustomZone from './CustomZone';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const Floor = ({ selectedFloor }) => {
  return (
    <div className="h-100 w-100">
      {selectedFloor}
      <Container className='border border-black border-2 '>
        {/* First row with 4 Zone components */}
        <Row>
          <Col md={4}>
            <Zone zoneName="North-West" pos={[0, 3]} />
          </Col>
          <Col md={4}>
            <Zone zoneName="North" pos={[3, 5]} />
          </Col>
          <Col md={4}>
            <Zone zoneName="North-East" pos={[5, 8]} />
          </Col>
        </Row>

        {/* Second row with 4 Zone components */}
        <Row>
          <Col md={4}>
            <Zone zoneName="West" pos={[8, 10]} />
          </Col>
          <Col md={4}>
          <Zone zoneName="Center"  />
            {/* <CustomZone  /> */}
          </Col>
          <Col md={4}>
            <Zone zoneName="East" pos={[10, 13]} />
          </Col>
        </Row>

        {/* Third row with 4 Zone components */}
        <Row>
          <Col md={4}>
            <Zone zoneName="South-West" pos={[13, 15]} />
          </Col>
          <Col md={4}>
            <Zone zoneName="South" pos={[15, 18]} />
          </Col>
          <Col md={4}>
            <Zone zoneName="South-East" pos={[18, 20]} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Floor;
