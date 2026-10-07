import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaArrowRight,
  FaShieldAlt,
  FaGraduationCap,
  FaSchool,
  FaRunning,
  FaChild,
  FaTshirt
} from "react-icons/fa";

// ========================================================
// 8 SCHOOL UNIFORM SAMPLES WITH CLOUDINARY IMAGES
// ========================================================
const SCHOOL_SAMPLES = [
  {
    id: 1,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790836821/1.jpg",
    category: "Primary & Junior Wing",
    title: "Classic Junior Oxford Shirt & Pinafore Tunic Set",
    fabric: "65% Combed Cotton / 35% Polyester Easy-Iron Poplin",
    gsm: "180 GSM Wrinkle-Free",
    idealFor: "Kindergarten to Class 5 Boys & Girls",
    features: [
      "Stain-shield finish repels accidental juice, food & ink spills",
      "Reinforced knee & pocket stress points for playground durability",
      "Colorfast dye tested to withstand 150+ high-frequency home washes"
    ],
    badge: "Stain-Shield",
    moq: "Min: 50 sets"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790836821/4.jpg",
    category: "Middle & High School",
    title: "Senior School Crisp Oxford Shirt & Tailored Trousers",
    fabric: "Poly-Viscose Suiting Twill & Compact Yarn Shirting",
    gsm: "220 GSM Anti-Pilling",
    idealFor: "Class 6 to Class 12 Secondary Students",
    features: [
      "Breathable moisture-wicking weave for all-day classroom comfort",
      "Fused structured collar that maintains crisp shape without stiffeners",
      "Expandable hidden elastic waistband for growing students"
    ],
    badge: "Anti-Pilling",
    moq: "Min: 40 sets"
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790836821/3.jpg",
    category: "Sports & Physical Education",
    title: "Inter-House Athletic Dry-Fit Polo & Track Pant Set",
    fabric: "100% Bio-Wash Micro-Polyester Birdseye Honeycomb",
    gsm: "170 GSM Quick-Dry",
    idealFor: "Sports Day, PT Drills, House Matches & Tournaments",
    features: [
      "Active sweat-evaporation technology prevents odor & dampness",
      "Sublimated fade-proof school logo & house color panels",
      "Ergonomic 4-way stretch fabric for running, soccer & gymnastics"
    ],
    badge: "Quick-Dry PE",
    moq: "Min: 50 sets"
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790836822/7.jpg",
    category: "Blazers & Formal Winterwear",
    title: "Institutional Gold-Embroidered Crest School Blazer",
    fabric: "Rich Poly-Wool Matte Serge with Satin Inner Lining",
    gsm: "300 GSM Heavy Suiting",
    idealFor: "School Assemblies, Prefect Council & Winter Sessions",
    features: [
      "Precision gold/silver bullion needlework crest on chest pocket",
      "Internal nametag label patch preventing mix-ups in cloakrooms",
      "Anti-wrinkle structured shoulder pads for smart upright posture"
    ],
    badge: "Gold Crested",
    moq: "Min: 30 pcs"
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790836822/6.jpg",
    category: "Primary & Junior Wing",
    title: "Toddlers & Nursery Dungaree / Checked Tunic Ensemble",
    fabric: "100% Hypoallergenic Soft Organic Cotton Twill",
    gsm: "190 GSM Gentle Touch",
    idealFor: "Playgroup, Nursery & UKG/LKG Kids",
    features: [
      "Non-toxic, skin-safe azo-free certified European dyes",
      "Smooth snap-button closures for easy self-dressing by children",
      "Dual deep front pockets for crayons, handkerchiefs and id cards"
    ],
    badge: "Hypoallergenic",
    moq: "Min: 50 sets"
  },
  {
    id: 6,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790836822/5.jpg",
    category: "Middle & High School",
    title: "Heritage Box-Pleat Tartan Skirt & Peter-Pan Blouse",
    fabric: "Yarn-Dyed Poly-Viscose Tartan Check & Crisp Cotton",
    gsm: "210 GSM Crease-Resistant",
    idealFor: "Girls Senior Secondary School Wardrobe",
    features: [
      "Permanent heat-set knife pleats that never lose shape in laundry",
      "Internal modest cycle shorts sewn directly into the skirt",
      "High tear-tensile strength resisting daily school bag friction"
    ],
    badge: "Permanent Pleats",
    moq: "Min: 40 sets"
  },
  {
    id: 7,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790836606/12.jpg",
    category: "Blazers & Formal Winterwear",
    title: "Classic V-Neck Knitted School Pullover / Cardigan",
    fabric: "100% Cashmilon Anti-Shrink Knit with Contrast Neck Tipping",
    gsm: "260 GSM Thermal Knit",
    idealFor: "Autumn & Winter Daily Campus Uniform",
    features: [
      "Elasticated ribbed cuffs & hem that retain snug tension",
      "Color-coded house stripe trim along collar and V-neckline",
      "Pill-free fiber prevents fuzzy ball formation after regular washes"
    ],
    badge: "Thermal Knit",
    moq: "Min: 40 pcs"
  },
  {
    id: 8,
    image: "https://res.cloudinary.com/d4oald11/image/upload/v1790836604/9.jpg",
    category: "Formal & Council Wear",
    title: "Head Boy / Head Girl & Student Prefect Council Suit",
    fabric: "Fine Suiting Poly-Viscose Wool-Touch Fabric",
    gsm: "270 GSM Presidential Weave",
    idealFor: "Student Council, Annual Functions & Model UN Teams",
    features: [
      "Distinguished formal lapels with gold sash & pin attachments",
      "Includes tailored necktie / scarf crafted in school signature stripes",
      "Wrinkle-recovery weave maintains elegance throughout campus ceremonies"
    ],
    badge: "Prefect Edition",
    moq: "Min: 25 sets"
  }
];

export default function SchoolCatalogSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    "Primary & Junior Wing",
    "Middle & High School",
    "Sports & Physical Education",
    "Blazers & Formal Winterwear"
  ];

  const filteredSamples =
    activeFilter === "All"
      ? SCHOOL_SAMPLES
      : SCHOOL_SAMPLES.filter(
          (s) =>
            s.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
            s.title.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section
      style={{
        backgroundColor: "#F4F8FE",
        padding: "85px 24px",
        borderTop: "1.5px solid rgba(0, 82, 255, 0.14)"
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        
        {/* ================= INTRO BLOCK ================= */}
        <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#E8F5FE",
              color: "#0052FF",
              border: "1px solid rgba(0, 82, 255, 0.14)",
              padding: "6px 16px",
              borderRadius: 50,
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 16
            }}
          >
            <FaGraduationCap /> Premier Academic Uniform Manufacturers
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.7rem)",
              fontWeight: 800,
              color: "#071838",
              lineHeight: 1.2,
              marginBottom: 16
            }}
          >
            Built For Playground Energy, Classroom Discipline & 150+ Washes
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#495E7C",
              margin: "0 auto 32px"
            }}
          >
            At <b>Voxel Nova</b>, academic uniform manufacturing combines kid-friendly skin-safe fabrics with industrial-grade durability. From stain-repellent kindergarten tunics to sweat-evaporating physical education kits and prestigious crested blazers.
          </p>
        </div>

        {/* ================= 4 ACADEMIC PILLARS ================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginBottom: 50
          }}
        >
          <div style={pillarCardStyle}>
            <div style={pillarIconStyle}><FaShieldAlt /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "#071838" }}>
                150+ Home Washes
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "#495E7C" }}>
                High-grade vat dyes prevent fading, shrinkage, and fraying across the school year.
              </p>
            </div>
          </div>

          <div style={pillarCardStyle}>
            <div style={pillarIconStyle}><FaRunning /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "#071838" }}>
                Playground Tear-Shield
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "#495E7C" }}>
                Reinforced bar-tacking and double-stitched inseams endure active running and sports.
              </p>
            </div>
          </div>

          <div style={pillarCardStyle}>
            <div style={pillarIconStyle}><FaChild /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "#071838" }}>
                Skin-Safe &amp; Breathable
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "#495E7C" }}>
                Certified azo-free dyes and combed cotton fibers prevent skin allergies and rashes.
              </p>
            </div>
          </div>

          <div style={pillarCardStyle}>
            <div style={pillarIconStyle}><FaSchool /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "#071838" }}>
                Custom Cresting &amp; Houses
              </h5>
              <p style={{ margin: 0, fontSize: "12px", color: "#495E7C" }}>
                High-density bullion embroidery and color-coordinated ties, belts &amp; socks.
              </p>
            </div>
          </div>
        </div>

        {/* ================= FILTER TABS ================= */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                backgroundColor: activeFilter === cat ? "#0052FF" : "#FFFFFF",
                color: activeFilter === cat ? "#FFFFFF" : "#495E7C",
                border: "1.5px solid rgba(0, 82, 255, 0.14)",
                padding: "8px 18px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: activeFilter === cat ? "0 8px 25px rgba(0, 82, 255, 0.32)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= 8 SAMPLES GRID ================= */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {filteredSamples.map((item) => (
            <div key={item.id} style={cardStyle}>
              
              {/* IMAGE HEADER WITH ADJUSTED FRAMING */}
              <div style={{ position: "relative", width: "100%", height: "265px", overflow: "hidden", backgroundColor: "#E2E8F0" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    display: "block"
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "rgba(7, 24, 56, 0.82)",
                    backdropFilter: "blur(6px)",
                    color: "#FFFFFF",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "5px 11px",
                    borderRadius: 6
                  }}
                >
                  {item.badge}
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    background: "#FFFFFF",
                    color: "#0052FF",
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "5px 11px",
                    borderRadius: 6,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
                  }}
                >
                  {item.moq}
                </span>
              </div>

              {/* CARD DETAILS */}
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <span
                    style={{
                      color: "#0052FF",
                      fontWeight: 800,
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      display: "block",
                      marginBottom: 6
                    }}
                  >
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: "16.5px", fontWeight: 800, color: "#071838", margin: "0 0 12px", lineHeight: 1.35, minHeight: "44px" }}>
                    {item.title}
                  </h4>

                  {/* SPECS */}
                  <div
                    style={{
                      backgroundColor: "#F4F8FE",
                      border: "1px solid rgba(0, 82, 255, 0.14)",
                      padding: "12px 14px",
                      borderRadius: 12,
                      marginBottom: 14
                    }}
                  >
                    <div style={{ fontSize: 12, margin: "4px 0", color: "#071838" }}>
                      <span style={{ color: "#6B82A0", fontWeight: 600 }}>Fabric: </span>{item.fabric}
                    </div>
                    <div style={{ fontSize: 12, margin: "4px 0", color: "#071838" }}>
                      <span style={{ color: "#6B82A0", fontWeight: 600 }}>Weight: </span><b>{item.gsm}</b>
                    </div>
                    <div style={{ fontSize: 12, margin: "4px 0", color: "#071838" }}>
                      <span style={{ color: "#6B82A0", fontWeight: 600 }}>Ideal For: </span>{item.idealFor}
                    </div>
                  </div>

                  {/* BULLET FEATURES */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 7 }}>
                    {item.features.map((feat, idx) => (
                      <li key={idx} style={{ fontSize: "12px", color: "#495E7C", display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.4 }}>
                        <FaCheck style={{ color: "#0052FF", fontSize: 11, flexShrink: 0, marginTop: 3 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/customization"
                  style={{
                    width: "100%",
                    backgroundColor: "#E8F5FE",
                    color: "#0052FF",
                    border: "1.5px solid rgba(0, 82, 255, 0.14)",
                    padding: "11px 16px",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxSizing: "border-box",
                    transition: "all 0.22s ease"
                  }}
                >
                  Configure School Bulk Specs <FaArrowRight size={11} />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* ================= BOTTOM ACADEMIC INQUIRY BANNER ================= */}
        <div
          style={{
            marginTop: "60px",
            background: "#FFFFFF",
            border: "1.5px solid rgba(0, 82, 255, 0.14)",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "0 12px 32px rgba(0, 48, 143, 0.06)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px"
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: 800, color: "#071838" }}>
              Ordering for a School Group, Trust or College Campus?
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#495E7C" }}>
              We partner directly with school managements to provide complete uniform sets, sports house kits, student ties, and doorstep parent distribution.
            </p>
          </div>
          <Link
            to="/customization"
            style={{
              background: "#0052FF",
              color: "#FFFFFF",
              padding: "13px 26px",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(0, 82, 255, 0.32)",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px"
            }}
          >
            Request School Tender Quote <FaArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
}

// INLINE STYLES FOR CONSISTENCY
const pillarCardStyle = {
  backgroundColor: "#FFFFFF",
  border: "1.5px solid rgba(0, 82, 255, 0.14)",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 12px 32px rgba(0, 48, 143, 0.06)",
  display: "flex",
  alignItems: "flex-start",
  gap: 14
};

const pillarIconStyle = {
  width: 44,
  height: 44,
  borderRadius: 12,
  backgroundColor: "#E8F5FE",
  color: "#0052FF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 19,
  flexShrink: 0,
  border: "1px solid rgba(0, 82, 255, 0.14)"
};

const cardStyle = {
  backgroundColor: "#FFFFFF",
  border: "1.5px solid rgba(0, 82, 255, 0.14)",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 12px 32px rgba(0, 48, 143, 0.06)",
  display: "flex",
  flexDirection: "column"
};