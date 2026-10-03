import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import authStorage from "../utils/authStorage";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();

  const token = authStorage.getToken();
  const user = authStorage.getUser();

  // Not logged in
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
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