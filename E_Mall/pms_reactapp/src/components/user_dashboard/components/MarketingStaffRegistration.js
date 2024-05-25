import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import your Sidebar component

const MarketingStaffRegistration = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [salary, setSalary] = useState("");
  const [userEmail, setEmail] = useState("");
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setUserRole(userRole);
  }, []);

  const validateMobileNo = (number) => {
    return /^[6-9]\d{9}$/.test(number);
  };

  const validatePassword = (pass) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      pass
    );
  };

  const handleSignUp = async () => {
    try {
      if (
        !userName ||
        !password ||
        !firstName ||
        !lastName ||
        !address ||
        !validatePassword(password) ||
        !validateMobileNo(mobileNo) ||
        !salary ||
        !userEmail
      ) {
        alert("Please fill in all required fields correctly.");
        return;
      }

      if (!validatePassword(password)) {
        console.error(
          "Invalid password. Password must be at least 8 characters and contain a combination of letters, numbers, and special symbols."
        );
        return;
      }

      if (!validateMobileNo(mobileNo)) {
        console.error(
          "Invalid phone number. Please enter a maximum of 10 digits."
        );
        return;
      }

      const registrationData = {
        userName,
        password,
        firstName,
        lastName,
        address,
        mobileNo,
        salary,
        userEmail,
      };

      const response = await axios.post(
        "http://localhost:8080/emall/users/marketing-staff/register",
        registrationData
      );

      console.log("Marketing Staff registered successfully:", response.data);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.error("Error during user registration:", error.message);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <div style={{ flex: "1", padding: "20px" }}>
        <div className="container">
          <h2 className="text-center mb-4">
            <b>Sign Up</b>
          </h2>
          {/* Marketing Staff registration form JSX */}
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="userName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="text-danger">
                  {password &&
                    !validatePassword(password) &&
                    "Invalid password. Password must be at least 8 characters and contain a combination of letters, numbers, and special symbols."}
                </small>
              </div>

              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="mobileNo" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNo"
                  placeholder="Enter mobile number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
                <small className="text-danger">
                  {mobileNo &&
                    !validateMobileNo(mobileNo) &&
                    "Invalid mobile number. Please enter a maximum of 10 digits."}
                </small>
              </div>

              <div className="col-md-6">
                <label htmlFor="salary" className="form-label">
                  Salary
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="salary"
                  placeholder="Enter salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="userEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={userEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarketingStaffRegistration;
