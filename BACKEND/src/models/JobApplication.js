import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    // =========================================================
    // JOB
    // =========================================================

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // =========================================================
    // PERSONAL DETAILS
    // =========================================================

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    alternatePhone: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================================================
    // PROFESSIONAL DETAILS
    // =========================================================

    experience: {
      type: String,
      default: "Fresher",
      trim: true,
    },

    currentCompany: {
      type: String,
      default: "",
      trim: true,
    },

    currentRole: {
      type: String,
      default: "",
      trim: true,
    },

    expectedSalary: {
      type: String,
      default: "",
      trim: true,
    },

    noticePeriod: {
      type: String,
      default: "",
      trim: true,
    },

    education: {
      type: String,
      default: "",
      trim: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    coverLetter: {
      type: String,
      default: "",
      trim: true,
    },

    // =========================================================
    // RESUME
    // =========================================================

    resume: {
      originalName: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },

      publicId: {
        type: String,
        required: true,
      },

      mimeType: {
        type: String,
        required: true,
      },

      size: {
        type: Number,
        required: true,
      },
    },

    // =========================================================
    // APPLICATION STATUS
    // =========================================================

    status: {
      type: String,
      enum: [
        "Applied",
        "Under Review",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected",
      ],
      default: "Applied",
    },

    // =========================================================
    // ADMIN
    // =========================================================

    adminNotes: {
      type: String,
      default: "",
      trim: true,
    },

    interviewDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// =========================================================
// PREVENT DUPLICATE APPLICATION
// Same email cannot apply twice for same job
// =========================================================

jobApplicationSchema.index(
  {
    job: 1,
    email: 1,
  },
  {
    unique: true,
  }
);

const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);

export default JobApplication;