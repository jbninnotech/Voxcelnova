import mongoose from "mongoose";

const customizationSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      unique: true,
      index: true,
    },

    // 1. Institution & Client Details
    institutionName: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
    },
    institutionType: {
      type: String,
      required: [true, "Institution type is required"],
      enum: [
        "School",
        "College",
        "University",
        "Training Institute",
        "Corporate",
        "Healthcare",
        "Hospital",
        "Sports",
        "Other",
      ],
      default: "School",
    },
    contactPerson: {
      type: String,
      required: [true, "Contact person name is required"],
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
      default: "Administrator",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Work email is required"],
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    // 2. Uniform & Garment Requirements
    uniformCategory: {
      type: String,
      required: [true, "Uniform category is required"],
    },
    garmentTypes: {
      type: [String],
      default: [],
    },
    estimatedQuantity: {
      type: Number,
      required: [true, "Estimated quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    numberOfDesigns: {
      type: Number,
      default: 1,
    },
    requiredFor: {
      type: String,
      enum: ["Students", "Staff", "Students + Staff", "Other"],
      default: "Students",
    },

    // 3. Branding & Customization
    primaryColor: {
      type: String,
      default: "#0052FF",
    },
    secondaryColor: {
      type: String,
      default: "#FFFFFF",
    },
    logoPosition: {
      type: String,
      default: "Left Chest",
    },
    customizationMethods: {
      type: [String],
      default: [],
    },

    // 4. File Upload Attachments
    logoFile: {
      path: { type: String, default: "" },
      originalName: { type: String, default: "" },
    },
    designFile: {
      path: { type: String, default: "" },
      originalName: { type: String, default: "" },
    },
    sizeChartFile: {
      path: { type: String, default: "" },
      originalName: { type: String, default: "" },
    },

    // 5. Size Breakdown
    sizes: {
      XS: { type: Number, default: 0 },
      S: { type: Number, default: 0 },
      M: { type: Number, default: 0 },
      L: { type: Number, default: 0 },
      XL: { type: Number, default: 0 },
      XXL: { type: Number, default: 0 },
      Custom: { type: String, default: "" },
    },

    // 6. Fabric & Delivery
    fabricPreference: {
      type: String,
      default: "Cotton Blend",
    },
    customFabric: {
      type: String,
      default: "",
    },
    expectedDeliveryDate: {
      type: Date,
      default: null,
    },
    deliveryLocation: {
      type: String,
      default: "",
    },
    packagingRequirement: {
      type: String,
      default: "Standard Bulk",
    },
    additionalRequirements: {
      type: String,
      default: "",
    },

    // 7. Pipeline Workflow & Status
    status: {
      type: String,
      enum: [
        "New",
        "Reviewing",
        "Quotation Sent",
        "Sample In Progress",
        "Sample Approved",
        "In Production",
        "Completed",
        "Cancelled",
      ],
      default: "New",
    },
    adminNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// ✅ FIXED: Remove (next) parameter and remove next() call
customizationSchema.pre("save", async function () {
  if (!this.requestId) {
    const randomDigit = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    this.requestId = `VN-CUS-${year}-${randomDigit}`;
  }
  // No next() needed for async function in Mongoose!
});

export default mongoose.model("Customization", customizationSchema);