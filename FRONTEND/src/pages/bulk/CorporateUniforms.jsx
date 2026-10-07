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
  FaAward,
  FaWhatsapp
} from "react-icons/fa";
import CorporateCatalogSection from "../../components/bulk/corporate-uniforms/CorporateCatalogSection";
import Customizations from "../../components/bulk/Customization";

// Configure your business WhatsApp number (with Country Code, no '+' or spaces)
const WHATSAPP_PHONE = "919876543210"; // Replace with your company WhatsApp number
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Voxcl Nova! I would like to inquire about placing a Bulk Uniform Order for our organization. Please share your factory catalog, fabric swatches, and tiered pricing matrix."
);

export default function CorporateUniforms() {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${WHATSAPP_MESSAGE}`;

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

          /* 1. Page Canvas Background */
          .corporate-hero-page {
            background-color: var(--bg-main);
            color: var(--text-body);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            min-height: 100vh;
          }

          /* 2. Hero Outer Container with Full Cover Background Image */
          .hero-section-box {
            position: relative;
            background-image: 
              linear-gradient(
                to right,
                rgba(244, 248, 254, 0.96) 0%,
                rgba(244, 248, 254, 0.92) 55%,
                rgba(244, 248, 254, 0.85) 100%
              ),
              url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80");
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            padding: 95px 24px 85px;
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

          /* 3. Badge */
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
          }

          /* 4. Headings */
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

          /* 5. Paragraph Body */
          .hero-body-text {
            color: var(--text-body);
            font-size: 16px;
            line-height: 1.65;
            max-width: 580px;
            margin-bottom: 32px;
          }

          /* 6. Primary Button (WhatsApp Instant Trigger) */
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
            cursor: pointer;
            transition: all 0.25s ease;
          }

          .btn-cobalt-fill:hover {
            background-color: var(--color-cobalt-hover);
            transform: translateY(-2px);
            color: #FFFFFF;
            box-shadow: 0 12px 28px rgba(0, 82, 255, 0.45);
          }

          .btn-cobalt-fill .btn-wa-icon {
            color: #25D366;
            font-size: 18px;
            transition: transform 0.2s ease;
          }

          .btn-cobalt-fill:hover .btn-wa-icon {
            transform: scale(1.15);
          }

          /* 7. Secondary Button */
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
            transition: all 0.25s ease;
          }

          .btn-surface-outline:hover {
            border-color: var(--border-hover);
            color: var(--color-cobalt);
            transform: translateY(-2px);
          }

          @media (max-width: 992px) {
            .hero-section-box {
              padding: 65px 20px 55px;
              background-image: 
                linear-gradient(
                  to bottom,
                  rgba(244, 248, 254, 0.97) 0%,
                  rgba(244, 248, 254, 0.94) 100%
                ),
                url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80");
            }
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
          }
        `}</style>

        {/* ========================================================
            HERO SECTION (COVER BACKGROUND WITH WHATSAPP ACTION)
        ========================================================= */}
        <section className="hero-section-box">
          <div className="hero-inner-container">
            {/* TEXT CONTENT & CTAS */}
            <div>
              <div className="hero-tag-badge">
                <FaBuilding /> Direct Factory Institutional Manufacturing
              </div>

              {/* Title */}
              <h1 className="hero-main-title">
                Precision Workwear for the Modern{" "}
                <span className="blue-accent">Corporate Workforce</span>
              </h1>

              {/* Body */}
              <p className="hero-body-text">
                Direct factory manufacturing of wrinkle-resistant formal shirts, tailored suiting blazers,
                and executive polo workwear. Crafted with combed breathable fabrics, anti-pilling weaves,
                and Japanese high-precision Tajima brand crests.
              </p>

              {/* Action Buttons */}
              <div className="hero-btn-row" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                {/* Primary WhatsApp Action */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cobalt-fill"
                >
                  <FaWhatsapp className="btn-wa-icon" />
                  <span>Configure Bulk Order via WhatsApp</span>
                  <FaArrowRight size={12} />
                </a>

                {/* Secondary Button */}
                <a href="#customization-form" className="btn-surface-outline">
                  <FaFileDownload size={14} color="#0052FF" /> Request Fabric Swatch Kit
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CATALOG & SAMPLES SECTION */}
        <CorporateCatalogSection />

        {/* CUSTOMIZATION FORM SECTION */}
        <div id="customization-form">
          <Customizations />
        </div>
      </div>
    </>
  );
}