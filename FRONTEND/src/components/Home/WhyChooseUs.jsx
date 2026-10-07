import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaBolt,
  FaIndustry,
  FaCheckCircle,
  FaBoxes,
  FaTruckMoving,
  FaAward,
  FaMicrochip,
  FaArrowRight,
} from "react-icons/fa";

export default function WhyChooseUsSection() {
  const pillars = [
    {
      icon: <FaMicrochip />,
      title: "Smart Fiber & AeroDry™ Tech",
      desc: "Engineered with proprietary moisture-lock synthetic weaves that resist thermal stress, odor, and premature color fade.",
      tag: "Fabric Tech",
    },
    {
      icon: <FaIndustry />,
      title: "Automated Laser Cutting",
      desc: "Computerized CAD cutting and multi-head precision embroidery ensure zero-tolerance variance across 10,000+ unit batches.",
      tag: "Zero-Variance",
    },
    {
      icon: <FaShieldAlt />,
      title: "ISO 9001:2015 Certified",
      desc: "Every single production batch undergoes 4-stage strict quality checks for tensile strength, stitching rigidity, and colorfastness.",
      tag: "Certified",
    },
    {
      icon: <FaBoxes />,
      title: "Dynamic B2B Tiered Pricing",
      desc: "Transparent wholesale tier structures with aggressive cost reductions for growing startups and Fortune 500 corporate fleets.",
      tag: "Cost-Effective",
    },
    {
      icon: <FaTruckMoving />,
      title: "Global Supply Chain Velocity",
      desc: "Integrated domestic and international freight partners ensure rapid fulfillment with guaranteed delivery timetables.",
      tag: "Express Shipping",
    },
    {
      icon: <FaAward />,
      title: "Free Pre-Production Proofs",
      desc: "Physical fabric swatches and digital 3D photorealistic mockups supplied before final manufacturing kickoff.",
      tag: "Risk-Free",
    },
  ];

  const stats = [
    { value: "< 0.2%", label: "Stitch Variance Rate" },
    { value: "24 Hrs", label: "Quote Turnaround" },
    { value: "50+", label: "Units Minimum MOQ" },
    { value: "99.8%", label: "On-Time Dispatch" },
  ];

  return (
    <section className="vx-why-clean-section">
      <style>{`
        /* ==========================================================
           CLEAN LIGHT THEME COLOR PROFILE & ANIMATIONS
        =========================================================== */
        .vx-why-clean-section {
          --bg-main:         #F4F8FE; /* Ultra-clean ice porcelain canvas */
          --bg-surface:      #FFFFFF; /* Pure white card surface */
          --bg-badge-tint:   #E8F5FE; /* Soft light-cyan badge & chip background */

          --color-cobalt:    #0052FF; /* Primary buttons, links, active icons */
          --color-cobalt-hover: #003ECC; /* Darker cobalt for hover states */
          --color-cyan:      #00D4FF; /* Swoosh highlights, secondary icons, glows */

          --text-title:      #071838; /* Crisp, high-contrast dark navy for headings */
          --text-body:       #495E7C; /* Soft slate navy for paragraphs */
          --text-muted:      #6B82A0; /* Light slate for captions and small labels */

          --border-subtle:   rgba(0, 82, 255, 0.14);  /* Clean card borders */
          --border-hover:    rgba(0, 212, 255, 0.60); /* Cyan glowing border on hover */

          --shadow-card:     0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow:     0 12px 28px rgba(0, 82, 255, 0.18);

          /* Full edge-to-edge section coverage */
          position: relative;
          width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          background-color: var(--bg-main);
          color: var(--text-body);
          padding: 3.5rem 1.5rem 4rem;
          box-sizing: border-box;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .vx-container-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        /* 2-Column Responsive Card */
        .vx-clean-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 24px 22px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }

        /* Top Accent Highlight Line */
        .vx-clean-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-cyan));
          transition: height 0.25s ease;
        }

        /* Shimmer sweep animation on hover */
        .vx-clean-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.12), transparent);
          transform: skewX(-20deg);
          transition: left 0.75s ease;
          pointer-events: none;
        }

        .vx-clean-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
        }

        .vx-clean-card:hover::before {
          height: 4px;
        }

        .vx-clean-card:hover::after {
          left: 140%;
        }

        /* Icon Badge with Glow & Rotation */
        .vx-clean-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-badge-tint);
          border: 1px solid var(--border-subtle);
          color: var(--color-cobalt);
          font-size: 20px;
          transition: transform 0.35s ease, background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease;
        }

        .vx-clean-card:hover .vx-clean-icon-badge {
          transform: scale(1.08) rotate(-4deg);
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-cyan));
          color: #FFFFFF;
          box-shadow: 0 6px 18px rgba(0, 82, 255, 0.3);
        }

        /* Tag Chip */
        .vx-clean-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          background-color: var(--bg-badge-tint);
          border: 1px solid var(--border-subtle);
          color: var(--color-cobalt);
          transition: background-color 0.25s ease, color 0.25s ease;
        }

        .vx-clean-card:hover .vx-clean-tag {
          background-color: rgba(0, 212, 255, 0.15);
          color: var(--color-cobalt-hover);
        }

        /* Interactive Card Learn More / Explore footer */
        .vx-card-explore {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-cobalt);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.25s ease;
        }

        .vx-clean-card:hover .vx-card-explore {
          gap: 10px;
          color: var(--color-cobalt-hover);
        }

        /* Stat Counter Item */
        .vx-clean-stat-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 16px 12px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(0, 48, 143, 0.04);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .vx-clean-stat-item:hover {
          transform: translateY(-3px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
        }

        /* Light-theme Primary CTA Button */
        .vx-btn-clean-cta {
          background: linear-gradient(135deg, var(--color-cobalt) 0%, #0045DC 100%);
          border: none;
          color: #FFFFFF !important;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 10px;
          font-size: 0.86rem;
          box-shadow: 0 4px 18px rgba(0, 82, 255, 0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .vx-btn-clean-cta:hover {
          background: linear-gradient(135deg, var(--color-cobalt-hover) 0%, var(--color-cobalt) 100%);
          box-shadow: 0 6px 24px rgba(0, 82, 255, 0.38);
          transform: translateY(-2px);
        }

        @media (max-width: 575.98px) {
          .vx-why-clean-section {
            padding: 2.5rem 1rem 3rem;
          }
          .vx-clean-card {
            padding: 18px 16px;
          }
        }
      `}</style>

      <div className="vx-container-inner">
        {/* SECTION HEADER */}
        <div className="text-center mb-4 pb-2">
          <div
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2"
            style={{
              backgroundColor: "var(--bg-badge-tint)",
              border: "1px solid var(--border-subtle)",
              color: "var(--color-cobalt)",
              fontSize: "0.78rem",
              fontWeight: "700",
              letterSpacing: "0.6px",
            }}
          >
            <FaBolt size={12} color="var(--color-cobalt)" />
            <span>WHY CHOOSE VOXEL NOVA</span>
          </div>

          <h2
            className="fw-bold mb-2"
            style={{
              color: "var(--text-title)",
              fontSize: "clamp(1.75rem, 3.4vw, 2.4rem)",
              letterSpacing: "-0.5px",
            }}
          >
            The Precision Standard In{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cyan) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Apparel Manufacturing.
            </span>
          </h2>
          <p
            className="mx-auto mb-0"
            style={{
              maxWidth: "620px",
              color: "var(--text-body)",
              fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
              lineHeight: 1.6,
            }}
          >
            We combine high-performance synthetic fiber science with automated mass production
            to equip corporations, institutions, and elite teams worldwide.
          </p>
        </div>

        {/* 2 BOXES PER ROW (col-12 col-md-6) */}
        <div className="row g-3 g-md-4 mb-4">
          {pillars.map((pillar, idx) => (
            <div className="col-12 col-md-6" key={idx}>
              <div className="vx-clean-card">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="vx-clean-icon-badge">{pillar.icon}</div>
                    <span className="vx-clean-tag">{pillar.tag}</span>
                  </div>

                  <h5
                    className="fw-bold mb-2"
                    style={{
                      color: "var(--text-title)",
                      fontSize: "1.1rem",
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {pillar.title}
                  </h5>

                  <p
                    className="mb-0"
                    style={{
                      color: "var(--text-body)",
                      fontSize: "0.88rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>

                {/* Bottom subtle indicator */}
                <div
                  className="pt-3 mt-3 d-flex align-items-center justify-content-between"
                  style={{ borderTop: "1px dashed var(--border-subtle)" }}
                >
                  <span className="vx-card-explore">
                    <span>Manufacturing standard</span>
                    <FaArrowRight size={10} />
                  </span>
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-cyan)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* METRICS STRIP */}
        <div className="row g-2 g-md-3 mb-4">
          {stats.map((stat, idx) => (
            <div className="col-6 col-md-3" key={idx}>
              <div className="vx-clean-stat-item">
                <h3
                  className="fw-bold mb-1"
                  style={{
                    color: "var(--color-cobalt)",
                    fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {stat.value}
                </h3>
                <small style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontWeight: "600" }}>
                  {stat.label}
                </small>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION PROMPT */}
        <div className="text-center pt-2">
          <div
            className="d-inline-flex flex-column flex-md-row align-items-center justify-content-between gap-3 p-3 px-4 rounded-4"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px dashed var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
              maxWidth: "800px",
              width: "100%",
            }}
          >
            <div className="d-flex align-items-center gap-2 text-start">
              <FaCheckCircle style={{ color: "var(--color-cobalt)", flexShrink: 0 }} size={16} />
              <span style={{ fontSize: "0.84rem", color: "var(--text-body)" }}>
                Complimentary physical fabric sample swatches provided for qualified bulk orders.
              </span>
            </div>

            <Link
              to="/bulk-orders"
              className="vx-btn-clean-cta text-decoration-none text-nowrap"
            >
              <span>Request Swatches & Quote</span>
              <FaArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}