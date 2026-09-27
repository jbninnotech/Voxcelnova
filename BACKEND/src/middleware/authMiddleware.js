import jwt from "jsonwebtoken";
import User from "../models/User.js";

// =========================================================
// PROTECT
// =========================================================

export const protect = async (req, res, next) => {
  try {
    // -----------------------------------------------------
    // CHECK JWT SECRET
    // -----------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env");

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error.",
      });
    }

    // -----------------------------------------------------
    // GET AUTHORIZATION HEADER
    // -----------------------------------------------------

    const authHeader = req.headers.authorization;

    console.log("=================================");
    console.log("JWT REQUEST");
    console.log("Authorization header exists:", !!authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing.",
      });
    }

    console.log(
      "Authorization header:",
      authHeader.substring(0, 35) + "..."
    );

    // -----------------------------------------------------
    // CHECK BEARER FORMAT
    // -----------------------------------------------------

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authorization format. Use: Bearer <token>",
      });
    }

    // -----------------------------------------------------
    // EXTRACT TOKEN
    // -----------------------------------------------------

    let token = authHeader.substring(7).trim();

    // Remove accidental quotes
    token = token.replace(/^["']|["']$/g, "");

    // -----------------------------------------------------
    // CHECK TOKEN
    // -----------------------------------------------------

    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing.",
      });
    }

    // -----------------------------------------------------
    // DEBUG
    // -----------------------------------------------------

    console.log(
      "Token received:",
      token.substring(0, 30) + "..."
    );

    console.log(
      "Token length:",
      token.length
    );

    console.log(
      "JWT_SECRET exists:",
      !!process.env.JWT_SECRET
    );

    console.log("=================================");

    // -----------------------------------------------------
    // VERIFY TOKEN
    // -----------------------------------------------------

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded JWT:", decoded);

    // -----------------------------------------------------
    // CHECK TOKEN PAYLOAD
    // -----------------------------------------------------

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authentication token payload.",
      });
    }

    // -----------------------------------------------------
    // FIND USER
    // -----------------------------------------------------

    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User associated with this token no longer exists.",
      });
    }

    // -----------------------------------------------------
    // CHECK ACTIVE
    // -----------------------------------------------------

    if (
      user.isActive === false
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Your account has been deactivated.",
      });
    }

    // -----------------------------------------------------
    // ATTACH USER
    // -----------------------------------------------------

    req.user = user;

    console.log(
      "Authenticated user:",
      user.email
    );

    console.log(
      "User role:",
      user.role
    );

    console.log("JWT authentication successful.");
    console.log("=================================");

    next();

  } catch (error) {

    console.error(
      "Protect middleware error:",
      error.name,
      error.message
    );

    // -----------------------------------------------------
    // INVALID TOKEN
    // -----------------------------------------------------

    if (
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authentication token.",
      });
    }

    // -----------------------------------------------------
    // EXPIRED TOKEN
    // -----------------------------------------------------

    if (
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication token has expired. Please login again.",
      });
    }

    // -----------------------------------------------------
    // OTHER ERRORS
    // -----------------------------------------------------

    return res.status(401).json({
      success: false,
      message:
        "Authentication failed.",
    });
  }
};


// =========================================================
// ADMIN ONLY
// =========================================================

export const adminOnly = (
  req,
  res,
  next
) => {

  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }

    const role = String(
      req.user.role || ""
    )
      .trim()
      .toUpperCase();

    console.log(
      "Admin check - User role:",
      role
    );

    if (
      role !== "ADMIN" &&
      role !== "CEO"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Admin access required.",
      });
    }

    next();

  } catch (error) {

    console.error(
      "Admin middleware error:",
      error
    );

    return res.status(403).json({
      success: false,
      message:
        "Access denied.",
    });
  }
};


// =========================================================
// CEO ONLY
// =========================================================

export const ceoOnly = (
  req,
  res,
  next
) => {

  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }

    const role = String(
      req.user.role || ""
    )
      .trim()
      .toUpperCase();

    console.log(
      "CEO check - User role:",
      role
    );

    if (role !== "CEO") {
      return res.status(403).json({
        success: false,
        message:
          "CEO access required.",
      });
    }

    next();

  } catch (error) {

    console.error(
      "CEO middleware error:",
      error
    );

    return res.status(403).json({
      success: false,
      message:
        "Access denied.",
    });
  }
};