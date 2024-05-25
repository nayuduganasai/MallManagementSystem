
import {Card, Button, Col, Row,Form, Container} from 'react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from "react";
// import CustomDatePicker from './datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './redux/CartSlice';
import CustomDatePicker from './datepicker2';
import SpaceService from './services/spaceservice';
import { getCategoryById } from './services/categoryservice';
import { useNavigate } from 'react-router';


const SpaceCardUser = ({ shopNumber}) => {

  const [spaces, setSpaces] = useState({ spaceId: "",
                                        location: "",
                                        categoryId: "",
                                        size: "",
                                        availableDate:new Date()});
  const [categories, setCategories] = useState({});
  const [terms, setTerms] = useState([]);
  const [renttypes, setRentTypes] = useState([]);
  const [rentType,setRentType] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const navigate = useNavigate();
  //ncode
  // const [spaceId,setSpaceId] = useState(0);
  const [termId,setTermId]=useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rentTypeId, setRentTypeId] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
 
  const dispatch=useDispatch();


  useEffect(() => {
    fetchSpacesData(shopNumber)
    
  }, []);


  const fetchSpacesData = async (shopNumber) => {
    try {
      const response = await SpaceService.getSpaceByLocation(shopNumber);
      setSpaces({ ...response});
      // After setting the spaces, other actions might be performed
      // setSpaces({...spaces,availableDate:response.availableDate})
      getFeedbacks(response.spaceId);
      getCategory(response.categoryId);
    } catch (error) {
      console.error('Error fetching spaces:', error);
    }
  };
  

  async function getFeedbacks(spaceId){
   await SpaceService.getFeedbacksBySpaceId(spaceId)
    .then((response) => {
      setFeedbacks(response);
      console.log(response);
    })
    .catch((error) => {
      console.error('Error fetching feedbacks', error.message);
    });
  }
 
  async function getCategory(categoryId) {
    console.log(categoryId);
    await getCategoryById(categoryId)
    .then((response) => {
      setCategories({...response});
      setTerms([...response.terms]);
    })
    
    .catch((error) => {
      console.error("Error in fetching category List", error.response.message);
    });
    
  }

      const validateForm = () => {
        // Validate start date, end date, termId, rentTypeId
        const isStartDateValid = startDate !== "";
        const isEndDateValid = endDate !== "";
        const isTermIdValid = termId !== 0;
        const isRentTypeIdValid = rentTypeId !== 0;
        console.log({startDate,endDate,termId,rentTypeId});

        // Enable the form if all fields are valid
        // setTimeout(()=>{ 
          
          setIsFormValid(isStartDateValid && isEndDateValid && isTermIdValid && isRentTypeIdValid);
          
        // },1000)
       
        console.log(isFormValid);
      };

  
      const handleStartDateChange = (date) => {
        console.log(date);
        setStartDate(date);
        validateForm();
      };

      const handleEndDateChange = (date) => {
        console.log(date);
        setEndDate(date);
        validateForm();
      };

     
      const handleTermChange = (termId) => {
        const selectedTerm = terms.find((term) => term.termId === termId);
        if (selectedTerm) {
          setRentTypes(selectedTerm.rentype);
          validateForm();
          // ncode
          setTermId(termId)
          // console.log(termId)
        }
      };

      const handleRentTypeChange = (rentTypeId) => {
        const selectedRate = renttypes.find((rent) => rent.rentTypeId === rentTypeId);
        if (selectedRate) {
          setRentType(selectedRate);
          setRentTypeId(rentTypeId);
          validateForm();
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

      const handleAddToCart = () => {
        // Logic to add to cart
        if (isFormValid) {
          dispatch(
            addToCart({
              spaceId: spaces.spaceId,
              location: spaces.location,
              categoryId: spaces.categoryId,
              rentType,
              startDate,
              endDate,
              termId,
            })
          );
          navigate(`/cart2/user/${localStorage.getItem("userId")}`);
        }
      };

  return (
    <Container className=' border rounded border-dark  p-2 m-2 '>
      <h1 className="text-black" style={{ fontSize: "1.5rem" }}>Select the below to book your space</h1>
      <Row className="h-h-auto">
        <Col>
          <div className="table-responsive w-150 m-3">
            <table className="table table-light text-start ">
              <tbody>              
                <tr>
                  <td style={{color:'blueviolet'}}>Size (ft):</td>
                  <td>{spaces.size}</td>
                </tr>
                <tr>
                  <td style={{color:'blueviolet'}}>Location :</td>
                  <td>{spaces.location}</td>
                </tr>
                <tr>
                  <td style={{color:'blueviolet'}}>Select Date :</td>
                  <td>
                  <CustomDatePicker
                   availableDate={spaces.availableDate}
                   onStartDateChange={handleStartDateChange}
                   onEndDateChange={handleEndDateChange}
                      // filterDate={isDateDisabled}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
       </div>
          <Row className='m-3 align-content-end '>
            {!isFormValid && <p className='text-danger '> please select all the data to enable "add to cart" button </p>}
          <Button variant='info' className='w-auto m-3' onClick={() => {setShowFeedbacks(!showFeedbacks);
            // setSpaceId(spaceDetails.spaceId)
            }}>
            {showFeedbacks ? 'Hide Feedbacks' : 'View Feedbacks'}
          </Button>
          <Button
            variant="primary"
            className='w-auto m-3'
            onClick={handleAddToCart}
            disabled={!isFormValid} // Disable button if form is invalid
            
          >
            Add to cart
        </Button>
          
          {/* <CartActions spaceDetails={spaceDetails} floor={1} zone={1} /> */}
          {showFeedbacks && (
                    <ul className="list-group m-3 text-start ">
                      {feedbacks.map((feedback) => (
                        <li key={feedback.feedbackId} className="list-group-item">
                          <strong>Rating: {renderStarIcons(feedback.rating)} </strong> 
                          <p>Comment:{feedback.comment}</p>
                        </li>
                      ))}
                    </ul>
          )}
        </Row>
        </Col>
        <Col >         
            <Row className="justify-content-center">
              <Col className="text-center">
                <div className="selectors-box p-3">
                  <Form.Select aria-label="Category" required> 
                    <option>{categories.categoryId}</option>                    
                  </Form.Select>
 
                  <Form.Select aria-label="Term" required className="mt-3" onChange={(e) => handleTermChange(parseInt(e.target.value))}>
                    <option>Select Term</option>
                    {terms.map((term) => (
                      <option key={term.termId} value={term.termId}>
                        {term.termName}
                      </option>
                    ))}
                  </Form.Select>
 
                  <Form.Select aria-label="RentType" required className="mt-3" onChange={(e) => handleRentTypeChange(parseInt(e.target.value))}>
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
      </Row>
  </Container>
  );
};

export default SpaceCardUser;
