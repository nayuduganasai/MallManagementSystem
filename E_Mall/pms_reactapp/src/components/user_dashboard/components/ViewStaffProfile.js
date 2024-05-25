import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
const ViewStaffProfile = () => {
  const [user, setUser] = useState("");
  const userId = localStorage.getItem("userId");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("jwtToken");
    const userRole1 = localStorage.getItem("userRole");
    setUserRole(userRole1);
    console.log(userRole1);
    axios
      .get(`http://localhost:8080/emall/users/profile/staff/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, [userId]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
          {/* Main Content (80%) */}
      <div style={{ flex: "1", padding: "20px" }}>
        <div className="container mt-5">
          <h2 className="text-center mb-4">User Profile</h2>
          <table className="table table-bordered table-striped">
            <tbody>
              {user ? (
                <>
                  {user.logoUrl && (
                    <tr>
                      <td colSpan="2" className="text-center">
                        <img
                          src={user.logoUrl}
                          alt="Logo"
                          className="img-fluid"
                        />
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>FirstName:</td>
                    <td>{user.firstName}</td>
                  </tr>
                  <tr>
                    <td>LastName:</td>
                    <td>{user.lastName}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{user.userEmail}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{user.address}</td>
                  </tr>
                  <tr>
                    <td>Mobile No:</td>
                    <td>{user.mobileNo}</td>
                  </tr>
                  <tr>
                    <td>Salary:</td>
                    <td>{user.salary}</td>
                  </tr>
                  {/* Add other user information fields */}
                </>
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewStaffProfile;
