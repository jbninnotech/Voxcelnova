import User from "../../models/User.js";
import Product from "../../models/Product.js";

// ========================================
// GET WISHLIST
// GET /api/wishlist
// ========================================

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate({
        path: "wishlist",
        model: "Product",
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlist: user.wishlist || [],
      count: user.wishlist ? user.wishlist.length : 0,
    });
  } catch (error) {
    console.error("Get wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
};

// ========================================
// ADD PRODUCT TO WISHLIST
// POST /api/wishlist/:productId
// ========================================

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    // ------------------------------------
    // Validate product
    // ------------------------------------

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ------------------------------------
    // Find user
    // ------------------------------------

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ------------------------------------
    // Make sure wishlist exists
    // ------------------------------------

    if (!user.wishlist) {
      user.wishlist = [];
    }

    // ------------------------------------
    // Check duplicate
    // ------------------------------------

    const alreadyExists = user.wishlist.some(
      (id) => id.toString() === productId
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Product is already in your wishlist",
      });
    }

    // ------------------------------------
    // Add product
    // ------------------------------------

    user.wishlist.push(productId);

    await user.save();

    // ------------------------------------
    // Get updated wishlist
    // ------------------------------------

    const updatedUser = await User.findById(req.user._id)
      .select("-password")
      .populate({
        path: "wishlist",
        model: "Product",
      });

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist: updatedUser.wishlist || [],
      count: updatedUser.wishlist
        ? updatedUser.wishlist.length
        : 0,
    });
  } catch (error) {
    console.error("Add wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
      error: error.message,
    });
  }
};

// ========================================
// REMOVE PRODUCT FROM WISHLIST
// DELETE /api/wishlist/:productId
// ========================================

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist is empty",
      });
    }

    // ------------------------------------
    // Check product exists in wishlist
    // ------------------------------------

    const productExists = user.wishlist.some(
      (id) => id.toString() === productId
    );

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product is not in your wishlist",
      });
    }

    // ------------------------------------
    // Remove product
    // ------------------------------------

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );

    await user.save();

    // ------------------------------------
    // Get updated wishlist
    // ------------------------------------

    const updatedUser = await User.findById(req.user._id)
      .select("-password")
      .populate({
        path: "wishlist",
        model: "Product",
      });

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist: updatedUser.wishlist || [],
      count: updatedUser.wishlist
        ? updatedUser.wishlist.length
        : 0,
    });
  } catch (error) {
    console.error("Remove wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove product from wishlist",
      error: error.message,
    });
  }
};

// ========================================
// CHECK WISHLIST
// GET /api/wishlist/check/:productId
// ========================================

export const checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id).select("wishlist");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isInWishlist = user.wishlist
      ? user.wishlist.some(
          (id) => id.toString() === productId
        )
      : false;

    return res.status(200).json({
      success: true,
      productId,
      isInWishlist,
    });
  } catch (error) {
    console.error("Check wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check wishlist",
      error: error.message,
    });
  }
};

// ========================================
// CLEAR WISHLIST
// DELETE /api/wishlist
// ========================================

export const clearWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.wishlist = [];

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
      wishlist: [],
      count: 0,
    });
  } catch (error) {
    console.error("Clear wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to clear wishlist",
      error: error.message,
    });
  }
};