import React, { useState, useEffect } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router";

function ShowAllBookingsByReferal() {
  const [rbook, setRbook] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(8); // Set the number of bookings per page
  const refId = localStorage.getItem("refId");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

//   useEffect(() => {
//     const userRole1 = localStorage.getItem("userRole");
//     setUserRole(userRole1);
//     const accessToken = localStorage.getItem("jwtToken");
//     axios
//       .get(`http://localhost:8080/emall/spacebookings/user/referal/${refId}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         console.log("Fetched data:", response.data);
//         setRbook(response.data);
//       })
//       .catch((error) => console.error("Error fetching bookings:", error));
//   }, [refId]);


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
        if (error.response && error.response.status === 500) {
          console.log("Interceptor Error:", error.response);

        }
        return Promise.reject(error);
      }
    );
  
    axios
    .get(`http://localhost:8080/emall/spacebookings/user/referal/${refId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setRbook(response.data);
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
  }, [refId]);

  // Pagination Logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = rbook.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFeedback = (bookingId) => {
    console.log(`Feedback for booking ID ${bookingId}`);
    navigate("/feedback");
  };

  const handleComplaint = (bookingId) => {
    console.log(`Complaint for booking ID ${bookingId}`);
    navigate("/complain");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
         {/* Main Content (85%) */}
      <div style={{ flex: "1", padding: "20px" }}>
        <h2>Bookings Data:</h2>
        <div style={{ maxHeight: "70vh", overflow: "auto" }}>
          {currentBookings.length === 0 ? (
            <p>No Referal bookings available for this ID.</p>
          ) : (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
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
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.map((booking) => (
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
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>
                {Array.from(
                  { length: Math.ceil(rbook.length / bookingsPerPage) },
                  (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowAllBookingsByReferal;
