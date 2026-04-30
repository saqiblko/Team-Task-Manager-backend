import API from "./api";

// LOGIN
export const loginUser = (data) => API.post("/login", data);

// LOGOUT
export const logout = () => API.post("/logout");

// GET USER
export const getUser = () => API.get("/user");