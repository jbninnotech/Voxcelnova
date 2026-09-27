import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiAlertCircle,
  FiCheck,
} from "react-icons/fi";
import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      return setError("Password must contain at least 8 characters.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match. Please verify.");
    }

    try {
      setLoading(true);
      await resetPassword(token, password);
      setSuccess("Your password has been reset! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(
        err.message || "Invalid or expired reset link. Please request a new one."
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

        .toggle-icon-btn {
          cursor: pointer;
          background: #F8FAFC;
          border-color: #CBD5E1;
          color: var(--text-muted);
          transition: color 0.2s ease;
        }

        .toggle-icon-btn:hover {
          color: var(--text-title);
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
          {/* Top Badge */}
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
              <FiLock size={28} style={{ color: "var(--color-cyan)" }} />
            </div>
            <h3 className="fw-bold mb-1" style={{ color: "var(--text-title)" }}>
              Set New Password
            </h3>
            <p className="small mb-0" style={{ color: "var(--text-body)" }}>
              Ensure your new password has a minimum of 8 characters with a mix of
              letters and numbers.
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
            {/* New Password */}
            <div className="mb-3">
              <label
                className="form-label small fw-semibold"
                style={{ color: "var(--text-body)" }}
              >
                New Password *
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control auth-input py-2 px-3 border-end-0"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    borderRadius: "12px 0 0 12px",
                    borderColor: "#CBD5E1",
                    color: "var(--text-title)",
                  }}
                />
                <button
                  type="button"
                  className="input-group-text toggle-icon-btn border border-start-0"
                  style={{ borderRadius: "0 12px 12px 0" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="mb-4">
              <label
                className="form-label small fw-semibold"
                style={{ color: "var(--text-body)" }}
              >
                Confirm New Password *
              </label>
              <div className="input-group">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="form-control auth-input py-2 px-3 border-end-0"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    borderRadius: "12px 0 0 12px",
                    borderColor: "#CBD5E1",
                    color: "var(--text-title)",
                  }}
                />
                <button
                  type="button"
                  className="input-group-text toggle-icon-btn border border-start-0"
                  style={{ borderRadius: "0 12px 12px 0" }}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
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
                  <span>Updating Credentials...</span>
                </>
              ) : (
                <>
                  <FiCheck size={16} />
                  <span>Reset & Save Password</span>
                </>
              )}
            </button>
          </form>

          {/* Cancel */}
          <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: "var(--border-subtle)" }}>
            <Link
              to="/login"
              className="text-decoration-none small fw-semibold"
              style={{ color: "var(--color-cobalt)" }}
            >
              Cancel & Return to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;