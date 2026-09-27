import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    /* ==========================================
       BASIC PRODUCT INFORMATION
    ========================================== */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },

    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },

    shortDescription: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },


    /* ==========================================
       CATEGORY
    ========================================== */

    category: {
      type: String,
      required: true,
      trim: true,
    },

    categorySlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },


    /* ==========================================
       PRICE
    ========================================== */

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    salePrice: {
      type: Number,
      default: null,
      min: 0,
    },

    bulkPrice: {
      type: Number,
      default: null,
      min: 0,
    },


    /* ==========================================
       STOCK
    ========================================== */

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    minimumOrderQuantity: {
      type: Number,
      default: 1,
      min: 1,
    },


    /* ==========================================
       CLOTHING DETAILS
    ========================================== */

    sizes: {
      type: [String],
      default: [],
    },

    colors: {
      type: [String],
      default: [],
    },

    material: {
      type: String,
      default: "",
      trim: true,
    },

    fit: {
      type: String,
      default: "",
      trim: true,
    },

    brand: {
      type: String,
      default: "VOXCEL NOVA",
      trim: true,
    },


    /* ==========================================
       PRODUCT IMAGES
    ========================================== */

    images: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },
      },
    ],

    thumbnail: {
      type: String,
      default: null,
    },


    /* ==========================================
       BUSINESS OPTIONS
    ========================================== */

    isBulkAvailable: {
      type: Boolean,
      default: false,
    },

    isCustomizable: {
      type: Boolean,
      default: false,
    },


    /* ==========================================
       HOME PAGE CONTROLS
    ========================================== */

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);


/* ==========================================
   INDEXES
========================================== */

productSchema.index({
  isTrending: 1,
  isActive: 1,
  createdAt: -1,
});

productSchema.index({
  isFeatured: 1,
  isActive: 1,
  createdAt: -1,
});

productSchema.index({
  categorySlug: 1,
  isActive: 1,
});


export default mongoose.model(
  "Product",
  productSchema
);