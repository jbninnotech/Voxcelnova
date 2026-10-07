import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import authStorage from "../../utils/authStorage";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // FORM STATES
  // =========================================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // ROLE CONFIGURATION
  // =========================================================
  const ADMIN_ROLES = ["ADMIN", "CEO"];
  const USER_ROLES = ["MANAGER", "EMPLOYEE", "USER"];

  const normalizeRole = (role) => {
    return String(role || "")
      .trim()
      .toUpperCase();
  };

  const clearSession = () => {
    authStorage.clear();
  };

  const saveSession = (token, user, role) => {
    authStorage.setToken(token);
    authStorage.setUser(user);
    authStorage.setRole(role);
  };

  const redirectByRole = (role) => {
    const hasBuyNowItem = sessionStorage.getItem("buyNowCheckout");
    if (hasBuyNowItem || location.state?.fromBuyNow) {
      navigate("/checkout", { replace: true });
      return;
    }

    if (ADMIN_ROLES.includes(role)) {
      navigate("/dashboard", { replace: true });
      return;
    }

    navigate("/profile", { replace: true });
  };

  // =========================================================
  // LOGIN SUBMIT
  // =========================================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail) {
        throw new Error("Please enter your email address.");
      }
      if (!password) {
        throw new Error("Please enter your password.");
      }

      clearSession();

      const data = await loginUser(cleanEmail, password);

      if (!data?.token) {
        throw new Error("Login token was not received from server.");
      }
      if (!data?.user) {
        throw new Error("User information was not received from server.");
      }

      const role = normalizeRole(data.user.role);
      const allRoles = [...ADMIN_ROLES, ...USER_ROLES];

      if (!allRoles.includes(role)) {
        throw new Error(
          `Invalid user role: ${data.user.role || "Role not found"}`
        );
      }

      saveSession(data.token, data.user, role);
      redirectByRole(role);
    } catch (err) {
      clearSession();
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please verify your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          --shadow-glow: 0 8px 25px rgba(0, 82, 255, 0.32);
        }

        @keyframes loginFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes alertShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .login-input:focus {
          border-color: var(--color-cobalt) !important;
          box-shadow: 0 0 0 0.22rem rgba(0, 82, 255, 0.16) !important;
          background-color: #FFFFFF !important;
        }

        .login-submit-btn {
          background-color: var(--color-cobalt) !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          border: none !important;
        }

        .login-submit-btn:hover:not(:disabled) {
          background-color: var(--color-cobalt-hover) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .register-btn {
          transition: all 0.2s ease;
          border-color: #CBD5E1 !important;
          color: var(--text-title) !important;
          background-color: var(--bg-main) !important;
        }

        .register-btn:hover {
          background-color: var(--bg-badge-tint) !important;
          color: var(--color-cobalt) !important;
          border-color: var(--color-cobalt) !important;
          transform: translateY(-1px);
        }

        .forgot-link {
          color: var(--color-cobalt);
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .forgot-link:hover {
          color: var(--color-cobalt-hover);
          text-decoration: underline;
        }
      `}</style>

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          padding: "24px",
          background:
            "radial-gradient(circle at 15% 20%, #071838 0%, #031024 60%, #010712 100%)",
        }}
      >
        {/* =====================================================
            LOGIN CARD
        ====================================================== */}
        <div
          className="row shadow-lg overflow-hidden"
          style={{
            width: "100%",
            maxWidth: "1020px",
            minHeight: "620px",
            background: "#FFFFFF",
            borderRadius: "28px",
            border: "1px solid rgba(0, 82, 255, 0.16)",
            animation: "loginFadeIn 0.4s ease forwards",
          }}
        >
          {/* ===================================================
              LEFT BRANDING PANEL
          ==================================================== */}
          <div
            className="col-lg-6 d-none d-lg-flex flex-column justify-content-between position-relative"
            style={{
              padding: "60px",
              color: "#FFFFFF",
              background:
                "linear-gradient(145deg, #071838 0%, #002B82 50%, #0052FF 100%)",
            }}
          >
            <div>
              {/* LOGO */}
              <div
                className="d-flex align-items-center justify-content-center mb-4 shadow-sm"
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <i
                  className="bi bi-building fs-2 text-white"
                  style={{ color: "var(--color-cyan)" }}
                />
              </div>

              {/* BADGE */}
              <span
                className="badge mb-2 px-3 py-2 text-uppercase"
                style={{
                  backgroundColor: "rgba(255,255,255,0.14)",
                  letterSpacing: "1.5px",
                  fontSize: "11px",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Enterprise Portal
              </span>

              {/* TITLE */}
              <h1 className="fw-bold mb-3 mt-1" style={{ letterSpacing: "-0.5px" }}>
                VOXCL NOVA
              </h1>

              <h5
                className="mb-4 fw-normal"
                style={{ color: "rgba(255,255,255,0.85)", lineHeight: "1.5" }}
              >
                Clothing Manufacturing &amp;
                <br />
                Operations Management
              </h5>

              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: "1.8",
                  fontSize: "14.5px",
                }}
              >
                Access centralized production pipelines, inventory tracking,
                client apparel orders, and internal workflow management from one
                unified ecosystem.
              </p>
            </div>

            {/* SECURITY BADGE */}
            <div
              style={{
                padding: "16px 20px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <i
                  className="bi bi-shield-check fs-3"
                  style={{ color: "var(--color-cyan)" }}
                />
                <div>
                  <div className="fw-semibold text-white small">
                    Role-Based Access Control
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    Encrypted session protection for CEO, Admins, and Staff.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT LOGIN FORM
          ==================================================== */}
          <div
            className="col-lg-6 d-flex flex-column justify-content-center"
            style={{
              padding: "45px 50px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "390px",
                margin: "0 auto",
              }}
            >
              {/* MOBILE BRAND LOGO */}
              <div className="d-lg-none text-center mb-4">
                <div
                  className="mx-auto mb-2 d-flex align-items-center justify-content-center shadow-sm"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "var(--color-cobalt)",
                    color: "#FFFFFF",
                  }}
                >
                  <i className="bi bi-building fs-3" />
                </div>
                <h4 className="fw-bold mb-0" style={{ color: "var(--text-title)" }}>
                  VOXCL NOVA
                </h4>
              </div>

              {/* HEADING */}
              <div className="mb-4">
                <h2 className="fw-bold mb-1" style={{ color: "var(--text-title)" }}>
                  Sign In
                </h2>
                <p className="small mb-0" style={{ color: "var(--text-body)" }}>
                  Welcome back! Please enter your account credentials.
                </p>
              </div>

              {/* ERROR ALERT */}
              {error && (
                <div
                  className="alert alert-danger d-flex align-items-center py-2 px-3 mb-3 border-0 shadow-sm"
                  role="alert"
                  style={{
                    borderRadius: "12px",
                    fontSize: "13.5px",
                    backgroundColor: "#FEF2F2",
                    color: "#991B1B",
                    border: "1px solid #FECDD3",
                    animation: "alertShake 0.3s ease-in-out",
                  }}
                >
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-5 text-danger" />
                  <span>{error}</span>
                </div>
              )}

              {/* LOGIN FORM */}
              <form onSubmit={handleLogin}>
                {/* EMAIL */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold small"
                    style={{ color: "var(--text-body)" }}
                  >
                    Email Address
                  </label>
                  <div className="input-group">
                    <span
                      className="input-group-text border-end-0"
                      style={{
                        backgroundColor: "var(--bg-main)",
                        borderColor: "#CBD5E1",
                        borderRadius: "12px 0 0 12px",
                        color: "var(--text-muted)",
                      }}
                    >
                      <i className="bi bi-envelope" />
                    </span>
                    <input
                      type="email"
                      className="form-control border-start-0 login-input py-2"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      required
                      autoComplete="email"
                      disabled={loading}
                      style={{
                        borderRadius: "0 12px 12px 0",
                        borderColor: "#CBD5E1",
                        fontSize: "14px",
                        color: "var(--text-title)",
                      }}
                    />
                  </div>
                </div>

                {/* PASSWORD & FORGOT PASSWORD LINK */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label
                      className="form-label fw-semibold small mb-0"
                      style={{ color: "var(--text-body)" }}
                    >
                      Password
                    </label>

                    {/* FORGOT PASSWORD LINK */}
                    <Link to="/forgot-password" className="forgot-link">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="input-group">
                    <span
                      className="input-group-text border-end-0"
                      style={{
                        backgroundColor: "var(--bg-main)",
                        borderColor: "#CBD5E1",
                        borderRadius: "12px 0 0 12px",
                        color: "var(--text-muted)",
                      }}
                    >
                      <i className="bi bi-lock" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control border-start-0 border-end-0 login-input py-2"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError("");
                      }}
                      required
                      autoComplete="current-password"
                      disabled={loading}
                      style={{
                        borderColor: "#CBD5E1",
                        fontSize: "14px",
                        color: "var(--text-title)",
                      }}
                    />
                    <button
                      type="button"
                      className="btn border border-start-0"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading}
                      style={{
                        borderRadius: "0 12px 12px 0",
                        borderColor: "#CBD5E1",
                        backgroundColor: "var(--bg-main)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <i
                        className={
                          showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                        }
                      />
                    </button>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 fw-semibold text-white login-submit-btn py-3 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    borderRadius: "12px",
                    fontSize: "14.5px",
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <i className="bi bi-arrow-right" />
                    </>
                  )}
                </button>
              </form>

              {/* CREATE ACCOUNT */}
              <div
                className="text-center mt-4 pt-3 border-top"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <p className="small mb-2" style={{ color: "var(--text-muted)" }}>
                  Don't have an enterprise account yet?
                </p>
                <button
                  type="button"
                  className="btn register-btn w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => navigate("/register")}
                  style={{
                    borderRadius: "12px",
                    fontSize: "13.5px",
                  }}
                >
                  <i className="bi bi-person-plus" />
                  <span>Create an Account</span>
                </button>
              </div>

              {/* SECURITY ASSURANCE */}
              <div
                className="text-center mt-4 small d-flex align-items-center justify-content-center gap-1"
                style={{ color: "var(--text-muted)", fontSize: "12px" }}
              >
                <i className="bi bi-shield-lock" />
                <span>Protected by 256-bit encrypted authentication</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}