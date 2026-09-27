import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Token getter supporting all dashboard storage conventions
const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("accessToken") ||
    sessionStorage.getItem("adminToken") ||
    ""
  );
};

// Common Auth Config
const getAuthConfig = (extraHeaders = {}) => {
  const token = getToken();
  return {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extraHeaders,
    },
  };
};

// =========================================================
// 1. SUBMIT CUSTOMIZATION (PUBLIC)
// POST /api/customizations (multipart/form-data)
// =========================================================
export const createCustomization = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/customizations`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Create customization error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// =========================================================
// 2. GET ALL CUSTOMIZATIONS (ADMIN)
// GET /api/customizations
// =========================================================
export const getAllCustomizations = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/customizations`, {
      ...getAuthConfig(),
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Get customizations error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// =========================================================
// 3. GET SINGLE CUSTOMIZATION (ADMIN)
// GET /api/customizations/:id
// =========================================================
export const getCustomizationById = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/customizations/${id}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Get single customization error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// =========================================================
// 4. UPDATE STATUS (ADMIN)
// PATCH /api/customizations/:id/status
// =========================================================
export const updateCustomizationStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `${API_URL}/customizations/${id}/status`,
      { status },
      getAuthConfig({ "Content-Type": "application/json" })
    );
    return response.data;
  } catch (error) {
    console.error("Update status error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// =========================================================
// 5. UPDATE ADMIN NOTES (ADMIN)
// PATCH /api/customizations/:id/notes
// =========================================================
export const updateCustomizationNotes = async (id, adminNotes) => {
  try {
    const response = await axios.patch(
      `${API_URL}/customizations/${id}/notes`,
      { adminNotes },
      getAuthConfig({ "Content-Type": "application/json" })
    );
    return response.data;
  } catch (error) {
    console.error("Update notes error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// =========================================================
// 6. DELETE CUSTOMIZATION (ADMIN)
// DELETE /api/customizations/:id
// =========================================================
export const deleteCustomization = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/customizations/${id}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Delete customization error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export default {
  createCustomization,
  getAllCustomizations,
  getCustomizationById,
  updateCustomizationStatus,
  updateCustomizationNotes,
  deleteCustomization,
};