import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaBan,
  FaStar,
  FaSync,
  FaCloudUploadAlt,
} from "react-icons/fa";
import clientService from "../../services/clientService";

export default function AdminClientReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    author: "",
    designation: "",
    company: "",
    projectDelivered: "",
    rating: 5,
    review: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await clientService.getReviews(true);
      if (res && res.success) {
        setReviews(res.data || []);
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Failed to load client reviews.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");

      const fd = new FormData();
      fd.append("author", formData.author);
      fd.append("designation", formData.designation);
      fd.append("company", formData.company);
      fd.append("projectDelivered", formData.projectDelivered);
      fd.append("rating", formData.rating);
      fd.append("review", formData.review);

      if (avatarFile) fd.append("avatar", avatarFile);
      if (companyLogoFile) fd.append("companyLogo", companyLogoFile);

      const res = await clientService.adminCreateReview(fd);

      if (res && res.success) {
        setSuccess("Client review published successfully!");
        setShowModal(false);
        setFormData({
          author: "",
          designation: "",
          company: "",
          projectDelivered: "",
          rating: 5,
          review: "",
        });
        setAvatarFile(null);
        setCompanyLogoFile(null);
        fetchReviews();
        setTimeout(() => setSuccess(""), 3500);
      } else {
        setError(res?.message || "Failed to create review.");
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Failed to create review.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleApproval = async (id) => {
    try {
      const res = await clientService.toggleReviewApproval(id);
      if (res && res.success) {
        setSuccess(res.message || "Review status updated.");
        fetchReviews();
        setTimeout(() => setSuccess(""), 3500);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to toggle review status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await clientService.deleteReview(id);
      if (res && res.success) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
        setSuccess("Review deleted successfully.");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete review.");
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#F4F8FE", minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "#071838" }}>
            Client Reviews & Testimonials
          </h3>
          <p className="small mb-0" style={{ color: "#6B82A0" }}>
            Approve, publish, and manage verified institutional reviews shown on the public site
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={fetchReviews}
            className="btn btn-outline-secondary d-flex align-items-center gap-1 rounded-3 px-3 py-2"
          >
            <FaSync size={12} className={loading ? "fa-spin" : ""} /> Refresh
          </button>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="btn d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-semibold text-white shadow-sm"
            style={{ backgroundColor: "#0052FF" }}
          >
            <FaPlus size={12} /> Add Client Review
          </button>
        </div>
      </div>

      {success && <div className="alert alert-success py-2 px-3 mb-3 rounded-3">{success}</div>}
      {error && <div className="alert alert-danger py-2 px-3 mb-3 rounded-3">{error}</div>}

      {/* Reviews Table */}
      <div
        className="card border-0 rounded-4 overflow-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 82, 255, 0.14)",
          boxShadow: "0 12px 32px rgba(0, 48, 143, 0.06)",
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead style={{ backgroundColor: "#E8F5FE" }}>
              <tr style={{ color: "#6B82A0", fontSize: "12px" }}>
                <th className="py-3 px-4">REVIEWER</th>
                <th>COMPANY / INSTITUTION</th>
                <th>RATING</th>
                <th>TESTIMONIAL REMARKS</th>
                <th>STATUS</th>
                <th className="text-end px-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    Loading client reviews...
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No reviews found. Click <strong>"+ Add Client Review"</strong> to create one.
                  </td>
                </tr>
              ) : (
                reviews.map((item) => (
                  <tr key={item._id} style={{ borderBottom: "1px solid rgba(0, 82, 255, 0.08)" }}>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={
                            item.avatar ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                          }
                          alt={item.author}
                          className="rounded-circle object-fit-cover shadow-sm"
                          style={{ width: "42px", height: "42px" }}
                        />
                        <div>
                          <div className="fw-bold" style={{ color: "#071838" }}>
                            {item.author}
                          </div>
                          <small className="text-muted">{item.designation}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold small text-dark">{item.company || "Enterprise Partner"}</div>
                      {item.projectDelivered && (
                        <small className="text-primary d-block" style={{ fontSize: "11px" }}>
                          {item.projectDelivered}
                        </small>
                      )}
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1 text-warning fw-bold">
                        <FaStar size={13} />
                        <span>{item.rating || 5}</span>
                      </div>
                    </td>
                    <td className="small text-secondary" style={{ maxWidth: "340px" }}>
                      "{item.review}"
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-1 ${
                          item.isApproved !== false
                            ? "bg-success-subtle text-success border border-success-subtle"
                            : "bg-warning-subtle text-warning border border-warning-subtle"
                        }`}
                      >
                        {item.isApproved !== false ? "Approved" : "Hidden"}
                      </span>
                    </td>
                    <td className="text-end px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleApproval(item._id)}
                        className={`btn btn-sm ${
                          item.isApproved !== false ? "btn-outline-warning" : "btn-outline-success"
                        } me-2 border-0`}
                        title={item.isApproved !== false ? "Hide Review" : "Approve Review"}
                      >
                        {item.isApproved !== false ? <FaBan size={14} /> : <FaCheckCircle size={14} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-outline-danger border-0"
                        title="Delete Review"
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE REVIEW MODAL */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">Add Verified Client Review</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleCreateReview}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Reviewer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Mehta"
                      className="form-control"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Designation *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Principal / Director"
                        className="form-control"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Institution / Company *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Springfield Public School"
                        className="form-control"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Delivered Project Reference (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 8,500 School Uniform Sets Batch 2026"
                      className="form-control"
                      value={formData.projectDelivered}
                      onChange={(e) => setFormData({ ...formData, projectDelivered: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Rating</label>
                    <select
                      className="form-select"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Good</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Testimonial Text *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Enter review remarks regarding fabric, stitching, and on-time dispatch..."
                      className="form-control"
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    />
                  </div>
                  <div className="row g-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Reviewer Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setAvatarFile(e.target.files[0])}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Company Logo</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setCompanyLogoFile(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary d-inline-flex align-items-center gap-2 fw-bold px-4"
                    style={{ backgroundColor: "#0052FF" }}
                  >
                    <FaCloudUploadAlt size={16} />
                    {submitting ? "Uploading to Cloudinary..." : "Publish Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}