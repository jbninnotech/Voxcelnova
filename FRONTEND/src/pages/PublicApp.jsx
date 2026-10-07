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

// =========================================================
// PRODUCT PAGES
// =========================================================
import Products from "../pages/Products";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetails from "../pages/ProductDetails";

// =========================================================
// CAREERS
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
// PUBLIC APP
// =========================================================
const PublicApp = () => {
  // -------------------------------------------------------
  // INITIAL LOADER STATE
  // -------------------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  // -------------------------------------------------------
  // LOADER COMPLETE
  // -------------------------------------------------------
  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* =====================================================
          INITIAL 3D LOADER
      ====================================================== */}
      {isLoading && (
        <InitialLoader onComplete={handleLoaderComplete} />
      )}

      {/* =====================================================
          MAIN APPLICATION
      ====================================================== */}
      <div
        className="d-flex flex-column min-vh-100"
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "var(--bg-main, #F4F8FE)",
          margin: 0,
          padding: 0,
          overflowX: "hidden",

          // Smooth reveal after loader
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.45s ease-in-out",
        }}
      >
        {/* ===================================================
            NAVBAR
        ==================================================== */}
        <Navbar />

        {/* ===================================================
            MAIN CONTENT
        ==================================================== */}
        <main className="flex-grow-1">
          <Routes>

            {/* =================================================
                HOME
            ================================================= */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* =================================================
                COMPANY
            ================================================= */}
            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/clients"
              element={<OurClients />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* =================================================
                CAREERS
            ================================================= */}
            <Route
              path="/careers"
              element={<Careers />}
            />

            <Route
              path="/careers/:id"
              element={<JobDetails />}
            />

            <Route
              path="/careers/:id/apply"
              element={<ApplyJob />}
            />

            {/* =================================================
                PRODUCTS
            ================================================= */}

            {/* Main Products Page */}
            <Route
              path="/products"
              element={<Products />}
            />

            {/* Product Details */}
            <Route
              path="/products/product/:id"
              element={<ProductDetails />}
            />

            {/* =================================================
                CATEGORY PRODUCTS

                IMPORTANT:
                Footer uses:

                /category/t-shirts
                /category/polo-t-shirts
                /category/shirts
                /category/hoodies-sweatshirts
                /category/school-uniforms

                So this route is REQUIRED.
            ================================================= */}
            <Route
              path="/category/:categorySlug"
              element={<CategoryProducts />}
            />

            {/* =================================================
                OPTIONAL LEGACY CATEGORY URL

                If you already have links using:

                /products/t-shirts
                /products/shirts

                they can still work.

                Keep this only if your existing application
                uses these URLs.
            ================================================= */}
            <Route
              path="/products/category/:categorySlug"
              element={<CategoryProducts />}
            />

            {/* =================================================
                BULK ORDERS
            ================================================= */}

            {/* School Uniforms */}
            <Route
              path="/bulk-orders/school-uniforms"
              element={<SchoolUniforms />}
            />

            <Route
              path="/bulk/school-uniforms"
              element={<SchoolUniforms />}
            />

            {/* College Uniforms */}
            <Route
              path="/bulk-orders/college-uniforms"
              element={<CollegeUniforms />}
            />

            <Route
              path="/bulk/college-uniforms"
              element={<CollegeUniforms />}
            />

            {/* Corporate Uniforms */}
            <Route
              path="/bulk-orders/corporate-uniforms"
              element={<CorporateUniforms />}
            />

            <Route
              path="/bulk/corporate-uniforms"
              element={<CorporateUniforms />}
            />

            {/* Hotel Uniforms */}
            <Route
              path="/bulk-orders/hotel-uniforms"
              element={<HotelUniforms />}
            />

            <Route
              path="/bulk/hotel-uniforms"
              element={<HotelUniforms />}
            />

            {/* General Bulk Orders */}
            <Route
              path="/bulk-orders"
              element={<CorporateUniforms />}
            />

            <Route
              path="/bulk"
              element={<CorporateUniforms />}
            />

            {/* =================================================
                SHOPPING
            ================================================= */}

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/wishlist"
              element={<Wishlist />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/order/:orderId"
              element={<OrderTracking />}
            />

            {/* =================================================
                AUTHENTICATION
            ================================================= */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/forgot-password"
              element={<Forget />}
            />

            <Route
              path="/reset-password/:token"
              element={<Reset />}
            />

            {/* =================================================
                USER PROFILE
            ================================================= */}

            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "USER",
                    "MANAGER",
                    "EMPLOYEE",
                  ]}
                />
              }
            >
              <Route
                path="/profile"
                element={<Profile />}
              >
                {/* Default Profile Page */}
                <Route
                  index
                  element={<ProfileOrders />}
                />

                {/* Addresses */}
                <Route
                  path="addresses"
                  element={<Addresses />}
                />

                {/* Orders */}
                <Route
                  path="orders"
                  element={<ProfileOrders />}
                />

                {/* Wishlist */}
                <Route
                  path="wishlist"
                  element={<ProfileWishlist />}
                />

                {/* Change Password */}
                <Route
                  path="password"
                  element={<ChangePassword />}
                />
              </Route>
            </Route>

            {/* =================================================
                404 PAGE
            ================================================= */}
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
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#60A5FA",
                        fontWeight: "700",
                        letterSpacing: "3px",
                        marginBottom: "12px",
                      }}
                    >
                      VOXELNOVA
                    </div>

                    <h1
                      className="fw-bold"
                      style={{
                        fontSize: "70px",
                        lineHeight: 1,
                        marginBottom: "15px",
                      }}
                    >
                      404
                    </h1>

                    <h3
                      className="fw-semibold"
                      style={{
                        marginBottom: "12px",
                      }}
                    >
                      Page Not Found
                    </h3>

                    <p
                      className="text-white-50"
                      style={{
                        maxWidth: "450px",
                        margin: "0 auto",
                        lineHeight: "1.7",
                      }}
                    >
                      The page you requested does not exist or
                      may have been moved.
                    </p>
                  </div>
                </div>
              }
            />

          </Routes>
        </main>

        {/* ===================================================
            FOOTER
        ==================================================== */}
        <Footer />

        {/* ===================================================
            WHATSAPP
        ==================================================== */}
        <WhatsAppButton />
      </div>
    </>
  );
};

export default PublicApp;