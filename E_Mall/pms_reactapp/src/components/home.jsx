import React, { useState, useEffect } from 'react';
import Nav from './nav';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

function Home() {
  const [categories, setCategories] = useState([]);
  const [terms, setTerms] = useState([]);
  const [rentTypes, setRentTypes] = useState([]);



  return (
    <div className='px-3'>
      <Nav />
    </div>
  );
}

export default Home;
