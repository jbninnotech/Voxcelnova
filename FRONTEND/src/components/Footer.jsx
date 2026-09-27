import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaDirections,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-dark-wrapper position-relative text-white overflow-hidden">
      {/* CSS Styles & Brand Accent Themes */}
      <style>{`
        /* ==========================================================
           DEEP OBSIDIAN THEME WITH COBALT & CYAN BRAND ACCENTS
        =========================================================== */
        .footer-dark-wrapper {
          --footer-bg:        #050814; /* Deep luxury dark canvas */
          --footer-surface:   #0B1124; /* Elevated dark card surface */
          --footer-border:    rgba(0, 82, 255, 0.22); /* Subtle cobalt border */
          --footer-hover:     rgba(0, 212, 255, 0.65); /* Cyan glow on hover */

          --color-cobalt:     #0052FF; /* Core Brand Cobalt */
          --color-cyan:       #00D4FF; /* Electric Cyan */
          --text-muted:       #8A9BB5; /* Soft slate text */

          background-color: var(--footer-bg);
          border-top: 2px solid var(--color-cobalt);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* Ambient Glow Backdrop */
        .footer-dark-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 250px;
          background: radial-gradient(circle, rgba(0, 82, 255, 0.12) 0%, rgba(0, 212, 255, 0.05) 50%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Category Headings with Electric Underline */
        .footer-heading {
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #FFFFFF;
          text-transform: uppercase;
          position: relative;
          display: inline-block;
          margin-bottom: 1.3rem;
        }

        .footer-heading::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 28px;
          height: 2.5px;
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-cyan));
          border-radius: 2px;
        }

        /* Apparel Collection Links */
        .fashion-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.86rem;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .fashion-link:hover {
          color: var(--color-cyan);
          transform: translateX(4px);
        }

        .fashion-dot {
          color: var(--color-cobalt);
          font-size: 0.55rem;
          transition: color 0.2s ease;
        }

        .fashion-link:hover .fashion-dot {
          color: var(--color-cyan);
        }

        /* Social Circle Buttons */
        .social-circle-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--footer-border);
          background: rgba(0, 82, 255, 0.12);
          color: var(--color-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-circle-btn:hover {
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-cyan));
          color: #FFFFFF;
          transform: translateY(-3px);
          box-shadow: 0 4px 16px rgba(0, 212, 255, 0.4);
          border-color: var(--color-cyan);
        }

        /* Support Highlight Box */
        .support-call-box {
          background: var(--footer-surface);
          border: 1px solid var(--footer-border);
          border-radius: 14px;
          padding: 14px 18px;
          transition: all 0.3s ease;
        }

        .support-call-box:hover {
          border-color: var(--footer-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 82, 255, 0.25);
        }

        .support-phone-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(0, 212, 255, 0.35);
          background: rgba(0, 82, 255, 0.2);
          color: var(--color-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Contact Details Pill Items */
        .contact-pill-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .contact-pill-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(0, 82, 255, 0.15);
          border: 1px solid var(--footer-border);
          color: var(--color-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Store Directions Button */
        .btn-store-direction {
          background: linear-gradient(135deg, var(--color-cobalt) 0%, #003ECC 100%);
          color: #FFFFFF !important;
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 8px;
          font-size: 0.80rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 10px 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 82, 255, 0.25);
          transition: all 0.25s ease;
        }

        .btn-store-direction:hover {
          background: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-cobalt) 100%);
          box-shadow: 0 6px 20px rgba(0, 212, 255, 0.45);
          transform: translateY(-2px);
          color: #FFFFFF !important;
        }
      `}</style>

      {/* MAIN 4-COLUMN FOOTER CONTENT */}
      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row g-4 g-lg-5">
          
          {/* ================= COLUMN 1: BRAND LOGO & INFO ================= */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cyan) 100%)",
                  boxShadow: "0 0 16px rgba(0, 212, 255, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#FFFFFF", fontWeight: "900", fontSize: "1.3rem", letterSpacing: "-1px" }}>
                  V
                </span>
              </div>

              <div>
                <h5
                  className="mb-0 fw-bold"
                  style={{
                    letterSpacing: "1px",
                    background: "linear-gradient(90deg, #FFFFFF 0%, var(--color-cyan) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "1.1rem",
                  }}
                >
                  VOXCEL WEAR
                </h5>
                <span style={{ fontSize: "0.68rem", letterSpacing: "1px", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Institutional &amp; Fleet Apparel
                </span>
              </div>
            </div>

            <p style={{ color: "var(--text-muted)", fontSize: "0.84rem", lineHeight: "1.6" }}>
              Direct factory manufacturing: high-durability corporate wear, school uniforms, customized tees, hoodies, and automated bulk production.
            </p>

            {/* CONNECT WITH US */}
            <div className="mt-3">
              <span
                className="d-block fw-bold mb-2"
                style={{ fontSize: "0.75rem", letterSpacing: "1.5px", color: "#FFFFFF", textTransform: "uppercase" }}
              >
                Connect With Us
              </span>
              <div className="d-flex flex-wrap gap-2">
                <a
                  href="https://www.instagram.com/voxelnovainnovation2021/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle-btn"
                  aria-label="Instagram"
                >
                  <FaInstagram size={15} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61594611867296"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle-btn"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="https://www.youtube.com/@voxelnovainnovation"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle-btn"
                  aria-label="YouTube"
                >
                  <FaYoutube size={15} />
                </a>
                <a
                  href="https://wa.me/918143324349"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle-btn"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={15} />
                </a>
               
              </div>
            </div>
          </div>

          {/* ================= COLUMN 2: CLOTHING COLLECTIONS ================= */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="footer-heading">Collections</h6>
            <div className="d-flex flex-column">
              {[
                { title: "Oversized & Graphic T-Shirts", path: "/category/t-shirts" },
                { title: "Classic Polo T-Shirts", path: "/category/polo-t-shirts" },
                { title: "Formal & Casual Shirts", path: "/category/shirts" },
                { title: "Hoodies & Sweatshirts", path: "/category/hoodies-sweatshirts" },
                { title: "School & Institutional Uniforms", path: "/category/school-uniforms" },
                { title: "Bulk Custom Screen Printing", path: "/bulk-orders" },
              ].map((link, idx) => (
                <Link key={idx} to={link.path} className="fashion-link">
                  <span className="fashion-dot">&bull;</span>
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ================= COLUMN 3: ORDER SUPPORT & CONTACT ================= */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="footer-heading">Order Inquiries</h6>

            {/* Call Support Box */}
            <div className="support-call-box mb-3 d-flex align-items-center gap-3">
              <div className="support-phone-icon">
                <FaPhoneAlt size={15} />
              </div>
              <div>
                <span className="d-block text-uppercase" style={{ fontSize: "0.68rem", letterSpacing: "1px", color: "var(--text-muted)" }}>
                  Corporate Support
                </span>
                <a
                  href="tel:+918374771149"
                  className="fw-bold text-decoration-none"
                  style={{ fontSize: "1rem", color: "#FFFFFF" }}
                >
                  +91 83747 71149
                </a>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  Mon – Sat &nbsp; 9:00 AM – 8:00 PM
                </div>
              </div>
            </div>

            {/* Email Support */}
            <div className="contact-pill-item mb-3">
              <div className="contact-pill-icon">
                <FaEnvelope />
              </div>
              <div>
                <span className="d-block text-uppercase" style={{ fontSize: "0.66rem", color: "var(--text-muted)", letterSpacing: "0.5px" }}>
                  Support Email
                </span>
                <a
                  href="mailto:orders@voxcelwear.com"
                  className="text-decoration-none"
                  style={{ fontSize: "0.82rem", color: "#E2E8F0", wordBreak: "break-all" }}
                >
                  orders@voxcelwear.com
                </a>
              </div>
            </div>

            {/* Warehouse Hub Address */}
            <div className="contact-pill-item">
              <div className="contact-pill-icon">
                <FaMapMarkerAlt />
              </div>
              <div>
                <span className="d-block text-uppercase" style={{ fontSize: "0.66rem", color: "var(--text-muted)", letterSpacing: "0.5px" }}>
                  Production Hub
                </span>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  Hyderabad, Chaitanyapuri, T.S. – 500060
                </span>
              </div>
            </div>
          </div>

          {/* ================= COLUMN 4: STORE OUTLET LOCATION ================= */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="footer-heading">Store Outlet</h6>

            {/* Embedded Dark Live Map */}
            <div
              className="position-relative overflow-hidden mb-3"
              style={{
                borderRadius: "10px",
                border: "1px solid var(--footer-border)",
                height: "135px",
                background: "#080E20",
              }}
            >
              {/* Live Badge */}
              <div
                className="position-absolute top-0 end-0 m-2 px-2 py-1 d-flex align-items-center gap-1"
                style={{
                  background: "rgba(5, 8, 20, 0.85)",
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                  borderRadius: "4px",
                  fontSize: "0.65rem",
                  color: "var(--color-cyan)",
                  zIndex: 2,
                  backdropFilter: "blur(4px)",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-cyan)" }} />
                <span>STORE LIVE</span>
              </div>

              <iframe
                title="Store Outlet Map"
                src="https://maps.google.com/maps?q=Chaitanyapuri,Hyderabad,Telangana&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(92%) hue-rotate(180deg) contrast(90%)",
                }}
                loading="lazy"
              />
            </div>

            {/* Directions Button */}
            <a
              href="https://maps.google.com/?q=Chaitanyapuri,Hyderabad,Telangana"
              target="_blank"
              rel="noreferrer"
              className="btn-store-direction w-100"
            >
              <FaDirections size={14} />
              <span>Get Directions</span>
            </a>
          </div>

        </div>
      </div>

      {/* BOTTOM LEGAL & COPYRIGHT BAR */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          backgroundColor: "#03050C",
        }}
      >
        <div className="container py-3 d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
          <span style={{ color: "var(--text-muted)", fontSize: "0.80rem" }}>
            &copy; {new Date().getFullYear()} VOXCEL WEAR. All Rights Reserved. Engineered for precision &amp; comfort.
          </span>

          <div className="d-flex gap-3 mt-2 mt-md-0" style={{ fontSize: "0.78rem" }}>
            <Link to="/careers" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
              Careers
            </Link>
            <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>|</span>
            <Link to="/shipping-policy" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
              Shipping &amp; Returns
            </Link>
            <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>|</span>
            <Link to="/privacy-policy" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
              Privacy Policy
            </Link>
            <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>|</span>
            <Link to="/terms" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}