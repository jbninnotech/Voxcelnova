import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// =========================================================
// USER SCHEMA
// =========================================================

const userSchema = new mongoose.Schema(
  {
    // =======================================================
    // NAME
    // =======================================================
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    // =======================================================
    // EMAIL
    // =======================================================
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // =======================================================
    // PASSWORD
    // =======================================================
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // =======================================================
    // ROLE
    // =======================================================
    role: {
      type: String,
      enum: ["CEO", "ADMIN", "MANAGER", "EMPLOYEE", "USER"],
      default: "EMPLOYEE",
    },

    // =======================================================
    // ACTIVE STATUS
    // =======================================================
    isActive: {
      type: Boolean,
      default: true,
    },

    // =======================================================
    // PHONE
    // =======================================================
    phone: {
      type: String,
      default: "",
      trim: true,
    },

    // =======================================================
    // PROFILE IMAGE
    // =======================================================
    profileImage: {
      type: String,
      default: "",
    },

    // =======================================================
    // DATE OF BIRTH & GENDER
    // =======================================================
    dateOfBirth: {
      type: Date,
      default: null,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say", ""],
      default: "",
    },

    // =======================================================
    // PASSWORD RESET FIELDS
    // =======================================================
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },

    // =======================================================
    // SECURITY: BRUTE-FORCE LOCKOUT & FAILED ATTEMPTS
    // =======================================================
    loginAttempts: {
      type: Number,
      required: true,
      default: 0,
    },

    lockUntil: {
      type: Date,
      default: null,
    },

    // =======================================================
    // SECURITY: TWO-FACTOR AUTH (2FA / OTP) FOR ADMINS
    // =======================================================
    twoFactorOtp: {
      type: String,
      default: null,
    },

    twoFactorOtpExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// =========================================================
// HASH PASSWORD BEFORE SAVE
// =========================================================
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// =========================================================
// METHODS
// =========================================================

// 1. Password comparison
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// 2. Virtual check if account is currently locked out
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// 3. Increment failed attempts and trigger 30-minute lock at 5 strikes
userSchema.methods.incrementLoginAttempts = async function () {
  // If lock has already expired, reset counter to 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  // Max 5 attempts allowed before a 30-minute freeze
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 30 * 60 * 1000 };
  }

  return this.updateOne(updates);
};

// 4. Reset counter when successfully logged in
userSchema.methods.resetLoginAttempts = async function () {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 },
  });
};

// =========================================================
// USER MODEL
// =========================================================
const User = mongoose.model("User", userSchema);

export default User;