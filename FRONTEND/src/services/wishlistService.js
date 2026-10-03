import api from "./api";

// GET WISHLIST
export const getWishlist = async () => {
  try {
    const response = await api.get("/wishlist");
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to fetch wishlist");
  }
};

// ADD TO WISHLIST
export const addToWishlist = async (productId) => {
  try {
    const response = await api.post(`/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to add to wishlist");
  }
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = async (productId) => {
  try {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to remove from wishlist");
  }
};

// CHECK WISHLIST
export const checkWishlist = async (productId) => {
  try {
    const response = await api.get(`/wishlist/check/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to check wishlist");
  }
};