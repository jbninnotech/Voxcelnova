import React from "react";

export default function BrandJourney() {
  const steps = [
    {
      id: "01",
      tag: "FOUNDATION & AUTOMATION",
      desc: "Establishing computerized pattern cutting, specialized uniform assembly lines, and fundamental fabric standard testing.",
    },
    {
      id: "02",
      tag: "EXPANSION & ENTERPRISE",
      desc: "Branching into pan-India institutional supplies, certified OEKO-TEX textiles, and high-volume corporate uniform programs.",
    },
    {
      id: "03",
      tag: "SUSTAINABLE INNOVATION",
      desc: "Pioneering zero-waste automated manufacturing, smart decentralized delivery, and next-generation recycled fabrics.",
    },
  ];

  return (
    <section className="vox-journey-light-section">
      <style>{`
        /* ==========================================================
           CLEAN LIGHT THEME COLOR PROFILE
        =========================================================== */
        .vox-journey-light-section {
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
          --shadow-glow:     0 10px 28px rgba(0, 82, 255, 0.18);

          position: relative;
          width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          background-color: var(--bg-main);
          background-image: 
            radial-gradient(rgba(0, 82, 255, 0.08) 1.2px, transparent 1.2px),
            radial-gradient(rgba(0, 212, 255, 0.05) 1.2px, var(--bg-main) 1.2px);
          background-size: 28px 28px;
          background-position: 0 0, 14px 14px;
          color: var(--text-body);
          padding: 4rem 1rem 5rem;
          box-sizing: border-box;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .journey-wrapper {
          max-width: 1140px;
          margin: 0 auto;
          position: relative;
        }

        /* -------------------------------------------------------------
           GUARANTEED VISIBLE CENTRAL STEM (Pure CSS + SVG Node Caps)
        ------------------------------------------------------------- */
        .timeline-center-spine {
          position: absolute;
          top: 0;
          bottom: 30px;
          left: 50%;
          width: 4px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, var(--color-cyan) 0%, var(--color-cobalt) 60%, var(--color-cobalt-hover) 100%);
          border-radius: 4px;
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.4);
          z-index: 1;
        }

        /* End Root Node Dot */
        .timeline-center-spine::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-cobalt);
          box-shadow: 0 0 10px rgba(0, 82, 255, 0.6);
        }

        /* Rows */
        .timeline-item-row {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          margin-bottom: 75px;
        }

        .timeline-item-row:last-child {
          margin-bottom: 0;
        }

        .timeline-half {
          width: 50%;
          box-sizing: border-box;
          position: relative;
        }

        .timeline-half.left {
          padding-right: 50px;
          display: flex;
          justify-content: flex-end;
        }

        .timeline-half.right {
          padding-left: 50px;
          display: flex;
          justify-content: flex-start;
        }

        /* Center Node Ring connecting cards to center line */
        .spine-node-point {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 18px;
          height: 18px;
          background-color: #FFFFFF;
          border: 3.5px solid var(--color-cobalt);
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(0, 82, 255, 0.5);
          z-index: 3;
        }

        /* Connector branches */
        .connector-branch-left {
          position: absolute;
          top: 50%;
          right: 0;
          width: 50px;
          height: 2.5px;
          background: linear-gradient(90deg, var(--color-cyan), var(--color-cobalt));
          transform: translateY(-50%);
          z-index: 1;
        }

        .connector-branch-right {
          position: absolute;
          top: 50%;
          left: 0;
          width: 50px;
          height: 2.5px;
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-cyan));
          transform: translateY(-50%);
          z-index: 1;
        }

        /* Story Cards */
        .story-journey-card {
          width: 100%;
          max-width: 440px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 22px 24px;
          box-shadow: var(--shadow-card);
          position: relative;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .story-journey-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-cyan));
          border-radius: 18px 18px 0 0;
        }

        .story-journey-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
        }

        .story-badge-circle {
          position: absolute;
          bottom: -14px;
          right: 20px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--color-cobalt);
          color: var(--color-cobalt);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.76rem;
          font-weight: 800;
          box-shadow: 0 4px 10px rgba(0, 82, 255, 0.25);
        }

        /* Responsive Mobile Behavior */
        @media (max-width: 768px) {
          .vox-journey-light-section {
            padding: 3rem 0.75rem 4rem;
          }
          .timeline-item-row {
            margin-bottom: 45px;
          }
          .timeline-half.left {
            padding-right: 22px;
          }
          .timeline-half.right {
            padding-left: 22px;
          }
          .connector-branch-left {
            width: 22px;
          }
          .connector-branch-right {
            width: 22px;
          }
          .story-journey-card {
            padding: 16px 14px;
            border-radius: 14px;
          }
          .story-badge-circle {
            width: 28px;
            height: 28px;
            font-size: 0.68rem;
            bottom: -12px;
            right: 12px;
          }
          .header-text-block {
            padding-left: 10px;
          }
        }
      `}</style>

      <div className="journey-wrapper">
        
        {/* ========================================================= */}
        {/* GUARANTEED VISIBLE CENTER SPINE LINE                      */}
        {/* ========================================================= */}
        <div className="timeline-center-spine" />

        {/* ========================================================= */}
        {/* ROW 1: CARD 01 (Left) + HEADER (Right)                    */}
        {/* ========================================================= */}
        <div className="timeline-item-row">
          <div className="timeline-half left">
            {/* Horizontal Branch to Left */}
            <div className="connector-branch-left" />

            <div className="story-journey-card">
              <div className="story-badge-circle">{steps[0].id}</div>
              <LogoBrandedIcon size={26} />
              <div className="fw-bold mt-2" style={{ fontSize: "0.82rem", letterSpacing: "1px", color: "var(--color-cobalt)" }}>
                {steps[0].tag}
              </div>
              <p className="mt-1 mb-0" style={{ fontSize: "0.84rem", color: "var(--text-body)", lineHeight: "1.55" }}>
                {steps[0].desc}
              </p>
            </div>
          </div>

          {/* Node on Center Stem */}
          <div className="spine-node-point" />

          <div className="timeline-half right header-text-block">
            <div style={{ maxWidth: "420px" }}>
              <span
                style={{
                  backgroundColor: "var(--bg-badge-tint)",
                  color: "var(--color-cobalt)",
                  border: "1px solid var(--border-subtle)",
                  fontSize: "0.72rem",
                  fontWeight: "800",
                  letterSpacing: "1.5px",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  display: "inline-block",
                  marginBottom: "8px",
                }}
              >
                OUR EVOLUTION
              </span>
              <h2 className="fw-bold mb-1" style={{ color: "var(--text-title)", fontSize: "clamp(1.35rem, 2.5vw, 2.1rem)", letterSpacing: "-0.5px" }}>
                Where It All Began, <br />
                <span style={{ color: "var(--color-cobalt)" }}>Growing For Scale.</span>
              </h2>
              <p className="mb-0 d-none d-sm-block" style={{ color: "var(--text-body)", fontSize: "0.88rem", lineHeight: "1.5" }}>
                Engineered with the belief that technical garment precision builds lasting institutional identity.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 2: EMPTY (Left) + CARD 02 (Right)                     */}
        {/* ========================================================= */}
        <div className="timeline-item-row">
          <div className="timeline-half left">
            {/* Visual Balance */}
          </div>

          {/* Node on Center Stem */}
          <div className="spine-node-point" />

          <div className="timeline-half right">
            {/* Horizontal Branch to Right */}
            <div className="connector-branch-right" />

            <div className="story-journey-card">
              <div className="story-badge-circle">{steps[1].id}</div>
              <LogoBrandedIcon size={26} />
              <div className="fw-bold mt-2" style={{ fontSize: "0.82rem", letterSpacing: "1px", color: "var(--color-cobalt)" }}>
                {steps[1].tag}
              </div>
              <p className="mt-1 mb-0" style={{ fontSize: "0.84rem", color: "var(--text-body)", lineHeight: "1.55" }}>
                {steps[1].desc}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 3: CARD 03 (Left) + EMPTY (Right)                     */}
        {/* ========================================================= */}
        <div className="timeline-item-row">
          <div className="timeline-half left">
            {/* Horizontal Branch to Left */}
            <div className="connector-branch-left" />

            <div className="story-journey-card">
              <div className="story-badge-circle">{steps[2].id}</div>
              <LogoBrandedIcon size={26} />
              <div className="fw-bold mt-2" style={{ fontSize: "0.82rem", letterSpacing: "1px", color: "var(--color-cobalt)" }}>
                {steps[2].tag}
              </div>
              <p className="mt-1 mb-0" style={{ fontSize: "0.84rem", color: "var(--text-body)", lineHeight: "1.55" }}>
                {steps[2].desc}
              </p>
            </div>
          </div>

          {/* Node on Center Stem */}
          <div className="spine-node-point" />

          <div className="timeline-half right">
            {/* Visual Balance */}
          </div>
        </div>

      </div>
    </section>
  );
}

function LogoBrandedIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M3 12C3 16.9706 7.02944 21 12 21" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.5" fill="#00D4FF" />
    </svg>
  );
}