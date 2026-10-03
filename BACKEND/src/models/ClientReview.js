import mongoose from "mongoose";

const clientReviewSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Author designation is required (e.g., Procurement Head, Principal)"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Client company / Institution name is required"],
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    companyLogo: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    review: {
      type: String,
      required: [true, "Review testimonial text is required"],
      maxlength: 800,
      trim: true,
    },
    projectDelivered: {
      type: String,
      default: "",
      trim: true,
    },
    isVerifiedClient: {
      type: Boolean,
      default: true,
    },
    isApproved: {
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

export default mongoose.model("ClientReview", clientReviewSchema);