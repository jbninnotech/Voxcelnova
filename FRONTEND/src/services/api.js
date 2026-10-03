import axios from "axios";
import authStorage from "../utils/authStorage";

const getApiBaseUrl = () => {
  let url =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api";

  // Clean trailing slash if present
  url = url.replace(/\/$/, "");

  // Prevent double /api/api
  if (url.endsWith("/api/api")) {
    url = url.replace(/\/api\/api$/, "/api");
  }

  return url;
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach bearer token automatically from authStorage (sessionStorage)
api.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { API_BASE_URL };
export default api;