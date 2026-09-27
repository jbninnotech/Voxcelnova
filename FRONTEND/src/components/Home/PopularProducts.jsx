import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaArrowRight, FaBolt } from "react-icons/fa";

const PopularProducts = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const products = [
    {
      id: 1,
      category: "Wovens",
      name: "Classic Oxford Poplin",
      description: "100% combed cotton, 120 GSM ultra-breathable weave.",
      price: "₹340",
      unit: "/meter",
      badge: "Best Seller",
      image:
        "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      category: "Knits",
      name: "Cotton Jersey Knit",
      description: "Single jersey, 160 GSM premium elastane blend.",
      price: "₹280",
      unit: "/meter",
      badge: "Popular",
      image:
        "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      category: "Denim",
      name: "Rigid Selvedge Denim",
      description: "14oz authentic ring-spun deep indigo structure.",
      price: "₹560",
      unit: "/meter",
      badge: "Heavy Duty",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      category: "Technical",
      name: "Ripstop Technical Weave",
      description: "Water-resistant, 180 GSM tear-proof composite.",
      price: "₹610",
      unit: "/meter",
      badge: "Engineered",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="vw-popular-section position-relative overflow-hidden">
      <style>{`
        /* ================= COLOR THEME FROM LOGO =================
           Primary: #0052fe (Electric Blue)
           Accent: #00d4ff (Neon Cyan Swoosh)
           White Sheen: #ffffff (Chrome Reflection)
           Dark Core: #030712 & #02040a (Obsidian Black)
        =========================================================== */

        .vw-popular-section {
          background-color: #02040a;
          background-image: 
            radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0, 82, 254, 0.22) 0%, transparent 60%),
            radial-gradient(circle at 10% 85%, rgba(0, 212, 255, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 90% 85%, rgba(0, 82, 254, 0.15) 0%, transparent 50%);
          padding: 90px 0;
          color: #ffffff;
          position: relative;
        }

        /* Ambient Cyber Grid lines */
        .vw-popular-section::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 82, 254, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        /* Top Pill Badge with Swoosh Pulse */
        .vw-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 82, 254, 0.15);
          border: 1px solid rgba(0, 212, 255, 0.4);
          color: #00d4ff;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 50px;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
          animation: badgeGlow 3s ease-in-out infinite alternate;
        }

        @keyframes badgeGlow {
          0% { box-shadow: 0 0 12px rgba(0, 212, 255, 0.15); }
          100% { box-shadow: 0 0 25px rgba(0, 82, 254, 0.45); }
        }

        /* Section Title & Gradients */
        .vw-title {
          font-size: clamp(2rem, 3.4vw, 2.9rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #ffffff;
          line-height: 1.2;
        }

        .vw-gradient-text {
          background: linear-gradient(135deg, #ffffff 10%, #00d4ff 50%, #0052fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .vw-subtitle {
          color: #94a3b8;
          font-size: 1.02rem;
          max-width: 580px;
        }

        /* Full Catalog Action Button with Swoosh border */
        .vw-catalog-btn {
          position: relative;
          background: rgba(10, 20, 42, 0.6);
          border: 1px solid rgba(0, 212, 255, 0.4);
          color: #00d4ff;
          padding: 11px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.92rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .vw-catalog-btn:hover {
          color: #ffffff;
          background: linear-gradient(135deg, #0052fe 0%, #00d4ff 100%);
          border-color: #00d4ff;
          box-shadow: 0 0 25px rgba(0, 212, 255, 0.4);
          transform: translateY(-2px);
        }

        /* 4 Cards in 1 Row - 3D Glass Surface */
        .vw-product-card {
          position: relative;
          background: linear-gradient(180deg, rgba(8, 16, 34, 0.85) 0%, rgba(3, 7, 18, 0.95) 100%);
          border-radius: 16px;
          border: 1px solid rgba(0, 82, 254, 0.25);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65);
        }

        /* Card Hover Swoosh Aura */
        .vw-product-card:hover {
          transform: translateY(-10px);
          border-color: #00d4ff;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(0, 212, 255, 0.25),
            inset 0 0 15px rgba(0, 82, 254, 0.2);
        }

        /* Image Wrapper with Dynamic Zoom & Sheen */
        .vw-img-container {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #000000;
        }

        .vw-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
          filter: brightness(0.85) contrast(1.05);
        }

        .vw-product-card:hover .vw-card-img {
          transform: scale(1.1);
          filter: brightness(1.02);
        }

        /* Diagonal Chrome Shine Passing Through Image on Hover */
        .vw-shine-effect {
          position: absolute;
          top: 0;
          left: -150%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            60deg,
            transparent 20%,
            rgba(255, 255, 255, 0.2) 40%,
            rgba(0, 212, 255, 0.3) 50%,
            transparent 70%
          );
          transform: skewX(-25deg);
          pointer-events: none;
          transition: left 0.75s ease;
        }

        .vw-product-card:hover .vw-shine-effect {
          left: 150%;
        }

        .vw-img-dark-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(2, 4, 10, 0.05) 0%, rgba(3, 7, 18, 0.9) 95%);
          pointer-events: none;
        }

        /* Top Swoosh Badge */
        .vw-card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(2, 6, 23, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 212, 255, 0.35);
          color: #00d4ff;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
          z-index: 2;
        }

        /* Card Content Body */
        .vw-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .vw-category {
          color: #00d4ff;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 6px;
        }

        .vw-item-title {
          color: #ffffff;
          font-size: 1.12rem;
          font-weight: 700;
          margin-bottom: 6px;
          line-height: 1.35;
          transition: color 0.3s ease;
        }

        .vw-product-card:hover .vw-item-title {
          color: #00d4ff;
        }

        .vw-desc {
          color: #94a3b8;
          font-size: 0.83rem;
          line-height: 1.5;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Pricing Section */
        .vw-price-wrap {
          margin-top: auto;
          margin-bottom: 16px;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .vw-price-val {
          font-size: 1.45rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .vw-price-unit {
          color: #64748b;
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* Action Buttons */
        .vw-btn-group {
          display: flex;
          gap: 8px;
        }

        .vw-details-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #cbd5e1;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 8px 10px;
          border-radius: 8px;
          text-decoration: none;
          text-align: center;
          transition: all 0.3s ease;
        }

        .vw-details-btn:hover {
          background: rgba(0, 212, 255, 0.12);
          border-color: #00d4ff;
          color: #00d4ff;
        }

        .vw-cart-btn {
          background: linear-gradient(135deg, #0052fe 0%, #003ebd 100%);
          border: 1px solid #0052fe;
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .vw-cart-btn:hover {
          background: linear-gradient(135deg, #00d4ff 0%, #0052fe 100%);
          border-color: #00d4ff;
          box-shadow: 0 0 16px rgba(0, 212, 255, 0.5);
          transform: scale(1.04);
        }
      `}</style>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        {/* Header with Logo Accents */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-5">
          <div>
            

            <h2 className="vw-title mb-2">
              Popular <span className="vw-gradient-text">This Season</span>
            </h2>

            <p className="vw-subtitle mb-0">
              High-tensile, industrial-spec fabrics engineered for longevity and exceptional finish.
            </p>
          </div>

          <Link to="/products" className="vw-catalog-btn">
            <span>View Full Catalog</span>
            <FaArrowRight style={{ fontSize: "0.8rem" }} />
          </Link>
        </div>

        {/* 4 Cards in 1 Row on Desktop (col-lg-3) */}
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
              <div
                className="vw-product-card"
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Media frame with sheen & badge */}
                <div className="vw-img-container">
                  <span className="vw-card-badge">{product.badge}</span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="vw-card-img"
                    loading="lazy"
                  />
                  <div className="vw-shine-effect" />
                  <div className="vw-img-dark-overlay" />
                </div>

                {/* Card Body */}
                <div className="vw-card-body">
                  <div className="vw-category">{product.category}</div>
                  <h3 className="vw-item-title">{product.name}</h3>
                  <p className="vw-desc">{product.description}</p>

                  {/* Price Row */}
                  <div className="vw-price-wrap">
                    <span className="vw-price-val">{product.price}</span>
                    <span className="vw-price-unit">{product.unit}</span>
                  </div>

                  {/* Buttons with Swoosh Glow */}
                  <div className="vw-btn-group">
                    <Link
                      to={`/products/${product.id}`}
                      className="vw-details-btn"
                    >
                      Details
                    </Link>

                    <button className="vw-cart-btn" title="Add to Cart">
                      <FaShoppingCart style={{ fontSize: "0.8rem" }} />
                      <span>Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;