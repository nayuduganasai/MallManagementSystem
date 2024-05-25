import React, { useState, useEffect } from 'react';
import { Form, Button,Badge } from 'react-bootstrap';
import axios from 'axios';
import { fetchDiscountById, updateDiscount } from './services/discountservice';
import SpaceService from './services/spaceservice';

const DiscountUpdateForm = ({ prefilledData,close }) => {
  const [formData, setFormData] = useState({
    name: '',
    percentage: 0,
    startDate: '',
    endDate: '',
    spaceIds: [],
    discountId: '',
  });

  const [spaceIds, setSpaceIds] = useState([]);
  const [selectedSpaceIds, setSelectedSpaceIds] = useState([]);

  useEffect(() => {
    async function fetchDiscounts() {
      try {
        const data =  await fetchDiscountById(prefilledData.id).then((res)=>{
          setFormData({...formData,...res});
          setSelectedSpaceIds(res.spaceIds);
         }).catch((error)=>{console.error("Error fetching data:", error);})
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    }
    async function fetchspaces(){
      await SpaceService.getAllSpaces()
                        .then((response)=>{setSpaceIds(response.map((space) => space.spaceId));})

    }
    fetchDiscounts();
    fetchspaces();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSpaceIdClick = (id) => {
    if (selectedSpaceIds.includes(id)) {
      setSelectedSpaceIds(selectedSpaceIds.filter((spaceId) => spaceId !== id));
    } else {
      setSelectedSpaceIds([...selectedSpaceIds, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with updated data
    const discountData = {
      name: e.target.name.value,
      percentage: parseFloat(e.target.percentage.value),
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      spaceIds: selectedSpaceIds,
    };
    // axios.put(`http://localhost:8080/emall/discounts/${prefilledData.id}`,discountData).then((response) => {console.log(response.data); close(); })
    updateDiscount(prefilledData.id,discountData).then((response) => {console.log(response); close(); })
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="discountId">
        <Form.Label>Discount Id</Form.Label>
        <Form.Control
          type="text"
          placeholder="Discount Id"
          value={formData.discountId}
          onChange={handleChange}
          disabled
        />
      </Form.Group>

      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter discount name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="percentage">
        <Form.Label>Percentage</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter discount percentage"
          value={formData.percentage}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={formData.startDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={formData.endDate}
          onChange={handleChange}
        />
      </Form.Group>

    <Form.Group controlId="spaceIds">
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px', marginTop: '10px', marginBottom: '10px' }}>
              <div>
                <Form.Label>Selected Space IDs:</Form.Label>
                {selectedSpaceIds.map((spaceId) => (
                  <Badge key={spaceId} className="m-1" pill variant="primary" onClick={() => handleSpaceIdClick(spaceId)}>
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
        Update
      </Button>
    </Form>
  );
};

export default DiscountUpdateForm;
