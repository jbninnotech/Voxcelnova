import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileSidebar from "../../components/profile/ProfileSidebar";
import ProfileInfo from "../../components/profile/ProfileInfo";
import Addresses from "./Addresses";
import Wishlist from "./Wishlist";
import ChangePassword from "../../components/profile/ChangePassword";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    // Clear both storages to ensure clean logout
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "addresses":
        return <Addresses />;
      case "wishlist":
        return <Wishlist />;
      case "password":
        return <ChangePassword />;
      case "profile":
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <>
      {/* Keyframe animations for entrance and tab-switching */}
      <style>{`
        @keyframes pageFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tabContentFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tab-content-panel {
          animation: tabContentFade 0.3s ease-out forwards;
        }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#F8FAFC",
          paddingTop: "40px",
          paddingBottom: "60px",
          animation: "pageFadeIn 0.35s ease-out forwards",
        }}
      >
        <div className="container">
          {/* Header Section */}
          <div className="mb-4 text-start">
            <span
              className="badge px-3 py-2 text-uppercase mb-2"
              style={{
                backgroundColor: "rgba(18, 63, 99, 0.08)",
                color: "#123F63",
                letterSpacing: "1.5px",
                fontWeight: "700",
                fontSize: "11px",
                borderRadius: "8px",
              }}
            >
              VOXCEL NOVA
            </span>

            <h2 className="fw-bold mb-1" style={{ color: "#071A2F" }}>
              My Account
            </h2>

            <p className="text-secondary mb-0" style={{ fontSize: "15px" }}>
              Manage your personal details, delivery addresses, wishlist and security settings.
            </p>
          </div>

          {/* Main Layout Grid */}
          <div className="row g-4 align-items-start">
            {/* Left Sidebar */}
            <aside className="col-12 col-lg-4 col-xl-3">
              <div className="sticky-top" style={{ top: "24px", zIndex: 10 }}>
                <ProfileSidebar
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onLogout={handleLogout}
                />
              </div>
            </aside>

            {/* Right Main Content Card */}
            <section className="col-12 col-lg-8 col-xl-9">
              <div
                key={activeTab} // Triggers tabContentFade animation on every tab change
                className="tab-content-panel bg-white shadow-sm border-0"
                style={{
                  borderRadius: "20px",
                  padding: "32px",
                  minHeight: "500px",
                }}
              >
                {renderContent()}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;