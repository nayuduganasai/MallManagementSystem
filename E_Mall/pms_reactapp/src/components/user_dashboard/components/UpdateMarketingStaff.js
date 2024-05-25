// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "./Sidebar";

// const UpdateMarketingStaff = () => {
//   const { userId } = useParams(); // Get userId from the URL
//   const navigate = useNavigate();
//   const [userRole, setUserRole] = useState("");

//   const [updateDetails, setUpdateDetails] = useState({
//     firstName: "",
//     lastName: "",
//     userEmail: "",
//     address: "",
//     mobileNo: "",
//     salary: "",
//   });
//   const [showAlert, setShowAlert] = useState(false);
//   const accessToken = localStorage.getItem("jwtToken");

//   useEffect(() => {
//     // Ensure to update the key from "userRole" to "role" if it's stored as "role" in localStorage
//     const userRole = localStorage.getItem("userRole");
//     setUserRole(userRole);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = () => {
//     axios
//       .put(
//         `http://localhost:8080/api/marketing-staff/${userId}`,
//         updateDetails,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         setShowAlert(true);
//         // Set showAlert to false after 3 seconds (adjust the duration as needed)
//         setTimeout(() => setShowAlert(false), 3000);
//         // Handle the success as needed
//       })
//       .catch((error) => {
//         console.error("Error updating marketing staff:", error);
//       });
//   };

//   const onCancel = () => {
//     setUpdateDetails({
//       firstName: "",
//       lastName: "",
//       userEmail: "",
//       address: "",
//       mobileNo: "",
//       salary: "",
//     });
//     navigate("/show-staff"); // Redirect to the page displaying all marketing staff
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Sidebar (20%) */}
//       <div style={{ flex: "0 0 20%", backgroundColor: "#f0f0f0"  }}>
//         {/* Assuming you have a Sidebar component that receives userRole as a prop */}
//         {/* Replace 'Sidebar' with the actual import statement and component name */}
//         <Sidebar userRole={userRole} />
//       </div>

//       <div style={{ flex: "1", padding: "5px" }}>
//         <div className="container">
//           <h2>
//             <b>Update Marketing Staff</b>
//           </h2>
//           {/* Marketing Staff update form JSX */}
//           <form style={{ maxWidth: "500px", margin: "auto" }}>
//             <div className="mb-1">
//               <label className="form-label">First Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="firstName"
//                 value={updateDetails.firstName}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Last Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="lastName"
//                 value={updateDetails.lastName}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Email:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="userEmail"
//                 value={updateDetails.userEmail}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Address:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="address"
//                 value={updateDetails.address}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Mobile No:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="mobileNo"
//                 value={updateDetails.mobileNo}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Salary:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="salary"
//                 value={updateDetails.salary}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <button className="btn btn-primary" onClick={handleUpdate}>
//               Update
//             </button>
//             <button className="btn btn-secondary ms-2" onClick={onCancel}>
//               Cancel
//             </button>
//             {showAlert && (
//               <div className="alert alert-success mt-3" role="alert">
//                 Update successful!
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateMarketingStaff;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const UpdateMarketingStaff = () => {
  const { userId } = useParams(); // Get userId from the URL
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [existingData, setExistingData] = useState(null); // New state for storing existing data

  const [updateDetails, setUpdateDetails] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    address: "",
    mobileNo: "",
    salary: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const accessToken = localStorage.getItem("jwtToken");
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setUserRole(userRole);
  
    axios
      .get(`http://localhost:8080/emall/users/profile/staff/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setExistingData(response.data);
        setUpdateDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching MarketingStaff Data:", error);
        // Handle the error, set an error state, or redirect to an error page
        // For now, let's set an error state
        setExistingData(null);
      });
  }, [userId, accessToken]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8080/emall/users/profile/staff/${userId}`, updateDetails, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setShowAlert(true);
        // Set showAlert to false after 3 seconds (adjust the duration as needed)
        setTimeout(() => setShowAlert(false), 3000);
        // Handle the success as needed
      })
      .catch((error) => {
        console.error("Error updating Customer Data:", error);
      });
  };

  const onCancel = () => {
    navigate("/show-staff"); // Redirect to the page displaying all customers
  };

  if (!existingData) {
    // Display loading or handle the absence of data
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <div style={{ flex: "1", padding: "5px" }}>
        <div className="container">
          <h2>
            <b>Update Customer</b>
          </h2>
          {/* Customer update form JSX */}
          <form style={{ maxWidth: "500px", margin: "auto" }}>
            <div className="mb-1">
              <label className="form-label">First Name:</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={updateDetails.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name:</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={updateDetails.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="text"
                className="form-control"
                name="userEmail"
                value={updateDetails.userEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address:</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={updateDetails.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile No:</label>
              <input
                type="text"
                className="form-control"
                name="mobileNo"
                value={updateDetails.mobileNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Salary:</label>
              <input
                type="text"
                className="form-control"
                name="salary"
                value={updateDetails.salary}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            {showAlert && (
              <div className="alert alert-success mt-3" role="alert">
                Update successful!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMarketingStaff;
