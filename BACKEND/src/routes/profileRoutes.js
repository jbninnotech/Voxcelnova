import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profile/profileController.js";

const router = express.Router();

// ========================================
// GET PROFILE
// GET /api/profile
// ========================================

router.get("/", protect, getProfile);

// ========================================
// UPDATE PROFILE
// PUT /api/profile
// ========================================

router.put("/", protect, updateProfile);

// ========================================
// DELETE / DEACTIVATE PROFILE
// DELETE /api/profile
// ========================================

router.delete("/", protect, deleteProfile);

export default router;