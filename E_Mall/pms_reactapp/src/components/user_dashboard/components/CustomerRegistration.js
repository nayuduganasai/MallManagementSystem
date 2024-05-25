// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CustomerRegistration = () => {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [address, setAddress] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [userEmail, setuserEmail] = useState("");
//   const navigate = useNavigate();

//   const validateMobileNo = (number) => {
//     return /^[6-9]\d{9}$/.test(number);
//   };

//   const validatePassword = (pass) => {
//     return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pass);
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     try {
//       if (!firstName || !lastName || !address || !validatePassword(password) || !validateMobileNo(mobileNo) || !userEmail) {
//         alert("Please fill in all required fields correctly.");
//         return;
//       }

//       if (!validatePassword(password)) {
//         console.error('Invalid password. Password must be at least 8 characters and contain a combination of letters, numbers, and special symbols.');
//         return;
//       }

//       if (!validateMobileNo(mobileNo)) {
//         console.error('Invalid phone number. Please enter a maximum of 10 digits.');
//         return;
//       }

//       const registrationData = {
//         userName,
//         password,
//         firstName,
//         lastName,
//         address,
//         mobileNo,
//         userEmail,
//       };

//       const response = await axios.post(
//         'http://localhost:8080/customer/register',
//         registrationData
//       );

//       console.log("Customer registered successfully:", response.data);
//       alert("Registration Successful");
//       navigate('/login');
//     } catch (error) {
//       console.log(error)
//       console.error("Error during user registration:", error.message);
//     }
//   };

//   return (
//     <div className="container w-100 h-100 p-5 align-items-center  ">
//       <h2>Sign Up</h2>
//       {/* Customer registration form JSX */}
//       <form onSubmit={handleSignUp}>
//         <div className="mb-2 ">
//           <label htmlFor="userName" className="form-label">
//             Username
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="userName"
//             placeholder="Enter username"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//         </div>

//         <div className="mb-2">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <small className="text-danger">
//             {password && !validatePassword(password) &&
//               'Invalid password. Password must be at least 8 characters and contain a combination of letters, numbers, and special symbols.'}
//           </small>
//         </div>

//         <div className="mb-2">
//           <label htmlFor="firstName" className="form-label">
//             First Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="firstName"
//             placeholder="Enter first name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </div>

//         <div className="mb-2">
//           <label htmlFor="lastName" className="form-label">
//             Last Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="lastName"
//             placeholder="Enter last name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>

//         <div className="mb-2">
//           <label htmlFor="address" className="form-label">
//             Address
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="address"
//             placeholder="Enter address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>

//         <div className="mb-2">
//           <label htmlFor="mobileNo" className="form-label">
//             Mobile Number
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="mobileNo"
//             placeholder="Enter mobile number"
//             value={mobileNo}
//             onChange={(e) => setMobileNo(e.target.value)}
//           />
//           <small className="text-danger">
//             {mobileNo &&
//               !validateMobileNo(mobileNo) &&
//               'Invalid mobile number. Please enter a maximum of 10 digits.'}
//           </small>
//         </div>

//         <div className="mb-2">
//           <label htmlFor="address" className="form-label">
//             Email
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="userEmail"
//             placeholder="Enter email id"
//             value={userEmail}
//             onChange={(e) => setuserEmail(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="btn btn-primary"
//           onClick={handleSignUp}
//         >
//           Sign Up 
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CustomerRegistration;

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerRegistration = () => {
  const navigate = useNavigate();

  const initialValues = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    mobileNo: '',
    userEmail: '',
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must contain a combination of letters, numbers, and special symbols'
      ),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    mobileNo: Yup.string()
      .required('Mobile Number is required')
      .matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
    userEmail: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post('http://localhost:8080/emall/users/customer/register', values);
      console.log('Customer registered successfully:', response.data);
      alert('Registration Successful');
      resetForm();
      navigate('/login');
    } catch (error) {
      console.error('Error during user registration:', error.message);
    }
  };

  return (
    <div className="container p-5">
      <h2 className="text-center mb-4">Sign Up</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form className='m-5 '>
            <div className="mb-3 row">
              <label htmlFor="userName" className="col-sm-2 col-form-label">
                Username
              </label>
              <div className="col-sm-10">
                <Field type="text" className="form-control" id="userName" name="userName" />
                <ErrorMessage name="userName" component="div" className="text-danger" />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10">
                <Field type="password" className="form-control" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="firstName" className="col-sm-2 col-form-label">
                First Name
              </label>
              <div className="col-sm-10">
                <Field type="text" className="form-control" id="firstName" name="firstName" />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="lastName" className="col-sm-2 col-form-label">
                Last Name
              </label>
              <div className="col-sm-10">
                <Field type="text" className="form-control" id="lastName" name="lastName" />
                <ErrorMessage name="lastName" component="div" className="text-danger" />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="address" className="col-sm-2 col-form-label">
                Address
              </label>
              <div className="col-sm-10">
                <Field type="text" className="form-control" id="address" name="address" />
                <ErrorMessage name="address" component="div" className="text-danger" />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="mobileNo" className="col-sm-2 col-form-label">
                Mobile Number
              </label>
              <div className="col-sm-10">
                <Field type="text" className="form-control" id="mobileNo" name="mobileNo" />
                <ErrorMessage name="mobileNo" component="div" className="text-danger" />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="userEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <Field type="email" className="form-control" id="userEmail" name="userEmail" />
                <ErrorMessage name="userEmail" component="div" className="text-danger" />
              </div>
            </div>

            <div className="mb-3 row">
              <div className="col-sm-10 offset-sm-2">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomerRegistration;
