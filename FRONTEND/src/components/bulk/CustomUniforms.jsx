import React, { useState } from 'react';

// Make sure Bootstrap is imported in your project:
// import 'bootstrap/dist/css/bootstrap.min.css';

const CustomUniformsSection = () => {
  // Theme Color Profile
  const theme = {
    bgMain: '#F4F8FE',
    bgSurface: '#FFFFFF',
    bgBadgeTint: '#E8F5FE',
    colorCobalt: '#0052FF',
    colorCobaltHover: '#003ECC',
    colorCyan: '#00D4FF',
    textTitle: '#071838',
    textBody: '#495E7C',
    textMuted: '#6B82A0',
    borderSubtle: 'rgba(0, 82, 255, 0.14)',
    borderHover: 'rgba(0, 212, 255, 0.60)',
    shadowCard: '0 12px 32px rgba(0, 48, 143, 0.06)',
    shadowHover: '0 20px 40px rgba(0, 82, 255, 0.12)',
    shadowGlow: '0 8px 25px rgba(0, 82, 255, 0.32)',
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  // 4 Customization Capabilities
  const features = [
    {
      id: 'colors',
      title: 'Custom Colors',
      subtitle: 'Exact Pantone Shade Matching',
      desc: 'Formulate bespoke mill-dyed fabrics aligned precisely with your institutional identity, ensuring identical batch consistency year after year.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
      badge: 'Pantone Accurate',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a7 7 0 0 0 7 7c0 3-2 5-2 7a5 5 0 0 1-10 0c0-2-2-4-2-7a7 7 0 0 0 7-7z" />
        </svg>
      ),
    },
    {
      id: 'logo',
      title: 'College Logo',
      subtitle: 'Institutional Crest & Monograms',
      desc: 'High-definition woven labels, non-peel silicone heat transfers, and crisp silk-screen cresting built to endure heavy academic laundry cycles.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80',
      badge: 'High-Definition',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
        </svg>
      ),
    },
    {
      id: 'embroidery',
      title: 'Embroidery',
      subtitle: 'Precision Bullion & Needlework',
      desc: 'Multi-head automated embroidery using Japanese high-tensile threads and metallic wire for luxurious blazer crests and lapel emblems.',
      image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=700&q=80',
      badge: 'Up to 50k Stitches',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      id: 'sizes-designs',
      title: 'Custom Sizes & Designs',
      subtitle: 'Bespoke Patterns & Full Grading',
      desc: 'From custom collar designs and piping accents to full-spectrum sizing (XS–5XL) and custom fits engineered for diverse student bodies.',
      image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=700&q=80',
      badge: 'Inclusive Fit Scale',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="position-relative py-5"
      style={{
        backgroundColor: theme.bgMain,
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
          <div
            className="d-inline-flex align-items-center px-3 py-1 rounded-pill mb-3"
            style={{
              backgroundColor: theme.bgBadgeTint,
              border: `1px solid ${theme.borderSubtle}`,
              color: theme.colorCobalt,
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Tailored To Academic Standards
          </div>

          <h2
            className="fw-bold mb-3"
            style={{
              fontSize: 'clamp(2.1rem, 3.8vw, 3rem)',
              color: theme.textTitle,
              letterSpacing: '-0.025em',
            }}
          >
            Uniforms Designed for Your Institution
          </h2>

          <p
            className="mb-0"
            style={{
              color: theme.textBody,
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            Every university holds a distinct legacy. We provide end-to-end bespoke manufacturing
            to adapt collar profiles, color formulas, and crest designs to your exact campus specifications.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="row g-4 mb-5">
          {features.map((feat, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div key={feat.id} className="col-12 col-md-6 col-lg-3">
                <div
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="card h-100 rounded-4 overflow-hidden"
                  style={{
                    backgroundColor: theme.bgSurface,
                    border: `1.5px solid ${isHovered ? theme.borderHover : theme.borderSubtle}`,
                    boxShadow: isHovered ? theme.shadowHover : theme.shadowCard,
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                >
                  {/* Visual Preview */}
                  <div
                    className="position-relative overflow-hidden"
                    style={{ height: '170px', backgroundColor: theme.bgBadgeTint }}
                  >
                    <img
                      src={feat.image}
                      alt={feat.title}
                      className="w-100 h-100"
                      style={{
                        objectFit: 'cover',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    {/* Badge Overlay */}
                    <span
                      className="position-absolute bottom-0 start-0 m-3 px-2 py-1 rounded-pill fw-semibold"
                      style={{
                        backgroundColor: 'rgba(7, 24, 56, 0.75)',
                        backdropFilter: 'blur(6px)',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {feat.badge}
                    </span>
                  </div>

                  {/* Feature Content */}
                  <div className="card-body p-4 d-flex flex-column">
                    {/* Icon & Title Row */}
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <div
                        className="rounded-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: isHovered ? theme.colorCobalt : theme.bgBadgeTint,
                          color: isHovered ? '#FFFFFF' : theme.colorCobalt,
                          transition: 'all 0.25s ease',
                          flexShrink: 0,
                        }}
                      >
                        {feat.icon}
                      </div>
                      <h3
                        className="h6 mb-0 fw-bold"
                        style={{
                          color: theme.textTitle,
                          fontSize: '1.1rem',
                        }}
                      >
                        {feat.title}
                      </h3>
                    </div>

                    <div
                      className="fw-semibold mb-2"
                      style={{
                        color: theme.colorCobalt,
                        fontSize: '0.825rem',
                      }}
                    >
                      {feat.subtitle}
                    </div>

                    <p
                      className="card-text mb-0"
                      style={{
                        color: theme.textBody,
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom B2B Consultation / CTA Banner */}
        <div
          className="rounded-4 p-4 p-md-5 position-relative overflow-hidden"
          style={{
            backgroundColor: theme.bgSurface,
            border: `1.5px solid ${theme.borderSubtle}`,
            boxShadow: theme.shadowCard,
          }}
        >
          <div className="row align-items-center gy-4">
            <div className="col-12 col-lg-8 text-center text-lg-start">
              <div
                className="fw-bold mb-2"
                style={{
                  color: theme.colorCobalt,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Institutional Custom Program
              </div>
              <h4
                className="fw-bold mb-2"
                style={{
                  color: theme.textTitle,
                  fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                }}
              >
                Have specific design guidelines or strict dress-code bylaws?
              </h4>
              <p
                className="mb-0"
                style={{
                  color: theme.textBody,
                  fontSize: '0.975rem',
                  maxWidth: '650px',
                }}
              >
                Our textile engineers coordinate with college administrations to prototype sample sets, 
                match proprietary pantones, and guarantee on-time bulk delivery.
              </p>
            </div>

            <div className="col-12 col-lg-4 text-center text-lg-end">
              <button
                type="button"
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                className="btn px-4 py-3 fw-semibold rounded-3 d-inline-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: ctaHovered ? theme.colorCobaltHover : theme.colorCobalt,
                  color: '#FFFFFF',
                  boxShadow: theme.shadowGlow,
                  border: 'none',
                  transform: ctaHovered ? 'translateY(-2px)' : 'none',
                  transition: 'all 0.25s ease',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Discuss Your Requirements</span>
                <svg
                  className="ms-2"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomUniformsSection;