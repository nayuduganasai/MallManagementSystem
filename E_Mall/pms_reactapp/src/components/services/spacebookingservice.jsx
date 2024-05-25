import axiosInstance from "../util/http";


const SpaceBookingService = {
  createSpaceBooking: async (bookingRequest) => {
    try {
      const response = await axiosInstance.post("/spacebookings", bookingRequest);
      return response.data;
    } catch (error) {
      console.error('Error creating space booking:', error);
      throw error;
    }
  },

  getAllSpaceBookings: async () => {
    try {
      const response = await axiosInstance.get("/spacebookings");
      return response.data;
    } catch (error) {
      console.error('Error fetching all space bookings:', error);
      throw error;
    }
  },

  getSpaceBookingById: async (bookingId) => {
    try {
      const response = await axiosInstance.get(`/spacebookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching space booking by ID:', error);
      throw error;
    }
  },

  getSpaceBookingByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`/spacebookings/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching space booking by UserID:', error);
      throw error;
    }
  },

  updateSpaceBooking: async (bookingId, updatedSpaceBooking) => {
    try {
      const response = await axiosInstance.put(`/spacebookings/${bookingId}`, updatedSpaceBooking);
      return response.data;
    } catch (error) {
      console.error('Error updating space booking:', error);
      throw error;
    }
  },

  deleteSpaceBooking: async (bookingId) => {
    try {
      const response = await axiosInstance.delete(`/spacebookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting space booking:', error);
      throw error;
    }
  },

  approveBooking: async (bookingId) => {
    try {
      const response = await axiosInstance.put(`/spacebookings/${bookingId}/approve`);
      return response.data;
    } catch (error) {
      console.error('Error approving space booking:', error);
      throw error;
    }
  },

  rejectBooking: async (bookingId) => {
    try {
      const response = await axiosInstance.put(`/spacebookings/${bookingId}/reject`);
      return response.data;
    } catch (error) {
      console.error('Error rejecting space booking:', error);
      throw error;
    }
  }
};

export default SpaceBookingService;
