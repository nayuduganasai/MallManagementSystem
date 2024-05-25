import axiosInstance from "../util/http";

export const getAllCategories = async () => {
    try {
        const response = await axiosInstance.get("/categories");
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting categories:', error);
        return [];
    }
};

export const getCategoryById = async (catId) => {
  try {
      const response = await axiosInstance.get(`/categories/${catId}`);
      // console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('Error getting categories:', error);
      return [];
  }
};

export const addCategory = async(category)=>{
    try{
        const response = await axiosInstance.post("/categories",category);
        return response.data;
    }catch(error){
        console.log('Error adding category',error)
        return[];
    }
};

export const updateCategory = async (categoryId, updatedCategory) => {
    try {
      await axiosInstance.put(`/categories/${categoryId}`, updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
  
  export const deleteCategory = async (categoryId) => {
    try {
      const response = await axiosInstance.delete(`/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };