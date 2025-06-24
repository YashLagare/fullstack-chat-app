// src/lib/axios.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api",

  // ✅ This line is critical for cookie-based auth
  withCredentials: true,
});
