import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  changePassword,
} from "../controllers/profile/passwordController.js";

const router = express.Router();

// Change password
router.put(
  "/change",
  protect,
  changePassword
);

export default router;