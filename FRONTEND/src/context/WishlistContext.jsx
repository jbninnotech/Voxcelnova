import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext(null);

const WISHLIST_STORAGE_KEY = "voxcel_nova_wishlist";
const OLD_WISHLIST_STORAGE_KEY = "voxcel_wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      // First try the new wishlist key
      const newWishlist = localStorage.getItem(
        WISHLIST_STORAGE_KEY
      );

      if (newWishlist) {
        const parsed = JSON.parse(newWishlist);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }

      // If new key is empty, check old key
      const oldWishlist = localStorage.getItem(
        OLD_WISHLIST_STORAGE_KEY
      );

      if (oldWishlist) {
        const parsed = JSON.parse(oldWishlist);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }

      return [];
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );

      return [];
    }
  });

  /* =====================================================
     SAVE WISHLIST
  ===================================================== */

  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlistItems)
      );

      // Keep old key synchronized for compatibility
      localStorage.setItem(
        OLD_WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlistItems)
      );
    } catch (error) {
      console.error(
        "Failed to save wishlist:",
        error
      );
    }
  }, [wishlistItems]);

  /* =====================================================
     ADD TO WISHLIST
  ===================================================== */

  const addToWishlist = (product) => {
    if (!product?._id) {
      return {
        success: false,
        message: "Invalid product",
      };
    }

    setWishlistItems((previousItems) => {
      const exists = previousItems.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return previousItems;
      }

      return [
        ...previousItems,
        product,
      ];
    });

    return {
      success: true,
      message: "Product added to wishlist",
    };
  };

  /* =====================================================
     REMOVE FROM WISHLIST
  ===================================================== */

  const removeFromWishlist = (productId) => {
    setWishlistItems((previousItems) =>
      previousItems.filter(
        (item) => item._id !== productId
      )
    );
  };

  /* =====================================================
     TOGGLE WISHLIST
  ===================================================== */

  const toggleWishlist = (product) => {
    if (!product?._id) {
      return false;
    }

    const exists = wishlistItems.some(
      (item) => item._id === product._id
    );

    if (exists) {
      removeFromWishlist(product._id);
      return false;
    }

    addToWishlist(product);
    return true;
  };

  /* =====================================================
     CHECK WISHLIST
  ===================================================== */

  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => item._id === productId
    );
  };

  /* =====================================================
     CLEAR WISHLIST
  ===================================================== */

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  /* =====================================================
     COUNT
  ===================================================== */

  const wishlistCount = wishlistItems.length;

  /* =====================================================
     CONTEXT VALUE
  ===================================================== */

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

/* =====================================================
   HOOK
===================================================== */

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};

export default WishlistContext;