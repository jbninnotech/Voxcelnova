import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiTruck,
  FiBox,
  FiMapPin,
  FiLayers,
  FiStar,
  FiArrowRight,
  FiImage,
  FiX,
  FiMessageSquare,
  FiSend,
} from "react-icons/fi";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import clientService from "../services/clientService";

// Hero Background Image Import
import background from "../assets/images/client-banner.png";

const CATEGORIES = [
  "All",
  "School Uniforms",
  "College Uniforms",
  "Corporate Uniforms",
  "Hotel & Hospitality",
  "Hospital & Healthcare",
];

export default function Clients() {
  const [stats, setStats] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Gallery Modal
  const [activeGallery, setActiveGallery] = useState(null);

  // Review Form Modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    author: "",
    designation: "",
    company: "",
    projectDelivered: "",
    rating: 5,
    review: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const [statsRes, projectsRes, reviewsRes] = await Promise.allSettled([
        clientService.getStats(),
        clientService.getProjects("All"),
        clientService.getReviews(false),
      ]);

      if (statsRes.status === "fulfilled" && statsRes.value?.success) {
        setStats(statsRes.value.data);
      }
      if (projectsRes.status === "fulfilled" && projectsRes.value?.success) {
        setProjects(projectsRes.value.data || []);
      }
      if (reviewsRes.status === "fulfilled" && reviewsRes.value?.success) {
        setReviews(reviewsRes.value.data || []);
      }
    } catch (err) {
      console.error("Failed to load clients data:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [projects, selectedCategory]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmittingReview(true);
      setReviewError("");
      const res = await clientService.submitReview(reviewFormData);
      if (res.success) {
        setReviewSuccess("Thank you! Your testimonial has been submitted.");
        setReviewFormData({
          author: "",
          designation: "",
          company: "",
          projectDelivered: "",
          rating: 5,
          review: "",
        });
        setTimeout(() => {
          setShowReviewModal(false);
          setReviewSuccess("");
        }, 2200);
      }
    } catch (err) {
      setReviewError(err?.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="clients-page-root">
      <style>{`
        .clients-page-root {
          --bg-main: #F4F8FE;
          --bg-surface: #FFFFFF;
          --bg-badge-tint: #E8F5FE;
          --color-cobalt: #0052FF;
          --color-cyan: #00D4FF;
          --text-title: #071838;
          --text-body: #495E7C;
          --text-muted: #6B82A0;
          --border-subtle: rgba(0, 82, 255, 0.12);
          --shadow-card: 0 12px 32px rgba(0, 48, 143, 0.06);

          background-color: var(--bg-main);
          color: var(--text-body);
          min-height: 100vh;
        }

        /* ─── Hero Section (Pure Image Background, No Color Overlay) ─── */
        .hero-banner {
          position: relative;
          padding: 95px 20px 65px;
          text-align: center;
          background-color: transparent !important;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-bottom: 1px solid var(--border-subtle);
        }

        .hero-eyebrow {
          display: inline-block;
          font-size: 11.5px;
          letter-spacing: 2px;
          font-weight: 800;
          color: var(--color-cobalt);
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: 99px;
          border: 1px solid rgba(0, 82, 255, 0.15);
          box-shadow: 0 4px 12px rgba(0, 48, 143, 0.06);
        }

        .hero-title {
          font-size: clamp(32px, 5vw, 54px);
          font-weight: 900;
          color: var(--text-title);
          letter-spacing: -1.2px;
          margin: 14px 0 16px;
        }

        .hero-subtitle {
          max-width: 680px;
          margin: 0 auto 38px;
          font-size: 16.5px;
          line-height: 1.65;
          color: var(--text-title);
          font-weight: 500;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 18px;
          padding: 22px 18px;
          box-shadow: 0 12px 32px rgba(0, 48, 143, 0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(0, 48, 143, 0.12);
        }

        .stat-val {
          font-size: 34px;
          font-weight: 900;
          color: var(--color-cobalt);
          letter-spacing: -1px;
        }

        .stat-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .category-nav {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 10px 0 25px;
          scrollbar-width: none;
        }
        .category-nav::-webkit-scrollbar { display: none; }

        .category-pill {
          white-space: nowrap;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-body);
          padding: 9px 20px;
          border-radius: 99px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .category-pill.active {
          background: var(--color-cobalt);
          color: #ffffff;
          border-color: var(--color-cobalt);
          box-shadow: 0 6px 18px rgba(0, 82, 255, 0.25);
        }

        .project-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0, 48, 143, 0.12);
        }

        .project-img-wrapper {
          position: relative;
          aspect-ratio: 16 / 10;
          background: #EEF3FA;
          overflow: hidden;
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .project-card:hover .project-img {
          transform: scale(1.05);
        }

        .project-badge-pill {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(7, 24, 56, 0.85);
          backdrop-filter: blur(6px);
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.8px;
        }

        .gallery-count-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(6px);
          color: var(--text-title);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 99px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        .project-content {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .spec-item strong {
          color: var(--text-title);
        }

        .review-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 24px;
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(7, 24, 56, 0.85);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
      `}</style>

      {/* 1. HERO SECTION (ONLY BACKGROUND IMAGE) */}
      <section
        className="hero-banner"
        style={{
          backgroundImage: `url("${background}")`,
        }}
      >
        <div className="container position-relative" style={{ zIndex: 1 }}>
        
          <h1 className="hero-title">Our Clients & Manufacturing Proof</h1>
          <p className="hero-subtitle">
            Supplying India’s prestigious schools, leading colleges, luxury hotel chains, and corporate enterprises with custom-manufactured institutional attire.
          </p>

          {stats.length > 0 && (
            <div className="stats-grid">
              {stats.map((s, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-val">{s.val}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. DELIVERIES SHOWCASE */}
      <section className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "var(--text-title)", fontSize: "28px" }}>
              Manufactured Deliveries Showcase
            </h2>
            <p className="small mb-0 text-muted">
              Real institutional batch productions delivered by Voxcel Nova
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="btn btn-outline-primary d-flex align-items-center gap-2 rounded-pill px-4 py-2 fw-bold"
          >
            <FiMessageSquare /> Submit Partner Review
          </button>
        </div>

        {/* Filter Chips */}
        <div className="category-nav">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-5 text-muted">Loading completed client deliveries...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No delivery records found for this category.
          </div>
        ) : (
          <div className="row g-4">
            {filteredProjects.map((p) => (
              <div key={p._id} className="col-12 col-md-6 col-lg-4">
                <article className="project-card">
                  <div className="project-img-wrapper">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="project-img"
                      loading="lazy"
                    />

                    {p.badge && <span className="project-badge-pill">{p.badge}</span>}

                    {p.gallery && p.gallery.length > 0 && (
                      <div
                        className="gallery-count-badge"
                        onClick={() => setActiveGallery(p)}
                        title="Click to view delivery proof photos"
                      >
                        <FiImage size={13} />
                        <span>{p.gallery.length} Delivery Photos</span>
                      </div>
                    )}
                  </div>

                  <div className="project-content">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span
                        className="badge px-3 py-1"
                        style={{
                          backgroundColor: "var(--bg-badge-tint)",
                          color: "var(--color-cobalt)",
                        }}
                      >
                        {p.category}
                      </span>
                      <small className="text-muted fw-semibold">
                        <FiMapPin className="me-1" />
                        {p.location || "Pan India"}
                      </small>
                    </div>

                    <h3
                      className="fw-bold mb-1"
                      style={{ fontSize: "18px", color: "var(--text-title)" }}
                    >
                      {p.title}
                    </h3>
                    <div className="small fw-bold text-primary mb-3">{p.client}</div>

                    <div className="border-top pt-3 mt-auto">
                      <div className="spec-item">
                        <FiBox size={14} className="text-primary" />
                        <span>Volume: <strong>{p.volume}</strong></span>
                      </div>
                      <div className="spec-item">
                        <FiLayers size={14} className="text-primary" />
                        <span>Fabric: <strong>{p.fabric}</strong></span>
                      </div>
                      <div className="spec-item">
                        <FiTruck size={14} className="text-success" />
                        <span>Status: <strong>{p.deliveryDate || "Completed"}</strong></span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. TESTIMONIALS & REVIEWS SECTION */}
      <section className="py-5" style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="hero-eyebrow">Client Feedback</span>
            <h2 className="fw-bold mt-1" style={{ color: "var(--text-title)", fontSize: "30px" }}>
              Verified Institutional Reviews
            </h2>
            <p className="text-muted small">
              What principals, sourcing heads, and operations executives say about our bulk uniform manufacturing.
            </p>
          </div>

          <div className="row g-4">
            {reviews.slice(0, 6).map((rev) => (
              <div key={rev._id} className="col-12 col-md-6 col-lg-4">
                <div className="review-card">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex gap-1 text-warning">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <FaStar key={i} size={14} />
                        ))}
                      </div>
                      <FaQuoteLeft size={20} color="var(--border-subtle)" />
                    </div>

                    <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-body)" }}>
                      "{rev.review}"
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-3 pt-3 border-top mt-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="rounded-circle object-fit-cover shadow-sm"
                      style={{ width: "45px", height: "45px" }}
                    />
                    <div>
                      <div className="fw-bold small" style={{ color: "var(--text-title)" }}>
                        {rev.author}
                      </div>
                      <div className="text-muted" style={{ fontSize: "12px" }}>
                        {rev.designation}, <strong>{rev.company}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY LIGHTBOX MODAL */}
      {activeGallery && (
        <div className="lightbox-overlay" onClick={() => setActiveGallery(null)}>
          <div
            className="bg-white rounded-4 p-4 shadow-lg position-relative"
            style={{ maxWidth: "850px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
              <div>
                <h5 className="fw-bold mb-0 text-dark">{activeGallery.title}</h5>
                <small className="text-primary fw-semibold">{activeGallery.client} — Delivery Proofs</small>
              </div>
              <button
                className="btn btn-sm btn-light border-0"
                onClick={() => setActiveGallery(null)}
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="row g-3">
              {activeGallery.gallery.map((imgUrl, index) => (
                <div key={index} className="col-12 col-sm-6">
                  <div className="rounded-3 overflow-hidden border shadow-sm">
                    <img
                      src={imgUrl}
                      alt={`Delivery Proof ${index + 1}`}
                      style={{ width: "100%", height: "240px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. SUBMIT REVIEW MODAL */}
      {showReviewModal && (
        <div className="lightbox-overlay" onClick={() => setShowReviewModal(false)}>
          <div
            className="bg-white rounded-4 p-4 shadow-lg"
            style={{ maxWidth: "550px", width: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
              <h5 className="fw-bold mb-0 text-dark">Submit Client Partner Review</h5>
              <button
                className="btn btn-sm btn-light border-0"
                onClick={() => setShowReviewModal(false)}
              >
                <FiX size={20} />
              </button>
            </div>

            {reviewSuccess && <div className="alert alert-success py-2">{reviewSuccess}</div>}
            {reviewError && <div className="alert alert-danger py-2">{reviewError}</div>}

            <form onSubmit={handleReviewSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={reviewFormData.author}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, author: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Principal / Procurement Head"
                    className="form-control"
                    value={reviewFormData.designation}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, designation: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold">School / Company / Institution *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={reviewFormData.company}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, company: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold">Rating</label>
                  <select
                    className="form-select"
                    value={reviewFormData.rating}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, rating: Number(e.target.value) })}
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Great Experience</option>
                    <option value={3}>3 Stars - Satisfied</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold">Review Remarks *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share your experience regarding fabric quality, stitch precision, and delivery timeline..."
                    className="form-control"
                    value={reviewFormData.review}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, review: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-4 pt-2 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="btn btn-primary px-4 fw-bold"
                  style={{ backgroundColor: "var(--color-cobalt)" }}
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}