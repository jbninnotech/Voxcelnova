import React from 'react';
import { FaGraduationCap, FaWhatsapp, FaBookOpen, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import CollegeUniformCategories from "../../components/bulk/CollegeUniformCategories";
import CustomUniforms from "../../components/bulk/CustomUniforms"; 
import OurProcess from "../../components/bulk/OurProcess";
import Customizations from "../../components/bulk/Customization";

const CollegeUniformsHero = () => {
  // Update with your real WhatsApp Business phone number (country code + number)
  const WHATSAPP_PHONE_NUMBER = "919876543210"; 
  const defaultMessage = encodeURIComponent(
    "Hello! We are looking for custom college & campus uniforms in bulk. Please share your catalog, fabric samples, and pricing quotation."
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${defaultMessage}`;

  return (
    <>
      <style>{`
        /* ==========================================================
           COLLEGE HERO COMPONENT STYLES
        =========================================================== */
        .college-hero-section {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 110px 24px 95px;
          overflow: hidden;
          background-color: #060b18;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* High-Definition Apparel Rack Backdrop with cinematic dark overlay */
        .college-hero-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(180deg, rgba(6, 12, 24, 0.86) 0%, rgba(3, 8, 18, 0.94) 100%),
            url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=2000&q=85');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transform: scale(1.03);
          animation: subtleZoom 14s infinite alternate ease-in-out;
          z-index: 1;
        }

        /* Ambient Cyan Center Glow */
        .college-ambient-glow {
          position: absolute;
          width: 580px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.22) 0%, transparent 70%);
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(65px);
          pointer-events: none;
          z-index: 2;
          animation: floatGlow 7s infinite alternate ease-in-out;
        }

        .college-content-wrapper {
          position: relative;
          z-index: 3;
          max-width: 980px;
          margin: 0 auto;
        }

        /* KEYFRAME ANIMATIONS */
        @keyframes subtleZoom {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.06); }
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

        /* BADGE */
        .college-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: rgba(0, 212, 255, 0.12);
          color: #00d4ff;
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

        /* HEADLINE */
        .college-center-headline {
          color: #ffffff;
          font-size: clamp(2.4rem, 5.2vw, 4.3rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1px;
          margin: 0 auto 20px;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* REFERENCE-STYLE CYAN EMPHASIS */
        .cyan-emphasis {
          color: #00d4ff;
          position: relative;
          display: inline-block;
          text-shadow: 0 0 25px rgba(0, 212, 255, 0.45);
          transition: transform 0.3s ease;
        }

        .cyan-emphasis:hover {
          transform: scale(1.03);
        }

        /* QUOTATION / PARAGRAPH */
        .college-sub-quotation {
          color: #e2e8f0;
          font-size: clamp(1.02rem, 1.4vw, 1.22rem);
          line-height: 1.7;
          max-width: 820px;
          margin: 0 auto 36px;
          font-weight: 400;
          animation: fadeInUp 0.9s ease-out forwards;
        }

        /* ACTION BUTTONS */
        .college-action-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out forwards;
        }

        .btn-whatsapp-action {
          background-color: #25d366;
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
          background-color: #1ebe5d;
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
          border-color: #00d4ff;
          color: #00d4ff;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 212, 255, 0.25);
        }

        /* TRUST PILLARS */
        .college-trust-bar {
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
          color: #00d4ff;
        }

        @media (max-width: 768px) {
          .college-hero-section {
            padding: 85px 18px 70px;
            min-height: 70vh;
          }
          .college-action-buttons {
            flex-direction: column;
            width: 100%;
          }
          .btn-whatsapp-action, .btn-glass-action {
            width: 100%;
            justify-content: center;
          }
          .college-trust-bar {
            gap: 16px;
          }
        }
      `}</style>

      {/* ========================================================
          HERO BANNER SECTION
      ========================================================= */}
      <section className="college-hero-section">
        <div className="college-hero-bg" />
        <div className="college-ambient-glow" />

        <div className="college-content-wrapper">
          {/* TAG BADGE */}
          <div className="college-pill-badge">
            <FaGraduationCap size={16} /> Campus Identity & Academic Apparel
          </div>

          {/* MAIN HEADLINE WITH CYAN ACCENT */}
          <h1 className="college-center-headline">
            Engineered for Campus Pride, Built for <br />
            <span className="cyan-emphasis">Excellence</span>
          </h1>

          {/* NEW COLLEGE QUOTATION */}
          <p className="college-sub-quotation">
            “Unity, discipline, and identity begin with what your students wear.” Browse our
            institutional uniform line crafted with breathable, fade-resistant fabrics designed 
            for university campuses, colleges, lab work, and direct faculty bulk supply.
          </p>

          {/* CTA BUTTONS WITH DIRECT WHATSAPP ORDER */}
          <div className="college-action-buttons">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp-action"
            >
              <FaWhatsapp size={19} /> Order Bulk on WhatsApp
            </a>

            <a href="#college-catalog" className="btn-glass-action">
              <FaBookOpen size={15} /> Explore Fabric Catalog
            </a>
          </div>

          {/* TRUST PILLARS */}
          <div className="college-trust-bar">
            <div className="trust-item">
              <FaCheckCircle size={14} /> Direct Institutional Pricing
            </div>
            <div className="trust-item">
              <FaShieldAlt size={14} /> High Tear-Strength & Fade Resistant
            </div>
            <div className="trust-item">
              <FaCheckCircle size={14} /> Custom College Crest Embroidery
            </div>
          </div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <CustomUniforms />
      <CollegeUniformCategories />
      <Customizations />
      <OurProcess />
    </>
  );
};

export default CollegeUniformsHero;