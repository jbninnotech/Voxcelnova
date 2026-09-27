import User from "../models/User.js";

// =========================================================
// GET ALL USERS
// ADMIN / CEO ONLY
// =========================================================

export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users =
      await User.find({})
        .select("-password")
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,

      count: users.length,

      users,
    });
  } catch (error) {
    console.error(
      "Get All Users Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to fetch users.",
    });
  }
};

// =========================================================
// GET SINGLE USER
// =========================================================

export const getUserById = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.params.id
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,

        message:
          "User not found.",
      });
    }

    return res.status(200).json({
      success: true,

      user,
    });
  } catch (error) {
    console.error(
      "Get User Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to fetch user.",
    });
  }
};

// =========================================================
// UPDATE USER ROLE
// ADMIN / CEO
// =========================================================

export const updateUserRole =
  async (req, res) => {
    try {
      const {
        role,
      } = req.body;

      const allowedRoles = [
        "CEO",
        "ADMIN",
        "MANAGER",
        "EMPLOYEE",
      ];

      const cleanRole =
        String(role || "")
          .trim()
          .toUpperCase();

      if (
        !allowedRoles.includes(
          cleanRole
        )
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid role.",
        });
      }

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found.",
        });
      }

      user.role =
        cleanRole;

      await user.save();

      return res.status(200).json({
        success: true,

        message:
          "User role updated successfully.",

        user: {
          id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,

          isActive:
            user.isActive,
        },
      });
    } catch (error) {
      console.error(
        "Update Role Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to update user role.",
      });
    }
  };

// =========================================================
// ACTIVATE / DEACTIVATE USER
// =========================================================

export const toggleUserStatus =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found.",
        });
      }

      user.isActive =
        !user.isActive;

      await user.save();

      return res.status(200).json({
        success: true,

        message:
          user.isActive
            ? "User activated successfully."
            : "User deactivated successfully.",

        user: {
          id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,

          isActive:
            user.isActive,
        },
      });
    } catch (error) {
      console.error(
        "Toggle User Status Error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to update user status.",
      });
    }
  };