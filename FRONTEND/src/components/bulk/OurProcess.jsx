import React, { useState } from 'react';

// Make sure Bootstrap is imported in your project:
// import 'bootstrap/dist/css/bootstrap.min.css';

const OurProcessSection = () => {
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
    shadowGlow: '0 8px 25px rgba(0, 82, 255, 0.25)',
  };

  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      num: '01',
      title: 'Requirement',
      desc: 'Share your uniform requirements.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Sample',
      desc: 'We prepare a sample for approval.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.5a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.5a2 2 0 00-1.34-2.2z"></path>
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Approval',
      desc: 'Finalize design, fabric, and sizes.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
    },
    {
      num: '04',
      title: 'Bulk Production',
      desc: 'Manufacture the approved uniforms.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      num: '05',
      title: 'Delivery',
      desc: 'Pack and deliver the completed order.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      ),
    },
  ];

  return (
    <section
      className="py-5 position-relative overflow-hidden"
      style={{
        backgroundColor: theme.bgSurface,
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="container py-4">
        {/* Header */}
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '620px' }}>
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
            Streamlined Execution
          </div>

          <h2
            className="fw-bold mb-3"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              color: theme.textTitle,
              letterSpacing: '-0.02em',
            }}
          >
            Our Process
          </h2>

          <p
            className="mb-0"
            style={{
              color: theme.textBody,
              fontSize: '1.05rem',
              lineHeight: 1.6,
            }}
          >
            A transparent, 5-step manufacturing journey designed for smooth coordination
            with college administrators and purchasing committees.
          </p>
        </div>

        {/* Process Timeline Flow */}
        <div className="position-relative mt-4 pt-2">
          {/* Connecting Line across steps (Desktop only) */}
          <div
            className="position-absolute d-none d-lg-block"
            style={{
              top: '40px',
              left: '8%',
              right: '8%',
              height: '2px',
              background: `linear-gradient(90deg, ${theme.borderSubtle} 0%, ${theme.colorCyan} 50%, ${theme.borderSubtle} 100%)`,
              zIndex: 1,
            }}
          />

          <div className="row g-4 position-relative" style={{ zIndex: 2 }}>
            {steps.map((step, idx) => {
              const isHovered = activeStep === idx;

              return (
                <div key={idx} className="col-12 col-sm-6 col-lg text-center">
                  <div
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(null)}
                    className="p-3 rounded-4 h-100 d-flex flex-column align-items-center"
                    style={{
                      backgroundColor: isHovered ? theme.bgMain : 'transparent',
                      border: `1.5px solid ${isHovered ? theme.borderHover : 'transparent'}`,
                      transform: isHovered ? 'translateY(-6px)' : 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Circle Node with Number & Icon */}
                    <div className="position-relative mb-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                        style={{
                          width: '78px',
                          height: '78px',
                          backgroundColor: isHovered ? theme.colorCobalt : theme.bgSurface,
                          color: isHovered ? '#FFFFFF' : theme.colorCobalt,
                          border: `2px solid ${isHovered ? theme.colorCyan : theme.borderSubtle}`,
                          boxShadow: isHovered ? theme.shadowGlow : theme.shadowCard,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {step.icon}
                      </div>

                      {/* Number Pill Badge */}
                      <span
                        className="position-absolute top-0 end-0 badge rounded-pill px-2 py-1"
                        style={{
                          backgroundColor: isHovered ? theme.colorCyan : theme.colorCobalt,
                          color: isHovered ? theme.textTitle : '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          transform: 'translate(25%, -20%)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3
                      className="h6 fw-bold mb-2"
                      style={{
                        color: isHovered ? theme.colorCobalt : theme.textTitle,
                        fontSize: '1.05rem',
                        transition: 'color 0.25s ease',
                      }}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p
                      className="mb-0"
                      style={{
                        color: theme.textBody,
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        maxWidth: '200px',
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcessSection;