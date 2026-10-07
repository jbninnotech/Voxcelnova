import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import authStorage from "../../utils/authStorage";
import {
  FaThLarge,
  FaBoxOpen,
  FaPlusCircle,
  FaShoppingCart,
  FaUserFriends,
  FaChartLine,
  FaHome,
  FaSignOutAlt,
  FaBriefcase,
  FaFileAlt,
  FaPlus,
  FaEnvelope,
  FaTshirt,
  FaTruck,        // Proof of Delivery & Client Projects
  FaStar,         // Client Reviews & Ratings
  FaCommentDots,  // Client Feedbacks
  FaShieldAlt,    // Admin badge
} from "react-icons/fa";

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve current user
  const currentUser = authStorage.getUser?.() || {};

  // Detect whether current route is CEO or regular Admin dashboard
  const basePath = location.pathname.startsWith("/ceo/dashboard")
    ? "/ceo/dashboard"
    : "/dashboard";

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = () => {
    authStorage.clear();
    navigate("/login", { replace: true });
  };

  // =========================================================
  // 1. MAIN CATALOG
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
      end: true,
    },
    {
      name: "Add New Product",
      path: `${basePath}/products/add`,
      icon: <FaPlusCircle />,
    },
  ];

  // =========================================================
  // 2. ORDERS & MANUFACTURING
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
      badge: "NEW",
    },
    {
      name: "General Enquiries",
      path: `${basePath}/enquiries`,
      icon: <FaEnvelope />,
    },
  ];

  // =========================================================
  // 3. CLIENT SHOWCASE & PROOF OF DELIVERY (CMS) - [RESTORED]
  // =========================================================
  const clientCmsItems = [
    {
      name: "Client Deliveries",
      path: `${basePath}/client-projects`,
      icon: <FaTruck />,
      end: true, // Only active on the exact list page
    },
    {
      name: "Add Client Delivery",
      path: `${basePath}/client-projects/add`,
      icon: <FaPlus />,
    },
    {
      name: "Client Reviews",
      path: `${basePath}/client-reviews`,
      icon: <FaStar />,
      badge: "LIVE",
    },
    {
      name: "Client Feedbacks",
      path: `${basePath}/client-feedbacks`,
      icon: <FaCommentDots />,
    },
  ];

  // =========================================================
  // 4. SYSTEM & USERS
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
  // 5. CAREERS NAVIGATION
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
      end: true,
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
  const getNavStyle = (accentGradient = "linear-gradient(135deg, #0052FF 0%, #003ECC 100%)", glowColor = "rgba(0,82,255,0.28)") => {
    return ({ isActive }) => ({
      textDecoration: "none",
      color: isActive ? "#FFFFFF" : "#CBD5E1",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 14px",
      borderRadius: "10px",
      fontWeight: isActive ? 700 : 500,
      fontSize: "13px",
      background: isActive ? accentGradient : "transparent",
      boxShadow: isActive ? `0 6px 18px ${glowColor}` : "none",
      transition: "all 0.2s ease",
    });
  };

  const defaultNavStyle = getNavStyle("linear-gradient(135deg, #0052FF 0%, #003ECC 100%)", "rgba(0,82,255,0.3)");
  const clientNavStyle = getNavStyle("linear-gradient(135deg, #0284C7 0%, #0052FF 100%)", "rgba(0,180,255,0.25)");
  const careerNavStyle = getNavStyle("linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)", "rgba(124,58,237,0.25)");

  return (
    <>
      <style>{`
        .custom-sidebar-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 99px;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
        .sidebar-item-hover:hover {
          background: rgba(255, 255, 255, 0.06) !important;
          color: #FFFFFF !important;
        }
      `}</style>

      <aside
        className="custom-sidebar-scroll"
        style={{
          width: "270px",
          minHeight: "100vh",
          height: "100vh",
          background: "linear-gradient(180deg, #071838 0%, #030A18 100%)",
          color: "#FFFFFF",
          padding: "20px 16px",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflowY: "auto",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* BRAND LOGO */}
        <div className="mb-3 px-2">
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "3px",
              color: "#00D4FF",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            Factory Management
          </div>
          <h3
            className="fw-bold mt-1 mb-0"
            style={{ letterSpacing: "1px", color: "#FFFFFF", fontSize: "20px" }}
          >
            VOXEL NOVA
          </h3>

          {/* USER IDENTITY CHIP */}
          <div
            className="d-flex align-items-center gap-2 mt-3 p-2 rounded-3"
            style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0052FF, #00D4FF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 800,
                color: "#FFFFFF",
                flexShrink: 0,
              }}
            >
              <FaShieldAlt size={12} />
            </div>
            <div style={{ overflow: "hidden", minWidth: 0 }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  color: "#FFFFFF",
                }}
              >
                {currentUser?.name || "Factory Administrator"}
              </div>
              <div style={{ fontSize: "10px", color: "#00D4FF", fontWeight: 700 }}>
                {currentUser?.role ? currentUser.role.toUpperCase() : "ADMIN"}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "14px",
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* NAVIGATION SECTIONS */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* 1. MAIN CATALOG */}
          <div>
            <div style={sectionLabel}>Catalog & Inventory</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className="sidebar-item-hover"
                  style={defaultNavStyle}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={iconWrapper}>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* 2. ORDERS & MANUFACTURING */}
          <div>
            <div style={sectionLabel}>Orders & Production</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {orderNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="sidebar-item-hover"
                  style={defaultNavStyle}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={iconWrapper}>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        background: "#22C55E",
                        color: "#FFFFFF",
                        fontSize: "9px",
                        fontWeight: 800,
                        padding: "2px 7px",
                        borderRadius: "6px",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* 3. CLIENT SHOWCASE & CMS (PRODUCTIONS & PROOF) - [RESTORED] */}
          <div>
            <div style={sectionLabel}>Client Deliveries & CMS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {clientCmsItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className="sidebar-item-hover"
                  style={clientNavStyle}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={iconWrapper}>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        background: "#00D4FF",
                        color: "#071838",
                        fontSize: "9px",
                        fontWeight: 800,
                        padding: "2px 7px",
                        borderRadius: "6px",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* 4. SYSTEM & USERS */}
          <div>
            <div style={sectionLabel}>System & Reports</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {systemNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="sidebar-item-hover"
                  style={defaultNavStyle}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={iconWrapper}>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* 5. CAREERS */}
          <div>
            <div style={sectionLabel}>Careers & Hiring</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {careerItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className="sidebar-item-hover"
                  style={careerNavStyle}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={iconWrapper}>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
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
              transition: "all 0.2s ease",
            }}
          >
            <FaHome size={15} />
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
              transition: "all 0.2s ease",
            }}
          >
            <FaSignOutAlt size={15} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

const sectionLabel = {
  fontSize: "10px",
  letterSpacing: "1.5px",
  color: "#64748B",
  fontWeight: 700,
  textTransform: "uppercase",
  padding: "4px 10px",
  marginBottom: "3px",
};

const iconWrapper = {
  width: "18px",
  display: "flex",
  justifyContent: "center",
  fontSize: "14px",
};