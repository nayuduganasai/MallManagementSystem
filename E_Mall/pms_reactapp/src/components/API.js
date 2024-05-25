import axios from 'axios';

// Create a custom Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:8080/emall', // Your base URL
  headers: {
    'Content-Type': 'application/json', // You can add other headers here
    'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`
  },
});

// Define an asynchronous function to fetch requests using the custom instance
export const fetchRequests = async () => {
  try {
    const response = await api.get('/requests'); // Append the endpoint to the base URL
    console.log('Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};



 export const createRequest = async (requestData) => {
    try {
      const response = await api.post('/requests', requestData); // Append the endpoint to the base URL
      // console.log('Created request:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating request:', error.message);
      throw error;
    }
  };

 export const fetchRequestById = async (requestId) => {
    try {
      const response = await api.get(`/requests/${requestId}`); // Append the endpoint to the base URL
      console.log('Fetched request by ID:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching request by ID:', error.message);
      throw error;
    }
  };
  
// Function to create a booking cart
export const createBookingCart = async (requestIds, totalCost, userId) => {
  try {
    console.log(requestIds,totalCost,userId)
    const response = await api.post('/bookingcarts', {
      requests: requestIds,
      totalCost,
      userId,
    });

    return response.data; // Assuming the server returns relevant data upon success
  } catch (error) {
    console.error('Error creating booking cart:', error, requestIds, totalCost, userId);
    throw error; // Propagate the error to handle it further if needed
  }
};

// Function to delete a booking cart by cartId
export const deleteBookingCart = async (cartId) => {
  try {
    const response = await api.delete(`/bookingcarts/${cartId}`);
    return response.data; // Assuming the server returns relevant data upon success
  } catch (error) {
    console.error('Error deleting booking cart:', error);
    throw error; // Propagate the error to handle it further if needed
  }
};

// Function to update a booking cart based on requestIds, totalCost, and userId
export const updateBookingCart = async (cartId, requestIds, totalCost, userId) => {
  // console.log(requestIds)
  try {
    const response = await api.put(`/bookingcarts/${cartId}`, {
      requests: requestIds,
      totalCost,
      userId,
    });

    return response.data; // Assuming the server returns relevant data upon success
  } catch (error) {
    console.error('Error updating booking cart:', error);
    throw error; // Propagate the error to handle it further if needed
  }
};

// Function to get booking cart by user ID
export const getBookingCartByUserId = async (userId) => {
  try {
    const response = await api.get(`/bookingcarts/user/${userId}`);
    console.log('Fetched booking cart by User ID:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking cart by User ID:', error.message);
    throw error;
  }
};

// Function to fetch space bookings by user and cart IDs
export const fetchSpaceBookings = async (cartId, userId) => {
  try {
    const response = await api.post('/spacebookings', {
      cartId,
      userId,
    });
    console.log('Fetched space bookings:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching space bookings:', error.message);
    throw error;
  }
};


// Function to delete a space booking by spaceBookingId
export const deleteSpaceBooking = async (spaceBookingId) => {
  try {
    const response = await api.delete(`/spacebookings/${spaceBookingId}`);
    console.log('Deleted space booking:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting space booking:', error.message);
    throw error;
  }
};

// Function to update a space booking by spaceBookingId
export const updateSpaceBooking = async (spaceBookingId, updatedData) => {
  try {
    const response = await api.put(`/spacebookings/${spaceBookingId}`, updatedData);
    console.log('Updated space booking:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating space booking:', error.message);
    throw error;
  }
};

// Function to create a space booking with a cart
export const createSpaceBookingWithCart = async (cartId, userId) => {
  try {
    // Create the space booking with the provided cartId and userId
    const response = await api.post('/spacebookings', { cartId, userId });

    console.log('Created space booking with cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating space booking with cart:', error.message);
    throw error;
  }
};



export const fetchSpaces = async () => {
  try {
    const response = await api.get('/spaces'); // Append the endpoint to the base URL
    // console.log('spces Data: api call', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};
