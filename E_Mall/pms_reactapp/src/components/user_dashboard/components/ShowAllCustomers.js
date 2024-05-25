import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router";

const ShowAllCustomer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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
      .get("http://localhost:8080/emall/users/byrole/CUSTOMER", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setCustomerList(response.data);
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
  }, []);
  

  const handleDelete = (userId) => {
    const accessToken = localStorage.getItem("jwtToken");
    if (window.confirm("Are you sure you want to delete this Customer?")) {
      axios
        .delete(`http://localhost:8080/api/customer/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          // Update the customerList state without making a new API request
          setCustomerList((prevCustomerList) =>
            prevCustomerList.filter((customer) => customer.userId !== userId)
          );
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
        });
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomerList = customerList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdateClick = (userId) => {
    // Navigate to the UpdateMarketingStaff page with the userId parameter
    navigate(`/update-customer/${userId}`);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
     
      {/* Main Content (80%) */}
      <div style={{ flex: "1", padding: "20px" }}>
        <h1>Customer List</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>UserID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email Address</th>
              <th>MobileNo</th>
              <th>Address</th>
              <th>Action</th>
              {/* Add more columns based on your User model */}
            </tr>
          </thead>
          <tbody>
            {currentCustomerList.map((customer) => (
              <tr key={customer.userId}>
                <td>{customer.userId}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.userEmail}</td>
                <td>{customer.mobileNo}</td>
                <td>{customer.address}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => handleUpdateClick(customer.userId)}
                    >
                      Update
                    </button>
                    <button type="button" class="btn btn-warning"
                     onClick={() => handleDelete(customer.userId)}>
                      Delete
                    </button>
                  </div>
                </td>
                {/* Add more columns based on your User model */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({
            length: Math.ceil(customerList.length / itemsPerPage),
          }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowAllCustomer;
