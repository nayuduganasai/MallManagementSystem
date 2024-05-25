import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import RequestService from './services/requestservice';
 
const Requests = () => {
  const [requests, setRequests] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useSelector((state) => state.allCart);
 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust as needed
 
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await RequestService.getAllRequests();
        setRequests(response);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('You have no requests.');
        } else {
          console.error('Error fetching requests:', error);
        }
      }
    };
 
    fetchRequests();
  }, [userId]);
 
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests && requests.slice(indexOfFirstItem, indexOfLastItem);
 
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <div>
      <div className="container mt-4">
        <h2>Your Requests</h2>
        {currentRequests ? (
          <>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Space ID</th>
                <th>User ID</th>
                <th>Request Date</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Referral ID</th>
                <th>Category ID</th>
                <th>Term ID</th>
                <th>Rent Type ID</th>
              </tr>
            </thead>              <tbody>
                {currentRequests.map((request) => (
                  <tr key={request.requestId}>
                  <td>{request.requestId}</td>
                  <td>{request.spaceId}</td>
                  <td>{request.userId}</td>
                  <td>{request.requestDate}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.referralId}</td>
                  <td>{request.categoryId}</td>
                  <td>{request.termId}</td>
                  <td>{request.rentTypeId}</td>
               
                    {/* ... Your table data */}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {Array.from({ length: Math.ceil(requests.length / itemsPerPage) }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
 
export default Requests;