import React from "react";
import { FiTag, FiCheckCircle } from "react-icons/fi";

const ProductPrice = ({ price = 0, salePrice }) => {
  const numPrice = Number(price) || 0;
  const numSalePrice = Number(salePrice) || 0;

  const hasSale =
    salePrice !== undefined &&
    salePrice !== null &&
    salePrice !== "" &&
    numSalePrice < numPrice;

  const currentPrice = hasSale ? numSalePrice : numPrice;
  const savingsAmount = hasSale ? numPrice - numSalePrice : 0;
  const discountPercent = hasSale
    ? Math.round((savingsAmount / numPrice) * 100)
    : 0;

  return (
    <div className="product-price-container">
      <style>{`
        .product-price-container {
          margin-bottom: 1.25rem;
          font-family: inherit;
        }

        /* Price Row */
        .price-row {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 10px 14px;
        }

        /* Current Highlighted Price */
        .current-price {
          font-size: clamp(1.75rem, 4vw, 2.25rem); /* Responsive: 28px - 36px */
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.03em;
          line-height: 1.1;
          display: inline-flex;
          align-items: baseline;
        }

        .currency-symbol {
          font-size: 0.8em;
          font-weight: 700;
          margin-right: 2px;
          color: #1e293b;
        }

        /* Original Strikethrough Price */
        .original-price {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #94a3b8;
          font-weight: 500;
          text-decoration: line-through;
          text-decoration-thickness: 1.5px;
          text-decoration-color: #cbd5e1;
        }

        /* Animated Discount Badge */
        .discount-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          padding: 4px 10px;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
          animation: badge-pulse 2.5s infinite ease-in-out;
        }

        @keyframes badge-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
          }
        }

        /* Savings Callout */
        .savings-text {
          font-size: 0.825rem;
          color: #059669;
          font-weight: 600;
          background: #ecfdf5;
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid #a7f3d0;
        }

        /* Meta Information Row (Taxes & Pieces) */
        .price-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 8px;
        }

        .meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
          background: #f8fafc;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #f1f5f9;
        }

        /* Mobile specific adjustments */
        @media (max-width: 420px) {
          .price-row {
            gap: 8px 10px;
          }
          .price-meta {
            gap: 8px;
          }
        }
      `}</style>

      {/* Main Pricing Row */}
      <div className="price-row">
        <span className="current-price">
          <span className="currency-symbol">₹</span>
          {currentPrice.toLocaleString("en-IN")}
        </span>

        {hasSale && (
          <>
            <span className="original-price">
              ₹{numPrice.toLocaleString("en-IN")}
            </span>

            <span className="discount-badge">
              {discountPercent}% OFF
            </span>

            <span className="savings-text">
              Save ₹{savingsAmount.toLocaleString("en-IN")}
            </span>
          </>
        )}
      </div>

      {/* Meta Information */}
      <div className="price-meta">
        <div className="meta-pill">
          <FiTag size={13} color="#64748b" />
          <span>Price per piece</span>
        </div>

        <div className="meta-pill">
          <FiCheckCircle size={13} color="#10b981" />
          <span>Inclusive of all taxes</span>
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;