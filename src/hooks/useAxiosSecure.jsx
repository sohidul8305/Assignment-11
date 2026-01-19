// src/hooks/useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://loanmate-nine.vercel.app",
  headers: { "Content-Type": "application/json" },
});

export default axiosSecure;
