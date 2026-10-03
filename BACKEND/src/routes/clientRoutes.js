import express from "express";
import {
  getClientProjects,
  getSingleClientProject,
  getClientReviews,
  getClientStats,
  submitClientReview,
  createClientProject,
  updateClientProject,
  deleteClientProject,
  adminCreateClientReview,
  toggleReviewApproval,
  deleteClientReview,
  getClientFeedbacks,
  createClientFeedback,
  toggleFeedbackPublication,
  deleteClientFeedback,
} from "../controllers/clientController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Multi-field upload configurations
const projectUploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "clientLogo", maxCount: 1 },
  { name: "gallery", maxCount: 6 },
]);

const reviewUploadFields = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "companyLogo", maxCount: 1 },
]);

// ==========================================
// 0. QUICK TEST (To verify routes in browser)
// ==========================================
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Client API routes are working!" });
});

// ==========================================
// 1. STATS
// ==========================================
router.get(["/stats", "/client-stats"], getClientStats);

// ==========================================
// 2. DELIVERIES & CLIENT PROJECTS
// ==========================================
router.get(["/", "/projects", "/client-projects"], getClientProjects);
router.get(["/project/:id", "/projects/:id", "/:id"], getSingleClientProject);

router.post(
  ["/", "/projects", "/client-projects"],
  protect,
  adminOnly,
  projectUploadFields,
  createClientProject
);

router.put(
  ["/:id", "/projects/:id", "/client-projects/:id"],
  protect,
  adminOnly,
  projectUploadFields,
  updateClientProject
);

router.delete(
  ["/:id", "/projects/:id", "/client-projects/:id"],
  protect,
  adminOnly,
  deleteClientProject
);

// ==========================================
// 3. CLIENT REVIEWS
// ==========================================
router.get(["/reviews", "/client-reviews"], getClientReviews);

router.post(
  ["/reviews", "/client-reviews"],
  upload.single("avatar"),
  submitClientReview
);

router.post(
  ["/admin/reviews", "/reviews/admin", "/client-reviews/admin"],
  protect,
  adminOnly,
  reviewUploadFields,
  adminCreateClientReview
);

router.patch(
  ["/reviews/:id/approve", "/client-reviews/:id/approve"],
  protect,
  adminOnly,
  toggleReviewApproval
);

router.delete(
  ["/reviews/:id", "/client-reviews/:id"],
  protect,
  adminOnly,
  deleteClientReview
);

// ==========================================
// 4. CLIENT FEEDBACKS
// ==========================================
router.get(["/feedbacks", "/feedback", "/client-feedbacks", "/client-feedback"], getClientFeedbacks);

router.post(
  ["/feedbacks", "/feedback", "/client-feedbacks", "/client-feedback"],
  protect,
  adminOnly,
  upload.single("avatar"),
  createClientFeedback
);

router.patch(
  ["/feedbacks/:id/publish", "/feedback/:id/publish", "/client-feedbacks/:id/publish"],
  protect,
  adminOnly,
  toggleFeedbackPublication
);

router.delete(
  ["/feedbacks/:id", "/feedback/:id", "/client-feedbacks/:id"],
  protect,
  adminOnly,
  deleteClientFeedback
);

export default router;