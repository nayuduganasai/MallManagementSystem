import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Reports from '../../reports';
const MarketingStaffDashboard = () => {
  //const [userRole,setUserRole]=useState("");
  const [userRole, setUserRole] = useState("");
  const userRole1=localStorage.getItem("userRole")
  console.log("myroleyyyy"+userRole1);

  console.log("Initial userRole:", userRole); 
  useEffect(()=>{ 
    //const userRole1=localStorage.getItem("userRole")
  setUserRole(userRole1);
  console.log("myrole"+userRole1);
  console.log("myrolesss"+userRole);

  


  },[])
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    
      {/* Main Content (80%) */}
      <div style={{ flex: '1', padding: '20px' }}>
        <h2>Staff Dashboard</h2>
        <Reports/>
      </div>
    </div>
  );
};

export default MarketingStaffDashboard;
