import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaEnvelope,
  FaEye,
  FaSearch,
  FaSyncAlt,
  FaTrash,
  FaPhone,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaTimesCircle,
  FaFilter,
  FaStickyNote,
  FaArrowLeft,
  FaTimes,
  FaBuilding,
  FaTshirt,
  FaBoxes,
} from "react-icons/fa";

// ============================================================
// CONFIG & TOKEN HELPER
// ============================================================
const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  
const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("accessToken") ||
    sessionStorage.getItem("adminToken") ||
    ""
  );
};

// ============================================================
// RESILIENT API CLIENT (Includes /contact first)
// ============================================================
const fetchWithFallback = async (endpointCandidates, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let lastError = null;

  for (const path of endpointCandidates) {
    try {
      const url = `${API_URL}${path}`;
      const response = await fetch(url, { ...options, headers });

      if (response.status === 404) {
        continue;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (err) {
      lastError = err;
      if (err.message && !err.message.includes("404")) {
        throw err;
      }
    }
  }

  throw lastError || new Error("API Route not found. Please check your backend endpoints.");
};

// ============================================================
// STATUS CONFIGURATION
// ============================================================
const STATUS_OPTIONS = [
  "All",
  "New",
  "Contacted",
  "In Progress",
  "Resolved",
  "Closed",
];

const getStatusStyle = (status) => {
  switch (status) {
    case "New":
      return {
        background: "rgba(245, 158, 11, 0.12)",
        color: "#B45309",
        border: "1px solid rgba(245, 158, 11, 0.28)",
      };
    case "Contacted":
      return {
        background: "rgba(0, 82, 255, 0.10)",
        color: "#0052FF",
        border: "1px solid rgba(0, 82, 255, 0.25)",
      };
    case "In Progress":
      return {
        background: "rgba(139, 92, 246, 0.12)",
        color: "#7C3AED",
        border: "1px solid rgba(139, 92, 246, 0.28)",
      };
    case "Resolved":
      return {
        background: "rgba(16, 185, 129, 0.12)",
        color: "#059669",
        border: "1px solid rgba(16, 185, 129, 0.28)",
      };
    case "Closed":
      return {
        background: "#F1F5F9",
        color: "#64748B",
        border: "1px solid #CBD5E1",
      };
    default:
      return {
        background: "rgba(0, 82, 255, 0.08)",
        color: "#475569",
        border: "1px solid #E2E8F0",
      };
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "New":
      return <FaEnvelope />;
    case "Contacted":
      return <FaPhone />;
    case "In Progress":
      return <FaClock />;
    case "Resolved":
      return <FaCheckCircle />;
    case "Closed":
      return <FaTimesCircle />;
    default:
      return <FaExclamationCircle />;
  }
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 3500);
  };

  // ============================================================
  // FETCH ENQUIRIES (GET /api/contact)
  // ============================================================
  const fetchEnquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const queryParams = new URLSearchParams();
      if (search.trim()) queryParams.append("search", search.trim());
      if (statusFilter !== "All") queryParams.append("status", statusFilter);

      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";

      // Prioritize /contact (singular)
      const candidates = [
        `/contact${queryString}`,
        `/contacts${queryString}`,
        `/enquiries${queryString}`,
      ];

      const data = await fetchWithFallback(candidates, { method: "GET" });
      const list = data?.data || data?.enquiries || data?.contacts || (Array.isArray(data) ? data : []);

      setEnquiries(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Fetch enquiries failed:", err);
      setEnquiries([]);
      setError(err?.message || "Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEnquiries();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchEnquiries]);

  // STATS
  const statistics = useMemo(() => {
    return {
      total: enquiries.length,
      new: enquiries.filter((item) => item.status === "New").length,
      contacted: enquiries.filter((item) => item.status === "Contacted").length,
      progress: enquiries.filter((item) => item.status === "In Progress").length,
      resolved: enquiries.filter((item) => item.status === "Resolved").length,
      closed: enquiries.filter((item) => item.status === "Closed").length,
    };
  }, [enquiries]);

  // ============================================================
  // VIEW ENQUIRY (INSTANT: Uses row data without 404 risk)
  // ============================================================
  const handleViewEnquiry = (enquiry) => {
    if (!enquiry) return;
    setSelectedEnquiry(enquiry);
    setAdminNotes(enquiry.adminNotes || "");
    setShowDetails(true);
  };

  // ============================================================
  // UPDATE STATUS
  // ============================================================
  const handleStatusChange = async (enquiry, newStatus) => {
    const id = enquiry?._id || enquiry?.id;
    if (!id) return;

    try {
      setActionLoading(true);

      const candidates = [
        `/contact/${id}/status`,
        `/contact/${id}`,
        `/contacts/${id}/status`,
        `/enquiries/${id}/status`,
      ];

      await fetchWithFallback(candidates, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      setEnquiries((prev) =>
        prev.map((item) =>
          (item._id || item.id) === id ? { ...item, status: newStatus } : item
        )
      );

      setSelectedEnquiry((prev) =>
        prev && (prev._id || prev.id) === id ? { ...prev, status: newStatus } : prev
      );

      showNotification("success", `Status updated to "${newStatus}"`);
    } catch (err) {
      console.error("Update status error:", err);
      showNotification("error", err?.message || "Failed to update status.");
    } finally {
      setActionLoading(false);
    }
  };

  // ============================================================
  // SAVE ADMIN NOTES (FIXED: Includes /contact/:id/notes)
  // ============================================================
  const handleSaveNotes = async () => {
    const id = selectedEnquiry?._id || selectedEnquiry?.id;
    if (!id) return;

    try {
      setSavingNotes(true);

      const candidates = [
        `/contact/${id}/notes`,
        `/contact/${id}`,
        `/contacts/${id}/notes`,
        `/enquiries/${id}/notes`,
      ];

      await fetchWithFallback(candidates, {
        method: "PATCH",
        body: JSON.stringify({ adminNotes }),
      });

      setSelectedEnquiry((prev) => (prev ? { ...prev, adminNotes } : prev));
      setEnquiries((prev) =>
        prev.map((item) =>
          (item._id || item.id) === id ? { ...item, adminNotes } : item
        )
      );

      showNotification("success", "Admin notes saved successfully.");
    } catch (err) {
      console.error("Save notes error:", err);
      showNotification("error", err?.message || "Failed to save admin notes.");
    } finally {
      setSavingNotes(false);
    }
  };

  // ============================================================
  // DELETE ENQUIRY
  // ============================================================
  const openDeleteModal = (enquiry) => {
    if (!enquiry) return;
    setDeleteTarget(enquiry);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    const id = deleteTarget?._id || deleteTarget?.id;
    if (!id) return;

    try {
      setActionLoading(true);

      const candidates = [
        `/contact/${id}`,
        `/contacts/${id}`,
        `/enquiries/${id}`,
      ];

      await fetchWithFallback(candidates, { method: "DELETE" });

      setEnquiries((prev) => prev.filter((item) => (item._id || item.id) !== id));

      if (selectedEnquiry && (selectedEnquiry._id || selectedEnquiry.id) === id) {
        setSelectedEnquiry(null);
        setShowDetails(false);
      }

      setShowDeleteModal(false);
      setDeleteTarget(null);
      showNotification("success", "Enquiry deleted successfully.");
    } catch (err) {
      console.error("Delete enquiry error:", err);
      showNotification("error", err?.message || "Failed to delete enquiry.");
    } finally {
      setActionLoading(false);
    }
  };

  // DATE HELPERS
  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return isNaN(d.getTime())
      ? "—"
      : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const formatDateTime = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return isNaN(d.getTime())
      ? "—"
      : d.toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <div className="admin-enquiries-page">
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

        .admin-enquiries-page {
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

        .admin-stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 20px;
          box-shadow: var(--shadow-card);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          height: 100%;
        }
        .admin-stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover);
        }
        .admin-stat-label {
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .admin-stat-value {
          color: var(--text-title);
          font-size: 26px;
          font-weight: 800;
        }
        .admin-stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border: 1px solid var(--border-subtle);
        }

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
        }
        .admin-input-control:focus {
          border-color: var(--color-cobalt);
          box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.12);
          outline: none;
        }

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

        .btn-table-action {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        .btn-action-view {
          background: var(--bg-badge-tint);
          color: var(--color-cobalt);
          border-color: var(--border-subtle);
        }
        .btn-action-view:hover {
          background: var(--color-cobalt);
          color: #FFFFFF;
        }
        .btn-action-delete {
          background: #FFF1F2;
          color: #E11D48;
          border-color: rgba(225, 29, 72, 0.2);
        }
        .btn-action-delete:hover {
          background: #E11D48;
          color: #FFFFFF;
        }

        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(7, 24, 56, 0.45);
          backdrop-filter: blur(6px);
          z-index: 1040;
        }
        .drawer-content {
          position: fixed;
          top: 0;
          right: 0;
          width: min(620px, 100%);
          height: 100%;
          background: #FFFFFF;
          z-index: 1050;
          overflow-y: auto;
          box-shadow: -10px 0 40px rgba(0, 48, 143, 0.16);
          animation: slideDrawer 0.25s ease-out;
        }
        @keyframes slideDrawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .detail-box-clean {
          background: #FAFDFE;
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 16px;
        }
      `}</style>

      {/* TOAST NOTIFICATION */}
      {notification.show && (
        <div
          className="position-fixed top-0 end-0 m-3 shadow"
          style={{
            zIndex: 9999,
            minWidth: "300px",
            borderRadius: "14px",
            padding: "14px 18px",
            background: notification.type === "success" ? "#ECFDF5" : "#FFF1F2",
            color: notification.type === "success" ? "#065F46" : "#9F1239",
            border: `1.5px solid ${
              notification.type === "success"
                ? "rgba(16, 185, 129, 0.3)"
                : "rgba(225, 29, 72, 0.3)"
            }`,
          }}
        >
          <div className="d-flex align-items-center gap-2 fw-semibold">
            {notification.type === "success" ? (
              <FaCheckCircle style={{ color: "#059669" }} />
            ) : (
              <FaExclamationCircle style={{ color: "#E11D48" }} />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className="container-fluid" style={{ maxWidth: "1280px" }}>
        {/* HEADER */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaEnvelope style={{ color: "var(--color-cobalt)" }} />
              <span
                style={{
                  color: "var(--color-cobalt)",
                  fontSize: "12px",
                  fontWeight: "800",
                  textTransform: "uppercase",
                }}
              >
                Inquiries & Leads
              </span>
            </div>
            <h1 className="fw-bold mb-1" style={{ fontSize: "28px", color: "var(--text-title)" }}>
              Customer Enquiries
            </h1>
            <p className="mb-0" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Track customer inquiries and manage communication workflows.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-refresh-action"
            onClick={fetchEnquiries}
            disabled={loading}
          >
            <FaSyncAlt className={loading ? "fa-spin" : ""} />
            {loading ? "Syncing..." : "Refresh Enquiries"}
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon={<FaEnvelope />} title="Total" value={statistics.total} accentColor="var(--color-cobalt)" />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon={<FaEnvelope />} title="New" value={statistics.new} accentColor="#D97706" />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon={<FaPhone />} title="Contacted" value={statistics.contacted} accentColor="#0052FF" />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon={<FaClock />} title="In Progress" value={statistics.progress} accentColor="#7C3AED" />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon={<FaCheckCircle />} title="Resolved" value={statistics.resolved} accentColor="#059669" />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon={<FaTimesCircle />} title="Closed" value={statistics.closed} accentColor="#64748B" />
          </div>
        </div>

        {/* FILTER BAR */}
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
                  className="form-control admin-input-control"
                  style={{ paddingLeft: "44px" }}
                  placeholder="Search by name, email, phone, or subject..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    type="button"
                    className="btn position-absolute"
                    style={{
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-muted)",
                      border: "none",
                    }}
                    onClick={() => setSearch("")}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="d-flex align-items-center gap-2">
                <FaFilter style={{ color: "var(--color-cobalt)" }} />
                <select
                  className="form-select admin-input-control"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status === "All" ? "All Pipeline Statuses" : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ERROR */}
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
            <div className="d-flex align-items-center gap-2">
              <FaExclamationCircle />
              <span>{error}</span>
            </div>
            <button
              type="button"
              className="btn btn-sm"
              style={{ background: "#E11D48", color: "#FFFFFF", borderRadius: "8px" }}
              onClick={fetchEnquiries}
            >
              Retry
            </button>
          </div>
        )}

        {/* TABLE */}
        <div className="admin-table-card">
          <div
            className="d-flex align-items-center justify-content-between p-4"
            style={{ borderBottom: "1.5px solid var(--border-subtle)" }}
          >
            <div>
              <h5 className="fw-bold mb-1" style={{ color: "var(--text-title)" }}>
                Received Enquiries
              </h5>
              <small style={{ color: "var(--text-muted)" }}>
                Displaying {enquiries.length} customer messages
              </small>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border mb-3" style={{ color: "var(--color-cobalt)" }} />
              <div className="fw-bold" style={{ color: "var(--text-title)" }}>
                Loading Enquiries...
              </div>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="text-center py-5" style={{ color: "var(--text-muted)" }}>
              <FaEnvelope style={{ fontSize: "42px", opacity: 0.25, marginBottom: "14px" }} />
              <h5 style={{ color: "var(--text-title)" }}>No Enquiries Found</h5>
              <p className="mb-0">No client messages match your current filters.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact Details</th>
                    <th>Subject / Message</th>
                    <th>Status</th>
                    <th>Date Received</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry._id || enquiry.id}>
                      {/* CUSTOMER */}
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "12px",
                              background: "var(--bg-badge-tint)",
                              color: "var(--color-cobalt)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "800",
                              border: "1px solid var(--border-subtle)",
                            }}
                          >
                            {enquiry.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <div className="fw-bold" style={{ color: "var(--text-title)", fontSize: "14px" }}>
                              {enquiry.name || "Unknown Customer"}
                            </div>
                            <small style={{ color: "var(--text-muted)" }}>
                              {enquiry.companyName || "Personal Enquiry"}
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* CONTACT */}
                      <td>
                        <div style={{ fontSize: "13px" }}>
                          {enquiry.email && (
                            <div className="mb-1 d-flex align-items-center gap-2">
                              <FaEnvelope style={{ color: "var(--color-cyan)" }} />
                              <span>{enquiry.email}</span>
                            </div>
                          )}
                          {enquiry.phone && (
                            <div className="d-flex align-items-center gap-2" style={{ color: "var(--text-muted)" }}>
                              <FaPhone />
                              <span>{enquiry.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* SUBJECT / MESSAGE */}
                      <td>
                        <div style={{ maxWidth: "260px" }}>
                          <strong className="d-block text-truncate" style={{ color: "var(--text-title)", fontSize: "13px" }}>
                            {enquiry.subject || "General Order Inquiry"}
                          </strong>
                          <small className="d-block text-truncate" style={{ color: "var(--text-muted)" }}>
                            {enquiry.message || "No message body provided"}
                          </small>
                        </div>
                      </td>

                      {/* STATUS TAG */}
                      <td>
                        <span
                          className="d-inline-flex align-items-center gap-1"
                          style={{
                            ...getStatusStyle(enquiry.status),
                            padding: "5px 12px",
                            borderRadius: "999px",
                            fontSize: "11px",
                            fontWeight: "700",
                          }}
                        >
                          {getStatusIcon(enquiry.status)}
                          <span className="ms-1">{enquiry.status || "New"}</span>
                        </span>
                      </td>

                      {/* DATE */}
                      <td>
                        <div className="d-flex align-items-center gap-2" style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                          <FaCalendarAlt />
                          {formatDate(enquiry.createdAt)}
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="text-end">
                        <div className="d-inline-flex align-items-center gap-2">
                          {/* INSTANT VIEW */}
                          <button
                            type="button"
                            className="btn-table-action btn-action-view"
                            title="View Full Enquiry"
                            onClick={() => handleViewEnquiry(enquiry)}
                          >
                            <FaEye size={13} />
                          </button>

                          <button
                            type="button"
                            className="btn-table-action btn-action-delete"
                            title="Delete Enquiry"
                            onClick={() => openDeleteModal(enquiry)}
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================
          DETAILS DRAWER
      ====================================================== */}
      {showDetails && selectedEnquiry && (
        <>
          <div className="drawer-overlay" onClick={() => setShowDetails(false)} />

          <div className="drawer-content">
            {/* DRAWER HEADER */}
            <div
              className="d-flex align-items-center justify-content-between p-4"
              style={{ borderBottom: "1.5px solid var(--border-subtle)" }}
            >
              <div className="d-flex align-items-center gap-3">
                <button
                  type="button"
                  className="btn btn-table-action btn-action-view"
                  onClick={() => setShowDetails(false)}
                >
                  <FaArrowLeft />
                </button>
                <div>
                  <div
                    style={{
                      color: "var(--color-cobalt)",
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    Enquiry Details
                  </div>
                  <h4 className="mb-0 fw-bold" style={{ color: "var(--text-title)" }}>
                    Customer Message
                  </h4>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-table-action btn-action-view"
                onClick={() => setShowDetails(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* DRAWER BODY */}
            <div className="p-4">
              {/* CUSTOMER TILE */}
              <div
                className="d-flex align-items-center gap-3 pb-4 mb-4"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: "var(--bg-badge-tint)",
                    color: "var(--color-cobalt)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    fontWeight: "800",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {selectedEnquiry.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                  <h5 className="mb-1 fw-bold" style={{ color: "var(--text-title)" }}>
                    {selectedEnquiry.name || "Unknown Customer"}
                  </h5>
                  <p className="mb-0 small" style={{ color: "var(--text-muted)" }}>
                    Submitted on {formatDateTime(selectedEnquiry.createdAt)}
                  </p>
                </div>
              </div>

              {/* STATUS SELECTOR */}
              <div className="mb-4">
                <label
                  className="d-block mb-2"
                  style={{
                    color: "var(--color-cobalt)",
                    fontSize: "11px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                  }}
                >
                  Pipeline Status
                </label>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <select
                    className="form-select admin-input-control"
                    style={{ maxWidth: "220px" }}
                    value={selectedEnquiry.status || "New"}
                    disabled={actionLoading}
                    onChange={(e) => handleStatusChange(selectedEnquiry, e.target.value)}
                  >
                    {STATUS_OPTIONS.filter((s) => s !== "All").map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {actionLoading && (
                    <span className="spinner-border spinner-border-sm text-primary" />
                  )}
                </div>
              </div>

              {/* CONTACT DETAILS */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6">
                  <div className="detail-box-clean">
                    <small style={{ color: "var(--text-muted)" }}>Email</small>
                    <div className="fw-semibold text-truncate mt-1">
                      {selectedEnquiry.email ? (
                        <a
                          href={`mailto:${selectedEnquiry.email}`}
                          style={{ color: "var(--color-cobalt)", textDecoration: "none" }}
                        >
                          {selectedEnquiry.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="detail-box-clean">
                    <small style={{ color: "var(--text-muted)" }}>Phone Number</small>
                    <div className="fw-semibold mt-1">
                      {selectedEnquiry.phone ? (
                        <a
                          href={`tel:${selectedEnquiry.phone}`}
                          style={{ color: "var(--color-cobalt)", textDecoration: "none" }}
                        >
                          {selectedEnquiry.phone}
                        </a>
                      ) : (
                        "—"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SPECIFICATIONS */}
              {(selectedEnquiry.companyName ||
                selectedEnquiry.clothingCategory ||
                selectedEnquiry.quantityTier ||
                selectedEnquiry.deadline) && (
                <div
                  className="mb-4"
                  style={{
                    background: "#FAFDFE",
                    border: "1.5px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "18px",
                  }}
                >
                  <h6 className="fw-bold mb-3" style={{ color: "var(--text-title)" }}>
                    Specifications & Requirements
                  </h6>
                  <div className="row g-3">
                    {selectedEnquiry.companyName && (
                      <div className="col-6">
                        <small style={{ color: "var(--text-muted)" }}>
                          <FaBuilding className="me-1" /> Company
                        </small>
                        <div className="fw-bold mt-1" style={{ color: "var(--text-title)" }}>
                          {selectedEnquiry.companyName}
                        </div>
                      </div>
                    )}

                    {selectedEnquiry.clothingCategory && (
                      <div className="col-6">
                        <small style={{ color: "var(--text-muted)" }}>
                          <FaTshirt className="me-1" /> Category
                        </small>
                        <div className="fw-bold mt-1" style={{ color: "var(--text-title)" }}>
                          {selectedEnquiry.clothingCategory}
                        </div>
                      </div>
                    )}

                    {selectedEnquiry.quantityTier && (
                      <div className="col-6">
                        <small style={{ color: "var(--text-muted)" }}>
                          <FaBoxes className="me-1" /> Quantity Tier
                        </small>
                        <div className="fw-bold mt-1" style={{ color: "var(--text-title)" }}>
                          {selectedEnquiry.quantityTier}
                        </div>
                      </div>
                    )}

                    {selectedEnquiry.deadline && (
                      <div className="col-6">
                        <small style={{ color: "var(--text-muted)" }}>
                          <FaCalendarAlt className="me-1" /> Target Deadline
                        </small>
                        <div className="fw-bold mt-1" style={{ color: "var(--text-title)" }}>
                          {formatDate(selectedEnquiry.deadline)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUBJECT & MESSAGE */}
              <div className="mb-4">
                <div className="detail-box-clean mb-3">
                  <small style={{ color: "var(--text-muted)" }}>Subject</small>
                  <h6 className="fw-bold mt-1 mb-0" style={{ color: "var(--text-title)" }}>
                    {selectedEnquiry.subject || "General Order Inquiry"}
                  </h6>
                </div>

                <div className="detail-box-clean">
                  <small style={{ color: "var(--text-muted)" }}>Message Body</small>
                  <p
                    className="mt-2 mb-0"
                    style={{
                      color: "var(--text-body)",
                      lineHeight: 1.7,
                      fontSize: "14px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {selectedEnquiry.message || "No message body."}
                  </p>
                </div>
              </div>

              {/* ADMIN NOTES */}
              <div className="mb-4">
                <label
                  className="d-flex align-items-center gap-2 mb-2"
                  style={{
                    color: "var(--color-cobalt)",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  <FaStickyNote />
                  INTERNAL ADMIN NOTES
                </label>
                <textarea
                  className="form-control admin-input-control"
                  rows="4"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about conversations, quotes, follow-ups..."
                />
                <button
                  type="button"
                  className="btn mt-2"
                  style={{
                    background: "var(--color-cobalt)",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    padding: "8px 18px",
                    fontWeight: "600",
                    fontSize: "13px",
                    boxShadow: "var(--shadow-glow)",
                  }}
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                >
                  {savingNotes ? "Saving Notes..." : "Save Admin Notes"}
                </button>
              </div>

              {/* REMOVE RECORD */}
              <div
                className="p-3 d-flex align-items-center justify-content-between"
                style={{
                  background: "#FFF1F2",
                  borderRadius: "14px",
                  border: "1px solid rgba(225, 29, 72, 0.2)",
                }}
              >
                <div>
                  <div className="fw-bold" style={{ color: "#E11D48", fontSize: "13px" }}>
                    Remove Record
                  </div>
                  <small style={{ color: "#9F1239" }}>
                    Permanently delete this enquiry from the database.
                  </small>
                </div>
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{
                    background: "#E11D48",
                    color: "#FFFFFF",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    fontWeight: "600",
                  }}
                  onClick={() => openDeleteModal(selectedEnquiry)}
                >
                  <FaTrash className="me-1" size={11} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            zIndex: 1100,
            background: "rgba(7, 24, 56, 0.5)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="bg-white rounded-4 shadow p-4 text-center" style={{ width: "min(420px, 100%)" }}>
            <div
              className="mx-auto d-flex align-items-center justify-content-center"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#FFF1F2",
                color: "#E11D48",
                fontSize: "22px",
              }}
            >
              <FaTrash />
            </div>

            <h5 className="fw-bold mt-3" style={{ color: "var(--text-title)" }}>
              Delete Enquiry?
            </h5>

            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Are you sure you want to delete the enquiry from <strong>{deleteTarget?.name}</strong>?
            </p>

            <div className="d-flex gap-2 mt-4">
              <button
                type="button"
                className="btn flex-grow-1"
                style={{
                  border: "1.5px solid var(--border-subtle)",
                  color: "var(--text-body)",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteTarget(null);
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn flex-grow-1"
                style={{
                  background: "#E11D48",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
                onClick={handleDelete}
                disabled={actionLoading}
              >
                {actionLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// HELPER: STAT CARD
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
            color: accentColor,
            background: "var(--bg-badge-tint)",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Enquiries;