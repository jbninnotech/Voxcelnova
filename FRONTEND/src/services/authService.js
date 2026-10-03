import api from "./api";
import authStorage from "../utils/authStorage";

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
    console.error("Login Error:", error);
    const message =
      error?.response?.data?.message ||
      "Failed to login. Please check your credentials.";
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
      error?.response?.data?.message ||
      "Registration failed.";
    throw new Error(message);
  }
};

// =========================================================
// 3. GET CURRENT LOGGED-IN USER
// =========================================================
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Could not retrieve user session.";
    throw new Error(message);
  }
};

// =========================================================
// 4. CHANGE PASSWORD
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
// 5. FORGOT PASSWORD
// =========================================================
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", {
      email: email.trim().toLowerCase(),
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Failed to send reset link.";
    throw new Error(message);
  }
};

// =========================================================
// 6. RESET PASSWORD
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
  authStorage.clear();
};

export default api;