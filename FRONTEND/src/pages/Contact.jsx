import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaTshirt,
  FaExternalLinkAlt,
  FaSpinner,
  FaExclamationTriangle,
  FaChevronDown,
  FaQuestionCircle,
} from "react-icons/fa";

// =========================================================
// CONTACT SERVICE
// =========================================================
import { createContact } from "../services/contactService";

export default function Contact() {
  // =========================================================
  // INITIAL FORM STATE
  // =========================================================
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    companyName: "",
    clothingCategory: "Corporate Uniforms",
    quantityTier: "200 - 500 Units",
    deadline: "",
    message: "",
  };

  // =========================================================
  // STATES
  // =========================================================
  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [openFaq, setOpenFaq] = useState(0); // first FAQ open by default

  // =========================================================
  // FAQ (QUESTIONS & ANSWERS)
  // =========================================================
  const faqs = [
    {
      question: "What is your Minimum Order Quantity (MOQ) for custom manufacturing?",
      answer:
        "Our standard minimum order quantity starts at 50 to 100 units per style for pilot batches and promotional orders. For fully customized corporate, school, or hospital uniforms with custom-dyed fabrics, our optimal volume tier begins at 200 units.",
    },
    {
      question: "Can we receive pre-production samples or fabric swatch kits?",
      answer:
        "Yes! Once we review your initial technical pack or specifications, we provide fabric swatch cards showing GSM, weave, and composition. For confirmed bulk orders, we develop a physical pre-production sample (PPS) for your fit and finish approval prior to bulk cutting.",
    },
    {
      question: "What is your standard production turnaround time?",
      answer:
        "Standard production cycles typically range between 12 to 21 business days after sample sign-off and order confirmation, depending on volume and customization complexity. Express turnaround options are available for urgent institutional deadlines.",
    },
    {
      question: "What branding, printing, and embroidery techniques do you provide?",
      answer:
        "We offer high-definition computer embroidery, 3D puff embroidery, screen printing, high-density plastisol prints, DTF (Direct-to-Film) transfers, dye sublimation, woven custom patches, and customized embossed buttons and trims.",
    },
    {
      question: "How do you handle sizing ratios and institutional fit requirements?",
      answer:
        "We provide standardized Indian & international size charts (XS to 5XL) across slim, regular, and relaxed fits. For schools and corporate workforces, we can also supply master sizing sets for employee/student trials before sewing begins.",
    },
    {
      question: "Do you offer doorstep delivery across India and international shipping?",
      answer:
        "Yes, our facility in Hyderabad handles direct dispatch across all Indian states with surface and air-cargo logistics partners. We also facilitate export-compliant packaging and documentation for overseas bulk shipments.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (serverError) {
      setServerError("");
    }
  };

  // =========================================================
  // HANDLE FORM SUBMIT
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    try {
      await createContact(formData);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData(initialFormState);
      }, 6000);
    } catch (err) {
      console.error("Contact submission error:", err);
      setServerError(
        err?.message ||
          "Failed to connect to the manufacturing server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --logo-bg-light: #F4F8FE;
          --logo-card-bg: rgba(255, 255, 255, 0.94);
          --logo-cobalt: #0052FF;
          --logo-cobalt-hover: #003ECC;
          --logo-cyan: #00D4FF;
          --logo-ice: #E8F5FE;
          --logo-text-title: #071838;
          --logo-text-body: #495E7C;
          --logo-text-muted: #64748B;
          --logo-border: rgba(0, 82, 255, 0.14);
          --logo-border-hover: rgba(0, 212, 255, 0.65);
        }

        .vx-contact-page {
          background-color: var(--logo-bg-light);
          color: var(--logo-text-title);
          overflow-x: hidden;
          position: relative;
          min-height: 100vh;
          font-family: system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, sans-serif;
        }

        .vx-contact-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(
              rgba(0, 82, 255, 0.08) 1.2px,
              transparent 1.2px
            ),
            radial-gradient(
              rgba(0, 212, 255, 0.05) 1.2px,
              var(--logo-bg-light) 1.2px
            );
          background-size: 28px 28px;
          background-position: 0 0, 14px 14px;
          pointer-events: none;
          z-index: 1;
        }

        .vx-swoosh-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(95px);
          pointer-events: none;
          z-index: 1;
        }

        .vx-swoosh-glow.top-glow {
          width: min(550px, 90vw);
          height: min(550px, 90vw);
          top: -80px;
          left: -80px;
          background: radial-gradient(
            circle,
            rgba(0, 212, 255, 0.15) 0%,
            rgba(0, 82, 255, 0.06) 50%,
            transparent 70%
          );
        }

        .vx-swoosh-glow.bottom-glow {
          width: min(600px, 95vw);
          height: min(600px, 95vw);
          bottom: -120px;
          right: -80px;
          background: radial-gradient(
            circle,
            rgba(0, 82, 255, 0.12) 0%,
            rgba(0, 212, 255, 0.08) 50%,
            transparent 70%
          );
        }

        .vx-contact-hero {
          position: relative;
          z-index: 2;
          padding: clamp(60px, 9vw, 95px) 0 clamp(40px, 6vw, 65px);
          text-align: center;
          border-bottom: 1px solid var(--logo-border);
          background: radial-gradient(
            circle at 50% 15%,
            rgba(0, 212, 255, 0.12) 0%,
            transparent 70%
          );
        }

        .hero-main-title {
          font-size: clamp(2.1rem, 5.5vw, 3.4rem);
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.2;
          color: var(--logo-text-title);
        }

        .vx-gradient-text {
          background: linear-gradient(
            90deg,
            #0047E0 0%,
            #0084FF 50%,
            #00D4FF 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .vx-glass-chassis {
          background: var(--logo-card-bg);
          border: 1px solid var(--logo-border);
          border-radius: 24px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 16px 45px rgba(0, 48, 143, 0.06);
          position: relative;
          overflow: hidden;
        }

        .vx-glass-chassis::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3.5px;
          background: linear-gradient(
            90deg,
            var(--logo-cobalt),
            var(--logo-cyan),
            transparent
          );
        }

        .vx-info-tile {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid var(--logo-border);
          text-decoration: none;
          color: var(--logo-text-title);
          box-shadow: 0 4px 14px rgba(0, 48, 143, 0.03);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .vx-info-tile:hover {
          transform: translateY(-3px);
          border-color: var(--logo-border-hover);
          background: #ffffff;
          box-shadow: 0 12px 30px rgba(0, 82, 255, 0.12);
          color: var(--logo-text-title);
        }

        .vx-info-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            var(--logo-cobalt) 0%,
            #003ECC 100%
          );
          color: #ffffff;
          font-size: 1.15rem;
          flex-shrink: 0;
          box-shadow: 0 6px 16px rgba(0, 82, 255, 0.28);
        }

        .vx-map-card {
          background: #ffffff;
          border: 1px solid var(--logo-border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 48, 143, 0.05);
          transition: all 0.3s ease;
        }

        .vx-map-card:hover {
          border-color: var(--logo-border-hover);
          box-shadow: 0 14px 35px rgba(0, 82, 255, 0.12);
        }

        .vx-map-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: linear-gradient(
            90deg,
            var(--logo-ice),
            #ffffff
          );
          border-bottom: 1px solid var(--logo-border);
        }

        .vx-map-wrapper {
          width: 100%;
          height: 280px;
          position: relative;
        }

        .vx-map-wrapper iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        .vx-input-field {
          background: #FFFFFF !important;
          border: 1.5px solid var(--logo-border) !important;
          border-radius: 12px !important;
          color: var(--logo-text-title) !important;
          padding: 12px 16px !important;
          font-size: 0.95rem !important;
          transition: all 0.25s ease;
        }

        .vx-input-field:focus {
          border-color: var(--logo-cobalt) !important;
          box-shadow: 0 0 0 3px rgba(0, 82, 255, 0.15) !important;
          outline: none;
        }

        .vx-input-field::placeholder {
          color: #94A3B8;
          font-size: 0.92rem;
        }

        .form-label-custom {
          color: var(--logo-text-title);
          font-size: 0.84rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .vx-btn-order-submit {
          background: linear-gradient(
            135deg,
            var(--logo-cobalt) 0%,
            #0036B3 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: #ffffff;
          font-weight: 700;
          padding: 15px 28px;
          border-radius: 12px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          box-shadow: 0 6px 20px rgba(0, 82, 255, 0.32);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          font-size: 0.95rem;
        }

        .vx-btn-order-submit:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            #0045D8 0%,
            #002D96 100%
          );
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 82, 255, 0.45);
          color: #ffffff;
        }

        .vx-btn-order-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .vx-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* FAQ (Q&A) SECTION STYLING */
        .vx-faq-section {
          position: relative;
          z-index: 2;
          padding: 50px 0 90px;
          border-top: 1px solid var(--logo-border);
        }

        .vx-badge-pill-sub {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          background: var(--logo-ice);
          border: 1px solid rgba(0, 212, 255, 0.4);
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--logo-cobalt);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 14px;
        }

        .vx-faq-item {
          background: #ffffff;
          border: 1px solid var(--logo-border);
          border-radius: 16px;
          margin-bottom: 14px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(0, 48, 143, 0.03);
        }

        .vx-faq-item:hover {
          border-color: var(--logo-border-hover);
        }

        .vx-faq-item.is-active {
          border-color: var(--logo-cobalt);
          box-shadow: 0 8px 24px rgba(0, 82, 255, 0.08);
        }

        .vx-faq-question {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          text-align: left;
          font-size: 1rem;
          font-weight: 700;
          color: var(--logo-text-title);
          cursor: pointer;
        }

        .vx-faq-icon-chevron {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          color: var(--logo-cobalt);
          flex-shrink: 0;
        }

        .vx-faq-item.is-active .vx-faq-icon-chevron {
          transform: rotate(180deg);
        }

        .vx-faq-answer {
          padding: 0 24px 20px 24px;
          color: var(--logo-text-body);
          font-size: 0.92rem;
          line-height: 1.7;
        }

        @media (min-width: 992px) {
          .sticky-lg-column {
            position: sticky;
            top: 90px;
          }
        }
      `}</style>

      <div className="vx-contact-page">
        <div className="vx-swoosh-glow top-glow" />
        <div className="vx-swoosh-glow bottom-glow" />

        {/* =====================================================
            HERO SECTION
        ====================================================== */}
        <section className="vx-contact-hero">
          <div className="container position-relative" style={{ zIndex: 2 }}>
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-main-title mb-3"
            >
              Let's Start Your{" "}
              <span className="vx-gradient-text">Bulk Apparel Order</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto"
              style={{
                maxWidth: "700px",
                fontSize: "1.05rem",
                lineHeight: "1.75",
                color: "var(--logo-text-body)",
                padding: "0 10px",
              }}
            >
              Connect directly with our manufacturing desk for custom
              institutional uniforms, corporate executive wear, school blazers,
              sports kits, and high-volume commercial production.
            </motion.p>
          </div>
        </section>

        {/* =====================================================
            FORM & CONTACT DETAILS
        ====================================================== */}
        <section
          className="py-4 py-md-5 position-relative"
          style={{ zIndex: 2 }}
        >
          <div className="container py-2 py-md-4">
            <div className="row g-4 g-lg-5">
              {/* =================================================
                  LEFT COLUMN
              ================================================= */}
              <div className="col-lg-5">
                <div className="sticky-lg-column">
                  <div className="d-flex flex-column gap-3 mb-4">
                    {/* PHONE */}
                    <a href="tel:+918143324349" className="vx-info-tile">
                      <div className="vx-info-icon-box">
                        <FaPhoneAlt />
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">
                          Direct Procurement Line
                        </h6>

                        <p
                          className="mb-0 fw-bold"
                          style={{ color: "var(--logo-cobalt)" }}
                        >
                          +91 81433 24349
                        </p>

                        <small style={{ color: "var(--logo-text-muted)" }}>
                          Immediate bulk order discussion & WhatsApp
                        </small>
                      </div>
                    </a>

                    {/* EMAIL */}
                    <a
                      href="mailto:contact@voxelnovainnovation.com"
                      className="vx-info-tile"
                    >
                      <div className="vx-info-icon-box">
                        <FaEnvelope />
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">
                          Order Specification Desk
                        </h6>

                        <p
                          className="mb-0 fw-bold"
                          style={{ color: "var(--logo-cobalt)" }}
                        >
                          contact@voxelnovainnovation.com
                        </p>

                        <small style={{ color: "var(--logo-text-muted)" }}>
                          Send CAD sketches, vectors & tech-packs
                        </small>
                      </div>
                    </a>

                    {/* ADDRESS */}
                    <div className="vx-info-tile">
                      <div className="vx-info-icon-box">
                        <FaMapMarkerAlt />
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">Manufacturing Plant</h6>

                        <p
                          className="mb-0"
                          style={{
                            fontSize: "0.88rem",
                            lineHeight: "1.55",
                            color: "var(--logo-text-body)",
                          }}
                        >
                          VOXEL NOVA Apparel & Uniform Facility
                          <br />
                          Chayanapuri, Hyderabad, Telangana – 500047
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MAP */}
                  <div className="vx-map-card mb-4 mb-lg-0">
                    <div className="vx-map-header">
                      <div className="d-flex align-items-center gap-2">
                        <FaMapMarkerAlt style={{ color: "var(--logo-cobalt)" }} />
                        <span className="fw-bold" style={{ fontSize: "0.88rem" }}>
                          Facility Location
                        </span>
                      </div>

                      <a
                        href="https://maps.app.goo.gl/91eQfzdMzbpohBAq9"
                        target="_blank"
                        rel="noreferrer"
                        className="d-flex align-items-center gap-1 text-decoration-none"
                        style={{
                          color: "var(--logo-cobalt)",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                        }}
                      >
                        <span>Open Directions</span>
                        <FaExternalLinkAlt size={10} />
                      </a>
                    </div>

                    <div className="vx-map-wrapper">
                      <iframe
                        title="VOXEL NOVA Hyderabad Plant"
                        src="https://www.google.com/maps?q=Chayanapuri,Hyderabad,Telangana,India&output=embed"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  RIGHT COLUMN - CONTACT FORM
              ================================================= */}
              <div className="col-lg-7">
                <div className="vx-glass-chassis p-4 p-md-5">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <h3
                        className="fw-bold mb-1"
                        style={{
                          fontSize: "clamp(1.25rem, 3vw, 1.65rem)",
                        }}
                      >
                        Request a Bulk Production Quote
                      </h3>

                      <p
                        style={{
                          color: "var(--logo-text-body)",
                          fontSize: "0.90rem",
                        }}
                        className="mb-0"
                      >
                        Specify garments, volume, and target delivery for factory
                        review.
                      </p>
                    </div>

                    <div
                      className="d-none d-sm-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "var(--logo-ice)",
                        color: "var(--logo-cobalt)",
                        border: "1px solid rgba(0, 212, 255, 0.4)",
                      }}
                    >
                      <FaTshirt size={22} />
                    </div>
                  </div>

                  {/* ERROR MESSAGE */}
                  {serverError && (
                    <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 mb-4 rounded-3 border-0">
                      <FaExclamationTriangle className="flex-shrink-0" />
                      <span style={{ fontSize: "0.88rem" }}>{serverError}</span>
                    </div>
                  )}

                  {/* SUCCESS / FORM */}
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success-box"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 p-md-5 text-center rounded-4 my-3"
                        style={{
                          background: "var(--logo-ice)",
                          border: "1.5px solid var(--logo-cobalt)",
                        }}
                      >
                        <FaCheckCircle
                          style={{ color: "var(--logo-cobalt)" }}
                          className="mb-3"
                          size={48}
                        />

                        <h4 className="fw-bold mb-2">Order Docket Initiated!</h4>

                        <p
                          style={{
                            fontSize: "0.92rem",
                            lineHeight: "1.6",
                            color: "var(--logo-text-body)",
                          }}
                          className="mb-0"
                        >
                          Thank you for submitting your specifications. Your
                          order docket has been recorded into our factory
                          pipeline. An account manager will contact you with
                          sample swatches and pricing shortly.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="row g-3">
                        {/* NAME */}
                        <div className="col-12 col-md-6">
                          <label className="form-label form-label-custom">
                            Contact Person / Lead *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Ramesh Reddy"
                            className="form-control vx-input-field"
                          />
                        </div>

                        {/* EMAIL */}
                        <div className="col-12 col-md-6">
                          <label className="form-label form-label-custom">
                            Corporate / Work Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            className="form-control vx-input-field"
                          />
                        </div>

                        {/* PHONE */}
                        <div className="col-12 col-md-6">
                          <label className="form-label form-label-custom">
                            WhatsApp / Mobile Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 81433 24349"
                            className="form-control vx-input-field"
                          />
                        </div>

                        {/* COMPANY */}
                        <div className="col-12 col-md-6">
                          <label className="form-label form-label-custom">
                            Organization / School / Business *
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            required
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Enterprise or Institution Name"
                            className="form-control vx-input-field"
                          />
                        </div>

                        {/* CATEGORY */}
                        <div className="col-12 col-md-6">
                          <label className="form-label form-label-custom">
                            Apparel Product Category
                          </label>
                          <select
                            name="clothingCategory"
                            value={formData.clothingCategory}
                            onChange={handleChange}
                            className="form-select vx-input-field"
                          >
                            <option value="Corporate Uniforms">
                              Corporate Uniforms, Shirts & Blazers
                            </option>
                            <option value="School & College Kits">
                              School Kits, Pinafores & Tracksuits
                            </option>
                            <option value="Medical Uniforms">
                              Medical Scrubs & Antimicrobial Coats
                            </option>
                            <option value="Sports & Jersey Kits">
                              Sports Jerseys & Dri-Fit Activewear
                            </option>
                            <option value="Hospitality Uniforms">
                              Chef Coats, Aprons & Hotel Staff Wear
                            </option>
                            <option value="Custom T-Shirts">
                              Custom T-Shirts, Polos & Promotional Runs
                            </option>
                          </select>
                        </div>

                        {/* QUANTITY */}
                        <div className="col-12 col-md-6">
                          <label className="form-label form-label-custom">
                            Order Volume Tier
                          </label>
                          <select
                            name="quantityTier"
                            value={formData.quantityTier}
                            onChange={handleChange}
                            className="form-select vx-input-field"
                          >
                            <option value="50 - 200 Units">
                              50 – 200 Units (Pilot / Event Batch)
                            </option>
                            <option value="200 - 500 Units">
                              200 – 500 Units (Standard Institutional)
                            </option>
                            <option value="500 - 2,000 Units">
                              500 – 2,000 Units (Commercial Bulk)
                            </option>
                            <option value="2,000 - 10,000+ Units">
                              2,000 – 10,000+ Units (Enterprise Production)
                            </option>
                          </select>
                        </div>

                        {/* DEADLINE */}
                        <div className="col-12">
                          <label className="form-label form-label-custom">
                            Target Delivery / Event Deadline
                          </label>
                          <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="form-control vx-input-field"
                          />
                        </div>

                        {/* MESSAGE */}
                        <div className="col-12">
                          <label className="form-label form-label-custom">
                            Customization, Fabrics & Logo Requirements *
                          </label>
                          <textarea
                            name="message"
                            rows="4"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Specify fabric preferences (e.g. 100% Combed Cotton, Pique Knit), branding style (Screen Print, 3D Embroidery, DTF), sizing ratios, and colorways..."
                            className="form-control vx-input-field"
                          />
                        </div>

                        {/* SUBMIT */}
                        <div className="col-12 mt-4">
                          <button
                            type="submit"
                            disabled={loading}
                            className="btn vx-btn-order-submit"
                          >
                            {loading ? (
                              <>
                                <FaSpinner className="vx-spin" size={16} />
                                <span>Submitting To Factory Desk...</span>
                              </>
                            ) : (
                              <>
                                <span>Submit Bulk Order Enquiry</span>
                                <FaPaperPlane size={14} />
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FAQ (QUESTION & ANSWER) SECTION UNDER THE FORM
        ====================================================== */}
        <section className="vx-faq-section">
          <div className="container">
            <div className="text-center mb-5">
              

              <h2
                className="fw-bold mb-2"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.3rem)" }}
              >
                Questions & Answers
              </h2>

              <p
                className="text-muted mx-auto mb-0"
                style={{ maxWidth: "620px", fontSize: "0.95rem" }}
              >
                Everything you need to know about our bulk apparel manufacturing
                process, sampling, MOQ, lead times, and dispatch logistics.
              </p>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-10">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className={`vx-faq-item ${isOpen ? "is-active" : ""}`}
                    >
                      <button
                        type="button"
                        className="vx-faq-question"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <FaChevronDown
                          size={14}
                          className="vx-faq-icon-chevron"
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.28,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <div className="vx-faq-answer">{faq.answer}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}