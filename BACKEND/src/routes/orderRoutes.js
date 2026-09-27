import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  validateCoupon,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Coupon validation (Public / Protected)
router.post("/validate-coupon", validateCoupon);

// User Order routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);

// Admin Order routes
router.get("/admin/all", protect, adminOnly, getAllOrders);
router.patch("/admin/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
