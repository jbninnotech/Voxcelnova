import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();

  const token = sessionStorage.getItem("token");
  const userData = sessionStorage.getItem("user");

  // Not logged in
  if (!token || !userData) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  let user;

  try {
    user = JSON.parse(userData);
  } catch (error) {
    sessionStorage.clear();

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const userRole = String(user?.role || "")
    .trim()
    .toUpperCase();

  // If roles were specified, check them
  if (
    allowedRoles.length > 0 &&
    !allowedRoles
      .map((role) => String(role).toUpperCase())
      .includes(userRole)
  ) {
    if (userRole === "ADMIN" || userRole === "CEO") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}