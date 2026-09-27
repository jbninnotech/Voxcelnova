import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import AddressCard from "../../components/profile/AddressCard";
import AddressForm from "../../components/profile/AddressForm";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../services/addressService";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const data = await getAddresses();
      setAddresses(data.addresses || []);
    } catch (err) {
      setError(err.message || "Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      setSaving(true);
      setError("");

      if (editingAddress) {
        await updateAddress(editingAddress._id, formData);
        setSuccess("Address updated successfully.");
      } else {
        await addAddress(formData);
        setSuccess("Address added successfully.");
      }

      setShowForm(false);
      setEditingAddress(null);
      await loadAddresses();

      setTimeout(() => {
        setSuccess("");
      }, 3500);
    } catch (err) {
      setError(err.message || "Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmed) return;

    try {
      setError("");
      await deleteAddress(id);
      setSuccess("Address deleted successfully.");
      await loadAddresses();

      setTimeout(() => {
        setSuccess("");
      }, 3500);
    } catch (err) {
      setError(err.message || "Failed to delete address");
    }
  };

  const handleDefault = async (id) => {
    try {
      setError("");
      await setDefaultAddress(id);
      setSuccess("Default address updated successfully.");
      await loadAddresses();

      setTimeout(() => {
        setSuccess("");
      }, 3500);
    } catch (err) {
      setError(err.message || "Failed to set default address");
    }
  };

  const openAddForm = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingAddress(null);
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
          --border-hover: rgba(0, 212, 255, 0.60);
          --shadow-card: 0 12px 32px rgba(0, 48, 143, 0.06);
          --shadow-glow: 0 8px 25px rgba(0, 82, 255, 0.32);
        }

        @keyframes alertSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardFadeInUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulsePin {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0 rgba(0, 212, 255, 0));
          }
          50% {
            transform: scale(1.08);
            filter: drop-shadow(0 4px 12px rgba(0, 212, 255, 0.45));
          }
        }

        .primary-add-btn {
          background-color: var(--color-cobalt) !important;
          border: 1px solid transparent !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .primary-add-btn:hover {
          background-color: var(--color-cobalt-hover) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }
      `}</style>

      <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100%", padding: "12px 4px" }}>
        {/* HEADER SECTION */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-3 mb-4 border-bottom" style={{ borderColor: "var(--border-subtle)" }}>
          <div>
            <span
              className="text-uppercase fw-bold"
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
                color: "var(--color-cobalt)",
              }}
            >
              DELIVERY PREFERENCES
            </span>
            <h3 className="fw-bold mb-1" style={{ color: "var(--text-title)" }}>
              My Addresses
            </h3>
            <p className="small mb-0" style={{ color: "var(--text-body)" }}>
              Manage your delivery locations for faster and easier checkout.
            </p>
          </div>

          <button
            type="button"
            className="btn primary-add-btn text-white px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2"
            onClick={openAddForm}
            style={{
              borderRadius: "10px",
              fontSize: "13.5px",
            }}
          >
            <FiPlus size={18} />
            <span>Add Address</span>
          </button>
        </div>

        {/* ALERTS */}
        {success && (
          <div
            className="alert d-flex align-items-center gap-2 mb-4 border"
            role="alert"
            style={{
              backgroundColor: "#ECFDF5",
              borderColor: "#A7F3D0",
              color: "#065F46",
              borderRadius: "12px",
              fontSize: "14px",
              animation: "alertSlideDown 0.3s ease-out forwards",
            }}
          >
            <FiCheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div
            className="alert d-flex align-items-center gap-2 mb-4 border"
            role="alert"
            style={{
              backgroundColor: "#FEF2F2",
              borderColor: "#FECDD3",
              color: "#991B1B",
              borderRadius: "12px",
              fontSize: "14px",
              animation: "alertSlideDown 0.3s ease-out forwards",
            }}
          >
            <FiAlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* CONTENT STATES */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              role="status"
              style={{ color: "var(--color-cobalt)", width: "2.8rem", height: "2.8rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 small" style={{ color: "var(--text-muted)" }}>
              Loading addresses...
            </p>
          </div>
        ) : addresses.length === 0 ? (
          /* Empty State */
          <div
            className="text-center py-5 px-3"
            style={{
              borderRadius: "20px",
              backgroundColor: "var(--bg-surface)",
              border: "1.5px dashed var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
              animation: "cardFadeInUp 0.35s ease-out",
            }}
          >
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-badge-tint)",
                color: "var(--color-cobalt)",
                animation: "pulsePin 2.6s ease-in-out infinite",
              }}
            >
              <FiMapPin size={32} />
            </div>

            <h5 className="fw-bold mb-1" style={{ color: "var(--text-title)" }}>
              No addresses saved yet
            </h5>

            <p className="small mb-4" style={{ color: "var(--text-body)" }}>
              Add your home or office address to enable quick 1-click checkout.
            </p>

            <button
              type="button"
              className="btn primary-add-btn text-white px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
              onClick={openAddForm}
              style={{
                borderRadius: "10px",
                fontSize: "13.5px",
              }}
            >
              <FiPlus size={18} />
              <span>Add Your First Address</span>
            </button>
          </div>
        ) : (
          /* Address Grid */
          <div className="row g-4">
            {addresses.map((address, index) => (
              <div
                key={address._id}
                className="col-12 col-md-6"
                style={{
                  animation: `cardFadeInUp 0.35s ease-out forwards ${index * 0.05}s`,
                }}
              >
                <AddressCard
                  address={address}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSetDefault={handleDefault}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <AddressForm
          address={editingAddress}
          onClose={closeForm}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </>
  );
};

export default Addresses;