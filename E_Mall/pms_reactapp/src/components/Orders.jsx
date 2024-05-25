import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert, Button } from 'react-bootstrap';
import SpaceDetails from './SpaceDetails'; // Import the SpaceDetails component
import { useSelector } from 'react-redux';
import RaiseComplaintButton from './raisecomplaint';
import SpaceFeedbackCard from './feedbackcard';
import { useParams } from 'react-router';
import SpaceService from './services/spaceservice';
import SpaceBookingService from './services/spacebookingservice';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedSpace, setSelectedSpace] = useState(null);
  // const { userId } = useParams(); // Get the userId from the URL
  const { userId } = useParams();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
      await SpaceBookingService.getSpaceBookingByUserId(userId)
                              .then((response)=>setOrders(response))
        
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('You have no orders.');
        } else {
          console.error('Error fetching orders:', error);
        }
      }
    };
    fetchOrders();
    console.log(orders);
  }, [userId]); // Add userId to the dependency array

  const handleViewSpaceDetails = async (spaceId) => {
    if (selectedOrderId === spaceId) {
      // If the same button is clicked again, hide the space details
      setSelectedOrderId(null);
      setSelectedSpace(null);
    } else {
      // Otherwise, fetch and show the space details
      try {
        // const response = await axios.get(`http://localhost:8080/emall/spaces/${spaceId}`);
        const response = await SpaceService.getSpaceById(spaceId)
        setSelectedOrderId(spaceId);
        setSelectedSpace(response);
      } catch (error) {
        console.error('Error fetching space details:', error);
      }
    }
  };

  return (
    <div>
      {/* <Navbar userId={userId}/> */}
      <div className="container mt-4">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <Table striped bordered hover>
          <thead className='text-center'>
            <tr className='text-bg-primary '>
              <th >Booking ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Space ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <React.Fragment key={order.bookingId}>
                <tr>
                  <td>{order.bookingId}</td>
                  <td>{order.startDate}</td>
                  <td>{order.endDate}</td>
                  <td>{order.status}</td>
                  <td>{order.spaceId}</td>
                  <td className='align-items-center text-center'>
                   
                    {localStorage.getItem("loggedIn") && <div>

                    <Button
                      variant="info"
                      className='w-100 m-1'
                      onClick={() => handleViewSpaceDetails(order.spaceId)}
                    >
                      {selectedOrderId === order.spaceId ? 'Hide Details' : 'View Details'}
                    </Button>
                    <br/>
                        { order.status !== "Pending" && <>
                        <SpaceFeedbackCard userId={userId} spaceId={order.spaceId}/>
                        <br/>
                        <RaiseComplaintButton userId={userId} spaceId={order.spaceId}/>
                        </>
                        }
                    </div>
                    }
                  </td>
                </tr>
                {selectedSpace && selectedOrderId === order.spaceId && (
                  <tr>
                    <td colSpan="6">
                      <SpaceDetails spaceDetails={selectedSpace} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No Orders Found</p>
      )}
    </div>
    </div>
    
  );
};

export default Orders;
