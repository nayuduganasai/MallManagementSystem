import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router";

const ShowAllMarketingStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust the number of items per page as needed
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   // Fetch user role from local storage
  //   const userRole1 = localStorage.getItem("userRole");
  //   setUserRole(userRole1);
  //   console.log(userRole1);

  //   const accessToken = localStorage.getItem("jwtToken");
  //   console.log(accessToken);

  //   // Fetch customer data from your API endpoint
  //   axios
  //     .get("http://localhost:8080/api/marketing-staff/showAllUser", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(
  //       (response) => (
  //         setStaffList(response.data), console.log("Response Satyam")
  //       )
  //     )
  //     .catch((error) => console.error("Error fetching staff data:", error));
  // }, []);

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
      .get("http://localhost:8080/emall/users/byrole/MARKETING_STAFF", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setStaffList(response.data);
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaffList = staffList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (userId) => {
    const accessToken = localStorage.getItem("jwtToken");
    if (window.confirm("Are you sure you want to delete this Customer ?")) {
      axios
        .delete(`http://localhost:8080/api/marketing-staff/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          // Update the customerList state without making a new API request
          setStaffList((prevStafflist) =>
            prevStafflist.filter((staff) => staff.userId !== userId)
          );
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
        });
    }
  };
  const handleUpdateClick = (userId) => {
    // Navigate to the UpdateMarketingStaff page with the userId parameter
    navigate(`/update-marketing-staff/${userId}`);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
          {/* Main Content (80%) */}
      <div style={{ flex: "1", padding: "20px" }}>
        <div>
          <h1>Marketing Staff List</h1>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>UserID</th>
                <th>UserName</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>MobileNo</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {staffList.map(staff => ( */}
              {currentStaffList.map((staff) => (
                <tr key={staff.userId}>
                  <td>{staff.userId}</td>
                  <td>{staff.userName}</td>
                  <td>{staff.firstName}</td>
                  <td>{staff.lastName}</td>
                  <td>{staff.userEmail}</td>
                  <td>{staff.mobileNo}</td>
                  <td>{staff.address}</td>
                  <td>{staff.salary}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      {/* <UpdateMarketingStaff onUpdate={handleUpdate} userId={staff.userId} /> */}
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => handleUpdateClick(staff.userId)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        class="btn btn-warning"
                        onClick={() => handleDelete(staff.userId)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="pagination">
          {Array.from({
            length: Math.ceil(staffList.length / itemsPerPage),
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

export default ShowAllMarketingStaff;
