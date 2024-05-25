import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MallLayout from './MallLayout';
import ZonePage from './ZonePage';
import axios from 'axios';
import Navbar from './Navbar';
import { setUserIdState } from './redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Mall = () => {
  // const [spaces, setSpaces] = useState([]);
  const [spaceOrder, setSpaceOrder] = useState([]);
  const [spacesInZone, setSpacesInZone] = useState([1, 2]);
  const [zoneData, setZoneData] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.allCart);


  useEffect(() => {
    // Get userRole from local storage
    const userRole = localStorage.getItem('userRole');

    // Check if userRole exists in local storage
    if (userRole) {
      // If userRole exists, dispatch the setUserIdState action with userRole as a parameter
      dispatch(setUserIdState(userRole));
    } else {
      // If userRole doesn't exist, dispatch the setUserIdState action with 1 as a parameter
      dispatch(setUserIdState(4));
    }
  }, [dispatch]);
  
  
  useEffect(() => {
    const userIdFromLS = localStorage.getItem("userId");
    if (userIdFromLS){
        dispatch(setUserIdState(userIdFromLS))
    }
  })
  return (
    <div className="container-fluid">   
    <MallLayout/>
    </div>
  );
};

export default Mall;
