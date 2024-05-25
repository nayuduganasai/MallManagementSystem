// import axios from 'axios'
// import React, {useState } from 'react'
// import { useEffect } from 'react';

// function RentTypeList() {
//     const [rentType,setRentType]=useState([])

//     useEffect(() => {
//         axios.get("http://localhost:8080/emall/rentTypes")
//           .then((response) => {
//             setRentType(response.data);
//           })
//           .catch((error) => {
//             console.log("Error fetching categories:", error);
//           });
//       }, []);

//   return (
//     <div className=' min-vh-100 ' style={{ padding: '20px' }}>
//        <table style={{width: '80%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr style={{backgroundColor:'yellowgreen'}}>
//             <th style={{border: '1px solid #ddd',
//     padding: '5px', // Reduce padding for smaller cells
//     maxWidth: '100px', // Limit cell width
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap'}}>RentType ID</th>
//             <th style={{border: '1px solid #ddd',
//     padding: '5px', // Reduce padding for smaller cells
//     maxWidth: '100px', // Limit cell width
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap'}}>RentType Name</th>
//        <th style={{border: '1px solid #ddd',
//     padding: '5px', // Reduce padding for smaller cells
//     maxWidth: '100px', // Limit cell width
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap'}}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rentType.map((rentType) => (
//             <tr key={rentType.id}>
//               <td style={{border: '1px solid #ddd',
//     padding: '5px', // Reduce padding for smaller cells
//     maxWidth: '100px', // Limit cell width
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap'}}>{rentType.rentTypeId}</td>
//       <td style={{border: '1px solid #ddd',
//     padding: '5px', // Reduce padding for smaller cells
//     maxWidth: '100px', // Limit cell width
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap'}}>{rentType.rentTypeName}</td>
//               <td style={{ border: '1px solid #ddd', padding: '4px' }}>
//                 <button style={{ backgroundColor: 'gray', color: 'white', marginRight: '5px' }}>Update</button>
//                 <button style={{ backgroundColor: 'gray', color: 'white' }}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default RentTypeList




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import UpdateCategoryModal from "./updateCategoryModal";
import AddTermModal from "./addTermModal";
import CustomConfirmationModal from "./CustomConfirmationModal";
import UpdateTermModal from "./updateTermModal";
import AddRentTypeModal from "./addRentTypeModal";
import UpdateRentTypeModal from "./updateRentTypeModal";
import { getTerms } from "./services/termservice";
import { deleteRentType, getRentTypes } from "./services/renttypeservice";

function RentTypeList() {
  const [rentTypes, setRentTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRentType, setSelectedRentType] = useState(null);
  const [selectedTermId,setSelectedTermId]=useState();
  // const [selectedTerm, setSelectedTerm] = useState(null);
  const [terms, setTerms] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
 
  const [message, setMessage] = useState("");
  const [rentType, setRentType] = useState({
    rentTypeId: "",
    rentTypeName: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
const [selectedRentTypeId, setSelectedRentTypeId] = useState(null);

const openConfirmationModal = (rentTypeId) => {
  setSelectedTermId(rentTypeId);
  setShowConfirmation(true);
};

const closeConfirmationModal = () => {
  setShowConfirmation(false);
};

const handleDelete = (rentTypeId) => {
  setSelectedRentTypeId(rentTypeId);
  openConfirmationModal(rentTypeId);
};



  const openUpdateModal = (rentType) => {
    setSelectedRentType(rentType);
    setShowUpdateModal(true);
  };
 
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    fetchRentTypes();
  };

  const openAddModal=()=>{
    setRentType(rentType)
    setShowModal(true)
  }

  const closeAddModal = () => {
    setShowModal(false);
    fetchRentTypes()
  };

  useEffect(() => {
    fetchTerms();
    fetchRentTypes();
  }, []);

  const fetchTerms = async () => {
    try {
      const response = await getTerms()
      //  await axios.get("http://localhost:8080/emall/terms");
      setTerms(response);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const fetchRentTypes =async()=>{
    try{
    const response= await getRentTypes()
    //  await axios.get("http://localhost:8080/emall/rentTypes")
       setRentTypes(response)
    }
    catch (error) {
     console.error (error.response.data);
   }
    
  }
 
  const handleUpdate = async (updatedRentType)=>{
    try{
      await axios.put(`http://localhost:8080/emall/rentTypes/${updatedRentType.rentTypeId}`,updatedRentType)
      setRentTypes((preRentTypes)=>{
          return preRentTypes.map((rentType)=>
          rentType.rentTypeId===updatedRentType.rentTypeId?updatedRentType:rentType)
      })
         closeUpdateModal()

    }catch(error){
       console.error("error in updating term:",error.response.data)
    }
  }

  const confirmDelete = async() => {      
      await deleteRentType(selectedRentTypeId)
      .then((response) => {
          setMessage(response);
          fetchRentTypes();
        })
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    closeConfirmationModal();
  };

  // const handleCategoryChange = (categoryId) => {
  //   // Set the selected category ID to the component state or directly pass it to handleAddTerm
  //   setSelectedCategoryId(categoryId)
  // }
  const handleCategoryChange = (termId) => {
    setSelectedTermId(termId);
  };

  return (
    <div className=" min-vh-100 " style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2>RentType List</h2>
  
        <Button variant="secondary"  onClick={() =>openAddModal()}>
          +Add RentType
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th
            >
              RentType ID
            </th>
            <th
            >
              RentType Name
            </th>
            <th
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rentTypes?.map((rentType) => (
            <tr key={rentType.rentTypeId}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "5px", // Reduce padding for smaller cells
                  maxWidth: "100px", // Limit cell width
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {rentType.rentTypeId}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "5px", // Reduce padding for smaller cells
                  maxWidth: "100px", // Limit cell width
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {rentType.rentTypeName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "4px" }}>
              <Button
                  variant="primary"
                  onClick={() => openUpdateModal(rentType)}
                 
                > Update</Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(rentType.rentTypeId)}
                 
                > Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UpdateRentTypeModal
      show={showUpdateModal}
      rentType={selectedRentType}
      onClose={closeUpdateModal}
      />
        <AddRentTypeModal
        show={showModal}
        onClose={closeAddModal}
        terms={terms}
        setSelectedTermId={setSelectedTermId}
      />
       <CustomConfirmationModal
      show={showConfirmation}
      onClose={closeConfirmationModal}
      onConfirm={confirmDelete}
      message="Are you sure you want to delete this rentType?"
    />
    </div>
  );
}

export default RentTypeList;

