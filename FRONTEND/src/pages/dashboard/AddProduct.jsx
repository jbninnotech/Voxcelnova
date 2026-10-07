import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiSave,
  FiPackage,
  FiDollarSign,
  FiTag,
  FiTrendingUp,
  FiCheck,
  FiLayers,
} from "react-icons/fi";

import ProductImageUpload from "../../components/dashboard/ProductImageUpload";
import { createProduct } from "../../services/productService";

/* =========================================================
   PRODUCT CATEGORIES
========================================================= */
const categories = [
  { name: "T-Shirts", slug: "t-shirts" },
  { name: "Shirts", slug: "shirts" },
  { name: "Polo T-Shirts", slug: "polo-t-shirts" },
  { name: "Hoodies & Sweatshirts", slug: "hoodies-sweatshirts" },
  { name: "blazers", slug: " blazers" },
  { name: "blazers-kids", slug: " blazers-kids" },
  { name: "School Uniforms", slug: "school-uniforms" },
  { name: "College Uniforms", slug: "college-uniforms" },
  { name: "Corporate Uniforms", slug: "corporate-uniforms" },
  { name: "Hospital Uniforms", slug: "hospital-uniforms" },
  { name: "Hotel & Hospitality Uniforms", slug: "hotel-hospitality" },
  { name: "Sportswear", slug: "sportswear" },
  { name: "Custom Printed Clothing", slug: "custom-printed-clothing" },
  { name: "Bulk Orders", slug: "bulk-orders" },
  { name: "Industrial Safety Uniforms", slug: "industrial-safety-uniforms" },
  { name: "Custom Manufacturing", slug: "custom-manufacturing" },
];

/* =========================================================
   AVAILABLE SIZES
========================================================= */
const sizesList = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export default function AddProduct() {
  const navigate = useNavigate();

  /* =======================================================
     FORM STATE
  ======================================================= */
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    categorySlug: "",
    sku: "",
    price: "",
    salePrice: "",
    stock: "",
    material: "",
    brand: "VOXCL NOVA",
    colors: "",
    isFeatured: false,
    isTrending: false,
  });

  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =======================================================
     HANDLERS
  ======================================================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const slug = e.target.value;
    const selected = categories.find((cat) => cat.slug === slug);

    setForm((prev) => ({
      ...prev,
      categorySlug: slug,
      category: selected?.name || "",
    }));
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  /* =======================================================
     FORM SUBMIT
  ======================================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!form.categorySlug) {
      setError("Please select a category.");
      return;
    }

    if (form.price === "" || Number(form.price) < 0) {
      setError("Please enter a valid product price.");
      return;
    }

    if (form.salePrice !== "" && Number(form.salePrice) > Number(form.price)) {
      setError("Sale price should not be greater than regular price.");
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one product image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());
      formData.append("category", form.category);
      formData.append("categorySlug", form.categorySlug);

      if (form.sku.trim()) formData.append("sku", form.sku.trim());
      formData.append("price", form.price);
      if (form.salePrice !== "") formData.append("salePrice", form.salePrice);
      formData.append("stock", form.stock || "0");

      formData.append("sizes", JSON.stringify(sizes));

      const colorsArray = form.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      formData.append("colors", JSON.stringify(colorsArray));

      formData.append("material", form.material.trim());
      formData.append("brand", form.brand.trim());

      formData.append("isFeatured", String(form.isFeatured));
      formData.append("isTrending", String(form.isTrending));

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await createProduct(formData);

      if (response?.success) {
        setSuccess("Product added successfully! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard/products");
        }, 1200);
      } else {
        setError(response?.message || "Failed to create product.");
      }
    } catch (err) {
      console.error("ADD PRODUCT ERROR:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Something went wrong while adding the product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-product-wrapper">
      {/* SCOPED DESIGN SYSTEM STYLES & ANIMATIONS */}
      <style>{`
        :root {
          --bg-main: #F4F8FE;
          --bg-surface: #FFFFFF;
          --bg-badge-tint: #E8F5FE;
          --color-cobalt: #0052FF;
          --color-cobalt-hover: #003ECC;
          --color-cyan: #00D4FF;
          --text-title: #071838;
          --text-body: #495E7C;
          --text-muted: #6B82A0;
          --border-subtle: rgba(0, 82, 255, 0.14);
          --border-hover: rgba(0, 212, 255, 0.60);
          --shadow-card: 0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow: 0 8px 25px rgba(0, 82, 255, 0.32);
        }

        .admin-product-wrapper {
          min-height: 100vh;
          background-color: var(--bg-main);
          color: var(--text-body);
          padding: 32px 24px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          animation: pageFadeIn 0.35s ease-out;
        }

        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .btn-back-nav {
          background: var(--bg-surface);
          color: var(--color-cobalt);
          border: 1.5px solid var(--border-subtle);
          padding: 9px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 13px;
          box-shadow: var(--shadow-card);
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          margin-bottom: 14px;
        }
        .btn-back-nav:hover {
          background: var(--bg-badge-tint);
          border-color: var(--border-hover);
          color: var(--color-cobalt-hover);
          transform: translateX(-3px);
        }

        /* Card Section Styles */
        .admin-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 22px;
          box-shadow: var(--shadow-card);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .admin-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 16px 36px rgba(0, 82, 255, 0.08);
        }

        .admin-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .admin-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--bg-badge-tint);
          color: var(--color-cobalt);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border: 1px solid var(--border-subtle);
        }

        /* Inputs & Form Controls */
        .admin-form-group {
          margin-bottom: 18px;
        }
        .admin-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-title);
          margin-bottom: 7px;
        }
        .admin-input {
          width: 100%;
          height: 46px;
          border-radius: 12px;
          border: 1.5px solid var(--border-subtle);
          background: #FFFFFF;
          color: var(--text-title);
          padding: 0 16px;
          font-size: 14px;
          transition: all 0.2s ease;
          outline: none;
          box-sizing: border-box;
        }
        .admin-input:focus {
          border-color: var(--color-cobalt);
          box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.12);
        }
        .admin-input::placeholder {
          color: var(--text-muted);
          opacity: 0.8;
        }

        .admin-textarea {
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid var(--border-subtle);
          background: #FFFFFF;
          color: var(--text-title);
          padding: 12px 16px;
          font-size: 14px;
          transition: all 0.2s ease;
          outline: none;
          resize: vertical;
          box-sizing: border-box;
        }
        .admin-textarea:focus {
          border-color: var(--color-cobalt);
          box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.12);
        }

        /* Size Chips */
        .size-chip-button {
          min-width: 50px;
          height: 42px;
          border-radius: 10px;
          border: 1.5px solid var(--border-subtle);
          background: #FAFDFE;
          color: var(--text-body);
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .size-chip-button:hover {
          border-color: var(--color-cobalt);
          color: var(--color-cobalt);
          background: var(--bg-badge-tint);
        }
        .size-chip-button.active {
          background: var(--color-cobalt);
          color: #FFFFFF;
          border-color: var(--color-cobalt);
          box-shadow: var(--shadow-glow);
          transform: translateY(-2px);
        }

        /* Interactive Toggle Cards */
        .visibility-toggle-card {
          cursor: pointer;
          background: #FAFDFE;
          border: 1.5px solid var(--border-subtle);
          border-radius: 16px;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: all 0.25s ease;
          margin-bottom: 12px;
        }
        .visibility-toggle-card:hover {
          border-color: var(--border-hover);
        }
        .visibility-toggle-card.active {
          background: var(--bg-badge-tint);
          border-color: var(--color-cobalt);
          box-shadow: 0 6px 18px rgba(0, 82, 255, 0.08);
        }

        .switch-indicator {
          width: 44px;
          height: 24px;
          background: #CBD5E1;
          border-radius: 999px;
          padding: 2.5px;
          display: flex;
          align-items: center;
          transition: all 0.25s ease;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .switch-indicator.checked {
          background: var(--color-cobalt);
        }
        .switch-knob {
          width: 19px;
          height: 19px;
          background: #FFFFFF;
          border-radius: 50%;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }
        .switch-indicator.checked .switch-knob {
          transform: translateX(20px);
        }

        /* Action Buttons */
        .btn-submit-action {
          width: 100%;
          height: 48px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cobalt-hover) 100%);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: var(--shadow-glow);
          transition: all 0.25s ease;
        }
        .btn-submit-action:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 82, 255, 0.45);
          filter: brightness(1.05);
        }

        .btn-cancel-action {
          width: 100%;
          height: 46px;
          margin-top: 10px;
          border: 1.5px solid var(--border-subtle);
          border-radius: 12px;
          background: #FFFFFF;
          color: var(--text-body);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-cancel-action:hover {
          background: var(--bg-badge-tint);
          color: var(--color-cobalt);
        }

        /* Layout Grid */
        .product-grid-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 390px;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 1080px) {
          .product-grid-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container-fluid" style={{ maxWidth: "1380px" }}>
        {/* =================================================
            HEADER
        ================================================= */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/products")}
            className="btn-back-nav"
          >
            <FiArrowLeft /> Back to Catalog
          </button>

          <div
            style={{
              color: "var(--color-cobalt)",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Catalog Inventory
          </div>

          <h1
            className="fw-bold mb-1"
            style={{ fontSize: "28px", color: "var(--text-title)" }}
          >
            Add New Clothing Product
          </h1>
          <p className="mb-0" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Configure production details, commercial pricing, sizes, and showcase images.
          </p>
        </div>

        {/* ALERTS */}
        {error && (
          <div
            className="alert d-flex align-items-center mb-4"
            style={{
              background: "#FFF1F2",
              border: "1.5px solid rgba(225, 29, 72, 0.25)",
              color: "#E11D48",
              borderRadius: "14px",
              padding: "14px 18px",
              fontWeight: "600",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="alert d-flex align-items-center mb-4"
            style={{
              background: "#ECFDF5",
              border: "1.5px solid rgba(16, 185, 129, 0.25)",
              color: "#059669",
              borderRadius: "14px",
              padding: "14px 18px",
              fontWeight: "600",
            }}
          >
            {success}
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}
        <form onSubmit={handleSubmit}>
          <div className="product-grid-layout">
            {/* LEFT COLUMN */}
            <div>
              {/* BASIC INFORMATION */}
              <section className="admin-card">
                <div className="admin-card-header">
                  <div className="admin-icon-box">
                    <FiPackage />
                  </div>
                  <div>
                    <h3
                      className="fw-bold mb-0"
                      style={{ fontSize: "17px", color: "var(--text-title)" }}
                    >
                      General Information
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "13px", color: "var(--text-muted)" }}
                    >
                      Core product name, description, category, and SKU
                    </p>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Heavyweight Cotton Oversized Tee"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Product Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe material composition, garment fit, stitching details..."
                    className="admin-textarea"
                  />
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="admin-label">Product Category *</label>
                    <select
                      value={form.categorySlug}
                      onChange={handleCategoryChange}
                      className="admin-input"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="admin-label">Stock Keeping Unit (SKU)</label>
                    <input
                      type="text"
                      name="sku"
                      value={form.sku}
                      onChange={handleChange}
                      placeholder="e.g. VN-TEE-001"
                      className="admin-input"
                    />
                  </div>
                </div>
              </section>

              {/* PRICING & INVENTORY */}
              <section className="admin-card">
                <div className="admin-card-header">
                  <div className="admin-icon-box">
                    <FiDollarSign />
                  </div>
                  <div>
                    <h3
                      className="fw-bold mb-0"
                      style={{ fontSize: "17px", color: "var(--text-title)" }}
                    >
                      Pricing & Stock Inventory
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "13px", color: "var(--text-muted)" }}
                    >
                      Wholesale base price, promotional offer, and warehouse stock
                    </p>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label className="admin-label">Regular Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="999"
                      min="0"
                      className="admin-input"
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="admin-label">Sale / Offer Price (₹)</label>
                    <input
                      type="number"
                      name="salePrice"
                      value={form.salePrice}
                      onChange={handleChange}
                      placeholder="799"
                      min="0"
                      className="admin-input"
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="admin-label">Stock Units</label>
                    <input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      placeholder="100"
                      min="0"
                      className="admin-input"
                    />
                  </div>
                </div>
              </section>

              {/* ATTRIBUTES & SPECIFICATIONS */}
              <section className="admin-card">
                <div className="admin-card-header">
                  <div className="admin-icon-box">
                    <FiTag />
                  </div>
                  <div>
                    <h3
                      className="fw-bold mb-0"
                      style={{ fontSize: "17px", color: "var(--text-title)" }}
                    >
                      Product Specifications
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "13px", color: "var(--text-muted)" }}
                    >
                      Available sizing, colorways, fabric material, and brand tags
                    </p>
                  </div>
                </div>

                {/* SIZES */}
                <div className="admin-form-group">
                  <label className="admin-label">Available Sizing Options</label>
                  <div className="d-flex flex-wrap gap-2">
                    {sizesList.map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`size-chip-button ${
                          sizes.includes(size) ? "active" : ""
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* COLORS */}
                <div className="admin-form-group">
                  <label className="admin-label">Color Variations</label>
                  <input
                    type="text"
                    name="colors"
                    value={form.colors}
                    onChange={handleChange}
                    placeholder="e.g. Jet Black, Heather Grey, Royal Navy"
                    className="admin-input"
                  />
                  <small style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "4px", display: "block" }}>
                    Separate color names using commas.
                  </small>
                </div>

                {/* MATERIAL & BRAND */}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="admin-label">Fabric / Material</label>
                    <input
                      type="text"
                      name="material"
                      value={form.material}
                      onChange={handleChange}
                      placeholder="e.g. 100% Combed Ring-Spun Cotton"
                      className="admin-input"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="admin-label">Brand Label</label>
                    <input
                      type="text"
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      className="admin-input"
                    />
                  </div>
                </div>

                {/* VISIBILITY TOGGLE SWITCHES */}
                <div className="mt-4 pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <label className="admin-label mb-3">Storefront Visibility Channels</label>

                  {/* FEATURED */}
                  <div
                    className={`visibility-toggle-card ${form.isFeatured ? "active" : ""}`}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, isFeatured: !prev.isFeatured }))
                    }
                  >
                    <div className={`switch-indicator ${form.isFeatured ? "checked" : ""}`}>
                      <div className="switch-knob" />
                    </div>
                    <div>
                      <div
                        className="fw-bold"
                        style={{ color: "var(--text-title)", fontSize: "14px" }}
                      >
                        Promote as Featured Product
                      </div>
                      <small style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                        Display this product with high prominence on the featured carousel.
                      </small>
                    </div>
                  </div>

                  {/* TRENDING */}
                  <div
                    className={`visibility-toggle-card ${form.isTrending ? "active" : ""}`}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, isTrending: !prev.isTrending }))
                    }
                  >
                    <div className={`switch-indicator ${form.isTrending ? "checked" : ""}`}>
                      <div className="switch-knob" />
                    </div>
                    <div>
                      <div
                        className="fw-bold d-flex align-items-center gap-1"
                        style={{
                          color: form.isTrending ? "#D97706" : "var(--text-title)",
                          fontSize: "14px",
                        }}
                      >
                        <FiTrendingUp /> Highlight as Trending Item
                      </div>
                      <small style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                        Tag this product into the "Trending Now" collection on the homepage.
                      </small>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div>
              {/* IMAGES CARD */}
              <section className="admin-card">
                <div className="admin-card-header">
                  <div className="admin-icon-box">
                    <FiLayers />
                  </div>
                  <div>
                    <h3
                      className="fw-bold mb-0"
                      style={{ fontSize: "17px", color: "var(--text-title)" }}
                    >
                      Gallery Images
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "13px", color: "var(--text-muted)" }}
                    >
                      Upload product photography (up to 10)
                    </p>
                  </div>
                </div>

                <ProductImageUpload images={images} setImages={setImages} />
              </section>

              {/* SUMMARY CARD */}
              <section className="admin-card">
                <h3
                  className="fw-bold mb-3"
                  style={{ fontSize: "16px", color: "var(--text-title)" }}
                >
                  Publishing Summary
                </h3>

                <div
                  className="d-flex justify-content-between py-2"
                  style={{ borderBottom: "1px solid var(--border-subtle)", fontSize: "13px" }}
                >
                  <span style={{ color: "var(--text-muted)" }}>Target Category</span>
                  <strong style={{ color: "var(--text-title)" }}>
                    {form.category || "Not Selected"}
                  </strong>
                </div>

                <div
                  className="d-flex justify-content-between py-2"
                  style={{ borderBottom: "1px solid var(--border-subtle)", fontSize: "13px" }}
                >
                  <span style={{ color: "var(--text-muted)" }}>Regular Price</span>
                  <strong style={{ color: "var(--text-title)" }}>
                    {form.price ? `₹${Number(form.price).toLocaleString("en-IN")}` : "₹0"}
                  </strong>
                </div>

                {form.salePrice && (
                  <div
                    className="d-flex justify-content-between py-2"
                    style={{ borderBottom: "1px solid var(--border-subtle)", fontSize: "13px" }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>Sale Price</span>
                    <strong style={{ color: "#059669" }}>
                      ₹{Number(form.salePrice).toLocaleString("en-IN")}
                    </strong>
                  </div>
                )}

                <div
                  className="d-flex justify-content-between py-2"
                  style={{ borderBottom: "1px solid var(--border-subtle)", fontSize: "13px" }}
                >
                  <span style={{ color: "var(--text-muted)" }}>Total Stock</span>
                  <strong style={{ color: "var(--text-title)" }}>{form.stock || "0"}</strong>
                </div>

                <div
                  className="d-flex justify-content-between py-2"
                  style={{ borderBottom: "1px solid var(--border-subtle)", fontSize: "13px" }}
                >
                  <span style={{ color: "var(--text-muted)" }}>Sizes Selected</span>
                  <strong style={{ color: "var(--text-title)" }}>{sizes.length}</strong>
                </div>

                <div
                  className="d-flex justify-content-between py-2"
                  style={{ borderBottom: "1px solid var(--border-subtle)", fontSize: "13px" }}
                >
                  <span style={{ color: "var(--text-muted)" }}>Photos Uploaded</span>
                  <strong style={{ color: "var(--text-title)" }}>{images.length}</strong>
                </div>

                <div
                  className="d-flex justify-content-between py-2"
                  style={{ borderBottom: "1px solid var(--border-subtle)", fontSize: "13px" }}
                >
                  <span style={{ color: "var(--text-muted)" }}>Featured Status</span>
                  <strong style={{ color: form.isFeatured ? "#059669" : "var(--text-muted)" }}>
                    {form.isFeatured ? "Yes" : "No"}
                  </strong>
                </div>

                <div
                  className="d-flex justify-content-between py-2"
                  style={{ fontSize: "13px" }}
                >
                  <span style={{ color: "var(--text-muted)" }}>Trending Status</span>
                  <strong style={{ color: form.isTrending ? "#D97706" : "var(--text-muted)" }}>
                    {form.isTrending ? "Yes" : "No"}
                  </strong>
                </div>
              </section>

              {/* ACTION BUTTONS */}
              <section className="admin-card">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-submit-action"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" />
                      Publishing Product...
                    </>
                  ) : (
                    <>
                      <FiSave /> Add Product to Catalog
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard/products")}
                  className="btn-cancel-action"
                  disabled={loading}
                >
                  Discard Changes
                </button>
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}