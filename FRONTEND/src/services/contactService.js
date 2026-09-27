import axios from "axios";

// =========================================================
// API URL CONFIGURATION
// =========================================================
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// =========================================================
// GET AUTH TOKEN (Checks all storage locations and keys)
// =========================================================
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

// =========================================================
// AXIOS CONFIG WITH BEARER TOKEN
// =========================================================
const getConfig = () => {
  const token = getToken();

  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

// Helper: Safely extract ID whether a string or an object with _id/id is passed
const resolveId = (target) => {
  if (!target) return null;
  if (typeof target === "string") return target.trim();
  return target._id || target.id || null;
};

// Helper: Tries candidate route prefixes to prevent 404 errors
const requestWithFallback = async (method, relativePaths, data = null, customConfig = {}) => {
  let lastError = null;
  const config = { ...getConfig(), ...customConfig };

  for (const path of relativePaths) {
    try {
      const url = `${API_URL}${path}`;
      let response;

      if (method === "get") {
        response = await axios.get(url, config);
      } else if (method === "post") {
        response = await axios.post(url, data, config);
      } else if (method === "patch") {
        response = await axios.patch(url, data, config);
      } else if (method === "put") {
        response = await axios.put(url, data, config);
      } else if (method === "delete") {
        response = await axios.delete(url, config);
      }

      return response.data;
    } catch (err) {
      lastError = err;
      // If error is 404 (Route not found), try the next candidate endpoint
      if (err.response?.status === 404) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error("Endpoint route not found on the backend.");
};

// =========================================================
// CREATE CONTACT / INQUIRY (PUBLIC)
// POST /api/contact or /api/contacts
// =========================================================
export const createContact = async (contactData) => {
  return requestWithFallback("post", ["/contact", "/contacts", "/enquiries"], contactData, {
    headers: { "Content-Type": "application/json" },
  });
};

// =========================================================
// GET ALL ENQUIRIES (ADMIN)
// GET /api/contact or /api/contacts or /api/enquiries
// =========================================================
export const getAllEnquiries = async (params = {}) => {
  return requestWithFallback("get", ["/contact", "/contacts", "/enquiries"], null, {
    params,
  });
};

// =========================================================
// GET SINGLE ENQUIRY (ADMIN)
// GET /api/contact/:id
// =========================================================
export const getEnquiryById = async (target) => {
  const id = resolveId(target);
  if (!id) throw new Error("A valid Enquiry ID is required.");

  return requestWithFallback("get", [
    `/contact/${id}`,
    `/contacts/${id}`,
    `/enquiries/${id}`,
  ]);
};

// =========================================================
// UPDATE ENQUIRY STATUS (ADMIN)
// PATCH /api/contact/:id/status or /api/contact/:id
// =========================================================
export const updateEnquiryStatus = async (target, status) => {
  const id = resolveId(target);
  if (!id) throw new Error("A valid Enquiry ID is required.");

  return requestWithFallback(
    "patch",
    [
      `/contact/${id}/status`,
      `/contact/${id}`,
      `/contacts/${id}/status`,
      `/contacts/${id}`,
      `/enquiries/${id}/status`,
      `/enquiries/${id}`,
    ],
    { status }
  );
};

// =========================================================
// UPDATE ADMIN NOTES (ADMIN)
// PATCH /api/contact/:id/notes or /api/contact/:id
// =========================================================
export const updateEnquiryNotes = async (target, adminNotes) => {
  const id = resolveId(target);
  if (!id) throw new Error("A valid Enquiry ID is required.");

  return requestWithFallback(
    "patch",
    [
      `/contact/${id}/notes`,
      `/contact/${id}`,
      `/contacts/${id}/notes`,
      `/contacts/${id}`,
      `/enquiries/${id}/notes`,
      `/enquiries/${id}`,
    ],
    { adminNotes }
  );
};

// =========================================================
// DELETE ENQUIRY (ADMIN)
// DELETE /api/contact/:id or /api/contacts/:id or /api/enquiries/:id
// =========================================================
export const deleteEnquiry = async (target) => {
  const id = resolveId(target);
  if (!id) {
    throw new Error("Cannot delete: Missing or undefined Enquiry ID.");
  }

  return requestWithFallback("delete", [
    `/contact/${id}`,
    `/contacts/${id}`,
    `/enquiries/${id}`,
    `/enquiry/${id}`,
  ]);
};

// =========================================================
// DEFAULT EXPORT
// =========================================================
export default {
  createContact,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  updateEnquiryNotes,
  deleteEnquiry,
};