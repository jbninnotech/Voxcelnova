import React from "react";
import {
  FiCheckCircle,
  FiPackage,
  FiShield,
  FiTruck,
  FiEdit3,
  FiLayers,
} from "react-icons/fi";

const ProductHighlights = () => {
  const highlights = [
    {
      id: "quality",
      icon: <FiCheckCircle className="anim-check" />,
      title: "Quality Checked",
      text: "Every product passes multi-stage quality inspection.",
      accent: "#2563EB",
      bg: "#EFF6FF",
    },
    {
      id: "fabric",
      icon: <FiLayers className="anim-layers" />,
      title: "Premium Fabric",
      text: "Breathable, pre-shrunk, durable clothing materials.",
      accent: "#7C3AED",
      bg: "#F5F3FF",
    },
    {
      id: "branding",
      icon: <FiEdit3 className="anim-branding" />,
      title: "Custom Branding",
      text: "HD screen printing, DTF & embroidery available.",
      accent: "#EA580C",
      bg: "#FFF7ED",
    },
    {
      id: "bulk",
      icon: <FiPackage className="anim-package" />,
      title: "Bulk Manufacturing",
      text: "Rapid production turnaround for small to bulk orders.",
      accent: "#059669",
      bg: "#ECFDF5",
    },
    {
      id: "delivery",
      icon: <FiTruck className="anim-truck" />,
      title: "Pan India Delivery",
      text: "Fast, insured dispatch across all Indian pin codes.",
      accent: "#0284C7",
      bg: "#F0F9FF",
    },
    {
      id: "shield",
      icon: <FiShield className="anim-shield" />,
      title: "Manufacturing Quality",
      text: "Colorfastness and stitch strength tested for longevity.",
      accent: "#4F46E5",
      bg: "#EEF2FF",
    },
  ];

  return (
    <div className="clothing-highlights-container">
      {/* Dynamic Keyframes for Contextual Icon Animations */}
      <style>{`
        /* Card Hover Elevation */
        .highlight-card {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          cursor: pointer;
        }
        .highlight-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 28px -6px rgba(15, 23, 42, 0.08), 0 6px 12px -4px rgba(15, 23, 42, 0.03) !important;
          border-color: #CBD5E1;
        }

        /* 1. Quality Checkmark: Stamp & Pulse */
        .highlight-card:hover .anim-check {
          animation: checkStamp 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes checkStamp {
          0% { transform: scale(1) rotate(0deg); }
          40% { transform: scale(1.35) rotate(-12deg); }
          70% { transform: scale(0.9) rotate(6deg); }
          100% { transform: scale(1.15) rotate(0deg); }
        }

        /* 2. Fabric Layers: Floating woven sheet separation */
        .highlight-card:hover .anim-layers {
          animation: fabricWave 0.9s ease-in-out infinite alternate;
        }
        @keyframes fabricWave {
          0% { transform: translateY(0) rotateX(0deg); }
          50% { transform: translateY(-4px) scale(1.18); }
          100% { transform: translateY(2px) scale(1.05); }
        }

        /* 3. Custom Branding Pen: Scribble & Writing motion */
        .highlight-card:hover .anim-branding {
          animation: penScribble 0.7s ease-in-out infinite alternate;
        }
        @keyframes penScribble {
          0% { transform: translate(0, 0) rotate(0deg); }
          30% { transform: translate(3px, -3px) rotate(-18deg); }
          60% { transform: translate(-2px, 1px) rotate(-28deg); }
          100% { transform: translate(4px, -2px) rotate(-15deg); }
        }

        /* 4. Bulk Package: Spring box opening bounce */
        .highlight-card:hover .anim-package {
          animation: packagePop 0.7s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
        }
        @keyframes packagePop {
          0% { transform: scale(1) translateY(0); }
          40% { transform: scale(1.1, 0.88) translateY(2px); }
          80% { transform: scale(0.95, 1.15) translateY(-5px); }
          100% { transform: scale(1.1) translateY(-2px); }
        }

        /* 5. Delivery Truck: Drive forward with suspension bump */
        .highlight-card:hover .anim-truck {
          animation: truckDrive 0.85s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        @keyframes truckDrive {
          0% { transform: translateX(-4px) translateY(0); }
          25% { transform: translateX(0px) translateY(-2px); }
          50% { transform: translateX(4px) translateY(0); }
          75% { transform: translateX(2px) translateY(-1px); }
          100% { transform: translateX(6px) translateY(0); }
        }

        /* 6. Shield: Protective pulse & defense sheen */
        .highlight-card:hover .anim-shield {
          animation: shieldGuard 0.8s ease-in-out infinite alternate;
        }
        @keyframes shieldGuard {
          0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(79, 70, 229, 0)); }
          100% { transform: scale(1.22); filter: drop-shadow(0 4px 8px rgba(79, 70, 229, 0.35)); }
        }

        /* Gentle idle pulse on icon badge */
        .icon-badge {
          transition: transform 0.35s ease, background-color 0.35s ease;
        }
        .highlight-card:hover .icon-badge {
          transform: scale(1.08);
        }
      `}</style>

      <div className="row g-3">
        {highlights.map((item) => (
          <div className="col-12 col-sm-6 col-lg-4" key={item.title}>
            <div className="highlight-card h-100 rounded-4 p-3 d-flex flex-column justify-content-between">
              <div>
                <div
                  className="icon-badge d-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: item.bg,
                    color: item.accent,
                    fontSize: "20px",
                  }}
                >
                  {item.icon}
                </div>

                <h6
                  className="mb-1"
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "#0F172A",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {item.title}
                </h6>

                <p
                  className="mb-0"
                  style={{
                    fontSize: "12.5px",
                    lineHeight: 1.6,
                    color: "#64748B",
                  }}
                >
                  {item.text}
                </p>
              </div>

              {/* Subtle bottom indicator dot */}
              <div className="mt-3 pt-2 border-top border-light d-flex align-items-center justify-content-between">
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: item.accent,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Apparel Standard
                </span>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: item.accent,
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductHighlights;