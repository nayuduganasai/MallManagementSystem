import axiosInstance from "../util/http";

const SpaceService = {
  getSpaceById: async (spaceId) => {
    try {
      const response = await axiosInstance.get(`/spaces/${spaceId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching space by ID:', error);
      throw error;
    }
  },
  getSpaceByLocation: async (location) => {
    try {
      console.log("--------------------");
      const response = await axiosInstance.get(`/spaces/location/${location}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching space by Location:', error);
      throw error;
    }
  },

  getAllSpaces: async () => {
    try {
      const response = await axiosInstance.get("/spaces");
      return response.data;
    } catch (error) {
      console.error('Error fetching all spaces:', error);
      throw error;
    }
  },

  createSpace: async (spaceData) => {
    try {
      const response = await axiosInstance.post("/spaces", spaceData);
      return response.data;
    } catch (error) {
      console.error('Error creating space:', error);
      throw error;
    }
  },

  updateSpace: async (spaceId, updatedSpaceData) => {
    try {
      const response = await axiosInstance.put(`/spaces/${spaceId}`, updatedSpaceData);
      return response.data;
    } catch (error) {
      console.error('Error updating space:', error);
      throw error;
    }
  },

  deleteSpace: async (spaceId) => {
    try {
      await axiosInstance.delete(`/spaces/${spaceId}`);
    } catch (error) {
      console.error('Error deleting space:', error);
      throw error;
    }
  },

  getComplaintsBySpaceId: async (spaceId) => {
    try {
      const response = await axiosInstance.get(`/spaces/${spaceId}/complaints`);
      return response.data;
    } catch (error) {
      console.error('Error fetching complaints by space ID:', error);
      throw error;
    }
  },

  getSpacesByAvailableDate: async (date) => {
    try {
      const response = await axiosInstance.get(`/spaces/findByAvailableDate/${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching spaces by available date:', error);
      throw error;
    }
  },

  getFeedbacksBySpaceId: async (spaceId) => {
    try {
      const response = await axiosInstance.get(`/spaces/${spaceId}/feedbacks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedbacks by space ID:', error);
      throw error;
    }
  },

  getDiscountsBySpaceId: async (spaceId) => {
    try {
      const response = await axiosInstance.get(`/spaces/${spaceId}/Discounts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching discounts by space ID:', error);
      throw error;
    }
  },
};

export default SpaceService;
