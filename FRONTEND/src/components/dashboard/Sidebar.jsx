import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaBoxOpen,
  FaPlusCircle,
  FaShoppingCart,
  FaUsers,
  FaUserFriends,
  FaChartLine,
  FaHome,
  FaSignOutAlt,
  FaBriefcase,
  FaFileAlt,
  FaPlus,
  FaEnvelope,
  FaTshirt, // Custom orders icon
} from "react-icons/fa";

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect whether current route is CEO or regular Admin dashboard
  const basePath = location.pathname.startsWith("/ceo/dashboard")
    ? "/ceo/dashboard"
    : "/dashboard";

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  // =========================================================
  // MAIN MENU ITEMS
  // =========================================================
  const mainNavItems = [
    {
      name: "Dashboard Overview",
      path: `${basePath}`,
      icon: <FaThLarge />,
      end: true,
    },
    {
      name: "All Products",
      path: `${basePath}/products`,
      icon: <FaBoxOpen />,
    },
    {
      name: "Add Product",
      path: `${basePath}/products/add`,
      icon: <FaPlusCircle />,
    },
  ];

  // =========================================================
  // ORDERS & MANUFACTURING (Includes Custom Orders)
  // =========================================================
  const orderNavItems = [
    {
      name: "Standard Orders",
      path: `${basePath}/orders`,
      icon: <FaShoppingCart />,
    },
    {
      name: "Bulk Custom Orders",
      path: `${basePath}/customizations`,
      icon: <FaTshirt />,
      badge: "NEW", // Visual highlight for bulk institutional orders
    },
    {
      name: "Clients / Customers",
      path: `${basePath}/customers`,
      icon: <FaUsers />,
    },
    {
      name: "General Enquiries",
      path: `${basePath}/enquiries`,
      icon: <FaEnvelope />,
    },
  ];

  // =========================================================
  // SYSTEM & USERS
  // =========================================================
  const systemNavItems = [
    {
      name: "Registered Users",
      path: `${basePath}/users`,
      icon: <FaUserFriends />,
    },
    {
      name: "Analytics & Reports",
      path: `${basePath}/analytics`,
      icon: <FaChartLine />,
    },
  ];

  // =========================================================
  // CAREERS NAVIGATION
  // =========================================================
  const careerItems = [
    {
      name: "Applications",
      path: `${basePath}/applications`,
      icon: <FaFileAlt />,
    },
    {
      name: "Job Postings",
      path: `${basePath}/jobs`,
      icon: <FaBriefcase />,
    },
    {
      name: "Post New Job",
      path: `${basePath}/jobs/add`,
      icon: <FaPlus />,
    },
  ];

  // =========================================================
  // LINK STYLES
  // =========================================================
  const navStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#FFFFFF" : "#CBD5E1",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "11px 14px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "13px",
    background: isActive
      ? "linear-gradient(135deg, #0D6EFD 0%, #2563EB 100%)"
      : "transparent",
    boxShadow: isActive ? "0 6px 18px rgba(13,110,253,0.25)" : "none",
    transition: "all 0.2s ease",
  });

  const careerNavStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#FFFFFF" : "#CBD5E1",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 14px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "13px",
    background: isActive
      ? "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)"
      : "transparent",
    boxShadow: isActive ? "0 6px 18px rgba(124,58,237,0.25)" : "none",
    transition: "all 0.2s ease",
  });

  return (
    <aside
      style={{
        width: "270px",
        minHeight: "100vh",
        height: "100vh",
        background: "linear-gradient(180deg, #071A36 0%, #030914 100%)",
        color: "#FFFFFF",
        padding: "24px 16px",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: "auto",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        scrollbarWidth: "thin",
      }}
    >
      {/* BRAND LOGO */}
      <div className="mb-4 px-2">
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "3px",
            color: "#60A5FA",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Factory Management
        </div>
        <h3
          className="fw-bold mt-1 mb-0"
          style={{ letterSpacing: "1px", color: "#FFFFFF", fontSize: "20px" }}
        >
          VOXCEL NOVA
        </h3>
        <div
          style={{
            marginTop: "12px",
            height: "1px",
            background: "rgba(255,255,255,0.08)",
          }}
        />
      </div>

      {/* NAVIGATION SECTIONS */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "18px" }}>
        
        {/* 1. MAIN CATALOG */}
        <div>
          <div style={sectionLabel}>Catalog & Core</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {mainNavItems.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.end} style={navStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={iconWrapper}>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* 2. ORDERS & CUSTOMIZATIONS */}
        <div>
          <div style={sectionLabel}>Orders & Manufacturing</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {orderNavItems.map((item) => (
              <NavLink key={item.path} to={item.path} style={navStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={iconWrapper}>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      background: "#22C55E",
                      color: "#FFFFFF",
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "2px 7px",
                      borderRadius: "6px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* 3. USERS & ANALYTICS */}
        <div>
          <div style={sectionLabel}>System & Reports</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {systemNavItems.map((item) => (
              <NavLink key={item.path} to={item.path} style={navStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={iconWrapper}>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* 4. CAREERS */}
        <div>
          <div style={sectionLabel}>Careers</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {careerItems.map((item) => (
              <NavLink key={item.path} to={item.path} style={careerNavStyle}>
                <span style={iconWrapper}>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

      </div>

      {/* FOOTER ACTIONS */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "14px",
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <NavLink
          to="/"
          end
          style={{
            textDecoration: "none",
            color: "#94A3B8",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <FaHome />
          <span>View Public Store</span>
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            border: "none",
            width: "100%",
            background: "rgba(239, 68, 68, 0.12)",
            color: "#F87171",
            padding: "10px 12px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

const sectionLabel = {
  fontSize: "10px",
  letterSpacing: "1.5px",
  color: "#64748B",
  fontWeight: 700,
  textTransform: "uppercase",
  padding: "4px 10px",
  marginBottom: "4px",
};

const iconWrapper = {
  width: "18px",
  display: "flex",
  justifyContent: "center",
  fontSize: "15px",
};