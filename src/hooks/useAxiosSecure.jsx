// src/hooks/useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000", // backend URL
  headers: { "Content-Type": "application/json" },
});

export default axiosSecure;
