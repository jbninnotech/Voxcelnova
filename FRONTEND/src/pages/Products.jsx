import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tshirt from "../assets/products/tshirt.png";
import shirt from "../assets/products/shirt.png";
import polo from "../assets/products/polo.png";
import Hoodi from "../assets/products/hoodi.png";
import collage from "../assets/products/collage.png";
import Herosection from "../components/products/Herosection";

import {
  FiArrowRight,
  FiSearch,
  FiX,
  FiPackage,
  FiSliders,
  FiHeart,
  FiShoppingCart,
  FiCheck,
} from "react-icons/fi";

import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const CATEGORIES = [
  { name: "All Items", slug: "all" },
  {
    name: "Shirts",
    slug: "shirts",
    description: "Formal & Casual",
    image: shirt,
  },
  {
    name: "T-Shirts",
    slug: "t-shirts",
    description: "Everyday Essentials",
    image: tshirt,
  },
  {
    name: "Polo T-Shirts",
    slug: "polo-t-shirts",
    description: "Athletic & Semi-Formal",
    image: polo,
  },
  {
    name: "Hoodies & Sweatshirts",
    slug: "hoodies-sweatshirts",
    description: "Heavyweight Fleece",
    image: Hoodi,
  },
  {
    name: "School Uniforms",
    slug: "school-uniforms",
    description: "Durable Institutional",
    image: collage,
  },
  {
    name: "College Uniforms",
    slug: "college-uniforms",
    description: "Corporate & Campus",
    image: shirt,
  },
];

const Products = () => {
  /* =========================================================
     CART CONTEXT
  ========================================================= */
  const cartContext = useCart() || {};
  const { addToCart } = cartContext;

  const rawCartItems =
    cartContext.cartItems ||
    cartContext.cart ||
    cartContext.items ||
    [];

  /* =========================================================
     WISHLIST
  ========================================================= */
  const {
    wishlistItems = [],
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist() || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  /* =========================================================
     LOAD PRODUCTS
  ========================================================= */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts();
        const productData =
          response?.products || response?.data || response || [];

        setProducts(Array.isArray(productData) ? productData : []);
      } catch (err) {
        console.error("Products Load Error:", err);
        setError(
          err?.response?.data?.message ||
            "Unable to load the collection right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* =========================================================
     TOGGLE WISHLIST
  ========================================================= */
  const toggleWishlist = (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const productId = product._id || product.id;
    if (!productId) {
      showToast("Unable to identify product");
      return;
    }

    if (isInWishlist && isInWishlist(productId)) {
      removeFromWishlist(productId);
      showToast("Removed from wishlist");
    } else if (addToWishlist) {
      addToWishlist({
        ...product,
        _id: productId,
      });
      showToast("Added to wishlist ❤️");
    }
  };

  /* =========================================================
     ADD TO CART (MATCHING ProductDetails.jsx EXACT SIGNATURE)
  ========================================================= */
  const handleAddToCart = async (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const productId = product._id || product.id;
    if (!productId) {
      showToast("Unable to identify product.");
      return;
    }

    if (typeof addToCart !== "function") {
      showToast("Cart function unavailable right now.");
      return;
    }

    const defaultSize =
      product.selectedSize ||
      (Array.isArray(product.sizes) && product.sizes.length > 0
        ? typeof product.sizes[0] === "string"
          ? product.sizes[0]
          : product.sizes[0]?.size || "M"
        : "M");

    const defaultColor =
      product.selectedColor ||
      (Array.isArray(product.colors) && product.colors.length > 0
        ? typeof product.colors[0] === "string"
          ? product.colors[0]
          : product.colors[0]?.name || product.colors[0]?.color || ""
        : "");

    try {
      // 1. Exact object wrapper used in ProductDetails.jsx:
      await addToCart({
        product: product,
        size: defaultSize,
        color: defaultColor,
        quantity: 1,
      });

      showToast(`Added "${product.name || "Product"}" to Cart! 🛍️`);
    } catch (err) {
      // 2. Direct payload fallback:
      try {
        await addToCart(product, 1, defaultSize);
        showToast(`Added "${product.name || "Product"}" to Cart! 🛍️`);
      } catch (innerErr) {
        console.error("Add to cart error:", innerErr);
        showToast(
          innerErr?.response?.data?.message ||
            innerErr?.message ||
            "Failed to add to cart. Try again."
        );
      }
    }
  };

  /* =========================================================
     FILTER & SORT
  ========================================================= */
  const processedProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        product.name?.toLowerCase().includes(searchText) ||
        product.category?.toLowerCase().includes(searchText) ||
        product.description?.toLowerCase().includes(searchText) ||
        product.sku?.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "all" ||
        product.categorySlug === selectedCategory ||
        product.category?.toLowerCase().replace(/\s+/g, "-") ===
          selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-asc") {
      result.sort(
        (a, b) =>
          (a.salePrice || a.price || 0) - (b.salePrice || b.price || 0)
      );
    } else if (sortBy === "price-desc") {
      result.sort(
        (a, b) =>
          (b.salePrice || b.price || 0) - (a.salePrice || a.price || 0)
      );
    } else if (sortBy === "name") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return result;
  }, [products, search, selectedCategory, sortBy]);

  const totalCartCount =
    typeof cartContext.cartCount === "number"
      ? cartContext.cartCount
      : Array.isArray(rawCartItems)
      ? rawCartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
      : 0;

  return (
    <div className="catalog-wrapper">
      {/* FLOATING ACTION DOCK */}
      <div className="floating-nav-dock">
        <Link to="/wishlist" className="dock-link" title="View Wishlist">
          <FiHeart className="dock-icon heart" />
          <span className="dock-label">Wishlist</span>
          {wishlistItems.length > 0 && (
            <span className="dock-badge badge-wishlist">
              {wishlistItems.length}
            </span>
          )}
        </Link>

        <div className="dock-divider" />

        <Link to="/cart" className="dock-link cart" title="View Shopping Cart">
          <FiShoppingCart className="dock-icon" />
          <span className="dock-label">Cart</span>
          {totalCartCount > 0 && (
            <span className="dock-badge badge-cart">{totalCartCount}</span>
          )}
        </Link>
      </div>

      {/* TOAST */}
      {toastMessage && <div className="floating-toast">{toastMessage}</div>}

      {/* HERO SECTION */}
      <section>
        <Herosection />
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="container-custom category-showcase">
        <div className="section-header">
          <div>
            <span className="eyebrow-tag">Collections</span>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <button
            onClick={() => setSelectedCategory("all")}
            className="clean-pill-btn"
          >
            Show All
          </button>
        </div>

        <div className="category-scroll-grid">
          {CATEGORIES.filter((c) => c.slug !== "all").map((category) => (
            <div
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={`cat-card ${
                selectedCategory === category.slug ? "cat-card-active" : ""
              }`}
            >
              <div className="cat-img-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x400?text=VOXCEL";
                  }}
                />
                <div className="cat-img-overlay">
                  <span>Browse</span>
                </div>
              </div>
              <h3 className="cat-name">{category.name}</h3>
              <p className="cat-desc">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN PRODUCTS EXPLORER */}
      <section className="container-custom products-section" id="products-catalog">
        <div className="catalog-controls">
          <div className="chips-container">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`category-chip ${
                  selectedCategory === cat.slug ? "chip-active" : ""
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="search-sort-bar">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search collection, fabric, style..."
              />
              {search && (
                <button
                  type="button"
                  className="clear-btn"
                  onClick={() => setSearch("")}
                >
                  <FiX />
                </button>
              )}
            </div>

            <div className="sort-box">
              <FiSliders className="sort-icon" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESULTS COUNTER */}
        <div className="results-counter">
          <span>
            Displaying <strong>{processedProducts.length}</strong> items
            {selectedCategory !== "all" && (
              <>
                {" "}in{" "}
                <span className="highlight-cat">
                  "{selectedCategory.replace("-", " ")}"
                </span>
              </>
            )}
          </span>

          {(search || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="clear-all-text"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="products-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img shimmer" />
                <div className="skeleton-body">
                  <div className="skeleton-line shimmer w-40" />
                  <div className="skeleton-line shimmer w-80" />
                  <div className="skeleton-line shimmer w-60" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="feedback-card">
            <h4>Something went wrong</h4>
            <p>{error}</p>
            <button
              type="button"
              className="primary-btn"
              onClick={() => window.location.reload()}
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && processedProducts.length === 0 && (
          <div className="feedback-card">
            <div className="feedback-icon-box">
              <FiPackage size={32} color="var(--color-cobalt)" />
            </div>
            <h4>No items matched your query</h4>
            <p>Try modifying your search or clearing applied filters.</p>
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* PRODUCTS GRID */}
        {!loading && !error && processedProducts.length > 0 && (
          <div className="products-grid">
            {processedProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                isWishlisted={isInWishlist ? isInWishlist(product._id || product.id) : false}
                onToggleWishlist={(e) => toggleWishlist(product, e)}
                onAddToCart={(e) => handleAddToCart(product, e)}
              />
            ))}
          </div>
        )}
      </section>

      {/* CLEAN STYLES */}
      <style>{`
        .catalog-wrapper {
          --bg-main:         #F4F8FE;
          --bg-surface:      #FFFFFF;
          --bg-badge-tint:   #E8F5FE;
          --color-cobalt:    #0052FF;
          --color-cobalt-hover: #003ECC;
          --color-cyan:      #00D4FF;
          --text-title:      #071838;
          --text-body:       #495E7C;
          --text-muted:      #6B82A0;
          --border-subtle:   rgba(0, 82, 255, 0.14);
          --border-hover:    rgba(0, 212, 255, 0.60);
          --shadow-card:     0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow:     0 8px 25px rgba(0, 82, 255, 0.22);

          min-height: 100vh;
          background-color: var(--bg-main);
          color: var(--text-body);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding-top: 20px;
          padding-bottom: 90px;
          position: relative;
        }

        .container-custom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Floating Navigation Dock */
        .floating-nav-dock {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-subtle);
          border-radius: 999px;
          padding: 6px 10px;
          box-shadow: 0 16px 36px rgba(0, 48, 143, 0.12);
        }

        .dock-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          text-decoration: none;
          color: var(--text-title);
          font-size: 13px;
          font-weight: 700;
          border-radius: 999px;
          transition: all 0.2s ease;
        }

        .dock-link:hover {
          background: var(--bg-badge-tint);
          color: var(--color-cobalt);
        }

        .dock-link.cart {
          color: var(--color-cobalt);
        }

        .dock-divider {
          width: 1px;
          height: 20px;
          background: var(--border-subtle);
        }

        .dock-icon {
          font-size: 16px;
        }

        .dock-icon.heart {
          color: #e11d48;
        }

        .dock-badge {
          font-size: 11px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 99px;
          color: #ffffff;
        }

        .badge-wishlist {
          background: #e11d48;
        }

        .badge-cart {
          background: var(--color-cobalt);
        }

        /* Toast */
        .floating-toast {
          position: fixed;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: var(--bg-surface);
          border: 1px solid var(--color-cobalt);
          color: var(--text-title);
          padding: 10px 22px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 700;
          box-shadow: 0 12px 30px rgba(0, 82, 255, 0.18);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -15px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        /* Section Header */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 20px;
        }

        .eyebrow-tag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 800;
          color: var(--color-cobalt);
          display: block;
          margin-bottom: 4px;
        }

        .section-title {
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
          color: var(--text-title);
        }

        .clean-pill-btn {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--color-cobalt);
          font-size: 13px;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 48, 143, 0.04);
        }

        .clean-pill-btn:hover {
          background: var(--bg-badge-tint);
          border-color: var(--border-hover);
        }

        .category-showcase {
          margin-top: 35px;
        }

        .category-scroll-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 16px;
        }

        .cat-card {
          cursor: pointer;
          background: var(--bg-surface);
          padding: 12px;
          border-radius: 16px;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-card);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .cat-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
        }

        .cat-card-active {
          border-color: var(--color-cobalt) !important;
          background: var(--bg-badge-tint) !important;
        }

        .cat-img-wrapper {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          overflow: hidden;
          background: #EEF4FD;
        }

        .cat-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .cat-card:hover .cat-img-wrapper img {
          transform: scale(1.06);
        }

        .cat-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 82, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .cat-card:hover .cat-img-overlay {
          opacity: 1;
        }

        .cat-img-overlay span {
          background: #ffffff;
          color: var(--color-cobalt);
          font-size: 11px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.25);
        }

        .cat-name {
          font-size: 13.5px;
          font-weight: 700;
          margin: 10px 0 2px;
          color: var(--text-title);
        }

        .cat-desc {
          font-size: 11px;
          color: var(--text-muted);
          margin: 0;
        }

        .products-section {
          margin-top: 50px;
        }

        .catalog-controls {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 22px;
        }

        .chips-container {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }

        .chips-container::-webkit-scrollbar {
          display: none;
        }

        .category-chip {
          white-space: nowrap;
          background: var(--bg-surface);
          color: var(--text-body);
          border: 1px solid var(--border-subtle);
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 48, 143, 0.03);
          transition: all 0.2s ease;
        }

        .category-chip:hover {
          color: var(--color-cobalt);
          background: var(--bg-badge-tint);
        }

        .chip-active {
          background: var(--color-cobalt) !important;
          color: #ffffff !important;
          border-color: var(--color-cobalt) !important;
          box-shadow: 0 4px 14px rgba(0, 82, 255, 0.25);
        }

        .search-sort-bar {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 260px;
          max-width: 480px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-cobalt);
          font-size: 16px;
        }

        .search-box input {
          width: 100%;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 11px 36px 11px 42px;
          color: var(--text-title);
          font-size: 13.5px;
          outline: none;
          box-sizing: border-box;
          box-shadow: 0 2px 6px rgba(0, 48, 143, 0.04);
          transition: border-color 0.2s ease;
        }

        .search-box input:focus {
          border-color: var(--color-cobalt);
        }

        .clear-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .sort-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 0 14px;
          box-shadow: 0 2px 6px rgba(0, 48, 143, 0.04);
        }

        .sort-icon {
          color: var(--color-cobalt);
          font-size: 16px;
        }

        .sort-box select {
          background: transparent;
          border: none;
          color: var(--text-title);
          font-size: 13px;
          font-weight: 600;
          padding: 11px 4px;
          outline: none;
          cursor: pointer;
        }

        .sort-box select option {
          background: #ffffff;
          color: var(--text-title);
        }

        .results-counter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 22px;
        }

        .highlight-cat {
          color: var(--color-cobalt);
          font-weight: 700;
        }

        .clear-all-text {
          background: none;
          border: none;
          color: var(--color-cobalt);
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          text-decoration: underline;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        /* Product Card */
        .product-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          box-shadow: var(--shadow-card);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
        }

        .prod-img-box {
          position: relative;
          aspect-ratio: 4 / 5;
          background: #EEF4FD;
          overflow: hidden;
        }

        .prod-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover .prod-img {
          transform: scale(1.05);
        }

        .badge-list {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 2;
        }

        .badge-featured {
          background: var(--color-cobalt);
          color: #ffffff;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: 6px;
          box-shadow: 0 4px 10px rgba(0, 82, 255, 0.25);
        }

        .badge-discount {
          background: #ffffff;
          color: #e11d48;
          border: 1px solid rgba(225, 29, 72, 0.2);
          font-size: 9.5px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 3;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0, 48, 143, 0.08);
        }

        .wishlist-btn:hover {
          background: #ffffff;
          color: #e11d48;
          transform: scale(1.08);
        }

        .wishlist-active {
          color: #e11d48 !important;
        }

        .quick-action-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          background: linear-gradient(to top, rgba(255, 255, 255, 0.95), transparent);
          display: flex;
          justify-content: center;
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.25s ease;
          z-index: 2;
        }

        .product-card:hover .quick-action-bar {
          opacity: 1;
          transform: translateY(0);
        }

        .quick-cart-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cobalt-hover) 100%);
          color: #ffffff;
          border: none;
          font-size: 12px;
          font-weight: 700;
          padding: 9px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.25);
          transition: all 0.2s ease;
        }

        .quick-cart-btn:hover {
          box-shadow: 0 6px 18px rgba(0, 82, 255, 0.4);
          transform: translateY(-1px);
        }

        .prod-info {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .prod-category {
          color: var(--color-cobalt);
          font-size: 10.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 4px;
        }

        .prod-title {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--text-title);
          margin: 0 0 6px;
          line-height: 1.35;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .prod-desc {
          color: var(--text-body);
          font-size: 12px;
          line-height: 1.45;
          margin: 0 0 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }

        .prod-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 12px;
          margin-top: auto;
        }

        .price-group {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .current-price {
          font-size: 16.5px;
          font-weight: 800;
          color: var(--text-title);
        }

        .original-price {
          font-size: 11.5px;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .view-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--color-cobalt);
          font-size: 12px;
          font-weight: 700;
        }

        /* Feedback / Empty States */
        .feedback-card {
          text-align: center;
          padding: 50px 20px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          box-shadow: var(--shadow-card);
        }

        .feedback-icon-box {
          width: 52px;
          height: 52px;
          background: var(--bg-badge-tint);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          border: 1px solid var(--border-subtle);
        }

        .feedback-card h4 {
          margin: 0 0 6px;
          font-size: 17px;
          color: var(--text-title);
          font-weight: 700;
        }

        .feedback-card p {
          margin: 0 0 16px;
          color: var(--text-body);
          font-size: 13px;
        }

        .primary-btn {
          background: linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cobalt-hover) 100%);
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.25);
        }

        /* Skeletons */
        .shimmer {
          background: linear-gradient(90deg, #EBF1FB 25%, #F4F8FE 50%, #EBF1FB 75%);
          background-size: 200% 100%;
          animation: shimmerAnim 1.5s infinite;
        }

        @keyframes shimmerAnim {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .skeleton-card {
          background: var(--bg-surface);
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }

        .skeleton-img { aspect-ratio: 4 / 5; }
        .skeleton-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; }
        .skeleton-line { height: 12px; border-radius: 4px; }
        .w-40 { width: 40%; }
        .w-60 { width: 60%; }
        .w-80 { width: 80%; }

        /* Responsive Mobile Breakpoint */
        @media (max-width: 768px) {
          .search-sort-bar { flex-direction: column; }
          .search-box { max-width: 100%; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .prod-desc { display: none; }
          .prod-img-box { aspect-ratio: 1 / 1; }
          .floating-nav-dock { bottom: 16px; right: 16px; }
          .dock-label { display: none; }
        }
      `}</style>
    </div>
  );
};

/* =========================================================
   PRODUCT CARD COMPONENT
========================================================= */
const ProductCard = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const image =
    product.images?.length > 0 && product.images[0]?.url
      ? product.images[0].url
      : product.image || "https://via.placeholder.com/600x750?text=VOXCEL";

  const numPrice = Number(product.price || 0);
  const numSalePrice = Number(product.salePrice || 0);
  const hasSale = numSalePrice > 0 && numSalePrice < numPrice;

  const discountPercent = hasSale
    ? Math.round(((numPrice - numSalePrice) / numPrice) * 100)
    : 0;

  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    navigate(`/products/product/${product._id || product.id}`);
  };

  const handleQuickAddClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await onAddToCart(e);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <article className="product-card" onClick={handleCardClick}>
      {/* PRODUCT IMAGE */}
      <div className="prod-img-box">
        <img
          src={image}
          alt={product.name || "Apparel"}
          className="prod-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/600x750?text=VOXCEL";
          }}
        />

        <div className="badge-list">
          {product.isFeatured && (
            <span className="badge-featured">FEATURED</span>
          )}
          {hasSale && (
            <span className="badge-discount">-{discountPercent}%</span>
          )}
        </div>

        {/* WISHLIST BUTTON */}
        <button
          type="button"
          className={`wishlist-btn ${isWishlisted ? "wishlist-active" : ""}`}
          onClick={onToggleWishlist}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart
            fill={isWishlisted ? "currentColor" : "none"}
            size={16}
          />
        </button>

        {/* QUICK ADD TO CART */}
        <div className="quick-action-bar">
          <button
            type="button"
            className="quick-cart-btn"
            onClick={handleQuickAddClick}
          >
            {added ? (
              <>
                <FiCheck size={14} />
                Added!
              </>
            ) : (
              <>
                <FiShoppingCart size={14} />
                Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="prod-info">
        <div className="prod-category">
          {product.category || product.categorySlug || "Apparel"}
        </div>

        <h3 className="prod-title" title={product.name}>
          {product.name || "Premium Garment"}
        </h3>

        <p className="prod-desc">
          {product.description || "Crafted with high-grade organic cotton blends."}
        </p>

        <div className="prod-footer">
          <div className="price-group">
            <span className="current-price">
              ₹
              {(hasSale ? numSalePrice : numPrice).toLocaleString("en-IN")}
            </span>
            {hasSale && (
              <span className="original-price">
                ₹{numPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <span className="view-link">
            Details
            <FiArrowRight size={13} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default Products;