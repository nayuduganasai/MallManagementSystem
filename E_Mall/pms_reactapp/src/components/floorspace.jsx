import React from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

const FloorSpace = ({ breadth, length, description }) => {
    // Calculate the percentage dimensions for the floor space
    const widthPercentage = `${(parseInt(breadth) / 300) * 100}%`; // Assuming 300 feet is the total width
    const heightPercentage = `${(parseInt(length) / 300) * 100}%`; // Assuming 300 feet is the total length
  
    return (
    //   <Col xs={parseInt(breadth) * (12 / 300)}  className=' bg-danger-subtle m-0 border-3 border-black  '>
    //   {/* md={parseInt(breadth) * (12 / 300)} */}
    //     <Container className=" justify-content-center text-center">
    //       <div
    //         style={{ width: widthPercentage, height: heightPercentage }}
    //       >
    //         <h4>{description}</h4>
    //         <p>{breadth} x {length}</p>
    //       </div>
    //     </Container>
    //   </Col>
    <Col xs={12} md={parseInt(breadth) * (12 / 300)} className='bg-danger-subtle m-0 border-3 border-black'>
    <Container className="d-flex justify-content-center align-items-center h-100">
      <div style={{ width: widthPercentage, height: heightPercentage }}>
        <h4>{description}</h4>
        <p>{breadth} x {length}</p>
      </div>
    </Container>
  </Col>
    );
  };
  

export default FloorSpace;

