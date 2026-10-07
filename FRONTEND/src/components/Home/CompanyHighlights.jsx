import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaShieldAlt, FaIndustry, FaCheckCircle, FaAward } from "react-icons/fa";
import video from "../../assets/Videos/video1.mp4";

export default function CompanyHighlights() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Guarantee Video Autoplay on all browsers (Chrome, Safari, iOS)
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.defaultMuted = true;
      vid.muted = true;
      vid.setAttribute("playsinline", "true");
      vid.setAttribute("webkit-playsinline", "true");
      vid.play().catch((err) => console.warn("Video autoplay prevented:", err));
    }
  }, []);

  const highlights = [
    
 
  ];

  return (
    <section className="highlights-section position-relative overflow-hidden py-5">
      <style>{`
        /* ================= COLOR THEME VARIABLES ================= */
        :root {
          --bg-main: #F4F8FE;
          --bg-surface: #FFFFFF;
          --bg-badge-tint: #E8F5FE;
          --color-cobalt: #0052FF;
          --color-cobalt-hover: #003ECC;
          --color-cyan: #00D4FF;
          --text-title: #071838;
          --text-body: #495E7C;
          --text-muted: #6B82A0;
          --border-subtle: rgba(0, 82, 255, 0.14);
          --border-hover: rgba(0, 212, 255, 0.60);
          --shadow-card: 0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow: 0 8px 25px rgba(0, 82, 255, 0.32);
        }

        /* ================= SECTION BASE ================= */
        .highlights-section {
          background-color: var(--bg-main);
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(0, 212, 255, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 90% 80%, rgba(0, 82, 255, 0.07) 0%, transparent 50%);
          color: var(--text-body);
          padding: 5.5rem 0;
          position: relative;
        }

        /* Top Pill Badge */
        .hl-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-badge-tint);
          border: 1px solid var(--border-subtle);
          color: var(--color-cobalt);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 1.2rem;
          box-shadow: 0 2px 10px rgba(0, 82, 255, 0.05);
          transition: all 0.3s ease;
        }

        .hl-badge:hover {
          border-color: var(--color-cyan);
          transform: translateY(-1px);
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: var(--color-cobalt);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--color-cyan);
          animation: hlPulse 2s infinite ease-in-out;
        }

        @keyframes hlPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        /* Typography */
        .hl-heading {
          font-size: clamp(2.2rem, 3.8vw, 3.3rem);
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: -0.025em;
          color: var(--text-title);
        }

        .hl-highlight {
          background: linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hl-description {
          color: var(--text-body);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        /* ================= VIDEO SHOWCASE ================= */
        .hl-video-wrapper {
          position: relative;
          border-radius: 24px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          box-shadow: 
            var(--shadow-card),
            0 20px 40px rgba(0, 48, 143, 0.08);
          overflow: hidden;
          padding: 7px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hl-video-wrapper:hover {
          border-color: var(--border-hover);
          box-shadow: 
            0 20px 48px rgba(0, 48, 143, 0.12),
            0 0 30px rgba(0, 212, 255, 0.25);
          transform: translateY(-4px);
        }

        .hl-video-element {
          width: 100%;
          height: 520px;
          object-fit: cover;
          border-radius: 18px;
          display: block;
          filter: contrast(1.04) brightness(1);
          background-color: #f0f4fa;
        }

        /* Ambient Glowing Halo */
        .hl-video-glow {
          position: absolute;
          top: -15%;
          left: -12%;
          width: 125%;
          height: 130%;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 212, 255, 0.35);
          filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.3));
          pointer-events: none;
          transform: rotate(-10deg);
          animation: floatGlow 8s ease-in-out infinite alternate;
        }

        @keyframes floatGlow {
          0% { transform: rotate(-10deg) scale(0.98); }
          100% { transform: rotate(-6deg) scale(1.03); }
        }

        /* Experience Badge on Video */
        .hl-experience-badge {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 16px 20px;
          border-radius: 16px;
          border: 1px solid var(--border-subtle);
          box-shadow: 0 10px 30px rgba(0, 48, 143, 0.1);
          display: flex;
          align-items: center;
          gap: 14px;
          transition: transform 0.3s ease;
        }

        .hl-video-wrapper:hover .hl-experience-badge {
          transform: translateY(-2px);
        }

        .hl-exp-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-cyan));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 1.15rem;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(0, 82, 255, 0.3);
        }

        /* ================= STATS CARDS ================= */
        .hl-stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 24px;
          height: 100%;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow-card);
          position: relative;
          overflow: hidden;
        }

        .hl-stat-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-cyan));
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .hl-stat-card:hover {
          transform: translateY(-6px);
          border-color: var(--border-hover);
          box-shadow: 
            0 18px 36px rgba(0, 48, 143, 0.09),
            0 0 20px rgba(0, 212, 255, 0.18);
        }

        .hl-stat-card:hover::before {
          opacity: 1;
        }

        .hl-card-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--bg-badge-tint);
          color: var(--color-cobalt);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .hl-stat-card:hover .hl-card-icon {
          background: var(--color-cobalt);
          color: #ffffff;
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.25);
        }

        .hl-stat-number {
          font-size: 2.1rem;
          font-weight: 800;
          color: var(--color-cobalt);
          letter-spacing: -0.02em;
          line-height: 1;
          display: block;
        }

        .hl-stat-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }

        .hl-stat-title {
          color: var(--text-title);
          font-weight: 700;
          font-size: 1.08rem;
          margin-top: 14px;
          margin-bottom: 6px;
          transition: color 0.3s ease;
        }

        .hl-stat-card:hover .hl-stat-title {
          color: var(--color-cobalt);
        }

        .hl-stat-desc {
          color: var(--text-body);
          font-size: 0.88rem;
          line-height: 1.58;
          margin-bottom: 0;
        }

        /* ================= BUTTONS ================= */
        .hl-btn-primary {
          background-color: var(--color-cobalt);
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          padding: 0.85rem 1.9rem;
          font-size: 0.95rem;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow-glow);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .hl-btn-primary .btn-arrow {
          transition: transform 0.25s ease;
        }

        .hl-btn-primary:hover {
          background-color: var(--color-cobalt-hover);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 82, 255, 0.45);
        }

        .hl-btn-primary:hover .btn-arrow {
          transform: translateX(4px);
        }

        .hl-btn-secondary {
          background-color: var(--bg-surface);
          color: var(--color-cobalt);
          border: 1.5px solid var(--border-subtle);
          border-radius: 10px;
          font-weight: 600;
          padding: 0.85rem 1.9rem;
          font-size: 0.95rem;
          transition: all 0.25s ease;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 48, 143, 0.04);
        }

        .hl-btn-secondary:hover {
          background-color: var(--bg-badge-tint);
          border-color: rgba(0, 82, 255, 0.35);
          color: var(--color-cobalt-hover);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0, 48, 143, 0.08);
        }

        /* ================= RESPONSIVENESS ================= */
        @media (max-width: 991px) {
          .hl-video-element {
            height: 420px;
          }
        }

        @media (max-width: 576px) {
          .highlights-section {
            padding: 3.5rem 0;
          }
          .hl-video-element {
            height: 330px;
          }
          .hl-experience-badge {
            flex-direction: column;
            align-items: flex-start;
            padding: 14px;
          }
          .hl-buttons-wrapper {
            flex-direction: column;
            width: 100%;
          }
          .hl-btn-primary, .hl-btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="container position-relative" style={{ zIndex: 5 }}>
        <div className="row align-items-center g-4 g-lg-5">

          {/* ================= LEFT SIDE: VIDEO SHOWCASE ================= */}
          <div className="col-12 col-lg-6">
            <div className="position-relative">
              
              {/* Outer Cyan Halo */}
              <div className="hl-video-glow" />

              <div className="hl-video-wrapper">
                <video
                  ref={videoRef}
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="hl-video-element"
                />

                {/* Clean Translucent Experience Badge Over Video */}
                <div className="hl-experience-badge">
                  <div className="hl-exp-icon">
                    <FaIndustry />
                  </div>
                  <div>
                    <h5 className="mb-1 fw-bold" style={{ color: "var(--text-title)", fontSize: "0.98rem" }}>
                      Integrated Production Facility
                    </h5>
                    <small style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 500 }}>
                      Controlled manufacturing from fiber selection to final delivery.
                    </small>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE: CONTENT & STATS ================= */}
          <div className="col-12 col-lg-6">

            {/* Live Indicator Pill Badge */}
          

            {/* Heading with Cobalt & Cyan Gradient */}
            <h3 className="hl-heading mb-3">
              Where Fabric Becomes <span className="hl-highlight">Your Brand</span>
            </h3>

            {/* Description with Clean Slate Typography */}
            <p className="hl-description">
              Voxel Nova operates a modern, end-to-end clothing manufacturing ecosystem. 
              From fabric sourcing and technical pattern engineering to precision stitching and certified QC, 
              we manage the entire pipeline under one unified standard.
            </p>

            {/* 2 Highlight Stat Cards */}
            <div className="row g-3">
              {highlights.map((item, index) => (
                <div key={index} className="col-12 col-sm-6">
                  <div className="hl-stat-card">
                    
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="hl-stat-number">{item.stat}</span>
                      <div className="hl-card-icon">{item.icon}</div>
                    </div>

                    <div className="hl-stat-sub">{item.sub}</div>

                    <h6 className="hl-stat-title">{item.title}</h6>
                    <p className="hl-stat-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons with Dynamic Micro-Interactions */}
            <div className="mt-4 pt-2 d-flex flex-wrap gap-3 hl-buttons-wrapper">
              <button
                className="hl-btn-primary"
                onClick={() => navigate("/contact")}
              >
                <span>Request a Production Quote</span>
                <FaArrowRight size={13} className="btn-arrow" />
              </button>

              <button
                className="hl-btn-secondary"
                onClick={() => navigate("/products")}
              >
                Explore Products
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}