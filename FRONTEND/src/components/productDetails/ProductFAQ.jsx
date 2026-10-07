import React, { useState } from "react";
import {
  FiChevronDown,
  FiBox,
  FiEdit,
  FiLayers,
  FiDroplet,
  FiClock,
  FiHelpCircle,
} from "react-icons/fi";

const ProductFAQ = () => {
  const [active, setActive] = useState(0); // Opens the first question by default

  const faqs = [
    {
      icon: <FiBox />,
      category: "Ordering",
      question: "Can I order this product in bulk?",
      answer:
        "Yes. VOXEL NOVA supports bulk manufacturing for schools, colleges, corporates, hospitals, hotels, sports teams, and large events with tiered wholesale pricing.",
    },
    {
      icon: <FiEdit />,
      category: "Branding",
      question: "Can I add my company or school logo?",
      answer:
        "Yes. High-definition screen printing, computer embroidery, heat-transfer vinyl (DTF), and silicone patch customization are available depending on the product.",
    },
    {
      icon: <FiLayers />,
      category: "MOQ",
      question: "What is the minimum order quantity?",
      answer:
        "The minimum quantity can vary by product. Standard catalog apparel starts at lower MOQs, while custom dyed or spun fabrics require bulk volume. Contact us for product-specific MOQs.",
    },
    {
      icon: <FiDroplet />,
      category: "Colors & Fabric",
      question: "Can I request custom colors?",
      answer:
        "Yes. Pantone color matching and custom fabric dyeing are available for bulk manufacturing orders depending on order volume and material composition.",
    },
    {
      icon: <FiClock />,
      category: "Turnaround",
      question: "How long does a bulk order take?",
      answer:
        "Standard production takes 7 to 14 business days depending on design complexity, stitching requirements, and sample approvals. Expedited dispatch can be arranged upon request.",
    },
  ];

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <div className="product-faq-wrapper">
      {/* Modern Accordion & Smooth Expand Styles */}
      <style>{`
        .faq-item {
          transition: all 0.28s ease;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
        }

        .faq-item:hover {
          border-color: #CBD5E1;
        }

        .faq-item.is-active {
          border-color: #93C5FD;
          box-shadow: 0 4px 20px -4px rgba(37, 99, 235, 0.08);
        }

        /* Smooth CSS grid expand (no clipping or sudden pop) */
        .faq-answer-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-answer-wrapper.show {
          grid-template-rows: 1fr;
        }

        .faq-answer-inner {
          overflow: hidden;
        }

        .chevron-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #F8FAFC;
          color: #64748B;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-item.is-active .chevron-circle {
          background: #EFF6FF;
          color: #2563EB;
          transform: rotate(180deg);
        }

        .category-badge {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: 6px;
          background: #F1F5F9;
          color: #475569;
        }

        .faq-item.is-active .category-badge {
          background: #DBEAFE;
          color: #1E40AF;
        }
      `}</style>

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: "26px", height: "26px", background: "#EFF6FF", color: "#2563EB" }}
          >
            <FiHelpCircle size={15} />
          </div>
          <h6 className="mb-0 fw-bold" style={{ color: "#0F172A", fontSize: "15px" }}>
            Frequently Asked Questions
          </h6>
        </div>
        <span className="small text-muted" style={{ fontSize: "11.5px" }}>
          VOXEL NOVA Bulk Support
        </span>
      </div>

      {/* Accordion List */}
      <div className="d-flex flex-column gap-2">
        {faqs.map((faq, index) => {
          const isOpen = active === index;

          return (
            <div
              key={index}
              className={`faq-item rounded-3 overflow-hidden ${isOpen ? "is-active" : ""}`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-100 border-0 d-flex align-items-center justify-content-between text-start px-3 py-3"
                style={{ background: "transparent", cursor: "pointer" }}
              >
                <div className="d-flex align-items-center gap-2 pe-3">
                  <span className="category-badge d-none d-sm-inline-flex align-items-center gap-1">
                    {faq.icon}
                    {faq.category}
                  </span>
                  <span
                    style={{
                      fontSize: "13.5px",
                      fontWeight: isOpen ? 700 : 600,
                      color: isOpen ? "#1E40AF" : "#0F172A",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {faq.question}
                  </span>
                </div>

                <div className="chevron-circle flex-shrink-0 d-flex align-items-center justify-content-center">
                  <FiChevronDown size={17} />
                </div>
              </button>

              {/* Animated Answer Body */}
              <div className={`faq-answer-wrapper ${isOpen ? "show" : ""}`}>
                <div className="faq-answer-inner">
                  <div
                    className="px-3 pb-3 pt-1"
                    style={{
                      color: "#475569",
                      fontSize: "13px",
                      lineHeight: 1.7,
                      borderTop: "1px dashed #E2E8F0",
                      marginTop: "-2px",
                      paddingTop: "12px",
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini Help Banner */}
      <div
        className="mt-3 p-3 rounded-3 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2"
        style={{
          background: "#F8FAFC",
          border: "1px dashed #CBD5E1",
        }}
      >
        <div>
          <span className="fw-semibold d-block" style={{ fontSize: "12.5px", color: "#0F172A" }}>
            Have a custom apparel requirement?
          </span>
          <span className="text-muted" style={{ fontSize: "11.5px" }}>
            Our merchandising team will review fabric, GSM, and print specs.
          </span>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-primary rounded-pill px-3 py-1 flex-shrink-0 align-self-start align-self-sm-center"
          style={{
            fontSize: "12px",
            fontWeight: 600,
            background: "#2563EB",
            borderColor: "#2563EB",
          }}
          onClick={() => alert("Redirecting to Bulk Quotation Form")}
        >
          Request Bulk Quote
        </button>
      </div>
    </div>
  );
};

export default ProductFAQ;