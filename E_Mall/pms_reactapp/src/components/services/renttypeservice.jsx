import axiosInstance from '../util/http';

export const getRentTypes = async () => {
  try {
    const response = await axiosInstance.get('/rentTypes');
    return response.data;
  } catch (error) {
    console.error('Error getting rent types:', error);
    return [];
  }
};

export const addRentType = async (selectedTermId, rentType) => {
  try {
    const response = await axiosInstance.post(`/${selectedTermId}/rentTypes`, [rentType]);
    return response.data;
  } catch (error) {
    console.error('Error adding rent type:', error);
    throw error;
  }
};

export const updateRentType = async (termId, rentTypeId, updatedRentType) => {
  try {
    const response = await axiosInstance.put(`/rentTypes/${termId}/${rentTypeId}`, updatedRentType);
    return response.data;
  } catch (error) {
    console.error('Error updating rent type:', error);
    throw error;
  }
};

export const deleteRentType = async (rentTypeId) => {
  try {
    const response = await axiosInstance.delete(`/rentTypes/${rentTypeId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting rent type:', error);
    throw error;
  }
};
