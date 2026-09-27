import express from "express";

import {
  getAllUsers,
  getUserById,
  updateUserRole,
  toggleUserStatus,
} from "../controllers/userController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// =========================================================
// ADMIN USER MANAGEMENT
// =========================================================

// Get all registered users
router.get(
  "/",
  protect,
  adminOnly,
  getAllUsers
);

// Get one user
router.get(
  "/:id",
  protect,
  adminOnly,
  getUserById
);

// Update role
router.put(
  "/:id/role",
  protect,
  adminOnly,
  updateUserRole
);

// Activate / deactivate
router.put(
  "/:id/status",
  protect,
  adminOnly,
  toggleUserStatus
);

export default router;