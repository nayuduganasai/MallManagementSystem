
// import React from 'react';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import './style.css';
// import Nav from './nav';
// import { Link } from 'react-router-dom';
// import { Dropdown, DropdownButton, OverlayTrigger, Tooltip } from 'react-bootstrap';

// import { Route,Routes } from 'react-router-dom';
// import Reports from './reports';
// import TermList from './termList';
// import RentTypeList from './rentTypeList'
// import CategoryList from './categoryList';
// import User from './user';
// import DiscountPage from './discountpage';

// function SideBar() {
//   return (
//     <div className='container-fluid bg-secondary min-vh-90'>
//       {/* <div><Nav/></div> */}
//       <div className='row'>
//         <div className='col-2 col-lg-2 bg-white vh-100'>
//           <div className='m-2 d-flex align-items-center'>
//             <i className='bi bi-buildings-fill me-3 fs-4'></i>
//             <span className='brand-name fs-4'>PMS</span>
//           </div>
//           <hr className='text-dark' />
//           <div className='list-group list-group-flush'>
//             <a className='list-group-item py-2'>
//               <i className='bi bi-speedometer2 fs-8 me-3'></i>
//               <span className='fs-8'>DashBoard</span>
//             </a>
//             <Link to='/discountList' className='list-group-item py-2'>
//               <i className='bi bi-house fs-8 me-3'></i>
//               <span className='fs-8'>Discounts</span>
//             </Link>
//               <Link to='/categoryList' className='list-group-item py-2'>
//                 <i className='bi bi-table fs-8 me-3'></i>
//                 <span className='fs-8'>Categories</span>
//               </Link>
//                 {/* <OverlayTrigger
//               trigger={['hover', 'focus']}
//               placement='right'
//               overlay={<Tooltip id='categories-tooltip'>Categories</Tooltip>}
//             >
//               <Dropdown>
//                 <Dropdown.Toggle as={Link} to='/categoryList' className='list-group-item py-2' variant='link' id='dropdown-basic'>
//                   <i className='bi bi-table fs-8 me-3'></i>
//                   <span className='fs-8'>Categories</span>
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
                  
//                   <Dropdown.Item href='#/category1'>Category 1</Dropdown.Item>
//                   <Dropdown.Item href='#/category2'>Category 2</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </OverlayTrigger> */}
            
//             <Link to='/' className='list-group-item py-2'>
//               <i className='bi bi-clipboard-data fs-8 me-3'></i>
//               <span className='fs-8'>Reports</span>
//             </Link>
//             <Link to='/user' className='list-group-item py-2'>
//               <i className='bi bi-people fs-8 me-3'></i>
//               <span className='fs-8'>Users</span>
//             </Link>
//             <Link className='list-group-item py-2'>
//               <i className='bi bi-power fs-8 me-3'></i>
//               <span className='fs-8'>LogOut</span>
//             </Link>
//           </div>
//         </div>
//         <div>
//         <Routes>
//             <Route path='/' element={<Reports/>}/>
//             {/* <Route path='/addCategory' element={<AddCategory/>}/> */}
//             <Route path='/categoryList' element={<CategoryList/>}/>
//             <Route path='/termList' element={<TermList/>}/>
//             <Route path='/renttypeList' element={<RentTypeList/>}/>
//             <Route path='/user' element={<User/>}/>
//             <Route path='/discountList' element={<DiscountPage/>}/>
//             {/* <Route path='/updatecategory/:categoryId' element={<UpdateCategory/>}/> */}

          
//           </Routes>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default SideBar;


import React, { useState, useEffect } from 'react';
import './style.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Card, Button, CardSubtitle } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Table,Cube, Key, ClipboardData, People, TagFill, StopwatchFill, Stopwatch, Calendar, CalendarWeek } from 'react-bootstrap-icons'; 
import Reports from './reports';
import TermList from './termList';
import RentTypeList from './rentTypeList';
import CategoryList from './categoryList';
import User from './user';
import DiscountPage from './discountpage';
import axios from 'axios';
import FeedbackList from './feedbacklist';
import ComplaintList from './complaintlist';
import SpacesList from './spacelist';
import SpaceListUser from './spacelistuser';

function SideBar() {
  const [categoriesCount, setCategoriesCount] = useState([]);
  const [termsCount, setTermsCount] = useState([]);
  const [rentTypesCount, setRentTypesCount] = useState([]);
  const [discountCount,setDiscountCount]=useState([])

  useEffect(() => {
    // Fetch categories, terms, and rent types from the API
    async function fetchData() {
      try {
        const categoriesResponse = await axios.get('http://localhost:8080/emall/categories');
        setCategoriesCount(categoriesResponse.data.length);

        const termsResponse = await axios.get('http://localhost:8080/emall/terms');
        setTermsCount(termsResponse.data.length);

        const rentTypesResponse = await axios.get('http://localhost:8080/emall/rentTypes');
        setRentTypesCount(rentTypesResponse.data.length);

        const discountResponse = await axios.get('http://localhost:8080/emall/discounts');
        setDiscountCount(discountResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className='container-fluid  '>
      <div className='row'>
        <div className='col-2 col-lg-2'>
          {/* Sidebar Content */}
          <div className='m-2 d-flex align-items-center'>
            <Link className= ' text-black'to='/'>
            <i className='bi bi-buildings-fill me-3 fs-4 text-black '></i>
            <span className='brand-name fs-2 text-black  ' style={{ fontWeight: 'bold' }}>PMS</span>
            </Link>
          
          </div>
          <div className='list-group list-group-flush bg-black'>
          <Link to='/spacelist' className='list-group-item py-2'>
                 <i className='bi bi-table fs-5 me-3'></i>
                 <span className='fs-5'>Spaces</span>
               </Link>
          <Link to='/categoryList' className='list-group-item py-2'>
                 <i className='bi bi-table fs-5 me-3'></i>
                 <span className='fs-5'>Categories</span>
               </Link>
               <Link to='/termList' className='list-group-item py-2'>
            <i className='bi bi-calendar-week-fill fs-5 me-3'></i>
            <span className='fs-5'>Terms</span>
          </Link>
          <Link to='/renttypeList' className='list-group-item py-2'>
            <i className='bi bi-stopwatch-fill fs-5 me-3'></i>
            <span className='fs-5'>Rent Types</span>
          </Link>
          <Link to='/discountList' className='list-group-item py-2'>
            <i className='bi bi-tag-fill fs-5 me-3'></i>
            <span className='fs-5'>Discounts</span>
          </Link>
          <Link to='/complaints' className='list-group-item py-2'>
            <i className='bi bi-mailbox2 fs-5 me-3'></i>
            <span className='fs-5'>Complaints</span>
          </Link>
          <Link to='/feedbacks' className='list-group-item py-2'>
            <i className='bi bi-chat-left-dots-fill fs-5 me-3'></i>
            <span className='fs-5'>FeedBack</span>
          </Link>
          <Link to='/spacelistuser' className='list-group-item py-2'>
            <i className='bi bi-people-fill fs-5 me-3'></i>
            <span className='fs-5'>Users</span>
          </Link>
          <Link  className='list-group-item py-2'>
            <i className='bi bi-box-arrow-left fs-5 me-3'></i>
            <span className='fs-5'>LogOut</span>
          </Link>
          </div>
        </div>
        <div className='col-10 col-lg-10  min-vh-100 rounded-2 bg-body-secondary '>
          <div className='p-0'>
            <h3>Dashboard</h3>
            <div className='row'>
              <div className='col-md-3'>
                <Card className='bg-warning-subtle '>
                  <Card.Body>
                    <Table size={40} color='royalblue' />
                    <Card.Title >Categories</Card.Title>
                    <Card.Text >{categoriesCount}</Card.Text>
                    <Link to='/categoryList'>
                      <Button variant='secondary'>View Categories</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-md-3'>
                <Card className='bg-warning-subtle '>
                  <Card.Body>
                    <CalendarWeek size={40} color='forestgreen' />
                    <Card.Title>Terms</Card.Title>
                    <Card.Text>{termsCount}</Card.Text>
                    <Link to='/termList'>
                      <Button variant='secondary'>View Terms</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-md-3'>
                <Card className='bg-warning-subtle '>
                  <Card.Body>
                    <Stopwatch size={40} color='darkorange' />
                    <Card.Title>Rent Types</Card.Title>
                    <Card.Text>{rentTypesCount}</Card.Text>
                    <Link to='/renttypeList'>
                      <Button variant='secondary'>View Rent Types</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
              <div className='col-md-3'>
                <Card className='bg-warning-subtle '>
                  <Card.Body>
                    <TagFill size={40} color='dark' />
                    <Card.Title>Discounts</Card.Title>
                    <Card.Text>{discountCount}</Card.Text>
                    <Link to='/discountList'>
                      <Button variant='secondary'>View Discounts</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
          <div>
            <Routes>
              <Route path='/' element={<Reports />} />
              <Route path='/categoryList' element={<CategoryList />} />
              <Route path='/termList' element={<TermList />} />
              <Route path='/renttypeList' element={<RentTypeList />} />
              <Route path='/discountList' element={<DiscountPage url={'http://localhost:8080/emall/discounts'} />} />
              <Route path='/feedbacks' element={<FeedbackList/>}/>
              <Route path='/complaints' element={<ComplaintList url={'http://localhost:8080/emall/complaints'}/>}/>
              <Route path='/spacelist' element={<SpacesList/>}/>
              <Route path='/spacelistuser' element={<SpaceListUser/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;


