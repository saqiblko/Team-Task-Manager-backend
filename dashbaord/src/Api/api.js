// src/Api/api.js
import axios from "axios";

// Use environment variable, fallback to local for development
const API_BASE_URL = import.meta.env.VITE_BASE_URL || "https://techbay.one/";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;