import express from "express";

import {
  createProduct,
  getProducts,
  getHomeProducts,
  getTrendingProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


/* ==========================================
   HOME PRODUCTS

   GET:
   /api/products/home
========================================== */

router.get(
  "/home",
  getHomeProducts
);


/* ==========================================
   TRENDING PRODUCTS

   GET:
   /api/products/trending

   Example:
   /api/products/trending?limit=8
========================================== */

router.get(
  "/trending",
  getTrendingProducts
);


/* ==========================================
   ALL PRODUCTS

   GET:
   /api/products
========================================== */

router.get(
  "/",
  getProducts
);


/* ==========================================
   CATEGORY PRODUCTS

   GET:
   /api/products/category/t-shirts
========================================== */

router.get(
  "/category/:categorySlug",
  getProductsByCategory
);


/* ==========================================
   SINGLE PRODUCT

   GET:
   /api/products/:id
========================================== */

router.get(
  "/:id",
  getProductById
);


/* ==========================================
   CREATE PRODUCT

   POST:
   /api/products
========================================== */

router.post(
  "/",
  upload.array("images", 10),
  createProduct
);


/* ==========================================
   UPDATE PRODUCT

   PUT:
   /api/products/:id
========================================== */

router.put(
  "/:id",
  upload.array("images", 10),
  updateProduct
);


/* ==========================================
   DELETE PRODUCT

   DELETE:
   /api/products/:id
========================================== */

router.delete(
  "/:id",
  deleteProduct
);


export default router;