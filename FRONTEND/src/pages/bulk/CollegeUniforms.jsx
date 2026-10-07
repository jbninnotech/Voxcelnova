import React from 'react';
import { FaGraduationCap, FaWhatsapp, FaBookOpen, FaCheckCircle, FaShieldAlt, FaAward } from 'react-icons/fa';
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
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 90px 20px 75px;
          overflow: hidden;
          max-width: 100vw;
          background-color: #060b18;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* High-Definition Apparel Backdrop with Overflow Fix */
        .college-hero-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(180deg, rgba(6, 12, 24, 0.82) 0%, rgba(3, 8, 18, 0.92) 100%),
            url('https://res.cloudinary.com/d4oald11/image/upload/v1790837149/5.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
        }

        /* Ambient Cyan Center Glow */
        .college-ambient-glow {
          position: absolute;
          width: 500px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.16) 0%, transparent 70%);
          top: 48%;
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
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
        }

        /* KEYFRAME ANIMATIONS */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
            transform: translate(-50%, -46%) scale(1.1);
            opacity: 1;
          }
        }

        /* BADGE - DECREASED FONT SIZE */
        .college-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(0, 212, 255, 0.12);
          color: #00d4ff;
          border: 1px solid rgba(0, 212, 255, 0.35);
          backdrop-filter: blur(10px);
          padding: 6px 18px;
          border-radius: 50px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 20px;
          animation: fadeInDown 0.7s ease-out forwards;
        }

        /* HEADLINE - DECREASED FONT SIZE */
        .college-center-headline {
          color: #ffffff;
          font-size: clamp(1.8rem, 3.8vw, 3.2rem);
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: -0.5px;
          margin: 0 auto 16px;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* CYAN EMPHASIS */
        .cyan-emphasis {
          color: #00d4ff;
          position: relative;
          display: inline-block;
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
          transition: transform 0.3s ease;
        }

        .cyan-emphasis:hover {
          transform: scale(1.02);
        }

        /* QUOTATION / PARAGRAPH - DECREASED FONT SIZE */
        .college-sub-quotation {
          color: #cbd5e1;
          font-size: clamp(0.9rem, 1.2vw, 1.05rem);
          line-height: 1.6;
          max-width: 720px;
          margin: 0 auto 30px;
          font-weight: 400;
          animation: fadeInUp 0.9s ease-out forwards;
        }

        /* ACTION BUTTONS - DECREASED FONT SIZE & PADDING */
        .college-action-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out forwards;
        }

        .btn-whatsapp-action {
          background-color: #25d366;
          color: #ffffff;
          padding: 12px 26px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: none;
          box-shadow: 0 5px 20px rgba(37, 211, 102, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-whatsapp-action:hover {
          background-color: #1ebe5d;
          color: #ffffff;
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 8px 28px rgba(37, 211, 102, 0.48);
        }

        .btn-glass-action {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          transition: all 0.3s ease;
        }

        .btn-glass-action:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: #00d4ff;
          color: #00d4ff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 212, 255, 0.22);
        }

        @media (max-width: 768px) {
          .college-hero-section {
            padding: 70px 16px 55px;
            min-height: 65vh;
          }
          .college-action-buttons {
            flex-direction: column;
            width: 100%;
          }
          .btn-whatsapp-action, .btn-glass-action {
            width: 100%;
            justify-content: center;
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
          

          {/* MAIN HEADLINE WITH CYAN ACCENT */}
          <h3 className="college-center-headline">
            Engineered for Campus Pride, Built for <br />
            <span className="cyan-emphasis">Excellence</span>
          </h3>

          {/* SUB-HEADLINE QUOTATION */}
          <p className="college-sub-quotation">
            “Unity, discipline, and identity begin with what your students wear.” Browse our institutional uniform line crafted with premium breathable fabrics, custom crest embroidery, and reliable faculty bulk supply.
          </p>

          {/* CTA BUTTONS WITH DIRECT WHATSAPP ORDER */}
          <div className="college-action-buttons">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp-action"
            >
              <FaWhatsapp size={17} /> Order Bulk on WhatsApp
            </a>

            <a href="#college-catalog" className="btn-glass-action">
              <FaBookOpen size={14} /> Explore Fabric Catalog
            </a>
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