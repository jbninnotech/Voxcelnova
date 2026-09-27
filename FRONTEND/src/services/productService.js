import api from "./api";

/* ==========================================
   GET ALL PRODUCTS
========================================== */

export const getProducts = async () => {
  try {
    const response = await api.get(
      "/products"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get Products Error:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
};


/* ==========================================
   GET TRENDING PRODUCTS

   Products selected as Featured
   from Admin will appear here.
========================================== */

export const getTrendingProducts =
  async () => {
    try {
      const response = await api.get(
        "/products/trending"
      );

      return response.data;
    } catch (error) {
      console.error(
        "Get Trending Products Error:",
        error.response?.data ||
          error.message
      );

      throw error;
    }
  };


/* ==========================================
   GET PRODUCTS BY CATEGORY
========================================== */

export const getProductsByCategory =
  async (categorySlug) => {
    try {
      const response = await api.get(
        `/products/category/${categorySlug}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Get Products By Category Error:",
        error.response?.data ||
          error.message
      );

      throw error;
    }
  };


/* ==========================================
   GET SINGLE PRODUCT
========================================== */

export const getProductById =
  async (productId) => {
    try {
      const response = await api.get(
        `/products/${productId}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Get Product Error:",
        error.response?.data ||
          error.message
      );

      throw error;
    }
  };


/* ==========================================
   CREATE PRODUCT
========================================== */

export const createProduct =
  async (formData) => {
    try {
      const response = await api.post(
        "/products",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Create Product Error:",
        error.response?.data ||
          error.message
      );

      throw error;
    }
  };


/* ==========================================
   UPDATE PRODUCT
========================================== */

export const updateProduct =
  async (productId, formData) => {
    try {
      const response = await api.put(
        `/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Update Product Error:",
        error.response?.data ||
          error.message
      );

      throw error;
    }
  };


/* ==========================================
   DELETE PRODUCT
========================================== */

export const deleteProduct =
  async (productId) => {
    try {
      const response = await api.delete(
        `/products/${productId}`
      );

      return response.data;
    } catch (error) {
      console.error(
        "Delete Product Error:",
        error.response?.data ||
          error.message
      );

      throw error;
    }
  };