import API from "./api"; // आपका axios instance

// GET all testimonials
export const getTestimonials = () => API.get("/testimonials");

// ADD / UPLOAD new testimonial
export const uploadTestimonial = (data) =>
  API.post("/testimonials", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// UPDATE testimonial by id
export const updateTestimonial = (id, data) =>
  API.post(`/testimonials/${id}?_method=PUT`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// DELETE testimonial by id
export const deleteTestimonial = (id) =>
  API.post(`/testimonials/${id}?_method=DELETE`);