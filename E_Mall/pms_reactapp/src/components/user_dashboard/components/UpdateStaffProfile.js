import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";

const UpdateStaffProfile = () => {
  const [updateDetails, setUpdateDetails] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    address: "",
    mobileNo: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole1 = localStorage.getItem("userRole");
    setUserRole(userRole1);
    console.log(userRole1);
    // Fetch the user details when the component mounts
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("jwtToken");
      const response = await axios.get(
        `http://localhost:8080/emall/users/profile/staff/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Set the user details in the state
      setUpdateDetails({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        userEmail: response.data.userEmail,
        address: response.data.address,
        mobileNo: response.data.mobileNo,
        salary: response.data.salary,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("jwtToken");
      await axios.put(
        `http://localhost:8080/emall/users/profile/staff/${userId}`,
        updateDetails,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Successfully updated, you can redirect or show a success message
      console.log("Profile updated successfully!");
      alert("Staff Profile Updated Successfully!!");
      navigate("/marketing-staff-dashboard");
    } catch (error) {
      setError("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Main Content (80%) */}
      <div style={{ flex: "1", padding: "20px" }}>
        <Container>
          <h2>Edit Profile</h2>
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={updateDetails.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={updateDetails.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="userEmail"
                value={updateDetails.userEmail}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={updateDetails.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="mobileNo">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNo"
                value={updateDetails.mobileNo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                value={updateDetails.salary}
                onChange={handleInputChange}
                readOnly // This will make the field read-only
              />
            </Form.Group>
            <br></br>
            <Button type="submit" class="btn btn-primary" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default UpdateStaffProfile;
