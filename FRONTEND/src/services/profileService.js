import api from "./authService";

// =========================================================
// GET USER PROFILE
// =========================================================
export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to fetch profile details.";
    throw new Error(message);
  }
};

// =========================================================
// UPDATE USER PROFILE
// =========================================================
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/profile", profileData);
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to update profile.";
    throw new Error(message);
  }
};