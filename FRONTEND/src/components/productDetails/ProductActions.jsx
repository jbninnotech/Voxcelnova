import React, { useState } from "react";
import {
  FiShoppingCart,
  FiFileText,
  FiHeart,
  FiZap,
  FiCheck,
  FiShield,
  FiPackage,
  FiLayers,
} from "react-icons/fi";

const ProductActions = ({
  product,
  selectedSize,
  selectedColor,
  quantity,
  onAddToCart,
  onBuyNow,
  onBulkQuote,
  isWishlisted = false,
  onWishlist,
}) => {
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  /* =====================================================
     PRODUCT DATA
  ===================================================== */
  const stock = Number(product?.stock || 0);
  const minimumOrderQuantity = Math.max(
    Number(product?.minimumOrderQuantity || 1),
    1
  );
  const currentQuantity = Math.max(Number(quantity || 0), 0);
  const isOutOfStock = stock <= 0;
  const isQuantityInvalid =
    currentQuantity < minimumOrderQuantity ||
    (stock > 0 && currentQuantity > stock);

  /* =====================================================
     VALIDATE PRODUCT OPTIONS
  ===================================================== */
  const validateProduct = () => {
    if (!product) {
      alert("Product information is unavailable.");
      return false;
    }
    if (isOutOfStock) {
      alert("This product is currently out of stock.");
      return false;
    }
    if (product?.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size.");
      return false;
    }
    if (product?.colors?.length > 0 && !selectedColor) {
      alert("Please select a color.");
      return false;
    }
    if (!currentQuantity || currentQuantity < 1) {
      alert("Please select a valid quantity.");
      return false;
    }
    if (currentQuantity < minimumOrderQuantity) {
      alert(`Minimum order quantity is ${minimumOrderQuantity}.`);
      return false;
    }
    if (currentQuantity > stock) {
      alert(`Only ${stock} item${stock === 1 ? "" : "s"} available in stock.`);
      return false;
    }
    return true;
  };

  /* =====================================================
     HANDLERS
  ===================================================== */
  const handleAddToCart = () => {
    if (!validateProduct()) return;
    onAddToCart?.({
      product,
      size: selectedSize || "",
      color: selectedColor || "",
      quantity: currentQuantity,
    });
  };

  const handleBuyNow = () => {
    if (!validateProduct()) return;
    onBuyNow?.({
      product,
      size: selectedSize || "",
      color: selectedColor || "",
      quantity: currentQuantity,
    });
  };

  const handleWishlistClick = () => {
    if (!product) return;
    setIsWishlistAnimating(true);
    setTimeout(() => setIsWishlistAnimating(false), 450);
    onWishlist?.(product);
  };

  const disablePurchaseActions = isOutOfStock || isQuantityInvalid;

  return (
    <div className="product-actions-wrapper">
      {/* =================================================
          SCOPED PROFESSIONAL CSS STYLES
      ================================================= */}
      <style>{`
        .product-actions-wrapper {
          font-family: inherit;
          user-select: none;
        }

        /* Stock Status Animated Pulse */
        .pa-pulse-dot {
          position: relative;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #16a34a;
          display: inline-block;
        }

        .pa-pulse-dot::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 50%;
          background: #16a34a;
          animation: pa-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes pa-ping {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          75%, 100% {
            transform: scale(2.8);
            opacity: 0;
          }
        }

        /* Base Button Structure */
        .pa-btn {
          position: relative;
          overflow: hidden;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.2px;
          border: none;
          outline: none;
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.18s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.2s ease,
                      color 0.2s ease,
                      border-color 0.2s ease;
        }

        .pa-btn:disabled {
          cursor: not-allowed !important;
          transform: none !important;
          box-shadow: none !important;
          opacity: 0.55;
        }

        .pa-btn:not(:disabled):active {
          transform: scale(0.98) !important;
        }

        /* Add to Cart Button */
        .pa-btn-cart {
          background: #0B192C;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(11, 25, 44, 0.12);
        }

        .pa-btn-cart:not(:disabled):hover {
          background: #1E2E46;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(11, 25, 44, 0.22);
        }

        .pa-btn-cart:not(:disabled):hover .pa-cart-icon {
          transform: rotate(-10deg) scale(1.1);
        }

        .pa-cart-icon {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Wishlist Button */
        .pa-btn-wishlist {
          border: 1.5px solid #E2E8F0;
          background: #ffffff;
          color: #64748B;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .pa-btn-wishlist:hover {
          border-color: #FECDD3;
          background: #FFF1F2;
          color: #E11D48;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(225, 29, 72, 0.12);
        }

        .pa-btn-wishlist.active {
          border-color: #FECDD3;
          background: #FFF1F2;
          color: #E11D48;
        }

        .pa-wishlist-pop {
          animation: pa-heart-pop 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes pa-heart-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }

        /* Buy Now Button */
        .pa-btn-buy {
          background: linear-gradient(135deg, #2563EB, #1D4ED8);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.22);
        }

        .pa-btn-buy:not(:disabled):hover {
          background: linear-gradient(135deg, #1D4ED8, #1E40AF);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(37, 99, 235, 0.35);
        }

        .pa-btn-buy:not(:disabled):hover .pa-zap-icon {
          transform: scale(1.2) rotate(6deg);
        }

        .pa-zap-icon {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Bulk Quote Button */
        .pa-btn-bulk {
          background: #F8FAFC;
          color: #334155;
          border: 1.5px solid #E2E8F0;
        }

        .pa-btn-bulk:hover {
          background: #EFF6FF;
          color: #1D4ED8;
          border-color: #BFDBFE;
          transform: translateY(-1.5px);
          box-shadow: 0 4px 12px rgba(29, 78, 216, 0.08);
        }

        /* Feature Trust Badges */
        .pa-trust-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64748B;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .pa-trust-badge:hover {
          color: #0F172A;
        }

        .pa-trust-badge svg {
          color: #10B981;
        }
      `}</style>

      {/* =================================================
          STOCK STATUS
      ================================================= */}
      <div className="d-flex align-items-center gap-2 mb-3">
        {isOutOfStock ? (
          <>
            <span
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: "#DC2626",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#DC2626",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Out of Stock
            </span>
          </>
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <span className="pa-pulse-dot" />
            </div>
            <span
              style={{
                fontSize: "12.5px",
                fontWeight: 700,
                color: "#15803D",
              }}
            >
              In Stock
            </span>

            {stock <= 10 && (
              <span
                style={{
                  fontSize: "11px",
                  color: "#B45309",
                  background: "#FEF3C7",
                  padding: "2px 7px",
                  borderRadius: "6px",
                  fontWeight: 600,
                  marginLeft: "4px",
                }}
              >
                Only {stock} left
              </span>
            )}
          </>
        )}
      </div>

      {/* =================================================
          MINIMUM ORDER INFO
      ================================================= */}
      {minimumOrderQuantity > 1 && !isOutOfStock && (
        <div
          className="mb-3 d-flex align-items-center justify-content-between"
          style={{
            padding: "10px 14px",
            borderRadius: "9px",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            fontSize: "12px",
            color: "#475569",
          }}
        >
          <span>Minimum purchase threshold:</span>
          <strong style={{ color: "#0F172A" }}>
            {minimumOrderQuantity} units
          </strong>
        </div>
      )}

      {/* =================================================
          MAIN ACTIONS (Add to Cart + Wishlist)
      ================================================= */}
      <div className="d-flex gap-2 mb-2">
        {/* ADD TO CART */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={disablePurchaseActions}
          className="btn pa-btn pa-btn-cart flex-grow-1 d-flex align-items-center justify-content-center gap-2"
          style={{
            minHeight: "50px",
            borderRadius: "10px",
          }}
        >
          <FiShoppingCart size={18} className="pa-cart-icon" />
          <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
        </button>

        {/* WISHLIST BUTTON */}
        {onWishlist && (
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`btn pa-btn pa-btn-wishlist d-flex align-items-center justify-content-center ${
              isWishlisted ? "active" : ""
            }`}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            style={{
              width: "50px",
              minWidth: "50px",
              height: "50px",
              borderRadius: "10px",
            }}
          >
            <FiHeart
              size={20}
              className={isWishlistAnimating ? "pa-wishlist-pop" : ""}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>
        )}
      </div>

      {/* =================================================
          BUY NOW
      ================================================= */}
      {onBuyNow && (
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={disablePurchaseActions}
          className="btn pa-btn pa-btn-buy w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
          style={{
            minHeight: "50px",
            borderRadius: "10px",
          }}
        >
          <FiZap size={18} className="pa-zap-icon" />
          <span>Buy Now</span>
        </button>
      )}

      {/* =================================================
          BULK QUOTE
      ================================================= */}
      {onBulkQuote && (
        <button
          type="button"
          onClick={() => onBulkQuote(product)}
          className="btn pa-btn pa-btn-bulk w-100 d-flex align-items-center justify-content-center gap-2"
          style={{
            minHeight: "46px",
            borderRadius: "10px",
            marginTop: "6px",
          }}
        >
          <FiFileText size={16} />
          <span>Request Bulk Quote</span>
        </button>
      )}

      {/* =================================================
          SECURITY & TRUST BADGES
      ================================================= */}
      <div
        className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-4 pt-3"
        style={{
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <span className="pa-trust-badge">
          <FiShield size={14} /> Quality Verified
        </span>

        <span className="pa-trust-badge">
          <FiPackage size={14} /> Secure Handling
        </span>

        <span className="pa-trust-badge">
          <FiLayers size={14} /> Bulk Certified
        </span>
      </div>
    </div>
  );
};

export default ProductActions;