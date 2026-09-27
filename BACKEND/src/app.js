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

// Contact / Bulk Inquiries
import contactRoutes from "./routes/contactRoutes.js";

// Customizations
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

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin
      // Example: Postman, mobile apps, server-to-server
      if (!origin) {
        return callback(null, true);
      }

      // Allow all origins if CLIENT_URL is *
      if (process.env.CLIENT_URL === "*") {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
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
// ROOT / HOME ROUTE
// =========================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,

    message:
      "Voxcelnova Clothing Manufacturing Backend API is running",

    version: "1.0.0",

    environment:
      process.env.NODE_ENV || "development",

    endpoints: {
      health: "/api",

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

      contact: "/api/contact",

      customizations: "/api/customizations",
    },
  });
});

// =========================================================
// API HEALTH CHECK
// =========================================================

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Voxcelnova API is running",
    version: "1.0.0",
    environment:
      process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

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

// =========================================================
// CUSTOMIZATIONS
// =========================================================

app.use(
  "/api/customizations",
  customizationRoutes
);

// =========================================================
// CONTACT & BULK INQUIRIES
// =========================================================

app.use(
  "/api/contact",
  contactRoutes
);

// =========================================================
// 404 ROUTE
// =========================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
    path: req.originalUrl,
  });
});

// =========================================================
// GLOBAL ERROR HANDLER
// =========================================================

app.use(errorMiddleware);

// =========================================================
// EXPORT
// =========================================================

export default app;