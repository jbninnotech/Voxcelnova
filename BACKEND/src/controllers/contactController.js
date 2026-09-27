import ContactInquiry from "../models/ContactInquiry.js";

// @desc    Submit Bulk Production Inquiry
// @route   POST /api/contact
// @access  Public
export const submitInquiry = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      companyName,
      clothingCategory,
      quantityTier,
      deadline,
      message,
    } = req.body;

    if (!name || !email || !phone || !companyName || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill in all required fields (name, email, phone, companyName, message).",
      });
    }

    const enquiry = await ContactInquiry.create({
      name,
      email,
      phone,
      companyName,
      clothingCategory,
      quantityTier,
      deadline: deadline ? new Date(deadline) : null,
      message,
      status: "New",
    });

    return res.status(201).json({
      success: true,
      message: "Order inquiry submitted successfully.",
      data: enquiry,
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get All Inquiries
// @route   GET /api/contact
// @access  Internal / Admin
export const getAllInquiries = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const enquiries = await ContactInquiry.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Inquiry by ID
// @route   GET /api/contact/:id
// @access  Admin
export const getInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enquiry = await ContactInquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    // FIXED: Correctly returning `enquiry`
    return res.status(200).json({
      success: true,
      data: enquiry,
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Inquiry Status
// @route   PATCH /api/contact/:id/status or PATCH /api/contact/:id
// @access  Admin
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status field is required.",
      });
    }

    const enquiry = await ContactInquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      data: enquiry,
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Admin Notes
// @route   PATCH /api/contact/:id/notes
// @access  Admin
export const updateInquiryNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminNotes } = req.body;

    const enquiry = await ContactInquiry.findByIdAndUpdate(
      id,
      { adminNotes },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin notes saved successfully.",
      data: enquiry,
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Inquiry
// @route   DELETE /api/contact/:id
// @access  Admin
export const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enquiry = await ContactInquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully.",
      id,
    });
  } catch (error) {
    next(error);
  }
};