import mongoose from "mongoose";

const contactInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Contact person name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Work email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
      default: "General Order Inquiry",
    },
    clothingCategory: {
      type: String,
      default: "Corporate Uniforms",
    },
    quantityTier: {
      type: String,
      default: "200 - 500 Units",
    },
    deadline: {
      type: Date,
      default: null,
    },
    message: {
      type: String,
      required: [true, "Specification message is required"],
      trim: true,
    },
    // Updated enum to match your frontend status options
    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "In Progress",
        "Resolved",
        "Closed",
        "In Review",
        "Quote Sent",
        "Archived",
      ],
      default: "New",
    },
    // Added field so team notes are saved in MongoDB
    adminNotes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactInquiry", contactInquirySchema);