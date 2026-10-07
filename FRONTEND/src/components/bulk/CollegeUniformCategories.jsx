import React, { useState } from 'react';

// Include Bootstrap CSS in your index.js / App.js:
// import 'bootstrap/dist/css/bootstrap.min.css';

const CollegeUniformCategories = () => {
  // WhatsApp Configuration
  const WHATSAPP_PHONE = "918143324349";
  const defaultMessage = encodeURIComponent(
    "Hello! We are looking for custom college & campus uniforms in bulk. Please share your catalog, fabric samples, and pricing quotation."
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${defaultMessage}`;

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

  // 8 Bulk Order College Uniform Categories
  const categories = [
    {
      id: 1,
      title: 'Institutional Shirts & Blouses',
      desc: 'Wrinkle-resistant pinpoint oxford and poplin campus shirts engineered for daily student wear with optional crest embroidery.',
      badge: 'Poly-Cotton Blends',
      image: 'https://res.cloudinary.com/d4oald11/image/upload/v1791098680/collage1.jpg',
    },
    {
      id: 2,
      title: 'Campus Blazers & Outerwear',
      desc: 'Structured wool-blend blazers with customized brass buttons and institutional crest patches for academic ceremonies.',
      badge: 'Custom Cresting',
      image: 'https://res.cloudinary.com/d4oald11/image/upload/v1791098688/collage8.jpg',
    },
    {
      id: 3,
      title: 'Formal Trousers & Chinos',
      desc: 'Heavy-duty pleated and flat-front formal trousers built with reinforced seams and stain-resistant treatment.',
      badge: 'Stain-Resistant Tech',
      image: 'https://res.cloudinary.com/d4oald11/image/upload/v1791098686/collage7.avif',
    },
    {
      id: 4,
      title: 'Institutional Skirts & Dresses',
      desc: 'Colorfast pleated skirts and professional campus dresses crafted for breathable, flexible all-day comfort.',
      badge: 'Anti-Fade Fabric',
      image: 'https://res.cloudinary.com/d4oald11/image/upload/v1791098684/collage5.webp',
    },
    {
      id: 5,
      title: 'Faculty & Administrative Wear',
      desc: 'Refined corporate suits, waistcoats, and executive attire designed specifically for professors, deans, and staff.',
      badge: 'Executive Tailoring',
      image: 'https://res.cloudinary.com/d4oald11/image/upload/v1791098683/collage4.avif',
    },
    {
      id: 6,
      title: 'Varsity & Athletic Kits',
      desc: 'Quick-dry, moisture-wicking jerseys, tracksuits, and sportswear tailored for college sports teams and physical education.',
      badge: 'Quick-Dry Fit',
      image: 'https://res.cloudinary.com/d4oald11/image/upload/v1791098682/collage3.jpg',
    },
    {
      id: 7,
      title: 'Lab Coats & Technical Attire',
      desc: 'Chemical-resistant cotton lab coats, scrubs, and workshop aprons customized for medical, engineering, and science departments.',
      badge: 'Industrial Grade',
      image: 'https://res.cloudinary.com/d4oald11/image/upload/v1791098680/collage2.webp',
    },
    {
      id: 8,
      title: 'Ties, Belts & House Accessories',
      desc: 'Woven jacquard neckties, brass-buckle leather belts, and house insignia scarves for complete institutional branding.',
      badge: 'Custom Jacquard',
      image: 'https://res.cloudinary.com/d4oald11/image/upload/v1791098680/collage1.jpg',
    },
  ];

  const handleCardClick = (categoryTitle) => {
    const cardMsg = encodeURIComponent(
      `Hello! I am interested in placing a bulk order for "${categoryTitle}". Please share pricing, minimum order quantities, and fabric samples.`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${cardMsg}`, '_blank');
  };

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
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '680px' }}>
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
            Bulk Institutional Manufacturing
          </div>
          <h2
            className="fw-bold mb-3"
            style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
              color: theme.textTitle,
              letterSpacing: '-0.02em',
            }}
          >
            College Uniform Categories
          </h2>
          <p
            className="mb-0"
            style={{
              color: theme.textBody,
              fontSize: '1.05rem',
              lineHeight: 1.65,
            }}
          >
            Direct-from-factory bulk supply tailored for universities, technical institutes, and colleges. 
            Select a category to request fabric samples, custom branding, and tier-priced bulk quotations.
          </p>
        </div>

        {/* Categories Grid (8 Cards) */}
        <div className="row g-4 mb-5">
          {categories.map((cat, idx) => {
            const isHovered = hoveredCard === idx;

            return (
              <div key={`${cat.id}-${idx}`} className="col-12 col-md-6 col-lg-3">
                <div
                  onClick={() => handleCardClick(cat.title)}
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
                    style={{ height: '210px', backgroundColor: theme.bgMain }}
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
                        fontSize: '0.72rem',
                        border: `1px solid ${theme.borderSubtle}`,
                      }}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="card-body p-3 p-xl-4 d-flex flex-column">
                    <div className="d-flex align-items-start justify-content-between mb-2">
                      <h3
                        className="h6 mb-0 fw-bold"
                        style={{
                          color: isHovered ? theme.colorCobalt : theme.textTitle,
                          transition: 'color 0.25s ease',
                          lineHeight: 1.35,
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
                        className="flex-shrink-0 ms-2"
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
                        fontSize: '0.875rem',
                        lineHeight: 1.55,
                      }}
                    >
                      {cat.desc}
                    </p>

                    <div className="mt-auto pt-3 border-top" style={{ borderColor: 'rgba(0, 82, 255, 0.08)' }}>
                      <span
                        className="fw-semibold text-uppercase"
                        style={{
                          fontSize: '0.75rem',
                          color: theme.colorCobalt,
                          letterSpacing: '0.04em',
                        }}
                      >
                        Request Bulk Quote →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bulk Order CTA Button targeting WhatsApp */}
        <div className="text-center pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            className="btn d-inline-flex align-items-center gap-2 px-4 py-3 fw-semibold rounded-3 text-decoration-none"
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
            <span>Request Bulk Quotation &amp; Fabric Catalog</span>
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
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollegeUniformCategories;