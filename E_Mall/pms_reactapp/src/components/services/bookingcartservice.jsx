import axiosInstance from "../util/http";


const BookingCartService = {
  getAllBookingItems: async () => {
    try {
      const response = await axiosInstance.get("/bookingcarts");
      return response.data;
    } catch (error) {
      console.error('Error fetching all booking items:', error);
      throw error;
    }
  },

  getBookingItemById: async (bookingItemId) => {
    try {
      const response = await axiosInstance.get(`/bookingcarts/${bookingItemId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking item by ID:', error);
      throw error;
    }
  },

  getBookingCartByUser: async (userId) => {
    try {
      const response = await axiosInstance.get(`/bookingcarts/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking cart by user:', error);
      throw error;
    }
  },

  createBookingCart: async (requestIds, totalCost, userId) => {
    try {
      const response = await axiosInstance.post(`/bookingcarts`, {
        requests: requestIds,
        totalCost,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating booking item:', error);
      throw error;
    }
  },

  updateBookingItem: async (bookingItemId, updatedBookingCartData) => {
    try {
      const response = await axiosInstance.put(`/bookingcarts/${bookingItemId}`, updatedBookingCartData);
      return response.data;
    } catch (error) {
      console.error('Error updating booking item:', error);
      throw error;
    }
  },

  deleteBookingCart: async (bookingItemId) => {
    try {
      const response = await axiosInstance.delete(`/bookingcarts/${bookingItemId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting booking item:', error);
      throw error;
    }
  }
};

export default BookingCartService;
