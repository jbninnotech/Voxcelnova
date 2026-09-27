import express from "express";
import multer from "multer";
import path from "path";
import {
  submitCustomization,
  getAllCustomizations,
  getCustomizationById,
  updateCustomizationStatus,
  updateCustomizationNotes,
  deleteCustomization,
} from "../controllers/customizationController.js";

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const uploadFields = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "design", maxCount: 1 },
  { name: "sizeChart", maxCount: 1 },
]);

// Public Form Submission Route
router.post("/", uploadFields, submitCustomization);

// Admin Routes
router.get("/", getAllCustomizations);
router.get("/:id", getCustomizationById);
router.patch("/:id/status", updateCustomizationStatus);
router.patch("/:id/notes", updateCustomizationNotes);
router.delete("/:id", deleteCustomization);

export default router;