import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

// 1. Background image
import fashionBg from '../../assets/banner1.png';

// 2. Foreground scrolling figurine images
import image1 from '../../assets/images/image.png';
import image2 from '../../assets/images/image1.png';
import image3 from '../../assets/images/image2.png';
import image4 from '../../assets/images/image3.png';
import image5 from '../../assets/images/image4.png';
import image6 from '../../assets/images/image5.png';
import image7 from '../../assets/images/image5.png';
import image8 from '../../assets/images/image7.png';

const IMAGES = [
  {
    name: 'Blaze Fox',
    title: 'BLAZE',
    src: image1,
    desc: 'Unleash vivid spirit figurines crafted with precision engineering and vibrant palettes.',
  },
  {
    name: 'Flora Dino',
    title: 'FLORA',
    src: image2,
    desc: 'Breathe tranquility into your collection with organic pastel sculpted collectibles.',
  },
  {
    name: 'Candy Bunny',
    title: 'CANDY',
    src: image3,
    desc: 'Whimsical curves combined with high-gloss resin casting for next-gen display pieces.',
  },
  {
    name: 'Aero Boy',
    title: 'VOXEL',
    src: image4,
    desc: 'Futuristic dynamic poses and aerodynamic silhouette modeling tailored for modern spaces.',
  },
  {
    name: 'Mecha Pulse',
    title: 'PULSE',
    src: image5,
    desc: 'Cutting-edge cyberpunk armor detailing combined with striking illuminated accents.',
  },
  {
    name: 'Shadow Phantom',
    title: 'SHADOW',
    src: image6,
    desc: 'Mystic aesthetic figurines featuring matte obsidian textures and smoked gradients.',
  },
  {
    name: 'Solar Knight',
    title: 'SOLAR',
    src: image7,
    desc: 'Gleaming golden hues forged to bring radiant character warmth to your desk setup.',
  },
  {
    name: 'Cosmo Spark',
    title: 'COSMO',
    src: image8,
    desc: 'Galactic celestial editions sculpted with translucent resin and starry micro-glitter.',
  },
];

const SLIDE_INTERVAL = 2200;
const TRANSITION_DURATION = 520;

export default function ToonhubHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  // Gesture tracking refs
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const touchEndXRef = useRef(null);
  const isHorizontalGesture = useRef(false);

  const heroRef = useRef(null);
  const timerRef = useRef(null);

  const isSmallMobile = windowWidth < 480;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload assets
  useEffect(() => {
    [fashionBg, image1, image2, image3, image4, image5, image6, image7, image8].forEach((srcItem) => {
      const img = new Image();
      img.src = typeof srcItem === 'string' ? srcItem : srcItem?.src || '';
    });
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, SLIDE_INTERVAL);
  }, [nextSlide]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  // Touch Handling: allows vertical scrolling to the next section
  const onTouchStart = (e) => {
    clearInterval(timerRef.current);
    const touch = e.touches ? e.touches[0] : e;
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchEndXRef.current = null;
    isHorizontalGesture.current = false;
  };

  const onTouchMove = (e) => {
    if (!touchStartXRef.current || !touchStartYRef.current) return;
    const touch = e.touches ? e.touches[0] : e;
    const diffX = touch.clientX - touchStartXRef.current;
    const diffY = touch.clientY - touchStartYRef.current;

    if (!isHorizontalGesture.current) {
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 8) {
        return; // Allow page to scroll to next section
      }
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
        isHorizontalGesture.current = true;
      }
    }

    if (isHorizontalGesture.current) {
      touchEndXRef.current = touch.clientX;
    }
  };

  const onTouchEnd = () => {
    if (isHorizontalGesture.current && touchStartXRef.current && touchEndXRef.current) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      if (distance > 40) {
        nextSlide();
      } else if (distance < -40) {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchEndXRef.current = null;
    isHorizontalGesture.current = false;
    startTimer();
  };

  const handleScrollDown = () => {
    if (heroRef.current) {
      const nextSectionPos = heroRef.current.offsetTop + heroRef.current.offsetHeight;
      window.scrollTo({
        top: nextSectionPos,
        behavior: 'smooth',
      });
    }
  };

  const getRole = useCallback(
    (index) => {
      const len = IMAGES.length;
      if (index === activeIndex) return 'center';
      if (index === (activeIndex - 1 + len) % len) return 'left';
      if (index === (activeIndex + 1) % len) return 'right';
      return 'back';
    },
    [activeIndex]
  );

  // Responsive Figurine Layouts (lifted up to ensure scroll arrow is clearly seen)
  const getRoleStyles = useCallback(
    (role) => {
      if (isSmallMobile) {
        switch (role) {
          case 'center':
            return {
              transform: 'translateX(-50%) scale(1)',
              filter: 'blur(0px) drop-shadow(0 14px 24px rgba(0,0,0,0.65))',
              opacity: 1,
              zIndex: 20,
              left: '50%',
              height: '44vh',
              bottom: '22vh',
            };
          case 'left':
            return {
              transform: 'translateX(-50%) scale(0.66)',
              filter: 'blur(3px) brightness(0.6)',
              opacity: 0.25,
              zIndex: 10,
              left: '4%',
              height: '32vh',
              bottom: '26vh',
            };
          case 'right':
            return {
              transform: 'translateX(-50%) scale(0.66)',
              filter: 'blur(3px) brightness(0.6)',
              opacity: 0.25,
              zIndex: 10,
              left: '96%',
              height: '32vh',
              bottom: '26vh',
            };
          default:
            return {
              transform: 'translateX(-50%) scale(0.48)',
              filter: 'blur(8px)',
              opacity: 0,
              zIndex: 5,
              left: '50%',
              height: '26vh',
              bottom: '28vh',
            };
        }
      }

      if (isMobile) {
        switch (role) {
          case 'center':
            return {
              transform: 'translateX(-50%) scale(1.05)',
              filter: 'blur(0px) drop-shadow(0 16px 28px rgba(0,0,0,0.65))',
              opacity: 1,
              zIndex: 20,
              left: '50%',
              height: '47vh',
              bottom: '20vh',
            };
          case 'left':
            return {
              transform: 'translateX(-50%) scale(0.72)',
              filter: 'blur(4px) brightness(0.6)',
              opacity: 0.35,
              zIndex: 10,
              left: '7%',
              height: '35vh',
              bottom: '24vh',
            };
          case 'right':
            return {
              transform: 'translateX(-50%) scale(0.72)',
              filter: 'blur(4px) brightness(0.6)',
              opacity: 0.35,
              zIndex: 10,
              left: '93%',
              height: '35vh',
              bottom: '24vh',
            };
          default:
            return {
              transform: 'translateX(-50%) scale(0.55)',
              filter: 'blur(8px)',
              opacity: 0,
              zIndex: 5,
              left: '50%',
              height: '30vh',
              bottom: '26vh',
            };
        }
      }

      if (isTablet) {
        switch (role) {
          case 'center':
            return {
              transform: 'translateX(-50%) scale(1.12)',
              filter: 'blur(0px) drop-shadow(0 25px 35px rgba(0,0,0,0.6))',
              opacity: 1,
              zIndex: 20,
              left: '50%',
              height: '58vh',
              bottom: '10vh',
            };
          case 'left':
            return {
              transform: 'translateX(-50%) scale(0.82)',
              filter: 'blur(3px) brightness(0.7)',
              opacity: 0.6,
              zIndex: 10,
              left: '18%',
              height: '44vh',
              bottom: '14vh',
            };
          case 'right':
            return {
              transform: 'translateX(-50%) scale(0.82)',
              filter: 'blur(3px) brightness(0.7)',
              opacity: 0.6,
              zIndex: 10,
              left: '82%',
              height: '44vh',
              bottom: '14vh',
            };
          default:
            return {
              transform: 'translateX(-50%) scale(0.6)',
              filter: 'blur(6px) brightness(0.5)',
              opacity: 0,
              zIndex: 5,
              left: '50%',
              height: '34vh',
              bottom: '16vh',
            };
        }
      }

      // Desktop
      switch (role) {
        case 'center':
          return {
            transform: 'translateX(-50%) scale(1.2)',
            filter: 'blur(0px) drop-shadow(0 25px 40px rgba(0,0,0,0.55))',
            opacity: 1,
            zIndex: 20,
            left: '50%',
            height: '68vh',
            bottom: '4vh',
          };
        case 'left':
          return {
            transform: 'translateX(-50%) scale(0.85)',
            filter: 'blur(3px) brightness(0.7)',
            opacity: 0.65,
            zIndex: 10,
            left: '24%',
            height: '46vh',
            bottom: '10vh',
          };
        case 'right':
          return {
            transform: 'translateX(-50%) scale(0.85)',
            filter: 'blur(3px) brightness(0.7)',
            opacity: 0.65,
            zIndex: 10,
            left: '76%',
            height: '46vh',
            bottom: '10vh',
          };
        default:
          return {
            transform: 'translateX(-50%) scale(0.65)',
            filter: 'blur(6px) brightness(0.5)',
            opacity: 0,
            zIndex: 5,
            left: '50%',
            height: '36vh',
            bottom: '12vh',
          };
      }
    },
    [isSmallMobile, isMobile, isTablet]
  );

  const grainUri = useMemo(() => {
    const svgString = `<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)' opacity='0.08'/></svg>`;
    return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}")`;
  }, []);

  const activeItem = IMAGES[activeIndex];
  const bgImgSrc = typeof fashionBg === 'string' ? fashionBg : fashionBg?.src;

  return (
    <section
      ref={heroRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onTouchStart}
      onMouseMove={touchStartXRef.current !== null ? onTouchMove : undefined}
      onMouseUp={onTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        // Fits under the ~64px navbar, allowing the next section to peek through
        height: isMobile ? 'calc(88svh - 65px)' : 'calc(100vh - 72px)',
        minHeight: isMobile ? '520px' : '650px',
        overflow: 'hidden',
        userSelect: 'none',
        backgroundColor: '#0a0c0e',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes bgTextGlide {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          30%, 85% {
            opacity: 0.85;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-12px) scale(1.02);
          }
        }

        @keyframes fillProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes fadeInDetails {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes subtleBounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(4px); }
          60% { transform: translateY(2px); }
        }

        .animated-bg-title {
          animation: bgTextGlide ${SLIDE_INTERVAL}ms cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        .animated-desc {
          animation: fadeInDetails 350ms ease-out forwards;
        }

        .scroll-down-btn {
          animation: subtleBounce 2s infinite ease-in-out;
        }
      `}</style>

      {/* 1. Main Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgImgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
        }}
      />

      {/* 2. Responsive Gradients */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isMobile
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.95) 86%)'
            : 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* 3. Film Grain Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 3,
          backgroundImage: grainUri,
          backgroundSize: '180px 180px',
        }}
      />

      {/* 4. Giant Animated Headline Backdrop */}
      <div
        key={activeItem.title}
        className="animated-bg-title"
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          top: isSmallMobile ? '6%' : isMobile ? '7%' : '7%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 4,
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(68px, 20vw, 320px)',
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.70)',
          textShadow: '0 8px 30px rgba(0,0,0,0.5)',
          lineHeight: 0.8,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          willChange: 'transform, opacity',
        }}
      >
        {activeItem.title}
      </div>

      {/* 5. Center Interactive Figurine Carousel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        {IMAGES.map((item, index) => {
          const role = getRole(index);
          const roleStyle = getRoleStyles(role);

          return (
            <div
              key={item.name}
              style={{
                position: 'absolute',
                aspectRatio: '0.62 / 1',
                ...roleStyle,
                transition:
                  `transform ${TRANSITION_DURATION}ms cubic-bezier(0.18, 0.9, 0.3, 1), ` +
                  `filter ${TRANSITION_DURATION}ms cubic-bezier(0.18, 0.9, 0.3, 1), ` +
                  `opacity ${TRANSITION_DURATION}ms cubic-bezier(0.18, 0.9, 0.3, 1), ` +
                  `left ${TRANSITION_DURATION}ms cubic-bezier(0.18, 0.9, 0.3, 1), ` +
                  `height ${TRANSITION_DURATION}ms cubic-bezier(0.18, 0.9, 0.3, 1), ` +
                  `bottom ${TRANSITION_DURATION}ms cubic-bezier(0.18, 0.9, 0.3, 1)`,
                willChange: 'transform, filter, opacity, left, bottom',
              }}
            >
              <img
                src={typeof item.src === 'string' ? item.src : item.src?.src}
                alt={item.name}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 6. CLEARLY VISIBLE SCROLL DOWN BUTTON (Elevated & High Contrast) */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? '12px' : '22px', // Lifted above the screen bottom
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50, // Placed on top of background & bottom gradient
          pointerEvents: 'auto',
        }}
      >
        <button
          type="button"
          onClick={handleScrollDown}
          className="scroll-down-btn"
          style={{
            background: isMobile ? 'rgba(0, 0, 0, 0.45)' : 'none',
            border: isMobile ? '1px solid rgba(255, 255, 255, 0.22)' : 'none',
            borderRadius: '20px',
            backdropFilter: isMobile ? 'blur(6px)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1px',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: isMobile ? '4px 14px' : '6px',
            outline: 'none',
            boxShadow: isMobile ? '0 4px 12px rgba(0,0,0,0.5)' : 'none',
          }}
          aria-label="Scroll Down to next section"
        >
          <span
            style={{
              fontSize: '9.5px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              opacity: 0.95,
              textShadow: '0 2px 6px rgba(0,0,0,0.9)',
            }}
          >
            Scroll
          </span>
          <ChevronDown
            size={18}
            strokeWidth={2.8}
            style={{
              color: '#FFFFFF',
              opacity: 1,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))',
            }}
          />
        </button>
      </div>

      {/* 7. Bottom Content & Info Section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: isSmallMobile
            ? '12px 16px 42px 16px' // Leaves clear vertical room for the scroll button
            : isMobile
            ? '14px 20px 44px 20px'
            : isTablet
            ? '28px 36px 32px 36px'
            : '36px 48px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'flex-end',
          gap: isSmallMobile ? '8px' : isMobile ? '10px' : '0px',
          zIndex: 40,
          background: isMobile
            ? 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.7) 65%, transparent 100%)'
            : 'none',
        }}
      >
        {/* Left Side: Progress & Info */}
        <div style={{ maxWidth: isMobile ? '100%' : '380px' }}>
          <div
            style={{
              width: isSmallMobile ? '110px' : isMobile ? '140px' : '180px',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: isSmallMobile ? '5px' : '8px',
            }}
          >
            <div
              key={activeIndex}
              style={{
                height: '100%',
                backgroundColor: '#FFFFFF',
                animation: `fillProgress ${SLIDE_INTERVAL}ms linear infinite`,
              }}
            />
          </div>

          <div key={activeIndex} className="animated-desc">
            <h2
              style={{
                margin: '0 0 2px 0',
                fontSize: isSmallMobile ? '16px' : isMobile ? '19px' : '24px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              }}
            >
              {activeItem.name}
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: isSmallMobile ? '11px' : isMobile ? '12px' : '14px',
                lineHeight: 1.35,
                color: 'rgba(255, 255, 255, 0.82)',
                fontWeight: 400,
                textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                display: '-webkit-box',
                WebkitLineClamp: isSmallMobile ? 2 : 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {activeItem.desc}
            </p>
          </div>
        </div>

        {/* Right Side: CTA Button (with right-side clearance for WhatsApp widget) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // Adds right padding on mobile so floating WhatsApp icon does not cover EXPLORE
            paddingRight: isMobile ? '55px' : '0px',
          }}
        >
          <a
            href="#explore"
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: isSmallMobile ? '6px' : '8px',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontFamily: "'Anton', sans-serif",
              fontSize: isSmallMobile ? '20px' : isMobile ? '23px' : 'clamp(24px, 3vw, 42px)',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              opacity: isLinkHovered ? 1 : 0.9,
              textShadow: '0 4px 14px rgba(0,0,0,0.8)',
              transition: 'opacity 200ms ease',
            }}
          >
            <span>EXPLORE</span>
            <ArrowRight
              size={isSmallMobile ? 18 : isMobile ? 21 : 28}
              strokeWidth={2.5}
              style={{
                transform: isLinkHovered ? 'translateX(5px)' : 'translateX(0px)',
                transition: 'transform 200ms ease',
              }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}