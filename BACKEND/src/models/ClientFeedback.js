import mongoose from "mongoose";

const clientFeedbackSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    company: {
      type: String,
      default: "",
      trim: true,
    },
    designation: {
      type: String,
      default: "Client",
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
      required: [true, "Feedback text is required"],
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ClientFeedback", clientFeedbackSchema);