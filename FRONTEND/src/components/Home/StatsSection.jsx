import React, { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Single Stat Box Component
const StatCard = ({ endValue, suffix = "", label, shouldAnimate }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animRef = useRef(null);

  // Smooth easing animation using requestAnimationFrame
  const animateCount = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const duration = 1600; // ms
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic ease-out curve for premium fluid feel
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * endValue));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        setCount(endValue);
      }
    };

    animRef.current = requestAnimationFrame(frame);
  }, [endValue]);

  // Trigger whenever parent scrolls into view
  useEffect(() => {
    if (shouldAnimate) {
      animateCount();
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [shouldAnimate, animateCount]);

  return (
    <div
      className={`vx-stat-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => {
        setIsHovered(true);
        animateCount(); // Re-trigger on desktop hover
      }}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => {
        setIsHovered(true);
        animateCount(); // Support tap on touchscreens
      }}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="vx-stat-number">
        {count}
        <span className="vx-stat-suffix">{suffix}</span>
      </div>
      <div className="vx-stat-label">{label}</div>
    </div>
  );
};

// Main Section Component
export default function StatsSection() {
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const sectionRef = useRef(null);

  const statsData = [
    { id: 1, endValue: 12, suffix: "+", label: "Years of manufacturing" },
    { id: 2, endValue: 50, suffix: "K+", label: "Pieces per month" },
    { id: 3, endValue: 120, suffix: "+", label: "Brands served" },
    { id: 4, endValue: 18, suffix: "", label: "Countries shipped" },
  ];

  // Trigger counter as soon as section appears on screen (Solves mobile counting problem)
  useEffect(() => {
    const currentElem = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect(); // Fire once smoothly
        }
      },
      { threshold: 0.25 }
    );

    if (currentElem) observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  return (
    <>
      <style>{`
        /* ==========================================
           COLOR PROFILE (CLEAN LIGHT THEME)
        ========================================== */
        :root {
          --bg-main:         #F4F8FE; /* Ice porcelain canvas */
          --bg-surface:      #FFFFFF; /* Pure white card */
          --bg-badge-tint:   #E8F5FE; /* Soft light-cyan badge */
          --color-cobalt:    #0052FF; /* Primary Cobalt */
          --color-cyan:      #00D4FF; /* Electric Cyan */
          --text-title:      #071838; /* Crisp dark navy */
          --text-body:       #495E7C; /* Soft slate body */
          --text-muted:      #6B82A0; /* Muted label */
          --border-subtle:   rgba(0, 82, 255, 0.12);
          --border-hover:    rgba(0, 212, 255, 0.65);
          --shadow-card:     0 10px 25px rgba(0, 48, 143, 0.05);
          --shadow-glow:     0 8px 24px rgba(0, 82, 255, 0.22);
        }

        .vx-stats-root {
          background-color: var(--bg-main);
          padding: clamp(40px, 6vw, 72px) 0;
          position: relative;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .vx-stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: clamp(20px, 3.5vw, 32px) clamp(14px, 2vw, 20px);
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: var(--shadow-card);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.3s ease, 
                      box-shadow 0.3s ease,
                      background-color 0.3s ease;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        /* Top Cyan Glow Accent Line */
        .vx-stat-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-cyan));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .vx-stat-card.hovered,
        .vx-stat-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-hover);
          background-color: var(--bg-surface);
          box-shadow: var(--shadow-glow), 0 12px 30px rgba(0, 48, 143, 0.08);
        }

        .vx-stat-card.hovered::before,
        .vx-stat-card:hover::before {
          opacity: 1;
        }

        .vx-stat-number {
          color: var(--color-cobalt);
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 8px;
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
          display: flex;
          align-items: baseline;
          justify-content: center;
        }

        .vx-stat-suffix {
          color: var(--color-cyan);
          font-size: 0.85em;
          margin-left: 2px;
        }

        .vx-stat-label {
          color: var(--text-body);
          font-size: clamp(0.8rem, 1.2vw, 0.95rem);
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: 0.2px;
        }

        @media (max-width: 576px) {
          .vx-stat-card {
            border-radius: 12px;
            padding: 18px 10px;
          }
        }
      `}</style>

      <section ref={sectionRef} className="vx-stats-root">
        <div className="container">
          <div className="row g-3 g-md-4 justify-content-center align-items-center">
            {statsData.map((stat) => (
              /* Uses col-6 on mobile for a clean 2x2 grid instead of tall stacked cards */
              <div key={stat.id} className="col-6 col-md-3">
                <StatCard
                  endValue={stat.endValue}
                  suffix={stat.suffix}
                  label={stat.label}
                  shouldAnimate={hasEnteredView}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}