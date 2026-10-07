import React from "react";
import {
  FaBullseye,
  FaEye,
  FaArrowRight,
  FaCheck,
  FaCompass,
} from "react-icons/fa";

export default function MissionVision() {
  return (
    <>
      <style>{`
        /* ==========================================================
           CLEAN LIGHT THEME (Sampled from 3D Cobalt & Cyan Logo)
        =========================================================== */
        :root {
          --logo-bg-light: #F4F8FE;
          --logo-card-bg: rgba(255, 255, 255, 0.92);
          --logo-cobalt: #0052FF;
          --logo-cobalt-hover: #003ECC;
          --logo-cyan: #00C8FF;
          --logo-ice: #E8F5FE;
          --logo-text-title: #081836;
          --logo-text-body: #495E7C;
          --logo-card-border: rgba(0, 110, 255, 0.16);
          --logo-card-hover-border: rgba(0, 200, 255, 0.55);
        }

        .vx-mission-vision {
          position: relative;
          overflow: hidden;
          padding: 110px 0;
          background-color: var(--logo-bg-light);
          color: var(--logo-text-title);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* Subtle Technical Dot Grid */
        .vx-mission-vision::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(0, 82, 255, 0.08) 1.5px, transparent 1.5px);
          background-size: 30px 30px;
          pointer-events: none;
          z-index: 1;
        }

        /* Ambient Cyan / Blue Halo Orbs */
        .vx-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(85px);
          pointer-events: none;
          z-index: 1;
        }

        .vx-ambient-glow.one {
          width: 520px;
          height: 520px;
          top: -120px;
          left: -100px;
          background: radial-gradient(circle, rgba(0, 200, 255, 0.18) 0%, rgba(0, 82, 255, 0.06) 50%, transparent 70%);
        }

        .vx-ambient-glow.two {
          width: 540px;
          height: 540px;
          bottom: -140px;
          right: -100px;
          background: radial-gradient(circle, rgba(0, 82, 255, 0.14) 0%, rgba(0, 200, 255, 0.08) 50%, transparent 70%);
        }

        /* Header Elements */
        .vx-section-header {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 780px;
          margin: 0 auto 65px auto;
        }

        .vx-section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 999px;
          color: var(--logo-cobalt);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: var(--logo-ice);
          border: 1px solid rgba(0, 200, 255, 0.4);
          box-shadow: 0 4px 14px rgba(0, 160, 255, 0.15);
          margin-bottom: 18px;
        }

        .vx-section-title {
          color: var(--logo-text-title);
          font-size: clamp(2.2rem, 5vw, 3.3rem);
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        /* Dual-Tone Gradient Text */
        .vx-gradient-text {
          background: linear-gradient(90deg, #0047E0 0%, #0084FF 45%, #00C8FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .vx-section-description {
          color: var(--logo-text-body);
          font-size: 1.05rem;
          line-height: 1.8;
          margin: 0 auto;
        }

        /* Frosted Glass Cards with Logo Gradient Top Strip */
        .vx-purpose-card {
          position: relative;
          height: 100%;
          padding: 42px 36px;
          border-radius: 22px;
          background: var(--logo-card-bg);
          border: 1px solid var(--logo-card-border);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 12px 35px rgba(3, 23, 62, 0.05);
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Swoosh accent line on top of each card */
        .vx-purpose-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3.5px;
          background: linear-gradient(90deg, var(--logo-cobalt), var(--logo-cyan), #ffffff);
          opacity: 0.6;
          transition: opacity 0.3s ease, height 0.3s ease;
        }

        .vx-purpose-card:hover {
          transform: translateY(-8px);
          border-color: var(--logo-card-hover-border);
          box-shadow: 0 20px 48px rgba(0, 82, 255, 0.12);
        }

        .vx-purpose-card:hover::before {
          opacity: 1;
          height: 4.5px;
        }

        /* 3D Metallic Icon Badge */
        .vx-purpose-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          font-size: 26px;
          margin-bottom: 24px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .icon-mission {
          background: linear-gradient(135deg, #0052FF 0%, #0036B3 100%);
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(0, 82, 255, 0.28);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .icon-vision {
          background: linear-gradient(135deg, #00C8FF 0%, #0052FF 100%);
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(0, 200, 255, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .vx-purpose-card:hover .vx-purpose-icon {
          transform: scale(1.08) rotate(-4deg);
        }

        .vx-purpose-label {
          color: var(--logo-cobalt);
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .vx-purpose-title {
          color: var(--logo-text-title);
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: -0.4px;
          margin-bottom: 14px;
        }

        .vx-purpose-text {
          color: var(--logo-text-body);
          font-size: 0.98rem;
          line-height: 1.75;
          margin-bottom: 26px;
        }

        /* Feature Checklist */
        .vx-purpose-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 0 0 32px 0;
          padding: 0;
          list-style: none;
        }

        .vx-purpose-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--logo-text-title);
          font-size: 0.93rem;
          font-weight: 500;
        }

        .vx-check {
          width: 24px;
          height: 24px;
          min-width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.72rem;
          background: var(--logo-ice);
          border: 1px solid var(--logo-cyan);
          color: var(--logo-cobalt);
          box-shadow: 0 2px 6px rgba(0, 160, 255, 0.12);
        }

        /* Clean Link Footer */
        .vx-purpose-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 82, 255, 0.1);
          color: var(--logo-cobalt);
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.3px;
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .vx-purpose-footer svg {
          transition: transform 0.3s ease;
        }

        .vx-purpose-card:hover .vx-purpose-footer svg {
          transform: translateX(6px);
        }

        .vx-purpose-footer:hover {
          color: var(--logo-cobalt-hover);
        }

        @media (max-width: 992px) {
          .vx-mission-vision {
            padding: 75px 0;
          }
          .vx-purpose-card {
            padding: 32px 24px;
          }
        }
      `}</style>

      <section className="vx-mission-vision">
        {/* Soft Ambient Light Halos */}
        <div className="vx-ambient-glow one" />
        <div className="vx-ambient-glow two" />

        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Section Header */}
          <div className="vx-section-header">
           

            <h2 className="vx-section-title">
              Engineered with <span className="vx-gradient-text">Precision & Purpose</span>
            </h2>

            <p className="vx-section-description">
              At VOXEL NOVA, apparel is an engineering feat of organizational identity. 
              We combine automated digital cutting lines with certified textile benchmarks to produce garments that inspire confidence.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="row g-4">
            
            {/* ================= MISSION CARD ================= */}
            <div className="col-lg-6">
              <div className="vx-purpose-card">
                <div>
                  <div className="vx-purpose-icon icon-mission">
                    <FaBullseye />
                  </div>

                  <div className="vx-purpose-label">Strategic Blueprint</div>
                  <h3 className="vx-purpose-title">Our Mission</h3>

                  <p className="vx-purpose-text">
                    To equip institutions and enterprises across industries with
                    high-durability, ergonomically designed custom apparel manufactured with
                    certified raw materials, automated precision, and reliable on-time delivery.
                  </p>

                  
                </div>

               
              </div>
            </div>

            {/* ================= VISION CARD ================= */}
            <div className="col-lg-6">
              <div className="vx-purpose-card">
                <div>
                  <div className="vx-purpose-icon icon-vision">
                    <FaEye />
                  </div>

                  <div className="vx-purpose-label">Long-Range Outlook</div>
                  <h3 className="vx-purpose-title">Our Vision</h3>

                  <p className="vx-purpose-text">
                    To become the subcontinent’s most agile digital apparel production partner,
                    leading the transition toward sustainable textile blends and automated zero-waste
                    garment engineering.
                  </p>

                  <ul className="vx-purpose-list">
                   
                   
                   
                  </ul>
                </div>

              
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}