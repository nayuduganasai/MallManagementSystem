import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FloorSpace from './floorspace';

const FloorLayout = ({ totalBreadth, totalLength }) => {
    const widthPercentage = (parseInt(totalBreadth) / 300) * 100; // Assuming 300 feet is the total width
    const heightPercentage = (parseInt(totalLength) / 300) * 100; // Assuming 300 feet is the total length
  
    return (
    //   <Container
    //     className={`w-${widthPercentage}% h-${heightPercentage}% align-items-center bg-body-secondary ]` } 
    //   >
    //     <Row>
    
    //         <FloorSpace breadth="100" length="50" description="South-West" />
         
          
    //         <FloorSpace breadth="50" length="50" description="West" />
          
         
    //         <FloorSpace breadth="100" length="50" description="North-West" />
           
         
    //     </Row>
  
    //     <Row>
          
    //         <FloorSpace breadth="100" length="200" description="South" />
        
          
    //         <FloorSpace breadth="50" length="50" description="Atrium" />
       
          
    //         <FloorSpace breadth="100" length="200" description="North" />
        
    //     </Row>
  
    //     <Row>
          
    //         <FloorSpace breadth="100" length="50" description="South-East" />
         
      
    //         <FloorSpace breadth="50" length="50" description="East" />
     
         
    //         <FloorSpace breadth="100" length="50" description="North-East" />
       
    //     </Row>
    //   </Container>

    <Container className={`w-${widthPercentage}% h-${heightPercentage}% bg-body-secondary`} fluid>
      <Row noGutters className="h-100">
        <FloorSpace breadth="100" length="50" description="South-West" />
        <FloorSpace breadth="50" length="50" description="West" />
        <FloorSpace breadth="100" length="50" description="North-West" />
      </Row>

      <Row noGutters className="h-100">
        <FloorSpace breadth="100" length="200" description="South" />
        <FloorSpace breadth="50" length="50" description="Atrium" />
        <FloorSpace breadth="100" length="200" description="North" />
      </Row>

      <Row noGutters className="h-100">
        <FloorSpace breadth="100" length="50" description="South-East" />
        <FloorSpace breadth="50" length="50" description="East" />
        <FloorSpace breadth="100" length="50" description="North-East" />
      </Row>
    </Container>
    );
  };

export default FloorLayout
