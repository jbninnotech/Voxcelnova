import React, { useState } from 'react';

// Include Bootstrap CSS in your index.js / App.js:
// import 'bootstrap/dist/css/bootstrap.min.css';

const CollegeUniformCategories = () => {
  // Exact Theme Color Profile
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
    shadowHover: '0 18px 40px rgba(0, 82, 255, 0.14)',
    shadowGlow: '0 8px 25px rgba(0, 82, 255, 0.32)',
  };

  const [hoveredCard, setHoveredCard] = useState(null);
  const [btnHovered, setBtnHovered] = useState(false);

  // 6 Uniform Categories
  const categories = [
    {
      id: 1,
      title: 'Institutional Shirts',
      desc: 'Wrinkle-resistant pinpoint oxford & poplin shirts with reinforced seams and institutional monogramming.',
      badge: 'Poly-Cotton Blends',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 2,
      title: 'Formal Trousers',
      desc: 'Durable flat-front and pleated trousers designed with stretch waistbands for all-day comfort and mobility.',
      badge: 'Stain-Resistant',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 3,
      title: 'University Blazers',
      desc: 'Premium structured wool-feel blazers customized with collegiate crest bullion patches and brass buttons.',
      badge: 'Custom Cresting',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 4,
      title: 'College Skirts',
      desc: 'Pleated and straight-cut institutional skirts engineered with resilient colorfast dyes and easy-care fabrics.',
      badge: 'Colorfast Tech',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 5,
      title: 'Ties & Accessories',
      desc: 'Custom woven jacquard ties, crest clips, and leather belts styled with college color stripes.',
      badge: 'Woven Jacquard',
      image: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 6,
      title: 'Athletic & Sportswear',
      desc: 'Breathable, moisture-wicking tracksuits, athletic jerseys, and sports kits customized for intramural teams.',
      badge: 'Quick-Dry Fit',
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=700&q=80',
    },
  ];

  return (
    <section
      className="py-5"
      style={{
        backgroundColor: theme.bgSurface,
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }}>
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
            Institutional Apparel Portfolio
          </div>
          <h2
            className="fw-bold mb-3"
            style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
              color: theme.textTitle,
              letterSpacing: '-0.02em',
            }}
          >
            Our College Uniforms
          </h2>
          <p
            className="mb-0"
            style={{
              color: theme.textBody,
              fontSize: '1.05rem',
              lineHeight: 1.65,
            }}
          >
            Manufactured to the highest institutional standards. Every garment is crafted
            for maximum durability, comfort, and precise campus color consistency.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="row g-4 mb-5">
          {categories.map((cat, idx) => {
            const isHovered = hoveredCard === idx;

            return (
              <div key={cat.id} className="col-12 col-md-6 col-lg-4">
                <div
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="card h-100 rounded-4 overflow-hidden"
                  style={{
                    backgroundColor: theme.bgSurface,
                    border: `1.5px solid ${isHovered ? theme.borderHover : theme.borderSubtle}`,
                    boxShadow: isHovered ? theme.shadowHover : theme.shadowCard,
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  {/* Image Container */}
                  <div
                    className="position-relative overflow-hidden"
                    style={{ height: '220px', backgroundColor: theme.bgMain }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-100 h-100"
                      style={{
                        objectFit: 'cover',
                        transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                        transition: 'transform 0.4s ease',
                      }}
                    />

                    {/* Category Chip Badge */}
                    <span
                      className="position-absolute top-0 end-0 m-3 px-2 py-1 rounded-pill fw-semibold"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(6px)',
                        color: theme.colorCobalt,
                        fontSize: '0.75rem',
                        border: `1px solid ${theme.borderSubtle}`,
                      }}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h3
                        className="h5 mb-0 fw-bold"
                        style={{
                          color: isHovered ? theme.colorCobalt : theme.textTitle,
                          transition: 'color 0.25s ease',
                        }}
                      >
                        {cat.title}
                      </h3>
                      {/* Arrow Icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isHovered ? theme.colorCyan : theme.textMuted}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>

                    <p
                      className="card-text mb-3"
                      style={{
                        color: theme.textBody,
                        fontSize: '0.925rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {cat.desc}
                    </p>

                    <div className="mt-auto pt-3 border-top" style={{ borderColor: 'rgba(0, 82, 255, 0.08)' }}>
                      <span
                        className="fw-semibold text-uppercase"
                        style={{
                          fontSize: '0.78rem',
                          color: theme.colorCobalt,
                          letterSpacing: '0.04em',
                        }}
                      >
                        Bulk Specs &amp; Fabrics →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            className="btn d-inline-flex align-items-center gap-2 px-4 py-3 fw-semibold rounded-3"
            style={{
              backgroundColor: btnHovered ? theme.colorCobaltHover : theme.colorCobalt,
              color: '#FFFFFF',
              boxShadow: theme.shadowGlow,
              border: 'none',
              transform: btnHovered ? 'translateY(-2px)' : 'none',
              transition: 'all 0.25s ease',
              fontSize: '0.95rem',
            }}
          >
            <span>View All Uniforms</span>
            <svg
              width="16"
              height="16"
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
    </section>
  );
};

export default CollegeUniformCategories;