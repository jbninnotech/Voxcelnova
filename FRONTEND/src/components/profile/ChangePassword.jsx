import React, { useState } from "react";
import {
  FiLock,
  FiSave,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError(
        "Please fill in all password fields."
      );

      return;
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      setError(
        "New password and confirmation do not match."
      );

      return;
    }

    try {
      setSaving(true);

      const token =
        sessionStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/password/change`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword:
              formData.currentPassword,
            newPassword:
              formData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to change password"
        );
      }

      setSuccess(
        "Password changed successfully."
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-content-card">
      <div className="profile-content-header">
        <div>
          <span className="profile-eyebrow">
            SECURITY
          </span>

          <h2>Change Password</h2>

          <p>
            Keep your account secure with a strong
            password.
          </p>
        </div>
      </div>

      {success && (
        <div className="profile-alert success">
          {success}
        </div>
      )}

      {error && (
        <div className="profile-alert error">
          {error}
        </div>
      )}

      <form
        className="password-form"
        onSubmit={handleSubmit}
      >
        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          show={showCurrent}
          setShow={setShowCurrent}
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          show={showNew}
          setShow={setShowNew}
        />

        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          show={showConfirm}
          setShow={setShowConfirm}
        />

        <button
          type="submit"
          className="profile-primary-btn"
          disabled={saving}
        >
          <FiSave />

          {saving
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </div>
  );
};

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  show,
  setShow,
}) => {
  return (
    <div className="profile-form-group password-input">
      <label>
        <FiLock />
        {label}
      </label>

      <div className="password-field">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;