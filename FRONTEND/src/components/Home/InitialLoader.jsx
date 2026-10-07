import React, { useEffect, useState } from "react";

const ATELIER_STAGES = [
  "Blending Tri-Color weave: Midnight Navy, Sky Blue & Alabaster",
  "Constructing contrast Alabaster collar & French cuffs",
  "Sewing Cerulean sleeves & mother-of-pearl button placket",
  "Executing signature retail fold: inward sleeves & bottom hem",
  "Steam pressing sharp creases & bespoke presentation",
];

const InitialLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  // Smooth realistic progress engine
  useEffect(() => {
    let progressValue = 0;

    const progressTimer = setInterval(() => {
      progressValue += Math.floor(Math.random() * 4) + 2;

      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(progressTimer);

        setTimeout(() => {
          setIsClosing(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }, 500);
      }

      setProgress(progressValue);
    }, 60);

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  // Craft message switcher
  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIndex((curr) =>
        curr >= ATELIER_STAGES.length - 1 ? curr : curr + 1
      );
    }, 900);

    return () => clearInterval(stageTimer);
  }, []);

  return (
    <div
      role="status"
      aria-label="Tailoring and 3-color shirt folding experience"
      aria-live="polite"
      className="position-fixed top-0 start-0 w-100 d-flex align-items-center justify-content-center overflow-hidden user-select-none"
      style={{
        zIndex: 99999,
        height: "100dvh",
        background: `
          radial-gradient(circle at 50% 28%, rgba(14, 165, 233, 0.14) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(15, 23, 42, 0.08) 0%, transparent 45%),
          #F8FAFC
        `,
        color: "#0F172A",
        opacity: isClosing ? 0 : 1,
        visibility: isClosing ? "hidden" : "visible",
        pointerEvents: isClosing ? "none" : "auto",
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s ease",
      }}
    >
      {/* 3D Hardware Accelerated Shirt Folding & Unfolding Keyframes */}
      <style>{`
        /* 3D Studio Presentation Pitch */
        @keyframes shirtFloatingStage {
          0%, 100% {
            transform: rotateX(24deg) rotateY(-14deg) translateY(0px);
          }
          50% {
            transform: rotateX(26deg) rotateY(14deg) translateY(-8px);
          }
        }

        /* 1. Left Sleeve (Cerulean Sky Blue) folds inward */
        @keyframes leftSleeveFold {
          0%, 14% {
            transform: rotateY(0deg);
          }
          26%, 76% {
            transform: rotateY(175deg);
          }
          88%, 100% {
            transform: rotateY(0deg);
          }
        }

        /* 2. Right Sleeve (Cerulean Sky Blue) folds inward */
        @keyframes rightSleeveFold {
          0%, 24% {
            transform: rotateY(0deg);
          }
          36%, 76% {
            transform: rotateY(-175deg);
          }
          90%, 100% {
            transform: rotateY(0deg);
          }
        }

        /* 3. Bottom Hem folds upward completely 180° underneath into a retail block */
        @keyframes bottomHemFold {
          0%, 42% {
            transform: rotateX(0deg);
          }
          54%, 74% {
            transform: rotateX(-180deg);
          }
          86%, 100% {
            transform: rotateX(0deg);
          }
        }

        /* Specular Fabric Glaze Sweep */
        @keyframes fabricShineSweep {
          0%, 54% {
            left: -140%;
            opacity: 0;
          }
          64% {
            left: 140%;
            opacity: 0.65;
          }
          75%, 100% {
            left: 140%;
            opacity: 0;
          }
        }

        /* Tailor Running Stitch Track */
        @keyframes stitchDash {
          to {
            stroke-dashoffset: -30;
          }
        }
      `}</style>

      {/* Atelier Crafting Grid Background */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          inset: 0,
          pointerEvents: "none",
          opacity: 0.28,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.14) 1.5px, transparent 1.5px),
            linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 16px 16px, 16px 16px",
        }}
      />

      {/* ================= MAIN ATELIER STAGE ================= */}
      <div
        className="position-relative d-flex flex-column align-items-center text-center px-3"
        style={{
          zIndex: 2,
          width: "min(94%, 480px)",
        }}
      >
        {/* ================= 3-COLOR SHIRT SCULPTURE ================= */}
        <div
          className="position-relative d-flex align-items-center justify-content-center mb-3"
          style={{
            width: "280px",
            height: "235px",
            perspective: "1200px",
            perspectiveOrigin: "50% 40%",
          }}
        >
          {/* Atelier Cutting Work Mat Surface */}
          <div
            className="position-absolute"
            style={{
              width: "250px",
              height: "205px",
              background: "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(241,245,249,0.8) 100%)",
              border: "1px solid rgba(14, 165, 233, 0.2)",
              borderRadius: "16px",
              boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08), inset 0 0 0 1px #FFFFFF",
              transform: "rotateX(30deg) translateY(20px)",
              backdropFilter: "blur(6px)",
            }}
          />

          {/* Main 3D Kinetic Garment Rig */}
          <div
            style={{
              position: "relative",
              width: "126px",
              height: "162px",
              transformStyle: "preserve-3d",
              animation: "shirtFloatingStage 6s ease-in-out infinite",
            }}
          >
            {/* 1. UPPER TORSO (COLOR 1: Midnight Navy + Top Cerulean Yoke) */}
            <div
              style={{
                position: "absolute",
                top: "24px",
                left: "13px",
                width: "100px",
                height: "76px",
                background: "linear-gradient(155deg, #0F172A 0%, #1E293B 45%, #0A192F 100%)",
                borderRadius: "5px 5px 0 0",
                border: "1.5px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "0 14px 28px rgba(15, 23, 42, 0.3)",
                overflow: "hidden",
                zIndex: 3,
              }}
            >
              {/* Upper Shoulder Yoke Accent (COLOR 2: Cerulean Sky Blue) */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "18px",
                  background: "linear-gradient(90deg, #0284C7 0%, #38BDF8 50%, #0284C7 100%)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />

              {/* Front Vertical Placket (COLOR 3: Crisp Alabaster White) */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "16px",
                  height: "100%",
                  background: "#FFFFFF",
                  borderLeft: "1px dashed rgba(15, 23, 42, 0.25)",
                  borderRight: "1px dashed rgba(15, 23, 42, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: "5px 0",
                  zIndex: 2,
                }}
              >
                {/* Mother-of-Pearl Navy Shank Buttons */}
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 35%, #38BDF8 0%, #0F172A 100%)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
                      display: "block",
                    }}
                  />
                ))}
              </div>

              {/* Specular Steam Gleam Sweep */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-140%",
                  width: "70px",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
                  transform: "skewX(-25deg)",
                  animation: "fabricShineSweep 6s ease-in-out infinite",
                  zIndex: 4,
                }}
              />
            </div>

            {/* 2. DRESS COLLAR (COLOR 3: Crisp Alabaster White) */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "52px",
                height: "22px",
                zIndex: 6,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Left Spread Collar Leaf */}
              <div
                style={{
                  position: "absolute",
                  left: "4px",
                  top: 0,
                  width: "23px",
                  height: "18px",
                  background: "#FFFFFF",
                  border: "1.5px solid #0284C7",
                  borderRadius: "2px",
                  transform: "rotate(30deg) skewX(8deg)",
                  boxShadow: "0 3px 6px rgba(15, 23, 42, 0.18)",
                }}
              />
              {/* Right Spread Collar Leaf */}
              <div
                style={{
                  position: "absolute",
                  right: "4px",
                  top: 0,
                  width: "23px",
                  height: "18px",
                  background: "#FFFFFF",
                  border: "1.5px solid #0284C7",
                  borderRadius: "2px",
                  transform: "rotate(-30deg) skewX(-8deg)",
                  boxShadow: "0 3px 6px rgba(15, 23, 42, 0.18)",
                }}
              />
              {/* Tie Knot / Collar Band (Midnight Navy) */}
              <div
                style={{
                  position: "absolute",
                  top: "11px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "9px",
                  height: "7px",
                  borderRadius: "2px",
                  background: "#0F172A",
                  border: "1px solid #38BDF8",
                }}
              />
            </div>

            {/* 3. LEFT SLEEVE (COLOR 2: Cerulean Sky Blue with White Cuff) */}
            <div
              style={{
                position: "absolute",
                top: "24px",
                left: "13px",
                width: "48px",
                height: "76px",
                transformOrigin: "left top",
                transformStyle: "preserve-3d",
                animation: "leftSleeveFold 6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                zIndex: 4,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: "100%",
                  width: "46px",
                  height: "72px",
                  background: "linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)",
                  border: "1.5px solid rgba(255, 255, 255, 0.4)",
                  borderRight: "none",
                  borderRadius: "6px 0 0 4px",
                  clipPath: "polygon(100% 0%, 0% 20%, 18% 100%, 100% 90%)",
                  boxShadow: "-8px 10px 18px rgba(2, 132, 199, 0.25)",
                }}
              >
                {/* Contrast French Cuff (COLOR 3: Crisp Alabaster White) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    left: "2px",
                    width: "25px",
                    height: "11px",
                    background: "#FFFFFF",
                    borderRadius: "2px",
                    border: "1px solid #0F172A",
                  }}
                />
              </div>
            </div>

            {/* 4. RIGHT SLEEVE (COLOR 2: Cerulean Sky Blue with White Cuff) */}
            <div
              style={{
                position: "absolute",
                top: "24px",
                right: "13px",
                width: "48px",
                height: "76px",
                transformOrigin: "right top",
                transformStyle: "preserve-3d",
                animation: "rightSleeveFold 6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                zIndex: 4,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "100%",
                  width: "46px",
                  height: "72px",
                  background: "linear-gradient(225deg, #38BDF8 0%, #0284C7 100%)",
                  border: "1.5px solid rgba(255, 255, 255, 0.4)",
                  borderLeft: "none",
                  borderRadius: "0 6px 4px 0",
                  clipPath: "polygon(0% 0%, 100% 20%, 82% 100%, 0% 90%)",
                  boxShadow: "8px 10px 18px rgba(2, 132, 199, 0.25)",
                }}
              >
                {/* Contrast French Cuff (COLOR 3: Crisp Alabaster White) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    width: "25px",
                    height: "11px",
                    background: "#FFFFFF",
                    borderRadius: "2px",
                    border: "1px solid #0F172A",
                  }}
                />
              </div>
            </div>

            {/* 5. LOWER SHIRT HEM (COLOR 1: Midnight Navy + White Placket - FOLDS 180° UPWARD) */}
            <div
              style={{
                position: "absolute",
                top: "100px",
                left: "13px",
                width: "100px",
                height: "64px",
                transformOrigin: "center top",
                transformStyle: "preserve-3d",
                animation: "bottomHemFold 6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                zIndex: 5,
              }}
            >
              {/* Front Side of Lower Hem */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
                  border: "1.5px solid rgba(255, 255, 255, 0.4)",
                  borderRadius: "0 0 12px 12px",
                  boxShadow: "0 12px 24px rgba(15, 23, 42, 0.25)",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Placket Extension (White) */}
                <div
                  style={{
                    width: "16px",
                    height: "75%",
                    background: "#FFFFFF",
                    borderLeft: "1px dashed rgba(15, 23, 42, 0.25)",
                    borderRight: "1px dashed rgba(15, 23, 42, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 35%, #38BDF8 0%, #0F172A 100%)",
                      display: "block",
                    }}
                  />
                </div>

                {/* Bottom Contrast Piping Trim (Cerulean Sky Blue) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: "#38BDF8",
                    borderRadius: "0 0 10px 10px",
                  }}
                />
              </div>

              {/* Backside Folded Under-Lining (Revealed when folded up 180°) */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(0deg, #0284C7 0%, #0F172A 100%)",
                  border: "1.5px solid rgba(255, 255, 255, 0.35)",
                  borderRadius: "12px 12px 0 0",
                  transform: "rotateY(180deg) rotateZ(180deg)",
                  backfaceVisibility: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 -8px 22px rgba(15, 23, 42, 0.35)",
                }}
              >
                <div className="d-flex flex-column align-items-center">
                  <span
                    style={{
                      fontSize: "7px",
                      fontWeight: 800,
                      letterSpacing: "1.8px",
                      color: "#FFFFFF",
                      textTransform: "uppercase",
                    }}
                  >
                    Bespoke Atelier
                  </span>
                  <span
                    style={{
                      fontSize: "6px",
                      letterSpacing: "1px",
                      color: "#38BDF8",
                      textTransform: "uppercase",
                      marginTop: "1px",
                    }}
                  >
                    Savile Row Standard
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Ground Shadow */}
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "95px",
                height: "14px",
                borderRadius: "50%",
                background: "rgba(15, 23, 42, 0.22)",
                filter: "blur(8px)",
              }}
            />
          </div>
        </div>

        {/* ================= 3-COLOR PALETTE SWATCH LEGEND ================= */}
        <div
          className="d-flex align-items-center justify-content-center gap-2 mb-2 px-3 py-1 rounded-pill"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            border: "1px solid rgba(14, 165, 233, 0.18)",
            boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div className="d-flex align-items-center gap-1">
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0F172A", border: "1px solid #CBD5E1" }} />
            <span style={{ fontSize: "0.62rem", fontWeight: 600, color: "#334155" }}>Midnight</span>
          </div>
          <span style={{ color: "#94A3B8" }}>•</span>
          <div className="d-flex align-items-center gap-1">
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#38BDF8", border: "1px solid #CBD5E1" }} />
            <span style={{ fontSize: "0.62rem", fontWeight: 600, color: "#334155" }}>Sky Blue</span>
          </div>
          <span style={{ color: "#94A3B8" }}>•</span>
          <div className="d-flex align-items-center gap-1">
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFFFFF", border: "1px solid #94A3B8" }} />
            <span style={{ fontSize: "0.62rem", fontWeight: 600, color: "#334155" }}>Alabaster</span>
          </div>
        </div>

        {/* ================= BRAND TITLES ================= */}
        <div>
          <span
            className="text-uppercase fw-bold"
            style={{
              letterSpacing: "3.5px",
              fontSize: "0.68rem",
              color: "#0284C7",
              display: "block",
              marginBottom: "3px",
            }}
          >
            Haute Couture • Atelier • Uniforms
          </span>

          <h1
            className="m-0 fw-bold"
            style={{
              fontSize: "clamp(1.7rem, 5vw, 2.2rem)",
              letterSpacing: "0.12em",
              color: "#0F172A",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            VOXEL NOVA
          </h1>

          <p
            className="text-uppercase mb-0"
            style={{
              margin: "4px 0 0",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.26em",
              color: "#64748B",
            }}
          >
            PRECISION CRAFTED TEXTILES
          </p>
        </div>

        {/* ================= TAILOR'S RUNNING STITCH SEAM ================= */}
        <div className="w-100 my-3 d-flex justify-content-center">
          <svg width="220" height="8" viewBox="0 0 220 8" fill="none">
            <line
              x1="0"
              y1="4"
              x2="220"
              y2="4"
              stroke="#0284C7"
              strokeWidth="2"
              strokeDasharray="6 5"
              style={{ animation: "stitchDash 1.2s linear infinite" }}
            />
          </svg>
        </div>

        {/* ================= DYNAMIC CRAFT PROGRESS MESSAGE ================= */}
        <div
          className="d-flex align-items-center justify-content-center gap-2"
          style={{
            minHeight: "22px",
            fontSize: "0.8rem",
            color: "#334155",
            fontWeight: 500,
          }}
        >
          <span
            className="rounded-circle"
            style={{
              width: "7px",
              height: "7px",
              backgroundColor: "#0284C7",
              boxShadow: "0 0 0 3px rgba(2, 132, 199, 0.2)",
            }}
          />
          <span>{ATELIER_STAGES[stageIndex]}</span>
        </div>

        {/* ================= PROGRESS BAR ================= */}
        <div className="w-100 mt-2" style={{ maxWidth: "320px" }}>
          <div
            className="d-flex align-items-center justify-content-between text-uppercase mb-1"
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#64748B",
            }}
          >
            <span>Bespoke Progress</span>
            <span style={{ color: "#0284C7", fontWeight: 800 }}>{progress}%</span>
          </div>

          <div
            className="w-100 rounded-pill overflow-hidden"
            style={{
              height: "6px",
              backgroundColor: "rgba(2, 132, 199, 0.12)",
              padding: "1px",
            }}
          >
            <div
              className="h-100 rounded-pill"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0F172A 0%, #0284C7 50%, #38BDF8 100%)",
                boxShadow: "0 0 8px rgba(2, 132, 199, 0.4)",
                transition: "width 0.14s ease-out",
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= ATELIER FOOTER TAG ================= */}
      <div
        className="position-absolute start-50 translate-middle-x d-flex align-items-center justify-content-center gap-2 text-nowrap"
        style={{
          bottom: "18px",
          zIndex: 2,
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "#94A3B8",
        }}
      >
        <span>HERITAGE WEAVES</span>
        <span style={{ color: "#0284C7" }}>•</span>
        <span>MODERN UNIFORMS</span>
        <span style={{ color: "#0284C7" }}>•</span>
        <span>BESPOKE CUTS</span>
      </div>
    </div>
  );
};

export default InitialLoader;