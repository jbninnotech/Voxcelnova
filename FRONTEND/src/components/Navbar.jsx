import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaBolt,
  FaChevronDown,
  FaSchool,
  FaGraduationCap,
  FaBuilding,
  FaHotel,
  FaArrowRight,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const cartContext = useCart() || {};
  const wishlistContext = useWishlist?.() || {};

  const cartTotal =
    cartContext.cartCount ??
    (cartContext.cartItems
      ? cartContext.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
      : 0);

  const wishlistTotal =
    wishlistContext.wishlistCount ??
    (wishlistContext.wishlistItems ? wishlistContext.wishlistItems.length : 0);

  const [localWishlistCount, setLocalWishlistCount] = useState(0);

  useEffect(() => {
    const updateWishCount = () => {
      try {
        const saved = sessionStorage.getItem("voxcel_nova_wishlist");
        setLocalWishlistCount(saved ? JSON.parse(saved).length : wishlistTotal);
      } catch {
        setLocalWishlistCount(wishlistTotal);
      }
    };
    updateWishCount();
  }, [wishlistTotal]);

  const totalWishlist = wishlistContext.wishlistCount ?? localWishlistCount;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bulkOpen, setBulkOpen] = useState(false);
  const [mobileBulkOpen, setMobileBulkOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const bulkDropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setBulkOpen(false);
    setMobileBulkOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (bulkDropdownRef.current && !bulkDropdownRef.current.contains(e.target)) {
        setBulkOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target) &&
        !searchQuery.trim()
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [searchQuery]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  /* NAVIGATION ITEMS WITH CLIENTS PAGE */
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Clients", path: "/clients" },
    { name: "About", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const bulkCategories = [
    {
      name: "School Uniforms",
      path: "/bulk-orders/school-uniforms",
      icon: <FaSchool />,
      description: "Durable and breathable textiles for everyday wear.",
      badge: "K-12 READY",
    },
    {
      name: "College Uniforms",
      path: "/bulk-orders/college-uniforms",
      icon: <FaGraduationCap />,
      description: "Blazers, lab coats, and institutional campus attire.",
      badge: "HIGHER ED",
    },
    {
      name: "Corporate Uniforms",
      path: "/bulk-orders/corporate-uniforms",
      icon: <FaBuilding />,
      description: "Executive shirting, workwear, and team apparel.",
      badge: "BESTSELLER",
    },
    {
      name: "Hotel & Hospitality",
      path: "/bulk/hotel-uniforms",
      icon: <FaHotel />,
      description: "Chef coats, service staff, and luxury hotel styling.",
      badge: "PREMIUM",
    },
  ];

  return (
    <>
      <nav className={`vx-navbar-root ${scrolled ? "scrolled" : ""}`}>
        <div className="vx-container">
          {/* LOGO */}
          <Link to="/" className="vx-brand-anchor">
            <div className="vx-logo-box">
              {!logoError ? (
                <img
                  src={logo}
                  alt="Voxcel Nova"
                  className="vx-logo-img"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="vx-logo-fallback">
                  <FaBolt size={18} />
                </div>
              )}
            </div>
            <div className="vx-brand-text">
              <span className="brand-title">VOXCEL NOVA</span>
              <span className="brand-subtitle">
                CLOTHING <span className="sub-accent">&</span> UNIFORMS
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="vx-desktop-menu">
            <ul className="vx-nav-list">
              {/* Home & Products */}
              {navItems.slice(0, 2).map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `vx-nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              {/* Bulk Orders Dropdown */}
              <li className="position-relative" ref={bulkDropdownRef}>
                <button
                  type="button"
                  className={`vx-nav-link vx-bulk-btn ${
                    bulkOpen || location.pathname.includes("/bulk") ? "active" : ""
                  }`}
                  onClick={() => setBulkOpen((prev) => !prev)}
                >
                  <span>Bulk Orders</span>
                  <FaChevronDown className={`vx-chevron ${bulkOpen ? "rotate" : ""}`} />
                </button>

                <div className={`vx-mega-dropdown ${bulkOpen ? "open" : ""}`}>
                  <div className="dropdown-header">
                    <div>
                      <h4>Bulk Manufacturing</h4>
                      <p>Direct industrial supply with custom branding</p>
                    </div>
                    <Link
                      to="/bulk-orders"
                      className="view-all-pill"
                      onClick={() => setBulkOpen(false)}
                    >
                      <span>Explore Catalog</span>
                      <FaArrowRight size={10} />
                    </Link>
                  </div>

                  <div className="dropdown-grid">
                    {bulkCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="category-card"
                        onClick={() => setBulkOpen(false)}
                      >
                        <div className="category-icon-box">{category.icon}</div>
                        <div className="category-info">
                          <div className="category-title-row">
                            <span className="category-name">{category.name}</span>
                            <span className="category-badge">{category.badge}</span>
                          </div>
                          <p className="category-description">
                            {category.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {/* Clients, About, Careers, Contact */}
              {navItems.slice(2).map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `vx-nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    {item.name === "Careers" && (
                      <FaBriefcase size={12} style={{ marginRight: 6 }} />
                    )}
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ACTIONS */}
          <div className="vx-action-group">
            {/* Search */}
            <form
              ref={searchContainerRef}
              className="vx-search-form"
              onSubmit={handleSearchSubmit}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search collection..."
                className={`vx-search-field ${searchOpen ? "open" : ""}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchOpen && searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                >
                  <FaTimes size={11} />
                </button>
              )}
              <button
                type="button"
                className={`vx-icon-btn ${searchOpen ? "search-active" : ""}`}
                onClick={() => {
                  if (searchOpen && searchQuery.trim()) {
                    handleSearchSubmit();
                  } else {
                    setSearchOpen((prev) => !prev);
                  }
                }}
              >
                <FaSearch size={14} />
              </button>
            </form>

            {/* Account */}
            <Link to="/login" className="vx-icon-btn d-none-sm" title="Account">
              <FaUser size={14} />
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="vx-icon-btn" title="Wishlist">
              <FaHeart size={14} />
              {totalWishlist > 0 && (
                <span className="vx-badge badge-rose">
                  {totalWishlist > 99 ? "99+" : totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="vx-icon-btn cart-btn" title="Shopping Bag">
              <FaShoppingCart size={14} />
              {cartTotal > 0 && (
                <span className="vx-badge badge-cobalt">
                  {cartTotal > 99 ? "99+" : cartTotal}
                </span>
              )}
            </Link>

            {/* Mobile Toggle */}
            <button
              type="button"
              className={`vx-icon-btn d-mobile-only ${mobileOpen ? "menu-open" : ""}`}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`vx-mobile-drawer ${mobileOpen ? "open" : ""}`}>
          <div className="mobile-inner">
            <ul className="mobile-nav-list">
              {navItems.slice(0, 2).map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className="mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              {/* Mobile Bulk Accordion */}
              <li>
                <button
                  type="button"
                  className="mobile-link mobile-accordion-trigger"
                  onClick={() => setMobileBulkOpen((prev) => !prev)}
                >
                  <span>Bulk Uniforms</span>
                  <FaChevronDown
                    className={`vx-chevron ${mobileBulkOpen ? "rotate" : ""}`}
                  />
                </button>
                {mobileBulkOpen && (
                  <div className="mobile-sub-menu">
                    {bulkCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="mobile-sub-item"
                        onClick={() => setMobileOpen(false)}
                      >
                        <div className="sub-icon">{category.icon}</div>
                        <div>
                          <span className="sub-title">{category.name}</span>
                          <span className="sub-badge">{category.badge}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {navItems.slice(2).map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className="mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {item.name === "Careers" && <FaBriefcase size={13} />}
                      {item.name === "Clients" && <FaUsers size={13} />}
                      {item.name}
                    </span>
                  </NavLink>
                </li>
              ))}

              <li>
                <Link
                  to="/login"
                  className="mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <FaUser size={13} />
                    My Account
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>{`
        :root {
          --bg-main: #F4F8FE;
          --bg-surface: #FFFFFF;
          --bg-badge-tint: #E8F5FE;
          --color-cobalt: #0052FF;
          --color-cobalt-hover: #003ECC;
          --color-cyan: #00D4FF;
          --text-title: #071838;
          --text-body: #495E7C;
          --text-muted: #6B82A0;
          --border-subtle: rgba(0, 82, 255, 0.14);
          --border-hover: rgba(0, 212, 255, 0.60);
        }

        .vx-navbar-root {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--border-subtle);
          transition: .3s ease;
          min-height: 72px;
          display: flex;
          align-items: center;
        }

        .vx-navbar-root.scrolled {
          background: rgba(255,255,255,.98);
          box-shadow: 0 10px 28px rgba(0,48,143,.08);
        }

        .vx-container {
          max-width: 1280px;
          width: 100%;
          margin: auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .vx-brand-anchor {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .vx-logo-img {
          height: 38px;
          width: auto;
          object-fit: contain;
        }

        .vx-logo-fallback {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-cyan));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vx-brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          color: var(--text-title);
          font-weight: 900;
          font-size: 1.15rem;
          letter-spacing: 1px;
        }

        .brand-subtitle {
          font-size: .62rem;
          letter-spacing: 1.6px;
          font-weight: 800;
          color: var(--text-muted);
        }

        .sub-accent {
          color: var(--color-cobalt);
        }

        .vx-desktop-menu {
          display: flex;
          align-items: center;
        }

        .vx-nav-list {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .vx-nav-link {
          display: inline-flex;
          align-items: center;
          padding: 8px 13px;
          color: var(--text-body);
          text-decoration: none;
          font-size: .88rem;
          font-weight: 600;
          border-radius: 99px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: .2s ease;
        }

        .vx-nav-link:hover,
        .vx-nav-link.active {
          color: var(--color-cobalt);
          background: var(--bg-badge-tint);
        }

        .vx-bulk-btn {
          gap: 6px;
        }

        .vx-chevron {
          transition: transform .3s ease;
        }

        .vx-chevron.rotate {
          transform: rotate(180deg);
        }

        .vx-mega-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          width: 660px;
          background: white;
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 20px 48px rgba(0,48,143,.12);
          opacity: 0;
          visibility: hidden;
          transition: .24s ease;
        }

        .vx-mega-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 14px;
        }

        .dropdown-header h4 {
          margin: 0;
          font-size: .98rem;
          font-weight: 800;
          color: var(--text-title);
        }

        .dropdown-header p {
          margin: 2px 0 0;
          font-size: .76rem;
          color: var(--text-muted);
        }

        .view-all-pill {
          display: inline-flex;
          gap: 6px;
          align-items: center;
          color: var(--color-cobalt);
          background: var(--bg-badge-tint);
          padding: 6px 14px;
          border-radius: 99px;
          text-decoration: none;
          font-size: .75rem;
          font-weight: 700;
        }

        .dropdown-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 12px;
        }

        .category-card {
          display: flex;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          text-decoration: none;
          background: var(--bg-main);
          border: 1px solid var(--border-subtle);
        }

        .category-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--color-cobalt), #2872ff);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .category-title-row {
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }

        .category-name {
          font-size: .88rem;
          font-weight: 700;
          color: var(--text-title);
        }

        .category-badge {
          font-size: .6rem;
          color: var(--color-cobalt);
        }

        .category-description {
          margin: 4px 0 0;
          font-size: .74rem;
          color: var(--text-body);
        }

        .vx-action-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .vx-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-main);
          border: 1px solid var(--border-subtle);
          color: var(--text-body);
          text-decoration: none;
          cursor: pointer;
          position: relative;
        }

        .vx-icon-btn:hover {
          color: var(--color-cobalt);
          border-color: var(--border-hover);
        }

        .vx-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 18px;
          height: 18px;
          border-radius: 99px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: white;
          border: 2px solid white;
        }

        .badge-rose {
          background: #f43f5e;
        }

        .badge-cobalt {
          background: var(--color-cobalt);
        }

        .vx-search-form {
          display: flex;
          align-items: center;
        }

        .vx-search-field {
          width: 0;
          opacity: 0;
          pointer-events: none;
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 6px 12px;
          outline: none;
          transition: .3s ease;
        }

        .vx-search-field.open {
          width: 190px;
          opacity: 1;
          pointer-events: auto;
          margin-right: 6px;
        }

        .search-clear-btn {
          position: absolute;
          right: 48px;
          background: transparent;
          border: none;
        }

        .vx-mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          max-height: 0;
          overflow: hidden;
          transition: .4s ease;
        }

        .vx-mobile-drawer.open {
          max-height: 700px;
        }

        .mobile-inner {
          padding: 16px 20px 24px;
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          color: var(--text-title);
          text-decoration: none;
          font-size: .95rem;
          font-weight: 600;
          border-radius: 10px;
          background: var(--bg-main);
          border: 1px solid var(--border-subtle);
          width: 100%;
        }

        .mobile-sub-menu {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 6px 0 6px 12px;
        }

        .mobile-sub-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: var(--bg-main);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          text-decoration: none;
        }

        .sub-icon {
          color: var(--color-cobalt);
        }

        .sub-title {
          font-size: .85rem;
          font-weight: 700;
          color: var(--text-title);
          display: block;
        }

        .sub-badge {
          font-size: .62rem;
          color: var(--color-cobalt);
        }

        .d-mobile-only {
          display: none;
        }

        @media (max-width: 1100px) {
          .vx-nav-link {
            padding: 8px 9px;
          }
        }

        @media (max-width: 960px) {
          .vx-desktop-menu {
            display: none;
          }
          .d-mobile-only {
            display: flex;
          }
        }

        @media (max-width: 540px) {
          .d-none-sm {
            display: none;
          }
          .brand-subtitle {
            display: none;
          }
          .vx-search-field.open {
            width: 130px;
          }
          .vx-container {
            padding: 0 16px;
          }
          .brand-title {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </>
  );
}