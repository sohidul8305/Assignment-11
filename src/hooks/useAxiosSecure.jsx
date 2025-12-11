// hooks/useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000",
  // withCredentials: true // token-based auth optional
});

export default axiosSecure;
