import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaSearch,
  FaSyncAlt,
  FaFileDownload,
  FaEye,
  FaTimes,
  FaCheck,
  FaCalendarAlt,
  FaTrash,
  FaUserTie,
  FaBriefcase,
  FaClock,
} from "react-icons/fa";

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("accessToken")
  );
};

const getStatusBadge = (status) => {
  const styles = {
    Applied: {
      background: "rgba(59,130,246,0.15)",
      color: "#60A5FA",
    },

    "Under Review": {
      background: "rgba(245,158,11,0.15)",
      color: "#FBBF24",
    },

    Shortlisted: {
      background: "rgba(168,85,247,0.15)",
      color: "#C084FC",
    },

    Interview: {
      background: "rgba(6,182,212,0.15)",
      color: "#22D3EE",
    },

    Selected: {
      background: "rgba(34,197,94,0.15)",
      color: "#4ADE80",
    },

    Rejected: {
      background: "rgba(239,68,68,0.15)",
      color: "#F87171",
    },
  };

  return (
    styles[status] || {
      background: "rgba(255,255,255,0.08)",
      color: "#CBD5E1",
    }
  );
};

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    Applied: 0,
    "Under Review": 0,
    Shortlisted: 0,
    Interview: 0,
    Selected: 0,
    Rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [showDetails, setShowDetails] = useState(false);

  const [saving, setSaving] = useState(false);

  const [adminNotes, setAdminNotes] = useState("");
  const [interviewDate, setInterviewDate] = useState("");

  // =========================================================
  // FETCH APPLICATIONS
  // =========================================================

  const fetchApplications = useCallback(
    async (showLoader = true) => {
      try {
        if (showLoader) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        const token = getToken();

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(
          `${API_URL}/applications/admin`,
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
            data.message ||
              "Failed to fetch applications."
          );
        }

        setApplications(data.applications || []);
      } catch (error) {
        console.error(
          "Fetch applications error:",
          error
        );

        alert(error.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  // =========================================================
  // FETCH STATS
  // =========================================================

  const fetchStats = useCallback(async () => {
    try {
      const token = getToken();

      if (!token) return;

      const response = await fetch(
        `${API_URL}/applications/admin/stats`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStats(
          data.stats || {
            total: 0,
            Applied: 0,
            "Under Review": 0,
            Shortlisted: 0,
            Interview: 0,
            Selected: 0,
            Rejected: 0,
          }
        );
      }
    } catch (error) {
      console.error("Fetch stats error:", error);
    }
  }, []);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, [fetchApplications, fetchStats]);

  // =========================================================
  // FILTER
  // =========================================================

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const fullName = `${application.firstName || ""} ${
        application.lastName || ""
      }`.toLowerCase();

      const email = (
        application.email || ""
      ).toLowerCase();

      const phone = (
        application.phone || ""
      ).toLowerCase();

      const jobTitle = (
        application.job?.title || ""
      ).toLowerCase();

      const matchesSearch =
        !searchText ||
        fullName.includes(searchText) ||
        email.includes(searchText) ||
        phone.includes(searchText) ||
        jobTitle.includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    applications,
    search,
    statusFilter,
  ]);

  // =========================================================
  // OPEN DETAILS
  // =========================================================

  const openDetails = (application) => {
    setSelectedApplication(application);

    setAdminNotes(
      application.adminNotes || ""
    );

    if (application.interviewDate) {
      const date = new Date(
        application.interviewDate
      );

      if (!Number.isNaN(date.getTime())) {
        setInterviewDate(
          date.toISOString().slice(0, 16)
        );
      }
    } else {
      setInterviewDate("");
    }

    setShowDetails(true);
  };

  // =========================================================
  // CLOSE DETAILS
  // =========================================================

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedApplication(null);
    setAdminNotes("");
    setInterviewDate("");
  };

  // =========================================================
  // UPDATE APPLICATION
  // =========================================================

  const updateApplication = async (
    applicationId,
    updateData
  ) => {
    try {
      setSaving(true);

      const token = getToken();

      const response = await fetch(
        `${API_URL}/applications/admin/${applicationId}`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update application."
        );
      }

      setApplications((previous) =>
        previous.map((item) =>
          item._id === applicationId
            ? data.application
            : item
        )
      );

      setSelectedApplication(
        data.application
      );

      await fetchStats();

      alert(
        data.message ||
          "Application updated successfully."
      );
    } catch (error) {
      console.error(
        "Update application error:",
        error
      );

      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // CHANGE STATUS
  // =========================================================

  const handleStatusChange = async (
    status
  ) => {
    if (!selectedApplication) return;

    await updateApplication(
      selectedApplication._id,
      {
        status,
      }
    );
  };

  // =========================================================
  // SAVE NOTES / INTERVIEW
  // =========================================================

  const handleSaveDetails = async () => {
    if (!selectedApplication) return;

    await updateApplication(
      selectedApplication._id,
      {
        adminNotes,
        interviewDate:
          interviewDate || null,
      }
    );
  };

  // =========================================================
  // DELETE APPLICATION
  // =========================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/applications/admin/${id}`,
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
          data.message ||
            "Failed to delete application."
        );
      }

      setApplications((previous) =>
        previous.filter(
          (item) => item._id !== id
        )
      );

      await fetchStats();

      if (
        selectedApplication?._id === id
      ) {
        closeDetails();
      }

      alert(
        data.message ||
          "Application deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete application error:",
        error
      );

      alert(error.message);
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // DOWNLOAD / OPEN RESUME
  // =========================================================

  const openResume = (application) => {
    if (!application?.resume?.url) {
      alert("Resume URL is not available.");
      return;
    }

    window.open(
      application.resume.url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "70vh",
          color: "#FFFFFF",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          />

          <div>
            Loading applications...
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #061326 0%, #071A36 50%, #030914 100%)",
        color: "#FFFFFF",
        padding: "30px",
      }}
    >
      {/* ===================================================
          HEADER
      ==================================================== */}

      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <div
            style={{
              color: "#60A5FA",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Careers Management
          </div>

          <h1
            className="fw-bold mb-1 mt-2"
            style={{
              fontSize: "30px",
            }}
          >
            Job Applications
          </h1>

          <p
            className="mb-0"
            style={{
              color: "#94A3B8",
            }}
          >
            Manage and review candidate applications.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            fetchApplications(false);
            fetchStats();
          }}
          className="btn"
          style={{
            background:
              "rgba(59,130,246,0.12)",
            color: "#60A5FA",
            border:
              "1px solid rgba(59,130,246,0.25)",
            borderRadius: "10px",
            padding: "11px 16px",
            fontWeight: 600,
          }}
        >
          <FaSyncAlt
            className={
              refreshing
                ? "fa-spin me-2"
                : "me-2"
            }
          />

          Refresh
        </button>
      </div>

      {/* ===================================================
          STATS
      ==================================================== */}

      <div className="row g-3 mb-4">
        {[
          {
            label: "Total",
            value: stats.total,
            icon: <FaUserTie />,
          },

          {
            label: "Applied",
            value: stats.Applied,
            icon: <FaClock />,
          },

          {
            label: "Shortlisted",
            value: stats.Shortlisted,
            icon: <FaCheck />,
          },

          {
            label: "Interview",
            value: stats.Interview,
            icon: <FaCalendarAlt />,
          },

          {
            label: "Selected",
            value: stats.Selected,
            icon: <FaUserTie />,
          },

          {
            label: "Rejected",
            value: stats.Rejected,
            icon: <FaTimes />,
          },
        ].map((item) => (
          <div
            className="col-6 col-md-4 col-xl-2"
            key={item.label}
          >
            <div
              style={{
                background:
                  "rgba(15,23,42,0.75)",
                border:
                  "1px solid rgba(255,255,255,0.07)",
                borderRadius: "15px",
                padding: "18px",
                height: "100%",
              }}
            >
              <div
                style={{
                  color: "#60A5FA",
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
              >
                {item.icon}
              </div>

              <div
                style={{
                  color: "#94A3B8",
                  fontSize: "12px",
                  marginBottom: "5px",
                }}
              >
                {item.label}
              </div>

              <div
                style={{
                  fontSize: "25px",
                  fontWeight: 700,
                }}
              >
                {item.value || 0}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===================================================
          FILTER BAR
      ==================================================== */}

      <div
        className="mb-4"
        style={{
          background:
            "rgba(15,23,42,0.75)",
          border:
            "1px solid rgba(255,255,255,0.07)",
          borderRadius: "15px",
          padding: "16px",
        }}
      >
        <div className="row g-3">
          <div className="col-lg-7">
            <div
              style={{
                position: "relative",
              }}
            >
              <FaSearch
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  color: "#64748B",
                }}
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search candidate, email, phone or job..."
                className="form-control"
                style={{
                  background:
                    "#071A2F",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  color: "#FFFFFF",
                  paddingLeft: "42px",
                  height: "46px",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>

          <div className="col-lg-5">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="form-select"
              style={{
                backgroundColor:
                  "#071A2F",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                color: "#FFFFFF",
                height: "46px",
                borderRadius: "10px",
              }}
            >
              <option value="All">
                All Statuses
              </option>

              <option value="Applied">
                Applied
              </option>

              <option value="Under Review">
                Under Review
              </option>

              <option value="Shortlisted">
                Shortlisted
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Selected">
                Selected
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* ===================================================
          APPLICATION TABLE
      ==================================================== */}

      <div
        style={{
          background:
            "rgba(15,23,42,0.75)",
          border:
            "1px solid rgba(255,255,255,0.07)",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <div
          className="table-responsive"
          style={{
            maxHeight: "600px",
          }}
        >
          <table
            className="table mb-0 align-middle"
            style={{
              minWidth: "1000px",
              color: "#FFFFFF",
            }}
          >
            <thead
              style={{
                background:
                  "rgba(255,255,255,0.04)",
                position: "sticky",
                top: 0,
                zIndex: 2,
              }}
            >
              <tr>
                <th
                  style={{
                    color: "#94A3B8",
                    padding: "16px",
                  }}
                >
                  Candidate
                </th>

                <th
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Position
                </th>

                <th
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Contact
                </th>

                <th
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Status
                </th>

                <th
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Applied
                </th>

                <th
                  style={{
                    color: "#94A3B8",
                    textAlign: "right",
                    paddingRight: "20px",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                    style={{
                      padding: "60px 20px",
                      color: "#64748B",
                    }}
                  >
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map(
                  (application) => {
                    const badge =
                      getStatusBadge(
                        application.status
                      );

                    return (
                      <tr
                        key={
                          application._id
                        }
                        style={{
                          borderColor:
                            "rgba(255,255,255,0.05)",
                        }}
                      >
                        <td
                          style={{
                            padding: "16px",
                          }}
                        >
                          <div
                            className="fw-semibold"
                          >
                            {
                              application.firstName
                            }{" "}
                            {
                              application.lastName
                            }
                          </div>

                          <small
                            style={{
                              color: "#64748B",
                            }}
                          >
                            {
                              application.experience ||
                              "Fresher"
                            }
                          </small>
                        </td>

                        <td>
                          <div
                            className="d-flex align-items-center gap-2"
                          >
                            <FaBriefcase
                              style={{
                                color:
                                  "#60A5FA",
                              }}
                            />

                            <span>
                              {
                                application
                                  .job
                                  ?.title
                              }
                            </span>
                          </div>
                        </td>

                        <td>
                          <div
                            style={{
                              fontSize:
                                "13px",
                            }}
                          >
                            {
                              application.email
                            }
                          </div>

                          <small
                            style={{
                              color: "#64748B",
                            }}
                          >
                            {
                              application.phone
                            }
                          </small>
                        </td>

                        <td>
                          <span
                            style={{
                              ...badge,
                              padding:
                                "6px 10px",
                              borderRadius:
                                "20px",
                              fontSize:
                                "11px",
                              fontWeight: 700,
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            {
                              application.status
                            }
                          </span>
                        </td>

                        <td
                          style={{
                            color:
                              "#94A3B8",
                            fontSize:
                              "13px",
                          }}
                        >
                          {formatDate(
                            application.createdAt
                          )}
                        </td>

                        <td
                          style={{
                            textAlign:
                              "right",
                            paddingRight:
                              "20px",
                          }}
                        >
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                openDetails(
                                  application
                                )
                              }
                              className="btn btn-sm"
                              style={{
                                background:
                                  "rgba(59,130,246,0.12)",
                                color:
                                  "#60A5FA",
                                border:
                                  "1px solid rgba(59,130,246,0.2)",
                              }}
                              title="View application"
                            >
                              <FaEye />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openResume(
                                  application
                                )
                              }
                              className="btn btn-sm"
                              style={{
                                background:
                                  "rgba(34,197,94,0.12)",
                                color:
                                  "#4ADE80",
                                border:
                                  "1px solid rgba(34,197,94,0.2)",
                              }}
                              title="Open resume"
                            >
                              <FaFileDownload />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  application._id
                                )
                              }
                              className="btn btn-sm"
                              style={{
                                background:
                                  "rgba(239,68,68,0.10)",
                                color:
                                  "#F87171",
                                border:
                                  "1px solid rgba(239,68,68,0.2)",
                              }}
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================================================
          DETAILS MODAL
      ==================================================== */}

      {showDetails &&
        selectedApplication && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,0.75)",
              zIndex: 2000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
            onClick={closeDetails}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "850px",
                maxHeight: "90vh",
                overflowY: "auto",
                background:
                  "#071A2F",
                border:
                  "1px solid rgba(255,255,255,0.10)",
                borderRadius: "18px",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.5)",
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              {/* MODAL HEADER */}

              <div
                className="d-flex justify-content-between align-items-center"
                style={{
                  padding: "20px 24px",
                  borderBottom:
                    "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <h4 className="fw-bold mb-1">
                    {
                      selectedApplication.firstName
                    }{" "}
                    {
                      selectedApplication.lastName
                    }
                  </h4>

                  <div
                    style={{
                      color: "#94A3B8",
                      fontSize: "13px",
                    }}
                  >
                    {
                      selectedApplication
                        .job?.title
                    }
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeDetails}
                  className="btn"
                  style={{
                    color: "#94A3B8",
                    background:
                      "rgba(255,255,255,0.05)",
                  }}
                >
                  <FaTimes />
                </button>
              </div>

              {/* MODAL BODY */}

              <div
                style={{
                  padding: "24px",
                }}
              >
                <div className="row g-4">
                  {/* PERSONAL */}

                  <div className="col-md-6">
                    <div
                      className="p-3 h-100"
                      style={{
                        background:
                          "rgba(255,255,255,0.03)",
                        borderRadius:
                          "12px",
                      }}
                    >
                      <h6 className="fw-bold mb-3">
                        Personal Information
                      </h6>

                      <InfoRow
                        label="Email"
                        value={
                          selectedApplication.email
                        }
                      />

                      <InfoRow
                        label="Phone"
                        value={
                          selectedApplication.phone
                        }
                      />

                      <InfoRow
                        label="Alternate Phone"
                        value={
                          selectedApplication
                            .alternatePhone ||
                          "-"
                        }
                      />

                      <InfoRow
                        label="Location"
                        value={
                          selectedApplication.location
                        }
                      />
                    </div>
                  </div>

                  {/* PROFESSIONAL */}

                  <div className="col-md-6">
                    <div
                      className="p-3 h-100"
                      style={{
                        background:
                          "rgba(255,255,255,0.03)",
                        borderRadius:
                          "12px",
                      }}
                    >
                      <h6 className="fw-bold mb-3">
                        Professional Information
                      </h6>

                      <InfoRow
                        label="Experience"
                        value={
                          selectedApplication.experience
                        }
                      />

                      <InfoRow
                        label="Current Company"
                        value={
                          selectedApplication.currentCompany ||
                          "-"
                        }
                      />

                      <InfoRow
                        label="Current Role"
                        value={
                          selectedApplication.currentRole ||
                          "-"
                        }
                      />

                      <InfoRow
                        label="Expected Salary"
                        value={
                          selectedApplication.expectedSalary ||
                          "-"
                        }
                      />

                      <InfoRow
                        label="Notice Period"
                        value={
                          selectedApplication.noticePeriod ||
                          "-"
                        }
                      />
                    </div>
                  </div>

                  {/* EDUCATION */}

                  <div className="col-12">
                    <div
                      className="p-3"
                      style={{
                        background:
                          "rgba(255,255,255,0.03)",
                        borderRadius:
                          "12px",
                      }}
                    >
                      <h6 className="fw-bold mb-3">
                        Education & Skills
                      </h6>

                      <InfoRow
                        label="Education"
                        value={
                          selectedApplication.education ||
                          "-"
                        }
                      />

                      <div className="mt-3">
                        <div
                          style={{
                            color:
                              "#64748B",
                            fontSize:
                              "12px",
                            marginBottom:
                              "8px",
                          }}
                        >
                          Skills
                        </div>

                        <div className="d-flex flex-wrap gap-2">
                          {(
                            selectedApplication.skills ||
                            []
                          ).map(
                            (
                              skill,
                              index
                            ) => (
                              <span
                                key={
                                  index
                                }
                                style={{
                                  background:
                                    "rgba(59,130,246,0.12)",
                                  color:
                                    "#60A5FA",
                                  padding:
                                    "6px 10px",
                                  borderRadius:
                                    "20px",
                                  fontSize:
                                    "12px",
                                }}
                              >
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* COVER LETTER */}

                  <div className="col-12">
                    <div
                      className="p-3"
                      style={{
                        background:
                          "rgba(255,255,255,0.03)",
                        borderRadius:
                          "12px",
                      }}
                    >
                      <h6 className="fw-bold mb-3">
                        Cover Letter
                      </h6>

                      <p
                        style={{
                          color:
                            "#CBD5E1",
                          whiteSpace:
                            "pre-wrap",
                          lineHeight: 1.7,
                          marginBottom:
                            0,
                        }}
                      >
                        {selectedApplication.coverLetter ||
                          "No cover letter provided."}
                      </p>
                    </div>
                  </div>

                  {/* RESUME */}

                  <div className="col-12">
                    <button
                      type="button"
                      onClick={() =>
                        openResume(
                          selectedApplication
                        )
                      }
                      className="btn w-100"
                      style={{
                        background:
                          "linear-gradient(135deg,#2563EB,#4F46E5)",
                        color: "#FFFFFF",
                        padding: "13px",
                        borderRadius:
                          "10px",
                        fontWeight: 600,
                      }}
                    >
                      <FaFileDownload className="me-2" />

                      Open Resume
                    </button>
                  </div>

                  {/* STATUS */}

                  <div className="col-md-6">
                    <label
                      className="form-label"
                      style={{
                        color:
                          "#94A3B8",
                        fontSize:
                          "13px",
                      }}
                    >
                      Application Status
                    </label>

                    <select
                      value={
                        selectedApplication.status
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          e.target.value
                        )
                      }
                      disabled={saving}
                      className="form-select"
                      style={{
                        backgroundColor:
                          "#030914",
                        color:
                          "#FFFFFF",
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <option value="Applied">
                        Applied
                      </option>

                      <option value="Under Review">
                        Under Review
                      </option>

                      <option value="Shortlisted">
                        Shortlisted
                      </option>

                      <option value="Interview">
                        Interview
                      </option>

                      <option value="Selected">
                        Selected
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>
                    </select>
                  </div>

                  {/* INTERVIEW DATE */}

                  <div className="col-md-6">
                    <label
                      className="form-label"
                      style={{
                        color:
                          "#94A3B8",
                        fontSize:
                          "13px",
                      }}
                    >
                      Interview Date
                    </label>

                    <input
                      type="datetime-local"
                      value={
                        interviewDate
                      }
                      onChange={(e) =>
                        setInterviewDate(
                          e.target.value
                        )
                      }
                      className="form-control"
                      style={{
                        backgroundColor:
                          "#030914",
                        color:
                          "#FFFFFF",
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>

                  {/* ADMIN NOTES */}

                  <div className="col-12">
                    <label
                      className="form-label"
                      style={{
                        color:
                          "#94A3B8",
                        fontSize:
                          "13px",
                      }}
                    >
                      Admin Notes
                    </label>

                    <textarea
                      rows="4"
                      value={adminNotes}
                      onChange={(e) =>
                        setAdminNotes(
                          e.target.value
                        )
                      }
                      placeholder="Add internal notes..."
                      className="form-control"
                      style={{
                        backgroundColor:
                          "#030914",
                        color:
                          "#FFFFFF",
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}

              <div
                className="d-flex justify-content-end gap-2"
                style={{
                  padding: "18px 24px",
                  borderTop:
                    "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <button
                  type="button"
                  onClick={closeDetails}
                  className="btn"
                  style={{
                    color: "#CBD5E1",
                    background:
                      "rgba(255,255,255,0.05)",
                  }}
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleSaveDetails}
                  disabled={saving}
                  className="btn"
                  style={{
                    background:
                      "linear-gradient(135deg,#2563EB,#4F46E5)",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    padding:
                      "9px 20px",
                  }}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

// =========================================================
// INFO ROW
// =========================================================

function InfoRow({ label, value }) {
  return (
    <div
      className="d-flex justify-content-between gap-3 py-2"
      style={{
        borderBottom:
          "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span
        style={{
          color: "#64748B",
          fontSize: "12px",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: "#CBD5E1",
          fontSize: "13px",
          textAlign: "right",
        }}
      >
        {value || "-"}
      </span>
    </div>
  );
}