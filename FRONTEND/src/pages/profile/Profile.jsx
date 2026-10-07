import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiClock, FiCheckCircle, FiXCircle, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

import ProfileSidebar from "../../components/profile/ProfileSidebar";
import ProfileInfo from "../../components/profile/ProfileInfo";
import Addresses from "./Addresses";
import Wishlist from "./Wishlist";
import ChangePassword from "../../components/profile/ChangePassword";
import ProfileOrders from "./ProfileOrders";

import authStorage from "../../utils/authStorage";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getUserOrders } from "../../services/orderService";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const user = authStorage.getUser();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [orderMetrics, setOrderMetrics] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const data = await getUserOrders();
      const ordersList = data.orders || [];

      let pending = 0;
      let completed = 0;
      let cancelled = 0;

      ordersList.forEach((o) => {
        const st = String(o.orderStatus || "").toLowerCase();
        if (st.includes("cancel")) {
          cancelled++;
        } else if (st.includes("deliv")) {
          completed++;
        } else {
          pending++;
        }
      });

      setOrderMetrics({
        total: ordersList.length,
        pending,
        completed,
        cancelled,
      });
    } catch (e) {
      console.warn("User dashboard metrics fetch warning:", e.message);
    }
  };

  const handleLogout = () => {
    authStorage.clear();
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <ProfileOrders />;
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

        .user-stat-card {
          background: var(--bg-surface, #FFFFFF);
          border: 1px solid var(--border-subtle, rgba(0, 82, 255, 0.14));
          border-radius: 16px;
          padding: 18px 20px;
          box-shadow: var(--shadow-card, 0 12px 32px rgba(0, 48, 143, 0.06));
          transition: transform 0.2s ease;
        }

        .user-stat-card:hover {
          transform: translateY(-3px);
          border-color: var(--color-cyan, #00D4FF);
        }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--bg-main, #F4F8FE)",
          paddingTop: "30px",
          paddingBottom: "60px",
          animation: "pageFadeIn 0.35s ease-out forwards",
        }}
      >
        <div className="container">
          {/* Header & Welcome Banner */}
          <div className="mb-4 text-start">
            <span
              className="badge px-3 py-2 text-uppercase mb-2"
              style={{
                backgroundColor: "var(--bg-badge-tint, #E8F5FE)",
                color: "var(--color-cobalt, #0052FF)",
                letterSpacing: "1.5px",
                fontWeight: "700",
                fontSize: "11px",
                borderRadius: "8px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              VOXCL NOVA USER DASHBOARD
            </span>

            <h2 className="fw-bold mb-1" style={{ color: "var(--text-title, #071838)" }}>
              Welcome back, {user?.name || "Valued Client"}!
            </h2>

            <p className="small mb-0" style={{ color: "var(--text-body, #495E7C)" }}>
              Track your clothing orders, view delivery status, manage address book, and update account preferences.
            </p>
          </div>

          {/* User Dashboard Overview Metrics Grid */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-md-4 col-lg-2">
              <div className="user-stat-card d-flex flex-column align-items-start">
                <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                  <span className="text-secondary small fw-semibold">Total Orders</span>
                  <FiShoppingBag color="#0052FF" size={18} />
                </div>
                <div className="fs-3 fw-bold" style={{ color: "#071838" }}>
                  {orderMetrics.total}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="user-stat-card d-flex flex-column align-items-start">
                <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                  <span className="text-secondary small fw-semibold">Pending</span>
                  <FiClock color="#F59E0B" size={18} />
                </div>
                <div className="fs-3 fw-bold" style={{ color: "#D97706" }}>
                  {orderMetrics.pending}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="user-stat-card d-flex flex-column align-items-start">
                <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                  <span className="text-secondary small fw-semibold">Completed</span>
                  <FiCheckCircle color="#10B981" size={18} />
                </div>
                <div className="fs-3 fw-bold" style={{ color: "#059669" }}>
                  {orderMetrics.completed}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="user-stat-card d-flex flex-column align-items-start">
                <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                  <span className="text-secondary small fw-semibold">Cancelled</span>
                  <FiXCircle color="#EF4444" size={18} />
                </div>
                <div className="fs-3 fw-bold" style={{ color: "#DC2626" }}>
                  {orderMetrics.cancelled}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="user-stat-card d-flex flex-column align-items-start">
                <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                  <span className="text-secondary small fw-semibold">Wishlist</span>
                  <FiHeart color="#EC4899" size={18} />
                </div>
                <div className="fs-3 fw-bold" style={{ color: "#DB2777" }}>
                  {wishlistCount}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-2">
              <div className="user-stat-card d-flex flex-column align-items-start">
                <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                  <span className="text-secondary small fw-semibold">Cart Items</span>
                  <FiShoppingCart color="#00D4FF" size={18} />
                </div>
                <div className="fs-3 fw-bold" style={{ color: "#0052FF" }}>
                  {cartCount}
                </div>
              </div>
            </div>
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
                key={activeTab}
                className="tab-content-panel bg-white shadow-sm border-0"
                style={{
                  borderRadius: "20px",
                  padding: "32px",
                  minHeight: "500px",
                  boxShadow: "var(--shadow-card)",
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