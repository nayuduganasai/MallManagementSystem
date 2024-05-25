import React, { useState, useEffect } from 'react';
// import Nav from './nav';
import Navbar from './user_dashboard/components/Navbar';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

function SpaceOwnerHome() {
  const [categories, setCategories] = useState([]);
  const [terms, setTerms] = useState([]);
  const [rentTypes, setRentTypes] = useState([]);



  return (
    <div className='px-3'>
      <Navbar />
    </div>
  );
}

export default SpaceOwnerHome;
