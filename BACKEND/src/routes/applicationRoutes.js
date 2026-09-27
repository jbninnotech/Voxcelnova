import express from "express";

import {
  applyForJob,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationStats,
} from "../controllers/applicationController.js";

import resumeUpload from "../middleware/resumeUpload.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ============================================================
// PUBLIC
// ============================================================

router.post(
  "/apply",
  resumeUpload.single("resume"),
  applyForJob
);

// ============================================================
// ADMIN
// ============================================================

router.get(
  "/admin/stats",
  protect,
  adminOnly,
  getApplicationStats
);

router.get(
  "/admin",
  protect,
  adminOnly,
  getAllApplications
);

router.get(
  "/admin/:id",
  protect,
  adminOnly,
  getApplicationById
);

router.patch(
  "/admin/:id",
  protect,
  adminOnly,
  updateApplication
);

router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteApplication
);

export default router;