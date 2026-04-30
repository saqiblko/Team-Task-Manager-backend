// src/Api/enquiry.js
// Yeh file src/Api/enquiry.js mein rakho

import axios from "axios";
import { BASE_URL } from "../config";

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
const API = `${BASE_URL}/api/enquiries`;
// In enquiry.js, add:
// Sab records
export const getEnquiries = () => axios.get(API);

// Single record
export const getEnquiry = (id) => axios.get(`${API}/${id}`);

// Naya record banao
export const createEnquiry = (formData) =>
  axios.post(API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Update (POST with FormData — file support ke liye)
export const updateEnquiry = (id, formData) =>
  axios.post(`${API}/${id}?_method=PUT`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Delete
export const deleteEnquiry = (id) => axios.delete(`${API}/${id}`);

// Search with filters
export const searchEnquiries = (params) =>
  axios.get(`${API}/search`, { params });

// Dashboard stats
export const getStats = () => axios.get(`${API}/stats`);

// Toggle active/inactive
export const toggleStatus = (id) => axios.patch(`${API}/${id}/status`);