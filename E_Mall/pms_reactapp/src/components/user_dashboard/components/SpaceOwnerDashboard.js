import React from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import { Navbar } from "reactstrap";
import axios from "axios";
import { Link} from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Table,Cube, Key, ClipboardData, People, TagFill, StopwatchFill, Stopwatch, Calendar, CalendarWeek } from 'react-bootstrap-icons';
import Reports from "../../reports";
import { getAllCategories } from "../../services/categoryservice";
import { getTerms } from "../../services/termservice";
import { getRentTypes } from "../../services/renttypeservice";
import { getDiscounts } from "../../services/discountservice";

const SpaceOwnerDashboard = ({hitRefresh}) => {

  const [categoriesCount, setCategoriesCount] = useState([]);
  const [termsCount, setTermsCount] = useState([]);
  const [rentTypesCount, setRentTypesCount] = useState([]);
  const [discountCount,setDiscountCount]=useState([])
  useEffect(
    
    () => {
    
    // Fetch categories, terms, and rent types from the API
    async function fetchData() {
      try {
        const categoriesResponse = await getAllCategories()
        //axios.get('http://localhost:8080/emall/categories');
        setCategoriesCount(categoriesResponse.length);

        const termsResponse = await getTerms()
        // axios.get('http://localhost:8080/emall/terms');
        setTermsCount(termsResponse.length);

        const rentTypesResponse = await getRentTypes()
        //axios.get('http://localhost:8080/emall/rentTypes');
        setRentTypesCount(rentTypesResponse.length);

        const discountResponse = await getDiscounts()
        // axios.get('http://localhost:8080/emall/discounts');
        setDiscountCount(discountResponse.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
    hitRefresh();
  },[]);
  return (
    <div>
      {/* <Navbar /> */}
        <div>
            <div style={{ padding: "10px" }}>
              <h2>Admin Dashboard</h2>
              {/* Add your customer dashboard components here */}
                <div className='col-12  col-lg-12  min-vh-100 rounded-2 bg-body-secondary '>
                  <div className='p-2'>
                    <div className='row'>
                            <div className='col-md-3'>
                              <Card className='bg-warning-subtle '>
                                <Card.Body>
                                  <Table size={40} color='royalblue' />
                                  <Card.Title >Categories</Card.Title>
                                  <Card.Text >{categoriesCount}</Card.Text>
                                  <Link to='/categoryList'>
                                    <Button variant='secondary'>View Categories</Button>
                                  </Link>
                                </Card.Body>
                              </Card>
                            </div>
                            <div className='col-md-3'>
                              <Card className='bg-warning-subtle '>
                                <Card.Body>
                                  <CalendarWeek size={40} color='forestgreen' />
                                  <Card.Title>Terms</Card.Title>
                                  <Card.Text>{termsCount}</Card.Text>
                                  <Link to='/termList'>
                                    <Button variant='secondary'>View Terms</Button>
                                  </Link>
                                </Card.Body>
                              </Card>
                            </div>
                            <div className='col-md-3'>
                              <Card className='bg-warning-subtle '>
                                <Card.Body>
                                  <Stopwatch size={40} color='darkorange' />
                                  <Card.Title>Rent Types</Card.Title>
                                  <Card.Text>{rentTypesCount}</Card.Text>
                                  <Link to='/renttypeList'>
                                    <Button variant='secondary'>View Rent Types</Button>
                                  </Link>
                                </Card.Body>
                              </Card>
                            </div>
                            <div className='col-md-3'>
                              <Card className='bg-warning-subtle '>
                                <Card.Body>
                                  <TagFill size={40} color='dark' />
                                  <Card.Title>Discounts</Card.Title>
                                  <Card.Text>{discountCount}</Card.Text>
                                  <Link to='/discountList'>
                                    <Button variant='secondary'>View Discounts</Button>
                                  </Link>
                                </Card.Body>
                              </Card>
                            </div>
                    </div>
                    <Reports/>
                  </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceOwnerDashboard;
