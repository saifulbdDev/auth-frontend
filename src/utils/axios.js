// Main interceptor service

import axios from 'axios';


const privateClient  = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
});

privateClient.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('access_token');
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => Promise.reject(error)
);

privateClient.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response;
  },
  (error) => {
    // Handle error responses
    
    // Pass the error along
    return Promise.reject(error);
  }
);

export default privateClient;