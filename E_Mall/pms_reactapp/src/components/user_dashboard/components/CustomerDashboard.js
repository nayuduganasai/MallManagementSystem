import React from "react";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useState } from "react";
import Mall from "../../Mall";
import NewMallLayout from "../../newlayout";

const CustomerDashboard = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const userRole1 = localStorage.getItem("userRole");
    setUserRole(userRole1);
    console.log(userRole, userRole1);
  });
  return (
    <div style={{ display: "flex", height: "100vh" }}>
       {/* Main Content (80%) */}
      <div style={{ flex: "1", padding: "20px" }}>
        <h2>Customer Dashboard</h2>
        {/* Add your customer dashboard components here */}
        <Mall/>
        {/* <NewMallLayout floor={2}/> */}
      </div>
    </div>
  );
};

export default CustomerDashboard;
