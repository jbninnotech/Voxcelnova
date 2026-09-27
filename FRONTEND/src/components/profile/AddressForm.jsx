import React, { useEffect, useState } from "react";
import {
  FiX,
  FiSave,
  FiNavigation,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import { getCurrentLocationAddress } from "../../services/addressService";

const initialState = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  addressType: "Home",
  isDefault: false,
};

const AddressForm = ({ address, onClose, onSave, saving }) => {
  const [formData, setFormData] = useState(initialState);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    if (address) {
      setFormData({
        fullName: address.fullName || "",
        phone: address.phone || "",
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        city: address.city || "",
        state: address.state || "",
        postalCode: address.postalCode || "",
        country: address.country || "India",
        addressType: address.addressType || "Home",
        isDefault: address.isDefault || false,
      });
    } else {
      setFormData(initialState);
    }
  }, [address]);

  // Direct Geolocation Fetch Handler
  const handleFetchCurrentLocation = async () => {
    try {
      setLocating(true);
      setGeoError("");

      const locationData = await getCurrentLocationAddress();

      setFormData((prev) => ({
        ...prev,
        addressLine1: locationData.addressLine1 || prev.addressLine1,
        city: locationData.city || prev.city,
        state: locationData.state || prev.state,
        postalCode: locationData.postalCode || prev.postalCode,
        country: locationData.country || prev.country,
      }));
    } catch (err) {
      setGeoError(err.message || "Failed to fetch current location.");
    } finally {
      setLocating(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      <style>{`
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpModal {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-input:focus, .modal-select:focus {
          border-color: var(--color-cobalt) !important;
          box-shadow: 0 0 0 0.2rem rgba(0, 82, 255, 0.16) !important;
        }

        .location-detect-btn {
          background-color: var(--bg-badge-tint) !important;
          color: var(--color-cobalt) !important;
          border: 1.5px dashed var(--color-cobalt) !important;
          transition: all 0.25s ease;
        }

        .location-detect-btn:hover {
          background-color: rgba(0, 82, 255, 0.12) !important;
          box-shadow: 0 4px 15px rgba(0, 82, 255, 0.15);
          transform: translateY(-1px);
        }

        .modal-save-btn {
          background-color: var(--color-cobalt) !important;
          transition: all 0.25s ease;
        }

        .modal-save-btn:hover {
          background-color: var(--color-cobalt-hover) !important;
          box-shadow: var(--shadow-glow);
          transform: translateY(-1px);
        }
      `}</style>

      {/* BACKDROP */}
      <div
        className="d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(7, 24, 56, 0.65)",
          backdropFilter: "blur(6px)",
          zIndex: 1050,
          padding: "16px",
          animation: "fadeInBackdrop 0.25s ease-out forwards",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !saving) onClose();
        }}
      >
        {/* MODAL CARD */}
        <div
          className="bg-white shadow-lg overflow-hidden"
          style={{
            width: "100%",
            maxWidth: "640px",
            maxHeight: "90vh",
            borderRadius: "22px",
            display: "flex",
            flexDirection: "column",
            animation: "slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* HEADER */}
          <div
            className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom"
            style={{ backgroundColor: "var(--bg-main)", borderColor: "var(--border-subtle)" }}
          >
            <div>
              <span
                className="text-uppercase fw-bold"
                style={{
                  fontSize: "11px",
                  letterSpacing: "1.2px",
                  color: "var(--color-cobalt)",
                }}
              >
                Delivery Address
              </span>
              <h5 className="mb-0 fw-bold" style={{ color: "var(--text-title)" }}>
                {address ? "Edit Address" : "Add New Address"}
              </h5>
            </div>

            <button
              type="button"
              className="btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center"
              onClick={onClose}
              disabled={saving}
              style={{
                width: "36px",
                height: "36px",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
              }}
            >
              <FiX size={18} />
            </button>
          </div>

          {/* FORM BODY */}
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column"
            style={{ overflowY: "auto" }}
          >
            <div className="p-4">
              
              {/* CURRENT LOCATION BUTTON */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleFetchCurrentLocation}
                  disabled={locating || saving}
                  className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2 location-detect-btn"
                  style={{
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "13.5px",
                  }}
                >
                  {locating ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" />
                      <span>Detecting current location...</span>
                    </>
                  ) : (
                    <>
                      <FiNavigation size={16} style={{ color: "var(--color-cyan)" }} />
                      <span>Use Current Location</span>
                    </>
                  )}
                </button>

                {geoError && (
                  <div className="text-danger small mt-2 d-flex align-items-center gap-1">
                    <FiAlertCircle size={14} />
                    <span>{geoError}</span>
                  </div>
                )}
              </div>

              <div className="row g-3">
                {/* Full Name */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control py-2 modal-input"
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control py-2 modal-input"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address Line 1 */}
                <div className="col-12">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    className="form-control py-2 modal-input"
                    placeholder="Flat / House no. / Floor / Building"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address Line 2 */}
                <div className="col-12">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    className="form-control py-2 modal-input"
                    placeholder="Colony / Street / Locality / Landmark"
                    value={formData.addressLine2}
                    onChange={handleChange}
                  />
                </div>

                {/* City */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-control py-2 modal-input"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* State */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    className="form-control py-2 modal-input"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Postal Code */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    className="form-control py-2 modal-input"
                    placeholder="Pincode / Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Country */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="form-control py-2 modal-input"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address Type */}
                <div className="col-12">
                  <label className="form-label fw-semibold small" style={{ color: "var(--text-body)" }}>
                    Address Type
                  </label>
                  <select
                    name="addressType"
                    className="form-select py-2 modal-select"
                    value={formData.addressType}
                    onChange={handleChange}
                  >
                    <option value="Home">Home (All day delivery)</option>
                    <option value="Office">Office (Delivery 9 AM - 6 PM)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Default Address Checkbox */}
              <div className="form-check mt-3 pt-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  id="isDefaultAddress"
                  className="form-check-input"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  style={{ cursor: "pointer" }}
                />
                <label
                  className="form-check-label user-select-none small fw-medium"
                  htmlFor="isDefaultAddress"
                  style={{ cursor: "pointer", color: "var(--text-title)" }}
                >
                  Make this my default delivery address
                </label>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div
              className="d-flex justify-content-end align-items-center gap-2 px-4 py-3 border-top"
              style={{ backgroundColor: "var(--bg-main)", borderColor: "var(--border-subtle)" }}
            >
              <button
                type="button"
                className="btn btn-light px-4 py-2 fw-medium border"
                onClick={onClose}
                disabled={saving}
                style={{
                  borderRadius: "10px",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-body)",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn text-white px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 modal-save-btn"
                disabled={saving}
                style={{
                  borderRadius: "10px",
                  border: "none",
                }}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiSave size={16} />
                    <span>{address ? "Update Address" : "Save Address"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressForm;