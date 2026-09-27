import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

/* =====================================================
   CLOUDINARY UPLOAD HELPER
===================================================== */

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "voxcel-nova/products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};


/* =====================================================
   DELETE IMAGE FROM CLOUDINARY
===================================================== */

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(
      "CLOUDINARY DELETE ERROR:",
      error.message
    );
  }
};


/* =====================================================
   CREATE SLUG
===================================================== */

const createSlug = (text = "") => {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};


/* =====================================================
   GENERATE UNIQUE SLUG
===================================================== */

const generateUniqueSlug = async (
  name,
  currentId = null
) => {
  const baseSlug = createSlug(name);

  let slug =
    baseSlug || `product-${Date.now()}`;

  let query = { slug };

  if (currentId) {
    query._id = {
      $ne: currentId,
    };
  }

  let exists = await Product.exists(query);

  let counter = 2;

  while (exists) {
    slug = `${baseSlug}-${counter}`;

    query = { slug };

    if (currentId) {
      query._id = {
        $ne: currentId,
      };
    }

    exists = await Product.exists(query);

    counter++;
  }

  return slug;
};


/* =====================================================
   GENERATE UNIQUE SKU
===================================================== */

const generateSKU = async (
  category = "PRODUCT"
) => {
  const prefix =
    String(category)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 4)
      .toUpperCase() || "PROD";

  let sku;
  let exists = true;

  while (exists) {
    const randomNumber =
      Math.floor(
        100000 +
          Math.random() * 900000
      );

    sku = `VN-${prefix}-${randomNumber}`;

    exists = await Product.exists({
      sku,
    });
  }

  return sku;
};


/* =====================================================
   NORMALIZE SKU
===================================================== */

const normalizeSKU = (sku) => {
  if (!sku) return "";

  return String(sku)
    .trim()
    .toUpperCase();
};


/* =====================================================
   PARSE BOOLEAN
===================================================== */

const parseBoolean = (
  value,
  defaultValue = false
) => {
  if (
    value === undefined ||
    value === null
  ) {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return (
    String(value).toLowerCase() ===
    "true"
  );
};


/* =====================================================
   PARSE ARRAYS
===================================================== */

const parseArray = (value) => {
  if (!value) {
    return [];
  }

  /* Already array */

  if (Array.isArray(value)) {
    return value;
  }

  /* JSON array */

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Ignore JSON error
  }

  /* Comma separated */

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};


/* =====================================================
   CREATE PRODUCT
===================================================== */

export const createProduct = async (
  req,
  res
) => {
  let uploadedImages = [];

  try {
    const {
      name,
      slug,
      shortDescription,
      description,
      category,
      categorySlug,
      sku,
      price,
      salePrice,
      bulkPrice,
      stock,
      minimumOrderQuantity,
      sizes,
      colors,
      material,
      fit,
      brand,
      isBulkAvailable,
      isCustomizable,
      isFeatured,
      isActive,
    } = req.body;


    /* ---------------------------------------------
       VALIDATION
    --------------------------------------------- */

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Product name and category are required",
      });
    }


    /* ---------------------------------------------
       CATEGORY SLUG
    --------------------------------------------- */

    const finalCategorySlug =
      categorySlug?.trim()
        ? categorySlug
            .trim()
            .toLowerCase()
        : createSlug(category);


    /* ---------------------------------------------
       PRODUCT SLUG
    --------------------------------------------- */

    const finalSlug =
      await generateUniqueSlug(
        slug?.trim() || name
      );


    /* ---------------------------------------------
       PRODUCT SKU
    --------------------------------------------- */

    let finalSKU =
      normalizeSKU(sku);

    if (!finalSKU) {
      finalSKU =
        await generateSKU(category);
    }


    /* ---------------------------------------------
       CHECK DUPLICATE SKU
    --------------------------------------------- */

    const existingSKU =
      await Product.findOne({
        sku: finalSKU,
      });

    if (existingSKU) {
      return res.status(409).json({
        success: false,
        message:
          "A product with this SKU already exists",
        error: {
          sku: finalSKU,
        },
      });
    }


    /* ---------------------------------------------
       UPLOAD IMAGES
    --------------------------------------------- */

    const images = [];

    if (
      req.files &&
      req.files.length > 0
    ) {
      for (const file of req.files) {
        try {
          const result =
            await uploadToCloudinary(
              file.buffer
            );

          const image = {
            url: result.secure_url,
            publicId: result.public_id,
          };

          images.push(image);

          uploadedImages.push(
            result.public_id
          );
        } catch (uploadError) {
          console.error(
            "IMAGE UPLOAD ERROR:",
            uploadError
          );

          /* Delete already uploaded images */

          for (const publicId of uploadedImages) {
            await deleteFromCloudinary(
              publicId
            );
          }

          return res.status(500).json({
            success: false,
            message:
              "Failed to upload product image",
            error:
              uploadError.message,
          });
        }
      }
    }


    /* ---------------------------------------------
       CREATE PRODUCT
    --------------------------------------------- */

    const product =
      await Product.create({
        name: name.trim(),

        slug: finalSlug,

        shortDescription:
          shortDescription?.trim() || "",

        description:
          description?.trim() || "",

        category:
          category.trim(),

        categorySlug:
          finalCategorySlug,

        sku: finalSKU,

        price:
          Number(price) || 0,

        salePrice:
          salePrice !== undefined &&
          salePrice !== ""
            ? Number(salePrice)
            : null,

        bulkPrice:
          bulkPrice !== undefined &&
          bulkPrice !== ""
            ? Number(bulkPrice)
            : null,

        stock:
          Number(stock) || 0,

        minimumOrderQuantity:
          Number(
            minimumOrderQuantity
          ) || 1,

        sizes:
          parseArray(sizes),

        colors:
          parseArray(colors),

        material:
          material?.trim() || "",

        fit:
          fit?.trim() || "",

        brand:
          brand?.trim() ||
          "VOXCEL NOVA",

        isBulkAvailable:
          parseBoolean(
            isBulkAvailable,
            false
          ),

        isCustomizable:
          parseBoolean(
            isCustomizable,
            false
          ),

        isFeatured:
          parseBoolean(
            isFeatured,
            false
          ),

        isActive:
          parseBoolean(
            isActive,
            true
          ),

        images,
      });


    /* ---------------------------------------------
       SUCCESS
    --------------------------------------------- */

    return res.status(201).json({
      success: true,
      message:
        "Product created successfully",
      product,
    });

  } catch (error) {
    console.error(
      "CREATE PRODUCT ERROR:",
      error
    );


    /* ---------------------------------------------
       DELETE CLOUDINARY IMAGES
       IF DATABASE FAILS
    --------------------------------------------- */

    if (uploadedImages.length > 0) {
      for (const publicId of uploadedImages) {
        await deleteFromCloudinary(
          publicId
        );
      }
    }


    /* ---------------------------------------------
       DUPLICATE KEY ERROR
    --------------------------------------------- */

    if (error.code === 11000) {

      if (error.keyPattern?.sku) {
        return res.status(409).json({
          success: false,
          message:
            "A product with this SKU already exists",
          error: {
            sku:
              error.keyValue?.sku,
          },
        });
      }


      if (error.keyPattern?.slug) {
        return res.status(409).json({
          success: false,
          message:
            "A product with this slug already exists",
          error: {
            slug:
              error.keyValue?.slug,
          },
        });
      }


      return res.status(409).json({
        success: false,
        message:
          "A product with duplicate information already exists",
        error:
          error.keyValue,
      });
    }


    /* ---------------------------------------------
       VALIDATION ERROR
    --------------------------------------------- */

    if (
      error.name ===
      "ValidationError"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Product validation failed",
        errors:
          Object.values(
            error.errors
          ).map(
            (err) => err.message
          ),
      });
    }


    /* ---------------------------------------------
       SERVER ERROR
    --------------------------------------------- */

    return res.status(500).json({
      success: false,
      message:
        "Failed to create product",
      error:
        error.message,
    });
  }
};


/* =====================================================
   GET ALL PRODUCTS
===================================================== */

export const getProducts = async (
  req,
  res
) => {
  try {
    const products =
      await Product.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    console.error(
      "GET PRODUCTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch products",
      error:
        error.message,
    });
  }
};


/* =====================================================
   GET HOME PRODUCTS

   Active products with stock

   Featured products first
   Latest products after that

   Example:
   GET /api/products/home

   GET /api/products/home?limit=8
===================================================== */

export const getHomeProducts = async (
  req,
  res
) => {
  try {

    const limit = Math.min(
      Math.max(
        Number(req.query.limit) || 8,
        1
      ),
      50
    );


    const products =
      await Product.find({
        isActive: true,
        stock: {
          $gt: 0,
        },
      })
        .sort({
          isFeatured: -1,
          createdAt: -1,
        })
        .limit(limit)
        .lean();


    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    console.error(
      "GET HOME PRODUCTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch home products",
      error:
        error.message,
    });
  }
};


/* =====================================================
   GET PRODUCTS BY CATEGORY
===================================================== */

export const getProductsByCategory =
  async (req, res) => {
    try {

      const {
        categorySlug,
      } = req.params;


      if (!categorySlug) {
        return res.status(400).json({
          success: false,
          message:
            "Category slug is required",
        });
      }


      const products =
        await Product.find({
          categorySlug:
            categorySlug
              .trim()
              .toLowerCase(),

          isActive: true,
        })
          .sort({
            createdAt: -1,
          })
          .lean();


      return res.status(200).json({
        success: true,

        category:
          categorySlug
            .trim()
            .toLowerCase(),

        count:
          products.length,

        products,
      });

    } catch (error) {
      console.error(
        "GET CATEGORY PRODUCTS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch category products",
        error:
          error.message,
      });
    }
  };


/* =====================================================
   GET SINGLE PRODUCT
===================================================== */

export const getProductById =
  async (req, res) => {
    try {

      const {
        id,
      } = req.params;


      const product =
        await Product.findById(id)
          .lean();


      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }


      return res.status(200).json({
        success: true,
        product,
      });

    } catch (error) {
      console.error(
        "GET PRODUCT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch product",
        error:
          error.message,
      });
    }
  };


/* =====================================================
   UPDATE PRODUCT
===================================================== */

export const updateProduct =
  async (req, res) => {

    let uploadedImages = [];

    try {

      const {
        id,
      } = req.params;


      const product =
        await Product.findById(id);


      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }


      const {
        name,
        slug,
        shortDescription,
        description,
        category,
        categorySlug,
        sku,
        price,
        salePrice,
        bulkPrice,
        stock,
        minimumOrderQuantity,
        sizes,
        colors,
        material,
        fit,
        brand,
        isBulkAvailable,
        isCustomizable,
        isFeatured,
        isActive,
      } = req.body;


      /* ---------------------------------------------
         BASIC DATA
      --------------------------------------------- */

      if (name !== undefined) {
        product.name =
          name.trim();
      }


      if (
        shortDescription !==
        undefined
      ) {
        product.shortDescription =
          shortDescription.trim();
      }


      if (
        description !==
        undefined
      ) {
        product.description =
          description.trim();
      }


      if (category !== undefined) {
        product.category =
          category.trim();
      }


      if (
        categorySlug !==
        undefined
      ) {
        product.categorySlug =
          categorySlug
            .trim()
            .toLowerCase();
      }


      /* ---------------------------------------------
         SLUG
      --------------------------------------------- */

      if (
        slug !== undefined ||
        name !== undefined
      ) {

        const slugSource =
          slug?.trim() ||
          product.name;


        product.slug =
          await generateUniqueSlug(
            slugSource,
            product._id
          );
      }


      /* ---------------------------------------------
         SKU
      --------------------------------------------- */

      if (sku !== undefined) {

        const newSKU =
          normalizeSKU(sku);


        if (!newSKU) {

          product.sku =
            await generateSKU(
              product.category
            );

        } else if (
          newSKU !== product.sku
        ) {

          const existingSKU =
            await Product.findOne({
              sku: newSKU,

              _id: {
                $ne: product._id,
              },
            });


          if (existingSKU) {
            return res.status(409).json({
              success: false,
              message:
                "A product with this SKU already exists",
              error: {
                sku: newSKU,
              },
            });
          }


          product.sku =
            newSKU;
        }
      }


      /* ---------------------------------------------
         PRICE
      --------------------------------------------- */

      if (price !== undefined) {
        product.price =
          Number(price) || 0;
      }


      if (
        salePrice !==
        undefined
      ) {
        product.salePrice =
          salePrice === ""
            ? null
            : Number(salePrice);
      }


      if (
        bulkPrice !==
        undefined
      ) {
        product.bulkPrice =
          bulkPrice === ""
            ? null
            : Number(bulkPrice);
      }


      /* ---------------------------------------------
         STOCK
      --------------------------------------------- */

      if (stock !== undefined) {
        product.stock =
          Number(stock) || 0;
      }


      if (
        minimumOrderQuantity !==
        undefined
      ) {
        product.minimumOrderQuantity =
          Number(
            minimumOrderQuantity
          ) || 1;
      }


      /* ---------------------------------------------
         ARRAYS
      --------------------------------------------- */

      if (sizes !== undefined) {
        product.sizes =
          parseArray(sizes);
      }


      if (colors !== undefined) {
        product.colors =
          parseArray(colors);
      }


      /* ---------------------------------------------
         OTHER DATA
      --------------------------------------------- */

      if (
        material !==
        undefined
      ) {
        product.material =
          material.trim();
      }


      if (
        fit !== undefined
      ) {
        product.fit =
          fit.trim();
      }


      if (
        brand !== undefined
      ) {
        product.brand =
          brand.trim();
      }


      if (
        isBulkAvailable !==
        undefined
      ) {
        product.isBulkAvailable =
          parseBoolean(
            isBulkAvailable
          );
      }


      if (
        isCustomizable !==
        undefined
      ) {
        product.isCustomizable =
          parseBoolean(
            isCustomizable
          );
      }


      if (
        isFeatured !==
        undefined
      ) {
        product.isFeatured =
          parseBoolean(
            isFeatured
          );
      }


      if (
        isActive !==
        undefined
      ) {
        product.isActive =
          parseBoolean(
            isActive,
            true
          );
      }


      /* ---------------------------------------------
         UPLOAD NEW IMAGES
      --------------------------------------------- */

      if (
        req.files &&
        req.files.length > 0
      ) {

        const newImages = [];


        for (
          const file of req.files
        ) {

          try {

            const result =
              await uploadToCloudinary(
                file.buffer
              );


            const image = {
              url:
                result.secure_url,

              publicId:
                result.public_id,
            };


            newImages.push(
              image
            );


            uploadedImages.push(
              result.public_id
            );

          } catch (
            uploadError
          ) {

            console.error(
              "UPDATE IMAGE UPLOAD ERROR:",
              uploadError
            );


            for (
              const publicId of
              uploadedImages
            ) {
              await deleteFromCloudinary(
                publicId
              );
            }


            return res.status(500).json({
              success: false,
              message:
                "Failed to upload new product image",
              error:
                uploadError.message,
            });
          }
        }


        product.images = [
          ...(product.images || []),
          ...newImages,
        ];
      }


      /* ---------------------------------------------
         SAVE
      --------------------------------------------- */

      await product.save();


      return res.status(200).json({
        success: true,
        message:
          "Product updated successfully",
        product,
      });

    } catch (error) {

      console.error(
        "UPDATE PRODUCT ERROR:",
        error
      );


      /* ---------------------------------------------
         CLEAN CLOUDINARY
      --------------------------------------------- */

      if (
        uploadedImages.length > 0
      ) {

        for (
          const publicId of
          uploadedImages
        ) {

          await deleteFromCloudinary(
            publicId
          );
        }
      }


      /* ---------------------------------------------
         DUPLICATE KEY
      --------------------------------------------- */

      if (error.code === 11000) {

        if (
          error.keyPattern?.sku
        ) {

          return res.status(409).json({
            success: false,
            message:
              "A product with this SKU already exists",

            error: {
              sku:
                error.keyValue?.sku,
            },
          });
        }


        if (
          error.keyPattern?.slug
        ) {

          return res.status(409).json({
            success: false,
            message:
              "A product with this slug already exists",

            error: {
              slug:
                error.keyValue?.slug,
            },
          });
        }
      }


      /* ---------------------------------------------
         VALIDATION
      --------------------------------------------- */

      if (
        error.name ===
        "ValidationError"
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Product validation failed",

          errors:
            Object.values(
              error.errors
            ).map(
              (err) =>
                err.message
            ),
        });
      }


      return res.status(500).json({
        success: false,
        message:
          "Failed to update product",
        error:
          error.message,
      });
    }
  };


/* =====================================================
   DELETE PRODUCT
===================================================== */

export const deleteProduct =
  async (req, res) => {

    try {

      const {
        id,
      } = req.params;


      const product =
        await Product.findById(id);


      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }


      /* ---------------------------------------------
         DELETE CLOUDINARY IMAGES
      --------------------------------------------- */

      if (
        product.images &&
        product.images.length > 0
      ) {

        for (
          const image of
          product.images
        ) {

          if (
            image &&
            typeof image ===
              "object" &&
            image.publicId
          ) {

            await deleteFromCloudinary(
              image.publicId
            );
          }
        }
      }


      /* ---------------------------------------------
         DELETE DATABASE RECORD
      --------------------------------------------- */

      await Product.findByIdAndDelete(
        id
      );


      return res.status(200).json({
        success: true,
        message:
          "Product deleted successfully",
      });

    } catch (error) {

      console.error(
        "DELETE PRODUCT ERROR:",
        error
      );


      return res.status(500).json({
        success: false,
        message:
          "Failed to delete product",
        error:
          error.message,
      });
    }
  };


  /* ==========================================
   GET TRENDING PRODUCTS
   GET /api/products/trending
========================================== */

export const getTrendingProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      isActive: true,
      isFeatured: true,
    })
      .sort({
        createdAt: -1,
      })
      .limit(8);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(
      "Get Trending Products Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch trending products",
      error: error.message,
    });
  }
};