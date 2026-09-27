import React, { useEffect, useState } from "react";
import {
  FiEdit2,
  FiSave,
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
  FiTrash2,
  FiPlus,
  FiX,
  FiShield,
  FiAward,
} from "react-icons/fi";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

const ProfileInfo = () => {
  const [profiles, setProfiles] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState(null);

  const [formData, setFormData] = useState({
    profileTitle: "",
    name: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ========================================
  // LOAD PROFILE DATA
  // ========================================
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();
      const user = data.user || data;

      const initialProfiles = [
        {
          id: user?._id || "primary-profile",
          profileTitle: "Primary Account",
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          dateOfBirth: user?.dateOfBirth
            ? user.dateOfBirth.substring(0, 10)
            : "",
          gender: user?.gender || "",
          isDefault: true,
        },
      ];

      setProfiles(initialProfiles);
      setActiveProfileId(initialProfiles[0].id);
      populateForm(initialProfiles[0]);
    } catch (err) {
      setError(err.message || "Failed to load profile details.");
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (profileObj) => {
    if (!profileObj) return;
    setFormData({
      profileTitle: profileObj.profileTitle || "",
      name: profileObj.name || "",
      phone: profileObj.phone || "",
      dateOfBirth: profileObj.dateOfBirth || "",
      gender: profileObj.gender || "",
    });
  };

  // Switch Active Profile Tab
  const handleSelectProfile = (profileItem) => {
    if (editing) {
      const confirmSwitch = window.confirm(
        "You have unsaved changes. Discard and switch profile?"
      );
      if (!confirmSwitch) return;
      setEditing(false);
    }
    setActiveProfileId(profileItem.id);
    populateForm(profileItem);
    setError("");
    setSuccess("");
  };

  // Add New Profile
  const handleAddProfile = () => {
    const newIndex = profiles.length + 1;
    const newProfile = {
      id: `profile-${Date.now()}`,
      profileTitle: `Family Member ${newIndex}`,
      name: "",
      email: profiles[0]?.email || "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      isDefault: false,
    };

    const updated = [...profiles, newProfile];
    setProfiles(updated);
    setActiveProfileId(newProfile.id);
    populateForm(newProfile);
    setEditing(true);
    setSuccess(`Created new member profile. Enter details and click Save.`);

    setTimeout(() => setSuccess(""), 3500);
  };

  // Delete Profile
  const handleDeleteProfile = (profileId) => {
    if (profiles.length <= 1) {
      setError("At least one primary profile is required.");
      setTimeout(() => setError(""), 3500);
      return;
    }

    const targetProfile = profiles.find((p) => p.id === profileId);

    const confirmed = window.confirm(
      `Are you sure you want to delete "${targetProfile?.profileTitle || "this profile"}"?`
    );
    if (!confirmed) return;

    const remaining = profiles.filter((p) => p.id !== profileId);
    setProfiles(remaining);

    const nextActive = remaining[0];
    setActiveProfileId(nextActive.id);
    populateForm(nextActive);
    setEditing(false);

    setSuccess("Profile removed successfully.");
    setTimeout(() => setSuccess(""), 3500);
  };

  // Form Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save / Update Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const currentProfile = profiles.find((p) => p.id === activeProfileId);

      // If updating the primary user, push changes to backend
      if (currentProfile?.isDefault) {
        await updateProfile({
          name: formData.name,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
        });
      }

      // Update state
      const updatedProfiles = profiles.map((p) => {
        if (p.id === activeProfileId) {
          return {
            ...p,
            profileTitle: formData.profileTitle || p.profileTitle,
            name: formData.name,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
          };
        }
        return p;
      });

      setProfiles(updatedProfiles);
      setEditing(false);
      setSuccess("Profile details saved successfully.");

      setTimeout(() => setSuccess(""), 3500);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const activeProfile =
    profiles.find((p) => p.id === activeProfileId) || profiles[0];

  // Helper for Profile Avatar Initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <>
      {/* Dynamic Scoped Design Tokens & Keyframe Animations */}
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
          --shadow-glow: 0 8px 25px rgba(0, 82, 255, 0.28);
        }

        @keyframes fadeInView {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .profile-tab-pill {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--border-subtle);
          color: var(--text-body);
        }

        .profile-tab-pill:hover:not(.active) {
          background-color: var(--bg-badge-tint) !important;
          color: var(--color-cobalt) !important;
          transform: translateY(-2px);
        }

        .profile-tab-pill.active {
          background-color: var(--color-cobalt) !important;
          border-color: var(--color-cobalt) !important;
          color: #ffffff !important;
          box-shadow: 0 4px 14px rgba(0, 82, 255, 0.25);
        }

        .professional-input {
          transition: all 0.2s ease;
          border: 1px solid #CBD5E1;
        }

        .professional-input:focus {
          border-color: var(--color-cobalt) !important;
          box-shadow: 0 0 0 0.22rem rgba(0, 82, 255, 0.16) !important;
          background-color: #FFFFFF !important;
        }

        .cobalt-btn-main {
          background-color: var(--color-cobalt) !important;
          border: none !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .cobalt-btn-main:hover {
          background-color: var(--color-cobalt-hover) !important;
          box-shadow: var(--shadow-glow);
          transform: translateY(-2px);
        }

        .delete-btn-hover:hover {
          background-color: #FEE2E2 !important;
          color: #DC2626 !important;
          border-color: #FCA5A5 !important;
          transform: translateY(-2px);
        }
      `}</style>

      <div style={{ backgroundColor: "var(--bg-main)", padding: "12px 6px" }}>
        
        {/* =====================================================
            HEADER SECTION
        ===================================================== */}
        <div
          className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-3 mb-4 border-bottom"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div>
            <span
              className="text-uppercase fw-bold"
              style={{
                fontSize: "11px",
                letterSpacing: "1.4px",
                color: "var(--color-cobalt)",
              }}
            >
              ACCOUNT PREFERENCES
            </span>
            <h3 className="fw-bold mb-1" style={{ color: "var(--text-title)" }}>
              Profile Management
            </h3>
            <p className="small mb-0" style={{ color: "var(--text-body)" }}>
              Manage member identities, contact details, and personal delivery preferences.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* Delete Profile (Only for secondary profiles) */}
            {profiles.length > 1 && !activeProfile?.isDefault && (
              <button
                type="button"
                className="btn delete-btn-hover d-inline-flex align-items-center gap-2 px-3 py-2 border"
                onClick={() => handleDeleteProfile(activeProfileId)}
                style={{
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "600",
                  backgroundColor: "#FFF5F5",
                  borderColor: "#FEE2E2",
                  color: "#EF4444",
                }}
              >
                <FiTrash2 size={15} />
                <span>Remove Profile</span>
              </button>
            )}

            {/* Toggle Edit Mode */}
            {!editing ? (
              <button
                type="button"
                className="btn cobalt-btn-main text-white px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2"
                onClick={() => setEditing(true)}
                style={{
                  borderRadius: "10px",
                  fontSize: "13.5px",
                }}
              >
                <FiEdit2 size={15} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <span
                className="badge px-3 py-2"
                style={{
                  backgroundColor: "var(--bg-badge-tint)",
                  color: "var(--color-cobalt)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                Editing Active
              </span>
            )}
          </div>
        </div>

        {/* =====================================================
            NOTIFICATION ALERTS
        ===================================================== */}
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
            }}
          >
            <FiAlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* =====================================================
            LOADING STATE
        ===================================================== */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              role="status"
              style={{ color: "var(--color-cobalt)", width: "2.8rem", height: "2.8rem" }}
            >
              <span className="visually-hidden">Loading profiles...</span>
            </div>
            <p className="mt-3 small" style={{ color: "var(--text-muted)" }}>
              Loading member profiles...
            </p>
          </div>
        ) : (
          <>
            {/* =====================================================
                PROFILE SWITCHER TABS (Profile 1, Profile 2, + Add)
            ===================================================== */}
            <div
              className="d-flex flex-wrap align-items-center gap-2 mb-4 p-2 rounded-4"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {profiles.map((item, index) => {
                const isActive = item.id === activeProfileId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`btn profile-tab-pill d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 ${
                      isActive ? "active" : ""
                    }`}
                    onClick={() => handleSelectProfile(item)}
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      backgroundColor: isActive ? "var(--color-cobalt)" : "var(--bg-surface)",
                    }}
                  >
                    <FiUser size={14} style={{ color: isActive ? "var(--color-cyan)" : "inherit" }} />
                    <span>{item.profileTitle || `Profile ${index + 1}`}</span>
                    {item.isDefault && (
                      <span
                        className="badge ms-1"
                        style={{
                          fontSize: "9.5px",
                          backgroundColor: isActive
                            ? "rgba(255,255,255,0.22)"
                            : "var(--bg-badge-tint)",
                          color: isActive ? "#ffffff" : "var(--color-cobalt)",
                        }}
                      >
                        Primary
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Add New Profile */}
              <button
                type="button"
                className="btn d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3"
                onClick={handleAddProfile}
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--color-cobalt)",
                  backgroundColor: "var(--bg-badge-tint)",
                  border: "1.5px dashed var(--color-cobalt)",
                }}
              >
                <FiPlus size={15} />
                <span>Add Member</span>
              </button>
            </div>

            {/* =====================================================
                HERO BANNER & AVATAR CARD
            ===================================================== */}
            <div
              className="p-4 mb-4 rounded-4 position-relative overflow-hidden"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="d-flex flex-wrap align-items-center gap-4">
                {/* Avatar Initials Badge */}
                <div
                  className="d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, var(--color-cobalt), #003ECC)",
                    fontSize: "24px",
                    letterSpacing: "1px",
                  }}
                >
                  {getInitials(formData.name || activeProfile?.name)}
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2">
                    <h4 className="fw-bold mb-0" style={{ color: "var(--text-title)" }}>
                      {formData.name || "Unnamed Profile"}
                    </h4>
                    {activeProfile?.isDefault && (
                      <span
                        className="badge d-inline-flex align-items-center gap-1 px-2 py-1"
                        style={{
                          backgroundColor: "var(--bg-badge-tint)",
                          color: "var(--color-cobalt)",
                          fontSize: "11px",
                          borderRadius: "6px",
                        }}
                      >
                        <FiAward size={13} style={{ color: "var(--color-cyan)" }} />
                        Primary Member
                      </span>
                    )}
                  </div>
                  <p className="small mb-0 mt-1" style={{ color: "var(--text-body)" }}>
                    {activeProfile?.email || "No email assigned"} •{" "}
                    {formData.phone || "No phone number registered"}
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================================
                ACTIVE PROFILE DETAILS FORM
            ===================================================== */}
            <div
              className="p-4 rounded-4"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-card)",
                animation: "fadeInView 0.3s ease-out forwards",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="row g-3 g-md-4">
                  {/* Profile Title / Label */}
                  <div className="col-12 col-md-6">
                    <label
                      className="form-label fw-semibold small d-flex align-items-center gap-2 mb-2"
                      style={{ color: "var(--text-body)" }}
                    >
                      <FiShield style={{ color: "var(--color-cobalt)" }} />
                      <span>Profile Identifier</span>
                    </label>
                    <input
                      type="text"
                      name="profileTitle"
                      className="form-control professional-input py-2 px-3"
                      value={formData.profileTitle}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="e.g. Personal, Work, Family Member"
                      style={{
                        borderRadius: "10px",
                        backgroundColor: editing ? "#FFFFFF" : "var(--bg-main)",
                        color: "var(--text-title)",
                        fontWeight: "500",
                      }}
                    />
                  </div>

                  {/* Full Name */}
                  <div className="col-12 col-md-6">
                    <label
                      className="form-label fw-semibold small d-flex align-items-center gap-2 mb-2"
                      style={{ color: "var(--text-body)" }}
                    >
                      <FiUser style={{ color: "var(--color-cobalt)" }} />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control professional-input py-2 px-3"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Enter legal full name"
                      required
                      style={{
                        borderRadius: "10px",
                        backgroundColor: editing ? "#FFFFFF" : "var(--bg-main)",
                        color: "var(--text-title)",
                        fontWeight: "500",
                      }}
                    />
                  </div>

                  {/* Account Email (Read-Only) */}
                  <div className="col-12 col-md-6">
                    <label
                      className="form-label fw-semibold small d-flex align-items-center gap-2 mb-2"
                      style={{ color: "var(--text-body)" }}
                    >
                      <FiMail style={{ color: "var(--color-cobalt)" }} />
                      <span>Registered Account Email</span>
                    </label>
                    <input
                      type="email"
                      className="form-control py-2 px-3"
                      value={activeProfile?.email || ""}
                      disabled
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "#F1F5F9",
                        border: "1px solid #E2E8F0",
                        color: "var(--text-muted)",
                        fontWeight: "500",
                        cursor: "not-allowed",
                      }}
                    />
                    <div className="mt-1" style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
                      Primary system login address.
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="col-12 col-md-6">
                    <label
                      className="form-label fw-semibold small d-flex align-items-center gap-2 mb-2"
                      style={{ color: "var(--text-body)" }}
                    >
                      <FiPhone style={{ color: "var(--color-cobalt)" }} />
                      <span>Contact Number</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control professional-input py-2 px-3"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="e.g. +91 98765 43210"
                      style={{
                        borderRadius: "10px",
                        backgroundColor: editing ? "#FFFFFF" : "var(--bg-main)",
                        color: "var(--text-title)",
                        fontWeight: "500",
                      }}
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="col-12 col-md-6">
                    <label
                      className="form-label fw-semibold small d-flex align-items-center gap-2 mb-2"
                      style={{ color: "var(--text-body)" }}
                    >
                      <FiCalendar style={{ color: "var(--color-cobalt)" }} />
                      <span>Date of Birth</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="form-control professional-input py-2 px-3"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={!editing}
                      style={{
                        borderRadius: "10px",
                        backgroundColor: editing ? "#FFFFFF" : "var(--bg-main)",
                        color: "var(--text-title)",
                        fontWeight: "500",
                      }}
                    />
                  </div>

                  {/* Gender Selection */}
                  <div className="col-12 col-md-6">
                    <label
                      className="form-label fw-semibold small d-flex align-items-center gap-2 mb-2"
                      style={{ color: "var(--text-body)" }}
                    >
                      <FiUser style={{ color: "var(--color-cobalt)" }} />
                      <span>Gender</span>
                    </label>
                    <select
                      name="gender"
                      className="form-select professional-input py-2 px-3"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!editing}
                      style={{
                        borderRadius: "10px",
                        backgroundColor: editing ? "#FFFFFF" : "var(--bg-main)",
                        color: "var(--text-title)",
                        fontWeight: "500",
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* =====================================================
                    ACTION BUTTONS (Active in edit mode)
                ===================================================== */}
                {editing && (
                  <div
                    className="d-flex justify-content-end align-items-center gap-2 mt-4 pt-3 border-top"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <button
                      type="button"
                      className="btn btn-light border px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
                      onClick={() => {
                        setEditing(false);
                        populateForm(activeProfile);
                        setError("");
                      }}
                      disabled={saving}
                      style={{
                        borderRadius: "10px",
                        fontSize: "13.5px",
                        color: "var(--text-body)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <FiX size={16} />
                      <span>Cancel</span>
                    </button>

                    <button
                      type="submit"
                      className="btn cobalt-btn-main text-white px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
                      disabled={saving}
                      style={{
                        borderRadius: "10px",
                        fontSize: "13.5px",
                      }}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" />
                          <span>Saving Changes...</span>
                        </>
                      ) : (
                        <>
                          <FiSave size={16} />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileInfo;