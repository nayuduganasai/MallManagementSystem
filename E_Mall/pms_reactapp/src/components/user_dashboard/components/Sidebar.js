import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card,Button } from "react-bootstrap";
import { BsSpeedometer2, BsPeople, BsGrid, BsCalendar,BsTable,BsCalendarWeekFill,BsStopwatchFill,BsTagFill,BsMailbox2,BsChatLeftDotsFill,BsPeopleFill,BsBoxArrowLeft, } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

// const Sidebar = ({ userRole }) => {
//   const menuConfig = {
//     SPACE_OWNER: [
//       { label: "Dashboard", link: "/", icon: <BsSpeedometer2 /> },
//       {
//         label: "Staff Management",
//         subMenu: [
//           {
//             label: "Register Staff",
//             link: "/staff-registration",
//             icon: <BsPeople />,
//           },
//           { label: "Show all Staff", link: "/show-staff", icon: <BsPeople /> },
//         ],
//         icon: <BsPeople />,
//       },
//       {
//         label: "Customer Management",
//         subMenu: [
//           {
//             label: "Show All Customers",
//             link: "/show-customer",
//             icon: <BsPeople />,
//           },
//         ],
//         icon: <BsPeople />,
//       },

//       {
//         label: "Profile",
//         subMenu: [
//           { label: "View-Profile", link: "/view-owner", icon: <BsGrid /> },
//           { label: "Edit-Profile", link: "/edit-owner", icon: <BsGrid /> },
//         ],
//         icon: <BsGrid />,
//       },
//     ],
//     MARKETING_STAFF: [
//       {
//         label: "Dashboard",
//         link: "/marketing-staff-dashboard",
//         icon: <BsSpeedometer2 />,
//       },
//       {
//         label: "Customer Management",
//         subMenu: [
//           {
//             label: "Show All Customers",
//             link: "/show-customer",
//             icon: <BsPeople />,
//           },
//         ],
//         icon: <BsPeople />,
//       },
//       {
//         label: "Bookings",
//         subMenu: [
//           {
//             label: "Show All Bookings",
//             link: "/bookings_referal",
//             icon: <BsCalendar />,
//           },
//         ],
//         icon: <BsCalendar />,
//       },
//       {
//         label: "Profile",
//         subMenu: [
//           { label: "View-Profile", link: "/staffprofile", icon: <BsGrid /> },
//           {
//             label: "Edit-Profile",
//             link: "/edit-staff-profile",
//             icon: <BsGrid />,
//           },
//         ],
//         icon: <BsGrid />,
//       },
//     ],
//     CUSTOMER: [
//       { label: "Dashboard", link: "/dashboard", icon: <BsSpeedometer2 /> },
//       // Add customer-specific menu items here
//       {
//         label: "Bookings",
//         subMenu: [
//           {
//             label: "Show All Bookings",
//             link: "/show-all-bookings",
//             icon: <BsPeople />,
//           },
//         ],
//         icon: <BsPeople />,
//       },
//       {
//         label: "Profile",
//         subMenu: [
//           {
//             label: "Update Profile",
//             link: "/edit-profile",
//             icon: <BsPeople />,
//           },
//           { label: "View Profile", link: "/profile", icon: <BsPeople /> },
//         ],
//         icon: <BsPeople />,
//       },
//     ],
//   };

//   const getMenuItems = () => menuConfig[userRole] || [];

//   // State to track the opened sub-menu
//   const [openSubMenu, setOpenSubMenu] = useState(null);

//   const handleSubMenuClick = (index) => {
//     setOpenSubMenu(openSubMenu === index ? null : index);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", width: "200px" }}>
     
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {getMenuItems().map((menuItem, index) => (
//           <li key={index}>
//             {menuItem.link ? (
//               <Link to={menuItem.link}>
//                 {menuItem.icon} {menuItem.label}
//               </Link>
//             ) : (
//               <>
//                 <span
//                   style={{ cursor: "pointer" }}
//                   onClick={() => handleSubMenuClick(index)}
//                 >
//                   {menuItem.icon} {menuItem.label}
//                 </span>
//                 {/* Only display the sub-menu if it's the opened one */}
//                 {openSubMenu === index && (
//                   <ul>
//                     {menuItem.subMenu.map((subMenuItem, subIndex) => (
//                       <li key={subIndex}>
//                         <Link to={subMenuItem.link}>
//                           {subMenuItem.icon} {subMenuItem.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
const Sidebar = ({ userRole }) => {

  const menuConfig = {
    SPACE_OWNER: [
      { label: "Dashboard", link: "/admin",
       icon: <BsSpeedometer2 /> },
      {
        label: "Staff Management",
        subMenu: [
          {
            label: "Register Staff",
            link: "/staff-registration",
            icon: <BsPeople />,
          },
          { label: "Show all Staff", link: "/show-staff", icon: <BsPeople /> },
        ],
        icon: <BsPeople />,
      },
      {
        label: "Customer Management",
        subMenu: [
          {
            label: "Show All Customers",
            link: "/show-customer",
            icon: <BsPeople />,
          },
        ],
        icon: <BsPeople />,
      },

      {
        label: "Profile",
        subMenu: [
          { label: "View-Profile", link: "/view-owner", icon: <BsGrid /> },
          { label: "Edit-Profile", link: "/edit-owner", icon: <BsGrid /> },
        ],
        icon: <BsGrid />,
      },
      {
        label: 'All Bookings',
        link: '/show-all-bookings',
        icon: <BsTable/>, // Replace YourIconComponentHere with the appropriate icon
      },
      {
        label: 'All Requests',
        link: '/show-all-requests',
        icon: <BsTable/>, // Replace YourIconComponentHere with the appropriate icon
      },
      {
        label: 'Spaces',
        link: '/spacelist',
        icon: <BsTable/>, // Replace YourIconComponentHere with the appropriate icon
      },
      {
        label: 'Categories',
        link: '/categoryList',
        icon: <BsTable/>,
      },
      {
        label: 'Terms',
        link: '/termList',
        icon: <BsCalendarWeekFill/>,
      },
      {
        label: 'Rent Types',
        link: '/renttypeList',
        icon: <BsStopwatchFill />,
      },
      {
        label: 'Discounts',
        link: '/discountList',
        icon: <BsTagFill />,
      },
      {
        label: 'Complaints',
        link: '/complaints',
        icon: <BsMailbox2/>,
      },
      {
        label: 'Feedbacks',
        link: '/feedbacks',
        icon: <BsChatLeftDotsFill />,
      },
      {
        label: "My Referals",
        subMenu: [
          {
            label: "Show All Bookings",
            link: "/bookings_referal",
            icon: <BsCalendar />,
          },
        ],
        icon: <BsCalendar />,
      },
     
    ],
    MARKETING_STAFF: [
      {
        label: "Dashboard",
        link: "/marketing-staff-dashboard",
        icon: <BsSpeedometer2 />,
      },
      {
        label: "Customer Management",
        subMenu: [
          {
            label: "Show All Customers",
            link: "/show-customer",
            icon: <BsPeople />,
          },
        ],
        icon: <BsPeople />,
      },
      {
        label: "My Referals",
        subMenu: [
          {
            label: "Show All Bookings",
            link: "/bookings_referal",
            icon: <BsCalendar />,
          },
        ],
        icon: <BsCalendar />,
      },
      {
        label: "Profile",
        subMenu: [
          { label: "View-Profile", link: "/staffprofile", icon: <BsGrid /> },
          {
            label: "Edit-Profile",
            link: "/edit-staff-profile",
            icon: <BsGrid />,
          },
        ],
        icon: <BsGrid />,
      },
    ],
    CUSTOMER: [
      { label: "Dashboard", link: "/customer-dashboard", icon: <BsSpeedometer2 /> },
      // Add customer-specific menu items here
      {
        label: "Bookings",
        subMenu: [
          {
            label: "Show All Bookings",
            link: `/orders/user/${localStorage.getItem("userId")}`,
            icon: <BsPeople />,
          },
        ],
        icon: <BsPeople />,
      },
      {
        label: "Profile",
        subMenu: [
          {
            label: "Update Profile",
            link: "/edit-profile",
            icon: <BsPeople />,
          },
          { label: "View Profile", link: "/profile", icon: <BsPeople /> },
        ],
        icon: <BsPeople />,
      },
      {
        label: "My Referals",
        subMenu: [
          {
            label: "Show All Bookings",
            link: "/bookings_referal",
            icon: <BsCalendar />,
          },
        ],
        icon: <BsCalendar />,
      },
    ],
  };


  const getMenuItems = () => menuConfig[userRole] || [];

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuClick = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    // style={{ display: "flex", flexDirection: "column", width: "",overflowY:"scroll" }
    <div className="flex-column w-100 overflow-auto  ">
      <div className='m-2 d-flex align-items-center'>
        <Link className='text-black' to='/admin'>
          <i className='bi bi-buildings-fill me-3 fs-4 text-black'></i>
          <span className='brand-name fs-2 text-black' style={{ fontWeight: 'bold' }}>PMS</span>
        </Link>
      </div>
      <div className='list-group list-group-flush'>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {getMenuItems().map((menuItem, index) => (
            <li key={index}>
              {menuItem.link ? (
                <Link to={menuItem.link} className='list-group-item py-2'>
                  {menuItem.icon} {menuItem.label}
                </Link>
              ) : (
                <>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSubMenuClick(index)}
                    className='list-group-item py-2'
                  >
                    {menuItem.icon} {menuItem.label}
                  </span>
                  {openSubMenu === index && (
                    <ul>
                      {menuItem.subMenu.map((subMenuItem, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subMenuItem.link} className='list-group-item py-2'>
                            {subMenuItem.icon} {subMenuItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
