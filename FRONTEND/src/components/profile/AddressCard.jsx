import React, { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiMapPin,
  FiPhone,
  FiUser,
  FiStar,
} from "react-icons/fi";

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDefault = Boolean(address?.isDefault);

  return (
    <>
      <style>{`
        @keyframes pulseDefaultBadge {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }

        .card-action-btn {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-action-btn:hover {
          transform: translateY(-2px);
        }

        .card-action-btn:active {
          transform: translateY(0);
        }

        .card-delete-btn:hover {
          background-color: #FEE2E2 !important;
          color: #DC2626 !important;
          border-color: #FCA5A5 !important;
        }

        .card-default-btn:hover {
          background-color: var(--color-cobalt-hover) !important;
          box-shadow: 0 4px 14px rgba(0, 82, 255, 0.3);
        }
      `}</style>

      <div
        className="card h-100 p-4 position-relative d-flex flex-column justify-content-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          borderRadius: "18px",
          backgroundColor: isDefault ? "#FFFFFF" : "var(--bg-surface)",
          border: isDefault
            ? "2px solid var(--color-cobalt)"
            : isHovered
            ? "1.5px solid var(--border-hover)"
            : "1px solid var(--border-subtle)",
          boxShadow: isDefault
            ? "0 10px 28px rgba(0, 82, 255, 0.12)"
            : isHovered
            ? "var(--shadow-card)"
            : "0 4px 14px rgba(0, 48, 143, 0.03)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          minHeight: "290px",
        }}
      >
        {/* TOP BAR: TYPE & DEFAULT BADGE */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div
            className="d-inline-flex align-items-center gap-2 px-3 py-1"
            style={{
              borderRadius: "9999px",
              backgroundColor: "var(--bg-badge-tint)",
              color: "var(--color-cobalt)",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            <FiMapPin size={13} style={{ color: "var(--color-cyan)" }} />
            <span>{address?.addressType || "Home"}</span>
          </div>

          {isDefault && (
            <div
              className="d-inline-flex align-items-center gap-1 px-3 py-1"
              style={{
                borderRadius: "9999px",
                backgroundColor: "rgba(0, 82, 255, 0.08)",
                color: "var(--color-cobalt)",
                border: "1px solid rgba(0, 82, 255, 0.2)",
                fontSize: "12px",
                fontWeight: "600",
                animation: "pulseDefaultBadge 3s infinite ease-in-out",
              }}
            >
              <FiCheck size={14} style={{ color: "var(--color-cyan)" }} />
              <span>Default Address</span>
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="flex-grow-1 text-start">
          <div className="d-flex align-items-center gap-2 mb-1">
            <FiUser style={{ color: "var(--text-muted)", fontSize: "15px" }} />
            <h5
              className="mb-0 fw-bold"
              style={{
                color: "var(--text-title)",
                fontSize: "16.5px",
              }}
            >
              {address?.fullName || "Recipient Name"}
            </h5>
          </div>

          {address?.phone && (
            <div
              className="d-flex align-items-center gap-2 mb-3"
              style={{ color: "var(--text-muted)", fontSize: "13px" }}
            >
              <FiPhone style={{ color: "var(--color-cobalt)" }} />
              <span>{address.phone}</span>
            </div>
          )}

          {/* Location Box */}
          <div
            className="p-3 mb-2"
            style={{
              backgroundColor: "var(--bg-main)",
              borderRadius: "12px",
              border: "1px solid var(--border-subtle)",
              fontSize: "13.5px",
              lineHeight: 1.6,
              color: "var(--text-body)",
            }}
          >
            <div className="fw-semibold" style={{ color: "var(--text-title)" }}>
              {address?.addressLine1}
            </div>
            {address?.addressLine2 && (
              <div style={{ color: "var(--text-body)" }}>{address.addressLine2}</div>
            )}
            <div className="mt-1" style={{ color: "var(--text-muted)" }}>
              {address?.city}, {address?.state}{" "}
              {address?.postalCode && `• ${address.postalCode}`}
            </div>
            {address?.country && (
              <div
                className="mt-1 fw-bold text-uppercase"
                style={{ fontSize: "11px", color: "var(--color-cobalt)" }}
              >
                {address.country}
              </div>
            )}
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div
          className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {/* Edit */}
          <button
            type="button"
            className="btn btn-sm btn-light card-action-btn d-inline-flex align-items-center gap-2 px-3 py-2 border"
            onClick={() => onEdit && onEdit(address)}
            style={{
              borderRadius: "10px",
              fontSize: "12.5px",
              fontWeight: "600",
              color: "var(--text-body)",
              backgroundColor: "#FFFFFF",
              borderColor: "var(--border-subtle)",
            }}
          >
            <FiEdit2 size={13} style={{ color: "var(--color-cobalt)" }} />
            <span>Edit</span>
          </button>

          {/* Delete */}
          <button
            type="button"
            className="btn btn-sm card-action-btn card-delete-btn d-inline-flex align-items-center gap-2 px-3 py-2 border"
            onClick={() => onDelete && onDelete(address?._id)}
            style={{
              borderRadius: "10px",
              fontSize: "12.5px",
              fontWeight: "600",
              color: "#EF4444",
              backgroundColor: "#FFF5F5",
              borderColor: "#FEE2E2",
            }}
          >
            <FiTrash2 size={13} />
            <span>Delete</span>
          </button>

          {/* Set as Default */}
          {!isDefault && (
            <button
              type="button"
              className="btn btn-sm card-action-btn card-default-btn ms-auto d-inline-flex align-items-center gap-2 px-3 py-2 text-white"
              onClick={() => onSetDefault && onSetDefault(address?._id)}
              style={{
                borderRadius: "10px",
                fontSize: "12.5px",
                fontWeight: "600",
                backgroundColor: "var(--color-cobalt)",
                border: "none",
              }}
            >
              <FiStar size={13} />
              <span>Make Default</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressCard;