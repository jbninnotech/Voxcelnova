import React, { useState, useEffect, useRef } from 'react';

const COLLECTIONS = [
  { 
    id: 1, 
    title: 'Aura Crimson Heritage', 
    price: '₹19,499', 
    tag: 'Paithani', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790834434/333.jpg' 
  },
  { 
    id: 2, 
    title: 'Zari Regal Opulence', 
    price: '₹24,999', 
    tag: 'Kanjivaram', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790834433/213.jpg' 
  },
  { 
    id: 3, 
    title: 'Celestial Temple Silk', 
    price: '₹16,800', 
    tag: 'Temple Silk', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790833748/shankar_gf.jpg' 
  },
  { 
    id: 4, 
    title: 'Varanasi Royal Brocade', 
    price: '₹28,500', 
    tag: 'Banarasi', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790834432/876.jpg' 
  },
  { 
    id: 5, 
    title: 'Ethereal Weave Elegance', 
    price: '₹21,200', 
    tag: 'Raw Silk', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790834432/543.jpg' 
  },
  { 
    id: 6, 
    title: 'Maroon Zari Tradition', 
    price: '₹26,000', 
    tag: 'Heritage', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790833745/shankar_gf_2.jpg' 
  },
  { 
    id: 7, 
    title: 'Lustrous Gold Tissue', 
    price: '₹17,750', 
    tag: 'Tissue Silk', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790833744/nithins_gf_4.jpg' 
  },
  { 
    id: 8, 
    title: 'Imperial Twilight Silk', 
    price: '₹32,500', 
    tag: 'Brocade', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790834436/111.png' 
  },
  { 
    id: 9, 
    title: 'Shankar Festive Ensemble I', 
    price: '₹15,400', 
    tag: 'Festive', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790834436/shankar_child_1.jpg' 
  },
  { 
    id: 10, 
    title: 'Shankar Festive Ensemble II', 
    price: '₹15,900', 
    tag: 'Festive', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790834436/shankar_child_2.jpg' 
  },
  { 
    id: 11, 
    title: 'Sovereign Royal Drape', 
    price: '₹27,300', 
    tag: 'Chanderi', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790834432/432.jpg' 
  },
  { 
    id: 12, 
    title: 'Tara Peacock Signature', 
    price: '₹18,499', 
    tag: 'Paithani', 
    img: 'https://res.cloudinary.com/d4oald11/image/upload/v1790832198/2.jpg' 
  },
];

export default function ResponsiveCylindricalRibbon() {
  const [scrollPos, setScrollPos] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const scrollRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameRef = useRef(null);

  const isSmallMobile = windowWidth < 480;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CARD_WIDTH = isSmallMobile ? 165 : isMobile ? 185 : isTablet ? 210 : 245;
  const CARD_HEIGHT = isSmallMobile ? 260 : isMobile ? 290 : isTablet ? 330 : 375;
  const CARD_GAP = isMobile ? 5 : 7;
  const ITEM_STRIDE = CARD_WIDTH + CARD_GAP;
  const TOTAL_ITEMS = COLLECTIONS.length;
  const TOTAL_LOOP_WIDTH = TOTAL_ITEMS * ITEM_STRIDE;

  const CYLINDER_RADIUS = isMobile ? 680 : isTablet ? 920 : 1180;
  const PERSPECTIVE = isMobile ? 650 : 950;
  const STAGE_HEIGHT = isSmallMobile ? 320 : isMobile ? 360 : 470;

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isInteracting) {
        if (Math.abs(velocityRef.current) > 0.1) {
          scrollRef.current += velocityRef.current;
          velocityRef.current *= 0.93;
        } else if (!isHovered) {
          const speed = isMobile ? 90 : 115;
          scrollRef.current += speed * Math.min(delta, 0.1);
        }
        setScrollPos(scrollRef.current);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isInteracting, isHovered, isMobile]);

  const handleTouchStart = (clientX) => {
    setIsInteracting(true);
    lastXRef.current = clientX;
    velocityRef.current = 0;
  };

  const handleTouchMove = (clientX) => {
    if (!isInteracting) return;
    const deltaX = clientX - lastXRef.current;
    lastXRef.current = clientX;

    scrollRef.current -= deltaX * 1.15;
    velocityRef.current = -deltaX * 0.95;
    setScrollPos(scrollRef.current);
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
  };

  const stepScroll = (direction) => {
    velocityRef.current = direction * (isMobile ? 20 : 28);
  };

  return (
    <div
      style={{
        backgroundColor: '#F4F8FE',
        minHeight: isMobile ? 'auto' : '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        padding: isMobile ? '16px 12px 20px 12px' : '26px 24px',
        fontFamily: "'Playfair Display', Georgia, serif",
      }}
      onMouseUp={handleTouchEnd}
      onTouchEnd={handleTouchEnd}
    >
      {/* Inline Keyframe Styles for Title Animation */}
      <style>{`
        @keyframes fadeInUpTitle {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* ================= HEADER ROW WITH CENTERED TITLE & NAVIGATION CONTROLLERS ================= */}
      <div className="container-fluid px-1 px-md-3">
        <div className="d-flex align-items-center justify-content-between gap-2 position-relative">
          {/* Centered Animated Title */}
          <div
            className="text-center mx-auto"
            style={{
              animation: 'fadeInUpTitle 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <p
              className="text-uppercase mb-1 fw-bold"
              style={{
                letterSpacing: isMobile ? '2px' : '3.5px',
                fontSize: isMobile ? '9.5px' : '11px',
                color: '#6B82A0',
                animation: 'fadeInUpTitle 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              The Signature Silk Horizon
            </p>
            <h1
              style={{
                fontSize: 'clamp(1.35rem, 4.2vw, 2.7rem)',
                fontWeight: '400',
                letterSpacing: '-1.5px',
                color: '#071838',
                margin: 0,
                lineHeight: 1.15,
                animation: 'fadeInUpTitle 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards',
                opacity: 0,
              }}
            >
              Woven to Be{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#0052FF' }}>
                Remembered
              </span>
            </h1>
          </div>

          {/* Absolute Positioned Controllers to Preserve True Center Alignment */}
          <div className="position-absolute end-0 d-flex align-items-center gap-1 gap-sm-2 flex-shrink-0">
            <button
              onClick={() => stepScroll(-1)}
              className="btn rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: isMobile ? '38px' : '46px',
                height: isMobile ? '38px' : '46px',
                backgroundColor: '#FFFFFF',
                color: '#0052FF',
                border: '1px solid rgba(0, 82, 255, 0.14)',
                boxShadow: '0 8px 24px rgba(0, 48, 143, 0.08)',
                fontSize: isMobile ? '15px' : '18px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              title="Previous"
            >
              &#8592;
            </button>
            <button
              onClick={() => stepScroll(1)}
              className="btn rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: isMobile ? '38px' : '46px',
                height: isMobile ? '38px' : '46px',
                backgroundColor: '#FFFFFF',
                color: '#0052FF',
                border: '1px solid rgba(0, 82, 255, 0.14)',
                boxShadow: '0 8px 24px rgba(0, 48, 143, 0.08)',
                fontSize: isMobile ? '15px' : '18px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              title="Next"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      {/* ================= 3D CYLINDRICAL HORIZON STAGE ================= */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleTouchEnd();
        }}
        onMouseDown={(e) => handleTouchStart(e.pageX)}
        onMouseMove={(e) => handleTouchMove(e.pageX)}
        onTouchStart={(e) => handleTouchStart(e.touches[0].pageX)}
        onTouchMove={(e) => handleTouchMove(e.touches[0].pageX)}
        onWheel={(e) => {
          scrollRef.current += e.deltaY * 0.65;
          setScrollPos(scrollRef.current);
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: `${STAGE_HEIGHT}px`,
          perspective: `${PERSPECTIVE}px`,
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: isMobile ? '12px 0' : '20px 0',
          cursor: isInteracting ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {[-1, 0, 1].map((copyIndex) =>
            COLLECTIONS.map((card, idx) => {
              const itemBaseX = (idx + copyIndex * TOTAL_ITEMS) * ITEM_STRIDE;
              const relativeX = itemBaseX - (scrollPos % TOTAL_LOOP_WIDTH);

              const halfSpan = TOTAL_LOOP_WIDTH * 1.5;
              const wrappedX =
                ((((relativeX + halfSpan) % TOTAL_LOOP_WIDTH) + TOTAL_LOOP_WIDTH) % TOTAL_LOOP_WIDTH) -
                TOTAL_LOOP_WIDTH / 2;

              const maxViewX = isMobile ? 550 : 1200;
              if (Math.abs(wrappedX) > maxViewX) return null;

              const angleRad = wrappedX / CYLINDER_RADIUS;
              const posX = CYLINDER_RADIUS * Math.sin(angleRad);
              const posZ = CYLINDER_RADIUS * (Math.cos(angleRad) - 1);
              const rotY = (angleRad * 180) / Math.PI;

              const depthDarkness = Math.min(Math.abs(wrappedX) / (isMobile ? 420 : 750), 1) * 0.42;

              return (
                <div
                  key={`${card.id}-${copyIndex}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    borderRadius: isMobile ? '10px' : '14px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0, 82, 255, 0.14)',
                    boxShadow: '0 10px 26px rgba(0, 48, 143, 0.08)',
                    transform: `translate3d(${posX}px, 0px, ${posZ}px) rotateY(${rotY}deg)`,
                    transformOrigin: '50% 50%',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform',
                    transition: isInteracting ? 'none' : 'box-shadow 0.2s ease',
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      pointerEvents: 'none',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: `rgba(7, 24, 56, ${depthDarkness})`,
                      pointerEvents: 'none',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(7, 24, 56, 0.94) 0%, rgba(7, 24, 56, 0.2) 50%, transparent 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  <span
                    style={{
                      position: 'absolute',
                      top: isMobile ? '9px' : '12px',
                      left: isMobile ? '9px' : '12px',
                      fontSize: isMobile ? '8px' : '9.5px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      padding: isMobile ? '3px 8px' : '4px 10px',
                      borderRadius: '16px',
                      backgroundColor: '#E8F5FE',
                      color: '#0052FF',
                      border: '1px solid rgba(0, 82, 255, 0.16)',
                    }}
                  >
                    {card.tag}
                  </span>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: isMobile ? '12px' : '16px',
                      left: isMobile ? '11px' : '14px',
                      right: isMobile ? '11px' : '14px',
                      textAlign: 'left',
                      color: '#FFFFFF',
                    }}
                  >
                    <p
                      className="mb-1"
                      style={{
                        fontSize: isMobile ? '12px' : '13.5px',
                        fontWeight: '500',
                        letterSpacing: '0.2px',
                        lineHeight: 1.25,
                        textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {card.title}
                    </p>
                    <span
                      style={{
                        fontSize: isMobile ? '11.5px' : '13px',
                        fontWeight: '700',
                        color: '#00D4FF',
                        letterSpacing: '0.4px',
                      }}
                    >
                      {card.price}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ================= BOTTOM HINT ================= */}
      <div className="text-center">
        <span
          style={{
            fontSize: isMobile ? '9.5px' : '11px',
            letterSpacing: isMobile ? '1.5px' : '2.5px',
            textTransform: 'uppercase',
            color: '#6B82A0',
            fontWeight: 500,
          }}
        >
          Continuous Right-to-Left Ribbon • Drag or swipe horizontally
        </span>
      </div>
    </div>
  );
}