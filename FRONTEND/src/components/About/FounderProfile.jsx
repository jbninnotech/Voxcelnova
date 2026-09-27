import React, { useState } from "react";

// ============================================================================
// 1. LOCAL FOUNDER IMAGES
// Ensure these files exist in your src/assets/ folder (or update paths)
// ============================================================================
import FounderImg from "../../assets/founder.png";
import CoFounderImg from "../../assets/co-founder.png";

const FoundersPage = ({
  founderImage = FounderImg,
  coFounderImage = CoFounderImg,
}) => {
  // Theme Tokens — Cobalt, Electric Cyan & Ice White Canvas
  const theme = {
    canvasBg: "#F4F8FE",
    cardBg: "#FFFFFF",
    cobaltPrimary: "#0052FF",
    cobaltHover: "#003ECC",
    electricCyan: "#00D4FF",
    iceSoft: "#E8F5FE",
    textTitle: "#071838",
    textBody: "#495E7C",
    textMuted: "#6B82A0",
    borderColor: "rgba(0, 82, 255, 0.14)",
    borderHover: "rgba(0, 212, 255, 0.60)",
    shadowCard: "0 12px 32px rgba(0, 48, 143, 0.06)",
    shadowGlow: "0 8px 25px rgba(0, 82, 255, 0.32)",
  };

  // State to track expanded bio for each founder
  const [expandedIds, setExpandedIds] = useState({});

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const founders = [
    {
      id: 1,
      name: "J. Srinivas",
      role: "Founder & Chief Executive Officer (CEO)",
      image: founderImage,
      bio: "Visionary entrepreneur spearheading next-generation industrial garment manufacturing. Committed to building large-scale automated infrastructure, ethical supply networks, and unmatched commercial value.",
      extendedBio:
        "With deep strategic expertise in garment engineering and industrial scale operations, J. Srinivas founded the enterprise with a mission to transform institutional uniform delivery. Under his direction, the company has integrated automated precision stitching, zero-defect quality standards, and rapid pan-India deployment.",
      milestones: [
        "Scaled automated manufacturing capability to 1M+ units annually",
        "Championed zero-waste CNC pattern cutting standards",
        "Pioneered enterprise-grade B2B bulk production fulfillment",
      ],
      skills: ["Strategic Vision", "Executive Leadership", "Industrial Scaling"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "srinivas@voxcelnova.com",
      },
    },
    {
      id: 2,
      name: "Srisailam",
      role: "Co-Founder & Managing Director (MD)",
      image: coFounderImage,
      bio: "Operations strategist and supply chain leader driving production efficiency, enterprise client partnerships, and precision manufacturing systems across institutional apparel.",
      extendedBio:
        "Srisailam commands end-to-end commercial operations, vendor compliance, and multi-tier production logistics. His operational rigor ensures rapid turnaround times, flawless fabric testing protocols, and robust corporate account retention nationwide.",
      milestones: [
        "Maintained 99.4% on-schedule dispatch rate across institutional contracts",
        "Engineered strict multi-tier quality inspection checkpoints",
        "Expanded nationwide raw material and fabric sourcing channels",
      ],
      skills: ["Operations Management", "Supply Chain Agility", "Enterprise Delivery"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "srisailam@voxcelnova.com",
      },
    },
  ];

  return (
    <div
      className="position-relative overflow-hidden founders-page-container"
      style={{
        backgroundColor: theme.canvasBg,
        minHeight: "100vh",
        padding: "90px 0",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <style>{`
        /* Micro Grid Canvas */
        .founders-page-container {
          background-image:
            radial-gradient(rgba(0, 82, 255, 0.08) 1.2px, transparent 1.2px),
            radial-gradient(rgba(0, 212, 255, 0.05) 1.2px, ${theme.canvasBg} 1.2px);
          background-size: 28px 28px;
          background-position: 0 0, 14px 14px;
        }

        /* Ambient Glowing Glows */
        .ambient-glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }

        /* Card Container */
        .founder-card {
          background: ${theme.cardBg};
          border: 1.5px solid ${theme.borderColor};
          border-radius: 24px;
          box-shadow: ${theme.shadowCard};
          position: relative;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Top Cyan/Cobalt Accent Bar */
        .founder-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, ${theme.cobaltPrimary}, ${theme.electricCyan});
          opacity: 0.85;
          transition: opacity 0.3s ease;
        }

        .founder-card:hover {
          transform: translateY(-6px);
          border-color: ${theme.borderHover};
          box-shadow: 0 20px 48px rgba(0, 82, 255, 0.12);
        }

        /* Avatar Ring */
        .avatar-ring {
          padding: 3.5px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${theme.cobaltPrimary} 0%, ${theme.electricCyan} 100%);
          box-shadow: 0 8px 20px rgba(0, 82, 255, 0.22);
          display: inline-block;
          flex-shrink: 0;
        }

        .avatar-img {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          background-color: ${theme.iceSoft};
        }

        /* Social Icons */
        .founder-social-btn {
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: ${theme.iceSoft};
          color: ${theme.cobaltPrimary};
          border: 1px solid rgba(0, 82, 255, 0.15);
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .founder-social-btn:hover {
          background-color: ${theme.cobaltPrimary};
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.25);
        }

        /* Skill Tag Badges */
        .skill-tag {
          background-color: ${theme.iceSoft};
          border: 1px solid rgba(0, 82, 255, 0.16);
          color: ${theme.cobaltPrimary};
          font-size: 0.8rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 999px;
          letter-spacing: 0.2px;
          transition: all 0.2s ease;
        }
        .skill-tag:hover {
          background-color: ${theme.cobaltPrimary};
          color: #FFFFFF;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Ambient background glows */}
      <div
        className="ambient-glow-orb"
        style={{
          top: "5%",
          right: "8%",
          width: "480px",
          height: "480px",
          background:
            "radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, rgba(0, 82, 255, 0.04) 50%, transparent 70%)",
        }}
      />
      <div
        className="ambient-glow-orb"
        style={{
          bottom: "8%",
          left: "5%",
          width: "450px",
          height: "450px",
          background:
            "radial-gradient(circle, rgba(0, 82, 255, 0.08) 0%, rgba(0, 212, 255, 0.04) 50%, transparent 70%)",
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1, maxWidth: "1200px" }}>
        
        {/* Header Section */}
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2"
            style={{
              backgroundColor: theme.iceSoft,
              border: `1px solid ${theme.borderColor}`,
              color: theme.cobaltPrimary,
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Leadership & Vision
          </div>

          <h2
            className="fw-bold mt-1 mb-2"
            style={{
              color: theme.textTitle,
              fontSize: "clamp(2.2rem, 4vw, 3rem)",
              letterSpacing: "-0.5px",
            }}
          >
            Meet the{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${theme.cobaltPrimary}, ${theme.electricCyan})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Visionaries
            </span>
          </h2>

          <p
            className="mx-auto"
            style={{
              color: theme.textBody,
              maxWidth: "640px",
              fontSize: "1.05rem",
              lineHeight: "1.7",
            }}
          >
            Driven by industrial precision, fueled by textile innovation, and
            dedicated to elevating enterprise apparel nationwide.
          </p>
        </div>

        {/* Founders Cards Grid */}
        <div className="row g-4 justify-content-center align-items-stretch">
          {founders.map((founder) => {
            const isExpanded = !!expandedIds[founder.id];

            return (
              <div key={founder.id} className="col-12 col-lg-6 d-flex">
                <div className="founder-card p-4 p-md-5 w-100">
                  
                  {/* Top Header: Avatar + Title + Socials */}
                  <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4 mb-4">
                    <div className="avatar-ring">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="avatar-img"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300";
                        }}
                      />
                    </div>

                    <div className="text-center text-sm-start flex-grow-1">
                      <h3
                        className="fw-bold mb-1"
                        style={{
                          color: theme.textTitle,
                          fontSize: "1.5rem",
                          letterSpacing: "-0.3px",
                        }}
                      >
                        {founder.name}
                      </h3>

                      <p
                        className="mb-3"
                        style={{
                          color: theme.cobaltPrimary,
                          fontWeight: "700",
                          fontSize: "0.94rem",
                        }}
                      >
                        {founder.role}
                      </p>

                      {/* Social Icons */}
                      <div className="d-flex gap-2 justify-content-center justify-content-sm-start">
                        <a
                          href={founder.social.linkedin}
                          className="founder-social-btn"
                          title="LinkedIn"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>

                        <a
                          href={founder.social.twitter}
                          className="founder-social-btn"
                          title="X (Twitter)"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>

                        <a
                          href={`mailto:${founder.social.email}`}
                          className="founder-social-btn"
                          title="Email"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Summary Bio */}
                  <p
                    style={{
                      color: theme.textBody,
                      lineHeight: "1.7",
                      fontSize: "0.96rem",
                      marginBottom: "14px",
                    }}
                  >
                    {founder.bio}
                  </p>

                  {/* Toggle Read More Accordion */}
                  <div className="my-2">
                    <button
                      type="button"
                      onClick={() => toggleExpand(founder.id)}
                      className="btn p-0 d-inline-flex align-items-center gap-2 border-0"
                      style={{
                        color: theme.cobaltPrimary,
                        fontWeight: "700",
                        fontSize: "0.9rem",
                        outline: "none",
                        boxShadow: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <span>
                        {isExpanded ? "Show Less" : "Read Full Background"}
                      </span>
                      <span
                        style={{
                          display: "inline-block",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                          fontSize: "0.85rem",
                        }}
                      >
                        ▼
                      </span>
                    </button>
                  </div>

                  {/* Extended Bio */}
                  {isExpanded && (
                    <div
                      className="pt-3 mb-3"
                      style={{
                        borderTop: `1px dashed ${theme.borderColor}`,
                        animation: "fadeIn 0.35s ease",
                      }}
                    >
                      <h6
                        style={{
                          color: theme.textTitle,
                          fontWeight: "700",
                          fontSize: "0.92rem",
                        }}
                      >
                        Executive Track Record
                      </h6>
                      <p
                        style={{
                          color: theme.textBody,
                          fontSize: "0.90rem",
                          lineHeight: "1.65",
                        }}
                      >
                        {founder.extendedBio}
                      </p>

                      <h6
                        className="mt-3 mb-2"
                        style={{
                          color: theme.textTitle,
                          fontWeight: "700",
                          fontSize: "0.92rem",
                        }}
                      >
                        Key Milestones
                      </h6>
                      <ul
                        className="ps-3 mb-0"
                        style={{
                          color: theme.textBody,
                          fontSize: "0.88rem",
                          lineHeight: "1.6",
                        }}
                      >
                        {founder.milestones.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: "4px" }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Footer Skill Badges (Always pinned to bottom) */}
                  <div
                    className="pt-3 mt-auto d-flex flex-wrap gap-2"
                    style={{ borderTop: `1px solid ${theme.borderColor}` }}
                  >
                    {founder.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FoundersPage;