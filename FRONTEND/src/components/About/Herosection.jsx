import React, { useEffect, useState } from "react";
import Heroimages from "../../assets/about.png";

import {
  FaArrowRight,
  FaCogs,
  FaShieldAlt,
  FaBoxes,
  FaAward,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

export default function AboutHeroSection({ heroImage = Heroimages }) {
  const [stats, setStats] = useState({ garments: 0, clients: 0, onTime: 0, capacity: 0 });

  // Telemetry Counter Animation
  useEffect(() => {
    const duration = 1800;
    const startTime = performance.now();

    const animateCounters = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setStats({
        garments: Math.floor(ease * 500),
        clients: Math.floor(ease * 150),
        onTime: Math.floor(ease * 99),
        capacity: Math.floor(ease * 25),
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    requestAnimationFrame(animateCounters);
  }, []);

  return (
    <>
      <style>{`
        /* ==========================================
           COLOR PROFILE (DARK CINEMATIC CYAN/COBALT)
        ========================================== */
        :root {
          --color-cobalt: #0052FF;
          --color-cyan: #00D4FF;
          --color-navy-dark: #050B16;
          --border-glass: rgba(0, 212, 255, 0.22);
          --text-highlight: #00D4FF;
        }

        .about-hero-section {
          position: relative;
          min-height: 94vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: var(--color-navy-dark);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        /* CINEMATIC BACKGROUND IMAGE + DARK DUAL-TONE GRADIENT */
        .about-hero-bg {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(ellipse at center, rgba(5, 11, 22, 0.6) 0%, rgba(5, 11, 22, 0.92) 100%),
            linear-gradient(180deg, rgba(0, 82, 255, 0.22) 0%, rgba(5, 11, 22, 0.88) 85%),
            url("${heroImage}");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
          transform: scale(1.03);
        }

        /* Subtle mesh glow effects */
        .ambient-cyan-orb {
          position: absolute;
          width: clamp(300px, 40vw, 650px);
          height: clamp(300px, 40vw, 650px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.18) 0%, rgba(0, 82, 255, 0.08) 50%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 2;
        }

        /* CONTAINER & TYPOGRAPHY */
        .about-content-container {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(60px, 8vw, 100px) 24px clamp(40px, 6vw, 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .about-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 99px;
          background: rgba(0, 212, 255, 0.08);
          border: 1px solid var(--border-glass);
          color: var(--color-cyan);
          font-size: clamp(11px, 1.4vw, 12px);
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          margin-bottom: 22px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.15);
        }

        .about-hero-title {
          font-size: clamp(32px, 5.2vw, 64px);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.5px;
          color: #FFFFFF;
          margin: 0 0 20px;
          max-width: 900px;
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.7);
        }

        .about-cyan-highlight {
          color: var(--text-highlight);
          background: linear-gradient(135deg, #00D4FF 0%, #38BDF8 60%, #0052FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 25px rgba(0, 212, 255, 0.45));
          display: inline-block;
        }

        .about-hero-subtitle {
          color: #B4C6EE;
          font-size: clamp(14px, 1.8vw, 17px);
          line-height: 1.65;
          max-width: 680px;
          margin: 0 auto 36px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        }

        /* BUTTONS */
        .about-actions-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: clamp(36px, 6vw, 64px);
          width: 100%;
        }

        .btn-cobalt-primary {
          background: linear-gradient(135deg, #0052FF 0%, #003ECC 100%);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 14px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 13px 26px;
          border-radius: 12px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(0, 82, 255, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .btn-cobalt-primary:hover {
          background: linear-gradient(135deg, #0045D8 0%, #0031A3 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 82, 255, 0.6);
          color: #FFFFFF;
        }

        .btn-cyan-outline {
          background: rgba(5, 15, 35, 0.65);
          color: #E2E8F0;
          font-weight: 700;
          font-size: 14px;
          border: 1.5px solid var(--border-glass);
          padding: 13px 26px;
          border-radius: 12px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(12px);
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .btn-cyan-outline:hover {
          background: rgba(0, 212, 255, 0.12);
          border-color: var(--color-cyan);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.25);
        }

        /* METRICS COUNTER ROW */
        .about-stats-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .about-stat-card {
          background: rgba(9, 18, 38, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--border-glass);
          border-radius: 16px;
          padding: clamp(14px, 2.5vw, 20px);
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .about-stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 212, 255, 0.55);
          box-shadow: 0 10px 30px rgba(0, 82, 255, 0.2);
        }

        .about-stat-number {
          font-size: clamp(22px, 3.2vw, 34px);
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1;
          margin-bottom: 6px;
          font-feature-settings: "tnum";
        }

        .about-stat-number span {
          color: var(--color-cyan);
        }

        .about-stat-label {
          font-size: clamp(11px, 1.2vw, 13px);
          color: #94A3B8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin: 0;
        }

        /* RESPONSIVE MEDIA QUERIES */
        @media (max-width: 860px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .about-actions-group {
            flex-direction: column;
            width: 100%;
          }
          .btn-cobalt-primary,
          .btn-cyan-outline {
            width: 100%;
            justify-content: center;
          }
          .about-stat-card {
            padding: 12px 10px;
          }
        }
      `}</style>

      <section className="about-hero-section">
        {/* Cinematic Background */}
        <div className="about-hero-bg" />

        {/* Ambient Color Glows */}
        <div className="ambient-cyan-orb" style={{ top: "-10%", left: "50%", transform: "translateX(-50%)" }} />
        <div className="ambient-cyan-orb" style={{ bottom: "-15%", right: "-5%", opacity: 0.6 }} />

        {/* Hero Main Content */}
        <div className="about-content-container">
          {/* Tagline / Eyebrow Pill */}
         

          {/* Heading with Cyan Highlight matching image reference */}
          <h1 className="about-hero-title">
            Engineered for Comfort, Built for{" "}
            <span className="about-cyan-highlight">Durability</span>
          </h1>

          {/* Subtitle */}
          <p className="about-hero-subtitle">
            Browse our industry-grade uniform catalog for schools, corporations,
            hospitals, and hospitality teams. Available for retail and bulk purchase.
          </p>

          {/* Call to Actions */}
          <div className="about-actions-group">
            <a href="#bulk-order" className="btn-cobalt-primary">
              <FaCogs size={15} />
              <span>Start Bulk Order</span>
              <FaArrowRight size={13} />
            </a>

            <a href="/products" className="btn-cyan-outline">
              <FaBoxes size={15} />
              <span>Explore Catalog</span>
            </a>
          </div>

          {/* Live Telemetry / Social Proof Counters */}
          <div className="about-stats-grid">
            

           

            

           
          </div>
        </div>
      </section>
    </>
  );
}