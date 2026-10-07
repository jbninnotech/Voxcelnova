import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  // ================================
  // PRODUCT / COLLECTION LINKS
  // ================================
  const collectionLinks = [
    {
      title: "Oversized & Graphic T-Shirts",
      path: "/category/t-shirts",
    },
    {
      title: "Classic Polo T-Shirts",
      path: "/category/polo-t-shirts",
    },
    {
      title: "Formal & Casual Shirts",
      path: "/category/shirts",
    },
    {
      title: "Hoodies & Sweatshirts",
      path: "/category/hoodies-sweatshirts",
    },
    {
      title: "School & Institutional Uniforms",
      path: "/category/school-uniforms",
    },
    {
      title: "College Uniforms",
      path: "/category/college-uniforms",
    },
    {
      title: "Corporate Uniforms",
      path: "/category/corporate-uniforms",
    },
    {
      title: "Hospital Uniforms",
      path: "/category/hospital-uniforms",
    },
  ];

  // ================================
  // COMPANY LINKS
  // ================================
  const companyLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Our Clients",
      path: "/clients",
    },
    {
      title: "Products",
      path: "/products",
    },
    {
      title: "Careers",
      path: "/careers",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
  ];

  // ================================
  // BUSINESS / BULK LINKS
  // ================================
  const businessLinks = [
    {
      title: "Bulk Orders",
      path: "/bulk-orders",
    },
    {
      title: "School Uniforms",
      path: "/bulk/school-uniforms",
    },
    {
      title: "College Uniforms",
      path: "/bulk/college-uniforms",
    },
    {
      title: "Corporate Uniforms",
      path: "/bulk/corporate-uniforms",
    },
    {
      title: "Hotel Uniforms",
      path: "/bulk/hotel-uniforms",
    },
  ];

  return (
    <footer
      style={{
        background:
          "linear-gradient(180deg, #07111f 0%, #050a13 100%)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* =========================================
          BACKGROUND GLOW
      ========================================== */}
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "rgba(29, 78, 216, 0.10)",
          filter: "blur(100px)",
          top: "-200px",
          left: "-150px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(14, 165, 233, 0.08)",
          filter: "blur(100px)",
          bottom: "-180px",
          right: "-100px",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* =========================================
            MAIN FOOTER
        ========================================== */}
        <div
          className="row g-4"
          style={{
            paddingTop: "70px",
            paddingBottom: "55px",
          }}
        >
          {/* =====================================
              BRAND
          ====================================== */}
          <div className="col-lg-4 col-md-6">
            <div style={{ maxWidth: "390px" }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "900",
                    letterSpacing: "1.5px",
                    color: "#ffffff",
                  }}
                >
                  VOXEL<span style={{ color: "#3b82f6" }}>NOVA</span>
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "4px",
                    color: "#94a3b8",
                    marginTop: "3px",
                  }}
                >
                  ATELIER & UNIFORMS
                </div>
              </Link>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.8",
                  fontSize: "14px",
                  marginBottom: "24px",
                }}
              >
                Premium clothing manufacturing and custom uniform solutions
                designed for schools, colleges, corporates, hospitals, hotels,
                institutions and businesses.
              </p>

              {/* SOCIAL ICONS */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  {
                    icon: <FaFacebookF />,
                    path: "#",
                  },
                  {
                    icon: <FaInstagram />,
                    path: "#",
                  },
                  {
                    icon: <FaLinkedinIn />,
                    path: "#",
                  },
                  {
                    icon: <FaTwitter />,
                    path: "#",
                  },
                  {
                    icon: <FaYoutube />,
                    path: "#",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.path}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      border: "1px solid rgba(148,163,184,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#cbd5e1",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1d4ed8";
                      e.currentTarget.style.borderColor = "#1d4ed8";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "transparent";
                      e.currentTarget.style.borderColor =
                        "rgba(148,163,184,0.2)";
                      e.currentTarget.style.color = "#cbd5e1";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* =====================================
              COMPANY
          ====================================== */}
          <div className="col-lg-2 col-md-6 col-sm-6">
            <h5
              style={{
                fontSize: "15px",
                fontWeight: "800",
                marginBottom: "22px",
                color: "#ffffff",
              }}
            >
              Company
            </h5>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {companyLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                    fontSize: "13px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#60a5fa";
                    e.currentTarget.style.paddingLeft = "5px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#94a3b8";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  <FaArrowRight
                    style={{
                      fontSize: "9px",
                      marginRight: "7px",
                    }}
                  />
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* =====================================
              COLLECTIONS
          ====================================== */}
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h5
              style={{
                fontSize: "15px",
                fontWeight: "800",
                marginBottom: "22px",
                color: "#ffffff",
              }}
            >
              Collections
            </h5>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {collectionLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="fashion-link"
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                    fontSize: "13px",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#60a5fa";
                    e.currentTarget.style.paddingLeft = "5px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#94a3b8";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  <FaArrowRight
                    style={{
                      fontSize: "9px",
                      marginRight: "7px",
                      flexShrink: 0,
                    }}
                  />

                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* =====================================
              BUSINESS
          ====================================== */}
          <div className="col-lg-3 col-md-6">
            <h5
              style={{
                fontSize: "15px",
                fontWeight: "800",
                marginBottom: "22px",
                color: "#ffffff",
              }}
            >
              Bulk & Business
            </h5>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {businessLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                    fontSize: "13px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#60a5fa";
                    e.currentTarget.style.paddingLeft = "5px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#94a3b8";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  <FaArrowRight
                    style={{
                      fontSize: "9px",
                      marginRight: "7px",
                    }}
                  />

                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================
            CONTACT STRIP
        ========================================== */}
        <div
          className="row g-3"
          style={{
            borderTop: "1px solid rgba(148,163,184,0.12)",
            borderBottom: "1px solid rgba(148,163,184,0.12)",
            padding: "28px 0",
          }}
        >
          <div className="col-lg-4 col-md-6">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "rgba(29,78,216,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#60a5fa",
                  flexShrink: 0,
                }}
              >
                <FaMapMarkerAlt />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "3px",
                  }}
                >
                  VISIT US
                </div>

                <div
                  style={{
                    color: "#cbd5e1",
                    fontSize: "13px",
                  }}
                >
                  Hyderabad, Telangana, India
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "rgba(29,78,216,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#60a5fa",
                  flexShrink: 0,
                }}
              >
                <FaPhoneAlt />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "3px",
                  }}
                >
                  CALL US
                </div>

                <a
                  href="tel:+919999999999"
                  style={{
                    color: "#cbd5e1",
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  +91 99999 99999
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "rgba(29,78,216,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#60a5fa",
                  flexShrink: 0,
                }}
              >
                <FaEnvelope />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "3px",
                  }}
                >
                  EMAIL US
                </div>

                <a
                  href="mailto:info@voxelnova.com"
                  style={{
                    color: "#cbd5e1",
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  info@voxelnova.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            BOTTOM
        ========================================== */}
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
          style={{
            padding: "25px 0",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} VOXELNOVA. All Rights Reserved.
          </p>

          <div
            className="d-flex gap-3"
            style={{
              fontSize: "12px",
            }}
          >
            <Link
              to="/contact"
              style={{
                color: "#64748b",
                textDecoration: "none",
              }}
            >
              Privacy Policy
            </Link>

            <span style={{ color: "#334155" }}>|</span>

            <Link
              to="/contact"
              style={{
                color: "#64748b",
                textDecoration: "none",
              }}
            >
              Terms & Conditions
            </Link>
          </div>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#16a34a",
              color: "#ffffff",
              padding: "9px 15px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: "700",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(22,163,74,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaWhatsapp />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;