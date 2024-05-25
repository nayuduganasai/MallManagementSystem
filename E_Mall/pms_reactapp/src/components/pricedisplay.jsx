
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Form, Container, Row, Col, Button, Image } from "react-bootstrap";
 
 
// function PriceCard({categoryId}) {
//   const [categories, setCategories] = useState({});
//   const [terms, setTerms] = useState([]);
//   const [renttypes, setRentTypes] = useState([]);
 
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/emall/categories/${categoryId}`)
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .then(
//         setTerms( categories.terms)
//       )
//       .catch((error) => {
//         console.error("Error in fetching category List", error.response.message);
//       });
//   }, []);
 
// //   const handleCategoryChange = (categoryId) => {
// //     const selectedCategory = categories.find((category) => category.categoryId === categoryId);
// //     if (selectedCategory) {
// //       setTerms(selectedCategory.terms);
// //     }
// //   };
 
//   const handleTermChange = (termId) => {
//     const selectedTerm = terms.find((term) => term.termId === termId);
//     if (selectedTerm) {
//       setRentTypes(selectedTerm.rentype);
//     }
//   };
 
//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       <div className="top-50 start-50 pe-3">
//         <div className="bg-light p-3 rounded">
//           <h1 className="text-black" style={{ fontSize: "1.5rem" }}>Select the below to book your space</h1>
//           <Container>
//             <Row className="justify-content-center">
//               <Col xs={12} className="text-center">
//                 <div className="selectors-box border rounded border-dark p-3">
//                   <Form.Select aria-label="Category" disabled > 
//                   {/* onChange={(e) => handleCategoryChange(parseInt(e.target.value))} */}
//                     <option>{categories.categoryId}</option>
//                     {/* {categories.map((category) => (
//                       <option key={category.categoryId} value={category.categoryId}>
//                         {category.categoryName}
//                       </option>
//                     ))} */}
                    
//                   </Form.Select>
 
//                   <Form.Select aria-label="Term" className="mt-3" onChange={(e) => handleTermChange(parseInt(e.target.value))}>
//                     <option>Select Term</option>
//                     {terms.map((term) => (
//                       <option key={term.termId} value={term.termId}>
//                         {term.termName}
//                       </option>
//                     ))}
//                   </Form.Select>
 
//                   <Form.Select aria-label="RentType" className="mt-3">
//                     <option>Select RentType</option>
//                     {renttypes.map((renttype) => (
//                       <option key={renttype.rentTypeId} value={renttype.rentTypeId}>
//                         {renttype.rentTypeName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </div>
//               </Col>
//             </Row>
//             <Row className="justify-content-center mt-4">
//               <Col xs={12} className="text-end">
//                 <Button variant="secondary" size="md" className="me-3">Book</Button>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// }
 
// export default PriceCard;
 