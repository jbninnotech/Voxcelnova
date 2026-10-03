import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaStar,
  FaSync,
  FaCloudUploadAlt,
} from "react-icons/fa";
import clientService from "../../services/clientService";

export default function AdminClientFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    author: "",
    company: "",
    designation: "",
    rating: 5,
    feedback: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await clientService.getFeedbacks(true);
      if (res && res.success) {
        setFeedbacks(res.data || []);
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Failed to load feedbacks.");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateFeedback = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");

      const fd = new FormData();
      fd.append("author", formData.author);
      fd.append("company", formData.company);
      fd.append("designation", formData.designation);
      fd.append("rating", formData.rating);
      fd.append("feedback", formData.feedback);
      if (avatarFile) fd.append("avatar", avatarFile);

      const res = await clientService.createFeedback(fd);

      if (res && res.success) {
        setSuccess("Client feedback added successfully!");
        setShowModal(false);
        setFormData({
          author: "",
          company: "",
          designation: "",
          rating: 5,
          feedback: "",
        });
        setAvatarFile(null);
        setAvatarPreview("");
        fetchFeedbacks();
        setTimeout(() => setSuccess(""), 3500);
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Failed to save feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await clientService.toggleFeedbackPublication(id);
      if (res && res.success) {
        setSuccess(res.message || "Feedback publication status updated.");
        fetchFeedbacks();
        setTimeout(() => setSuccess(""), 3500);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to toggle status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const res = await clientService.deleteFeedback(id);
      if (res && res.success) {
        setFeedbacks((prev) => prev.filter((f) => f._id !== id));
        setSuccess("Feedback deleted.");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete feedback.");
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#F4F8FE", minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "#071838" }}>
            Client Feedbacks Management
          </h3>
          <p className="small mb-0" style={{ color: "#6B82A0" }}>
            Review, publish, and record institutional feedback from client partners
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={fetchFeedbacks}
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
            <FaPlus size={12} /> Add Client Feedback
          </button>
        </div>
      </div>

      {success && <div className="alert alert-success py-2 px-3 mb-3 rounded-3">{success}</div>}
      {error && <div className="alert alert-danger py-2 px-3 mb-3 rounded-3">{error}</div>}

      {/* Feedbacks Table */}
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
                <th className="py-3 px-4">CLIENT AUTHOR</th>
                <th>COMPANY / INSTITUTION</th>
                <th>RATING</th>
                <th>FEEDBACK REMARKS</th>
                <th>STATUS</th>
                <th className="text-end px-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    Loading client feedbacks...
                  </td>
                </tr>
              ) : feedbacks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No client feedback found. Click <strong>"+ Add Client Feedback"</strong> to add one.
                  </td>
                </tr>
              ) : (
                feedbacks.map((item) => (
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
                          <small className="text-muted">{item.designation || "Client Partner"}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold small text-dark">{item.company || "Enterprise Institution"}</div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1 text-warning fw-bold">
                        <FaStar size={13} />
                        <span>{item.rating || 5}</span>
                      </div>
                    </td>
                    <td className="small text-secondary" style={{ maxWidth: "340px" }}>
                      "{item.feedback}"
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-1 ${
                          item.isPublished
                            ? "bg-success-subtle text-success border border-success-subtle"
                            : "bg-secondary-subtle text-secondary"
                        }`}
                      >
                        {item.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </td>
                    <td className="text-end px-4">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(item._id)}
                        className="btn btn-sm btn-outline-secondary me-2 border-0"
                        title={item.isPublished ? "Unpublish from public view" : "Publish to public view"}
                      >
                        {item.isPublished ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-outline-danger border-0"
                        title="Delete Feedback"
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

      {/* CREATE FEEDBACK MODAL */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">Add Client Feedback</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleCreateFeedback}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Author / Client Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      className="form-control"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Designation</label>
                      <input
                        type="text"
                        placeholder="e.g. Operations Head"
                        className="form-control"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Company / Institution</label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Hospital Group"
                        className="form-control"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
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
                    <label className="form-label small fw-semibold">Feedback Remarks *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Enter feedback on uniform quality, lead time, stitch precision..."
                      className="form-control"
                      value={formData.feedback}
                      onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Profile Photo (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={handleAvatarChange}
                    />
                    {avatarPreview && (
                      <img
                        src={avatarPreview}
                        alt="Preview"
                        className="rounded-circle mt-2 object-fit-cover shadow-sm border"
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
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
                    {submitting ? "Saving..." : "Save Feedback"}
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