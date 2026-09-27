import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaFileDownload,
  FaGraduationCap,
  FaSchool,
  FaRunning,
  FaAward
} from "react-icons/fa";
import Customizations from "../../components/bulk/Customization";
import SchoolCatalogSection from "../../components/bulk/school/SchoolCatalogSection"

export default function SchoolUniforms() {
  return (
    <div className="school-hero-page">
      <style>{`
        /* ==========================================================
           CLEAN LIGHT THEME COLOR PROFILE
        =========================================================== */
        :root {
          /* Canvas & Backgrounds */
          --bg-main:         #F4F8FE; /* Ultra-clean ice porcelain canvas */
          --bg-surface:      #FFFFFF; /* Pure white card surface */
          --bg-badge-tint:   #E8F5FE; /* Soft light-cyan badge & chip background */
          
          /* Logo Accent Blue & Cyan */
          --color-cobalt:    #0052FF; /* Primary buttons, links, active icons */
          --color-cobalt-hover: #003ECC; /* Darker cobalt for hover states */
          --color-cyan:      #00D4FF; /* Swoosh highlights, secondary icons, glows */
          
          /* Typography */
          --text-title:      #071838; /* Crisp, high-contrast dark navy for headings */
          --text-body:       #495E7C; /* Soft slate navy for paragraphs */
          --text-muted:      #6B82A0; /* Light slate for captions and small labels */

          /* Borders & Dividers */
          --border-subtle:   rgba(0, 82, 255, 0.14);  /* Clean card borders */
          --border-hover:    rgba(0, 212, 255, 0.60); /* Cyan glowing border on hover */
          
          /* Shadows & Glows */
          --shadow-card:     0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow:     0 8px 25px rgba(0, 82, 255, 0.32);
        }

        .school-hero-page {
          background-color: var(--bg-main);
          color: var(--text-body);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          min-height: 100vh;
        }

        /* ========================================================
           FULL BACKGROUND IMAGE WITH PORCELAIN LIGHT OVERLAY
        ========================================================= */
        .hero-section-box {
          position: relative;
          background-image: 
            linear-gradient(
              135deg, 
              rgba(244, 248, 254, 0.94) 0%, 
              rgba(244, 248, 254, 0.88) 50%, 
              rgba(232, 245, 254, 0.92) 100%
            ),
            url("https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          padding: 85px 24px 75px;
          border-bottom: 1.5px solid var(--border-subtle);
        }

        .hero-inner-container {
          max-width: 1220px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* PILL BADGE */
        .hero-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-badge-tint);
          color: var(--color-cobalt);
          border: 1px solid var(--border-subtle);
          padding: 7px 16px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 18px;
          backdrop-filter: blur(8px);
        }

        /* HEADINGS */
        .hero-main-title {
          color: var(--text-title);
          font-size: clamp(2.3rem, 4vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.8px;
          margin-bottom: 18px;
        }

        .hero-main-title .blue-accent {
          color: var(--color-cobalt);
        }

        /* PARAGRAPH */
        .hero-body-text {
          color: var(--text-body);
          font-size: 16px;
          line-height: 1.65;
          max-width: 560px;
          margin-bottom: 32px;
          font-weight: 500;
        }

        /* BUTTONS */
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
          transition: all 0.25s ease;
        }

        .btn-cobalt-fill:hover {
          background-color: var(--color-cobalt-hover);
          transform: translateY(-2px);
          color: #FFFFFF;
        }

        .btn-surface-outline {
          background-color: rgba(255, 255, 255, 0.9);
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
          backdrop-filter: blur(6px);
          transition: all 0.25s ease;
        }

        .btn-surface-outline:hover {
          border-color: var(--border-hover);
          color: var(--color-cobalt);
          transform: translateY(-2px);
        }

        /* STATS STRIP */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding-top: 24px;
          border-top: 1.5px solid var(--border-subtle);
          margin-top: 36px;
        }

        .stat-figure {
          color: var(--text-title);
          font-size: 26px;
          font-weight: 800;
          margin: 0;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          margin: 4px 0 0;
        }

        /* RIGHT SHOWCASE CARD (GLASSMORPHIC PORCELAIN) */
        .surface-showcase-card {
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          border: 1.5px solid var(--border-subtle);
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 16px 40px rgba(0, 48, 143, 0.08);
          position: relative;
          transition: border-color 0.25s ease;
        }

        .surface-showcase-card:hover {
          border-color: var(--border-hover);
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
        }

        .spec-item-box {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 14px;
          background-color: rgba(244, 248, 254, 0.85);
          border: 1px solid var(--border-subtle);
          margin-bottom: 12px;
          transition: all 0.2s ease;
        }

        .spec-item-box:hover {
          background-color: #FFFFFF;
          border-color: var(--border-hover);
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
        }

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
          .hero-stats-grid {
            justify-content: center;
          }
        }
      `}</style>

      {/* ========================================================
          HERO SECTION WITH FULL BACKGROUND ACADEMY IMAGE
      ========================================================= */}
      <section className="hero-section-box">
        <div className="hero-inner-container">
          
          {/* LEFT: SCHOOL & ACADEMIC EDITORIAL */}
          <div>
            <div className="hero-tag-badge">
              <FaGraduationCap /> Direct Factory School & College Manufacturing
            </div>

            <h1 className="hero-main-title">
              Durable, Breathable Uniforms for <span className="blue-accent">Next-Generation Academies</span>
            </h1>

            <p className="hero-body-text">
              Direct factory manufacturing for K-12 schools, international academies, and universities.
              Heavy-duty combed cotton shirts, anti-pilling pinafores, fade-proof sports jerseys,
              and precision-embroidered institutional crests built to withstand daily campus wear.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link to="/customization" className="btn-cobalt-fill">
                Configure School Uniforms <FaArrowRight size={13} />
              </Link>

              <a href="#school-swatches" className="btn-surface-outline">
                <FaFileDownload size={14} color="#0052FF" /> Request Sample Uniform Box
              </a>
            </div>

            {/* STATS STRIP */}
            <div className="hero-stats-grid">
              <div>
                <h4 className="stat-figure">600+</h4>
                <p className="stat-label">Institutions Clothed</p>
              </div>
              <div>
                <h4 className="stat-figure">300k+</h4>
                <p className="stat-label">Students Clothed Annually</p>
              </div>
              <div>
                <h4 className="stat-figure">100%</h4>
                <p className="stat-label">Non-Shrink Guaranteed</p>
              </div>
            </div>
          </div>

          {/* RIGHT: INSTITUTIONAL SPECIFICATION CARD */}
          <div>
            <div className="surface-showcase-card">
              <span className="card-top-pill">
                <FaCheckCircle style={{ marginRight: 5 }} /> OEKO-TEX® CHILD SAFE
              </span>

              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-title)", marginBottom: "16px" }}>
                Academic Manufacturing Standards
              </h4>

              {/* Spec 1: Regular Uniform */}
              <div className="spec-item-box">
                <div className="spec-icon-wrapper">
                  <FaSchool />
                </div>
                <div>
                  <h6 style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--text-title)", fontSize: "14px" }}>
                    Sanforized Cotton-Rich Shirting
                  </h6>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                    Pre-shrunk 65/35 poly-cotton blend resistant to daily playground wear & tears.
                  </p>
                </div>
              </div>

              {/* Spec 2: Sports & House Uniforms */}
              <div className="spec-item-box">
                <div className="spec-icon-wrapper">
                  <FaRunning />
                </div>
                <div>
                  <h6 style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--text-title)", fontSize: "14px" }}>
                    Micro-Poly Sports & House T-Shirts
                  </h6>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                    Breathable honeycomb dry-fit fabric in standard school house color combinations.
                  </p>
                </div>
              </div>

              {/* Spec 3: Crest & Logo Precision */}
              <div className="spec-item-box">
                <div className="spec-icon-wrapper">
                  <FaAward />
                </div>
                <div>
                  <h6 style={{ margin: "0 0 2px", fontWeight: 700, color: "var(--text-title)", fontSize: "14px" }}>
                    Tajima Computerized School Crests
                  </h6>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                    Color-fast Madeira embroidery threads guaranteed never to fray or bleed into fabrics.
                  </p>
                </div>
              </div>

              {/* Guarantee Notice */}
              <div className="guarantee-notice">
                <FaShieldAlt color="#0052FF" size={18} />
                <span>
                  <b>Campus Rollout Guarantee:</b> Individually poly-packed with student name & size stickers.
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BULK CUSTOMIZATION FORM COMPONENT */}
      <SchoolCatalogSection />
      <Customizations />
      
    </div>
  );
}