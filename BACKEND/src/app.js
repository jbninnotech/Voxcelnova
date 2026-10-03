import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Careers & Applications
import careerRoutes from "./routes/careerRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

// Contact & Customizations
import contactRoutes from "./routes/contactRoutes.js";
import customizationRoutes from "./routes/customizationRoutes.js";

// Clients, Projects & Reviews
import clientRoutes from "./routes/clientRoutes.js";

// Reports & Dashboard
import dashboardRoutes from "./routes/dashboardRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

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
      if (!origin) return callback(null, true);
      if (process.env.CLIENT_URL === "*") return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// =========================================================
// BODY PARSERS
// =========================================================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// =========================================================
// STATIC UPLOADS
// =========================================================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================================================
// ROOT & HEALTH CHECK
// =========================================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Voxcelnova Clothing Manufacturing Backend API is running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Voxcelnova API is running",
    timestamp: new Date().toISOString(),
  });
});

// =========================================================
// API ROUTE REGISTRATIONS
// =========================================================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/customizations", customizationRoutes);
app.use("/api/contact", contactRoutes);

// CLIENTS, PROJECTS & REVIEWS
app.use("/api/clients", clientRoutes);

// REPORTS & DASHBOARD
app.use("/api/reports", dashboardRoutes);
app.use("/api/dashboard", dashboardRoutes);

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

export default app;