import axiosInstance from "../util/http";

export const getDiscounts = async () => {
    try {
      const response = await axiosInstance.get('/discounts');
      return response.data;
    } catch (error) {
      console.error('Error fetching discounts:', error);
      throw error;
    }
  };
  
  export const deleteDiscount = async (discountId) => {
    try {
      await axiosInstance.delete(`/discounts/${discountId}`);
    } catch (error) {
      console.error('Error deleting discount:', error);
      throw error;
    }
  };

  export const addDiscount = async (discountData) => {
    try {
      const response = await axiosInstance.post('/discounts', discountData);
      return response.data;
    } catch (error) {
      console.error('Error creating discount:', error);
      throw error;
    }
  };
  
  export const updateDiscount = async (discountId, updatedDiscountData) => {
    try {
      const response = await axiosInstance.put(`/discounts/${discountId}`, updatedDiscountData);
      return response.data;
    } catch (error) {
      console.error('Error updating discount:', error);
      throw error;
    }
  };

  export const fetchDiscountById = async (id) => {
    try {
      const response = await axiosInstance.get(`/discounts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching discount data:', error);
      throw error;
    }
  };