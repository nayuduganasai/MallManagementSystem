// Unauthorized.js
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Unauthorized = () => {

  const[userRole,setUserRole] = useState([]);

  useEffect(()=>{
    setUserRole(localStorage.getItem("userRole").split(","))
  },[])

  return (
    <div className="p-5 ">
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to access this page.</p>
      {
        userRole[0] === "CUSTOMER" ? <Link to="/customer-dashboard" className="bg-black p-3 rounded-3">Go Home</Link>:
                                    userRole[0] === "MARKETING_STAFF"? <Link to="/marketing-staff-dashboard"  className="bg-black  p-3 rounded-3 ">Go Home</Link>:
                                    <Link to="/admin"  className="bg-black  p-3 rounded-3 ">Go Home</Link>
      }

    </div>
  );
};

export default Unauthorized;
