import React, { useState } from "react";
import {
  FiScissors,
  FiLayers,
  FiCheckCircle,
  FiTruck,
  FiArrowRight,
} from "react-icons/fi";

const ManufacturingInfo = ({ onQuoteClick }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const steps = [
    {
      num: "01",
      icon: <FiScissors size={20} />,
      title: "Fabric & Patterning",
      text: "Custom GSM sourcing, precision pattern cutting, and heavy-duty seams.",
    },
    {
      num: "02",
      icon: <FiLayers size={20} />,
      title: "Custom Branding",
      text: "High-density embroidery, screen prints, DTG, woven tags & custom trims.",
    },
    {
      num: "03",
      icon: <FiCheckCircle size={20} />,
      title: "Quality & Fit Check",
      text: "Rigorous 4-point fabric inspection, wash fastness, and stitch durability.",
    },
    {
      num: "04",
      icon: <FiTruck size={20} />,
      title: "Secure Bulk Dispatch",
      text: "Eco-polybagging, palletized master cartons, and global door-to-door freight.",
    },
  ];

  return (
    <>
      {/* Self-contained CSS Animations */}
      <style>{`
        @keyframes ambientLight {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-20px, 15px) scale(1.1); opacity: 0.8; }
        }

        @keyframes pulseGreen {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.4; }
        }

        .mfg-card-light {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
        }

        .mfg-card-light:hover {
          transform: translateY(-6px);
          background-color: #FFFFFF !important;
          border-color: #93C5FD !important;
          box-shadow: 0 20px 35px -10px rgba(37, 99, 235, 0.12) !important;
        }

        .mfg-icon-light {
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .mfg-card-light:hover .mfg-icon-light {
          transform: scale(1.12) rotate(6deg);
          background-color: #2563EB !important;
          color: #FFFFFF !important;
          box-shadow: 0 8px 18px rgba(37, 99, 235, 0.25);
        }

        .mfg-btn-light {
          transition: all 0.25s ease;
        }

        .mfg-btn-light:hover {
          background-color: #1D4ED8 !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px -5px rgba(37, 99, 235, 0.35);
        }

        .mfg-btn-light .arrow-slide {
          transition: transform 0.25s ease;
        }

        .mfg-btn-light:hover .arrow-slide {
          transform: translateX(4px);
        }
      `}</style>

      <div
        className="rounded-4 p-4 p-lg-5 position-relative overflow-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.05)",
        }}
      >
        {/* Soft Background Blur Circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(219, 234, 254, 0.6) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
            animation: "ambientLight 8s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "10%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(224, 231, 255, 0.5) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
            animation: "ambientLight 10s ease-in-out infinite reverse",
            pointerEvents: "none",
          }}
        />

        <div className="row align-items-center g-4 position-relative" style={{ zIndex: 1 }}>
          {/* Left Column: Heading & Content */}
          <div className="col-lg-5">
            {/* Live Indicator Badge */}
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3"
              style={{
                fontSize: "11px",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                backgroundColor: "#EFF6FF",
                color: "#2563EB",
                fontWeight: 700,
                border: "1px solid #DBEAFE",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  boxShadow: "0 0 8px rgba(16, 185, 129, 0.5)",
                  animation: "pulseGreen 1.8s infinite ease-in-out",
                }}
              />
              Commercial Apparel Production
            </div>

            <h3
              style={{
                fontSize: "clamp(26px, 3.5vw, 36px)",
                fontWeight: 800,
                lineHeight: 1.25,
                color: "#0F172A",
                letterSpacing: "-0.5px",
              }}
            >
              Built for Bulk.
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Engineered for Brands.
              </span>
            </h3>

            <p
              className="mt-3 mb-4"
              style={{
                color: "#64748B",
                fontSize: "14px",
                lineHeight: 1.8,
              }}
            >
              From custom knit formulation to high-volume precision stitching,
              we handle end-to-end garment production with strict tolerance
              testing and reliable global dispatch.
            </p>

            <button
              onClick={onQuoteClick}
              className="btn mfg-btn-light d-inline-flex align-items-center gap-2 px-4 py-2 rounded-3 text-white fw-semibold"
              style={{
                backgroundColor: "#2563EB",
                border: "none",
                fontSize: "14px",
              }}
            >
              Request Bulk Sample
              <span className="arrow-slide d-inline-flex">
                <FiArrowRight />
              </span>
            </button>
          </div>

          {/* Right Column: Step Cards */}
          <div className="col-lg-7">
            <div className="row g-3">
              {steps.map((step, idx) => (
                <div className="col-sm-6" key={step.title}>
                  <div
                    className="mfg-card-light h-100 rounded-4 p-3 p-md-4 position-relative"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {/* Top Row: Icon + Step Index */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div
                        className="mfg-icon-light d-flex align-items-center justify-content-center rounded-3"
                        style={{
                          width: "44px",
                          height: "44px",
                          backgroundColor: "#EFF6FF",
                          color: "#2563EB",
                        }}
                      >
                        {step.icon}
                      </div>

                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          color: hoveredIdx === idx ? "#2563EB" : "#CBD5E1",
                          transition: "color 0.3s ease",
                          letterSpacing: "1px",
                        }}
                      >
                        {step.num}
                      </span>
                    </div>

                    <h6
                      style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        marginBottom: "6px",
                        color: "#0F172A",
                      }}
                    >
                      {step.title}
                    </h6>

                    <p
                      className="mb-0"
                      style={{
                        color: "#64748B",
                        fontSize: "12.5px",
                        lineHeight: 1.6,
                      }}
                    >
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManufacturingInfo;