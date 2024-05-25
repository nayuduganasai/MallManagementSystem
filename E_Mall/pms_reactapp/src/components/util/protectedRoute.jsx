import { Outlet, Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({  userRoles,isAuthenticated }) => {
  // console.log("---------------ecvdsfv",isAuthenticated,userRoles);
  let allowedRoles = ["SPACE_OWNER"]
  
  const isAuthorized = userRoles.some(role => allowedRoles.includes(role))  && isAuthenticated;

  return isAuthorized? <Outlet /> : <Navigate to="/unauthorized" />;
};

const CustomerProtectedRoute = ({  userRoles,isAuthenticated }) => {
  let allowedRoles = ["CUSTOMER","SPACE_OWNER","MARKETING_STAFF"]
  const isAuthorized =  userRoles.some(role => allowedRoles.includes(role)) && isAuthenticated;

 
  return isAuthorized? <Outlet /> : <Navigate to="/unauthorized" />;
};

const MarketingStaffProtectedRoute = ({  userRoles,isAuthenticated }) => {
  let allowedRoles = ["MARKETING_STAFF","SPACE_OWNER"]
  const isAuthorized =  userRoles.some(role => allowedRoles.includes(role)) && isAuthenticated;

  return isAuthorized? <Outlet /> : <Navigate to="/unauthorized" />;
};



export {AdminProtectedRoute,CustomerProtectedRoute,MarketingStaffProtectedRoute};
