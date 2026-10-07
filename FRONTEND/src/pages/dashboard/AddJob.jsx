import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaBriefcase,
  FaPlus,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("accessToken")
  );
};

const initialForm = {
  title: "",
  slug: "",
  department: "",
  location: "",
  jobType: "Full Time",
  experience: "Fresher",
  salary: "Competitive",
  description: "",
  responsibilities: [""],
  requirements: [""],
  skills: [""],
  education: "",
  openings: 1,
  applicationDeadline: "",
  isActive: true,
  featured: false,
};

export default function AddJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // =========================================================
  // GENERATE SLUG
  // =========================================================
  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // =========================================================
  // HANDLE INPUT
  // =========================================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setForm((previous) => ({
      ...previous,
      title: value,
      slug: isEditMode ? previous.slug : generateSlug(value),
    }));
  };

  // =========================================================
  // ARRAY FIELD LOGIC
  // =========================================================
  const handleArrayChange = (field, index, value) => {
    setForm((previous) => {
      const updated = [...previous[field]];
      updated[index] = value;
      return { ...previous, [field]: updated };
    });
  };

  const addArrayField = (field) => {
    setForm((previous) => ({
      ...previous,
      [field]: [...previous[field], ""],
    }));
  };

  const removeArrayField = (field, index) => {
    setForm((previous) => {
      const updated = previous[field].filter((_, itemIndex) => itemIndex !== index);
      return {
        ...previous,
        [field]: updated.length > 0 ? updated : [""],
      };
    });
  };

  // =========================================================
  // FETCH JOB FOR EDIT
  // =========================================================
  useEffect(() => {
    if (!isEditMode) return;

    const fetchJob = async () => {
      try {
        setFetching(true);
        const token = getToken();

        const response = await fetch(`${API_URL}/careers/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch job.");
        }

        const job = data.job;
        setForm({
          title: job.title || "",
          slug: job.slug || "",
          department: job.department || "",
          location: job.location || "",
          jobType: job.jobType || "Full Time",
          experience: job.experience || "Fresher",
          salary: job.salary || "Competitive",
          description: job.description || "",
          responsibilities: job.responsibilities?.length
            ? job.responsibilities
            : [""],
          requirements: job.requirements?.length
            ? job.requirements
            : [""],
          skills: job.skills?.length ? job.skills : [""],
          education: job.education || "",
          openings: job.openings || 1,
          applicationDeadline: job.applicationDeadline
            ? new Date(job.applicationDeadline).toISOString().split("T")[0]
            : "",
          isActive: job.isActive !== false,
          featured: job.featured === true,
        });
      } catch (error) {
        console.error("Fetch job error:", error);
        alert(error.message);
        navigate("/dashboard/jobs");
      } finally {
        setFetching(false);
      }
    };

    fetchJob();
  }, [id, isEditMode, navigate]);

  // =========================================================
  // SUBMIT
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const cleanResponsibilities = form.responsibilities
        .map((item) => item.trim())
        .filter(Boolean);
      const cleanRequirements = form.requirements
        .map((item) => item.trim())
        .filter(Boolean);
      const cleanSkills = form.skills
        .map((item) => item.trim())
        .filter(Boolean);

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || generateSlug(form.title),
        department: form.department.trim(),
        location: form.location.trim(),
        jobType: form.jobType,
        experience: form.experience.trim(),
        salary: form.salary.trim(),
        description: form.description.trim(),
        responsibilities: cleanResponsibilities,
        requirements: cleanRequirements,
        skills: cleanSkills,
        education: form.education.trim(),
        openings: Number(form.openings) || 1,
        applicationDeadline: form.applicationDeadline || null,
        isActive: form.isActive,
        featured: form.featured,
      };

      const url = isEditMode ? `${API_URL}/careers/${id}` : `${API_URL}/careers`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to save job.");
      }

      alert(
        data.message ||
          (isEditMode
            ? "Job updated successfully."
            : "Job created successfully.")
      );

      navigate("/dashboard/jobs");
    } catch (error) {
      console.error("Save job error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOADING STATE
  // =========================================================
  if (fetching) {
    return (
      <div className="admin-loading-screen">
        <div className="text-center animate-fade-in">
          <div className="spinner-orbit mb-3" />
          <div className="fw-semibold text-muted">Loading job information...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-jobs-wrapper">
      {/* SCOPED ANIMATIONS & CSS VARIABLES */}
      <style>{`
        :root {
          --bg-main: #F4F8FE;
          --bg-surface: #FFFFFF;
          --bg-badge-tint: #E8F5FE;
          --color-cobalt: #0052FF;
          --color-cobalt-hover: #003ECC;
          --color-cyan: #00D4FF;
          --text-title: #071838;
          --text-body: #495E7C;
          --text-muted: #6B82A0;
          --border-subtle: rgba(0, 82, 255, 0.12);
          --border-hover: rgba(0, 212, 255, 0.60);
          --shadow-card: 0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow: 0 8px 25px rgba(0, 82, 255, 0.28);
        }

        .admin-jobs-wrapper {
          min-height: 100vh;
          background-color: var(--bg-main);
          color: var(--text-body);
          padding: 35px 24px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          animation: pageFadeIn 0.4s ease-out;
        }

        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Header Back Button */
        .btn-back-nav {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-surface);
          color: var(--text-body);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          box-shadow: var(--shadow-card);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }
        .btn-back-nav:hover {
          background: var(--bg-badge-tint);
          color: var(--color-cobalt);
          transform: translateX(-3px);
          border-color: var(--border-hover);
        }

        /* Card Section Styles */
        .admin-section-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-card);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .admin-section-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 16px 36px rgba(0, 82, 255, 0.08);
        }

        /* Inputs & Selects */
        .admin-form-control {
          background-color: #FFFFFF;
          border: 1.5px solid var(--border-subtle);
          color: var(--text-title);
          border-radius: 12px;
          padding: 11px 16px;
          font-size: 14px;
          transition: all 0.2s ease-in-out;
        }
        .admin-form-control:focus {
          background-color: #FFFFFF;
          border-color: var(--color-cobalt);
          box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.12);
          color: var(--text-title);
          outline: none;
        }
        .admin-form-control::placeholder {
          color: var(--text-muted);
          opacity: 0.7;
        }

        /* Dynamic Array Badges & Actions */
        .array-counter {
          width: 42px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-badge-tint);
          color: var(--color-cobalt);
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
          border: 1px solid var(--border-subtle);
        }
        .btn-trash-action {
          width: 44px;
          height: 44px;
          background: #FFF1F2;
          color: #E11D48;
          border: 1px solid rgba(225, 29, 72, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .btn-trash-action:hover {
          background: #E11D48;
          color: #FFFFFF;
          transform: scale(1.05);
        }
        .btn-add-item {
          background: var(--bg-badge-tint);
          color: var(--color-cobalt);
          border: 1px dashed var(--color-cobalt);
          padding: 10px 18px;
          font-weight: 600;
          font-size: 13px;
          border-radius: 12px;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-add-item:hover {
          background: var(--color-cobalt);
          color: #FFFFFF;
          border-style: solid;
          box-shadow: var(--shadow-glow);
          transform: translateY(-1px);
        }

        /* Submit Buttons */
        .btn-primary-action {
          background: linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cobalt-hover) 100%);
          color: #FFFFFF;
          padding: 13px 28px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          border: none;
          box-shadow: var(--shadow-glow);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary-action:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 82, 255, 0.45);
          filter: brightness(1.06);
        }
        .btn-cancel-action {
          background: var(--bg-surface);
          color: var(--text-body);
          border: 1px solid var(--border-subtle);
          padding: 13px 24px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-cancel-action:hover {
          background: var(--bg-badge-tint);
          color: var(--color-cobalt);
        }

        /* Modern Toggle Box */
        .admin-toggle-card {
          cursor: pointer;
          background: #FAFDFE;
          border: 1.5px solid var(--border-subtle);
          border-radius: 16px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.25s ease;
        }
        .admin-toggle-card.active {
          background: var(--bg-badge-tint);
          border-color: var(--color-cobalt);
          box-shadow: 0 4px 18px rgba(0, 82, 255, 0.08);
        }
        .switch-indicator {
          width: 48px;
          height: 26px;
          background: #CBD5E1;
          border-radius: 999px;
          padding: 3px;
          display: flex;
          align-items: center;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .switch-indicator.checked {
          background: var(--color-cobalt);
        }
        .switch-knob {
          width: 20px;
          height: 20px;
          background: #FFFFFF;
          border-radius: 50%;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }
        .switch-indicator.checked .switch-knob {
          transform: translateX(22px);
        }

        /* Loading Spinner Orbit */
        .admin-loading-screen {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-main);
        }
        .spinner-orbit {
          width: 46px;
          height: 46px;
          border: 3.5px solid var(--border-subtle);
          border-top-color: var(--color-cobalt);
          border-right-color: var(--color-cyan);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="container-fluid" style={{ maxWidth: "1140px" }}>
        {/* ===================================================
            HEADER
        ==================================================== */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <Link to="/dashboard/jobs" className="btn-back-nav">
            <FaArrowLeft />
          </Link>

          <div>
            <div
              style={{
                color: "var(--color-cobalt)",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Careers Management
            </div>
            <h1
              className="fw-bold mb-0 mt-1"
              style={{ fontSize: "28px", color: "var(--text-title)" }}
            >
              {isEditMode ? "Edit Position Details" : "Add New Career Opening"}
            </h1>
          </div>
        </div>

        {/* ===================================================
            FORM
        ==================================================== */}
        <form onSubmit={handleSubmit}>
          {/* =================================================
              BASIC INFORMATION
          ================================================== */}
          <Section title="Basic Information" icon={<FaBriefcase />}>
            <div className="row g-4">
              <div className="col-md-8">
                <FormInput
                  label="Job Title"
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Lead Frontend Developer"
                  required
                />
              </div>

              <div className="col-md-4">
                <FormInput
                  label="Slug Identifier"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="lead-frontend-developer"
                  required
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  label="Department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="e.g. Engineering & Product"
                  required
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  label="Location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad, India (Hybrid)"
                  required
                />
              </div>

              <div className="col-md-4">
                <FormSelect
                  label="Job Type"
                  name="jobType"
                  value={form.jobType}
                  onChange={handleChange}
                  options={[
                    "Full Time",
                    "Part Time",
                    "Internship",
                    "Contract",
                    "Work From Home",
                  ]}
                />
              </div>

              <div className="col-md-4">
                <FormInput
                  label="Experience Level"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="e.g. 2-5 Years"
                />
              </div>

              <div className="col-md-4">
                <FormInput
                  label="Salary Range / Package"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="e.g. ₹12 - 18 LPA"
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  label="Total Openings"
                  name="openings"
                  type="number"
                  min="1"
                  value={form.openings}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <FormInput
                  label="Application Deadline"
                  name="applicationDeadline"
                  type="date"
                  value={form.applicationDeadline}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Section>

          {/* =================================================
              DESCRIPTION
          ================================================== */}
          <Section title="Job Overview & Description">
            <FormTextarea
              label="Role Summary"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Outline the mission, primary purpose of the position, and team dynamics..."
              rows={5}
              required
            />
          </Section>

          {/* =================================================
              RESPONSIBILITIES
          ================================================== */}
          <Section title="Key Responsibilities">
            <ArrayEditor
              items={form.responsibilities}
              field="responsibilities"
              placeholder="e.g. Architect and build scalable UI web applications"
              onChange={handleArrayChange}
              onAdd={addArrayField}
              onRemove={removeArrayField}
            />
          </Section>

          {/* =================================================
              REQUIREMENTS
          ================================================== */}
          <Section title="Candidate Requirements">
            <ArrayEditor
              items={form.requirements}
              field="requirements"
              placeholder="e.g. 3+ years experience with React.js & modern CSS"
              onChange={handleArrayChange}
              onAdd={addArrayField}
              onRemove={removeArrayField}
            />
          </Section>

          {/* =================================================
              SKILLS
          ================================================== */}
          <Section title="Target Skills & Tech Stack">
            <ArrayEditor
              items={form.skills}
              field="skills"
              placeholder="e.g. TypeScript, Next.js, Redux, Docker"
              onChange={handleArrayChange}
              onAdd={addArrayField}
              onRemove={removeArrayField}
            />
          </Section>

          {/* =================================================
              EDUCATION
          ================================================== */}
          <Section title="Educational Qualifications">
            <FormTextarea
              label="Education & Certifications"
              name="education"
              value={form.education}
              onChange={handleChange}
              placeholder="e.g. B.Tech / B.E in Computer Science, or equivalent industry experience"
              rows={3}
            />
          </Section>

          {/* =================================================
              SETTINGS & VISIBILITY
          ================================================== */}
          <Section title="Publishing & Status Controls">
            <div className="row g-3">
              <div className="col-md-6">
                <Toggle
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  title="Active Application Channel"
                  description="Accept new candidate resumes for this position on the careers page."
                />
              </div>

              <div className="col-md-6">
                <Toggle
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  title="Promoted / Featured Job"
                  description="Highlight this posting with an accent badge at the top of the careers page."
                />
              </div>
            </div>
          </Section>

          {/* =================================================
              SUBMIT & ACTIONS
          ================================================== */}
          <div className="d-flex justify-content-end align-items-center gap-3 mt-4 mb-5">
            <Link to="/dashboard/jobs" className="btn-cancel-action">
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary-action"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave />
                  {isEditMode ? "Update Position" : "Publish Opening"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =========================================================
// SECTION CONTAINER
// =========================================================
function Section({ title, icon, children }) {
  return (
    <div className="admin-section-card">
      <div className="d-flex align-items-center gap-2 mb-4">
        {icon && (
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "var(--bg-badge-tint)",
              color: "var(--color-cobalt)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            {icon}
          </div>
        )}
        <h5
          className="fw-bold mb-0"
          style={{ color: "var(--text-title)", fontSize: "18px" }}
        >
          {title}
        </h5>
      </div>
      {children}
    </div>
  );
}

// =========================================================
// FORM INPUT COMPONENT
// =========================================================
function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  min,
}) {
  return (
    <div>
      <label
        className="form-label"
        style={{
          color: "var(--text-title)",
          fontSize: "13px",
          fontWeight: 600,
          marginBottom: "6px",
        }}
      >
        {label}
        {required && <span style={{ color: "#E11D48" }}> *</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="form-control admin-form-control"
      />
    </div>
  );
}

// =========================================================
// FORM SELECT COMPONENT
// =========================================================
function FormSelect({ label, name, value, onChange, options }) {
  return (
    <div>
      <label
        className="form-label"
        style={{
          color: "var(--text-title)",
          fontSize: "13px",
          fontWeight: 600,
          marginBottom: "6px",
        }}
      >
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select admin-form-control"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// =========================================================
// TEXTAREA COMPONENT
// =========================================================
function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}) {
  return (
    <div>
      <label
        className="form-label"
        style={{
          color: "var(--text-title)",
          fontSize: "13px",
          fontWeight: 600,
          marginBottom: "6px",
        }}
      >
        {label}
        {required && <span style={{ color: "#E11D48" }}> *</span>}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="form-control admin-form-control"
        style={{ resize: "vertical" }}
      />
    </div>
  );
}

// =========================================================
// ARRAY EDITOR (Responsibilities, Requirements, Skills)
// =========================================================
function ArrayEditor({ items, field, placeholder, onChange, onAdd, onRemove }) {
  return (
    <div>
      {items.map((item, index) => (
        <div className="d-flex gap-2 mb-3" key={`${field}-${index}`}>
          <div className="array-counter">{index + 1}</div>

          <input
            type="text"
            value={item}
            onChange={(e) => onChange(field, index, e.target.value)}
            placeholder={placeholder}
            className="form-control admin-form-control flex-grow-1"
          />

          <button
            type="button"
            onClick={() => onRemove(field, index)}
            className="btn btn-trash-action"
            title="Delete this point"
          >
            <FaTrash size={13} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onAdd(field)}
        className="btn btn-add-item mt-1"
      >
        <FaPlus size={11} />
        Add another point
      </button>
    </div>
  );
}

// =========================================================
// ANIMATED TOGGLE SWITCH
// =========================================================
function Toggle({ name, checked, onChange, title, description }) {
  return (
    <label
      className={`admin-toggle-card ${checked ? "active" : ""}`}
      htmlFor={`toggle-${name}`}
    >
      <input
        type="checkbox"
        id={`toggle-${name}`}
        name={name}
        checked={checked}
        onChange={onChange}
        style={{ display: "none" }}
      />

      <div className={`switch-indicator ${checked ? "checked" : ""}`}>
        <div className="switch-knob" />
      </div>

      <div style={{ userSelect: "none" }}>
        <div
          className="fw-bold"
          style={{
            color: "var(--text-title)",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {title}
          {checked && (
            <FaCheck style={{ color: "var(--color-cobalt)", fontSize: "11px" }} />
          )}
        </div>

        <small style={{ color: "var(--text-muted)", fontSize: "12px" }}>
          {description}
        </small>
      </div>
    </label>
  );
}