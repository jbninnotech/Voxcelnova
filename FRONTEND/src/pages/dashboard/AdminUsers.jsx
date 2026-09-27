import React, { useCallback, useEffect, useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaSyncAlt,
  FaUserShield,
  FaUserTie,
  FaUser,
  FaToggleOn,
  FaToggleOff,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
} from "../../services/userService";

export default function AdminUsers() {
  // =========================================================
  // STATES
  // =========================================================

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [updatingUser, setUpdatingUser] = useState(null);

  // =========================================================
  // LOAD USERS
  // =========================================================

  const loadUsers = useCallback(async (isRefresh = false) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const token = sessionStorage.getItem("token");

      console.log("AdminUsers Token:", token ? "Token Found" : "NO TOKEN");

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      const response = await getAllUsers();

      console.log("GET ALL USERS RESPONSE:", response);

      // =====================================================
      // IMPORTANT
      // Backend response:
      //
      // {
      //   success: true,
      //   count: 4,
      //   users: [...]
      // }
      // =====================================================

      const usersList = Array.isArray(response?.users)
        ? response.users
        : [];

      console.log("USERS RECEIVED:", usersList);

      setUsers(usersList);
      setFilteredUsers(usersList);
    } catch (err) {
      console.error("Load Users Error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load registered users.";

      setError(message);

      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // =========================================================
  // SEARCH
  // =========================================================

  useEffect(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => {
      return (
        user?.name?.toLowerCase().includes(keyword) ||
        user?.email?.toLowerCase().includes(keyword) ||
        user?.role?.toLowerCase().includes(keyword) ||
        user?.phone?.toLowerCase().includes(keyword) ||
        user?.department?.toLowerCase().includes(keyword)
      );
    });

    setFilteredUsers(filtered);
  }, [search, users]);

  // =========================================================
  // ROLE ICON
  // =========================================================

  const getRoleIcon = (role) => {
    const normalizedRole = String(role || "").toUpperCase();

    if (normalizedRole === "CEO") {
      return <FaUserShield />;
    }

    if (normalizedRole === "ADMIN") {
      return <FaUserShield />;
    }

    if (normalizedRole === "MANAGER") {
      return <FaUserTie />;
    }

    return <FaUser />;
  };

  // =========================================================
  // ROLE BADGE
  // =========================================================

  const getRoleBadgeClass = (role) => {
    const normalizedRole = String(role || "").toUpperCase();

    switch (normalizedRole) {
      case "CEO":
        return "bg-dark";

      case "ADMIN":
        return "bg-primary";

      case "MANAGER":
        return "bg-warning text-dark";

      case "EMPLOYEE":
        return "bg-secondary";

      default:
        return "bg-secondary";
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  // =========================================================
  // UPDATE ROLE
  // =========================================================

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingUser(userId);
      setError("");

      await updateUserRole(userId, newRole);

      // Update frontend immediately
      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                role: newRole,
              }
            : user
        )
      );
    } catch (err) {
      console.error("Update Role Error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update user role."
      );
    } finally {
      setUpdatingUser(null);
    }
  };

  // =========================================================
  // TOGGLE USER STATUS
  // =========================================================

  const handleToggleStatus = async (userId) => {
    try {
      setUpdatingUser(userId);
      setError("");

      const response = await toggleUserStatus(userId);

      console.log("STATUS UPDATE RESPONSE:", response);

      setUsers((previousUsers) =>
        previousUsers.map((user) => {
          if (user._id !== userId) {
            return user;
          }

          return {
            ...user,
            isActive:
              response?.user?.isActive ??
              response?.isActive ??
              !user.isActive,
          };
        })
      );
    } catch (err) {
      console.error("Toggle Status Error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update user status."
      );
    } finally {
      setUpdatingUser(null);
    }
  };

  // =========================================================
  // STATS
  // =========================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.isActive === true
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.isActive === false
  ).length;

  const employeeUsers = users.filter(
    (user) =>
      String(user.role || "").toUpperCase() === "EMPLOYEE"
  ).length;

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "70vh",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />

          <h6 className="text-secondary">
            Loading registered users...
          </h6>
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
        padding: "30px",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <div
            className="text-uppercase fw-semibold"
            style={{
              color: "#2563EB",
              fontSize: "11px",
              letterSpacing: "2px",
            }}
          >
            User Management
          </div>

          <h2
            className="fw-bold mb-1"
            style={{
              color: "#071A36",
            }}
          >
            Registered Users
          </h2>

          <p className="text-secondary mb-0">
            Manage users who registered on the Voxcel Nova platform.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => loadUsers(true)}
          disabled={refreshing}
          style={{
            borderRadius: "10px",
            padding: "10px 18px",
          }}
        >
          <FaSyncAlt
            className={refreshing ? "spin-animation" : ""}
          />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div
          className="alert alert-danger d-flex align-items-center gap-2"
          style={{
            borderRadius: "12px",
          }}
        >
          <FaExclamationTriangle />

          <span>{error}</span>
        </div>
      )}

      {/* =====================================================
          STAT CARDS
      ====================================================== */}

      <div className="row g-3 mb-4">
        {/* TOTAL */}

        <div className="col-md-6 col-xl-3">
          <div
            className="bg-white shadow-sm h-100"
            style={{
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #E2E8F0",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary small">
                  Total Users
                </div>

                <h3 className="fw-bold mb-0 mt-1">
                  {totalUsers}
                </h3>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#DBEAFE",
                  color: "#2563EB",
                }}
              >
                <FaUsers />
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="col-md-6 col-xl-3">
          <div
            className="bg-white shadow-sm h-100"
            style={{
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #E2E8F0",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary small">
                  Active Users
                </div>

                <h3 className="fw-bold mb-0 mt-1">
                  {activeUsers}
                </h3>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#DCFCE7",
                  color: "#16A34A",
                }}
              >
                <FaToggleOn />
              </div>
            </div>
          </div>
        </div>

        {/* INACTIVE */}

        <div className="col-md-6 col-xl-3">
          <div
            className="bg-white shadow-sm h-100"
            style={{
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #E2E8F0",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary small">
                  Inactive Users
                </div>

                <h3 className="fw-bold mb-0 mt-1">
                  {inactiveUsers}
                </h3>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#FEE2E2",
                  color: "#DC2626",
                }}
              >
                <FaToggleOff />
              </div>
            </div>
          </div>
        </div>

        {/* EMPLOYEES */}

        <div className="col-md-6 col-xl-3">
          <div
            className="bg-white shadow-sm h-100"
            style={{
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #E2E8F0",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-secondary small">
                  Employees
                </div>

                <h3 className="fw-bold mb-0 mt-1">
                  {employeeUsers}
                </h3>
              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#F1F5F9",
                  color: "#475569",
                }}
              >
                <FaUser />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ====================================================== */}

      <div
        className="bg-white shadow-sm"
        style={{
          borderRadius: "18px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
        }}
      >
        {/* SEARCH */}

        <div
          className="p-3 border-bottom"
          style={{
            background: "#FFFFFF",
          }}
        >
          <div
            className="input-group"
            style={{
              maxWidth: "450px",
            }}
          >
            <span
              className="input-group-text bg-light border-end-0"
              style={{
                borderRadius: "10px 0 0 10px",
              }}
            >
              <FaSearch className="text-secondary" />
            </span>

            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search name, email, role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                borderRadius: "0 10px 10px 0",
                boxShadow: "none",
              }}
            />
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================== */}

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead
              style={{
                background: "#F8FAFC",
              }}
            >
              <tr>
                <th className="px-4 py-3">
                  User
                </th>

                <th className="py-3">
                  Email
                </th>

                <th className="py-3">
                  Role
                </th>

                <th className="py-3">
                  Department
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Registered
                </th>

                <th className="py-3 text-end pe-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-5"
                  >
                    <FaUsers
                      size={35}
                      className="text-secondary mb-3"
                    />

                    <h6 className="fw-semibold">
                      No users found
                    </h6>

                    <p className="text-secondary small mb-0">
                      {search
                        ? "Try a different search."
                        : "No registered users are available."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const normalizedRole = String(
                    user.role || "EMPLOYEE"
                  ).toUpperCase();

                  return (
                    <tr key={user._id}>
                      {/* USER */}

                      <td className="px-4">
                        <div className="d-flex align-items-center gap-3">
                          {user.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt={user.name}
                              style={{
                                width: "44px",
                                height: "44px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                background:
                                  "linear-gradient(135deg,#0D6EFD,#2563EB)",
                                color: "#FFFFFF",
                                fontWeight: 700,
                              }}
                            >
                              {user?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "U"}
                            </div>
                          )}

                          <div>
                            <div className="fw-semibold">
                              {user.name || "Unnamed User"}
                            </div>

                            <div className="text-secondary small">
                              {user.phone || "No phone"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* EMAIL */}

                      <td>
                        <span className="text-secondary">
                          {user.email}
                        </span>
                      </td>

                      {/* ROLE */}

                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className={`badge ${getRoleBadgeClass(
                              normalizedRole
                            )}`}
                            style={{
                              padding: "7px 10px",
                              borderRadius: "7px",
                            }}
                          >
                            {getRoleIcon(normalizedRole)}
                            {" "}
                            {normalizedRole}
                          </span>

                          <select
                            className="form-select form-select-sm"
                            value={normalizedRole}
                            disabled={
                              updatingUser === user._id
                            }
                            onChange={(e) =>
                              handleRoleChange(
                                user._id,
                                e.target.value
                              )
                            }
                            style={{
                              width: "115px",
                              borderRadius: "7px",
                            }}
                          >
                            <option value="EMPLOYEE">
                              Employee
                            </option>

                            <option value="MANAGER">
                              Manager
                            </option>

                            <option value="ADMIN">
                              Admin
                            </option>

                            <option value="CEO">
                              CEO
                            </option>
                          </select>
                        </div>
                      </td>

                      {/* DEPARTMENT */}

                      <td>
                        {user.department || "General"}
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`badge ${
                            user.isActive
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                          style={{
                            padding: "7px 10px",
                            borderRadius: "7px",
                          }}
                        >
                          {user.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* DATE */}

                      <td>
                        <span className="text-secondary small">
                          {formatDate(user.createdAt)}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td className="text-end pe-4">
                        <button
                          type="button"
                          className={`btn btn-sm ${
                            user.isActive
                              ? "btn-outline-danger"
                              : "btn-outline-success"
                          }`}
                          disabled={
                            updatingUser === user._id
                          }
                          onClick={() =>
                            handleToggleStatus(user._id)
                          }
                        >
                          {updatingUser === user._id ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                            />
                          ) : user.isActive ? (
                            "Deactivate"
                          ) : (
                            "Activate"
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            FOOTER
        ================================================== */}

        <div
          className="px-4 py-3 border-top d-flex justify-content-between align-items-center"
          style={{
            background: "#F8FAFC",
          }}
        >
          <span className="text-secondary small">
            Showing {filteredUsers.length} of {users.length} users
          </span>

          <span className="text-secondary small">
            Registered Users
          </span>
        </div>
      </div>

      {/* =====================================================
          ANIMATION
      ====================================================== */}

      <style>{`
        .spin-animation {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .table > :not(caption) > * > * {
          padding-top: 15px;
          padding-bottom: 15px;
        }
      `}</style>
    </div>
  );
}