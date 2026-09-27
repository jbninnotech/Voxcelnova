import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// =========================================================
// ROUTES
// =========================================================

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import profileRoutes from "./routes/profileRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Careers
import careerRoutes from "./routes/careerRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

// Contact / Bulk Inquiries (NEW)
import contactRoutes from "./routes/contactRoutes.js";

import customizationRoutes from "./routes/customizationRoutes.js";

// =========================================================
// MIDDLEWARE
// =========================================================

import errorMiddleware from "./middleware/errorMiddleware.js";


// =========================================================
// APP
// =========================================================

const app = express();


// =========================================================
// FILE PATH
// =========================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// =========================================================
// CORS
// =========================================================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


// =========================================================
// BODY PARSERS
// =========================================================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);


// =========================================================
// STATIC UPLOADS
// =========================================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// =========================================================
// HOME ROUTE
// =========================================================

app.get(
  "/",
  (req, res) => {
    res.status(200).json({
      success: true,

      message:
        "Clothing Manufacturing Backend API is running",

      version: "1.0.0",

      endpoints: {
        auth: "/api/auth",
        users: "/api/users",
        products: "/api/products",
        profile: "/api/profile",
        addresses: "/api/addresses",
        wishlist: "/api/wishlist",
        password: "/api/password",
        orders: "/api/orders",

        careers: "/api/careers",
        applications: "/api/applications",

        contact: "/api/contact", // <-- Added Contact Endpoint
      },
    });
  }
);


// =========================================================
// AUTH ROUTES
// =========================================================

app.use(
  "/api/auth",
  authRoutes
);


// =========================================================
// USER ROUTES
// =========================================================

app.use(
  "/api/users",
  userRoutes
);


// =========================================================
// PRODUCT ROUTES
// =========================================================

app.use(
  "/api/products",
  productRoutes
);


// =========================================================
// CUSTOMER PROFILE
// =========================================================

app.use(
  "/api/profile",
  profileRoutes
);


// =========================================================
// CUSTOMER ADDRESSES
// =========================================================

app.use(
  "/api/addresses",
  addressRoutes
);


// =========================================================
// WISHLIST
// =========================================================

app.use(
  "/api/wishlist",
  wishlistRoutes
);


// =========================================================
// PASSWORD
// =========================================================

app.use(
  "/api/password",
  passwordRoutes
);


// =========================================================
// ORDERS
// =========================================================

app.use(
  "/api/orders",
  orderRoutes
);


// =========================================================
// CAREERS
// =========================================================

app.use(
  "/api/careers",
  careerRoutes
);


// =========================================================
// JOB APPLICATIONS
// =========================================================

app.use(
  "/api/applications",
  applicationRoutes
);

app.use("/api/customizations", customizationRoutes);

// =========================================================
// CONTACT & BULK INQUIRIES (NEW)
// =========================================================
//
// Public:
// POST /api/contact       - Submit bulk order inquiry
//
// Admin / Internal:
// GET  /api/contact       - View all received inquiries
//
// =========================================================

app.use(
  "/api/contact",
  contactRoutes
);


// =========================================================
// 404 ROUTE
// =========================================================

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,

      message: "Route not found.",

      path: req.originalUrl,
    });
  }
);


// =========================================================
// GLOBAL ERROR HANDLER
// =========================================================

app.use(
  errorMiddleware
);


// =========================================================
// EXPORT
// =========================================================

export default app;