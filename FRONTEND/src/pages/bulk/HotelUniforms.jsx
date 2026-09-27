import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaFileDownload,
  FaConciergeBell,
  FaUtensils,
  FaBed
} from "react-icons/fa";
import Customizations from "../../components/bulk/Customization";
import HotelCatalogSection from "../../components/bulk/hotel/HotelCatalogSection";

export default function HotelUniforms() {
  return (
    <div className="hotel-hero-page">
      <style>{`
        /* ==========================================================
           CLEAN LIGHT THEME COLOR PROFILE & TOKENS
        =========================================================== */
        :root {
          /* Canvas & Backgrounds */
          --bg-main:            #F4F8FE; /* Ultra-clean ice porcelain canvas */
          --bg-surface:         #FFFFFF; /* Pure white card surface */
          --bg-badge-tint:      #E8F5FE; /* Soft light-cyan badge & chip background */
          
          /* Logo Accent Blue & Cyan */
          --color-cobalt:       #0052FF; /* Primary buttons, links, active icons */
          --color-cobalt-hover: #003ECC; /* Darker cobalt for hover states */
          --color-cyan:         #00D4FF; /* Swoosh highlights, secondary icons, glows */
          
          /* Typography */
          --text-title:         #071838; /* Crisp, high-contrast dark navy for headings */
          --text-body:          #495E7C; /* Soft slate navy for paragraphs */
          --text-muted:         #6B82A0; /* Light slate for captions and small labels */

          /* Borders & Dividers */
          --border-subtle:      rgba(0, 82, 255, 0.14);  /* Clean card borders */
          --border-hover:       rgba(0, 212, 255, 0.60); /* Cyan glowing border on hover */
          
          /* Shadows & Glows */
          --shadow-card:        0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-card-hover:  0 20px 48px rgba(0, 82, 255, 0.12);
          --shadow-glow:        0 8px 25px rgba(0, 82, 255, 0.32);
          --shadow-glow-hover:  0 12px 32px rgba(0, 82, 255, 0.45);
        }

        .hotel-hero-page {
          background-color: var(--bg-main);
          color: var(--text-body);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ==========================================================
           KEYFRAME ANIMATIONS
        =========================================================== */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatCard {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulseBadge {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 82, 255, 0.25);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(0, 82, 255, 0);
          }
        }

        @keyframes shimmerBtn {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* ==========================================================
           HERO CONTAINER
        =========================================================== */
        .hero-section-box {
          position: relative;
          background-color: var(--bg-main);
          padding: 85px 24px 75px;
          border-bottom: 1.5px solid var(--border-subtle);
          background-image: 
            radial-gradient(circle at 12% 18%, rgba(0, 212, 255, 0.10) 0%, transparent 40%),
            radial-gradient(circle at 88% 82%, rgba(0, 82, 255, 0.08) 0%, transparent 45%);
        }

        .hero-inner-container {
          max-width: 1220px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }

        /* ==========================================================
           LEFT COLUMN ELEMENTS & ANIMATIONS
        =========================================================== */
        .hero-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-badge-tint);
          color: var(--color-cobalt);
          border: 1px solid var(--border-subtle);
          padding: 7px 18px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          margin-bottom: 18px;
          animation: fadeInUp 0.6s ease-out forwards;
          transition: all 0.3s ease;
          cursor: default;
        }

        .hero-tag-badge:hover {
          background-color: #FFFFFF;
          border-color: var(--color-cyan);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 212, 255, 0.25);
        }

        .hero-main-title {
          color: var(--text-title);
          font-size: clamp(2.3rem, 4vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.8px;
          margin-bottom: 18px;
          animation: fadeInUp 0.7s ease-out forwards;
        }

        .hero-main-title .blue-accent {
          color: var(--color-cobalt);
          position: relative;
          display: inline-block;
          transition: color 0.3s ease;
        }

        .hero-main-title .blue-accent:hover {
          color: var(--color-cyan);
        }

        .hero-body-text {
          color: var(--text-body);
          font-size: 16px;
          line-height: 1.65;
          max-width: 560px;
          margin-bottom: 32px;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* CTA BUTTON INTERACTIONS */
        .hero-btn-group {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          animation: fadeInUp 0.9s ease-out forwards;
        }

        .btn-cobalt-fill {
          background-color: var(--color-cobalt);
          color: #FFFFFF;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: var(--shadow-glow);
          border: none;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-cobalt-fill:hover {
          background-color: var(--color-cobalt-hover);
          transform: translateY(-3px) scale(1.02);
          box-shadow: var(--shadow-glow-hover);
          color: #FFFFFF;
        }

        .btn-cobalt-fill .btn-arrow-icon {
          transition: transform 0.25s ease;
        }

        .btn-cobalt-fill:hover .btn-arrow-icon {
          transform: translateX(4px);
        }

        .btn-surface-outline {
          background-color: var(--bg-surface);
          color: var(--text-title);
          border: 1.5px solid var(--border-subtle);
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          box-shadow: var(--shadow-card);
          transition: all 0.28s ease;
        }

        .btn-surface-outline:hover {
          border-color: var(--border-hover);
          color: var(--color-cobalt);
          transform: translateY(-3px);
          box-shadow: var(--shadow-card-hover);
        }

        /* STATS COUNTER TILES */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding-top: 24px;
          border-top: 1.5px solid var(--border-subtle);
          margin-top: 36px;
          animation: fadeInUp 1s ease-out forwards;
        }

        .stat-tile {
          padding: 10px 12px;
          border-radius: 12px;
          transition: all 0.25s ease;
        }

        .stat-tile:hover {
          background: #FFFFFF;
          box-shadow: var(--shadow-card);
          transform: translateY(-2px);
        }

        .stat-figure {
          color: var(--text-title);
          font-size: 26px;
          font-weight: 800;
          margin: 0;
          transition: color 0.25s ease;
        }

        .stat-tile:hover .stat-figure {
          color: var(--color-cobalt);
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          margin: 4px 0 0;
        }

        /* ==========================================================
           RIGHT COLUMN: SHOWCASE CARD & HOVER EFFECTS
        =========================================================== */
        .surface-showcase-card {
          background-color: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          border-radius: 24px;
          padding: 30px;
          box-shadow: var(--shadow-card);
          position: relative;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          animation: floatCard 6s ease-in-out infinite;
        }

        .surface-showcase-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-6px);
        }

        .card-top-pill {
          position: absolute;
          top: -14px;
          right: 28px;
          background-color: var(--bg-badge-tint);
          color: var(--color-cobalt);
          border: 1px solid var(--border-subtle);
          font-size: 11px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 50px;
          animation: pulseBadge 3s infinite;
          transition: transform 0.25s ease;
        }

        .surface-showcase-card:hover .card-top-pill {
          transform: scale(1.05);
        }

        /* SPEC TILES WITH SLIDE-RIGHT HOVER */
        .spec-item-box {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 14px;
          background-color: var(--bg-main);
          border: 1px solid var(--border-subtle);
          margin-bottom: 12px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .spec-item-box:hover {
          background-color: #FFFFFF;
          border-color: var(--border-hover);
          transform: translateX(6px);
          box-shadow: 0 6px 18px rgba(0, 82, 255, 0.08);
        }

        .spec-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background-color: var(--bg-badge-tint);
          color: var(--color-cobalt);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          border: 1px solid var(--border-subtle);
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .spec-item-box:hover .spec-icon-wrapper {
          background-color: var(--color-cobalt);
          color: #FFFFFF;
          transform: rotate(6deg) scale(1.08);
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.25);
        }

        /* GUARANTEE NOTICE BOX */
        .guarantee-notice {
          margin-top: 18px;
          padding: 12px 14px;
          background-color: var(--bg-badge-tint);
          border-radius: 12px;
          border: 1px dashed var(--color-cobalt);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: var(--text-title);
          transition: all 0.25s ease;
        }

        .guarantee-notice:hover {
          background-color: #FFFFFF;
          box-shadow: 0 6px 20px rgba(0, 82, 255, 0.12);
          transform: translateY(-2px);
        }

        @media (max-width: 992px) {
          .hero-inner-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-body-text {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-btn-group {
            justify-content: center;
          }
          .hero-stats-grid {
            justify-content: center;
          }
          .surface-showcase-card {
            animation: none;
          }
        }
      `}</style>

      {/* ========================================================
          HERO SECTION
      ========================================================= */}
      <section className="hero-section-box">
        <div className="hero-inner-container">
          
          {/* LEFT COLUMN: EDITORIAL & ACTIONS */}
          <div>
            <div className="hero-tag-badge">
              <FaConciergeBell /> 5-Star Luxury & Resort Apparel
            </div>

            <h1 className="hero-main-title">
              Distinguished Hospitality Uniforms for <span className="blue-accent">World-Class Guest Experiences</span>
            </h1>

            <p className="hero-body-text">
              Direct factory manufacturing for luxury hotels, resorts, fine-dining restaurants,
              and club lounges. Precision-stitched front-desk blazers, breathable executive chef coats,
              and industrial-laundry certified housekeeping apparel.
            </p>

            <div className="hero-btn-group">
              <Link to="/customization" className="btn-cobalt-fill">
                Configure Hotel Bulk Order <FaArrowRight size={13} className="btn-arrow-icon" />
              </Link>

              <a href="#hotel-lookbook" className="btn-surface-outline">
                <FaFileDownload size={14} color="#0052FF" /> Download Lookbook & Swatches
              </a>
            </div>

            {/* INTERACTIVE STATS STRIP */}
            <div className="hero-stats-grid">
              <div className="stat-tile">
                <h4 className="stat-figure">350+</h4>
                <p className="stat-label">Hotels Clothed</p>
              </div>
              <div className="stat-tile">
                <h4 className="stat-figure">100+</h4>
                <p className="stat-label">Wash Durability</p>
              </div>
              <div className="stat-tile">
                <h4 className="stat-figure">14 Days</h4>
                <p className="stat-label">Express Batch Run</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FLOATING SPECIFICATION CARD */}
          <div>
            <div className="surface-showcase-card">
              <span className="card-top-pill">
                <FaCheckCircle style={{ marginRight: 5 }} /> INDUSTRIAL LAUNDRY CERTIFIED
              </span>

              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-title)", marginBottom: "16px" }}>
                Hotel & Resort Manufacturing Standards
              </h4>

              {/* Spec Tile 1: Front Office */}
              <div className="spec-item-box">
                <div className="spec-icon-wrapper">
                  <FaConciergeBell />
                </div>
                <div>
                  <h6 style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--text-title)", fontSize: "14px" }}>
                    Front-Desk & Concierge Suiting
                  </h6>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                    Poly-viscose wool-touch blazers and stain-resistant formal waistcoats.
                  </p>
                </div>
              </div>

              {/* Spec Tile 2: Culinary & Kitchen */}
              <div className="spec-item-box">
                <div className="spec-icon-wrapper">
                  <FaUtensils />
                </div>
                <div>
                  <h6 style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--text-title)", fontSize: "14px" }}>
                    Executive Chef Coats & Aprons
                  </h6>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                    Breathable heat-deflecting poly-cotton twill with underarm moisture vents.
                  </p>
                </div>
              </div>

              {/* Spec Tile 3: Housekeeping & Facilities */}
              <div className="spec-item-box">
                <div className="spec-icon-wrapper">
                  <FaBed />
                </div>
                <div>
                  <h6 style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--text-title)", fontSize: "14px" }}>
                    Ergonomic Housekeeping Tunics
                  </h6>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                    Tear-resistant flexible weaves with reinforced double-stitched pockets.
                  </p>
                </div>
              </div>

              {/* Guarantee Box */}
              <div className="guarantee-notice">
                <FaShieldAlt color="#0052FF" size={18} />
                <span>
                  <b>Color-Lock Guarantee:</b> Reactive-vat dyed to withstand high-temperature commercial washing.
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOTEL CATALOG SAMPLES SECTION */}
      <HotelCatalogSection />

      {/* 3. BULK CUSTOMIZATION FORM */}
      <Customizations />
    </div>
  );
}