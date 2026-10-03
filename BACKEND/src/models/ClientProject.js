import mongoose from "mongoose";

const clientProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project / Uniform title is required"],
      trim: true,
    },
    client: {
      type: String,
      required: [true, "Client or institution name is required"],
      trim: true,
    },
    clientLogo: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required (e.g. School, Corporate, Hotel, College)"],
      trim: true,
    },
    volume: {
      type: String,
      required: [true, "Delivered batch volume is required (e.g. 5,000 Units)"],
      trim: true,
    },
    fabric: {
      type: String,
      required: [true, "Fabric specifications are required"],
      trim: true,
    },
    location: {
      type: String,
      default: "Pan India",
      trim: true,
    },
    deliveryDate: {
      type: String,
      default: "Completed",
      trim: true,
    },
    badge: {
      type: String,
      default: "DELIVERED",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    // Primary showcase image
    image: {
      type: String,
      required: [true, "Primary showcase image is required"],
    },
    // Optional delivery gallery / real product photos
    gallery: [
      {
        type: String,
      },
    ],
    clientQuote: {
      type: String,
      default: "",
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    orderIndex: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ClientProject", clientProjectSchema);