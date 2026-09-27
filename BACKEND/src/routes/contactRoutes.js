import express from "express";
import {
  submitInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  updateInquiryNotes,
  deleteInquiry,
} from "../controllers/contactController.js";

const router = express.Router();

// Route: /api/contact
router
  .route("/")
  .post(submitInquiry)
  .get(getAllInquiries);

// Route: /api/contact/:id
router
  .route("/:id")
  .get(getInquiryById)
  .patch(updateInquiryStatus)
  .delete(deleteInquiry);

// Specific action sub-routes
router.patch("/:id/status", updateInquiryStatus);
router.patch("/:id/notes", updateInquiryNotes);

export default router;