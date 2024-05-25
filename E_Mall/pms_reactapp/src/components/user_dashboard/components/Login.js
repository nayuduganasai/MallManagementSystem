import React, { useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Login = ({setUserRole}) => {
  const navigate = useNavigate();
  const [loginRequest, setLoginRequest] = useState({
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginRequest((prevLoginRequest) => ({
      ...prevLoginRequest,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      username: "",
      password: "",
    };

    if (!loginRequest.username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!loginRequest.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8080/auth/login", {
                 method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                  },
                  body: JSON.stringify(loginRequest),
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          setLoginError(errorMessage); // Set login error message state
          return;
        }
  
        const responseBody = await response.json();
        console.log(responseBody); // Check the structure of the response
  
        if (responseBody && responseBody.authorities && responseBody.authorities.length > 0) {
          // Store the token and role in localStorage
          localStorage.setItem("jwtToken", responseBody.jwtToken);
          localStorage.setItem("userRole", responseBody.authorities);
          setUserRole();
          localStorage.setItem("username", responseBody.username);
          localStorage.setItem("userId", responseBody.userId);
          localStorage.setItem("refId", responseBody.referralId);
          localStorage.setItem("loggedIn", true);
  
          const userRoles = localStorage.getItem("userRole")?.split(',');
          switch (userRoles[0]) {
            case "SPACE_OWNER":
              navigate("/admin");
              break;
            case "MARKETING_STAFF":
              navigate("/marketing-staff-dashboard");
              break;
            case "CUSTOMER":
              navigate("/customer-dashboard");
              break;
            default:
              navigate("/unauthorized");
              break;
          }
        } else {
          setLoginError("Invalid response from server."); // Handle unexpected response
        }
      } catch (error) {
        console.error("Error during login:", error);
        setLoginError("Error during login. Please try again."); // Set login error message state
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="text-center mb-4">Login Here</h2>
        {loginError && (
          <div className="alert alert-danger" role="alert">
            {loginError}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className={`form-control ${
              validationErrors.username ? "is-invalid" : ""
            }`}
            id="username"
            name="username"
            value={loginRequest.username}
            onChange={handleInputChange}
          />
          <div className="invalid-feedback">{validationErrors.username}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${
                validationErrors.password ? "is-invalid" : ""
              }`}
              id="password"
              name="password"
              value={loginRequest.password}
              onChange={handleInputChange}
            />
            
            
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
            <div className="invalid-feedback">{validationErrors.password}</div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <div className="mt-2 text-center">
          <Link to="/forgot-password" className="text-primary">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
