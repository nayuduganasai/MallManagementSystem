import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import RaiseComplaintButton from './raisecomplaint';
import ComplaintService from './services/complaintservice';

const ComplaintList = ({spaceId}) => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [userIdFilter, setUserIdFilter] = useState('');
  const [spaceIdFilter, setSpaceIdFilter] = useState(spaceId?spaceId:'');
  const[updated,setUpdated] = useState(false);

  useEffect(() => {
 
    spaceId ? fetchComplaints() : getComplaints();
   
  }, [updated]);

  async function fetchComplaints() {
    try {
      const data = await ComplaintService.getAllComplaints(); // Fetch complaints using the service
      setComplaints(data);
      setFilteredComplaints(data.filter((complaint) => complaint.spaceId === parseInt(spaceId)));
     
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  }

  async function getComplaints(){
    try {
      const data = await ComplaintService.getAllComplaints(); // Fetch complaints using the service
      setComplaints(data);
      setFilteredComplaints(data);
   
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }

  }

  const handleFilter = () => {
    console.log("exicuting------");
    let filtered = complaints;
    if (userIdFilter) {
      filtered = filtered.filter((complaint) => complaint.userId === parseInt(userIdFilter));
    }
    if (spaceIdFilter) {
      filtered = filtered.filter((complaint) => complaint.spaceId === parseInt(spaceIdFilter));
    }
    setFilteredComplaints(filtered);
  };

  const handleUpdate = async(complaint)=>{
           await ComplaintService.updateComplaint(complaint.complaintId,{...complaint,status:"Completed"})
            setUpdated(true)
  }

  return (
    <div>
      {/* <RaiseComplaintButton userId={1} spaceId={1}/> */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <input
          type="number"
          placeholder="Filter by User ID"
          value={userIdFilter}
          onChange={(e) => setUserIdFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by Space ID"
          value={spaceIdFilter}
          onChange={(e) => setSpaceIdFilter(e.target.value)}
        />
        <Button variant="primary" onClick={handleFilter}>
          Filter
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Status</th>
            <th>User ID</th>
            <th>Space ID</th>
            <th>Actions</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredComplaints?.map((complaint) => (
            <tr key={complaint.complaintId}>
              <td>{complaint.complaintId}</td>
              <td>{complaint.subject}</td>
              <td>{complaint.description}</td>
              <td className={complaint.status == "Completed"? "text-primary ":"text-danger "}>{complaint.status}</td>
              <td>{complaint.userId}</td>
              <td>{complaint.spaceId}</td>
              <td>
              <Button
                        className={complaint.status == "Completed"?"bg-primary w-100 disabled":"bg-primary w-100"}
                    
                        onClick={() => handleUpdate(complaint)}
                      >
                        Mark Completed
                      </Button>
                      {/* <Button className="bg-warning w-100  "
                        onClick={() => handleDelete(booking.bookingId)}
                      >
                        Delete
                      </Button> */}
              </td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ComplaintList;
