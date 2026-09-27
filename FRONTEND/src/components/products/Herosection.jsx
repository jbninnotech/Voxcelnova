import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaArrowRight,
  FaShieldAlt,
  FaTruck,
  FaAward,
  FaTags,
  FaCheckCircle
} from "react-icons/fa";

export default function ProductsHero({ onSearch, onCategorySelect }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const quickFilters = [
    { id: "all", label: "All Collections" },
  
  ];

  const handleFilterClick = (id) => {
    setActiveFilter(id);
    if (onCategorySelect) onCategorySelect(id);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <>
      <style>{`
        /* =========================================
           HERO CONTAINER & BACKGROUND
        ========================================= */
        .vx-products-hero {
          position: relative;
          width: 100%;
          min-height: 520px;
          display: flex;
          align-items: center;
          background-image: url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920&auto=format&fit=crop");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          overflow: hidden;
        }

        /* DUAL OVERLAY FOR CRISP READABILITY & BRAND BLUE ACCENTS */
        .vx-products-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(6, 18, 48, 0.90) 0%,
    
            rgba(0, 0, 0, 0.78) 100%
          );
          z-index: 1;
        }

        /* SUBTLE MESH PATTERN */
        .vx-products-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 20%, rgba(39, 213, 232, 0.18) 0%, transparent 50%);
          z-index: 2;
          pointer-events: none;
        }

        .vx-hero-content {
          position: relative;
          z-index: 5;
        }

        /* =========================================
           TOP BADGE
        ========================================= */
        .vx-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 30px;
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        /* =========================================
           SEARCH BOX
        ========================================= */
        .vx-hero-search-wrapper {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          padding: 6px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.4);
          max-width: 680px;
        }

        .vx-hero-input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 0.96rem;
          color: #111827;
          padding: 10px 16px;
          width: 100%;
        }

        .vx-hero-input::placeholder {
          color: #64748b;
        }

        .vx-hero-search-btn {
          background: linear-gradient(135deg, #1464D2, #168CEB);
          color: #FFFFFF;
          border: none;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 12px;
          padding: 11px 24px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .vx-hero-search-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(20, 100, 210, 0.45);
          color: #FFFFFF;
        }

        /* =========================================
           FILTER PILLS
        ========================================= */
        .vx-filter-pill {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(6px);
        }

        .vx-filter-pill:hover,
        .vx-filter-pill.active {
          background: #FFFFFF;
          color: #1464D2;
          border-color: #FFFFFF;
          font-weight: 700;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
        }

        /* =========================================
           FEATURE TRUST METRICS
        ========================================= */
        .vx-trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .vx-trust-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(39, 213, 232, 0.16);
          border: 1px solid rgba(39, 213, 232, 0.35);
          color: #27D5E8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .vx-products-hero {
            min-height: 460px;
            padding-top: 40px;
            padding-bottom: 40px;
          }
        }
      `}</style>

      <section className="vx-products-hero">
        <div className="container vx-hero-content py-5">
          <div className="row justify-content-center text-center">
            <div className="col-12 col-lg-10 col-xl-9">
              
              {/* BADGE */}
             

              {/* MAIN TITLE */}
              <h1
                className="display-5 fw-bold text-white mb-3"
                style={{ letterSpacing: "-0.5px", lineHeight: "1.2" }}
              >
                Engineered for Comfort, Built for{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #27D5E8, #FFFFFF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Durability
                </span>
              </h1>

              {/* SUBTITLE */}
              <p
                className="lead text-white-50 mb-4 mx-auto"
                style={{ maxWidth: "680px", fontSize: "1.05rem" }}
              >
                Browse our industry-grade uniform catalog for schools, corporations,
                hospitals, and hospitality teams. Available for retail and bulk purchase.
              </p>

              {/* SEARCH BAR */}
            
        
              {/* TRUST METRICS STRIP */}
           
            </div>
          </div>
        </div>
      </section>
    </>
  );
}