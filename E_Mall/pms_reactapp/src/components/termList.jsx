import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import UpdateCategoryModal from "./updateCategoryModal";
import AddTermModal from "./addTermModal";
import CustomConfirmationModal from "./CustomConfirmationModal";
import UpdateTermModal from "./updateTermModal";
import { getAllCategories } from "./services/categoryservice";
import { deleteTerm, getTerms } from "./services/termservice";

function TermList() {
  const [terms, setTerms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedCategory,setSelectedCategory]=useState(null);
  const [selectedCategoryId,setSelectedCategoryId]=useState();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
 
  const [message, setMessage] = useState("");
  const [term, setTerm] = useState({
    termId: "",
    termName: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
const [selectedTermId, setSelectedTermId] = useState(null);

const openConfirmationModal = (termId) => {
  setSelectedTermId(termId);
  setShowConfirmation(true);
};

const closeConfirmationModal = () => {
  setShowConfirmation(false);
};

const handleDelete = (termId) => {
  setSelectedTermId(termId);
  openConfirmationModal(termId);
};


  const handleGetAllRentTypes = () => {
    navigate("/renttypeList");
  };


  const openUpdateModal = (term) => {
    setSelectedTerm(term);
    setShowUpdateModal(true);
  };
 
  const closeUpdateModal=()=>{
    setShowUpdateModal(false);
    fetchTerms();
}
 

  const openAddModal=()=>{
    setTerm(term)
    setShowModal(true)
  }

  const closeAddModal = () => {
    setShowModal(false);
    fetchTerms()
  };

  useEffect(() => {
    fetchCategories();
    fetchTerms();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories()
      // await axios.get("http://localhost:8080/emall/categories");
      setCategories(response);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const fetchTerms =async()=>{
    try{
    const response=  await getTerms()
    //axios.get("http://localhost:8080/emall/terms")
       setTerms(response)
    }
    catch (error) {
     console.error (error.response.data);
   }
    
  }
 
  
  

  const confirmDelete = async() => {
    // axios
    //   .delete(`http://localhost:8080/emall/terms/${selectedTermId}`)
    await deleteTerm(selectedTermId)
      .then((response) => {
        setMessage(response.data);
        fetchTerms();
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
  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
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
        <h2>Term List</h2>
        {/* <button
          onClick={handleGetAllRentTypes}
          style={{
            backgroundColor: "green",
            padding: "8px",
            border: "none",
            color: "white",
            borderRadius: "5px",
          }}
        >
          RentTypes
        </button> */}
        <Button variant="secondary"  onClick={() =>openAddModal()}>
          +Add Term
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th
            >
              Term ID
            </th>
            <th
            >
              Term Name
            </th>
            <th
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {terms.map((term) => (
            <tr key={term.termId}>
              <td
              >
                {term.termId}
              </td>
              <td
               
              >
                {term.termName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "4px" }}>
              <Button
                  variant="primary"
                  onClick={() => openUpdateModal(term)}
                 
                > Update</Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(term.termId)}
                 
                > Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UpdateTermModal
      show={showUpdateModal}
      term={selectedTerm}
      // category={selectedCategory}
      onClose={closeUpdateModal}
      />
        <AddTermModal
        show={showModal}
        onClose={closeAddModal}
        categories={categories}
        setSelectedCategoryId={setSelectedCategoryId}
      />
       <CustomConfirmationModal
      show={showConfirmation}
      onClose={closeConfirmationModal}
      onConfirm={confirmDelete}
      message="Are you sure you want to delete this term?"
    />
    </div>
  );
}

export default TermList;
