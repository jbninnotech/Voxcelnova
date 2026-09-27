import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import Herosection from "../components/About/Herosection";
import MissionVision from "../components/About/MissionVision";
import GarmentManufacturingSuite from "../components/About/GarmentManufacturingSuite";
import FeatureStrip from "../components/About/FeatureStrip";
import FounderProfile from "../components/About/FounderProfile";
import OurJourney from "../components/About/OurJourney";
import WhatWeBelieve from "../components/About/WhatWeBelieve";

export default function About() {
  return (
    <>
      <style>{`
        /* ==========================================================
           CLEAN LIGHT THEME COLOR PROFILE
        =========================================================== */
        .vx-about-page-clean {
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
          --shadow-glow:     0 8px 25px rgba(0, 82, 255, 0.25);

          background-color: var(--bg-main);
          color: var(--text-body);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* ---------------- CALL TO ACTION CARD ---------------- */
        .vx-clean-cta-section {
          background-color: var(--bg-main);
          position: relative;
        }

        .vx-clean-cta-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 55px 25px;
          box-shadow: var(--shadow-card);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* Top Cyan/Cobalt Accent Bar */
        .vx-clean-cta-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-cyan));
        }

        .vx-clean-cta-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
        }

        /* Glowing Primary CTA Button */
        .vx-btn-clean-primary {
          background: linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cobalt-hover) 100%);
          border: none;
          color: #FFFFFF !important;
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 12px;
          font-size: 0.92rem;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 6px 20px rgba(0, 82, 255, 0.28);
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .vx-btn-clean-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 82, 255, 0.45);
          color: #FFFFFF !important;
        }

        /* Secondary Outline Button */
        .vx-btn-clean-outline {
          background-color: var(--bg-badge-tint);
          border: 1px solid var(--border-subtle);
          color: var(--color-cobalt) !important;
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 12px;
          font-size: 0.92rem;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .vx-btn-clean-outline:hover {
          background-color: #FFFFFF;
          border-color: var(--color-cobalt);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 82, 255, 0.12);
        }

        @media (max-width: 575.98px) {
          .vx-clean-cta-card {
            padding: 35px 18px;
          }
        }
      `}</style>

      <div className="vx-about-page-clean">
        {/* =========================================
            1. HERO & FOUNDER SECTIONS
        ========================================= */}
        <Herosection />
        <FounderProfile />
        <FeatureStrip />

        {/* =========================================
            2. CORE IDENTITY & BRAND STORY
        ========================================= */}
        <MissionVision />
        <OurJourney />
        <WhatWeBelieve />

        {/* =========================================
            3. CALL TO ACTION BANNER (CLEAN LIGHT)
        ========================================= */}
        <section className="vx-clean-cta-section py-5">
          <div className="container py-2 py-md-4">
            <div className="vx-clean-cta-card text-center">
              
              {/* Badge */}
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3"
                style={{
                  backgroundColor: "var(--bg-badge-tint)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--color-cobalt)",
                  fontSize: "0.75rem",
                  fontWeight: "800",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase"
                }}
              >
                <span>Institutional Uniform Programs</span>
              </div>

              {/* Title */}
              <h2
                className="fw-bold mb-3"
                style={{
                  color: "var(--text-title)",
                  fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
                  letterSpacing: "-0.5px"
                }}
              >
                Ready to Upgrade Your Uniform Fleet?
              </h2>

              {/* Body */}
              <p
                className="mx-auto mb-4"
                style={{
                  maxWidth: "620px",
                  color: "var(--text-body)",
                  fontSize: "clamp(0.88rem, 1.8vw, 1rem)",
                  lineHeight: "1.6"
                }}
              >
                Connect with our production specialists for personalized fabric swatches,
                digital 3D mockups, and tiered bulk wholesale economics.
              </p>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/bulk-orders" className="vx-btn-clean-primary">
                  <span>Request Bulk Quote</span>
                  <FaArrowRight size={12} />
                </Link>

                <Link to="/contact" className="vx-btn-clean-outline">
                  <span>Contact Team</span>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================
            4. MANUFACTURING SUITE
        ========================================= */}
        <GarmentManufacturingSuite />
      </div>
    </>
  );
}