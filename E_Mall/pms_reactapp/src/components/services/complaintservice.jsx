
// import http from '../util/http';

import axiosInstance from "../util/http";

const ComplaintService = {
  getComplaintById: async (complaintId) => {
    try {
      const response = await axiosInstance.get(`/complaints/${complaintId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching complaint by ID:', error);
      // throw error;
    }
  },

  getAllComplaints: async () => {
    try {
      const response = await axiosInstance.get("/complaints");
      return response.data;
    } catch (error) {
      console.error('Error fetching all complaints:', error);
      // throw error;
    }
  },

  createComplaint: async (complaintData) => {
    try {
      const response = await axiosInstance.post("/complaints", complaintData);
      return response.data;
    } catch (error) {
      console.error('Error creating complaint:', error);
      // throw error;
    }
  },

  updateComplaint: async (complaintId, complaintData) => {
    try {
      const response = await axiosInstance.put(`/complaints/${complaintId}`, complaintData);
      return response.data;
    } catch (error) {
      console.error('Error updating complaint:', error);
      // throw error;
    }
  },

  deleteComplaint: async (complaintId) => {
    try {
      const response = await axiosInstance.delete(`/complaints/${complaintId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting complaint:', error);
      // throw error;
    }
  }
};

export default ComplaintService;
