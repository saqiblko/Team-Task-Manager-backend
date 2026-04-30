import API from "./api";

// GET
export const getSettings = () => API.get("/settings");

// POST
export const saveSettings = (data) =>
  API.post("/settings", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
