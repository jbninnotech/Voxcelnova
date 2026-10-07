import React from "react";
import { FaBars, FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import authStorage from "../../utils/authStorage";

const DashboardHeader = ({ setSidebarOpen }) => {
  const user = authStorage.getUser();

  return (
    <header
      style={{
        height: "78px",
        background: "var(--bg-surface, #FFFFFF)",
        borderBottom: "1px solid var(--border-subtle, #E7EBF0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        flexShrink: 0,
      }}
    >
      {/* LEFT */}
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn d-lg-none"
          onClick={() => setSidebarOpen(true)}
          style={{
            fontSize: "20px",
            color: "var(--text-title, #071A36)",
          }}
        >
          <FaBars />
        </button>

        <div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-muted, #94A3B8)",
              marginBottom: "2px",
            }}
          >
            VOXEL NOVA / ADMIN
          </div>

          <h6
            className="mb-0"
            style={{
              fontWeight: "800",
              color: "var(--text-title, #071A36)",
              fontSize: "18px",
            }}
          >
            Business Dashboard
          </h6>
        </div>
      </div>

      {/* RIGHT */}
      <div className="d-flex align-items-center gap-3">
        {/* SEARCH */}
        <div
          className="d-none d-md-flex align-items-center"
          style={{
            background: "var(--bg-main, #F5F7FA)",
            border: "1px solid var(--border-subtle, #E8EDF3)",
            borderRadius: "10px",
            padding: "8px 13px",
            width: "220px",
          }}
        >
          <FaSearch style={{ color: "#94A3B8" }} />
          <input
            placeholder="Search products..."
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              width: "100%",
              marginLeft: "10px",
              fontSize: "13px",
            }}
          />
        </div>

        {/* NOTIFICATION */}
        <button
          type="button"
          className="btn"
          style={{
            position: "relative",
            color: "#475569",
          }}
        >
          <FaBell size={18} />
          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "7px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--color-cobalt, #0052FF)",
            }}
          />
        </button>

        {/* USER */}
        <div className="d-flex align-items-center gap-2">
          <FaUserCircle size={35} style={{ color: "var(--color-cobalt, #0052FF)" }} />
          <div className="d-none d-sm-block">
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "var(--text-title, #071A36)",
              }}
            >
              {user?.name || "Administrator"}
            </div>

            <div
              style={{
                fontSize: "11px",
                color: "var(--text-muted, #94A3B8)",
              }}
            >
              {user?.role || "Admin Account"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;