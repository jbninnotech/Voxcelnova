import React, { useState } from "react";
import { Link } from "react-router-dom";
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
// 8 CORPORATE UNIFORM SAMPLES WITH REALISTIC IMAGERY
// ========================================================
const CORPORATE_SAMPLES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80",
    category: "Executive Leadership",
    title: "Executive Royal Oxford Shirt",
    fabric: "100% Giza Combed Cotton (80s Two-Ply)",
    gsm: "145 GSM Wrinkle-Resistant",
    idealFor: "Boardroom, C-Suite, Banking Executives",
    features: ["Tape-fused non-pucker seams", "High-density left chest crest", "Breathable natural weave"],
    badge: "Anti-Wrinkle Finish",
    moq: "Min: 30 pcs"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80",
    category: "Formal Representation",
    title: "Poly-Viscose Tailored Corporate Blazer",
    fabric: "70% Viscose / 30% Polyester Fine Wool Feel",
    gsm: "260 GSM Premium Structured",
    idealFor: "Client Facing, Legal, Hospitality Management",
    features: ["Stain-resistant teflon shield", "Custom-engraved horn buttons", "Branded jacquard inner lining"],
    badge: "Crease-Proof",
    moq: "Min: 25 pcs"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=700&q=80",
    category: "Tech & Hybrid Office",
    title: "Performance Corporate Piqué Polo",
    fabric: "60% Cotton / 40% Micro-Poly Dry-Breeze",
    gsm: "220 GSM Honeycomb Weave",
    idealFor: "Tech Startups, IT Staff, Casual Business",
    features: ["Anti-curling rib collar", "Underarm ventilation eyelets", "Fade-proof reactive dyeing"],
    badge: "Quick-Dry",
    moq: "Min: 50 pcs"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=80",
    category: "Daily Formal Bottoms",
    title: "Flat-Front Precision Trousers",
    fabric: "Poly-Viscose Stretch Twill (Crease Retentive)",
    gsm: "240 GSM Heavy-Duty",
    idealFor: "Corporate Administration, Front-Desk, Sales",
    features: ["Hidden stretch comfort waistband", "Double-stitched pocket corners", "Permanent front crease"],
    badge: "Machine Washable",
    moq: "Min: 40 pcs"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80",
    category: "Modern Smart-Casual",
    title: "Engineered Stretch Cotton Chinos",
    fabric: "97% Combed Cotton / 3% Spandex Twill",
    gsm: "250 GSM Enzyme Washed",
    idealFor: "Creative Agencies, Field Engineers, Site Managers",
    features: ["4-way ergonomic flex", "YKK antique brass auto-lock zippers", "Reinforced bar-tacking"],
    badge: "Flexible Movement",
    moq: "Min: 40 pcs"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=700&q=80",
    category: "Corporate Outerwear",
    title: "Executive Softshell Bonded Jacket",
    fabric: "3-Layer Micro-Fleece Weather-Shield",
    gsm: "300 GSM Water-Repellent",
    idealFor: "Corporate Winterwear, Aviation, Commuters",
    features: ["Thermal lock breathable membrane", "Laser-cut chest utility pocket", "Wind-stopper storm cuffs"],
    badge: "Weather-Shield",
    moq: "Min: 30 pcs"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
    category: "Front-Office & Reception",
    title: "Corporate Pencil Skirt & Formal Blouse",
    fabric: "Milano Stretch Poly-Spun with Chiffon Blend",
    gsm: "210 GSM Elegance Drape",
    idealFor: "Airline Ground Staff, Luxury Hotel Concierge",
    features: ["Non-transparent modesty inner lining", "Back kick-pleat for natural walking", "Anti-static treatment"],
    badge: "Ultra Comfort",
    moq: "Min: 25 pcs"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80",
    category: "Cultural & Ceremonial",
    title: "Executive Bandhgala / Mandarin Suit",
    fabric: "Fine Poly-Wool Suiting Blend with Satin Trims",
    gsm: "280 GSM Formal Structured",
    idealFor: "Corporate Banquets, Annual Galas, High Delegations",
    features: ["Rigid handcrafted band collar", "Gold-tone crest metal buttons", "Shoulder pad silhouette retention"],
    badge: "Handcrafted Fit",
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

  return (
    <section className="corporate-samples-section">
      <style>{`
        /* ==========================================================
           CLEAN LIGHT THEME COLOR PROFILE
        =========================================================== */
        :root {
          --bg-main:         #F4F8FE; /* Ultra-clean ice porcelain canvas */
          --bg-surface:      #FFFFFF; /* Pure white card surface */
          --bg-badge-tint:   #E8F5FE; /* Soft light-cyan badge & chip background */
          
          --color-cobalt:    #0052FF; /* Primary buttons, links, active icons */
          --color-cobalt-hover: #003ECC; /* Darker cobalt for hover states */
          --color-cyan:      #00D4FF; /* Swoosh highlights, secondary icons, glows */
          
          --text-title:      #071838; /* Crisp, high-contrast dark navy for headings */
          --text-body:       #495E7C; /* Soft slate navy for paragraphs */
          --text-muted:      #6B82A0; /* Light slate for captions and small labels */

          --border-subtle:   rgba(0, 82, 255, 0.14);  /* Clean card borders */
          --border-hover:    rgba(0, 212, 255, 0.60); /* Cyan glowing border on hover */
          
          --shadow-card:     0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow:     0 8px 25px rgba(0, 82, 255, 0.32);
        }

        .corporate-samples-section {
          background-color: var(--bg-main);
          padding: 80px 24px;
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
          transition: border-color 0.25s ease;
        }

        .pillar-card:hover {
          border-color: var(--border-hover);
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
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          border-color: var(--color-cobalt);
          color: var(--color-cobalt);
        }

        .filter-btn.active {
          background-color: var(--color-cobalt);
          color: #FFFFFF;
          border-color: var(--color-cobalt);
          box-shadow: var(--shadow-glow);
        }

        /* 3. SAMPLES GRID WITH IMAGES */
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
          transition: all 0.25s ease;
        }

        .uniform-sample-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
        }

        /* IMAGE CONTAINER */
        .card-image-box {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background-color: #E2E8F0;
        }

        .sample-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .uniform-sample-card:hover .sample-image {
          transform: scale(1.06);
        }

        .floating-image-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(7, 24, 56, 0.75);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }

        .floating-moq-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: #FFFFFF;
          color: var(--color-cobalt);
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
          font-size: 17px;
          font-weight: 800;
          color: var(--text-title);
          margin: 0 0 12px;
          line-height: 1.3;
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
          gap: 6px;
        }

        .sample-features-list li {
          font-size: 12px;
          color: var(--text-body);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .check-bullet {
          color: var(--color-cobalt);
          font-size: 11px;
          flex-shrink: 0;
        }

        /* BUTTON */
        .btn-card-quote {
          width: 100%;
          background-color: var(--bg-badge-tint);
          color: var(--color-cobalt);
          border: 1.5px solid var(--border-subtle);
          padding: 11px 16px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13px;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .btn-card-quote:hover {
          background-color: var(--color-cobalt);
          color: #FFFFFF;
          border-color: var(--color-cobalt);
          box-shadow: var(--shadow-glow);
        }
      `}</style>

      <div className="section-inner">
        {/* ========================================================
            PART 1: INTRO ABOUT VOXCEL NOVA
        ========================================================= */}
        <div className="intro-header-box">
          <div className="category-chip">
            <FaIndustry /> Industrial Uniform Craftsmanship
          </div>

          <h2 className="intro-title">
            Tailored For Modern Boardrooms, Client Desks & Field Executives
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
            PART 3: 8 CARDS WITH IMAGES & UNDER MATTER
        ========================================================= */}
        <div className="samples-card-grid">
          {filteredSamples.map((item) => (
            <div key={item.id} className="uniform-sample-card">
              
              {/* IMAGE HEADER */}
              <div className="card-image-box">
                <img src={item.image} alt={item.title} className="sample-image" />
                <span className="floating-image-badge">{item.badge}</span>
                <span className="floating-moq-badge">{item.moq}</span>
              </div>

              {/* MATTER UNDER THE IMAGE */}
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

                {/* BOTTOM BUTTON */}
                <Link to="/customization" className="btn-card-quote">
                  Configure Bulk Specs <FaArrowRight size={11} />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* ========================================================
            BOTTOM BANNER
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
          <Link
            to="/customization"
            style={{
              background: "var(--color-cobalt)",
              color: "#FFFFFF",
              padding: "13px 26px",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
              boxShadow: "var(--shadow-glow)",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px"
            }}
          >
            Start Factory Order <FaArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
}