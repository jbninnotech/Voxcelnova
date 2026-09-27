import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      return setError("Please complete all required fields.");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      };

      await registerUser(payload);

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
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

        @keyframes registerFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .auth-input:focus {
          border-color: var(--color-cobalt) !important;
          box-shadow: 0 0 0 0.22rem rgba(0, 82, 255, 0.16) !important;
          background-color: #FFFFFF !important;
        }

        .auth-submit-btn {
          background-color: var(--color-cobalt) !important;
          border: none !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .auth-submit-btn:hover:not(:disabled) {
          background-color: var(--color-cobalt-hover) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .login-back-btn {
          transition: all 0.2s ease;
          border-color: #CBD5E1 !important;
          color: var(--text-title) !important;
          background-color: var(--bg-main) !important;
        }

        .login-back-btn:hover {
          background-color: var(--bg-badge-tint) !important;
          color: var(--color-cobalt) !important;
          border-color: var(--color-cobalt) !important;
          transform: translateY(-1px);
        }
      `}</style>

      <div
        className="container-fluid d-flex justify-content-center align-items-center py-4"
        style={{
          minHeight: "100vh",
          padding: "24px",
          background:
            "radial-gradient(circle at 15% 20%, #071838 0%, #031024 60%, #010712 100%)",
        }}
      >
        <div
          className="row shadow-lg overflow-hidden"
          style={{
            width: "100%",
            maxWidth: "1020px",
            minHeight: "660px",
            background: "#FFFFFF",
            borderRadius: "28px",
            border: "1px solid rgba(0, 82, 255, 0.16)",
            animation: "registerFadeIn 0.4s ease forwards",
          }}
        >
          {/* ===================================================
              LEFT BRANDING PANEL
          ==================================================== */}
          <div
            className="col-lg-5 d-none d-lg-flex flex-column justify-content-between position-relative"
            style={{
              padding: "50px",
              color: "#FFFFFF",
              background:
                "linear-gradient(145deg, #071838 0%, #002B82 50%, #0052FF 100%)",
            }}
          >
            <div>
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
                <i className="bi bi-person-badge fs-2 text-white" />
              </div>

              <span
                className="badge mb-2 px-3 py-2 text-uppercase"
                style={{
                  backgroundColor: "rgba(255,255,255,0.14)",
                  letterSpacing: "1.5px",
                  fontSize: "11px",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Customer Registration
              </span>

              <h2 className="fw-bold mb-3 mt-1" style={{ letterSpacing: "-0.5px" }}>
                Join VOXCEL NOVA
              </h2>

              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: "1.7",
                  fontSize: "14px",
                }}
              >
                Create your account to browse apparel catalogs, place bulk custom orders, manage multiple shipping addresses, and track shipments in real time.
              </p>
            </div>

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
                    Verified Customer Access
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>
                    Encrypted credentials & secure order processing.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT REGISTRATION FORM
          ==================================================== */}
          <div
            className="col-lg-7 d-flex flex-column justify-content-center"
            style={{
              padding: "45px 50px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div style={{ width: "100%", maxWidth: "440px", margin: "0 auto" }}>
              <div className="mb-4">
                <h2 className="fw-bold mb-1" style={{ color: "var(--text-title)" }}>
                  Create an Account
                </h2>
                <p className="small mb-0" style={{ color: "var(--text-body)" }}>
                  Sign up to manage orders and access personalized services.
                </p>
              </div>

              {/* SUCCESS MESSAGE */}
              {success && (
                <div
                  className="alert alert-success d-flex align-items-center py-2 px-3 mb-3 border-0"
                  role="alert"
                  style={{
                    borderRadius: "12px",
                    fontSize: "13.5px",
                    backgroundColor: "#ECFDF5",
                    color: "#065F46",
                    border: "1px solid #A7F3D0",
                  }}
                >
                  <i className="bi bi-check-circle-fill me-2 fs-5" />
                  <span>{success}</span>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div
                  className="alert alert-danger d-flex align-items-center py-2 px-3 mb-3 border-0"
                  role="alert"
                  style={{
                    borderRadius: "12px",
                    fontSize: "13.5px",
                    backgroundColor: "#FEF2F2",
                    color: "#991B1B",
                    border: "1px solid #FECDD3",
                  }}
                >
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRegister}>
                {/* FULL NAME */}
                <div className="mb-3">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    Full Name *
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
                      <i className="bi bi-person" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      className="form-control border-start-0 auth-input py-2"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      style={{
                        borderRadius: "0 12px 12px 0",
                        borderColor: "#CBD5E1",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    Email Address *
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
                      name="email"
                      className="form-control border-start-0 auth-input py-2"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      style={{
                        borderRadius: "0 12px 12px 0",
                        borderColor: "#CBD5E1",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div className="mb-3">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    Phone Number
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
                      <i className="bi bi-phone" />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control border-start-0 auth-input py-2"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading}
                      style={{
                        borderRadius: "0 12px 12px 0",
                        borderColor: "#CBD5E1",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="row g-2 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                      Password *
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control border-end-0 auth-input py-2"
                        placeholder="Min 6 chars"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        style={{
                          borderRadius: "12px 0 0 12px",
                          borderColor: "#CBD5E1",
                          fontSize: "14px",
                        }}
                      />
                      <button
                        type="button"
                        className="btn border border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          borderRadius: "0 12px 12px 0",
                          borderColor: "#CBD5E1",
                          backgroundColor: "var(--bg-main)",
                          color: "var(--text-muted)",
                        }}
                      >
                        <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"} />
                      </button>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                      Confirm *
                    </label>
                    <div className="input-group">
                      <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        className="form-control border-end-0 auth-input py-2"
                        placeholder="Re-enter"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        style={{
                          borderRadius: "12px 0 0 12px",
                          borderColor: "#CBD5E1",
                          fontSize: "14px",
                        }}
                      />
                      <button
                        type="button"
                        className="btn border border-start-0"
                        onClick={() => setShowConfirm(!showConfirm)}
                        style={{
                          borderRadius: "0 12px 12px 0",
                          borderColor: "#CBD5E1",
                          backgroundColor: "var(--bg-main)",
                          color: "var(--text-muted)",
                        }}
                      >
                        <i className={showConfirm ? "bi bi-eye-slash" : "bi bi-eye"} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100 fw-semibold text-white auth-submit-btn py-3 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    borderRadius: "12px",
                    fontSize: "14.5px",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Register Account</span>
                      <i className="bi bi-arrow-right" />
                    </>
                  )}
                </button>
              </form>

              {/* ALREADY REGISTERED */}
              <div
                className="text-center mt-4 pt-3 border-top"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <p className="small mb-2" style={{ color: "var(--text-muted)" }}>
                  Already have an account?
                </p>
                <Link
                  to="/login"
                  className="btn login-back-btn w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2 text-decoration-none"
                  style={{
                    borderRadius: "12px",
                    fontSize: "13.5px",
                  }}
                >
                  <i className="bi bi-box-arrow-in-right" />
                  <span>Sign In Instead</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}