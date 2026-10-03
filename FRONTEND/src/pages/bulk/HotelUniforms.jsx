import React from "react";
import {
  FaArrowRight,
  FaFileDownload,
  FaConciergeBell,
  FaShieldAlt,
  FaCheckCircle,
  FaWhatsapp
} from "react-icons/fa";
import Customizations from "../../components/bulk/Customization";
import HotelCatalogSection from "../../components/bulk/hotel/HotelCatalogSection";

export default function HotelUniforms() {
  // Replace with your real WhatsApp Business phone number (including country code, e.g., 91 for India, 1 for US)
  const WHATSAPP_PHONE_NUMBER = "919876543210"; 
  const defaultMessage = encodeURIComponent(
    "Hello! I am interested in placing a Bulk Uniform Order for our hotel/hospitality business. Please provide a catalog and quotation."
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${defaultMessage}`;

  return (
    <div className="hotel-hero-page">
      <style>{`
        /* ==========================================================
           COLOR PROFILE & DESIGN SYSTEM
        =========================================================== */
        :root {
          --color-cyan:         #00d4ff;
          --color-cyan-glow:    rgba(0, 212, 255, 0.45);
          --color-cobalt:       #0052ff;
          --whatsapp-green:     #25d366;
          --whatsapp-hover:     #1ebe5d;
          --text-light:         #ffffff;
          --text-subtle:        #e2e8f0;
        }

        .hotel-hero-page {
          background-color: #060b17;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ==========================================================
           HERO SECTION WITH HIGH-GRADE APPAREL BACKGROUND
        =========================================================== */
        .hero-banner-section {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 110px 24px 95px;
          overflow: hidden;
          background-color: #060c18;
        }

        /* High-Definition Apparel Rack Backdrop with cinematic dark overlay */
        .hero-banner-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(180deg, rgba(6, 12, 24, 0.85) 0%, rgba(3, 8, 18, 0.94) 100%),
            url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=2000&q=85');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.03);
          animation: subtleZoom 14s infinite alternate ease-in-out;
          z-index: 1;
        }

        /* Dynamic Cyan Center Glow */
        .hero-ambient-glow {
          position: absolute;
          width: 580px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.22) 0%, transparent 70%);
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 2;
          animation: floatGlow 7s infinite alternate ease-in-out;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 3;
          max-width: 980px;
          margin: 0 auto;
        }

        /* ==========================================================
           KEYFRAME ANIMATIONS
        =========================================================== */
        @keyframes subtleZoom {
          0% {
            transform: scale(1.0);
          }
          100% {
            transform: scale(1.06);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatGlow {
          0% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -46%) scale(1.2);
            opacity: 1;
          }
        }

        /* ==========================================================
           TYPOGRAPHY & TAGS
        =========================================================== */
        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: rgba(0, 212, 255, 0.12);
          color: var(--color-cyan);
          border: 1px solid rgba(0, 212, 255, 0.38);
          backdrop-filter: blur(10px);
          padding: 8px 22px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 22px;
          animation: fadeInDown 0.7s ease-out forwards;
        }

        .hero-center-headline {
          color: var(--text-light);
          font-size: clamp(2.4rem, 5.2vw, 4.3rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1px;
          margin: 0 auto 20px;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* Bright Cyan Word Emphasis (Just like the reference image) */
        .cyan-emphasis {
          color: var(--color-cyan);
          position: relative;
          display: inline-block;
          text-shadow: 0 0 25px var(--color-cyan-glow);
          transition: transform 0.3s ease;
        }

        .cyan-emphasis:hover {
          transform: scale(1.03);
        }

        .hero-sub-quotation {
          color: var(--text-subtle);
          font-size: clamp(1.02rem, 1.4vw, 1.22rem);
          line-height: 1.7;
          max-width: 820px;
          margin: 0 auto 36px;
          font-weight: 400;
          animation: fadeInUp 0.9s ease-out forwards;
        }

        /* ==========================================================
           BUTTONS WITH WHATSAPP INTEGRATION
        =========================================================== */
        .hero-action-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out forwards;
        }

        /* WhatsApp Button */
        .btn-whatsapp-action {
          background-color: var(--whatsapp-green);
          color: #ffffff;
          padding: 15px 32px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 11px;
          border: none;
          box-shadow: 0 6px 24px rgba(37, 211, 102, 0.35);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-whatsapp-action:hover {
          background-color: var(--whatsapp-hover);
          color: #ffffff;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 32px rgba(37, 211, 102, 0.55);
        }

        .btn-glass-action {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          padding: 15px 28px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .btn-glass-action:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: var(--color-cyan);
          color: var(--color-cyan);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 212, 255, 0.25);
        }

        /* ==========================================================
           TRUST TICKER BAR
        =========================================================== */
        .hero-trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 34px;
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          flex-wrap: wrap;
          animation: fadeInUp 1.1s ease-out forwards;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: #cbd5e1;
          font-weight: 500;
        }

        .trust-item svg {
          color: var(--color-cyan);
        }

        @media (max-width: 768px) {
          .hero-banner-section {
            padding: 85px 18px 70px;
            min-height: 70vh;
          }
          .hero-action-buttons {
            flex-direction: column;
            width: 100%;
          }
          .btn-whatsapp-action, .btn-glass-action {
            width: 100%;
            justify-content: center;
          }
          .hero-trust-bar {
            gap: 16px;
          }
        }
      `}</style>

      {/* ========================================================
          HERO BANNER SECTION
      ========================================================= */}
      <section className="hero-banner-section">
        <div className="hero-banner-bg" />
        <div className="hero-ambient-glow" />

        <div className="hero-content-wrapper">
          
          {/* TAG BADGE */}
          <div className="hero-pill-badge">
            <FaConciergeBell /> Commercial & Hospitality Grade Apparel
          </div>

          {/* MAIN HEADLINE WITH CYAN ACCENT */}
          <h1 className="hero-center-headline">
            Engineered for Elegance, Built for <br />
            <span className="cyan-emphasis">Longevity</span>
          </h1>

          {/* NEW QUOTATION / SUBTITLE */}
          <p className="hero-sub-quotation">
            “Your uniform is your brand’s first and lasting impression.” Discover premium 
            hotel, culinary, resort, and front-desk apparel tailored with stain-resistant, 
            high-tensile fabrics ready for retail or direct factory bulk supply.
          </p>

          {/* BUTTONS WITH WHATSAPP LINK */}
          <div className="hero-action-buttons">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp-action"
            >
              <FaWhatsapp size={19} /> Order Bulk on WhatsApp
            </a>

            <a href="#hotel-lookbook" className="btn-glass-action">
              <FaFileDownload size={14} /> Download Lookbook
            </a>
          </div>

          {/* TRUST PILLARS */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <FaCheckCircle size={14} /> Direct Factory Wholesale Rates
            </div>
            <div className="trust-item">
              <FaShieldAlt size={14} /> Industrial Laundry Tested
            </div>
            <div className="trust-item">
              <FaCheckCircle size={14} /> Custom Crest & Monogram Stitched
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