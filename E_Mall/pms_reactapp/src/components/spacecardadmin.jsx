
import {Button, Col, Row,Form, Container} from 'react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomDatePicker from './datepicker2';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ComplaintList from './complaintlist';
import DiscountPage from './discountpage';


const SpaceCardAdmin = ({ spaceDetails }) => {
  const { location, categoryId, size, availableDate } = spaceDetails;
  const [categories, setCategories] = useState({});
  const [terms, setTerms] = useState([]);
  const [renttypes, setRentTypes] = useState([]);
  const [rentType,setRentType] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [showComplaints, setShowComplaints] = useState(false);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [spaceId,setSpaceId] = useState(0);
 

  useEffect(() => {
    axios
      .get(`http://localhost:8080/emall/categories/${categoryId}`)
      .then((response) => {
        setCategories({...response.data});
        setTerms([...response.data.terms]);
      })
      
      .catch((error) => {
        console.error("Error in fetching category List", error.response.message);
      });
  }, []);

  useEffect(()=>{
    
    axios
    .get(`http://localhost:8080/emall/spaces/${spaceId}/feedbacks`)
    .then((response) => {
      setFeedbacks(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching feedbacks', error.message);
    });

    // axios
    // .get(`http://localhost:8080/emall/spaces/${spaceId}/complaints`)
    // .then((response) => {
    //   setComplaints(response.data);
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.error('Error fetching feedbacks', error.message);
    // });

    // axios
    // .get(`http://localhost:8080/emall/spaces/${spaceId}/Discounts`)
    // .then((response) => {
    //   setDiscounts(response.data);
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.error('Error fetching feedbacks', error.message);
    // });

  },[spaceId])
     
      const handleTermChange = (termId) => {
        const selectedTerm = terms.find((term) => term.termId === termId);
        if (selectedTerm) {
          setRentTypes(selectedTerm.rentype);
        }
      };

      const handleRentTypeChange = (rentTypeId) => {
        const selectedRate = renttypes.find((rent) => rent.rentTypeId === rentTypeId);
        if (selectedRate) {
          setRentType(selectedRate);
        }
      };

      const renderStarIcons = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          const className = i <= rating ? 'bi-star-fill' : 'bi-star';
          stars.push(
            <span
              key={i}
              className={`${className} text-warning mr-1`}
            ></span>
          );
        }
        return stars;
      };


  return (
    <Container className=' border rounded border-dark   p-2 '>
      <h1 className="text-black" style={{ fontSize: "1.5rem" }}>Select the below to book your space</h1>
      <Row className="h-h-auto">
        <Col>
          <div className="table-responsive w-100 m-3">
            <table className="table table-light text-start ">
              <tbody>              
                <tr>
                  <td style={{color:'blueviolet'}}>Size (ft):</td>
                  <td>{size}</td>
                </tr>
                <tr>
                  <td style={{color:'blueviolet'}}>Location :</td>
                  <td>{location}</td>
                </tr>
                <tr>
                  <td style={{color:'blueviolet'}}>Select Date :</td>
                  <td>
                  <CustomDatePicker
                   availableDate={availableDate}
                      // filterDate={isDateDisabled}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
       </div>
          <Row className='m-3 align-content-end '>
          <Button variant={showFeedbacks?'secondary':'info'} className='w-auto m-3' onClick={() => {setShowFeedbacks(!showFeedbacks);setSpaceId(spaceDetails.spaceId)}}>
            {showFeedbacks ? 'Hide Feedbacks' : 'View Feedbacks'}
          </Button>
          <Button variant={showComplaints?'secondary':'info'} className='w-auto m-3' onClick={() => {setShowComplaints(!showComplaints);setSpaceId(spaceDetails.spaceId)}}>
            {showComplaints ? 'Hide Complaints' : 'View Complaints'}
          </Button>
          <Button variant={showDiscounts?'secondary':'info'} className='w-auto m-3' onClick={() => {setShowDiscounts(!showDiscounts);setSpaceId(spaceDetails.spaceId)}}>
            {showDiscounts ? 'Hide Discounts' : 'View Discounts'}
          </Button>
        
          <Button variant="primary" className=' w-auto m-3 '>Book</Button>
          {showFeedbacks && (
                    <ul className="list-group m-3 text-start ">
                      {feedbacks.map((feedback) => (
                        <li key={feedback.feedbackId} className="list-group-item">
                          <strong>Rating: {renderStarIcons(feedback.rating)} </strong> 
                          <p>Comment:{feedback.comment}</p>
                          <p>User:{feedback.userId}</p>
                        </li>
                      ))}
                    </ul>
          )}
        </Row>
        </Col>
        <Col >         
            <Row className="justify-content-center">
              <Col sclassName="text-center">
                <div className="selectors-box p-3">
                  <Form.Select aria-label="Category" disabled > 
                    <option>{categories.categoryId}</option>                    
                  </Form.Select>
 
                  <Form.Select aria-label="Term" className="mt-3" onChange={(e) => handleTermChange(parseInt(e.target.value))}>
                    <option>Select Term</option>
                    {terms.map((term) => (
                      <option key={term.termId} value={term.termId}>
                        {term.termName}
                      </option>
                    ))}
                  </Form.Select>
 
                  <Form.Select aria-label="RentType" className="mt-3" onChange={(e) => handleRentTypeChange(parseInt(e.target.value))}>
                    <option>Select RentType</option>
                    {renttypes.map((renttype) => (
                      <option key={renttype.rentTypeId} value={renttype.rentTypeId}>
                        {renttype.rentTypeName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Label className="mt-3 bg-black p-2 rounded text-warning " >Price : {rentType.cost}</Form.Label>
                
                </div>
              </Col>
            </Row>                
        </Col> 

        {showComplaints && <ComplaintList spaceId={spaceId}/>}
        {showDiscounts && <DiscountPage spaceId={spaceId}/>}     
      </Row>
  </Container>
  );
};

export default SpaceCardAdmin;
