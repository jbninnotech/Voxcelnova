import React, { useState } from 'react';

// --- Vector Icons ---
const BeliefIcons = {
  quality: ({ color = "currentColor", size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
      <path d="M2 9h20" />
      <path d="M10 3v6" />
      <path d="M14 3v6" />
      <path d="M12 21L8 9" />
      <path d="M12 21l4-12" />
    </svg>
  ),
  customer: ({ color = "currentColor", size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      <path d="M12 9v4" />
      <path d="M10 11h4" />
    </svg>
  ),
  value: ({ color = "currentColor", size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  growth: ({ color = "currentColor", size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
      <path d="M12 22C6.5 22 2 17.5 2 12" strokeDasharray="2 3" opacity="0.4" />
    </svg>
  )
};

const WhatWeBelieve = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const beliefs = [
    {
      id: 'quality',
      title: 'Precision Craft',
      badge: 'Zero-Defect',
      iconKey: 'quality',
      description: 'CNC pattern nesting and automated seam alignment ensure complete batch consistency.',
      quote: '“True quality is consistency repeated a million times.”',
      actionPoints: [
        'Automated CAD pattern nesting',
        'Strict AQL 2.5 defect audits',
        'Tensile & color stress tests'
      ]
    },
    {
      id: 'customer',
      title: 'Client Centricity',
      badge: 'Tailored Fit',
      iconKey: 'customer',
      description: 'Every uniform program is bespoke, integrating live feedback directly into manufacturing.',
      quote: '“Client trust is our primary benchmark of success.”',
      actionPoints: [
        'Rapid physical prototyping',
        'Live bulk production tracking',
        'Dedicated account leads'
      ]
    },
    {
      id: 'value',
      title: 'Tangible Value',
      badge: 'Optimized Cost',
      iconKey: 'value',
      description: 'Long-lasting fabric meets scalable batch output, built for heavy operational wear.',
      quote: '“Cost efficiency without durability is a false economy.”',
      actionPoints: [
        'High-abrasion resistant textiles',
        'Direct factory supply efficiency',
        'Tiered volume scale economics'
      ]
    },
    {
      id: 'growth',
      title: 'Scalability',
      badge: 'Evolution',
      iconKey: 'growth',
      description: 'Continual modernization with zero-waste cutting layouts and certified sustainable fibers.',
      quote: '“Deepen manufacturing capability before capacity.”',
      actionPoints: [
        'OEKO-TEX® certified raw blends',
        'AI-driven inventory forecasting',
        'Direct-to-hub regional logistics'
      ]
    }
  ];

  return (
    <section className="what-we-believe-section">
      <style>{`
        /* ==========================================================
           CLEAN LIGHT THEME COLOR PROFILE
        =========================================================== */
        .what-we-believe-section {
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
          --shadow-glow:     0 10px 26px rgba(0, 82, 255, 0.18);

          /* Full edge-to-edge section width */
          position: relative;
          width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          background-color: var(--bg-main);
          color: var(--text-body);
          padding: 3.5rem 1rem 4rem;
          box-sizing: border-box;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .what-we-believe-inner {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }

        /* 3D Flip Card Container */
        .belief-card-wrapper {
          perspective: 1200px;
          cursor: pointer;
        }

        /* Height optimized for 2-box per row layout on mobile & desktop */
        .belief-card-inner {
          position: relative;
          width: 100%;
          height: 280px;
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1);
          transform-style: preserve-3d;
        }

        .belief-card-inner.is-flipped {
          transform: rotateY(180deg);
        }

        .card-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-card);
          transition: border-color 0.28s ease, box-shadow 0.28s ease, transform 0.28s ease;
        }

        /* Top Cyan/Cobalt Accent Stripe */
        .card-face::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-cyan));
          transition: height 0.25s ease;
        }

        /* Light Sweep Shimmer Animation */
        .card-face::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.12), transparent);
          transform: skewX(-20deg);
          transition: left 0.75s ease;
          pointer-events: none;
        }

        .belief-card-wrapper:hover .card-face-front {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
          transform: translateY(-3px);
        }

        .belief-card-wrapper:hover .card-face::before {
          height: 4px;
        }

        .belief-card-wrapper:hover .card-face::after {
          left: 140%;
        }

        .card-face-back {
          transform: rotateY(180deg);
          border-color: var(--color-cobalt);
        }

        .belief-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background-color: var(--bg-badge-tint);
          border: 1px solid var(--border-subtle);
          color: var(--color-cobalt);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
        }

        .belief-card-wrapper:hover .belief-icon-box {
          transform: scale(1.08) rotate(-4deg);
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-cyan));
          color: #FFFFFF;
        }

        /* Strict Mobile Formatting: 2 Cards Per Row */
        @media (max-width: 575.98px) {
          .what-we-believe-section {
            padding: 2.5rem 0.6rem 3rem;
          }
          .belief-card-inner {
            height: 250px;
          }
          .belief-card-front, .card-face-back {
            padding: 12px 10px !important;
          }
          .belief-icon-box {
            width: 32px;
            height: 32px;
            border-radius: 8px;
          }
          .belief-title-text {
            font-size: 0.90rem !important;
            margin-bottom: 4px !important;
          }
          .belief-desc-text {
            font-size: 0.74rem !important;
            line-height: 1.35 !important;
          }
          .belief-badge-tag {
            font-size: 0.58rem !important;
            padding: 2px 6px !important;
          }
          .belief-flip-label {
            font-size: 0.65rem !important;
          }
          .quote-box {
            font-size: 0.65rem !important;
            padding: 4px 6px !important;
          }
          .action-bullet {
            font-size: 0.70rem !important;
          }
        }
      `}</style>

      <div className="what-we-believe-inner">
        {/* Header Section */}
        <div className="text-center mb-4 pb-2">
          <span
            style={{
              backgroundColor: "var(--bg-badge-tint)",
              color: "var(--color-cobalt)",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.72rem",
              fontWeight: "800",
              letterSpacing: "1.5px",
              padding: "4px 14px",
              borderRadius: "20px",
              display: "inline-block",
              marginBottom: "8px",
              textTransform: "uppercase"
            }}
          >
            Core Values
          </span>
          <h2
            className="fw-bold mb-2"
            style={{
              color: 'var(--text-title)',
              fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
              letterSpacing: '-0.5px'
            }}
          >
            What We Believe In
          </h2>
          <p
            className="mx-auto mb-0"
            style={{
              maxWidth: '560px',
              fontSize: 'clamp(0.82rem, 1.6vw, 0.92rem)',
              color: 'var(--text-body)',
              lineHeight: 1.55
            }}
          >
            Hover or tap any pillar to uncover how our technical manufacturing standards translate into daily client value.
          </p>
        </div>

        {/* 2 BOXES PER ROW ON ALL DEVICES: col-6 for mobile & desktop */}
        <div className="row g-2 g-sm-3 g-md-4">
          {beliefs.map((belief) => {
            const isFlipped = flippedCard === belief.id;
            const IconComponent = BeliefIcons[belief.iconKey];

            return (
              <div
                key={belief.id}
                className="col-6 belief-card-wrapper"
                onMouseEnter={() => setFlippedCard(belief.id)}
                onMouseLeave={() => setFlippedCard(null)}
                onClick={() => setFlippedCard(isFlipped ? null : belief.id)}
              >
                <div className={`belief-card-inner ${isFlipped ? 'is-flipped' : ''}`}>

                  {/* ===== FRONT SIDE ===== */}
                  <div className="card-face card-face-front p-3 d-flex flex-column justify-content-between">
                    <div>
                      {/* Top Row: Icon + Badge */}
                      <div className="d-flex justify-content-between align-items-center mb-2 mb-sm-3">
                        <div className="belief-icon-box">
                          <IconComponent size={18} />
                        </div>

                        <span
                          className="belief-badge-tag"
                          style={{
                            fontSize: '0.64rem',
                            fontWeight: '700',
                            letterSpacing: '0.4px',
                            color: 'var(--color-cobalt)',
                            textTransform: 'uppercase',
                            backgroundColor: 'var(--bg-badge-tint)',
                            border: '1px solid var(--border-subtle)',
                            padding: '3px 8px',
                            borderRadius: '12px'
                          }}
                        >
                          {belief.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h5
                        className="fw-bold mb-1 mb-sm-2 belief-title-text"
                        style={{
                          color: 'var(--text-title)',
                          fontSize: '1.05rem',
                          letterSpacing: '-0.2px'
                        }}
                      >
                        {belief.title}
                      </h5>

                      {/* Description */}
                      <p
                        className="mb-0 belief-desc-text"
                        style={{
                          color: 'var(--text-body)',
                          fontSize: '0.82rem',
                          lineHeight: 1.45
                        }}
                      >
                        {belief.description}
                      </p>
                    </div>

                    {/* Bottom Trigger Indicator */}
                    <div
                      className="pt-2 mt-1 d-flex align-items-center justify-content-between"
                      style={{ borderTop: '1px dashed var(--border-subtle)' }}
                    >
                      <span className="belief-flip-label" style={{ fontSize: '0.70rem', color: 'var(--color-cobalt)', fontWeight: '700' }}>
                        Flip details
                      </span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-cobalt)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                      </svg>
                    </div>
                  </div>

                  {/* ===== BACK SIDE ===== */}
                  <div className="card-face card-face-back p-3 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span
                          className="belief-badge-tag"
                          style={{
                            backgroundColor: 'var(--bg-badge-tint)',
                            color: 'var(--color-cobalt)',
                            fontSize: '0.62rem',
                            fontWeight: '800',
                            padding: '2px 6px',
                            borderRadius: '6px',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase'
                          }}
                        >
                          Pillars
                        </span>
                        <IconComponent color="var(--color-cobalt)" size={15} />
                      </div>

                      <h6 className="fw-bold mb-1 mb-sm-2 belief-title-text" style={{ color: 'var(--text-title)', fontSize: '0.90rem' }}>
                        {belief.title}
                      </h6>

                      <ul className="list-unstyled d-flex flex-column gap-1 mb-0">
                        {belief.actionPoints.map((point, idx) => (
                          <li
                            key={idx}
                            className="d-flex align-items-start gap-1 action-bullet"
                            style={{ fontSize: '0.74rem', color: 'var(--text-body)', lineHeight: 1.3 }}
                          >
                            <span style={{ color: 'var(--color-cobalt)', fontWeight: '800', marginRight: '3px' }}>✓</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className="p-1 p-sm-2 rounded mt-1 quote-box"
                      style={{
                        backgroundColor: 'var(--bg-badge-tint)',
                        borderLeft: '3px solid var(--color-cobalt)',
                        fontStyle: 'italic',
                        fontSize: '0.68rem',
                        color: 'var(--text-title)',
                        lineHeight: 1.3
                      }}
                    >
                      {belief.quote}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBelieve;