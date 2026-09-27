import React from "react";

// Curated Category Data with High-Quality Thumbnail Images
const MARQUEE_ITEMS = [
  {
    title: "SPORTSWEAR",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=120&q=80",
  },
  {
    title: "POLOS",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=120&q=80",
  },
  {
    title: "T-SHIRTS",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=120&q=80",
  },
  {
    title: "HOODIES",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=120&q=80",
  },
  {
    title: "UNIFORMS",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&q=80",
  },
  {
    title: "ACTIVEWEAR",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=120&q=80",
  },
  {
    title: "JOGGERS",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=120&q=80",
  },
  {
    title: "JACKETS",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=120&q=80",
  },
];

export default function BrandMarquee() {
  // Duplicating the list to create a seamless infinite loop
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee-wrapper position-relative overflow-hidden py-3">
      {/* Scoped CSS */}
      <style>{`
        .marquee-wrapper {
          background-color: #FFFFFF;
          border-top: 1px solid #E2E8F0;
          border-bottom: 1px solid #E2E8F0;
          box-shadow: 0 2px 10px rgba(8, 43, 115, 0.04);
        }

        /* Continuous Left to Right Scrolling Track */
        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: scrollLeftToRight 28s linear infinite;
        }

        /* Stop / Pause on Cursor Hover */
        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* Left-to-Right Animation */
        @keyframes scrollLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        /* Item Styling */
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 6px 18px;
          cursor: pointer;
          transition: transform 0.25s ease, color 0.25s ease;
          user-select: none;
        }

        .marquee-item:hover {
          transform: scale(1.06);
        }

        .marquee-item:hover .marquee-text {
          color: #1B5CE2;
        }

        .marquee-text {
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #334155;
          transition: color 0.25s ease;
          white-space: nowrap;
        }

        /* Thumbnail Image */
        .marquee-img {
          width: 34px;
          height: 34px;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid #5BA2FF;
          box-shadow: 0 2px 6px rgba(8, 43, 115, 0.15);
          transition: border-color 0.25s ease;
        }

        .marquee-item:hover .marquee-img {
          border-color: #082B73;
        }

        /* Blue Separator Dot */
        .marquee-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #1B5CE2;
          display: inline-block;
          margin-left: 14px;
          box-shadow: 0 0 8px rgba(27, 92, 226, 0.6);
        }

        /* Left & Right Subtle Fade Overlays */
        .fade-left, .fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .fade-left {
          left: 0;
          background: linear-gradient(90deg, #FFFFFF 20%, transparent 100%);
        }
        .fade-right {
          right: 0;
          background: linear-gradient(270deg, #FFFFFF 20%, transparent 100%);
        }
      `}</style>

      {/* Edge Fades for Smooth Appearance */}
      <div className="fade-left" />
      <div className="fade-right" />

      {/* Infinite Scrolling Track */}
      <div className="marquee-track">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="marquee-item">
            {/* Category Image Thumbnail */}
            <img
              src={item.image}
              alt={item.title}
              className="marquee-img"
              loading="lazy"
            />
            {/* Title */}
            <span className="marquee-text">{item.title}</span>
            {/* Blue Divider Dot */}
            <span className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}