import axiosInstance from "../util/http";

export const fetchFeedbacksBySpaceId = async (spaceId) => {
    try {
      const response = await axiosInstance.get(`/spaces/${spaceId}/feedbacks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedbacks', error.message);
      throw error;
    }
  };

  
export const fetchAllFeedbacks = async () => {
    try {
      const response = await axiosInstance.get('/feedbacks');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching feedbacks');
    }
  };

  export const submitFeedback = async (formData) => {
    try {
      const response = await axiosInstance.post('/feedbacks', formData);
      return response.data;
    } catch (error) {
      throw new Error('Error submitting feedback');
    }
  };