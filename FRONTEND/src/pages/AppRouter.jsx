import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// =========================================================
// PROTECTED ROUTE & LAYOUT
// =========================================================
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../components/dashboard/DashboardLayout";

// =========================================================
// ADMIN / DASHBOARD PAGES
// =========================================================
import Dashboard from "../pages/dashboard/Dashboard";
import ProductsManagement from "../pages/dashboard/ProductsManagement";
import AddProduct from "../pages/dashboard/AddProduct";
import AdminUsers from "../pages/dashboard/AdminUsers";
import AdminOrders from "../pages/dashboard/Orders";
import AdminCustomization from "../pages/dashboard/AdminCustomizations";

// =========================================================
// CLIENT SHOWCASE & REVIEWS
// =========================================================
import ClientProjectsList from "../pages/dashboard/ClientProjectsList";
import AddClientProject from "../pages/dashboard/AddClientProject";
import AdminClientReviews from "../pages/dashboard/AdminClientReviews";
import AdminClientFeedback from "../pages/dashboard/AdminClientFeedback";
import Reports from "../pages/dashboard/Reports";

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

const AppRouter = () => {
  return (
    <Routes>
      {/* =====================================================
          ADMIN + CEO DASHBOARD (/dashboard/*)
          Supports both uppercase and lowercase roles
      ====================================================== */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute allowedRoles={["ADMIN", "CEO", "admin", "ceo"]} />}
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

          {/* CLIENT SHOWCASE & REVIEWS */}
          <Route path="client-projects" element={<ClientProjectsList />} />
          <Route path="client-projects/add" element={<AddClientProject />} />
          <Route path="client-reviews" element={<AdminClientReviews />} />
          <Route path="client-feedbacks" element={<AdminClientFeedback />} />

          {/* USERS */}
          <Route path="users" element={<AdminUsers />} />

          {/* ANALYTICS & REPORTS */}
          <Route path="analytics" element={<Reports />} />
          <Route path="reports" element={<Reports />} />

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
        element={<ProtectedRoute allowedRoles={["CEO", "ADMIN", "ceo", "admin"]} />}
      >
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<AddProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customizations" element={<AdminCustomization />} />

          {/* CLIENT SHOWCASE & REVIEWS (CEO ACCESS) */}
          <Route path="client-projects" element={<ClientProjectsList />} />
          <Route path="client-projects/add" element={<AddClientProject />} />
          <Route path="client-reviews" element={<AdminClientReviews />} />
          <Route path="client-feedbacks" element={<AdminClientFeedback />} />

          <Route path="users" element={<AdminUsers />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="jobs/add" element={<AddJob />} />
          <Route path="jobs/edit/:id" element={<AddJob />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="analytics" element={<Reports />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Route>

      {/* =====================================================
          MANAGER DASHBOARD
      ===================================================== */}
      <Route
        path="/manager/dashboard"
        element={<ProtectedRoute allowedRoles={["MANAGER", "manager"]} />}
      >
        <Route element={<ManagerDashboard />} />
      </Route>

      {/* =====================================================
          EMPLOYEE DASHBOARD
      ===================================================== */}
      <Route
        path="/employee/dashboard"
        element={<ProtectedRoute allowedRoles={["EMPLOYEE", "employee"]} />}
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

const ManagerDashboard = () => (
  <PlaceholderPage
    title="Manager Dashboard"
    description="Operations, line inventory, and supervisor dashboards are active."
  />
);

const EmployeeDashboard = () => (
  <PlaceholderPage
    title="Employee Dashboard"
    description="Staff roster, task management, and shifts console."
  />
);

const PlaceholderPage = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center text-center p-4"
      style={{ minHeight: "calc(100vh - 90px)", backgroundColor: "#F4F7FB" }}
    >
      <div className="shadow-lg p-5 bg-white rounded-4" style={{ maxWidth: "680px" }}>
        <h2 className="fw-bold mb-2 text-dark">{title}</h2>
        <p className="text-secondary mb-4">{description}</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-dark px-4 py-2 fw-semibold"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AppRouter;