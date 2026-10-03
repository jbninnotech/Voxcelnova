import React, { useState } from "react";
import {
  FaCheck,
  FaArrowRight,
  FaShieldAlt,
  FaTshirt,
  FaRulerCombined,
  FaIndustry,
  FaGem
} from "react-icons/fa";

// ========================================================
// 8 CORPORATE UNIFORM SAMPLES WITH CLOUDINARY IMAGES
// ========================================================
const CORPORATE_SAMPLES = [
  {
    id: 1,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790837149/11.jpg",
    category: "Executive Leadership",
    title: "Executive Structured Boardroom Blazer",
    fabric: "Poly-Viscose Wool-Touch with Stain-Shield",
    gsm: "260 GSM Premium Suiting",
    idealFor: "Boardroom, C-Suite, Banking & Legal Partners",
    features: [
      "Stain-resistant Teflon™ nano-barrier shield",
      "Hand-finished pick-stitched lapels & chest cresting",
      "Breathable jacquard anti-static inner silk lining"
    ],
    badge: "Stain-Shield",
    moq: "Min: 25 pcs"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790837149/5.jpg",
    category: "Formal Representation",
    title: "Executive Royal Giza Oxford Shirt",
    fabric: "100% Giza Long-Staple Cotton (80s Two-Ply)",
    gsm: "145 GSM Wrinkle-Resistant",
    idealFor: "C-Suite, Client Facing, Senior Associates",
    features: [
      "Tape-fused non-pucker collar & shoulder seams",
      "High-density left chest corporate embroidery",
      "Breathable natural cotton fiber for 12hr office wear"
    ],
    badge: "Anti-Wrinkle",
    moq: "Min: 30 pcs"
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790837149/11.jpg",
    category: "Formal Representation",
    title: "Navy Blue Tailored Corporate Suiting Set",
    fabric: "70% Viscose / 30% Polyester Fine Wool Feel",
    gsm: "250 GSM Crease-Free Drape",
    idealFor: "Corporate Administration, Front-Desk, Sales",
    features: [
      "Crease-recovery fabric maintains crisp contour all day",
      "Reinforced welt pocket designed for security ID cards",
      "Permanent press crease on matching trousers"
    ],
    badge: "Crease-Proof",
    moq: "Min: 20 sets"
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790837149/12.jpg",
    category: "Tech & Hybrid Office",
    title: "Performance Corporate Piqué Polo",
    fabric: "60% Combed Cotton / 40% Micro-Poly Dry-Breeze",
    gsm: "220 GSM Honeycomb Weave",
    idealFor: "Tech Startups, IT Teams, Creative Agencies",
    features: [
      "Anti-curling reinforced ribbed collar with tipping",
      "Underarm laser-cut ventilation eyelets",
      "Fade-proof reactive dyeing survives 100+ washes"
    ],
    badge: "Quick-Dry",
    moq: "Min: 40 pcs"
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790837149/10.jpg",
    category: "Daily Formal Bottoms",
    title: "Flat-Front Precision Corporate Trousers",
    fabric: "Poly-Viscose Stretch Twill (Crease Retentive)",
    gsm: "240 GSM Heavy-Duty",
    idealFor: "Executive Staff, Operations, Management",
    features: [
      "Hidden comfort-flex waistband for sitting comfort",
      "Double-stitched pocket corners & YKK auto-lock zip",
      "Permanent sharp front crease that stays after washing"
    ],
    badge: "Machine Washable",
    moq: "Min: 35 pcs"
  },
  {
    id: 6,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790837148/3.jpg",
    category: "Modern Smart-Casual",
    title: "Engineered Smart-Casual Chinos & Knit Set",
    fabric: "97% Combed Cotton / 3% Spandex Flex Twill",
    gsm: "250 GSM Enzyme Washed",
    idealFor: "Site Supervisors, Field Executives, Consultants",
    features: [
      "4-way active ergonomic stretch for mobile workdays",
      "Reinforced bar-tacking on stress pocket corners",
      "Soft peach-finish feel with high colorfastness"
    ],
    badge: "4-Way Flex",
    moq: "Min: 30 sets"
  },
  {
    id: 7,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790837148/4.jpg",
    category: "Corporate Outerwear",
    title: "Executive Softshell Bonded Weather Jacket",
    fabric: "3-Layer Micro-Fleece Weather-Shield Membrane",
    gsm: "300 GSM Water-Repellent",
    idealFor: "Corporate Commuters, Airport Staff, Winterwear",
    features: [
      "Thermal lock breathable wind-resistant membrane",
      "Concealed waterproof chest utility zipper pocket",
      "Wind-stopper internal storm cuffs & chin guard"
    ],
    badge: "Weather-Shield",
    moq: "Min: 25 pcs"
  },
  {
    id: 8,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790837148/1.jpg",
    category: "Formal & Ceremonial",
    title: "Executive Mandarin / Bandhgala Formal Blazer",
    fabric: "Fine Poly-Wool Suiting Blend with Satin Trims",
    gsm: "280 GSM Structured Weave",
    idealFor: "Corporate Galas, Annual Conferences, Delegations",
    features: [
      "Handcrafted rigid stand collar that never sags",
      "Embossed metal heraldic crest buttons",
      "Structured shoulder pads for an authoritative posture"
    ],
    badge: "Ceremonial Fit",
    moq: "Min: 20 pcs"
  }
];

export default function CorporateCatalogSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    "Executive Leadership",
    "Formal Representation",
    "Tech & Hybrid Office",
    "Daily Formal Bottoms",
    "Corporate Outerwear"
  ];

  const filteredSamples =
    activeFilter === "All"
      ? CORPORATE_SAMPLES
      : CORPORATE_SAMPLES.filter(
          (s) =>
            s.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
            s.title.toLowerCase().includes(activeFilter.toLowerCase())
        );

  // Smooth scroll down to your existing form/table
  const handleScrollDown = () => {
    const target =
      document.querySelector("form") ||
      document.querySelector("table") ||
      document.getElementById("customization-form") ||
      document.getElementById("corporate-quote-form") ||
      document.getElementById("quote-form");

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Smooth scroll down a little bit (~550px)
      window.scrollBy({ top: 550, behavior: "smooth" });
    }
  };

  return (
    <section className="corporate-samples-section">
      <style>{`
        /* ==========================================================
           COLOR PALETTE & INTERACTION TOKENS
        =========================================================== */
        :root {
          --bg-main:         #F4F8FE;
          --bg-surface:      #FFFFFF;
          --bg-badge-tint:   #E8F5FE;
          
          --color-cobalt:    #0052FF;
          --color-cobalt-hover: #003ECC;
          --color-cyan:      #00D4FF;
          
          --text-title:      #071838;
          --text-body:       #495E7C;
          --text-muted:      #6B82A0;

          --border-subtle:   rgba(0, 82, 255, 0.14);
          --border-hover:    rgba(0, 212, 255, 0.70);
          
          --shadow-card:     0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-hover:    0 20px 42px rgba(0, 82, 255, 0.14);
          --shadow-glow:     0 8px 25px rgba(0, 82, 255, 0.32);
        }

        .corporate-samples-section {
          background-color: var(--bg-main);
          padding: 85px 24px;
          border-top: 1.5px solid var(--border-subtle);
        }

        .section-inner {
          max-width: 1240px;
          margin: 0 auto;
        }

        /* 1. INTRO BLOCK */
        .intro-header-box {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 48px;
        }

        .category-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-badge-tint);
          color: var(--color-cobalt);
          border: 1px solid var(--border-subtle);
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .intro-title {
          font-size: clamp(2rem, 3.5vw, 2.7rem);
          font-weight: 800;
          color: var(--text-title);
          line-height: 1.2;
          margin-bottom: 16px;
          letter-spacing: -0.6px;
        }

        .intro-description {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-body);
          margin: 0 auto 32px;
        }

        /* 4 PILLARS */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 50px;
        }

        .pillar-card {
          background-color: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          border-radius: 16px;
          padding: 20px;
          box-shadow: var(--shadow-card);
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: all 0.28s ease;
        }

        .pillar-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-3px);
          box-shadow: var(--shadow-hover);
        }

        .pillar-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: var(--bg-badge-tint);
          color: var(--color-cobalt);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          flex-shrink: 0;
          border: 1px solid var(--border-subtle);
        }

        /* 2. FILTER BUTTONS */
        .catalog-filter-bar {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .filter-btn {
          background-color: var(--bg-surface);
          color: var(--text-body);
          border: 1.5px solid var(--border-subtle);
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.22s ease;
        }

        .filter-btn:hover {
          border-color: var(--color-cobalt);
          color: var(--color-cobalt);
          transform: translateY(-1px);
        }

        .filter-btn.active {
          background-color: var(--color-cobalt);
          color: #FFFFFF;
          border-color: var(--color-cobalt);
          box-shadow: var(--shadow-glow);
        }

        /* 3. SAMPLES GRID WITH HOVER EFFECTS */
        .samples-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .uniform-sample-card {
          background-color: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        /* Card Hover Lift & Glow Border */
        .uniform-sample-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover);
        }

        /* IMAGE CONTAINER WITH ADAPTIVE CROPPING */
        .card-image-box {
          position: relative;
          width: 100%;
          height: 270px; /* Increased height to frame full model torso & neckline */
          overflow: hidden;
          background-color: #E2E8F0;
        }

        .sample-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center; /* Centers face and collar cleanly without chopping */
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Smooth Image Zoom on Card Hover */
        .uniform-sample-card:hover .sample-image {
          transform: scale(1.08);
        }

        .floating-image-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(7, 24, 56, 0.82);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 11px;
          border-radius: 6px;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .floating-moq-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: #FFFFFF;
          color: var(--color-cobalt);
          font-size: 11px;
          font-weight: 800;
          padding: 5px 11px;
          border-radius: 6px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.12);
        }

        /* CARD BODY (UNDER MATTER) */
        .card-body-matter {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
        }

        .sample-category-tag {
          color: var(--color-cobalt);
          font-weight: 800;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 6px;
        }

        .sample-card-title {
          font-size: 16.5px;
          font-weight: 800;
          color: var(--text-title);
          margin: 0 0 12px;
          line-height: 1.35;
          min-height: 44px;
        }

        /* SPECS BLOCK */
        .sample-spec-block {
          background-color: var(--bg-main);
          border: 1px solid var(--border-subtle);
          padding: 12px 14px;
          border-radius: 12px;
          margin-bottom: 14px;
        }

        .spec-line {
          font-size: 12px;
          margin: 4px 0;
          color: var(--text-title);
        }

        .spec-line span {
          color: var(--text-muted);
          font-weight: 600;
        }

        /* FEATURES LIST */
        .sample-features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .sample-features-list li {
          font-size: 12px;
          color: var(--text-body);
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.4;
        }

        .check-bullet {
          color: var(--color-cobalt);
          font-size: 11px;
          flex-shrink: 0;
          margin-top: 3px;
        }

        /* INTERACTIVE BUTTON WITH HOVER ARROW SLIDE */
        .btn-card-quote {
          width: 100%;
          background-color: var(--bg-badge-tint);
          color: var(--color-cobalt);
          border: 1.5px solid var(--border-subtle);
          padding: 12px 16px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.22s ease;
          box-sizing: border-box;
        }

        .btn-card-quote:hover {
          background-color: var(--color-cobalt);
          color: #FFFFFF;
          border-color: var(--color-cobalt);
          box-shadow: var(--shadow-glow);
          transform: translateY(-2px);
        }

        .btn-card-quote svg {
          transition: transform 0.22s ease;
        }

        .btn-card-quote:hover svg {
          transform: translateX(4px);
        }
      `}</style>

      <div className="section-inner">
        {/* ========================================================
            PART 1: INTRO SECTION
        ========================================================= */}
        <div className="intro-header-box">
          <div className="category-chip">
            <FaIndustry /> Industrial Uniform Craftsmanship
          </div>

          <h2 className="intro-title">
            Tailored For Modern Boardrooms, Client Desks &amp; Field Executives
          </h2>

          <p className="intro-description">
            At <b>Voxcel Nova</b>, corporate uniform manufacturing goes beyond generic clothing. We engineer 
            custom workplace apparel built with crease-retentive Giza cotton blends, anti-pilling poly-viscose, 
            and Japanese multi-head embroidery. Each uniform is individually bagged, department-coded, and 
            scaled to preserve your company’s brand prestige across every department.
          </p>
        </div>

        {/* 4 MANUFACTURING PILLARS */}
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon"><FaGem /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "var(--text-title)" }}>
                OEKO-TEX® Certified
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                Zero harmful chemicals, color-fast reactive dyeing, skin-friendly daily wear.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon"><FaRulerCombined /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "var(--text-title)" }}>
                99.8% Size Accuracy
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                Pre-shrunk sanforized fabrics prevent post-wash shrinkage and size alteration.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon"><FaShieldAlt /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "var(--text-title)" }}>
                Tajima Precision Crests
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                High-density multi-colored embroidery that never loosens, fades, or frays.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon"><FaTshirt /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "var(--text-title)" }}>
                Pre-Production Swatches
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                Physical sample pieces sent for management inspection before bulk cutting.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 2: CATEGORY FILTERS
        ========================================================= */}
        <div className="catalog-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ========================================================
            PART 3: 8 SAMPLES WITH HOVER EFFECTS & PHOTO FRAMING
        ========================================================= */}
        <div className="samples-card-grid">
          {filteredSamples.map((item) => (
            <div key={item.id} className="uniform-sample-card">
              
              {/* IMAGE HEADER WITH ADJUSTED FRAMING */}
              <div className="card-image-box">
                <img
                  src={item.image}
                  alt={item.title}
                  className="sample-image"
                />
                <span className="floating-image-badge">{item.badge}</span>
                <span className="floating-moq-badge">{item.moq}</span>
              </div>

              {/* MATTER UNDER IMAGE */}
              <div className="card-body-matter">
                <div>
                  <span className="sample-category-tag">{item.category}</span>
                  <h4 className="sample-card-title">{item.title}</h4>

                  {/* FABRIC SPECS */}
                  <div className="sample-spec-block">
                    <div className="spec-line">
                      <span>Fabric:</span> {item.fabric}
                    </div>
                    <div className="spec-line">
                      <span>Weight:</span> <b>{item.gsm}</b>
                    </div>
                    <div className="spec-line">
                      <span>Ideal For:</span> {item.idealFor}
                    </div>
                  </div>

                  {/* FEATURES BULLETS */}
                  <ul className="sample-features-list">
                    {item.features.map((feat, idx) => (
                      <li key={idx}>
                        <FaCheck className="check-bullet" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CLICK TO SCROLL DOWN TO FORM */}
                <button
                  type="button"
                  onClick={handleScrollDown}
                  className="btn-card-quote"
                >
                  Configure Bulk Specs <FaArrowRight size={11} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* ========================================================
            BOTTOM BANNER WITH SCROLL TRIGGER
        ========================================================= */}
        <div
          style={{
            marginTop: "60px",
            background: "var(--bg-surface)",
            border: "1.5px solid var(--border-subtle)",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px"
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: 800, color: "var(--text-title)" }}>
              Need Custom Fabric Blends or Large Enterprise Tenders?
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--text-body)" }}>
              We formulate bespoke pantone dye-batches, anti-static weaves, and flame-retardant safety shirts.
            </p>
          </div>
          <button
            type="button"
            onClick={handleScrollDown}
            style={{
              background: "var(--color-cobalt)",
              color: "#FFFFFF",
              border: "none",
              padding: "13px 26px",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "var(--shadow-glow)",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              transition: "all 0.22s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Start Factory Order <FaArrowRight size={12} />
          </button>
        </div>

      </div>
    </section>
  );
}