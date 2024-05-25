import React, { useState, useEffect } from "react";
import {  Button, Table } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router";

function ShowAllBookings() {
  //const [bookings, setBookings] = useState([]);
  const [book, setBook] = useState([]);
  const [isApproved,setIsApproved] = useState(false);
  const userId = localStorage.getItem("userId");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   const userRole1 = localStorage.getItem("userRole");
  //   setUserRole(userRole1);
  //   const accessToken = localStorage.getItem("jwtToken");
  //   axios
  //     .get(`http://localhost:8080/emall/spacebookings/user/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("Fetched data:", response.data);
  //       setBook(response.data);
  //       console.log(book);
  //       console.log(userId);
  //     })
  //     .catch((error) => console.error("Error fetching bookings:", error));
  // }, [userId]);

  useEffect(() => {
    const userRole1 = localStorage.getItem("userRole");
    setUserRole(userRole1);
    const accessToken = localStorage.getItem("jwtToken");
  
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => {
        console.log("Interceptor Success:", response);
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("Interceptor Error:", error.response);

        }
        return Promise.reject(error);
      }
    );
  
    axios
    .get(`http://localhost:8080/emall/spacebookings`,  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setBook(response.data);
        console.log("API Success:", response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
        // Additional error handling if needed
      });
  
    // Cleanup the interceptor when the component is unmounted
    return () => {
      axios.interceptors.response.eject(axiosInterceptor);
    };
  }, [userId,isApproved]);

  // useEffect(() => {
  //   if (book.length === 0) {
      
  //     alert("No Bookings available for this ID.");
  //     navigate("/customer-dashboard");
  //   }
  // }, [book, navigate]);

  // useEffect(() => {
  //   // Log the updated state whenever it changes
  //   console.log("Updated Bookings:", book);
  // }, [book]); // Add bookings as a dependency

  const handleApprove = async(orderId) => {
    await axios.patch(`http://localhost:8080/emall/spacebookings/approve/${orderId}`)
                .then(setIsApproved(!isApproved))

      
  };

  const handleReject = async(orderId) => {
    await axios.patch(`http://localhost:8080/emall/spacebookings/reject/${orderId}`)
                .then(setIsApproved(!isApproved))
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
     
      {/* Main Content (85%) */}
      <div style={{ flex: "1", padding: "20px" }}>
        <h2>Bookings Data:</h2>
        <div style={{ maxHeight: "70vh" }}>
          {book.length === 0 ? (
            <p>No bookings available for this ID.</p>
          ) : (
            // navigate("/customer-dashboard")

            //<p>No bookings available</p>
            // <table className="table table-striped">
            <Table striped bordered hover>
              <thead>
                <tr className="text-bg-secondary text-center  ">
                  <th>Booking ID</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Total Price</th>
                  <th>ReferalId</th>
                  <th>Status</th>
                  <th>CategoryId</th>
                  <th>RentTypeId</th>
                  <th>TermId</th>
                  <th>SpaceId</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="w-auto">
                {book.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>
                    <td>{booking.startDate}</td>
                    <td>{booking.endDate}</td>
                    <td>{booking.total_price}</td>
                    <td>{booking.referralId}</td>
                    <td>{booking.status}</td>
                    <td>{booking.categoryId}</td>
                    <td>{booking.rentTypeId}</td>
                    <td>{booking.termId}</td>
                    <td>{booking.spaceId}</td>
                    <td>
                      <Button
                        className="bg-primary w-100"
                        onClick={() => handleApprove(booking.bookingId)}
                      >
                        Approve
                      </Button>
                      <Button className="bg-warning w-100  "
                        onClick={() => handleReject(booking.bookingId)}
                      >
                        Reject
                      </Button>
                    </td>
                   
                  </tr>
                ))}
              </tbody>
              </Table>
            // </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowAllBookings;
