
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Cart4 } from "react-bootstrap-icons";

const Navbar = ({ onLogout,LoggedIn }) => {
  const [isLoggedIn, setLoggedIn] = useState(LoggedIn);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const storedUsername = localStorage.getItem("username");
    const storedUserRole = localStorage.getItem("userRole")?.split(",");
    const storedUserId = localStorage.getItem("userId");

    if (jwtToken && storedUsername) {
      setLoggedIn(true);
      setUsername(storedUsername);
      setUserRole(storedUserRole);
      setUserId(storedUserId);
    }

  }, [LoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setUsername("");
    setUserRole([]);
    setUserId("");
    onLogout(); // To inform the parent component about logout
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-nav-scroll">
      <div className="container">
        <Link className="navbar-brand" to="/admin">
          Property Management System
        </Link>

        <div className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <>
              {userRole.includes("SPACE_OWNER") && (
                <Link className="nav-link" to="/admin">
                  Owner Dashboard
                </Link>
              )}
              {(userRole.includes("MARKETING_STAFF") ||
                userRole.includes("SPACE_OWNER")) && (
                <Link className="nav-link" to="/marketing-staff-dashboard">
                  Staff Dashboard
                </Link>
              )}
              {(userRole.includes("CUSTOMER") ||
                userRole.includes("SPACE_OWNER") ||
                userRole.includes("MARKETING_STAFF")) && (
                <Link className="nav-link" to="/customer-dashboard">
                  Customer Dashboard
                </Link>
              )}
              <Link className="nav-link" to={`/orders/user/${userId}`}>
                My Orders
              </Link>
              <Link className="nav-link" to={`/cart2/user/${userId}`}>
                <Cart4 style={{ height: "30px", width: "30px" }} />
              </Link>
              <span className="nav-link text-info">Welcome, {username}</span>
              <button
                className="btn btn-warning nav-link"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/customer-registration">
                Register
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
