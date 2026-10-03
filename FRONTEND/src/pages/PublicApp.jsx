import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// =========================================================
// 3D CLOTHING & TEXTILE INITIAL LOADER
// =========================================================
import InitialLoader from "../components/Home/InitialLoader";

// =========================================================
// PUBLIC COMPONENTS
// =========================================================
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsApp";

// =========================================================
// PUBLIC PAGES
// =========================================================
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import OurClients from "../pages/OurClientsPage";
import Products from "../pages/Products";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetails from "../pages/ProductDetails";

// =========================================================
// CAREERS - PUBLIC
// =========================================================
import Careers from "./career/Careers";
import JobDetails from "./career/JobDetails";
import ApplyJob from "./career/ApplyJob";

// =========================================================
// BULK ORDERS
// =========================================================
import SchoolUniforms from "../pages/bulk/SchoolUniforms";
import CollegeUniforms from "../pages/bulk/CollegeUniforms";
import CorporateUniforms from "../pages/bulk/CorporateUniforms";
import HotelUniforms from "../pages/bulk/HotelUniforms";

// =========================================================
// SHOPPING
// =========================================================
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import OrderTracking from "../pages/OrderTracking";

// =========================================================
// AUTH
// =========================================================
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Forget from "../pages/auth/ForgotPassword";
import Reset from "../pages/auth/ResetPassword";

// =========================================================
// PROFILE
// =========================================================
import Profile from "../pages/profile/Profile";
import Addresses from "../pages/profile/Addresses";
import ProfileWishlist from "../pages/profile/Wishlist";
import ProfileOrders from "../pages/profile/ProfileOrders";
import ChangePassword from "../components/profile/ChangePassword";

// =========================================================
// PROTECTED ROUTE
// =========================================================
import ProtectedRoute from "../components/ProtectedRoute";

// =========================================================
// PUBLIC APP COMPONENT
// =========================================================
const PublicApp = () => {
  // Always true on fresh load / page refresh (F5 or entering URL)
  const [isLoading, setIsLoading] = useState(true);

  // Triggered when InitialLoader reaches 100% and finishes fading out
  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* 1. 3D ATELIER LOADER (Runs every time the site is opened or refreshed) */}
      {isLoading && <InitialLoader onComplete={handleLoaderComplete} />}

      {/* 2. MAIN APPLICATION CONTENT */}
      <div
        className="d-flex flex-column min-vh-100"
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "var(--bg-main, #F4F8FE)",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          // Smooth fade-in reveal when loader completes
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.45s ease-in-out",
        }}
      >
        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT ROUTING */}
        <main className="flex-grow-1">
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* COMPANY & CLIENTS */}
            <Route path="/about" element={<About />} />
            <Route path="/clients" element={<OurClients />} />
            <Route path="/contact" element={<Contact />} />

            {/* CAREERS */}
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<JobDetails />} />
            <Route path="/careers/:id/apply" element={<ApplyJob />} />

            {/* PRODUCTS */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/product/:id" element={<ProductDetails />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/:categorySlug" element={<CategoryProducts />} />

            {/* BULK ORDERS */}
            <Route path="/bulk-orders/school-uniforms" element={<SchoolUniforms />} />
            <Route path="/bulk/school-uniforms" element={<SchoolUniforms />} />
            <Route path="/bulk-orders/college-uniforms" element={<CollegeUniforms />} />
            <Route path="/bulk/college-uniforms" element={<CollegeUniforms />} />
            <Route path="/bulk-orders/corporate-uniforms" element={<CorporateUniforms />} />
            <Route path="/bulk/corporate-uniforms" element={<CorporateUniforms />} />
            <Route path="/bulk-orders/hotel-uniforms" element={<HotelUniforms />} />
            <Route path="/bulk/hotel-uniforms" element={<HotelUniforms />} />
            <Route path="/bulk-orders" element={<CorporateUniforms />} />
            <Route path="/bulk" element={<CorporateUniforms />} />

            {/* SHOPPING */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/order/:orderId" element={<OrderTracking />} />

            {/* AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<Forget />} />
            <Route path="/reset-password/:token" element={<Reset />} />

            {/* USER PROFILE (PROTECTED) */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["USER", "MANAGER", "EMPLOYEE"]} />
              }
            >
              <Route path="/profile" element={<Profile />}>
                <Route index element={<ProfileOrders />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="orders" element={<ProfileOrders />} />
                <Route path="wishlist" element={<ProfileWishlist />} />
                <Route path="password" element={<ChangePassword />} />
              </Route>
            </Route>

            {/* 404 NOT FOUND */}
            <Route
              path="*"
              element={
                <div
                  className="d-flex align-items-center justify-content-center text-center"
                  style={{
                    minHeight: "70vh",
                    width: "100%",
                    backgroundColor: "#071A2F",
                    color: "#FFFFFF",
                    padding: "40px 20px",
                  }}
                >
                  <div>
                    <h1 className="fw-bold" style={{ fontSize: "60px", marginBottom: "10px" }}>
                      404
                    </h1>
                    <h3 className="fw-semibold" style={{ marginBottom: "10px" }}>
                      Page Not Found
                    </h3>
                    <p className="text-white-50 mb-0">
                      The page you requested does not exist.
                    </p>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        {/* FOOTER */}
        <Footer />

        {/* WHATSAPP FLOATING BUTTON */}
        <WhatsAppButton />
      </div>
    </>
  );
};

export default PublicApp;