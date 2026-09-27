import express from "express";

import {
  getActiveJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getAllJobsAdmin,
} from "../controllers/careerController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================================================
// PUBLIC
// =========================================================

// GET /api/careers
router.get("/", getActiveJobs);

// GET /api/careers/:id
router.get("/:id", getJobById);

// =========================================================
// ADMIN
// =========================================================

// GET /api/careers/admin/all
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllJobsAdmin
);

// POST /api/careers
router.post(
  "/",
  protect,
  adminOnly,
  createJob
);

// PUT /api/careers/:id
router.put(
  "/:id",
  protect,
  adminOnly,
  updateJob
);

// DELETE /api/careers/:id
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteJob
);

export default router;