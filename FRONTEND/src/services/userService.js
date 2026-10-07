import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

// =========================================================
// AUTH HEADERS
// =========================================================

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error(
      "Authentication token not found. Please login again."
    );
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// =========================================================
// GET ALL USERS
// =========================================================

export const getAllUsers = async () => {
  const response = await axios.get(
    `${API_URL}/users`,
    {
      headers: getAuthHeaders(),
    }
  );

  console.log(
    "GET /users:",
    response.data
  );

  return response.data;
};

// =========================================================
// UPDATE ROLE
// =========================================================

export const updateUserRole = async (
  userId,
  role
) => {
  const response = await axios.put(
    `${API_URL}/users/${userId}/role`,
    {
      role,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

// =========================================================
// TOGGLE STATUS
// =========================================================

export const toggleUserStatus = async (
  userId
) => {
  const response = await axios.put(
    `${API_URL}/users/${userId}/status`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};