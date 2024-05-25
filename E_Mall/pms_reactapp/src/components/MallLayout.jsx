import React, { useState } from 'react';
import Floor from './Floor';
import { Container, Row, Col, Form } from 'react-bootstrap'; // Import Bootstrap components
import NewMallLayout from './newlayout';

const MallLayout = () => {
  const [selectedFloor, setSelectedFloor] = useState("1");
  const floors = ["Ground Floor", "First Floor", "Second Floor", "Third Floor", "Fifth Floor"];

  return (
    <Container className="">
      <div className="mall-layout">
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="floorDropdown">
              <Form.Label>Select Floor:</Form.Label>
              <Form.Select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
              >
                {floors.map((floor) => (
                  <option key={floor} value={floors.indexOf(floor)+1}>
                    {floor}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* <Floor
          selectedFloor={selectedFloor}
          zoneData={zoneData}
        /> */}
        <NewMallLayout floor={selectedFloor}/>
      </div>
    </Container>
  );
};

export default MallLayout;
