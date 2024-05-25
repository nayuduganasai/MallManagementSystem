import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const NewMallLayout = ({floor}) => {
  // Assuming a 5x5 grid for shops in the mall

  const navigate = useNavigate();
  const rows = 4;
  const cols = 5;

  const renderShops = () => {
    const shops = [];

    // Create a grid of shops
    for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Generate a unique key for each shop based on row and col
                const shopKey = `shop_${row}_${col}`;
                let shopnumber = floor*100 +(row * cols + col + 1)
                shops.push(
                <Col key={shopKey} style={{width:"100px", height:"100px", backgroundColor:"white",margin:"1px",textAlign:"center"}}  >
                    Shop {shopnumber}
                    <Button className='bg-black ' onClick={()=>navigate(`/space/${shopnumber}`)}>View Details</Button>
                </Col>
                );
            }
    }

    return shops;
  };

  return (
    <Container className="mall-layout">
      <h1 className="text-center">Mall Layout</h1>
      <Container className='p-5 bg-info rounded-5  '>
      <Row >
        {renderShops().slice(0,5)}
      </Row>
      <Row >
        {renderShops().slice(13,14)} 
        {floor === "1"?<>
            <Col >
            {renderShops().slice(14,15)} 
            </Col>        
            <Col >
            {renderShops().slice(15,16)} 
            </Col>
            <Col>
            {renderShops().slice(16,17)}
            </Col>
        </>:<>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        
        </>
        }
                  
        {renderShops().slice(5,6)}
      </Row>
      <Row >
        {renderShops().slice(12,13)}
        {floor === "1"?<>
            <Col >
            {renderShops().slice(17,18)} 
            </Col>        
            <Col >
            {renderShops().slice(18,19)} 
            </Col>
            <Col >
            {renderShops().slice(19,20)}
            </Col> 
            </>:
            <>
                 <Col></Col>
                <Col></Col>
                <Col></Col>
            </>}
        {renderShops().slice(6,7)}
      </Row>
      <Row>
        {renderShops().slice(7,12).reverse()}
      </Row>
      </Container>
    </Container>
  );
};

export default NewMallLayout;
