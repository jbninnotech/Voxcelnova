import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiShoppingBag,
  FiHeart,
  FiShare2,
  FiShoppingCart,
  FiCheck,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getTrendingProducts } from "../../services/productService";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadTrendingProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getTrendingProducts();
        if (isMounted) {
          const items = response?.products || response?.data || response || [];
          setProducts(Array.isArray(items) ? items : []);
        }
      } catch (err) {
        console.error("Trending Products Error:", err);
        if (isMounted) {
          setError("Unable to load trending products right now.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTrendingProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollDistance = containerWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction * scrollDistance,
        behavior: "smooth",
      });
    }
  };

  if (!loading && !error && products.length === 0) {
    return null;
  }

  return (
    <>
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
          --shadow-glow: 0 8px 25px rgba(0, 82, 255, 0.28);
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .tp-section {
          padding: clamp(40px, 6vw, 80px) 0;
          background: var(--bg-main);
          overflow: hidden;
        }

        .tp-container {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3.5vw, 32px);
        }

        .tp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .tp-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          color: var(--color-cobalt);
          margin-bottom: 6px;
          display: block;
          text-transform: uppercase;
        }

        .tp-title {
          font-size: clamp(22px, 3.5vw, 34px);
          font-weight: 900;
          color: var(--text-title);
          margin: 0 0 6px;
          letter-spacing: -0.5px;
          line-height: 1.15;
        }

        .tp-subtitle {
          color: var(--text-body);
          font-size: clamp(12.5px, 1.5vw, 14px);
          max-width: 500px;
          line-height: 1.5;
          margin: 0;
        }

        .tp-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .tp-nav-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          color: var(--color-cobalt);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-card);
          transition: all 0.25s ease;
        }

        .tp-nav-btn:hover {
          background: var(--color-cobalt);
          color: #ffffff;
          border-color: var(--color-cobalt);
          box-shadow: var(--shadow-glow);
          transform: translateY(-2px);
        }

        .tp-view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--color-cobalt);
          background: var(--bg-badge-tint);
          border: 1.5px solid var(--border-subtle);
          padding: 10px 18px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .tp-view-all:hover {
          background: var(--color-cobalt);
          color: #ffffff;
          box-shadow: var(--shadow-glow);
          transform: translateY(-2px);
        }

        .tp-scroll-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 8px 4px 20px 4px;
        }

        .tp-scroll-track::-webkit-scrollbar {
          display: none;
        }

        .tp-card-item {
          flex: 0 0 calc((100% - (3 * 20px)) / 4);
          min-width: 250px;
          scroll-snap-align: start;
        }

        @media (max-width: 1100px) {
          .tp-card-item {
            flex: 0 0 calc((100% - (2 * 16px)) / 3);
            min-width: 230px;
          }
          .tp-scroll-track {
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .tp-card-item {
            flex: 0 0 calc((100% - 14px) / 2.2);
            min-width: 180px;
          }
          .tp-scroll-track {
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .tp-card-item {
            flex: 0 0 74%;
            min-width: 170px;
          }
          .tp-controls {
            width: 100%;
            justify-content: space-between;
          }
        }

        .tp-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          height: 100%;
          cursor: pointer;
        }

        .tp-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-card), 0 0 20px rgba(0, 212, 255, 0.16);
        }

        .tp-img-container {
          position: relative;
          width: 100%;
          aspect-ratio: 0.85;
          background: #EEF3FA;
          overflow: hidden;
        }

        .tp-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tp-card:hover .tp-image {
          transform: scale(1.06);
        }

        .tp-no-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }

        .tp-badge-box {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 2;
          pointer-events: none;
        }

        .tp-badge-trending {
          background: var(--color-cobalt);
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.6px;
          padding: 3px 8px;
          border-radius: 6px;
          box-shadow: 0 4px 10px rgba(0, 82, 255, 0.25);
        }

        .tp-badge-sale {
          background: #ef4444;
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          padding: 3px 7px;
          border-radius: 6px;
          align-self: flex-start;
        }

        .tp-action-tray {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 4;
          transition: all 0.25s ease;
        }

        @media (hover: hover) {
          .tp-action-tray {
            opacity: 0;
            transform: translateY(6px);
          }
          .tp-card:hover .tp-action-tray {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tp-action-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(6px);
          border: 1px solid var(--border-subtle);
          color: var(--text-title);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0, 48, 143, 0.08);
          padding: 0;
        }

        .tp-action-btn:hover {
          background: var(--color-cobalt);
          color: #ffffff;
          border-color: var(--color-cobalt);
          transform: scale(1.1);
        }

        .tp-action-btn.active-wish {
          color: #ef4444;
          background: #ffe4e6;
          border-color: #fecdd3;
        }

        .tp-desktop-quick-add {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          color: #ffffff;
          border: none;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          z-index: 4;
          box-shadow: 0 8px 20px rgba(0, 48, 143, 0.2);
          opacity: 0;
          transform: translateY(100%);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tp-card:hover .tp-desktop-quick-add {
          opacity: 1;
          transform: translateY(0);
        }

        .tp-card-content {
          padding: clamp(12px, 2vw, 16px);
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .tp-cat-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          font-weight: 800;
          margin-bottom: 4px;
        }

        .tp-prod-name {
          font-size: clamp(13px, 1.8vw, 15px);
          font-weight: 700;
          color: var(--text-title);
          margin: 0 0 10px;
          line-height: 1.35;
          display: -webkit-box;
          WebkitLineClamp: 2;
          WebkitBoxOrient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tp-price-row {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .tp-price-group {
          display: flex;
          align-items: baseline;
          gap: 6px;
          flex-wrap: wrap;
        }

        .tp-current-price {
          font-size: clamp(15px, 2.2vw, 18px);
          font-weight: 900;
          color: var(--text-title);
        }

        .tp-old-price {
          font-size: 12px;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .tp-mobile-cart-btn {
          display: none;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--bg-badge-tint);
          border: 1px solid var(--border-subtle);
          color: var(--color-cobalt);
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        @media (hover: none) or (max-width: 768px) {
          .tp-desktop-quick-add {
            display: none;
          }
          .tp-mobile-cart-btn {
            display: inline-flex;
          }
        }

        .tp-skeleton-card {
          flex: 0 0 calc((100% - 60px) / 4);
          min-width: 250px;
          background: var(--bg-surface);
          border-radius: 16px;
          padding: 12px;
          border: 1px solid var(--border-subtle);
        }

        .skeleton-shimmer {
          background: linear-gradient(90deg, #edf2f9 25%, #e2e8f0 50%, #edf2f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      <section className="tp-section">
        <div className="tp-container">
          <div className="tp-header">
            <div>
              <span className="tp-eyebrow">Trending Now</span>
              <h2 className="tp-title">Trending Products</h2>
              <p className="tp-subtitle">
                Explore our latest customer favorites and most sought-after pieces this season.
              </p>
            </div>

            <div className="tp-controls">
              <button
                type="button"
                onClick={() => handleScroll(-1)}
                className="tp-nav-btn"
                title="Previous"
                aria-label="Previous Products"
              >
                <FiChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() => handleScroll(1)}
                className="tp-nav-btn"
                title="Next"
                aria-label="Next Products"
              >
                <FiChevronRight size={20} />
              </button>

              <Link to="/products" className="tp-view-all">
                <span>View All</span>
                <FiArrowRight size={15} />
              </Link>
            </div>
          </div>

          {loading && (
            <div className="tp-scroll-track">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="tp-skeleton-card">
                  <div
                    className="skeleton-shimmer"
                    style={{ width: "100%", aspectRatio: "0.85", borderRadius: "12px" }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ height: "14px", width: "70%", borderRadius: "4px", marginTop: "12px" }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ height: "18px", width: "40%", borderRadius: "4px", marginTop: "8px" }}
                  />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  background: "#FEF2F2",
                  color: "#B91C1C",
                  fontSize: "14px",
                  border: "1px solid #FCA5A5",
                }}
              >
                {error}
              </div>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="tp-scroll-track" ref={scrollRef}>
              {products.map((product) => (
                <div key={product._id || product.id} className="tp-card-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

/* =======================================================
   PRODUCT CARD COMPONENT (FULLY CONNECTED WITH /cart & wishlist)
======================================================= */
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart() || {};
  const { isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist } = useWishlist() || {};

  const [isAdded, setIsAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const productId = product?._id || product?.id || "";
  // In your routes, individual product details are at: /products/product/:id
  const productDetailPath = `/products/product/${productId}`;

  // Image fallback
  const image =
    product?.thumbnail ||
    product?.image ||
    product?.images?.[0]?.url ||
    (typeof product?.images?.[0] === "string" ? product?.images[0] : "") ||
    "https://via.placeholder.com/600x750?text=VOXEL+NOVA";

  // Price calculation matching Cart.jsx
  const numPrice = Number(product?.price || 0);
  const numSalePrice = Number(product?.salePrice || 0);
  const hasSale = numSalePrice > 0 && numSalePrice < numPrice;
  const finalPrice = hasSale ? numSalePrice : numPrice;

  const discountPercentage = hasSale
    ? Math.round(((numPrice - numSalePrice) / numPrice) * 100)
    : 0;

  // Resolve default size
  const defaultSize =
    product?.selectedSize ||
    (Array.isArray(product?.sizes) && product.sizes.length > 0
      ? typeof product.sizes[0] === "string"
        ? product.sizes[0]
        : product.sizes[0]?.size || "M"
      : "M");

  const defaultColor =
    product?.selectedColor ||
    (Array.isArray(product?.colors) && product.colors.length > 0
      ? typeof product.colors[0] === "string"
        ? product.colors[0]
        : product.colors[0]?.name || product.colors[0]?.color || ""
      : "");

  // Wishlist check
  const wishlisted = Boolean(
    (isInWishlist && isInWishlist(productId)) ||
    (() => {
      try {
        const saved = sessionStorage.getItem("voxel_nova_wishlist");
        if (!saved) return false;
        const list = JSON.parse(saved);
        return list.some((item) => (item._id || item.id) === productId);
      } catch {
        return false;
      }
    })()
  );

  // Card navigation handler (ignores button clicks)
  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    navigate(productDetailPath);
  };

  // Wishlist toggle handler
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof toggleWishlist === "function") {
      toggleWishlist(product);
    } else if (wishlisted && typeof removeFromWishlist === "function") {
      removeFromWishlist(productId);
    } else if (!wishlisted && typeof addToWishlist === "function") {
      addToWishlist({ ...product, _id: productId });
    } else {
      // Local fallback sync
      try {
        const key = "voxel_nova_wishlist";
        const saved = sessionStorage.getItem(key);
        let list = saved ? JSON.parse(saved) : [];
        if (list.some((item) => (item._id || item.id) === productId)) {
          list = list.filter((item) => (item._id || item.id) !== productId);
        } else {
          list.push(product);
        }
        sessionStorage.setItem(key, JSON.stringify(list));
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ADD TO CART (Exact object structure used in ProductDetails & Cart)
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!productId || typeof addToCart !== "function") return;

    // Normalizing cart item keys for Cart.jsx
    const cartItemPayload = {
      ...product,
      _id: productId,
      id: productId,
      productId: productId,
      cartItemId: `${productId}-${defaultSize}`,
      name: product?.name || "Apparel Item",
      price: finalPrice,
      originalPrice: numPrice || finalPrice,
      image: image,
      quantity: 1,
      size: defaultSize,
      selectedSize: defaultSize,
      color: defaultColor,
      stock: Number(product?.stock ?? product?.countInStock ?? 999),
      minimumOrderQuantity: Number(product?.minimumOrderQuantity || 1),
      availableSizes: Array.isArray(product?.sizes) && product.sizes.length > 0
        ? product.sizes.map((s) => (typeof s === "string" ? s : s.size || s.name))
        : ["S", "M", "L", "XL", "XXL"],
    };

    try {
      // ProductDetails.jsx method: { product, size, color, quantity }
      await addToCart({
        product: cartItemPayload,
        size: defaultSize,
        color: defaultColor,
        quantity: 1,
      });
    } catch (err) {
      // Products.jsx fallback method: addToCart(cartPayload, 1, defaultSize)
      try {
        await addToCart(cartItemPayload, 1, defaultSize);
      } catch (innerErr) {
        try {
          await addToCart(cartItemPayload);
        } catch (e3) {
          console.error("Cart addition failed:", e3);
        }
      }
    }

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  // Share handler
  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const fullUrl = `${window.location.origin}${productDetailPath}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          url: fullUrl,
        });
        return;
      } catch (err) {}
    }

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="tp-card" onClick={handleCardClick}>
      {/* IMAGE CONTAINER */}
      <div className="tp-img-container">
        {image ? (
          <img
            src={image}
            alt={product.name || "Product"}
            className="tp-image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/600x750?text=VOXEL+NOVA";
            }}
          />
        ) : (
          <div className="tp-no-image">
            <FiShoppingBag size={34} />
          </div>
        )}

        <div className="tp-badge-box">
          <span className="tp-badge-trending">TRENDING</span>
          {hasSale && <span className="tp-badge-sale">-{discountPercentage}%</span>}
        </div>

        {/* FLOATING ACTION ICONS */}
        <div className="tp-action-tray">
          <button
            type="button"
            className={`tp-action-btn ${wishlisted ? "active-wish" : ""}`}
            onClick={handleWishlistToggle}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
          >
            <FiHeart
              size={14}
              fill={wishlisted ? "#ef4444" : "none"}
              color={wishlisted ? "#ef4444" : "currentColor"}
            />
          </button>

          <button
            type="button"
            className="tp-action-btn"
            onClick={handleShare}
            title="Share product"
            aria-label="Share"
          >
            {copied ? <FiCheck size={14} color="#10B981" /> : <FiShare2 size={14} />}
          </button>
        </div>

        {/* QUICK ADD BUTTON */}
        <button
          type="button"
          className="tp-desktop-quick-add"
          style={{
            background: isAdded ? "#10B981" : "var(--color-cobalt)",
          }}
          onClick={handleAddToCart}
        >
          {isAdded ? (
            <>
              <FiCheck size={15} />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <FiShoppingCart size={15} />
              <span>Quick Add</span>
            </>
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div className="tp-card-content">
        <span className="tp-cat-label">
          {product.category || product.categorySlug || "Apparel"}
        </span>

        <h3 className="tp-prod-name" title={product.name}>
          {product.name || "Product"}
        </h3>

        <div className="tp-price-row">
          <div className="tp-price-group">
            <span className="tp-current-price">
              ₹{Number(finalPrice).toLocaleString("en-IN")}
            </span>
            {hasSale && (
              <span className="tp-old-price">
                ₹{Number(numPrice).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            type="button"
            className="tp-mobile-cart-btn"
            onClick={handleAddToCart}
            title="Add to Cart"
            aria-label="Add to Cart"
            style={{
              background: isAdded ? "#10B981" : "var(--bg-badge-tint)",
              color: isAdded ? "#FFFFFF" : "var(--color-cobalt)",
              borderColor: isAdded ? "#10B981" : "var(--border-subtle)",
            }}
          >
            {isAdded ? <FiCheck size={14} /> : <FiShoppingCart size={14} />}
          </button>
        </div>
      </div>
    </article>
  );
};

export default TrendingProducts;