import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import UpdateCategoryModal from "./updateCategoryModal";
import AddCategoryModal from "./addCategoryModal";
import CustomConfirmationModal from "./CustomConfirmationModal";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "./services/categoryservice";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [category, setCategory] = useState({
    categoryId: "",
    categoryName: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
const [selectedCategoryId, setSelectedCategoryId] = useState(null);

const openConfirmationModal = (categoryId) => {
  setSelectedCategoryId(categoryId);
  setShowConfirmation(true);
};

const closeConfirmationModal = () => {
  setShowConfirmation(false);
};

const handleDelete = (categoryId) => {
  setSelectedCategoryId(categoryId);
  openConfirmationModal(categoryId);
};



 useEffect(() => {
  fetchCategories();
}, []);


  const handleGetAllTerms = () => {
    navigate("/termList");
  };


  const openUpdateModal = (category) => {
    setSelectedCategory(category);
    setShowUpdateModal(true); 
  };
 
  const closeUpdateModal = () => {
    setShowUpdateModal(false); 
  };

  const openAddModal=()=>{
    setCategory(category)
    setShowModal(true)
  }

  const closeAddModal = () => {
    setShowModal(false);
  };

  const fetchCategories =async()=>{
    try{
    const response= await getAllCategories()
           setCategories(response)
    }
    catch (error) {
     console.error (error.response.data);
   }
    
  }

  const handleAddCategory = (category) => {
        try {
        const response = addCategory(category)
        setMessage(response.data);
        alert(response.data)
        closeAddModal();
        
      } catch (error) {
        setMessage(error.response.data.message);
        alert(error.response.data.message);
        
      }
  };
 
  const handleUpdate = async (updatedCategory)=>{
      try {
      updateCategory(updateCategory.categoryId,updateCategory)
      setCategories((preCategories)=>{
        return preCategories.map((category)=>
        category.categoryId===updatedCategory.categoryId?updatedCategory:category)})
        closeUpdateModal();
    } catch (error) {
      console.error("error in updating category:",error.response.data)
    }
  }

  const confirmDelete = () => {
       try {
      const response = deleteCategory(selectedCategoryId)
      setMessage(response.data);
        fetchCategories();
      closeConfirmationModal();
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  

  return (
    <div className=" min-vh-100 "  style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2>Category List</h2>
        <Button
                  variant="secondary"
                  size="sm"
                  className="mr-2"
                  onClick={() => openAddModal(category)}
                 
                > +Add Category</Button>
      </div>
      <Table  striped bordered hover>
        <thead>
          <tr>
            <th>
              Category ID
            </th>
            <th>
              Category Name
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category.categoryId}>
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
                {category.categoryId}
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
                {category.categoryName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "4px" }}>
              <Button
                  variant="primary"
                  onClick={() => openUpdateModal(category)}
                 
                > Update</Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(category.categoryId)}
                 
                > Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UpdateCategoryModal
  show={showUpdateModal}
  category={selectedCategory}
  onClose={closeUpdateModal}
  handleUpdate={handleUpdate}
/>
      <AddCategoryModal
      show={showModal}
      category={selectedCategory}
      onClose={closeAddModal}
      handleAddCategory={handleAddCategory}/>
      
       <CustomConfirmationModal
      show={showConfirmation}
      onClose={closeConfirmationModal}
      onConfirm={confirmDelete}
      message="Are you sure you want to delete this category?"
    />
    </div>
  );
}

export default CategoryList;
