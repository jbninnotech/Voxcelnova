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
  FaTshirt
} from "react-icons/fa";

// 8 HOTEL UNIFORM SAMPLES
const HOTEL_SAMPLES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=700&q=80",
    category: "Culinary & Kitchen",
    title: "Executive Master Chef Jacket",
    fabric: "65% Poly / 35% Combed Cotton Heat-Deflect Twill",
    gsm: "220 GSM Breathable Twill",
    idealFor: "Executive Chefs, Sous Chefs & Pastry Masters",
    features: [
      "Underarm Cool-Vent™ micro-mesh airflow panels",
      "Cloth-knot buttons resistant to high kitchen oven heat",
      "Thermometer and tasting-spoon sleeve dual pocket"
    ],
    badge: "Heat-Deflective",
    moq: "Min: 25 pcs"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=700&q=80",
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
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80",
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

function HotelCatalogSection() {
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
    <section style={{ backgroundColor: "#F4F8FE", padding: "85px 24px", borderTop: "1.5px solid rgba(0, 82, 255, 0.14)" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        
        {/* INTRO BLOCK */}
        <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#E8F5FE", color: "#0052FF", border: "1px solid rgba(0, 82, 255, 0.14)", padding: "6px 16px", borderRadius: 50, fontSize: 12, fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>
            <FaConciergeBell /> Hospitality Apparel Specialists
          </div>

          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", fontWeight: 800, color: "#071838", lineHeight: 1.2, marginBottom: 16 }}>
            Engineered For 5-Star Elegance, Culinary Heat & High-Turnover Rigor
          </h2>

          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#495E7C", margin: "0 auto 32px" }}>
            At <b>Voxcel Nova</b>, hotel uniform manufacturing is designed around every touchpoint of the guest experience. From stain-resistant front-desk suiting to breathable chef jackets and industrial-wash housekeeping sets.
          </p>
        </div>

        {/* 4 PILLARS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 50 }}>
          <div style={pillarCardStyle}>
            <div style={pillarIconStyle}><FaShieldAlt /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "#071838" }}>Industrial Laundry Proof</h5>
              <p style={{ margin: 0, fontSize: "12px", color: "#495E7C" }}>Vat-dyed fabrics survive 100+ commercial high-temperature washings.</p>
            </div>
          </div>

          <div style={pillarCardStyle}>
            <div style={pillarIconStyle}><FaUtensils /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "#071838" }}>Heat-Deflect Kitchen Tech</h5>
              <p style={{ margin: 0, fontSize: "12px", color: "#495E7C" }}>Cool-Vent™ mesh linings prevent thermal exhaustion during dinner service.</p>
            </div>
          </div>

          <div style={pillarCardStyle}>
            <div style={pillarIconStyle}><FaGem /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "#071838" }}>Teflon™ Stain Resistance</h5>
              <p style={{ margin: 0, fontSize: "12px", color: "#495E7C" }}>Nano-liquid repellent treatments cause wine and grease spills to bead off.</p>
            </div>
          </div>

          <div style={pillarCardStyle}>
            <div style={pillarIconStyle}><FaTshirt /></div>
            <div>
              <h5 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 800, color: "#071838" }}>Department Color-Coding</h5>
              <p style={{ margin: 0, fontSize: "12px", color: "#495E7C" }}>Pre-sorted and labeled bags by property department for easy distribution.</p>
            </div>
          </div>
        </div>

        {/* FILTER BUTTONS */}
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

        {/* 8 SAMPLES GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {filteredSamples.map((item) => (
            <div key={item.id} style={cardStyle}>
              {/* IMAGE HEADER */}
              <div style={{ position: "relative", width: "100%", height: "220px", overflow: "hidden", backgroundColor: "#E2E8F0" }}>
                <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: 12, left: 12, background: "rgba(7, 24, 56, 0.78)", color: "#FFFFFF", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6 }}>
                  {item.badge}
                </span>
                <span style={{ position: "absolute", bottom: 12, right: 12, background: "#FFFFFF", color: "#0052FF", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>
                  {item.moq}
                </span>
              </div>

              {/* MATTER UNDER IMAGE */}
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <span style={{ color: "#0052FF", fontWeight: 800, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#071838", margin: "0 0 12px", lineHeight: 1.3 }}>
                    {item.title}
                  </h4>

                  {/* SPECS */}
                  <div style={{ backgroundColor: "#F4F8FE", border: "1px solid rgba(0, 82, 255, 0.14)", padding: "12px 14px", borderRadius: 12, marginBottom: 14 }}>
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
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 6 }}>
                    {item.features.map((feat, idx) => (
                      <li key={idx} style={{ fontSize: "12px", color: "#495E7C", display: "flex", alignItems: "center", gap: 8 }}>
                        <FaCheck style={{ color: "#0052FF", fontSize: 11, flexShrink: 0 }} />
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
                    boxSizing: "border-box"
                  }}
                >
                  Configure Hotel Bulk Specs <FaArrowRight size={11} />
                </Link>
              </div>
            </div>
          ))}
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

// EXPORT BOTH WAYS TO PREVENT ANY IMPORT ERROR
export default HotelCatalogSection;