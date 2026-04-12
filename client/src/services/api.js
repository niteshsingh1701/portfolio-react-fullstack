import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const getProjects = () => api.get("/projects");

export const getProjectById = (id) => api.get(`/projects/${id}`);
export const submitContact = (data) => api.post("/contact", data);
export const getResume = () => api.get("/resume");

export default api;
