// import React from 'react'
// import 'bootstrap/js/dist/dropdown'

// function Nav() {
//   return (
    
//       <nav className="navbar navbar-expand-sm navbar-white bg-white">
//           <i classname="navbar-brand bi-bi-justify-left"></i>
//           <button classname="navbar-toggler d-lg-none" 
//           type="button" 
//           data-bs-toggle="collapse" 
//           data-bs-target="#collapsibleNavId" 
//           aria-controls="collapsibleNavId"
//               aria-expanded="false" 
//               aria-label="Toggle navigation">
//               </button>

//           <div classname="collapse navbar-collapse" 
//           id="collapsibleNavId">
//               <ul classname="navbar-nav ms-auto mt-2 mt-lg-0">
//                   <li classname="nav-item dropdown">
//                       <button 
//                       classname="nav-link dropdown-toggle"  
//                       id="dropdownId" 
//                       data-bs-toggle="dropdown"
//                        aria-haspopup="true" 
//                        aria-expanded="false">
//                         Dropdown
//                         </button>
//                       <div classname="dropdown-menu" aria-labelledby="dropdownId">
//                           <button classname="dropdown-item" >Profile</button>
//                           <button classname="dropdown-item" >LogOut</button>
//                       </div>
//                   </li>
//               </ul>
//           </div>
//       </nav>
//   )
// }

// export default Nav

import React from 'react';
import 'bootstrap/js/dist/dropdown';

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-bg-white  bg-transparent  ">
      <i className="navbar-brand bi bi-justify-left mt-0 fs-4"></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>

      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle fs-4"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            style={{fontWeight:'bold'}}>
              Welcome Admin
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <button className="dropdown-item">Profile</button>
              <button className="dropdown-item">LogOut</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

   {/* <DropdownButton as='a' className='list-group-item py-2' title='Categories'>
              <Dropdown.Item href='/categoryList'>Category</Dropdown.Item>
              <Dropdown.Item href='#/term'>Term</Dropdown.Item>
              <Dropdown.Item href='#/renttype'>RentType</Dropdown.Item>
            </DropdownButton> */}
