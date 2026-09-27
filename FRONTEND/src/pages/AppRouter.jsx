import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// =========================================================
// PROTECTED ROUTE
// =========================================================
import ProtectedRoute from "../components/ProtectedRoute";

// =========================================================
// DASHBOARD LAYOUT
// =========================================================
import DashboardLayout from "../components/dashboard/DashboardLayout";

// =========================================================
// ADMIN / DASHBOARD PAGES
// =========================================================
import Dashboard from "../pages/dashboard/Dashboard";
import ProductsManagement from "../pages/dashboard/ProductsManagement";
import AddProduct from "../pages/dashboard/AddProduct";
import AdminUsers from "../pages/dashboard/AdminUsers";
import AdminOrders from "../pages/dashboard/Orders";
import AdminCustomization from "../pages/dashboard/AdminCustomizations"; // Added

// =========================================================
// CAREERS - ADMIN
// =========================================================
import AdminApplications from "../pages/dashboard/AdminApplications";
import AdminJobs from "../pages/dashboard/AdminJobs";
import AddJob from "../pages/dashboard/AddJob";

// =========================================================
// ENQUIRIES
// =========================================================
import Enquiries from "../pages/dashboard/Enquiries";

// =========================================================
// PUBLIC APP
// =========================================================
import PublicApp from "./PublicApp";

// =========================================================
// APP ROUTER
// =========================================================
const AppRouter = () => {
  return (
    <Routes>
      {/* =====================================================
          ADMIN + CEO DASHBOARD (/dashboard/*)
      ====================================================== */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute allowedRoles={["ADMIN", "CEO"]} />}
      >
        <Route element={<DashboardLayout />}>
          {/* DASHBOARD HOME */}
          <Route index element={<Dashboard />} />

          {/* PRODUCTS */}
          <Route path="products" element={<ProductsManagement />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<AddProduct />} />

          {/* ORDERS */}
          <Route path="orders" element={<AdminOrders />} />

          {/* BULK CUSTOMIZATIONS */}
          <Route path="customizations" element={<AdminCustomization />} />

          {/* USERS */}
          <Route path="users" element={<AdminUsers />} />

          {/* CUSTOMERS */}
          <Route
            path="customers"
            element={
              <PlaceholderPage
                title="Customers Management"
                description="Manage institutional clients, schools, hotels and enterprise accounts."
              />
            }
          />

          {/* ANALYTICS */}
          <Route
            path="analytics"
            element={
              <PlaceholderPage
                title="Business Analytics"
                description="Track sales revenue, factory inventory, and operational metrics."
              />
            }
          />

          {/* ENQUIRIES */}
          <Route path="enquiries" element={<Enquiries />} />

          {/* CAREERS */}
          <Route path="applications" element={<AdminApplications />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="jobs/add" element={<AddJob />} />
          <Route path="jobs/edit/:id" element={<AddJob />} />
        </Route>
      </Route>

      {/* =====================================================
          CEO DASHBOARD (/ceo/dashboard/*)
      ====================================================== */}
      <Route
        path="/ceo/dashboard"
        element={<ProtectedRoute allowedRoles={["CEO", "ADMIN"]} />}
      >
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<AddProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customizations" element={<AdminCustomization />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="jobs/add" element={<AddJob />} />
          <Route path="jobs/edit/:id" element={<AddJob />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route
            path="customers"
            element={
              <PlaceholderPage
                title="CEO Client Portfolio"
                description="Executive view of high-volume client accounts and partnerships."
              />
            }
          />
          <Route
            path="analytics"
            element={
              <PlaceholderPage
                title="Executive Analytics"
                description="Comprehensive executive insights into quarterly sales and factory output."
              />
            }
          />
        </Route>
      </Route>

      {/* =====================================================
          MANAGER DASHBOARD
      ===================================================== */}
      <Route
        path="/manager/dashboard"
        element={<ProtectedRoute allowedRoles={["MANAGER"]} />}
      >
        <Route element={<ManagerDashboard />} />
      </Route>

      {/* =====================================================
          EMPLOYEE DASHBOARD
      ===================================================== */}
      <Route
        path="/employee/dashboard"
        element={<ProtectedRoute allowedRoles={["EMPLOYEE"]} />}
      >
        <Route element={<EmployeeDashboard />} />
      </Route>

      {/* =====================================================
          PUBLIC WEBSITE
      ===================================================== */}
      <Route path="*" element={<PublicApp />} />
    </Routes>
  );
};

// =========================================================
// MANAGER DASHBOARD PLACEHOLDER
// =========================================================
const ManagerDashboard = () => (
  <PlaceholderPage
    title="Manager Dashboard"
    description="Operations, line inventory, and supervisor dashboards are active."
  />
);

// =========================================================
// EMPLOYEE DASHBOARD PLACEHOLDER
// =========================================================
const EmployeeDashboard = () => (
  <PlaceholderPage
    title="Employee Dashboard"
    description="Staff roster, task management, and shifts console."
  />
);

// =========================================================
// PLACEHOLDER PAGE COMPONENT
// =========================================================
const PlaceholderPage = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          @keyframes placeholderFadeIn {
            from {
              opacity: 0;
              transform: translateY(18px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

      <div
        className="d-flex align-items-center justify-content-center text-center p-4"
        style={{
          minHeight: "calc(100vh - 90px)",
          width: "100%",
          backgroundColor: "#F4F7FB",
        }}
      >
        <div
          className="shadow-lg p-5"
          style={{
            maxWidth: "680px",
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            animation: "placeholderFadeIn 0.35s ease-out forwards",
          }}
        >
          <span
            className="badge px-3 py-2 text-uppercase mb-3"
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

          <h2 className="fw-bold mb-2" style={{ color: "#071A2F" }}>
            {title}
          </h2>

          <p
            className="text-secondary mb-4 mx-auto"
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              maxWidth: "480px",
            }}
          >
            {description}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn text-white px-4 py-2 fw-semibold"
            style={{
              backgroundColor: "#123F63",
              borderRadius: "10px",
              border: "none",
            }}
          >
            <i className="bi bi-arrow-left me-2" />
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default AppRouter;