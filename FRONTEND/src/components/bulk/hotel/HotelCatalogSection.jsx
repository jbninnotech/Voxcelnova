import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaArrowRight,
  FaShieldAlt,
  FaConciergeBell,
  FaUtensils,
  FaBed,
  FaGem,
  FaTshirt,
  FaWineGlassAlt,
  FaSpa,
  FaCocktail,
  FaTools
} from "react-icons/fa";

// ========================================================
// 8 HOSPITALITY UNIFORM SAMPLES WITH IMAGES & TECHNICAL SPECS
// ========================================================
const HOTEL_SAMPLES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
    category: "Culinary & Kitchen",
    title: "Executive Master Chef Jacket",
    fabric: "65% Poly / 35% Combed Cotton Heat-Deflect Twill",
    gsm: "220 GSM Breathable Twill",
    idealFor: "Executive Chefs, Sous Chefs & Pastry Masters",
    features: [
      "Underarm Cool-Vent™ micro-mesh airflow panels",
      "Cloth-knot buttons resistant to high kitchen oven heat",
      "Dual sleeve pocket for tasting spoons & thermometers"
    ],
    badge: "Heat-Deflective",
    moq: "Min: 25 pcs"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    category: "Front Desk & Concierge",
    title: "5-Star Front-Office Tailored Blazer",
    fabric: "Poly-Viscose Wool-Touch with Stain-Shield",
    gsm: "260 GSM Structured Suiting",
    idealFor: "Hotel Receptionists, Concierge, Guest Relations",
    features: [
      "Stain-resistant Teflon nano-shield coating",
      "Branded gold/silver bullion crest left chest cresting",
      "Internal pocket tailored for hotel master keycards"
    ],
    badge: "Stain-Resistant",
    moq: "Min: 20 pcs"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    category: "F&B & Banquet Service",
    title: "Formal Banquet Vest & Wing-Collar Shirt",
    fabric: "Micro-Poly Matte Twill with Stretch Poplin Shirt",
    gsm: "200 GSM Crease-Free Drape",
    idealFor: "Fine Dining Stewards, Sommeliers, Banquet Staff",
    features: [
      "Anti-wrinkle stretch shirt allows tray balancing",
      "Adjustable back buckle for precision waist silhouette",
      "Reinforced pocket welt designed for corkscrews"
    ],
    badge: "Spill-Repellent",
    moq: "Min: 35 pcs"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    category: "Housekeeping & Facilities",
    title: "Ergonomic Housekeeping Tunic & Pant Set",
    fabric: "Durable Stretch Poly-Cotton Twill Weave",
    gsm: "210 GSM Tear-Proof",
    idealFor: "Room Attendants, Turn-Down Staff, Environmental Services",
    features: [
      "Bi-stretch back pleats for bending and bed-making comfort",
      "Double-layered deep pockets for master keys & amenities",
      "Vat-dyed to endure 100+ commercial wash cycles"
    ],
    badge: "Flex-Stretch Weave",
    moq: "Min: 40 sets"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    category: "Spa & Wellness Resorts",
    title: "Zen Luxury Spa Therapist Tunic",
    fabric: "Viscose-Linen Bamboo Touch Fabric",
    gsm: "190 GSM Whisper-Soft",
    idealFor: "Ayurvedic Centers, Resort Spas, Wellness Retreats",
    features: [
      "Essential oil-resistant anti-stain wash",
      "Mandarin crossover collar with silent fabric drape",
      "Side slits for effortless cross-legged and floor movements"
    ],
    badge: "Oil-Resistant",
    moq: "Min: 25 pcs"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    category: "Valet & Doorman",
    title: "Ceremonial Bellhop & Porter Jacket",
    fabric: "Heavy Structured Poly-Wool with Braid Epaulettes",
    gsm: "300 GSM Heritage Suiting",
    idealFor: "Hotel Entrance Doormen, Porters, Valet Parking",
    features: [
      "Braided gold cord epaulettes and collar frogging",
      "Embossed metal heraldic buttons on double front placket",
      "Weather-resistant water-repellent exterior treatment"
    ],
    badge: "Gold Epaulettes",
    moq: "Min: 15 pcs"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
    category: "Bar & Lounge Service",
    title: "Artisan Mixologist Cross-Back Apron",
    fabric: "12 oz Heavyweight Washed Cotton Canvas",
    gsm: "340 GSM Rugged Luxury",
    idealFor: "Cocktail Lounges, Rooftop Bars, Hotel Baristas",
    features: [
      "Removable vegetable-tanned genuine leather harness",
      "Antique brass rivets on high-tension pockets",
      "Towel loop and custom laser-engraved leather brand patch"
    ],
    badge: "Full-Grain Leather",
    moq: "Min: 30 pcs"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    category: "Engineering & Maintenance",
    title: "Facility Engineering Workwear Coverall / Set",
    fabric: "Poly-Cotton Heavy Twill with High-Tenacity Thread",
    gsm: "250 GSM Anti-Abrasion",
    idealFor: "Hotel Maintenance, HVAC Technicians, Plant Engineers",
    features: [
      "High-visibility 3M Scotchlite™ reflective trim",
      "Multi-utility tool loop and radio pocket",
      "Non-conductive concealed snaps to protect hotel equipment"
    ],
    badge: "Anti-Abrasion",
    moq: "Min: 25 pcs"
  }
];

export default function HotelCatalogSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    "Culinary & Kitchen",
    "Front Desk & Concierge",
    "F&B & Banquet Service",
    "Housekeeping & Facilities",
    "Spa & Wellness Resorts"
  ];

  const filteredSamples =
    activeFilter === "All"
      ? HOTEL_SAMPLES
      : HOTEL_SAMPLES.filter(
          (s) =>
            s.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
            s.title.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section className="hotel-catalog-wrapper">
      <style>{`
        /* ==========================================================
           CLEAN LIGHT THEME COLOR PROFILE
        =========================================================== */
        :root {
          /* Canvas & Backgrounds */
          --bg-main:         #F4F8FE; /* Ultra-clean ice porcelain canvas */
          --bg-surface:      #FFFFFF; /* Pure white card surface */
          --bg-badge-tint:   #E8F5FE; /* Soft light-cyan badge & chip background */
          
          /* Logo Accent Blue & Cyan */
          --color-cobalt:    #0052FF; /* Primary buttons, links, active icons */
          --color-cobalt-hover: #003ECC; /* Darker cobalt for hover states */
          --color-cyan:      #00D4FF; /* Swoosh highlights, secondary icons, glows */
          
          /* Typography */
          --text-title:      #071838; /* Crisp, high-contrast dark navy for headings */
          --text-body:       #495E7C; /* Soft slate navy for paragraphs */
          --text-muted:      #6B82A0; /* Light slate for captions and small labels */

          /* Borders & Dividers */
          --border-subtle:   rgba(0, 82, 255, 0.14);  /* Clean card borders */
          --border-hover:    rgba(0, 212, 255, 0.60); /* Cyan glowing border on hover */
          
          /* Shadows & Glows */
          --shadow-card:     0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow:     0 8px 25px rgba(0, 82, 255, 0.32);
        }

        .hotel-catalog-wrapper {
          background-color: var(--bg-main);
          padding: 85px 24px;
          border-top: 1.5px solid var(--border-subtle);
        }

        .catalog-inner {
          max-width: 1240px;
          margin: 0 auto;
        }

        /* 1. INTRODUCTION HEADER BLOCK */
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

        /* PILLARS 4-COL STRIP */
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
          transition: all 0.25s ease;
        }

        .pillar-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
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

        /* 2. FILTER TABS */
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
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .uniform-sample-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-5px);
          box-shadow: 0 18px 40px rgba(0, 82, 255, 0.10);
        }

        /* IMAGE HEADER BOX */
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
          transition: transform 0.45s ease;
        }

        .uniform-sample-card:hover .sample-image {
          transform: scale(1.08);
        }

        .floating-image-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(7, 24, 56, 0.78);
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
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        /* CARD BODY (MATTER UNDER IMAGE) */
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

        /* ACTION BUTTON */
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
          box-sizing: border-box;
          transition: all 0.22s ease;
        }

        .btn-card-quote:hover {
          background-color: var(--color-cobalt);
          color: #FFFFFF;
          border-color: var(--color-cobalt);
          box-shadow: var(--shadow-glow);
        }
      `}</style>

      <div className="catalog-inner">
        {/* ========================================================
            PART 1: INTRO ABOUT VOXCEL NOVA HOTEL MANUFACTURING
        ========================================================= */}
        <div className="intro-header-box">
          <div className="category-chip">
            <FaConciergeBell /> 5-Star Hospitality Apparel Specialists
          </div>

          <h2 className="intro-title">
            Engineered For 5-Star Elegance, Culinary Heat & High-Turnover Rigor
          </h2>

          <p className="intro-description">
            At <b>Voxcel Nova</b>, hotel uniform manufacturing is designed around every touchpoint of the guest experience. 
            From stain-resistant front-desk suiting to breathable, heat-deflecting chef jackets and industrial-wash 
            housekeeping sets, our garments maintain pristine crispness under relentless daily hospitality shifts.
          </p>
        </div>

        {/* 4 MANUFACTURING PILLARS */}
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon"><FaShieldAlt /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "var(--text-title)" }}>
                Industrial Laundry Proof
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                Vat-dyed fabrics survive 100+ commercial high-temperature chlorine and steam washings.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon"><FaUtensils /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "var(--text-title)" }}>
                Heat-Deflect Kitchen Tech
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                Cool-Vent™ mesh linings prevent thermal exhaustion during peak restaurant dinner service.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon"><FaGem /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "var(--text-title)" }}>
                Teflon™ Stain Resistance
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                Nano-liquid repellent treatments cause wine, coffee, and grease spills to bead off surfaces.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon"><FaTshirt /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "var(--text-title)" }}>
                Department Color-Coding
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                Pre-sorted and labeled bags by property department (F&B, Front Office, Housekeeping).
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 2: DEPARTMENT FILTER TABS
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
            PART 3: 8 SAMPLES WITH HIGH-RES PHOTOS & MATTER UNDER
        ========================================================= */}
        <div className="samples-card-grid">
          {filteredSamples.map((item) => (
            <div key={item.id} className="uniform-sample-card">
              
              {/* IMAGE HEADER WITH PHOTO ZOOM */}
              <div className="card-image-box">
                <img src={item.image} alt={item.title} className="sample-image" />
                <span className="floating-image-badge">{item.badge}</span>
                <span className="floating-moq-badge">{item.moq}</span>
              </div>

              {/* MATTER UNDER IMAGE */}
              <div className="card-body-matter">
                <div>
                  <span className="sample-category-tag">{item.category}</span>
                  <h4 className="sample-card-title">{item.title}</h4>

                  {/* SPECS BLOCK */}
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

                  {/* BULLET FEATURES */}
                  <ul className="sample-features-list">
                    {item.features.map((feat, idx) => (
                      <li key={idx}>
                        <FaCheck className="check-bullet" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CONFIGURE ACTION */}
                <Link to="/customization" className="btn-card-quote">
                  Configure Hotel Bulk Specs <FaArrowRight size={11} />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* ========================================================
            BOTTOM HOSPITALITY TENDER BANNER
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
              Managing a Luxury Resort Opening or Chain Re-Branding?
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--text-body)" }}>
              We manufacture complete multi-property hotel uniform rosters with custom dyes and logo cresting.
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
            Request Hospitality Quote <FaArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
}