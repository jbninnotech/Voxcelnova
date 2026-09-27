import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaSyncAlt,
  FaBriefcase,
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("accessToken")
  );
};

export default function AdminJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================================================
  // FETCH JOBS
  // =========================================================
  const fetchJobs = useCallback(
    async (showLoader = true) => {
      try {
        if (showLoader) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        const token = getToken();

        const response = await fetch(
          `${API_URL}/careers/admin/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch jobs."
          );
        }

        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Fetch jobs error:", error);
        alert(error.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // =========================================================
  // FILTER
  // =========================================================
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        job.title?.toLowerCase().includes(searchText) ||
        job.department?.toLowerCase().includes(searchText) ||
        job.location?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" ? job.isActive : !job.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  // =========================================================
  // DELETE JOB
  // =========================================================
  const handleDelete = async (job) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${job.title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(job._id);
      const token = getToken();

      const response = await fetch(
        `${API_URL}/careers/${job._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete job."
        );
      }

      setJobs((previous) =>
        previous.filter((item) => item._id !== job._id)
      );

      alert(data.message || "Job deleted successfully.");
    } catch (error) {
      console.error("Delete job error:", error);
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // DATE FORMATTER
  // =========================================================
  const formatDate = (dateValue) => {
    if (!dateValue) return "—";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // LOADING STATE
  // =========================================================
  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="text-center">
          <div className="spinner-orbit mb-3" />
          <div className="fw-semibold" style={{ color: "var(--text-muted)" }}>
            Loading career openings...
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================
  return (
    <div className="admin-jobs-page">
      {/* THEME CSS & ANIMATIONS */}
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
          --border-subtle: rgba(0, 82, 255, 0.14);
          --border-hover: rgba(0, 212, 255, 0.60);
          --shadow-card: 0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow: 0 8px 25px rgba(0, 82, 255, 0.32);
        }

        .admin-jobs-page {
          min-height: 100vh;
          background-color: var(--bg-main);
          color: var(--text-body);
          padding: 32px 24px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          animation: pageFadeIn 0.35s ease-out;
        }

        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Top Action Buttons */
        .btn-refresh-action {
          background: var(--bg-surface);
          color: var(--color-cobalt);
          border: 1.5px solid var(--border-subtle);
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          box-shadow: var(--shadow-card);
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-refresh-action:hover {
          background: var(--bg-badge-tint);
          border-color: var(--border-hover);
          color: var(--color-cobalt-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .btn-add-action {
          background: linear-gradient(135deg, var(--color-cobalt) 0%, var(--color-cobalt-hover) 100%);
          color: #FFFFFF;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          border: none;
          box-shadow: var(--shadow-glow);
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .btn-add-action:hover {
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 82, 255, 0.45);
          filter: brightness(1.05);
        }

        /* Stat Cards */
        .admin-stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 22px;
          box-shadow: var(--shadow-card);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          height: 100%;
        }
        .admin-stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover);
          box-shadow: 0 16px 36px rgba(0, 82, 255, 0.1);
        }
        .admin-stat-label {
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .admin-stat-value {
          color: var(--text-title);
          font-size: 30px;
          font-weight: 800;
        }
        .admin-stat-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border: 1px solid var(--border-subtle);
          transition: transform 0.25s ease;
        }
        .admin-stat-card:hover .admin-stat-icon-wrapper {
          transform: scale(1.08) rotate(5deg);
        }

        /* Filter Box */
        .admin-filter-bar {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 16px;
          box-shadow: var(--shadow-card);
          margin-bottom: 24px;
        }
        .admin-input-control {
          background-color: #FFFFFF;
          border: 1.5px solid var(--border-subtle);
          color: var(--text-title);
          border-radius: 12px;
          padding: 11px 16px;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .admin-input-control:focus {
          border-color: var(--color-cobalt);
          box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.12);
          outline: none;
        }
        .admin-input-control::placeholder {
          color: var(--text-muted);
        }

        /* Table Card */
        .admin-table-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          box-shadow: var(--shadow-card);
          overflow: hidden;
        }
        .admin-table thead tr {
          background: var(--bg-badge-tint);
          border-bottom: 1.5px solid var(--border-subtle);
        }
        .admin-table thead th {
          color: var(--text-title);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 16px 20px;
        }
        .admin-table tbody tr {
          border-bottom: 1px solid rgba(0, 82, 255, 0.08);
          transition: background-color 0.2s ease;
        }
        .admin-table tbody tr:hover {
          background-color: #F8FBFF;
        }
        .admin-table tbody td {
          padding: 16px 20px;
          vertical-align: middle;
        }

        /* Table Action Buttons */
        .btn-table-action {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid transparent;
        }
        .btn-action-view {
          background: var(--bg-badge-tint);
          color: var(--color-cobalt);
          border-color: var(--border-subtle);
        }
        .btn-action-view:hover {
          background: var(--color-cobalt);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.25);
        }
        .btn-action-edit {
          background: rgba(245, 158, 11, 0.12);
          color: #D97706;
          border-color: rgba(245, 158, 11, 0.25);
        }
        .btn-action-edit:hover {
          background: #D97706;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
        }
        .btn-action-delete {
          background: #FFF1F2;
          color: #E11D48;
          border-color: rgba(225, 29, 72, 0.2);
        }
        .btn-action-delete:hover {
          background: #E11D48;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.25);
        }

        /* Loading Screen Orbit */
        .admin-loading-screen {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-main);
        }
        .spinner-orbit {
          width: 44px;
          height: 44px;
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

      <div className="container-fluid" style={{ maxWidth: "1280px" }}>
        {/* ===================================================
            HEADER
        ==================================================== */}
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
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
              className="fw-bold mt-1 mb-1"
              style={{
                fontSize: "28px",
                color: "var(--text-title)",
              }}
            >
              Manage Positions
            </h1>

            <p
              className="mb-0"
              style={{
                color: "var(--text-muted)",
                fontSize: "14px",
              }}
            >
              Create, modify, and track all live and archived company openings.
            </p>
          </div>

          <div className="d-flex gap-2 align-items-center">
            <button
              type="button"
              onClick={() => fetchJobs(false)}
              className="btn btn-refresh-action"
              disabled={refreshing}
            >
              <FaSyncAlt className={refreshing ? "fa-spin" : ""} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            <Link to="/dashboard/jobs/add" className="btn-add-action">
              <FaPlus />
              Create Job
            </Link>
          </div>
        </div>

        {/* ===================================================
            SUMMARY CARDS
        ==================================================== */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <StatCard
              icon={<FaBriefcase />}
              title="Total Positions"
              value={jobs.length}
              accentColor="var(--color-cobalt)"
            />
          </div>

          <div className="col-12 col-md-4">
            <StatCard
              icon={<FaCheckCircle />}
              title="Active Openings"
              value={jobs.filter((job) => job.isActive).length}
              accentColor="#059669"
            />
          </div>

          <div className="col-12 col-md-4">
            <StatCard
              icon={<FaStar />}
              title="Featured Jobs"
              value={jobs.filter((job) => job.featured).length}
              accentColor="#7C3AED"
            />
          </div>
        </div>

        {/* ===================================================
            FILTER & SEARCH
        ==================================================== */}
        <div className="admin-filter-bar">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-lg-8">
              <div style={{ position: "relative" }}>
                <FaSearch
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search jobs by title, department, or location..."
                  className="form-control admin-input-control"
                  style={{ paddingLeft: "44px" }}
                />
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select admin-input-control"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===================================================
            JOB TABLE
        ==================================================== */}
        <div className="admin-table-card">
          <div className="table-responsive">
            <table className="table admin-table mb-0 align-middle">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Openings</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center"
                      style={{
                        padding: "60px 20px",
                        color: "var(--text-muted)",
                      }}
                    >
                      <FaBriefcase
                        style={{
                          fontSize: "40px",
                          opacity: 0.25,
                          marginBottom: "12px",
                        }}
                      />
                      <h5 style={{ color: "var(--text-title)" }}>
                        No Positions Found
                      </h5>
                      <p className="mb-0">
                        Try tweaking your search keywords or status filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job._id}>
                      {/* TITLE & FEATURED */}
                      <td>
                        <div
                          className="fw-bold"
                          style={{
                            color: "var(--text-title)",
                            fontSize: "14px",
                          }}
                        >
                          {job.title}
                        </div>

                        {job.featured && (
                          <span
                            style={{
                              display: "inline-block",
                              marginTop: "4px",
                              background: "rgba(139, 92, 246, 0.12)",
                              color: "#7C3AED",
                              border: "1px solid rgba(139, 92, 246, 0.25)",
                              padding: "2px 8px",
                              borderRadius: "20px",
                              fontSize: "10px",
                              fontWeight: 800,
                              letterSpacing: "0.5px",
                            }}
                          >
                            FEATURED
                          </span>
                        )}
                      </td>

                      {/* DEPARTMENT */}
                      <td style={{ fontWeight: 600 }}>{job.department}</td>

                      {/* LOCATION */}
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <FaMapMarkerAlt
                            style={{ color: "var(--color-cobalt)" }}
                          />
                          <span>{job.location}</span>
                        </div>
                      </td>

                      {/* TYPE */}
                      <td>
                        <span
                          style={{
                            background: "var(--bg-badge-tint)",
                            color: "var(--color-cobalt)",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {job.jobType}
                        </span>
                      </td>

                      {/* OPENINGS */}
                      <td style={{ fontWeight: 600 }}>{job.openings || 1}</td>

                      {/* STATUS */}
                      <td>
                        <span
                          style={{
                            background: job.isActive
                              ? "rgba(16, 185, 129, 0.12)"
                              : "rgba(239, 68, 68, 0.12)",
                            color: job.isActive ? "#059669" : "#DC2626",
                            border: `1px solid ${
                              job.isActive
                                ? "rgba(16, 185, 129, 0.25)"
                                : "rgba(239, 68, 68, 0.25)"
                            }`,
                            padding: "4px 10px",
                            borderRadius: "999px",
                            fontSize: "11px",
                            fontWeight: 700,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: job.isActive ? "#059669" : "#DC2626",
                            }}
                          />
                          {job.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* CREATED */}
                      <td
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "13px",
                        }}
                      >
                        {formatDate(job.createdAt)}
                      </td>

                      {/* ACTIONS */}
                      <td className="text-end">
                        <div className="d-inline-flex justify-content-end gap-2">
                          <Link
                            to={`/careers/${job.slug || job._id}`}
                            target="_blank"
                            className="btn-table-action btn-action-view"
                            title="Preview Public Page"
                          >
                            <FaEye size={13} />
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/dashboard/jobs/edit/${job._id}`)
                            }
                            className="btn-table-action btn-action-edit"
                            title="Edit Opening"
                          >
                            <FaEdit size={13} />
                          </button>

                          <button
                            type="button"
                            disabled={deletingId === job._id}
                            onClick={() => handleDelete(job)}
                            className="btn-table-action btn-action-delete"
                            title="Delete Opening"
                          >
                            {deletingId === job._id ? (
                              <span className="spinner-border spinner-border-sm" />
                            ) : (
                              <FaTrash size={12} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// STAT CARD COMPONENT
// =========================================================
function StatCard({ icon, title, value, accentColor }) {
  return (
    <div className="admin-stat-card">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <div className="admin-stat-label mb-1">{title}</div>
          <div className="admin-stat-value">{value}</div>
        </div>

        <div
          className="admin-stat-icon-wrapper"
          style={{
            color: accentColor || "var(--color-cobalt)",
            background: "var(--bg-badge-tint)",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}