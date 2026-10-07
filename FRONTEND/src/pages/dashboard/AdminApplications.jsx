import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaDownload,
  FaEnvelope,
  FaEye,
  FaFileAlt,
  FaFilter,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaTimes,
  FaTrash,
  FaUser,
  FaUsers,
  FaUserTie,
  FaSyncAlt,
} from "react-icons/fa";

// =========================================================
// API CONFIG
// =========================================================

const API_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api"
).replace(/\/$/, "");

// =========================================================
// =========================================================
// TOKEN / AUTH HELPERS
// =========================================================

const getToken = () => {
  return (
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("adminToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("accessToken") ||
    ""
  );
};

const clearAuthTokens = () => {
  ["adminToken", "token", "accessToken"].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

const handleUnauthorized = () => {
  clearAuthTokens();
  return new Error("Admin session expired or invalid. Please login again.");
};

// STATUS CONFIG
// =========================================================

const STATUS_OPTIONS = [
  "ALL",
  "PENDING",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEW",
  "SELECTED",
  "REJECTED",
];

const getStatusStyle = (status) => {
  const normalized = String(status || "PENDING")
    .trim()
    .toUpperCase();

  const styles = {
    PENDING: {
      background: "rgba(245, 158, 11, 0.12)",
      color: "#B45309",
      border: "1px solid rgba(245, 158, 11, 0.28)",
    },
    REVIEWING: {
      background: "rgba(6, 182, 212, 0.12)",
      color: "#0891B2",
      border: "1px solid rgba(6, 182, 212, 0.28)",
    },
    SHORTLISTED: {
      background: "rgba(139, 92, 246, 0.12)",
      color: "#7C3AED",
      border: "1px solid rgba(139, 92, 246, 0.28)",
    },
    INTERVIEW: {
      background: "#E8F5FE",
      color: "#0052FF",
      border: "1px solid rgba(0, 82, 255, 0.28)",
    },
    SELECTED: {
      background: "rgba(16, 185, 129, 0.12)",
      color: "#059669",
      border: "1px solid rgba(16, 185, 129, 0.28)",
    },
    REJECTED: {
      background: "rgba(239, 68, 68, 0.12)",
      color: "#DC2626",
      border: "1px solid rgba(239, 68, 68, 0.28)",
    },
  };

  return (
    styles[normalized] || {
      background: "#F1F5F9",
      color: "#475569",
      border: "1px solid #CBD5E1",
    }
  );
};

// =========================================================
// DATE FORMATTERS
// =========================================================

const formatDate = (date) => {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
};

const formatDateTime = (date) => {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
};

const getApplicantName = (application) => {
  if (!application) return "Unknown Applicant";
  if (application.name) return application.name;
  const firstName =
    application.firstName ||
    application.personalDetails?.firstName ||
    "";
  const lastName =
    application.lastName ||
    application.personalDetails?.lastName ||
    "";
  const fullName = `${firstName} ${lastName}`.trim();
  return fullName || "Unknown Applicant";
};

const getJobTitle = (application) => {
  return (
    application?.job?.title ||
    application?.jobTitle ||
    application?.position ||
    application?.career?.title ||
    "Job Position"
  );
};

const getEmail = (application) => {
  return (
    application?.email ||
    application?.personalDetails?.email ||
    "—"
  );
};

const getPhone = (application) => {
  return (
    application?.phone ||
    application?.personalDetails?.phone ||
    "—"
  );
};

// =========================================================
// MAIN COMPONENT
// =========================================================

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewing: 0,
    shortlisted: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // FETCH APPLICATIONS
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("Admin authentication token not found. Please login again.");
      }

      const response = await fetch(`${API_URL}/applications/admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.status === 401) {
        throw handleUnauthorized();
      }

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to load applications."
        );
      }

      setApplications(
        Array.isArray(data?.applications) ? data.applications : []
      );
    } catch (err) {
      console.error("Fetch applications error:", err);
      setError(err.message || "Unable to load applications.");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // FETCH STATS
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);

      const token = getToken();
      if (!token) {
        setStatsLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/applications/admin/stats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.status === 401) {
        throw handleUnauthorized();
      }

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to load statistics."
        );
      }

      if (data?.stats) {
        setStats((prev) => ({ ...prev, ...data.stats }));
      }
    } catch (err) {
      console.error("Fetch stats error:", err);
      if (err?.message?.toLowerCase().includes("session expired") ||
          err?.message?.toLowerCase().includes("invalid")) {
        setError(err.message);
      }
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, [fetchApplications, fetchStats]);

  // FILTER LOGIC
  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const applicantName = getApplicantName(application).toLowerCase();
      const email = getEmail(application).toLowerCase();
      const jobTitle = getJobTitle(application).toLowerCase();
      const phone = getPhone(application).toLowerCase();
      const status = String(application?.status || "PENDING").toUpperCase().trim();

      const matchesSearch =
        !query ||
        applicantName.includes(query) ||
        email.includes(query) ||
        jobTitle.includes(query) ||
        phone.includes(query);

      const matchesStatus =
        statusFilter === "ALL" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / itemsPerPage)
  );

  const paginatedApplications = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredApplications.slice(start, start + itemsPerPage);
  }, [filteredApplications, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // VIEW APPLICATION
  const handleViewApplication = async (application) => {
    try {
      const token = getToken();
      const applicationId = application?._id || application?.id;

      if (!applicationId || !token) {
        setSelectedApplication(application);
        setShowDetails(true);
        return;
      }

      const response = await fetch(
        `${API_URL}/applications/admin/${applicationId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        throw handleUnauthorized();
      }

      if (response.ok && data?.application) {
        setSelectedApplication(data.application);
      } else {
        setSelectedApplication(application);
      }
      setShowDetails(true);
    } catch (err) {
      console.error("View application error:", err);
      setSelectedApplication(application);
      setShowDetails(true);
    }
  };

  // STATUS CHANGE
  const handleStatusChange = async (applicationId, newStatus) => {
    if (!applicationId) return;

    try {
      setUpdatingId(applicationId);
      const token = getToken();
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(
        `${API_URL}/applications/admin/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        throw handleUnauthorized();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update status.");
      }

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      if (selectedApplication?._id === applicationId) {
        setSelectedApplication((prev) => ({ ...prev, status: newStatus }));
      }

      await fetchStats();
    } catch (err) {
      console.error("Update status error:", err);
      alert(err.message || "Failed to update application.");
    } finally {
      setUpdatingId(null);
    }
  };

  // DELETE APPLICATION
  const handleDeleteApplication = async (applicationId) => {
    if (!applicationId) return;
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this application?"
    );
    if (!confirmed) return;

    try {
      setDeletingId(applicationId);
      const token = getToken();
      if (!token) throw new Error("Authentication token not found.");

      const response = await fetch(
        `${API_URL}/applications/admin/${applicationId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        throw handleUnauthorized();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete application.");
      }

      setApplications((prev) =>
        prev.filter((app) => app._id !== applicationId)
      );

      if (selectedApplication?._id === applicationId) {
        setSelectedApplication(null);
        setShowDetails(false);
      }

      await fetchStats();
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete application.");
    } finally {
      setDeletingId(null);
    }
  };

  // DOWNLOAD RESUME
  const handleDownloadResume = (application) => {
    const resume = application?.resume;
    if (!resume?.url) {
      alert("Resume is not available for this application.");
      return;
    }
    window.open(resume.url, "_blank", "noopener,noreferrer");
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedApplication(null);
  };

  // STAT CARD SUBCOMPONENT
  const StatCard = ({ icon, title, value, subtitle, accentColor }) => {
    return (
      <div className="admin-stat-card">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="admin-stat-label mb-1">{title}</p>
            <h3 className="admin-stat-value mb-1">
              {statsLoading ? "..." : value}
            </h3>
            <small className="admin-stat-sub">{subtitle}</small>
          </div>
          <div
            className="admin-stat-icon-wrapper"
            style={{
              color: accentColor || "var(--color-cobalt)",
              backgroundColor: "var(--bg-badge-tint)",
            }}
          >
            {icon}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-app-page">
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

        .admin-app-page {
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

        /* Top Header Actions */
        .btn-refresh-action {
          background: var(--bg-surface);
          color: var(--color-cobalt);
          border: 1px solid var(--border-subtle);
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
        .admin-stat-sub {
          color: var(--text-muted);
          font-size: 12px;
        }
        .admin-stat-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
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
          padding: 18px;
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

        /* Table Container */
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

        /* Action Buttons */
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
        .btn-action-download {
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
          border-color: rgba(16, 185, 129, 0.25);
        }
        .btn-action-download:hover {
          background: #059669;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
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

        /* Pagination Buttons */
        .btn-page-nav {
          min-width: 36px;
          height: 36px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.2s ease;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-body);
        }
        .btn-page-nav:hover:not(:disabled) {
          border-color: var(--color-cobalt);
          color: var(--color-cobalt);
          background: var(--bg-badge-tint);
        }
        .btn-page-nav.active {
          background: var(--color-cobalt);
          color: #FFFFFF;
          border-color: var(--color-cobalt);
          box-shadow: var(--shadow-glow);
        }

        /* Modal Styles */
        .admin-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(7, 24, 56, 0.5);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.25s ease-out;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .admin-modal-card {
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          background: #FFFFFF;
          border: 1.5px solid var(--border-subtle);
          border-radius: 24px;
          box-shadow: 0 24px 60px rgba(7, 24, 56, 0.16);
        }
        .admin-detail-box {
          background: #FAFDFE;
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 16px;
          height: 100%;
          transition: border-color 0.2s ease;
        }
        .admin-detail-box:hover {
          border-color: var(--border-hover);
        }
      `}</style>

      <div className="container-fluid" style={{ maxWidth: "1280px" }}>
        {/* =================================================
            HEADER
        ================================================= */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaFileAlt style={{ color: "var(--color-cobalt)" }} />
              <span
                style={{
                  color: "var(--color-cobalt)",
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Talent Pipeline
              </span>
            </div>
            <h2
              className="fw-bold mb-1"
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                color: "var(--text-title)",
              }}
            >
              Job Applications
            </h2>
            <p className="mb-0" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Review, qualify, and manage candidate submissions with ease.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-refresh-action"
            onClick={() => {
              fetchApplications();
              fetchStats();
            }}
          >
            <FaSyncAlt />
            Refresh Data
          </button>
        </div>

        {/* =================================================
            ERROR ALERT
        ================================================= */}
        {error && (
          <div
            className="alert d-flex align-items-center justify-content-between mb-4"
            style={{
              background: "#FFF1F2",
              color: "#E11D48",
              border: "1.5px solid rgba(225, 29, 72, 0.25)",
              borderRadius: "14px",
            }}
          >
            <span>{error}</span>
            <button
              type="button"
              className="btn btn-sm"
              style={{
                background: "#E11D48",
                color: "#FFFFFF",
                borderRadius: "8px",
              }}
              onClick={() => {
                fetchApplications();
                fetchStats();
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* =================================================
            STATISTICS
        ================================================= */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-xl-3">
            <StatCard
              icon={<FaUsers />}
              title="Total Applications"
              value={stats.total}
              subtitle="All candidates recorded"
              accentColor="var(--color-cobalt)"
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <StatCard
              icon={<FaClock />}
              title="Pending Review"
              value={stats.pending}
              subtitle="Requires HR assessment"
              accentColor="#D97706"
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <StatCard
              icon={<FaUserTie />}
              title="Shortlisted"
              value={stats.shortlisted}
              subtitle="Qualified applicants"
              accentColor="#7C3AED"
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <StatCard
              icon={<FaCheckCircle />}
              title="Selected"
              value={stats.selected}
              subtitle="Hired / accepted candidates"
              accentColor="#059669"
            />
          </div>
        </div>

        {/* =================================================
            FILTER & SEARCH
        ================================================= */}
        <div className="admin-filter-bar">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-lg-7">
              <div className="position-relative">
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
                  placeholder="Search by candidate name, email, role, or phone..."
                  className="form-control admin-input-control"
                  style={{ paddingLeft: "44px" }}
                />
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="d-flex align-items-center gap-2">
                <FaFilter style={{ color: "var(--color-cobalt)" }} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select admin-input-control"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status === "ALL" ? "All Application Statuses" : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            APPLICATIONS TABLE
        ================================================= */}
        <div className="admin-table-card">
          <div
            className="d-flex flex-wrap align-items-center justify-content-between p-4"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <div>
              <h5 className="fw-bold mb-1" style={{ color: "var(--text-title)" }}>
                Application Submissions
              </h5>
              <small style={{ color: "var(--text-muted)" }}>
                Showing {filteredApplications.length} candidate
                {filteredApplications.length !== 1 ? "s" : ""}
              </small>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border mb-3"
                style={{ color: "var(--color-cobalt)", width: "3rem", height: "3rem" }}
              />
              <div className="fw-bold" style={{ color: "var(--text-title)" }}>
                Fetching Applications...
              </div>
            </div>
          ) : paginatedApplications.length === 0 ? (
            <div className="text-center py-5" style={{ color: "var(--text-muted)" }}>
              <FaFileAlt style={{ fontSize: "44px", opacity: 0.25, marginBottom: "14px" }} />
              <h5 style={{ color: "var(--text-title)" }}>No Applications Found</h5>
              <p className="mb-0">Try changing your search query or status filter.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Target Position</th>
                    <th>Contact Details</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedApplications.map((application) => {
                    const id = application._id || application.id;
                    const status = String(application.status || "PENDING")
                      .toUpperCase()
                      .trim();
                    const statusStyle = getStatusStyle(status);

                    return (
                      <tr key={id}>
                        {/* APPLICANT */}
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "12px",
                                background: "var(--bg-badge-tint)",
                                color: "var(--color-cobalt)",
                                border: "1px solid var(--border-subtle)",
                              }}
                            >
                              <FaUser />
                            </div>
                            <div>
                              <div
                                className="fw-bold"
                                style={{ color: "var(--text-title)", fontSize: "14px" }}
                              >
                                {getApplicantName(application)}
                              </div>
                              <small style={{ color: "var(--text-muted)" }}>
                                {application.experience ||
                                  application.yearsOfExperience ||
                                  "Experience not specified"}
                              </small>
                            </div>
                          </div>
                        </td>

                        {/* POSITION */}
                        <td>
                          <div
                            className="d-flex align-items-center gap-2 fw-semibold"
                            style={{ color: "var(--text-body)" }}
                          >
                            <FaBriefcase style={{ color: "var(--color-cobalt)" }} />
                            {getJobTitle(application)}
                          </div>
                        </td>

                        {/* CONTACT */}
                        <td>
                          <div style={{ fontSize: "13px" }}>
                            <div
                              className="mb-1 d-flex align-items-center gap-2"
                              style={{ color: "var(--text-body)" }}
                            >
                              <FaEnvelope style={{ color: "var(--color-cyan)" }} />
                              {getEmail(application)}
                            </div>
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ color: "var(--text-muted)" }}
                            >
                              <FaPhone />
                              {getPhone(application)}
                            </div>
                          </div>
                        </td>

                        {/* DATE */}
                        <td>
                          <div
                            className="d-flex align-items-center gap-2"
                            style={{ color: "var(--text-muted)", fontSize: "13px" }}
                          >
                            <FaCalendarAlt />
                            {formatDate(
                              application.createdAt || application.appliedAt
                            )}
                          </div>
                        </td>

                        {/* STATUS SELECT */}
                        <td>
                          <select
                            value={status}
                            disabled={updatingId === id}
                            onChange={(e) =>
                              handleStatusChange(id, e.target.value)
                            }
                            className="form-select form-select-sm"
                            style={{
                              ...statusStyle,
                              borderRadius: "999px",
                              fontWeight: "700",
                              fontSize: "12px",
                              width: "145px",
                              cursor: "pointer",
                            }}
                          >
                            {STATUS_OPTIONS.filter((item) => item !== "ALL").map(
                              (option) => (
                                <option
                                  key={option}
                                  value={option}
                                  style={{
                                    background: "#FFFFFF",
                                    color: "var(--text-title)",
                                  }}
                                >
                                  {option}
                                </option>
                              )
                            )}
                          </select>
                        </td>

                        {/* ACTIONS */}
                        <td className="text-end">
                          <div className="d-inline-flex align-items-center gap-2">
                            <button
                              type="button"
                              className="btn-table-action btn-action-view"
                              title="View Application Details"
                              onClick={() => handleViewApplication(application)}
                            >
                              <FaEye size={13} />
                            </button>

                            {application?.resume?.url && (
                              <button
                                type="button"
                                className="btn-table-action btn-action-download"
                                title="Download Resume"
                                onClick={() => handleDownloadResume(application)}
                              >
                                <FaDownload size={13} />
                              </button>
                            )}

                            <button
                              type="button"
                              className="btn-table-action btn-action-delete"
                              title="Delete Record"
                              disabled={deletingId === id}
                              onClick={() => handleDeleteApplication(id)}
                            >
                              {deletingId === id ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : (
                                <FaTrash size={12} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* =================================================
              PAGINATION
          ================================================= */}
          {filteredApplications.length > itemsPerPage && (
            <div
              className="d-flex flex-wrap align-items-center justify-content-between gap-3 p-4"
              style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
              <small style={{ color: "var(--text-muted)", fontWeight: "500" }}>
                Page {currentPage} of {totalPages}
              </small>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn-page-nav"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                >
                  <FaChevronLeft size={11} />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .slice(
                    Math.max(0, currentPage - 3),
                    Math.min(totalPages, currentPage + 2)
                  )
                  .map((page) => (
                    <button
                      type="button"
                      key={page}
                      className={`btn-page-nav ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  type="button"
                  className="btn-page-nav"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                >
                  <FaChevronRight size={11} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          APPLICATION DETAILS MODAL
      ===================================================== */}
      {showDetails && selectedApplication && (
        <div className="admin-modal-overlay" onClick={closeDetails}>
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div
              className="d-flex align-items-center justify-content-between p-4"
              style={{ borderBottom: "1.5px solid var(--border-subtle)" }}
            >
              <div>
                <h4
                  className="fw-bold mb-1"
                  style={{ color: "var(--text-title)" }}
                >
                  Applicant Dossier
                </h4>
                <p className="mb-0" style={{ color: "var(--text-muted)" }}>
                  {getApplicantName(selectedApplication)}
                </p>
              </div>

              <button
                type="button"
                className="btn btn-table-action btn-action-view"
                onClick={closeDetails}
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-4">
              {/* APPLICANT INFO TILES */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <DetailBox
                    icon={<FaUser />}
                    label="Applicant Full Name"
                    value={getApplicantName(selectedApplication)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <DetailBox
                    icon={<FaBriefcase />}
                    label="Target Position"
                    value={getJobTitle(selectedApplication)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <DetailBox
                    icon={<FaEnvelope />}
                    label="Email Address"
                    value={getEmail(selectedApplication)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <DetailBox
                    icon={<FaPhone />}
                    label="Contact Number"
                    value={getPhone(selectedApplication)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <DetailBox
                    icon={<FaMapMarkerAlt />}
                    label="Location"
                    value={
                      selectedApplication.location ||
                      selectedApplication.personalDetails?.location ||
                      "—"
                    }
                  />
                </div>

                <div className="col-12 col-md-6">
                  <DetailBox
                    icon={<FaGraduationCap />}
                    label="Education Level"
                    value={
                      selectedApplication.education ||
                      selectedApplication.personalDetails?.education ||
                      "—"
                    }
                  />
                </div>
              </div>

              {/* PROFESSIONAL INFO */}
              <div
                className="mb-4"
                style={{
                  background: "#FAFDFE",
                  border: "1.5px solid var(--border-subtle)",
                  borderRadius: "16px",
                  padding: "20px",
                }}
              >
                <h6
                  className="fw-bold mb-3"
                  style={{ color: "var(--text-title)" }}
                >
                  Professional Background
                </h6>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <DetailLine
                      label="Years of Experience"
                      value={
                        selectedApplication.experience ||
                        selectedApplication.yearsOfExperience ||
                        "—"
                      }
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <DetailLine
                      label="Current Employer"
                      value={selectedApplication.currentCompany || "—"}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <DetailLine
                      label="Current Job Role"
                      value={selectedApplication.currentRole || "—"}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <DetailLine
                      label="Expected Compensation"
                      value={selectedApplication.expectedSalary || "—"}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <DetailLine
                      label="Notice Period"
                      value={selectedApplication.noticePeriod || "—"}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <DetailLine
                      label="Submission Timestamp"
                      value={formatDateTime(
                        selectedApplication.createdAt ||
                          selectedApplication.appliedAt
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* SKILLS */}
              {selectedApplication.skills && (
                <div
                  className="mb-4"
                  style={{
                    background: "#FAFDFE",
                    border: "1.5px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "20px",
                  }}
                >
                  <h6
                    className="fw-bold mb-2"
                    style={{ color: "var(--text-title)" }}
                  >
                    Skills & proficiencies
                  </h6>
                  <p
                    className="mb-0"
                    style={{
                      color: "var(--text-body)",
                      lineHeight: 1.6,
                      fontSize: "14px",
                    }}
                  >
                    {Array.isArray(selectedApplication.skills)
                      ? selectedApplication.skills.join(", ")
                      : selectedApplication.skills}
                  </p>
                </div>
              )}

              {/* COVER LETTER */}
              {selectedApplication.coverLetter && (
                <div
                  className="mb-4"
                  style={{
                    background: "#FAFDFE",
                    border: "1.5px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "20px",
                  }}
                >
                  <h6
                    className="fw-bold mb-2"
                    style={{ color: "var(--text-title)" }}
                  >
                    Cover Letter
                  </h6>
                  <p
                    className="mb-0"
                    style={{
                      color: "var(--text-body)",
                      lineHeight: 1.7,
                      fontSize: "14px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {selectedApplication.coverLetter}
                  </p>
                </div>
              )}

              {/* RESUME DOWNLOAD BOX */}
              <div
                className="mb-4"
                style={{
                  background: "var(--bg-badge-tint)",
                  border: "1.5px solid var(--border-subtle)",
                  borderRadius: "16px",
                  padding: "20px",
                }}
              >
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "12px",
                        background: "#FFFFFF",
                        color: "var(--color-cobalt)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      <FaFileAlt />
                    </div>

                    <div>
                      <h6
                        className="mb-0 fw-bold"
                        style={{ color: "var(--text-title)" }}
                      >
                        Applicant Resume
                      </h6>
                      <small style={{ color: "var(--text-muted)" }}>
                        {selectedApplication.resume?.originalName ||
                          "resume_document.pdf"}
                      </small>
                    </div>
                  </div>

                  {selectedApplication.resume?.url && (
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        handleDownloadResume(selectedApplication)
                      }
                      style={{
                        background: "var(--color-cobalt)",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        padding: "10px 18px",
                        fontWeight: "600",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "var(--shadow-glow)",
                      }}
                    >
                      <FaDownload />
                      Open Resume
                    </button>
                  )}
                </div>
              </div>

              {/* STATUS CHANGE IN MODAL */}
              <div
                style={{
                  background: "#FAFDFE",
                  border: "1.5px solid var(--border-subtle)",
                  borderRadius: "16px",
                  padding: "20px",
                }}
              >
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <h6
                      className="fw-bold mb-1"
                      style={{ color: "var(--text-title)" }}
                    >
                      Update Pipeline Status
                    </h6>
                    <small style={{ color: "var(--text-muted)" }}>
                      Shift candidate stage in hiring process
                    </small>
                  </div>

                  <select
                    value={String(
                      selectedApplication.status || "PENDING"
                    ).toUpperCase()}
                    disabled={updatingId === selectedApplication._id}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedApplication._id,
                        e.target.value
                      )
                    }
                    className="form-select admin-input-control"
                    style={{ maxWidth: "200px" }}
                  >
                    {STATUS_OPTIONS.filter((item) => item !== "ALL").map(
                      (status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div
              className="d-flex justify-content-end gap-3 p-4"
              style={{ borderTop: "1.5px solid var(--border-subtle)" }}
            >
              <button
                type="button"
                className="btn"
                onClick={closeDetails}
                style={{
                  background: "var(--bg-badge-tint)",
                  color: "var(--text-body)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  fontWeight: "600",
                }}
              >
                Close
              </button>

              <button
                type="button"
                className="btn d-flex align-items-center gap-2"
                disabled={deletingId === selectedApplication._id}
                onClick={() =>
                  handleDeleteApplication(selectedApplication._id)
                }
                style={{
                  background: "#FFF1F2",
                  color: "#E11D48",
                  border: "1px solid rgba(225, 29, 72, 0.25)",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  fontWeight: "600",
                }}
              >
                <FaTrash />
                Delete Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================
// DETAIL BOX HELPER
// =========================================================
const DetailBox = ({ icon, label, value }) => {
  return (
    <div className="admin-detail-box">
      <div
        className="d-flex align-items-center gap-2 mb-2"
        style={{
          color: "var(--color-cobalt)",
          fontSize: "12px",
          textTransform: "uppercase",
          fontWeight: "700",
        }}
      >
        {icon}
        {label}
      </div>
      <div
        style={{
          color: "var(--text-title)",
          fontSize: "14px",
          fontWeight: "600",
          wordBreak: "break-word",
        }}
      >
        {value || "—"}
      </div>
    </div>
  );
};

// =========================================================
// DETAIL LINE HELPER
// =========================================================
const DetailLine = ({ label, value }) => {
  return (
    <div className="d-flex flex-column gap-1">
      <small
        style={{
          color: "var(--text-muted)",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        {label}
      </small>
      <span
        style={{
          color: "var(--text-title)",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        {value || "—"}
      </span>
    </div>
  );
};

export default AdminApplications;