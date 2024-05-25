import React from 'react';
import { Form, Button,Badge } from 'react-bootstrap';
import axios from 'axios';
import { useState,useEffect } from 'react';
import SpaceService from './services/spaceservice';
import { addDiscount } from './services/discountservice';

const DiscountForm = ({ handleClose,handleSuccess, handleRefresh }) => {
  const [spaceIds, setSpaceIds] = useState([]);
  const [selectedSpaceIds, setSelectedSpaceIds] = useState([]);

  useEffect(() => {
    // Fetch space IDs from the database or API
    // axios.get('http://localhost:8080/emall/spaces').then((response) => {
    //   setSpaceIds(response.data.map((space) => space.spaceId));
    // });
    async function fetchSpaceIds() {
      try {
        const data = await SpaceService.getAllSpaces(); // Fetch spaces using the service
        setSpaceIds(data.map((space) => space.spaceId));
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    }
    fetchSpaceIds();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const discountData = {
      name: e.target.name.value,
      percentage: parseFloat(e.target.percentage.value),
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      spaceIds: selectedSpaceIds,
    };

    // // Post the discountData object to the backend API
    // axios.post('http://localhost:8080/emall/discounts', discountData)
    //   .then((response) => {
    //     // Handle success response
    //     console.log('Discount data posted:', response.data);
    //   })
    //   .then(()=>{ handleClose();
    //               handleSuccess(); // Show success modal
    //             })
    //   .catch((error) => {
    //     // Handle error response
    //     console.error('Error posting discount data:', error);
    //     // Add any error handling logic
    //   });
    addDiscount(discountData).then(
      ()=>{ handleClose();
            handleSuccess(); // Show success modal
                    }
    ).catch((error)=>{console.error('Error posting discount data:', error);})
  };

  const handleSpaceIdClick = (id) => {
    if (selectedSpaceIds.includes(id)) {
      setSelectedSpaceIds(selectedSpaceIds.filter(spaceId => spaceId !== id));
    } else {
      setSelectedSpaceIds([...selectedSpaceIds, id]);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter discount name" />
      </Form.Group>

      <Form.Group controlId="percentage">
        <Form.Label>Percentage</Form.Label>
        <Form.Control type="number" placeholder="Enter discount percentage" />
      </Form.Group>

      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Form.Group controlId="spaceIds" >
      <div style={{ border: '1px solid #ccc', padding: '10px',borderRadius:'10px',marginTop:'10px',marginBottom:'10px'}}>
        <div>
        <Form.Label>Selected Space IDs:{' '}</Form.Label>
          {selectedSpaceIds.map((spaceId) => (
            <Badge key={spaceId} className="m-1" pill variant="primary">
              {spaceId}
            </Badge>
          ))}
        </div>
        <div className="d-flex flex-wrap">
          {spaceIds.map((id) => (
            <Button
              key={id}
              className="m-1"
              variant={selectedSpaceIds.includes(id) ? 'primary' : 'secondary'}
              onClick={() => handleSpaceIdClick(id)}
            >
             {id}
            </Button>
          ))}
        </div>
       </div>
      </Form.Group>

      <Button variant="primary" type="submit" className='m-1 '>
        Save
      </Button>
      <Button variant="danger" onClick={handleClose} className='m-1 '>
        Close
      </Button>
    </Form>
  );
};

export default DiscountForm;
