import Customization from "../models/Customization.js";

// Safe JSON parser for FormData stringified fields
const safeJsonParse = (val, fallback = null) => {
  if (!val) return fallback;
  if (typeof val === "object") return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
};

// Centralized error handler that guarantees "next is not a function" won't crash Express
const handleControllerError = (error, res, next) => {
  console.error("Customization Controller Error:", error);
  if (typeof next === "function") {
    return next(error);
  }
  return res.status(500).json({
    success: false,
    message: error.message || "Internal server error occurred.",
  });
};

// @desc    Submit Custom Uniform / Bulk Manufacturing Request
// @route   POST /api/customizations
// @access  Public
export const submitCustomization = async (req, res, next) => {
  try {
    const {
      institutionName,
      institutionType,
      contactPerson,
      designation,
      phone,
      email,
      city,
      state,
      uniformCategory,
      garmentTypes,
      estimatedQuantity,
      numberOfDesigns,
      requiredFor,
      primaryColor,
      secondaryColor,
      logoPosition,
      customizationMethods,
      sizes,
      fabricPreference,
      customFabric,
      expectedDeliveryDate,
      deliveryLocation,
      packagingRequirement,
      additionalRequirements,
    } = req.body;

    // Validate mandatory fields
    if (!institutionName || !contactPerson || !phone || !email || !estimatedQuantity) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all compulsory institution and contact details.",
      });
    }

    // Process file attachments safely
    const files = req.files || {};
    const logoFile = files.logo?.[0]
      ? { path: files.logo[0].path.replace(/\\/g, "/"), originalName: files.logo[0].originalname }
      : { path: "", originalName: "" };

    const designFile = files.design?.[0]
      ? { path: files.design[0].path.replace(/\\/g, "/"), originalName: files.design[0].originalname }
      : { path: "", originalName: "" };

    const sizeChartFile = files.sizeChart?.[0]
      ? { path: files.sizeChart[0].path.replace(/\\/g, "/"), originalName: files.sizeChart[0].originalname }
      : { path: "", originalName: "" };

    // Parse array/object fields from FormData
    const parsedGarmentTypes = safeJsonParse(garmentTypes, []);
    const parsedCustomizationMethods = safeJsonParse(customizationMethods, []);
    const parsedSizes = safeJsonParse(sizes, { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0, Custom: "" });

    // Generate fallback Request ID if your model doesn't have an auto pre-save hook
    const generatedId = `VN-CUS-${Date.now().toString().slice(-6)}`;

    const newRequest = await Customization.create({
      requestId: generatedId,
      institutionName,
      institutionType: institutionType || "School",
      contactPerson,
      designation: designation || "Administrator",
      phone,
      email,
      city,
      state,
      uniformCategory: uniformCategory || "Regular Uniform",
      garmentTypes: Array.isArray(parsedGarmentTypes) ? parsedGarmentTypes : [parsedGarmentTypes],
      estimatedQuantity: Number(estimatedQuantity) || 100,
      numberOfDesigns: Number(numberOfDesigns) || 1,
      requiredFor: requiredFor || "Students",
      primaryColor: primaryColor || "#0052FF",
      secondaryColor: secondaryColor || "#FFFFFF",
      logoPosition: logoPosition || "Left Chest",
      customizationMethods: Array.isArray(parsedCustomizationMethods)
        ? parsedCustomizationMethods
        : [parsedCustomizationMethods],
      logoFile,
      designFile,
      sizeChartFile,
      sizes: parsedSizes,
      fabricPreference: fabricPreference || "Cotton Blend",
      customFabric: customFabric || "",
      expectedDeliveryDate: expectedDeliveryDate ? new Date(expectedDeliveryDate) : null,
      deliveryLocation: deliveryLocation || "",
      packagingRequirement: packagingRequirement || "Individual Packaging",
      additionalRequirements: additionalRequirements || "",
      status: "New",
    });

    return res.status(201).json({
      success: true,
      message: "Customization request submitted successfully.",
      requestId: newRequest.requestId || generatedId,
      data: newRequest,
    });
  } catch (error) {
    return handleControllerError(error, res, next);
  }
};

// @desc    Get All Customization Requests (with Search, Status Filter & Stats)
// @route   GET /api/customizations
// @access  Admin
export const getAllCustomizations = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const filter = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { requestId: { $regex: search, $options: "i" } },
        { institutionName: { $regex: search, $options: "i" } },
        { contactPerson: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const customizations = await Customization.find(filter).sort({ createdAt: -1 });

    // Aggregate Quick Stats
    const allRecords = await Customization.find({}, "status");
    const stats = {
      total: allRecords.length,
      new: allRecords.filter((r) => r.status === "New").length,
      reviewing: allRecords.filter((r) => r.status === "Reviewing").length,
      sampling: allRecords.filter((r) => r.status === "Sample In Progress").length,
      production: allRecords.filter((r) => r.status === "In Production").length,
      completed: allRecords.filter((r) => r.status === "Completed").length,
    };

    return res.status(200).json({
      success: true,
      count: customizations.length,
      stats,
      data: customizations,
      customizations,
    });
  } catch (error) {
    return handleControllerError(error, res, next);
  }
};

// @desc    Get Single Customization by ID
// @route   GET /api/customizations/:id
// @access  Admin
export const getCustomizationById = async (req, res, next) => {
  try {
    const item = await Customization.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Customization request not found." });
    }
    return res.status(200).json({ success: true, data: item, customization: item });
  } catch (error) {
    return handleControllerError(error, res, next);
  }
};

// @desc    Update Customization Status
// @route   PATCH /api/customizations/:id/status
// @access  Admin
export const updateCustomizationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const item = await Customization.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }
    return res.status(200).json({ success: true, message: "Status updated successfully.", data: item });
  } catch (error) {
    return handleControllerError(error, res, next);
  }
};

// @desc    Update Admin Notes
// @route   PATCH /api/customizations/:id/notes
// @access  Admin
export const updateCustomizationNotes = async (req, res, next) => {
  try {
    const { adminNotes } = req.body;
    const item = await Customization.findByIdAndUpdate(
      req.params.id,
      { adminNotes },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }
    return res.status(200).json({ success: true, message: "Notes saved.", data: item });
  } catch (error) {
    return handleControllerError(error, res, next);
  }
};

// @desc    Delete Customization
// @route   DELETE /api/customizations/:id
// @access  Admin
export const deleteCustomization = async (req, res, next) => {
  try {
    const item = await Customization.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }
    return res.status(200).json({ success: true, message: "Customization request deleted successfully." });
  } catch (error) {
    return handleControllerError(error, res, next);
  }
};