import React from "react";
import {
  FiStar,
  FiCheckCircle,
  FiLayers,
  FiAward,
  FiPackage,
} from "react-icons/fi";

import ProductPrice from "./ProductPrice";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
// import BulkPricing from "./BulkPricing";
import ProductActions from "./ProductActions";

const ProductInfo = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  onAddToCart,
  onBuyNow,
  onBulkQuote,
  onSizeGuide,
  isWishlisted,
  onWishlist,
}) => {
  if (!product) return null;

  const categoryName = product.category || "Apparel";
  const stockCount = Number(product.stock || 50);
  const isAvailable = stockCount > 0;

  return (
    <div className="product-info-panel">
      {/* ================= STYLES & ANIMATIONS ================= */}
      <style>{`
        .product-info-panel {
          font-family: inherit;
          color: #0f172a;
          animation: panelFadeIn 0.4s ease-out;
        }

        @keyframes panelFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Category & Stock Status Header */
        .info-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 0.75rem;
        }

        .category-tag {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 800;
          color: #2563eb;
          background: #eff6ff;
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-block;
        }

        /* Animated Live Stock Pulse */
        .stock-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.775rem;
          font-weight: 600;
          color: #15803d;
          background: #f0fdf4;
          padding: 3px 10px;
          border-radius: 99px;
          border: 1px solid #bbf7d0;
        }

        .pulse-dot {
          width: 7px;
          height: 7px;
          background-color: #22c55e;
          border-radius: 50%;
          position: relative;
        }

        .pulse-dot::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: #22c55e;
          border-radius: 50%;
          animation: pulseRing 1.8s infinite ease-out;
        }

        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.6); opacity: 0; }
        }

        /* Title */
        .product-main-title {
          font-size: clamp(1.65rem, 3.2vw, 2.4rem);
          font-weight: 800;
          line-height: 1.2;
          color: #0f172a;
          letter-spacing: -0.025em;
          margin-bottom: 0.85rem;
        }

        /* Ratings Pill */
        .rating-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          padding: 5px 12px;
          border-radius: 10px;
          border: 1px solid #f1f5f9;
          margin-bottom: 1.25rem;
          transition: all 0.2s ease;
        }
        .rating-wrapper:hover {
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          transform: translateY(-1px);
        }

        .stars-row {
          display: flex;
          gap: 2px;
        }

        .score-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1e293b;
        }

        .reviews-count {
          font-size: 0.775rem;
          color: #64748b;
          text-decoration: underline;
          cursor: pointer;
        }

        /* Description */
        .product-brief-desc {
          font-size: 0.925rem;
          line-height: 1.75;
          color: #475569;
          margin-bottom: 1.25rem;
        }

        /* Spec Chips */
        .specs-chip-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 1.5rem;
        }

        .spec-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #334155;
          font-size: 0.785rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.02);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .spec-chip:hover {
          border-color: #93c5fd;
          color: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.08);
        }

        /* Divider */
        .info-divider {
          height: 1px;
          background: #f1f5f9;
          border: none;
          margin: 1.5rem 0;
        }
      `}</style>

      {/* 1. Header: Category & Live Stock */}
      <div className="info-top-meta">
        <span className="category-tag">{categoryName}</span>

        {isAvailable ? (
          <div className="stock-indicator">
            <span className="pulse-dot" />
            <span>In Stock & Ready to Ship</span>
          </div>
        ) : (
          <div
            className="stock-indicator"
            style={{ color: "#dc2626", background: "#fef2f2", borderColor: "#fecaca" }}
          >
            Out of Stock
          </div>
        )}
      </div>

      {/* 2. Product Name */}
      <h1 className="product-main-title">{product.name}</h1>

      {/* 3. Rating & Social Proof */}
      <div className="rating-wrapper">
        <div className="stars-row">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              size={14}
              fill="#f59e0b"
              color="#f59e0b"
            />
          ))}
        </div>
        <span className="score-text">4.9</span>
        <span className="reviews-count">({product.reviewsCount || 48} verified reviews)</span>
      </div>

      {/* 4. Pricing Box */}
      <ProductPrice
        price={product.price}
        salePrice={product.salePrice}
      />

      {/* 5. Short Description */}
      <p className="product-brief-desc">
        {product.description ||
          "Premium crafted design tailored with refined attention to comfort, fit, and long-lasting durability."}
      </p>

      {/* 6. Specification Badges */}
      <div className="specs-chip-container">
        {product.material && (
          <div className="spec-chip">
            <FiLayers size={13} color="#2563eb" />
            <span>Material: {product.material}</span>
          </div>
        )}

        {product.brand && (
          <div className="spec-chip">
            <FiAward size={13} color="#2563eb" />
            <span>Brand: {product.brand}</span>
          </div>
        )}

        <div className="spec-chip">
          <FiCheckCircle size={13} color="#16a34a" />
          <span>Quality Checked</span>
        </div>
      </div>

      <hr className="info-divider" />

      {/* 7. Interactive Selectors */}
      <ColorSelector
        colors={product.colors || []}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      <SizeSelector
        sizes={product.sizes || []}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        onSizeGuide={onSizeGuide}
      />

      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
        min={product.minimumOrder || 1}
        max={product.stock || 9999}
      />

      {/* 8. Tiered Bulk Pricing Component */}
      {/* <BulkPricing
        price={product.salePrice || product.price || 0}
        quantity={quantity}
      /> */}

      <hr className="info-divider" />

      {/* 9. CTAs (Add to Cart / Buy Now / Wishlist) */}
      <ProductActions
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        quantity={quantity}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onBulkQuote={onBulkQuote}
        isWishlisted={isWishlisted}
        onWishlist={onWishlist}
      />
    </div>
  );
};

export default ProductInfo;