import axios from "axios";

// export default axios.create({
//     baseURL: "http://localhost:8080/emall",
//     headers: {
//         "Content-type": "application/json"
        
//     }
// });

const  axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/emall',
    withCredentials: true, // Your API base URL
  });
  
  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage
        console.log(token);
      if (token) {
        config.headers['Content-Type'] = "application/json"
        config.headers['Authorization'] = `Bearer ${token}` // Set the Authorization header
        // config.headers['Access-Control-Allow-Credentials'] = true
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor to handle unauthorized (401) responses
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("error------------------------------------");
        // Handle unauthorized access - e.g., logout the user, redirect to login, etc.
        // Example: localStorage.removeItem('jwtToken');
        // Redirect to login page: window.location.href = '/login';
        localStorage.clear();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  export default axiosInstance;