// src/services/authService.js
import axios from "axios";

// =========================================================
// API URL CONFIGURATION
// =========================================================
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// =========================================================
// AXIOS INSTANCE
// =========================================================
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================================================
// REQUEST INTERCEPTOR: ATTACH TOKEN
// =========================================================
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =========================================================
// 1. LOGIN USER
// =========================================================
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email: email.trim().toLowerCase(),
      password,
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to login. Please try again.";
    throw new Error(message);
  }
};

// =========================================================
// 2. REGISTER USER
// =========================================================
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Registration failed.";
    throw new Error(message);
  }
};

// =========================================================
// 3. GET CURRENT LOGGED-IN USER SESSION
// =========================================================
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Could not retrieve user session.";
    throw new Error(message);
  }
};

// =========================================================
// 4. CHANGE PASSWORD (AUTHENTICATED / IN-APP)
// =========================================================
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.patch("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Failed to update password. Please check your current password.";
    throw new Error(message);
  }
};

// =========================================================
// 5. FORGOT PASSWORD (REQUEST RESET LINK VIA EMAIL)
// =========================================================
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", {
      email: email.trim().toLowerCase(),
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to send reset link.";
    throw new Error(message);
  }
};

// =========================================================
// 6. RESET PASSWORD (SUBMIT NEW PASSWORD WITH TOKEN)
// =========================================================
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Password reset failed or token expired.";
    throw new Error(message);
  }
};

// =========================================================
// 7. LOGOUT USER
// =========================================================
export const logoutUser = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("role");
};

// =========================================================
// EXPORT DEFAULT AXIOS INSTANCE
// =========================================================
export default api;