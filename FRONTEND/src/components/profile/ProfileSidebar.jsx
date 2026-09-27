import React from "react";
import {
  FiUser,
  FiMapPin,
  FiHeart,
  FiLock,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

const ProfileSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: <FiUser size={18} />,
    },
    {
      id: "addresses",
      label: "My Addresses",
      icon: <FiMapPin size={18} />,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: <FiHeart size={18} />,
    },
    {
      id: "password",
      label: "Change Password",
      icon: <FiLock size={18} />,
    },
  ];

  return (
    <>
      {/* Embedded CSS for smooth hover transitions & animations */}
      <style>{`
        @keyframes sidebarSlideFade {
          from {
            opacity: 0;
            transform: translateX(-14px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .sidebar-item-btn {
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .sidebar-item-btn:hover:not(.active) {
          background-color: #F1F5F9 !important;
          color: #123F63 !important;
          transform: translateX(5px);
        }

        .sidebar-item-btn.active {
          background: linear-gradient(135deg, #071A2F 0%, #123F63 100%) !important;
          color: #ffffff !important;
          box-shadow: 0 4px 14px rgba(18, 63, 99, 0.28);
          transform: translateX(4px);
        }

        .logout-btn {
          transition: all 0.25s ease;
        }

        .logout-btn:hover {
          background-color: #FEF2F2 !important;
          color: #DC2626 !important;
          transform: translateX(5px);
        }
      `}</style>

      {/* Main Sidebar Card */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: "20px",
          background: "#ffffff",
          overflow: "hidden",
          animation: "sidebarSlideFade 0.35s ease-out forwards",
        }}
      >
        {/* Profile Card Header */}
        <div
          className="d-flex align-items-center gap-3 p-4 border-bottom"
          style={{
            background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
          }}
        >
          {/* Avatar Icon */}
          <div
            className="d-flex align-items-center justify-content-center text-white flex-shrink-0"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #071A2F, #123F63)",
              boxShadow: "0 4px 12px rgba(7, 26, 47, 0.25)",
            }}
          >
            <FiUser size={22} />
          </div>

          {/* User / Account Info */}
          <div className="overflow-hidden">
            <h6 className="mb-0 fw-bold text-dark text-truncate">My Account</h6>
            <small className="text-muted" style={{ fontSize: "12px" }}>
              Manage your account
            </small>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="p-3 d-flex flex-column gap-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`btn sidebar-item-btn w-100 d-flex align-items-center justify-content-between text-start border-0 py-2 px-3 rounded-3 ${
                  isActive ? "active" : "text-secondary"
                }`}
                style={{
                  backgroundColor: "transparent",
                  fontSize: "14px",
                  fontWeight: isActive ? "600" : "500",
                }}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="d-flex align-items-center gap-3">
                  <span
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      color: isActive ? "#ffffff" : "#64748B",
                    }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                <FiChevronRight
                  size={15}
                  style={{
                    opacity: isActive ? 1 : 0.4,
                    transition: "transform 0.2s ease",
                    transform: isActive ? "translateX(2px)" : "none",
                  }}
                />
              </button>
            );
          })}

          <hr className="my-2 text-muted" style={{ opacity: 0.12 }} />

          {/* Logout Button */}
          <button
            type="button"
            className="btn logout-btn w-100 d-flex align-items-center justify-content-between text-start border-0 py-2 px-3 rounded-3"
            style={{
              backgroundColor: "transparent",
              color: "#EF4444",
              fontSize: "14px",
              fontWeight: "600",
            }}
            onClick={onLogout}
          >
            <div className="d-flex align-items-center gap-3">
              <span className="d-flex align-items-center justify-content-center">
                <FiLogOut size={18} />
              </span>
              <span>Logout</span>
            </div>

            <FiChevronRight size={15} style={{ opacity: 0.5 }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;