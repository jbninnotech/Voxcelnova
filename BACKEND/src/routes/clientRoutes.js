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
// 1. STATS (Must be above /:id)
// ==========================================
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Client API routes are working!" });
});
router.get(["/stats", "/client-stats"], getClientStats);

// ==========================================
// 2. CLIENT REVIEWS (Must be above /:id)
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
// 3. CLIENT FEEDBACKS (Must be above /:id)
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

// ==========================================
// 4. CLIENT PROJECTS / DELIVERIES (LIST & CREATE)
// ==========================================
router.get(["/", "/projects", "/client-projects"], getClientProjects);

router.post(
  ["/", "/projects", "/client-projects"],
  protect,
  adminOnly,
  projectUploadFields,
  createClientProject
);

// ==========================================
// 5. WILDCARD /:id ROUTES (MUST BE AT THE VERY BOTTOM!)
// ==========================================
router.get(["/projects/:id", "/project/:id", "/:id"], getSingleClientProject);

router.put(
  ["/projects/:id", "/client-projects/:id", "/:id"],
  protect,
  adminOnly,
  projectUploadFields,
  updateClientProject
);

router.delete(
  ["/projects/:id", "/client-projects/:id", "/:id"],
  protect,
  adminOnly,
  deleteClientProject
);

export default router;