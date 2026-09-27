import React, { useState } from "react";
import { FiHeart, FiSend, FiCheck, FiMaximize2 } from "react-icons/fi";

const ProductGallery = ({
  images = [],
  productTitle = "Product",
  isWishlisted = false,
  onWishlistToggle,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Fallback if no images provided
  const displayImages =
    images && images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
        ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productTitle,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share dismissed");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="apple-gallery-container">
      {/* =================================================
          SCOPED STYLES
      ================================================= */}
      <style>{`
        .apple-gallery-container {
          position: relative;
          width: 100%;
          user-select: none;
        }

        /* Floating Top-Right Action Badges */
        .gallery-floating-actions {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 15;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .gallery-action-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1E293B;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        .gallery-action-btn:hover {
          background: #ffffff;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          color: #0F172A;
        }

        .gallery-action-btn:active {
          transform: scale(0.92);
        }

        .gallery-action-btn.wishlisted {
          color: #E11D48;
          background: #FFF1F2;
          border-color: #FECDD3;
        }

        /* 2x2 Apple Style Card Grid */
        .apple-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .apple-image-card {
          position: relative;
          background: #F5F5F7; /* Apple signature soft grey */
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1 / 1.08;
          cursor: zoom-in;
          transition: transform 0.3s ease, background 0.2s ease;
        }

        .apple-image-card:hover {
          background: #EFEFF1;
        }

        .apple-image-card img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* Keeps product uncropped like Apple */
          padding: 20px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-image-card:hover img {
          transform: scale(1.04);
        }

        /* Floating Toast for "Link Copied" */
        .gallery-toast {
          position: absolute;
          top: 70px;
          right: 18px;
          background: #0F172A;
          color: #FFFFFF;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          animation: fadeInOut 0.2s ease-out;
          z-index: 20;
        }

        @keyframes fadeInOut {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive Mobile Layout (Single Column) */
        @media (max-width: 768px) {
          .apple-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .apple-image-card {
            border-radius: 18px;
            aspect-ratio: 1 / 1;
          }
        }
      `}</style>

      {/* =================================================
          FLOATING ICONS (Heart & Share)
      ================================================= */}
      <div className="gallery-floating-actions">
        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => onWishlistToggle?.()}
          className={`gallery-action-btn ${isWishlisted ? "wishlisted" : ""}`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Wishlist"
        >
          <FiHeart
            size={20}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="gallery-action-btn"
          title="Share product"
          aria-label="Share"
        >
          <FiSend size={18} style={{ transform: "rotate(10deg)" }} />
        </button>

        {/* Copy Feedback */}
        {copied && (
          <div className="gallery-toast">
            <FiCheck size={14} color="#22C55E" /> Link Copied!
          </div>
        )}
      </div>

      {/* =================================================
          APPLE-STYLE 2-COLUMN GRID TILES
      ================================================= */}
      <div className="apple-grid">
        {displayImages.map((src, index) => (
          <div key={index} className="apple-image-card">
            <img
              src={src}
              alt={`${productTitle} angle ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;