import React, { useState } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity, updateQuantity } =
    useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  if (!item) return null;

  const image =
    item.image ||
    item.images?.[0]?.url ||
    (typeof item.images?.[0] === "string" ? item.images[0] : "") ||
    "https://placehold.co/300x300?text=Product";

  const price = Number(item.price || 0);
  const quantity = Number(item.quantity || 1);
  const minQuantity = Number(item.minimumOrderQuantity || 1);
  const lineTotal = price * quantity;

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.cartItemId);
    }, 250);
  };

  return (
    <div className={`modern-cart-item ${isRemoving ? "item-leaving" : ""}`}>
      {/* Product Image Thumbnail */}
      <div className="product-image-container">
        <img
          src={image}
          alt={item.name || "Product"}
          className="product-image"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/300x300?text=Product";
          }}
        />
      </div>

      {/* Main Details */}
      <div className="product-info-col">
        {/* Title & Category & Delete */}
        <div className="item-header-row">
          <div className="item-headings">
            {item.category && (
              <span className="item-category-tag">{item.category}</span>
            )}
            <h3 className="item-title">{item.name || "Product"}</h3>
            {item.sku && <span className="item-sku">SKU: {item.sku}</span>}
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemove}
            className="delete-button"
            aria-label="Remove item"
            title="Remove item"
          >
            <FiTrash2 size={16} />
          </button>
        </div>

        {/* Variants: Size / Color Pills */}
        {(item.size || item.color) && (
          <div className="variants-wrap">
            {item.size && (
              <span className="variant-pill">
                Size: <strong>{item.size}</strong>
              </span>
            )}
            {item.color && (
              <span className="variant-pill">
                Color: <strong>{item.color}</strong>
              </span>
            )}
          </div>
        )}

        {/* Actions & Pricing Row */}
        <div className="item-footer-row">
          {/* Unit Price */}
          <div className="price-stack">
            <span className="unit-price">
              ₹{price.toLocaleString("en-IN")}
            </span>
            {item.originalPrice && Number(item.originalPrice) > price && (
              <span className="original-price">
                ₹{Number(item.originalPrice).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Custom Quantity Stepper */}
          <div className="stepper-box">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => decreaseQuantity(item.cartItemId)}
              disabled={quantity <= minQuantity}
              aria-label="Decrease quantity"
            >
              <FiMinus size={13} />
            </button>

            <input
              type="number"
              min={minQuantity}
              value={quantity}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (!val || val < minQuantity) {
                  updateQuantity(item.cartItemId, minQuantity);
                  return;
                }
                updateQuantity(item.cartItemId, val);
              }}
              className="stepper-input"
            />

            <button
              type="button"
              className="stepper-btn"
              onClick={() => increaseQuantity(item.cartItemId)}
              aria-label="Increase quantity"
            >
              <FiPlus size={13} />
            </button>
          </div>

          {/* Line Total */}
          <div className="line-total-stack">
            <span className="line-total-label">Subtotal</span>
            <span className="line-total-amount">
              ₹{lineTotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .modern-cart-item {
          display: flex;
          gap: 18px;
          padding: 22px 0;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modern-cart-item:last-child {
          border-bottom: none;
        }

        .modern-cart-item.item-leaving {
          opacity: 0;
          transform: scale(0.96) translateY(-10px);
          max-height: 0;
          padding: 0;
          margin: 0;
          overflow: hidden;
        }

        /* IMAGE STYLES */
        .product-image-container {
          width: 110px;
          height: 125px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          position: relative;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .modern-cart-item:hover .product-image {
          transform: scale(1.06);
        }

        /* INFO COLUMN */
        .product-info-col {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .item-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .item-headings {
          display: flex;
          flex-direction: column;
        }

        .item-category-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #2563eb;
          margin-bottom: 4px;
        }

        .item-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.35;
        }

        .item-sku {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 4px;
        }

        /* DELETE ACTION BUTTON */
        .delete-button {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid transparent;
          background: #f8fafc;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .delete-button:hover {
          background: #fef2f2;
          color: #ef4444;
          border-color: #fee2e2;
          transform: scale(1.05);
        }

        /* VARIANTS */
        .variants-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .variant-pill {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 12px;
          color: #475569;
        }

        /* FOOTER CONTROLS */
        .item-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 14px;
          flex-wrap: wrap;
        }

        .price-stack {
          display: flex;
          flex-direction: column;
        }

        .unit-price {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
        }

        .original-price {
          font-size: 12px;
          color: #94a3b8;
          text-decoration: line-through;
        }

        /* STEPPER */
        .stepper-box {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .stepper-box:focus-within {
          border-color: #2563eb;
        }

        .stepper-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: #f8fafc;
          color: #0f172a;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .stepper-btn:hover:not(:disabled) {
          background: #e2e8f0;
        }

        .stepper-btn:disabled {
          color: #cbd5e1;
          cursor: not-allowed;
          background: #f8fafc;
        }

        .stepper-input {
          width: 44px;
          height: 32px;
          border: none;
          outline: none;
          text-align: center;
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
          background: #ffffff;
        }

        /* Remove browser default arrows on number inputs */
        .stepper-input::-webkit-outer-spin-button,
        .stepper-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .line-total-stack {
          text-align: right;
          margin-left: auto;
        }

        .line-total-label {
          display: block;
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .line-total-amount {
          font-size: 17px;
          font-weight: 800;
          color: #0f172a;
        }

        /* MOBILE RESPONSIVENESS */
        @media (max-width: 520px) {
          .product-image-container {
            width: 85px;
            height: 95px;
          }
          .item-title {
            font-size: 14px;
          }
          .line-total-stack {
            margin-left: 0;
          }
          .item-footer-row {
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItem;