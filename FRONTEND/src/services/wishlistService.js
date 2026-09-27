const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const getToken = () => {
  return sessionStorage.getItem("token");
};

const headers = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// ========================================
// GET WISHLIST
// ========================================

export const getWishlist = async () => {
  const response = await fetch(`${API_URL}/wishlist`, {
    method: "GET",
    headers: headers(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch wishlist"
    );
  }

  return data;
};

// ========================================
// ADD TO WISHLIST
// ========================================

export const addToWishlist = async (productId) => {
  const response = await fetch(
    `${API_URL}/wishlist/${productId}`,
    {
      method: "POST",
      headers: headers(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to add to wishlist"
    );
  }

  return data;
};

// ========================================
// REMOVE FROM WISHLIST
// ========================================

export const removeFromWishlist = async (productId) => {
  const response = await fetch(
    `${API_URL}/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: headers(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to remove from wishlist"
    );
  }

  return data;
};

// ========================================
// CHECK WISHLIST
// ========================================

export const checkWishlist = async (productId) => {
  const response = await fetch(
    `${API_URL}/wishlist/check/${productId}`,
    {
      method: "GET",
      headers: headers(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to check wishlist"
    );
  }

  return data;
};