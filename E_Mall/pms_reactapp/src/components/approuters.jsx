// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect } from "react";
import ShowAllCustomer from "./user_dashboard/components/ShowAllCustomers";
import ShowAllMarketingStaff from "./user_dashboard/components/ShowAllMarketingStaff";
import ShowAllBookings from "./user_dashboard/components/ShowAllBookings";
import ShowAllBookingsByReferal from "./user_dashboard/components/ShowAllBookingsByReferal";
import UpdateCustomerDetails from "./user_dashboard/components/UpdateCustomerDetails";
import UpdateCustomerProfile from "./user_dashboard/components/UpdateCustomerProfile";
import UpdateStaffProfile from "./user_dashboard/components/UpdateStaffProfile";
import UpdateOwnerProfile from "./user_dashboard/components/UpdateOwnerProfile";
import UpdateMarketingStaff from "./user_dashboard/components/UpdateMarketingStaff";
import ViewCustomerProfile from "./user_dashboard/components/ViewCustomerProfile";
import ViewStaffProfile from "./user_dashboard/components/ViewStaffProfile";
import ViewOwnerProfile from "./user_dashboard/components/ViewOwnerProfile";
import CustomerRegistration from "./user_dashboard/components/CustomerRegistration";
import CustomerDashboard from "./user_dashboard/components/CustomerDashboard";
import MarketingStaffRegistration from "./user_dashboard/components/MarketingStaffRegistration";
import SpaceOwnerDashboard from "./user_dashboard/components/SpaceOwnerDashboard";
import Unauthorized from "./user_dashboard/components/Unauthorized";
import Footer from "./user_dashboard/components/Footer";
import  Navbar from "./user_dashboard/components/Navbar";
import Login from "./user_dashboard/components/Login.js";
import Home from "./user_dashboard/components/Home";
import MarketingStaffDashboard from "./user_dashboard/components/MarketingStaffDashboard";
import CategoryList from "./categoryList";
import TermList from "./termList";
import RentTypeList from "./rentTypeList";
import DiscountPage from "./discountpage";
import FeedbackList from "./feedbacklist";
import ComplaintList from "./complaintlist";
import SpacesList from "./spacelist";
import Sidebar from "./user_dashboard/components/Sidebar";
import ZonePage from "./ZonePage";
// import Cart from './CartFromDB';
import Orders from './Orders';
import CartPage from './CartPage';

import Requests from "./requests";
import DefaultRoute from "./util/defaultroute";
import { AdminProtectedRoute, CustomerProtectedRoute, MarketingStaffProtectedRoute } from "./util/protectedRoute";



function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState([]);
  const[logout,setLogout] = React.useState(false);
  const[refresh,setRefresh] = useState(false);
//   const [spaces, setSpaces] = useState([]);
  
  useEffect(()=>{
    setUserRole(localStorage.getItem("userRole")?.split(","))
    setIsAuthenticated(localStorage.getItem("loggedIn")? true:false)

  }
  ,[logout,refresh])

  return (
        <div className="flex-fill row ">
           <Navbar onLogout={()=>{setLogout(true);setIsAuthenticated(!isAuthenticated);}} LoggedIn={isAuthenticated}/>
        
        <div className="container-fluid align-items-center ">
        <div className="row ">
              {
                isAuthenticated && <div className="col-2 col-lg-2">
                                      <Sidebar userRole={userRole[0]} />
                                  </div>
              }
              
              
        <div className={isAuthenticated?"col-10 col-lg-10 mt-5 overflow-scroll":"col-12 col-lg-12 p-2 "}>
        <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setUserRole={()=>{
                                                                    console.log("hiting--------");
                                                                        setUserRole(localStorage.getItem("userRole").split(","))
                                                                        setIsAuthenticated(true)}}
                                              />} />

                <Route
                  path="/customer-registration"
                  element={<CustomerRegistration />}
                />
        <Route element={<AdminProtectedRoute userRoles={userRole} isAuthenticated={isAuthenticated}/>}>
                        <Route
                            path="/space-owner-dashboard"
                            Component={SpaceOwnerDashboard}
                        />
                          <Route
                                path="/admin"
                                element={<SpaceOwnerDashboard hitRefresh={()=>setRefresh(!refresh)}/>}
                                   
                            />
                                            
                            <Route
                                path="/marketing-staff-registration"
                                Component={MarketingStaffRegistration}
                            
                            />
                              <Route
                                    path="/update-marketing-staff/:userId"
                                    Component={UpdateMarketingStaff }
                                
                                />
                             <Route
                                    path="/view-owner"
                                    Component={ViewOwnerProfile }
                                />
                               
                                <Route
                                    path="/edit-owner"
                                    Component={UpdateOwnerProfile }
                                    
                                />

                                <Route
                                    path="/show-staff"
                                    Component={ShowAllMarketingStaff }
                                
                                />

                                <Route
                                    path="/staff-registration"
                                    Component={MarketingStaffRegistration}
                                    
                                />
                                 <Route
                                        path="/update-customer/:userId"
                                        Component={UpdateCustomerDetails}
                                    
                                    />
                                    <Route
                                        path="/bookings_referal"
                                        Component={ShowAllBookingsByReferal}
                                        
                                    />
                                    <Route
                                        path="/staffprofile"
                                        Component={ViewStaffProfile}
                                        
                                    />
                                    <Route
                                        path="/show-customer"
                                        Component={ShowAllCustomer}
                                        
                                    />
                                    <Route
                                        path="/show-all-bookings"
                                        Component={ShowAllBookings}
                                        
                                    />
                                     <Route
                                        path="/show-all-requests"
                                        Component={Requests}
                                        
                                    />
                                    <Route
                                        path="/categoryList"
                                        Component={CategoryList}
                                        
                                    />
                                    <Route
                                        path="/termList"
                                        Component={TermList}
                                        
                                    />
                                    <Route
                                        path="/renttypeList"
                                        Component={RentTypeList}
                                        
                                    />
                                    <Route
                                        path="/discountList"
                                        Component={DiscountPage}
                                        
                                    />
                                    <Route
                                        path="/feedbacks"
                                        Component={FeedbackList}
                                        
                                    />
                                    <Route
                                        path="/complaints"
                                        Component={ComplaintList}
                                    
                                    />
                                    <Route
                                        path="/spacelist"
                                        Component={SpacesList}
                                        
                                    />
        </Route>    

        <Route  element={<CustomerProtectedRoute userRoles={userRole} isAuthenticated={isAuthenticated}/>}>
                        <Route
                            path="/customer-dashboard"
                            Component={CustomerDashboard}
                        />
                        <Route
                            path="/profile"
                            Component={ViewCustomerProfile}
                        />
                          <Route
                                path="/edit-profile"
                                Component={UpdateCustomerProfile}
                            
                            />
                           <Route
                                path="/zone/:zoneName"
                                element={<ZonePage />}      //zoneData={zoneData}
                            />
        </Route>
        <Route  element={<MarketingStaffProtectedRoute userRoles={userRole} isAuthenticated={isAuthenticated}/>} >

                        <Route path="/marketing-staff-dashboard"
                            Component={MarketingStaffDashboard}          
                        />
                        <Route
                            path="/update-customer/:userId"
                            Component={UpdateCustomerDetails}
                        
                        />
                        <Route
                            path="/bookings_referal"
                            Component={ShowAllBookingsByReferal}
                            
                        />
                        <Route
                            path="/staffprofile"
                            Component={ViewStaffProfile}
                            
                        />
                        <Route
                            path="/show-customer"
                            Component={ShowAllCustomer}
                            
                        />
                        <Route
                            path="/show-all-bookings"
                            Component={ShowAllBookings}
                            
                        />
                          <Route
                                path="/edit-staff-profile"
                                Component={UpdateStaffProfile}
                                
                            />
        </Route>
        {isAuthenticated && 
                <>
                <Route path="/space/:shopNumber" Component={ZonePage}/>
                {/* <Route path="/cart/user/:userId" Component={Cart} /> */}
                <Route path="/orders/user/:userId" element={<Orders/>} />
                <Route path="/cart2/user/:userId" element={<CartPage/>} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<DefaultRoute/>} />
                </>
        }                    
              </Routes>
              </div>
          </div>
          <div className="row">
                <Footer />
          </div>
          
        </div>
  </div>
  
  );
}

export default AppRoutes;

