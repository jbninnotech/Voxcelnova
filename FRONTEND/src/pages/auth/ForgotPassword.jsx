import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiSend,
} from "react-icons/fi";
import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      await forgotPassword(email);
      setSuccess(
        "A secure password reset link has been dispatched to your email."
      );
      setEmail("");
    } catch (err) {
      setError(
        err.message || "Failed to send reset link. Please check your email."
      );
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
          --shadow-card: 0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow: 0 8px 25px rgba(0, 82, 255, 0.32);
        }

        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
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

        .auth-submit-btn:hover {
          background-color: var(--color-cobalt-hover) !important;
          box-shadow: var(--shadow-glow);
          transform: translateY(-2px);
        }

        .auth-back-link {
          color: var(--color-cobalt);
          transition: all 0.2s ease;
        }

        .auth-back-link:hover {
          color: var(--color-cobalt-hover);
          transform: translateX(-3px);
        }
      `}</style>

      <div
        className="d-flex align-items-center justify-content-center min-vh-100 p-3"
        style={{ backgroundColor: "var(--bg-main)" }}
      >
        <div
          className="card p-4 p-md-5 border-0"
          style={{
            width: "100%",
            maxWidth: "460px",
            borderRadius: "22px",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
            animation: "cardFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* Top Icon Badge */}
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-badge-tint)",
                color: "var(--color-cobalt)",
              }}
            >
              <FiMail size={28} style={{ color: "var(--color-cyan)" }} />
            </div>
            <h3 className="fw-bold mb-1" style={{ color: "var(--text-title)" }}>
              Forgot Password?
            </h3>
            <p className="small mb-0" style={{ color: "var(--text-body)" }}>
              Enter the email address registered with your account, and we'll
              dispatch a verification link to reset your credentials.
            </p>
          </div>

          {/* Alerts */}
          {success && (
            <div
              className="alert d-flex align-items-center gap-2 mb-3 border small"
              role="alert"
              style={{
                backgroundColor: "#ECFDF5",
                borderColor: "#A7F3D0",
                color: "#065F46",
                borderRadius: "12px",
              }}
            >
              <FiCheckCircle size={18} />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div
              className="alert d-flex align-items-center gap-2 mb-3 border small"
              role="alert"
              style={{
                backgroundColor: "#FEF2F2",
                borderColor: "#FECDD3",
                color: "#991B1B",
                borderRadius: "12px",
              }}
            >
              <FiAlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="form-label small fw-semibold"
                style={{ color: "var(--text-body)" }}
              >
                Registered Email Address
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
                  <FiMail size={16} />
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control auth-input py-2 px-3 border-start-0"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    borderRadius: "0 12px 12px 0",
                    borderColor: "#CBD5E1",
                    color: "var(--text-title)",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 py-2 fw-semibold text-white d-flex align-items-center justify-content-center gap-2 auth-submit-btn"
              style={{
                borderRadius: "12px",
                fontSize: "14px",
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" />
                  <span>Dispatching Link...</span>
                </>
              ) : (
                <>
                  <FiSend size={15} />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>

          {/* Back to Login Footer */}
          <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: "var(--border-subtle)" }}>
            <Link
              to="/login"
              className="text-decoration-none small fw-semibold d-inline-flex align-items-center gap-2 auth-back-link"
            >
              <FiArrowLeft size={15} />
              <span>Back to Account Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;