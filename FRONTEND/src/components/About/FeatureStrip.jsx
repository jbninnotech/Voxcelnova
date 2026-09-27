import React, { useState } from "react";

export default function WhyChooseUs() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const features = [
    {
      id: 1,
      title: "PREMIUM QUALITY",
      desc: "Fine materials for long lasting performance.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="url(#cleanLightGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 2px 8px rgba(0, 82, 255, 0.25))" }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "CUSTOM MADE",
      desc: "Customized doors as per your requirements.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#cleanLightGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 2px 8px rgba(0, 82, 255, 0.25))" }}>
          <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L7.5 19.5l-4.5 1.5 1.5-4.5L18.375 2.625z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "TRUSTED BRANDS",
      desc: "Authorized dealers of top-quality brands.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#cleanLightGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 2px 8px rgba(0, 82, 255, 0.25))" }}>
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "AFFORDABLE PRICE",
      desc: "Best quality products at competitive prices.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#cleanLightGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 2px 8px rgba(0, 82, 255, 0.25))" }}>
          <path d="M6 3h12" />
          <path d="M6 8h12" />
          <path d="M6 13l8.5 8" />
          <path d="M6 13h3a4.5 4.5 0 0 0 0-9" />
        </svg>
      ),
    },
    {
      id: 5,
      isTruck: true,
      title: "FAST DELIVERY",
      desc: "On-time delivery with safe & secure packaging.",
    },
  ];

  return (
    <>
      {/* SVG Global Gradients for Clean Light Cobalt/Cyan Look */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="cleanLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
      </svg>

      <section className="vx-why-clean-root py-4 py-md-5">
        <style>{`
          /* ==========================================================
             CLEAN LIGHT THEME COLOR PROFILE & ANIMATIONS
          =========================================================== */
          .vx-why-clean-root {
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
            --shadow-glow:     0 8px 25px rgba(0, 82, 255, 0.25);

            /* Full edge-to-edge coverage */
            position: relative;
            width: 100vw;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            background-color: var(--bg-main);
            color: var(--text-body);
            overflow-x: hidden;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            border-top: 1px solid var(--border-subtle);
            border-bottom: 1px solid var(--border-subtle);
          }

          /* Continuous 360-degree rotating wheels */
          @keyframes spinWheels {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Continuous drive from start boundary (-35px) to ending boundary (+110px) */
          @keyframes driveStartToEnd {
            0% {
              transform: translateX(-35px);
              opacity: 0;
            }
            8% { opacity: 1; }
            85% { opacity: 1; }
            100% {
              transform: translateX(110px);
              opacity: 0;
            }
          }

          /* Road Track Animation */
          @keyframes dashSlide {
            0% { background-position: 0px 0; }
            100% { background-position: -24px 0; }
          }

          .auto-scrolling-truck {
            animation: driveStartToEnd 4.2s cubic-bezier(0.42, 0, 0.58, 1) infinite;
          }

          .auto-rotating-wheel {
            transform-origin: center;
            transform-box: fill-box;
            animation: spinWheels 0.5s linear infinite;
          }

          .road-dash {
            background: repeating-linear-gradient(
              90deg,
              var(--color-cyan) 0,
              var(--color-cyan) 6px,
              transparent 6px,
              transparent 12px
            );
            animation: dashSlide 0.8s linear infinite;
          }

          /* Card Container: 2-per-row on Mobile, Compact & Interactive */
          .clean-why-box {
            background-color: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: 14px;
            padding: 16px 12px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            text-align: center;
            box-shadow: var(--shadow-card);
            transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
          }

          .clean-why-box:hover {
            transform: translateY(-4px);
            border-color: var(--border-hover);
            box-shadow: var(--shadow-glow);
          }

          @media (max-width: 575.98px) {
            .clean-why-box {
              padding: 14px 8px;
            }
          }
        `}</style>

        <div className="container-fluid px-3 px-sm-4 px-lg-5">
          {/* Section Heading */}
          <div className="text-center mb-4">
            <span
              style={{
                backgroundColor: "var(--bg-badge-tint)",
                border: "1px solid var(--border-subtle)",
                color: "var(--color-cobalt)",
                fontSize: "0.78rem",
                fontWeight: "800",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                padding: "4px 14px",
                borderRadius: "20px",
                display: "inline-block",
              }}
            >
              Why Choose Us
            </span>
          </div>

          {/* Feature Grid: col-6 for mobile (2 per row), col-md-4 for tablets, col-lg for desktops */}
          <div className="row g-2 g-sm-3 g-md-4 justify-content-center align-items-stretch">
            {features.map((item, index) => {
              const isHovered = hoveredIdx === index;

              return (
                <div
                  key={item.id}
                  className="col-6 col-md-4 col-lg"
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="clean-why-box">
                    {/* ICON / VEHICLE BOX */}
                    <div
                      className="d-flex align-items-center justify-content-center position-relative"
                      style={{
                        height: "50px",
                        width: "100%",
                        marginBottom: "10px",
                        overflow: "hidden",
                      }}
                    >
                      {item.isTruck ? (
                        /* Delivery Vehicle Moving Start-to-End with Spinning Wheels */
                        <div
                          style={{
                            position: "relative",
                            width: "120px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            className="auto-scrolling-truck"
                            style={{
                              position: "absolute",
                              left: "0",
                              display: "flex",
                              alignItems: "center",
                              filter: "drop-shadow(0 2px 6px rgba(0, 82, 255, 0.35))",
                            }}
                          >
                            <svg
                              width="40"
                              height="30"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="url(#cleanLightGrad)"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {/* Vehicle Body */}
                              <rect x="1" y="4" width="14" height="12" rx="1" fill="rgba(0, 82, 255, 0.08)" />
                              <polygon points="15 7 19 7 22 10 22 16 15 16 15 7" fill="rgba(0, 212, 255, 0.12)" />

                              {/* Highlight line */}
                              <line x1="2" y1="12" x2="14" y2="12" stroke="var(--color-cyan)" strokeWidth="1" />

                              {/* Rear Wheel */}
                              <g className="auto-rotating-wheel">
                                <circle cx="5.5" cy="18.5" r="2.5" stroke="var(--color-cobalt)" strokeWidth="1.8" fill="#FFFFFF" />
                                <line x1="5.5" y1="16" x2="5.5" y2="21" stroke="var(--color-cyan)" strokeWidth="1.2" />
                                <line x1="3" y1="18.5" x2="8" y2="18.5" stroke="var(--color-cyan)" strokeWidth="1.2" />
                              </g>

                              {/* Front Wheel */}
                              <g className="auto-rotating-wheel">
                                <circle cx="18.5" cy="18.5" r="2.5" stroke="var(--color-cobalt)" strokeWidth="1.8" fill="#FFFFFF" />
                                <line x1="18.5" y1="16" x2="21" y2="18.5" stroke="var(--color-cyan)" strokeWidth="1.2" />
                                <line x1="16" y1="18.5" x2="21" y2="18.5" stroke="var(--color-cyan)" strokeWidth="1.2" />
                              </g>
                            </svg>
                          </div>

                          {/* Road Track on bottom */}
                          <div
                            className="road-dash"
                            style={{
                              position: "absolute",
                              bottom: "4px",
                              left: "0",
                              width: "100%",
                              height: "1.5px",
                              opacity: 0.8,
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            transform: isHovered ? "scale(1.12)" : "scale(1)",
                            transition: "transform 0.3s ease",
                          }}
                        >
                          {item.icon}
                        </div>
                      )}
                    </div>

                    {/* TITLE */}
                    <h6
                      className="fw-bold mb-1"
                      style={{
                        fontSize: "0.82rem",
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        color: isHovered ? "var(--color-cobalt)" : "var(--text-title)",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {item.title}
                    </h6>

                    {/* DESCRIPTION */}
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "0.74rem",
                        lineHeight: "1.4",
                        color: "var(--text-body)",
                        maxWidth: "180px",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}