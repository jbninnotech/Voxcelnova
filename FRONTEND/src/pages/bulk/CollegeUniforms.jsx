import React, { useState } from 'react';
import CollegeUniformCategories from "../../components/bulk/CollegeUniformCategories"
import CustomUniforms from "../../components/bulk/CustomUniforms" 
import OurProcess from "../../components/bulk/OurProcess"
import Customizations from "../../components/bulk/Customization"

// Include Bootstrap CSS in your index.js / App.js:
// import 'bootstrap/dist/css/bootstrap.min.css';

const CollegeUniformsHero = () => {
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
    shadowGlow: '0 8px 25px rgba(0, 82, 255, 0.32)',
  };

  // Hover states for interactive elements
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  return (
    <>
    <section  
      className="d-flex align-items-center position-relative overflow-hidden"
      style={{
        backgroundColor: theme.bgMain,
        minHeight: '100vh',
        padding: '80px 0',
      }}
    >
      {/* Background Glow Accents */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, rgba(0, 212, 255, 0.18) 0%, rgba(244, 248, 254, 0) 70%)`,
          top: '-10%',
          right: '-5%',
          pointerEvents: 'none',
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: '450px',
          height: '450px',
          background: `radial-gradient(circle, rgba(0, 82, 255, 0.12) 0%, rgba(244, 248, 254, 0) 70%)`,
          bottom: '-10%',
          left: '-5%',
          pointerEvents: 'none',
        }}
      />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center gy-5">
          {/* Left Column: Text & CTA */}
          <div className="col-12 col-lg-7 text-center text-lg-start">
            {/* Badge */}
           

            {/* Headline */}
            <h1
              className="fw-bold mb-3"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.15,
                color: theme.textTitle,
                letterSpacing: '-0.03em',
              }}
            >
              Custom &amp; Bulk <br />
              <span
                style={{
                  background: `linear-gradient(90deg, ${theme.colorCobalt} 0%, ${theme.colorCyan} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Uniform Solutions
              </span>
            </h1>

            {/* Description */}
            <p
              className="mb-4 mx-auto mx-lg-0"
              style={{
                color: theme.textBody,
                fontSize: '1.15rem',
                lineHeight: 1.7,
                maxWidth: '560px',
              }}
            >
              Engineered for durability, comfort, and campus pride. We design, manufacture,
              and supply institutional-grade apparel tailored directly to your college identity.
            </p>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start align-items-center mb-4">
              <button
                type="button"
                onMouseEnter={() => setIsPrimaryHovered(true)}
                onMouseLeave={() => setIsPrimaryHovered(false)}
                className="btn d-inline-flex align-items-center px-4 py-3 text-white fw-semibold rounded-3 border-0"
                style={{
                  backgroundColor: isPrimaryHovered ? theme.colorCobaltHover : theme.colorCobalt,
                  boxShadow: theme.shadowGlow,
                  transform: isPrimaryHovered ? 'translateY(-2px)' : 'none',
                  transition: 'all 0.25s ease',
                  fontSize: '1rem',
                }}
              >
                Request a Quote
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

              <button
                type="button"
                onMouseEnter={() => setIsSecondaryHovered(true)}
                onMouseLeave={() => setIsSecondaryHovered(false)}
                className="btn d-inline-flex align-items-center px-4 py-3 fw-semibold rounded-3"
                style={{
                  backgroundColor: theme.bgSurface,
                  color: theme.textTitle,
                  border: `1.5px solid ${isSecondaryHovered ? theme.borderHover : theme.borderSubtle}`,
                  boxShadow: theme.shadowCard,
                  transform: isSecondaryHovered ? 'translateY(-2px)' : 'none',
                  transition: 'all 0.25s ease',
                  fontSize: '1rem',
                }}
              >
                Explore Fabric Catalog
              </button>
            </div>

            {/* Feature Bullets */}
          
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="col-12 col-lg-5">
            <div className="position-relative mx-auto" style={{ maxWidth: '460px' }}>
              
              {/* Main Display Card */}
              <div
                className="p-4 p-md-5 rounded-4"
                style={{
                  backgroundColor: theme.bgSurface,
                  border: `1px solid ${theme.borderSubtle}`,
                  boxShadow: theme.shadowCard,
                }}
              >
                {/* College Uniform Visual Placeholder / Header */}
                <div
                  className="rounded-3 p-4 mb-4 text-center d-flex flex-column align-items-center justify-content-center"
                  style={{
                    backgroundColor: theme.bgBadgeTint,
                    border: `1px dashed ${theme.borderHover}`,
                    minHeight: '220px',
                  }}
                >
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={theme.colorCobalt}
                    strokeWidth="1.5"
                    className="mb-2"
                  >
                    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.5a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.5a2 2 0 00-1.34-2.2z" />
                  </svg>
                  <span className="fw-bold" style={{ color: theme.textTitle }}>
                    Blazers, Polos & Lab Coats
                  </span>
                  <span style={{ color: theme.textMuted, fontSize: '0.85rem' }}>
                    Custom tailored for campuses nationwide
                  </span>
                </div>

                {/* Spec List */}
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between pb-2 border-bottom">
                    <span style={{ color: theme.textMuted, fontSize: '0.9rem' }}>Fabric Blend</span>
                    <span className="fw-semibold" style={{ color: theme.textTitle, fontSize: '0.9rem' }}>
                      Breathable Poly-Cotton / Twill
                    </span>
                  </div>
                  <div className="d-flex justify-content-between pb-2 border-bottom">
                    <span style={{ color: theme.textMuted, fontSize: '0.9rem' }}>Embroidery</span>
                    <span className="fw-semibold" style={{ color: theme.textTitle, fontSize: '0.9rem' }}>
                      HD Crest & Institutional Logos
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span style={{ color: theme.textMuted, fontSize: '0.9rem' }}>Delivery Scope</span>
                    <span className="fw-semibold" style={{ color: theme.colorCobalt, fontSize: '0.9rem' }}>
                      Bulk Pan-India / Export Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Stat Chip (Offset bottom-left) */}
              <div
                className="position-absolute d-flex align-items-center gap-3 p-3 rounded-3 shadow-lg"
                style={{
                  backgroundColor: theme.bgSurface,
                  border: `1px solid ${theme.borderSubtle}`,
                  bottom: '-24px',
                  left: '-20px',
                  minWidth: '220px',
                }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: theme.bgBadgeTint,
                    color: theme.colorCobalt,
                  }}
                >
                  ★
                </div>
                <div>
                  <div className="fw-bold" style={{ color: theme.textTitle, fontSize: '1.1rem', lineHeight: 1.2 }}>
                    50,000+
                  </div>
                  <small style={{ color: theme.textMuted, fontSize: '0.8rem' }}>
                    Uniforms Supplied Yearly
                  </small>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    <CustomUniforms />
    < CollegeUniformCategories />
    <Customizations />
    <OurProcess />
    </>
  );
};

export default CollegeUniformsHero;