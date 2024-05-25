import axiosInstance from "../util/http";


const RequestService = {
  getAllRequests: async () => {
    try {
      const response = await axiosInstance.get("/requests");
      return response.data;
    } catch (error) {
      console.error('Error fetching all requests:', error);
      throw error;
    }
  },

  getRequestById: async (requestId) => {
    try {
      const response = await axiosInstance.get(`/requests/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching request by ID:', error);
      throw error;
    }
  },

  createRequest: async (request) => {
    try {
      const response = await axiosInstance.post("/requests", request);
      return response.data;
    } catch (error) {
      console.error('Error creating request:', error);
      throw error;
    }
  },

  updateRequest: async (requestId, updatedRequest) => {
    try {
      const response = await axiosInstance.put(`/requests/${requestId}`, updatedRequest);
      return response.data;
    } catch (error) {
      console.error('Error updating request:', error);
      throw error;
    }
  },

  deleteRequest: async (requestId) => {
    try {
      const response = await axiosInstance.delete(`/requests/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting request:', error);
      throw error;
    }
  }
};

export default RequestService;
