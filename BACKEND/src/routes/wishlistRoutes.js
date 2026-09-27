import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/profile/wishlistController.js";

const router = express.Router();

// Get wishlist
router.get("/", protect, getWishlist);

// Add product to wishlist
router.post("/:productId", protect, addToWishlist);

// Remove product from wishlist
router.delete("/:productId", protect, removeFromWishlist);

export default router;