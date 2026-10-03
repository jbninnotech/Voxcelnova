import ClientProject from "../models/ClientProject.js";
import ClientReview from "../models/ClientReview.js";
import ClientFeedback from "../models/ClientFeedback.js";
import { uploadBufferToCloudinary } from "../config/cloudinary.js";

// Safe string extractor
const getUrlString = (res) => {
  if (!res) return "";
  if (typeof res === "string") return res;
  return res.secure_url || res.url || "";
};

// =========================================================
// 1. GET ALL CLIENT PROJECTS / DELIVERIES
// =========================================================
export const getClientProjects = async (req, res) => {
  try {
    const { category, search, all } = req.query;
    const filter = all === "true" ? {} : { isFeatured: true };

    if (category && category !== "All" && category !== "all") {
      filter.category = new RegExp(`^${category.trim()}$`, "i");
    }

    if (search) {
      filter.$or = [
        { client: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { fabric: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const projects = await ClientProject.find(filter).sort({
      orderIndex: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch client showcase deliveries",
      error: error.message,
    });
  }
};

// =========================================================
// 2. GET SINGLE PROJECT
// =========================================================
export const getSingleClientProject = async (req, res) => {
  try {
    const project = await ClientProject.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project delivery not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================================================
// 3. ADMIN: CREATE CLIENT PROJECT (FIXED CLOUDINARY UPLOAD)
// =========================================================
export const createClientProject = async (req, res) => {
  try {
    const {
      title,
      client,
      category,
      volume,
      fabric,
      location,
      deliveryDate,
      badge,
      description,
      clientQuote,
      isFeatured,
      orderIndex,
    } = req.body;

    let imageUrl = "";
    let clientLogoUrl = "";
    let galleryUrls = [];

    // --- 1. EXTRACT AND UPLOAD PRIMARY IMAGE ---
    let primaryFile = null;
    if (req.files && req.files.image && req.files.image[0]) {
      primaryFile = req.files.image[0];
    } else if (req.file) {
      primaryFile = req.file;
    }

    if (primaryFile && primaryFile.buffer) {
      const uploadRes = await uploadBufferToCloudinary(primaryFile.buffer, "voxcel_deliveries");
      imageUrl = getUrlString(uploadRes);
    } else if (typeof req.body.image === "string" && req.body.image.startsWith("http")) {
      imageUrl = req.body.image.trim();
    }

    // Fail gracefully if image was not provided
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Primary showcase image file is required and must be uploaded.",
      });
    }

    // --- 2. EXTRACT AND UPLOAD CLIENT LOGO ---
    let logoFile = null;
    if (req.files && req.files.clientLogo && req.files.clientLogo[0]) {
      logoFile = req.files.clientLogo[0];
    }

    if (logoFile && logoFile.buffer) {
      const logoRes = await uploadBufferToCloudinary(logoFile.buffer, "voxcel_logos");
      clientLogoUrl = getUrlString(logoRes);
    } else if (typeof req.body.clientLogo === "string") {
      clientLogoUrl = req.body.clientLogo.trim();
    }

    // --- 3. EXTRACT AND UPLOAD GALLERY PHOTOS ---
    if (req.files && req.files.gallery && req.files.gallery.length > 0) {
      for (const gFile of req.files.gallery) {
        if (gFile.buffer) {
          const galRes = await uploadBufferToCloudinary(gFile.buffer, "voxcel_delivery_gallery");
          const urlStr = getUrlString(galRes);
          if (urlStr) galleryUrls.push(urlStr);
        }
      }
    }

    const project = await ClientProject.create({
      title: title || "Uniform Delivery Batch",
      client: client || "Client Institution",
      category: category || "School Uniforms",
      volume: volume || "Batch Run",
      fabric: fabric || "Poly-Cotton Twill",
      location: location || "Pan India",
      deliveryDate: deliveryDate || "Completed",
      badge: badge || "DELIVERED",
      description: description || "",
      clientQuote: clientQuote || "",
      image: String(imageUrl), // ALWAYS A STRING URL
      clientLogo: String(clientLogoUrl || ""),
      gallery: galleryUrls.map(String),
      isFeatured: isFeatured !== undefined ? isFeatured === "true" || isFeatured === true : true,
      orderIndex: Number(orderIndex) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Client project delivery published successfully",
      data: project,
    });
  } catch (error) {
    console.error("Create Client Project Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================================================
// 4. ADMIN: UPDATE CLIENT PROJECT
// =========================================================
export const updateClientProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ClientProject.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    let primaryFile = null;
    if (req.files && req.files.image && req.files.image[0]) {
      primaryFile = req.files.image[0];
    } else if (req.file) {
      primaryFile = req.file;
    }

    if (primaryFile && primaryFile.buffer) {
      const upRes = await uploadBufferToCloudinary(primaryFile.buffer, "voxcel_deliveries");
      project.image = getUrlString(upRes);
    } else if (typeof req.body.image === "string" && req.body.image.startsWith("http")) {
      project.image = req.body.image.trim();
    }

    if (req.files && req.files.clientLogo && req.files.clientLogo[0]) {
      const logoRes = await uploadBufferToCloudinary(req.files.clientLogo[0].buffer, "voxcel_logos");
      project.clientLogo = getUrlString(logoRes);
    }

    if (req.files && req.files.gallery && req.files.gallery.length > 0) {
      for (const file of req.files.gallery) {
        if (file.buffer) {
          const galRes = await uploadBufferToCloudinary(file.buffer, "voxcel_delivery_gallery");
          const urlStr = getUrlString(galRes);
          if (urlStr) project.gallery.push(urlStr);
        }
      }
    }

    if (req.body.title) project.title = req.body.title;
    if (req.body.client) project.client = req.body.client;
    if (req.body.category) project.category = req.body.category;
    if (req.body.volume) project.volume = req.body.volume;
    if (req.body.fabric) project.fabric = req.body.fabric;
    if (req.body.location) project.location = req.body.location;
    if (req.body.deliveryDate) project.deliveryDate = req.body.deliveryDate;
    if (req.body.badge) project.badge = req.body.badge;
    if (req.body.description !== undefined) project.description = req.body.description;
    if (req.body.isFeatured !== undefined) project.isFeatured = req.body.isFeatured === "true" || req.body.isFeatured === true;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Client project delivery updated successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================================================
// 5. ADMIN: DELETE CLIENT PROJECT
// =========================================================
export const deleteClientProject = async (req, res) => {
  try {
    const project = await ClientProject.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================================================
// 6. GET ALL REVIEWS
// =========================================================
export const getClientReviews = async (req, res) => {
  try {
    const { all } = req.query;
    const filter = all === "true" ? {} : { isApproved: true };

    const reviews = await ClientReview.find(filter).sort({
      orderIndex: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch client reviews",
      error: error.message,
    });
  }
};

// =========================================================
// 7. PUBLIC: SUBMIT CLIENT REVIEW
// =========================================================
export const submitClientReview = async (req, res) => {
  try {
    const { author, designation, company, rating, review, projectDelivered } = req.body;

    if (!author || !review) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name and review text.",
      });
    }

    let avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

    if (req.file && req.file.buffer) {
      const upRes = await uploadBufferToCloudinary(req.file.buffer, "voxcel_avatars");
      avatarUrl = getUrlString(upRes);
    }

    const newReview = await ClientReview.create({
      author,
      designation: designation || "Client Partner",
      company: company || "Enterprise Institution",
      rating: Number(rating) || 5,
      review,
      avatar: avatarUrl,
      projectDelivered: projectDelivered || "",
      isVerifiedClient: true,
      isApproved: true,
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your client review has been recorded.",
      data: newReview,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to submit review",
      error: error.message,
    });
  }
};

// =========================================================
// 8. ADMIN: CREATE CLIENT REVIEW (WITH AVATAR & LOGO)
// =========================================================
export const adminCreateClientReview = async (req, res) => {
  try {
    const { author, designation, company, rating, review, projectDelivered, isVerifiedClient } = req.body;
    let avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
    let companyLogoUrl = "";

    if (req.files) {
      if (req.files.avatar && req.files.avatar[0] && req.files.avatar[0].buffer) {
        const upRes = await uploadBufferToCloudinary(req.files.avatar[0].buffer, "voxcel_avatars");
        avatarUrl = getUrlString(upRes);
      }
      if (req.files.companyLogo && req.files.companyLogo[0] && req.files.companyLogo[0].buffer) {
        const logoRes = await uploadBufferToCloudinary(req.files.companyLogo[0].buffer, "voxcel_logos");
        companyLogoUrl = getUrlString(logoRes);
      }
    } else if (req.file && req.file.buffer) {
      const upRes = await uploadBufferToCloudinary(req.file.buffer, "voxcel_avatars");
      avatarUrl = getUrlString(upRes);
    }

    if (!author || !review || !company) {
      return res.status(400).json({
        success: false,
        message: "Author name, company, and review testimonial are required.",
      });
    }

    const newReview = await ClientReview.create({
      author,
      designation: designation || "Procurement Manager",
      company,
      companyLogo: companyLogoUrl,
      rating: Number(rating) || 5,
      review,
      projectDelivered: projectDelivered || "",
      avatar: avatarUrl,
      isVerifiedClient: isVerifiedClient !== undefined ? isVerifiedClient === "true" || isVerifiedClient === true : true,
      isApproved: true,
    });

    res.status(201).json({
      success: true,
      message: "Client review created successfully",
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================================================
// 9. ADMIN: TOGGLE REVIEW APPROVAL & DELETE
// =========================================================
export const toggleReviewApproval = async (req, res) => {
  try {
    const review = await ClientReview.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    review.isApproved = !review.isApproved;
    await review.save();

    res.status(200).json({
      success: true,
      message: `Review ${review.isApproved ? "Approved" : "Hidden"}`,
      data: review,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteClientReview = async (req, res) => {
  try {
    const review = await ClientReview.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =========================================================
// 10. CLIENT STATS
// =========================================================
export const getClientStats = async (req, res) => {
  try {
    const totalProjects = await ClientProject.countDocuments();
    const totalReviews = await ClientReview.countDocuments({ isApproved: true });

    res.status(200).json({
      success: true,
      data: [
        { val: "2.5M+", label: "Uniform Units Delivered" },
        { val: "99.8%", label: "On-Time Dispatch Rate" },
        { val: `${Math.max(totalProjects * 12, 180)}+`, label: "Institutional Clients" },
        { val: `${Math.min(95 + (totalReviews % 5), 99.4)}%`, label: "Client Retention Rate" },
      ],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch stats",
    });
  }
};

// =========================================================
// 11. FEEDBACK CONTROLLERS
// =========================================================
export const getClientFeedbacks = async (req, res) => {
  try {
    const { all } = req.query;
    const filter = all === "true" ? {} : { isPublished: true };
    const feedbacks = await ClientFeedback.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: feedbacks.length, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createClientFeedback = async (req, res) => {
  try {
    const { author, company, designation, rating, feedback } = req.body;
    let avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

    if (req.file && req.file.buffer) {
      const upRes = await uploadBufferToCloudinary(req.file.buffer, "voxcel_feedbacks");
      avatarUrl = getUrlString(upRes);
    }

    if (!author || !feedback) {
      return res.status(400).json({ success: false, message: "Author and feedback are required" });
    }

    const item = await ClientFeedback.create({
      author,
      company: company || "",
      designation: designation || "Client",
      avatar: avatarUrl,
      rating: Number(rating) || 5,
      feedback,
      isPublished: true,
    });

    res.status(201).json({ success: true, message: "Feedback created successfully", data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleFeedbackPublication = async (req, res) => {
  try {
    const item = await ClientFeedback.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Feedback not found" });

    item.isPublished = !item.isPublished;
    await item.save();

    res.status(200).json({
      success: true,
      message: `Feedback ${item.isPublished ? "Published" : "Unpublished"}`,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteClientFeedback = async (req, res) => {
  try {
    const item = await ClientFeedback.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Feedback not found" });

    res.status(200).json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};