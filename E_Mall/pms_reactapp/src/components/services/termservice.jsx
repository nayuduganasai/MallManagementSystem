import axiosInstance from '../util/http';

export const getTerms = async () => {
  try {
    const response = await axiosInstance.get('/terms');
    return response.data;
  } catch (error) {
    console.error('Error getting terms:', error);
    return [];
  }
};

export const addTerm = async (selectedCategoryId, term) => {
  try {
    const response = await axiosInstance.post(`/${selectedCategoryId}/terms`, [term]);
    return response.data;
  } catch (error) {
    console.error('Error adding term:', error);
    throw error;
  }
};

export const updateTerm = async (categoryId, termId, updatedTerm) => {
  try {
    const response = await axiosInstance.put(`/terms/${categoryId}/${termId}`, updatedTerm);
    return response.data;
  } catch (error) {
    console.error('Error updating term:', error);
    throw error;
  }
};

export const deleteTerm = async (termId) => {
  try {
    const response = await axiosInstance.delete(`/terms/${termId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting term:', error);
    throw error;
  }
};
