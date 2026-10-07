import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaArrowRight,
  FaShieldAlt,
  FaConciergeBell,
  FaHospital,
  FaUtensils,
  FaGem,
  FaTshirt
} from "react-icons/fa";

// ========================================================
// 8 SAMPLES: 4 HOSPITALS (HEALTHCARE) + 4 HOTELS (HOSPITALITY)
// ========================================================
const INSTITUTIONAL_SAMPLES = [
  // --- 4 HOSPITAL SAMPLES ---
  {
    id: 1,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790835470/shankar_wife.jpg",
    category: "Hospital & Clinical",
    title: "Consultant Physician & Specialist Doctor Lab Coat",
    fabric: "100% Combed Compact Twill with Teflon™ Bio-Barrier",
    gsm: "240 GSM Crisp White",
    idealFor: "Chief Medical Officers, Physicians & Specialists",
    features: [
      "Stain-release shield repels fluid & chemical stains",
      "Reinforced tablet, notepad & stethoscope welt pockets",
      "Breathable wrinkle-free drape for full OPD rotations"
    ],
    badge: "Bio-Shield",
    moq: "Min: 20 pcs"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790835469/abhilash_wife.jpg",
    category: "Hospital & Clinical",
    title: "Executive Head Nurse & In-Charge Scrub Suit (Wine)",
    fabric: "Silvadur™ Antimicrobial Poly-Viscose Flex Twill",
    gsm: "205 GSM Structured Stretch",
    idealFor: "Ward In-Charges, Nursing Superintendents, Matrons",
    features: [
      "Silver-ion antimicrobial wash prevents odor & bacteria",
      "Dual deep front cargo pockets for mobile medical tools",
      "Autoclave & commercial high-temp wash resistant dyes"
    ],
    badge: "Antimicrobial",
    moq: "Min: 25 sets"
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790836306/doctor.jpg",
    category: "Hospital & Clinical",
    title: "Ergonomic 4-Way Stretch Surgeon & ICU Scrub Suit",
    fabric: "Spandex-Poly Athletic Micro-Weave (Fluid-Repellent)",
    gsm: "185 GSM Whisper-Light",
    idealFor: "Surgeons, Anesthetists, Emergency & ICU Teams",
    features: [
      "4-way active stretch allows unrestricted bending & reach",
      "Moisture-wicking mesh keeps surgeons dry during long OTs",
      "Wrinkle-resistant & lint-free for cleanroom sterility"
    ],
    badge: "4-Way Flex",
    moq: "Min: 30 sets"
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790836305/cleaner_4.jpg",
    category: "Hospital & Clinical",
    title: "Patient Caregiver & Environmental Services Set",
    fabric: "Heavy Duty Poly-Cotton Ripstop Weave with Piping",
    gsm: "220 GSM Tear-Resistant",
    idealFor: "Ward Attendants, Sanitization & Housekeeping Staff",
    features: [
      "Impervious to strong hospital-grade disinfectant bleaches",
      "Clean contrast edge piping for department identification",
      "Triple-needle reinforced seams on high-friction zones"
    ],
    badge: "Bleach-Safe",
    moq: "Min: 40 sets"
  },

  // --- 4 HOTEL SAMPLES ---
  {
    id: 5,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790835468/shankar_wife_2.jpg",
    category: "Hotel & Resort",
    title: "5-Star Front Desk & Guest Relations Blazer Suit",
    fabric: "Poly-Viscose Wool-Touch with Stain-Shield Nano Coat",
    gsm: "260 GSM Structured Suiting",
    idealFor: "Front Office Executives, Concierge, Guest Relations",
    features: [
      "Stain-resistant Teflon nano-shield coating",
      "Branded gold/silver bullion crest embroidery",
      "Internal tailored pocket for hotel RFID master cards"
    ],
    badge: "Stain-Resistant",
    moq: "Min: 20 pcs"
  },
  {
    id: 6,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790835467/hotel.jpg",
    category: "Hotel & Resort",
    title: "Executive Master Chef Kitchen Jacket",
    fabric: "65% Poly / 35% Combed Cotton Heat-Deflect Twill",
    gsm: "220 GSM Breathable Twill",
    idealFor: "Executive Chefs, Sous Chefs & Pastry Masters",
    features: [
      "Underarm Cool-Vent™ micro-mesh airflow panels",
      "Cloth-knot buttons resistant to high oven heat",
      "Dual sleeve pocket for tasting spoons & thermometers"
    ],
    badge: "Heat-Deflective",
    moq: "Min: 25 pcs"
  },
  {
    id: 7,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790835915/hotel_1.jpg",
    category: "Hotel & Resort",
    title: "Fine Dining Banquet Vest & Wing-Collar Set",
    fabric: "Micro-Poly Matte Twill with Stretch Poplin Shirt",
    gsm: "200 GSM Crease-Free Drape",
    idealFor: "Banquet Captains, Sommeliers, Stewards",
    features: [
      "Anti-wrinkle stretch fabric allows balanced tray carrying",
      "Adjustable back buckle for precision waist silhouette",
      "Reinforced pocket welt tailored for corkscrews"
    ],
    badge: "Spill-Repellent",
    moq: "Min: 35 pcs"
  },
  {
    id: 8,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790835915/hotel_5.jpg",
    category: "Hotel & Resort",
    title: "Resort Housekeeping & Hospitality Attendant Set",
    fabric: "Durable Stretch Poly-Cotton Twill Weave",
    gsm: "210 GSM Ergonomic Flex",
    idealFor: "Room Attendants, Turn-Down Staff, Hospitality Crew",
    features: [
      "Bi-stretch back pleats for bending and bed-making comfort",
      "Double-layered deep pockets for master keys & guest amenities",
      "Vat-dyed to endure 100+ commercial wash cycles"
    ],
    badge: "Flex-Comfort",
    moq: "Min: 40 sets"
  }
];

export default function InstitutionalCatalogSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Hospital & Clinical", "Hotel & Resort"];

  const filteredSamples =
    activeFilter === "All"
      ? INSTITUTIONAL_SAMPLES
      : INSTITUTIONAL_SAMPLES.filter(
          (s) => s.category.toLowerCase() === activeFilter.toLowerCase()
        );

  // Smooth scroll down to your existing form / table component
  const handleScrollDown = () => {
    // 1. First tries to find your existing table or form element by common tags/IDs
    const existingElement =
      document.querySelector("form") ||
      document.querySelector("table") ||
      document.getElementById("customization-form") ||
      document.getElementById("quote-form");

    if (existingElement) {
      existingElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // 2. Otherwise smoothly scrolls down a little bit (~550px)
      window.scrollBy({ top: 550, behavior: "smooth" });
    }
  };

  return (
    <section className="institutional-catalog-wrapper">
      <style>{`
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
          --border-hover:    rgba(0, 212, 255, 0.60);
          --shadow-card:     0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow:     0 8px 25px rgba(0, 82, 255, 0.32);
        }

        .institutional-catalog-wrapper {
          background-color: var(--bg-main);
          padding: 85px 24px;
          border-top: 1.5px solid var(--border-subtle);
        }

        .catalog-inner {
          max-width: 1240px;
          margin: 0 auto;
        }

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
          padding: 8px 22px;
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

        .card-image-box {
          position: relative;
          width: 100%;
          height: 275px;
          overflow: hidden;
          background-color: #E2E8F0;
        }

        .sample-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.45s ease;
        }

        .uniform-sample-card:hover .sample-image {
          transform: scale(1.06);
        }

        .floating-image-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(7, 24, 56, 0.85);
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
          box-shadow: 0 4px 14px rgba(0,0,0,0.14);
        }

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
          font-size: 16px;
          font-weight: 800;
          color: var(--text-title);
          margin: 0 0 12px;
          line-height: 1.35;
          min-height: 44px;
        }

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

        /* SCROLL TRIGGER BUTTON */
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
        }

        .btn-card-quote:hover {
          background-color: var(--color-cobalt);
          color: #FFFFFF;
          border-color: var(--color-cobalt);
          box-shadow: var(--shadow-glow);
          transform: translateY(-1px);
        }
      `}</style>

      <div className="catalog-inner">
        {/* ================= HEADER SECTION ================= */}
        <div className="intro-header-box">
          <div className="category-chip">
            <FaHospital /> Clinical Healthcare &amp; <FaConciergeBell /> 5-Star Hospitality Apparel
          </div>

          <h2 className="intro-title">
            Tailored For Clinical Sterility, Guest Elegance &amp; Industrial Rigor
          </h2>

          <p className="intro-description">
            <b>Voxel Nova</b> manufactures high-performance institutional apparel for leading hospitals, medical centers, 
            and 5-star hotels. Engineered with hospital-grade antimicrobial finishes, fluid-repellent barriers, and 
            stain-resistant suiting fabrics designed to withstand demanding shifts and 100+ commercial wash cycles.
          </p>
        </div>

        {/* ================= PILLARS ================= */}
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon"><FaShieldAlt /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "var(--text-title)" }}>
                Hospital Bio-Safety
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                Silver-ion antimicrobial finishes and blood-borne pathogen fluid barriers.
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
                Cool-Vent™ mesh linings prevent thermal exhaustion during high-output dinner service.
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
                Liquid-repellent nano treatments cause coffee, oils, and chemical spills to bead right off.
              </p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon"><FaTshirt /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "var(--text-title)" }}>
                Department Sorting
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)" }}>
                Pre-packaged by department with custom size tagging and hospital/hotel embroidery.
              </p>
            </div>
          </div>
        </div>

        {/* ================= FILTER TABS ================= */}
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

        {/* ================= SAMPLES GRID ================= */}
        <div className="samples-card-grid">
          {filteredSamples.map((item) => (
            <div key={item.id} className="uniform-sample-card">
              
              {/* IMAGE HEADER WITH ADJUSTED FRAMING */}
              <div className="card-image-box">
                <img src={item.image} alt={item.title} className="sample-image" />
                <span className="floating-image-badge">{item.badge}</span>
                <span className="floating-moq-badge">{item.moq}</span>
              </div>

              {/* CARD DETAILS */}
              <div className="card-body-matter">
                <div>
                  <span className="sample-category-tag">{item.category}</span>
                  <h4 className="sample-card-title">{item.title}</h4>

                  {/* SPECS */}
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

                  {/* FEATURES */}
                  <ul className="sample-features-list">
                    {item.features.map((feat, idx) => (
                      <li key={idx}>
                        <FaCheck className="check-bullet" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ================= CLICK TO SCROLL DOWN ================= */}
                <button
                  type="button"
                  onClick={handleScrollDown}
                  className="btn-card-quote"
                >
                  Configure Institutional Specs <FaArrowRight size={11} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* ================= BOTTOM INQUIRY BANNER ================= */}
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
              Procuring Uniforms for a Hospital Network or Hotel Chain?
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--text-body)" }}>
              We manufacture bulk institutional orders with fabric testing certificates, custom PMS dyes, and rapid doorstep rollout.
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
              gap: "9px"
            }}
          >
            Request Institutional Tender Quote <FaArrowRight size={12} />
          </button>
        </div>

      </div>
    </section>
  );
}