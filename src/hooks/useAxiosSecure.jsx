// src/hooks/useAxiosSecure.js
import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:4000', // Backend URL
});

export default axiosSecure; // ✅ default export
