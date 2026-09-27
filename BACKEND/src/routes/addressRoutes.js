import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/profile/addressController.js";

const router = express.Router();

// ========================================
// GET ALL ADDRESSES
// GET /api/addresses
// ========================================

router.get("/", protect, getAddresses);

// ========================================
// ADD NEW ADDRESS
// POST /api/addresses
// ========================================

router.post("/", protect, addAddress);

// ========================================
// UPDATE ADDRESS
// PUT /api/addresses/:id
// ========================================

router.put("/:id", protect, updateAddress);

// ========================================
// DELETE ADDRESS
// DELETE /api/addresses/:id
// ========================================

router.delete("/:id", protect, deleteAddress);

// ========================================
// SET DEFAULT ADDRESS
// PATCH /api/addresses/:id/default
// ========================================

router.patch("/:id/default", protect, setDefaultAddress);

export default router;