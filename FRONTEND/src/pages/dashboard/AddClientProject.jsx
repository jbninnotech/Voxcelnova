import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiUploadCloud, FiImage, FiTrash2 } from "react-icons/fi";
import clientService from "../../services/clientService";

export default function AddClientProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    category: "School Uniforms",
    volume: "",
    fabric: "",
    location: "Pan India",
    deliveryDate: "Completed 2026",
    badge: "DELIVERED",
    description: "",
  });

  const [primaryImage, setPrimaryImage] = useState(null);
  const [primaryPreview, setPrimaryPreview] = useState("");

  const [clientLogo, setClientLogo] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePrimaryChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrimaryImage(file);
      setPrimaryPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
    setGalleryPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!primaryImage) {
      setError("Primary showcase image is required!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const fd = new FormData();
      Object.keys(formData).forEach((key) => {
        fd.append(key, formData[key]);
      });

      fd.append("image", primaryImage);
      if (clientLogo) fd.append("clientLogo", clientLogo);
      if (galleryFiles && galleryFiles.length > 0) {
        galleryFiles.forEach((file) => fd.append("gallery", file));
      }

      const res = await clientService.createProject(fd);
      if (res.success) {
        navigate("/dashboard/client-projects");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to publish project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#F4F8FE", minHeight: "100vh" }}>
      <div className="mb-4">
        <Link
          to="/dashboard/client-projects"
          className="d-inline-flex align-items-center gap-2 text-decoration-none fw-semibold"
          style={{ color: "#0052FF" }}
        >
          <FiArrowLeft /> Back to Client Projects
        </Link>
        <h3 className="fw-bold mt-2 text-dark">Add New Client Delivery Project</h3>
        <p className="text-muted small">
          Showcase a completed client uniform order with batch scale and Cloudinary photos
        </p>
      </div>

      {error && <div className="alert alert-danger py-2 px-3 rounded-3 mb-3">{error}</div>}

      <div className="card border-0 rounded-4 shadow-sm p-4" style={{ maxWidth: "900px", backgroundColor: "#FFFFFF" }}>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Project Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Springfield High Uniform Batch"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Client / Institution Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Springfield Public School"
                className="form-control"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">Category *</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="School Uniforms">School Uniforms</option>
                <option value="College Uniforms">College Uniforms</option>
                <option value="Corporate Uniforms">Corporate Uniforms</option>
                <option value="Hotel & Hospitality">Hotel & Hospitality</option>
                <option value="Hospital & Healthcare">Hospital & Healthcare</option>
                <option value="Industrial Workwear">Industrial Workwear</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">Batch Volume Delivered *</label>
              <input
                type="text"
                required
                placeholder="e.g. 8,500 Sets Delivered"
                className="form-control"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">Badge / Tag</label>
              <input
                type="text"
                placeholder="e.g. K-12 READY, BESTSELLER"
                className="form-control"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Fabric Specifications *</label>
              <input
                type="text"
                required
                placeholder="e.g. Poly-Cotton Wrinkle-Free Twill"
                className="form-control"
                value={formData.fabric}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Delivery City / Location</label>
              <input
                type="text"
                placeholder="e.g. Bengaluru, India"
                className="form-control"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Delivery Details & Scope</label>
              <textarea
                rows={3}
                placeholder="Description of items delivered (blazers, shirts, skirts, embroidery)..."
                className="form-control"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* PRIMARY IMAGE UPLOAD & PREVIEW */}
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Primary Showcase Image *</label>
              <input
                type="file"
                required
                accept="image/*"
                className="form-control"
                onChange={handlePrimaryChange}
              />
              {primaryPreview && (
                <div className="mt-2 position-relative rounded-3 overflow-hidden border" style={{ height: "130px" }}>
                  <img src={primaryPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>

            {/* CLIENT LOGO */}
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Client Institution Logo (Optional)</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setClientLogo(e.target.files[0])}
              />
            </div>

            {/* DELIVERY GALLERY PHOTOS */}
            <div className="col-12">
              <label className="form-label small fw-semibold">
                Delivery Proof Photos / Gallery (Upload up to 6 photos)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="form-control"
                onChange={handleGalleryChange}
              />
              {galleryPreviews.length > 0 && (
                <div className="d-flex gap-2 flex-wrap mt-2">
                  {galleryPreviews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Thumb"
                      className="rounded-3 border object-fit-cover"
                      style={{ width: "70px", height: "70px" }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-top d-flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary d-inline-flex align-items-center gap-2 px-4 py-2 fw-bold"
              style={{ backgroundColor: "#0052FF" }}
            >
              <FiUploadCloud size={18} />
              {loading ? "Uploading to Cloudinary..." : "Publish Client Delivery"}
            </button>
            <button
              type="button"
              className="btn btn-light border px-4"
              onClick={() => navigate("/dashboard/client-projects")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}