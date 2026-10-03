import ClientProject from "../models/ClientProject.js";
import ClientReview from "../models/ClientReview.js";
import ClientFeedback from "../models/ClientFeedback.js";
import { uploadBufferToCloudinary } from "../config/cloudinary.js";

// =========================================================
// 1. GET ALL CLIENT PROJECTS / DELIVERIES (Public & Filterable)
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
// 2. GET SINGLE PROJECT / DELIVERY DETAILS
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
// 3. ADMIN: CREATE CLIENT PROJECT / DELIVERY SHOWCASE
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

    let imageUrl = req.body.image;
    let clientLogoUrl = req.body.clientLogo || "";
    let galleryUrls = [];

    // Parse existing gallery URLs if provided as stringified JSON or array
    if (req.body.gallery) {
      try {
        galleryUrls = typeof req.body.gallery === "string" ? JSON.parse(req.body.gallery) : req.body.gallery;
      } catch {
        galleryUrls = Array.isArray(req.body.gallery) ? req.body.gallery : [req.body.gallery];
      }
    }

    // Handle Uploaded Files
    if (req.files) {
      // Primary Showcase Image
      if (req.files.image && req.files.image[0]) {
        imageUrl = await uploadBufferToCloudinary(req.files.image[0].buffer, "voxcel_deliveries");
      }

      // Optional Client Logo
      if (req.files.clientLogo && req.files.clientLogo[0]) {
        clientLogoUrl = await uploadBufferToCloudinary(req.files.clientLogo[0].buffer, "voxcel_logos");
      }

      // Optional Delivery Gallery Photos
      if (req.files.gallery && req.files.gallery.length > 0) {
        for (const file of req.files.gallery) {
          const uploadedUrl = await uploadBufferToCloudinary(file.buffer, "voxcel_delivery_gallery");
          galleryUrls.push(uploadedUrl);
        }
      }
    } else if (req.file) {
      imageUrl = await uploadBufferToCloudinary(req.file.buffer, "voxcel_deliveries");
    }

    if (!title || !client || !category || !volume || !fabric || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Title, client, category, volume, fabric, and primary showcase image are required.",
      });
    }

    const project = await ClientProject.create({
      title,
      client,
      clientLogo: clientLogoUrl,
      category,
      volume,
      fabric,
      location: location || "Pan India",
      deliveryDate: deliveryDate || "Completed",
      badge: badge || "DELIVERED",
      description: description || "",
      clientQuote: clientQuote || "",
      image: imageUrl,
      gallery: galleryUrls,
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
// 4. ADMIN: UPDATE CLIENT PROJECT / DELIVERY
// =========================================================
export const updateClientProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ClientProject.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Handle File Uploads
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        project.image = await uploadBufferToCloudinary(req.files.image[0].buffer, "voxcel_deliveries");
      }
      if (req.files.clientLogo && req.files.clientLogo[0]) {
        project.clientLogo = await uploadBufferToCloudinary(req.files.clientLogo[0].buffer, "voxcel_logos");
      }
      if (req.files.gallery && req.files.gallery.length > 0) {
        for (const file of req.files.gallery) {
          const uploadedUrl = await uploadBufferToCloudinary(file.buffer, "voxcel_delivery_gallery");
          project.gallery.push(uploadedUrl);
        }
      }
    } else if (req.file) {
      project.image = await uploadBufferToCloudinary(req.file.buffer, "voxcel_deliveries");
    }

    if (req.body.image) project.image = req.body.image;
    if (req.body.clientLogo) project.clientLogo = req.body.clientLogo;
    if (req.body.title) project.title = req.body.title;
    if (req.body.client) project.client = req.body.client;
    if (req.body.category) project.category = req.body.category;
    if (req.body.volume) project.volume = req.body.volume;
    if (req.body.fabric) project.fabric = req.body.fabric;
    if (req.body.location) project.location = req.body.location;
    if (req.body.deliveryDate) project.deliveryDate = req.body.deliveryDate;
    if (req.body.badge) project.badge = req.body.badge;
    if (req.body.description !== undefined) project.description = req.body.description;
    if (req.body.clientQuote !== undefined) project.clientQuote = req.body.clientQuote;
    if (req.body.isFeatured !== undefined) project.isFeatured = req.body.isFeatured === "true" || req.body.isFeatured === true;
    if (req.body.orderIndex !== undefined) project.orderIndex = Number(req.body.orderIndex);

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

    if (req.file) {
      avatarUrl = await uploadBufferToCloudinary(req.file.buffer, "voxcel_avatars");
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
// 8. ADMIN: CREATE CLIENT REVIEW WITH AVATAR & COMPANY LOGO
// =========================================================
export const adminCreateClientReview = async (req, res) => {
  try {
    const { author, designation, company, rating, review, projectDelivered, isVerifiedClient } = req.body;
    let avatarUrl = req.body.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
    let companyLogoUrl = req.body.companyLogo || "";

    if (req.files) {
      if (req.files.avatar && req.files.avatar[0]) {
        avatarUrl = await uploadBufferToCloudinary(req.files.avatar[0].buffer, "voxcel_avatars");
      }
      if (req.files.companyLogo && req.files.companyLogo[0]) {
        companyLogoUrl = await uploadBufferToCloudinary(req.files.companyLogo[0].buffer, "voxcel_logos");
      }
    } else if (req.file) {
      avatarUrl = await uploadBufferToCloudinary(req.file.buffer, "voxcel_avatars");
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
// 9. ADMIN: TOGGLE REVIEW APPROVAL & DELETE REVIEW
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
    const totalFeedbacks = await ClientFeedback.countDocuments({ isPublished: true });

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

    if (req.file) {
      avatarUrl = await uploadBufferToCloudinary(req.file.buffer, "voxcel_feedbacks");
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