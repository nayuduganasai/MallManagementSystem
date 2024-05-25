import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DefaultRoute = () => {
  
    const[userRole,setUserRole] = useState([]);

    useEffect(()=>{
      setUserRole(localStorage.getItem("userRole").split(","))
    },[])
  
  return (
    <div className='text-center justify-center'>
      <h1>No Page Found!, Use Correct URL...</h1>
           
            {
        userRole[0] === "CUSTOMER" ? <Link to="/customer-dashboard" className="bg-black p-3 rounded-3">Go Home</Link>:
                                    userRole[0] === "MARKETING_STAFF"? <Link to="/marketing-staff-dashboard"  className="bg-black  p-3 rounded-3 ">Go Home</Link>:
                                    <Link to="/admin"  className="bg-black  p-3 rounded-3 ">Go Home</Link>
      }
    </div>
  )
}

export default DefaultRoute
