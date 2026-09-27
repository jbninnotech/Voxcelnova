import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaFileDownload,
  FaBuilding,
  FaTshirt,
  FaTruck,
  FaAward
} from "react-icons/fa";
import CorporateCatalogSection from "../../components/bulk/corporate-uniforms/CorporateCatalogSection"
import Customizations from "../../components/bulk/Customization"

export default function CorporateUniforms() {
  return (
    <>
    <div className="corporate-hero-page">
      <style>{`
        /* ==========================================================
           EXPLICIT LIGHT THEME PALETTE
        =========================================================== */
        :root {
          /* Backgrounds */
          --bg-main:         #F4F8FE;
          --bg-surface:      #FFFFFF;
          --bg-badge-tint:   #E8F5FE;
          
          /* Accent Blues */
          --color-cobalt:    #0052FF;
          --color-cobalt-hover: #003ECC;
          --color-cyan:      #00D4FF;
          
          /* Text Colors */
          --text-title:      #071838;
          --text-body:       #495E7C;
          --text-muted:      #6B82A0;

          /* Borders & Shadows */
          --border-subtle:   rgba(0, 82, 255, 0.14);
          --border-hover:    rgba(0, 212, 255, 0.60);
          --shadow-card:     0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow:     0 8px 25px rgba(0, 82, 255, 0.32);
        }

        /* 1. Page Canvas Background: #F4F8FE */
        .corporate-hero-page {
          background-color: var(--bg-main); /* #F4F8FE */
          color: var(--text-body);          /* #495E7C */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          min-height: 100vh;
        }

        /* 2. Hero Outer Container */
        .hero-section-box {
          background-color: var(--bg-main); /* #F4F8FE */
          padding: 80px 24px 70px;
          border-bottom: 1.5px solid var(--border-subtle);
        }

        .hero-inner-container {
          max-width: 1220px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }

        /* 3. Badge (Background: #E8F5FE | Text: #0052FF) */
        .hero-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-badge-tint); /* #E8F5FE */
          color: var(--color-cobalt);             /* #0052FF */
          border: 1px solid var(--border-subtle);
          padding: 7px 16px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        /* 4. Headings (Text: #071838 | Highlight: #0052FF) */
        .hero-main-title {
          color: var(--text-title);               /* #071838 */
          font-size: clamp(2.3rem, 4vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.8px;
          margin-bottom: 18px;
        }

        .hero-main-title .blue-accent {
          color: var(--color-cobalt);             /* #0052FF */
        }

        /* 5. Paragraph Body (Text: #495E7C) */
        .hero-body-text {
          color: var(--text-body);                /* #495E7C */
          font-size: 16px;
          line-height: 1.65;
          max-width: 560px;
          margin-bottom: 32px;
        }

        /* 6. Primary Button (Background: #0052FF | Hover: #003ECC | Text: #FFFFFF) */
        .btn-cobalt-fill {
          background-color: var(--color-cobalt);  /* #0052FF */
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
          transition: all 0.25s ease;
        }

        .btn-cobalt-fill:hover {
          background-color: var(--color-cobalt-hover); /* #003ECC */
          transform: translateY(-2px);
          color: #FFFFFF;
        }

        /* 7. Secondary Button (Background: #FFFFFF | Border: rgba(0,82,255,0.14) | Text: #071838) */
        .btn-surface-outline {
          background-color: var(--bg-surface);    /* #FFFFFF */
          color: var(--text-title);               /* #071838 */
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
          transition: all 0.25s ease;
        }

        .btn-surface-outline:hover {
          border-color: var(--border-hover);     /* rgba(0, 212, 255, 0.60) */
          color: var(--color-cobalt);             /* #0052FF */
          transform: translateY(-2px);
        }

        /* 8. Stats Strip */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding-top: 24px;
          border-top: 1.5px solid var(--border-subtle);
          margin-top: 36px;
        }

        .stat-figure {
          color: var(--text-title);               /* #071838 */
          font-size: 26px;
          font-weight: 800;
          margin: 0;
        }

        .stat-label {
          color: var(--text-muted);               /* #6B82A0 */
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          margin: 4px 0 0;
        }

        /* 9. Right Showcase Card (Background: #FFFFFF | Border: rgba(0,82,255,0.14) | Shadow: card) */
        .surface-showcase-card {
          background-color: var(--bg-surface);    /* #FFFFFF */
          border: 1.5px solid var(--border-subtle);
          border-radius: 24px;
          padding: 30px;
          box-shadow: var(--shadow-card);
          position: relative;
          transition: border-color 0.25s ease;
        }

        .surface-showcase-card:hover {
          border-color: var(--border-hover);     /* Cyan glow on hover: rgba(0, 212, 255, 0.60) */
        }

        /* 10. Floating Badge on Card (Background: #E8F5FE | Text: #0052FF) */
        .card-top-pill {
          position: absolute;
          top: -14px;
          right: 28px;
          background-color: var(--bg-badge-tint); /* #E8F5FE */
          color: var(--color-cobalt);             /* #0052FF */
          border: 1px solid var(--border-subtle);
          font-size: 11px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 50px;
        }

        /* 11. Spec Row Item (Background: #F4F8FE | Hover Background: #FFFFFF) */
        .spec-item-box {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 14px;
          background-color: var(--bg-main);       /* #F4F8FE */
          border: 1px solid var(--border-subtle);
          margin-bottom: 12px;
          transition: all 0.2s ease;
        }

        .spec-item-box:hover {
          background-color: var(--bg-surface);   /* #FFFFFF */
          border-color: var(--border-hover);
        }

        /* 12. Icon Wrapper (Background: #E8F5FE | Color: #0052FF) */
        .spec-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background-color: var(--bg-badge-tint); /* #E8F5FE */
          color: var(--color-cobalt);             /* #0052FF */
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          border: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        /* 13. Notice Box at Bottom (Background: #E8F5FE | Text: #071838) */
        .guarantee-notice {
          margin-top: 18px;
          padding: 12px 14px;
          background-color: var(--bg-badge-tint); /* #E8F5FE */
          border-radius: 12px;
          border: 1px dashed var(--color-cobalt); /* #0052FF */
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: var(--text-title);               /* #071838 */
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
          .hero-btn-row {
            justify-content: center;
          }
          .hero-stats-grid {
            justify-content: center;
          }
        }
      `}</style>

      {/* ========================================================
          HERO SECTION (CLEAN LIGHT THEME)
      ========================================================= */}
      <section className="hero-section-box">
        <div className="hero-inner-container">
          
          {/* LEFT: TEXT CONTENT & CTAS */}
          <div>
            {/* Pill: Background #E8F5FE | Text #0052FF */}
           

            {/* Title: Text #071838 | Accent #0052FF */}
            <h1 className="hero-main-title">
              Precision Workwear for the Modern <span className="blue-accent">Corporate Workforce</span>
            </h1>

            {/* Body: Text #495E7C */}
            <p className="hero-body-text">
              Direct factory manufacturing of wrinkle-resistant formal shirts, tailored suiting blazers,
              and executive polo workwear. Crafted with combed breathable fabrics and high-precision brand crests.
            </p>

            {/* Action Buttons */}
            <div className="hero-btn-row" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              {/* Primary: Background #0052FF | Text #FFFFFF */}
              <Link to="/customization" className="btn-cobalt-fill">
                Configure Bulk Order <FaArrowRight size={13} />
              </Link>

              {/* Secondary: Background #FFFFFF | Text #071838 */}
              <a href="#swatches" className="btn-surface-outline">
                <FaFileDownload size={14} color="#0052FF" /> Request Fabric Swatch Kit
              </a>
            </div>

            {/* Stats: Figures #071838 | Labels #6B82A0 */}
           
          </div>

          {/* RIGHT: FACTORY SPECIFICATION PANEL */}
          <div>
            {/* Card: Background #FFFFFF | Shadow 0 12px 32px rgba(0, 48, 143, 0.06) */}
            <div className="surface-showcase-card">
              {/* Badge: Background #E8F5FE | Text #0052FF */}
             

              {/* Heading: Text #071838 */}
              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-title)", marginBottom: "16px" }}>
                Corporate Manufacturing Specifications
              </h4>

              {/* Spec 1: Background #F4F8FE | Icon Background #E8F5FE */}
              <div className="spec-item-box">
                <div className="spec-icon-wrapper">
                  <FaTshirt />
                </div>
                <div>
                  <h6 style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--text-title)", fontSize: "14px" }}>
                    Executive Oxford & Poly-Viscose
                  </h6>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                    Double-plied combed cotton with 240 GSM anti-pilling and crease-resistant structure.
                  </p>
                </div>
              </div>

              {/* Spec 2: Background #F4F8FE | Icon Background #E8F5FE */}
              <div className="spec-item-box">
                <div className="spec-icon-wrapper">
                  <FaAward />
                </div>
                <div>
                  <h6 style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--text-title)", fontSize: "14px" }}>
                    Micro-Precision Brand Crests
                  </h6>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                    Multi-head Japanese Tajima embroidery ensuring clean company logo reproduction.
                  </p>
                </div>
              </div>

              {/* Spec 3: Background #F4F8FE | Icon Background #E8F5FE */}
              <div className="spec-item-box">
                <div className="spec-icon-wrapper">
                  <FaTruck />
                </div>
                <div>
                  <h6 style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--text-title)", fontSize: "14px" }}>
                    Campus & Multi-City Dispatch
                  </h6>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                    Individually packaged with employee/department ID tags for streamlined rollouts.
                  </p>
                </div>
              </div>

              {/* Guarantee Box: Background #E8F5FE | Text #071838 */}
              <div className="guarantee-notice">
                <FaShieldAlt color="#0052FF" size={18} />
                <span>
                  <b>Pre-Production Swatch Guarantee:</b> Physical fit & fabric approval before main cutting.
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>
      <CorporateCatalogSection />
      <Customizations />
    </div>
    </>
  );
}