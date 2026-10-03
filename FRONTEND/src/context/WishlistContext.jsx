import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import authStorage from "../utils/authStorage";
import * as wishlistApi from "../services/wishlistService";

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = "voxcel_nova_wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = sessionStorage.getItem(WISHLIST_STORAGE_KEY) || localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  // If user is authenticated, sync with backend database
  useEffect(() => {
    const token = authStorage.getToken();
    if (token) {
      wishlistApi
        .getWishlist()
        .then((res) => {
          if (res.success && Array.isArray(res.wishlist)) {
            setWishlistItems(res.wishlist);
          }
        })
        .catch((err) => {
          console.warn("Backend wishlist fetch warning:", err.message);
        });
    }
  }, []);

  // Save to sessionStorage whenever wishlistItems change
  useEffect(() => {
    try {
      sessionStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlistItems)
      );
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    } catch (error) {}
  }, [wishlistItems]);

  /* =====================================================
     ADD TO WISHLIST
  ===================================================== */
  const addToWishlist = async (product) => {
    if (!product?._id) {
      return { success: false, message: "Invalid product" };
    }

    setWishlistItems((previousItems) => {
      const exists = previousItems.some((item) => item._id === product._id);
      if (exists) return previousItems;
      return [...previousItems, product];
    });

    const token = authStorage.getToken();
    if (token) {
      try {
        await wishlistApi.addToWishlist(product._id);
      } catch (err) {
        console.warn("Backend add to wishlist failed:", err.message);
      }
    }

    return {
      success: true,
      message: "Product added to wishlist",
    };
  };

  /* =====================================================
     REMOVE FROM WISHLIST
  ===================================================== */
  const removeFromWishlist = async (productId) => {
    setWishlistItems((previousItems) =>
      previousItems.filter((item) => item._id !== productId)
    );

    const token = authStorage.getToken();
    if (token) {
      try {
        await wishlistApi.removeFromWishlist(productId);
      } catch (err) {
        console.warn("Backend remove from wishlist failed:", err.message);
      }
    }
  };

  /* =====================================================
     TOGGLE WISHLIST
  ===================================================== */
  const toggleWishlist = (product) => {
    if (!product?._id) return false;

    const exists = wishlistItems.some((item) => item._id === product._id);
    if (exists) {
      removeFromWishlist(product._id);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };

  /* =====================================================
     CHECK WISHLIST
  ===================================================== */
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  /* =====================================================
     CLEAR WISHLIST
  ===================================================== */
  const clearWishlist = () => {
    setWishlistItems([]);
    sessionStorage.removeItem(WISHLIST_STORAGE_KEY);
  };

  const wishlistCount = wishlistItems.length;

  const value = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
};

export default WishlistContext;