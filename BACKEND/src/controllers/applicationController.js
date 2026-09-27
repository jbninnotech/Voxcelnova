import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import cloudinary from "../config/cloudinary.js";

// ============================================================
// CLOUDINARY BUFFER UPLOAD
// ============================================================

const uploadResumeToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "voxcel-nova/resumes",

        resource_type: "raw",

        public_id: `${Date.now()}-${originalName
          .replace(/\.[^/.]+$/, "")
          .replace(/[^a-zA-Z0-9-_]/g, "-")}`,
      },

      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

// ============================================================
// APPLY FOR JOB
// POST /api/applications/apply
// ============================================================

export const applyForJob = async (req, res) => {
  try {
    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      alternatePhone,
      location,
      experience,
      currentCompany,
      currentRole,
      expectedSalary,
      noticePeriod,
      education,
      skills,
      coverLetter,
    } = req.body;

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required.",
      });
    }

    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "First name and last name are required.",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Location is required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required.",
      });
    }

    // ========================================================
    // CHECK JOB
    // ========================================================

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    if (!job.isActive) {
      return res.status(400).json({
        success: false,
        message: "This job is no longer accepting applications.",
      });
    }

    // ========================================================
    // CHECK DEADLINE
    // ========================================================

    if (
      job.applicationDeadline &&
      new Date() > new Date(job.applicationDeadline)
    ) {
      return res.status(400).json({
        success: false,
        message: "Application deadline has passed.",
      });
    }

    // ========================================================
    // CHECK DUPLICATE APPLICATION
    // ========================================================

    const existingApplication =
      await JobApplication.findOne({
        job: jobId,
        email: email.toLowerCase().trim(),
      });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message:
          "You have already applied for this position.",
      });
    }

    // ========================================================
    // UPLOAD RESUME TO CLOUDINARY
    // ========================================================

    const cloudinaryResult =
      await uploadResumeToCloudinary(
        req.file.buffer,
        req.file.originalname
      );

    // ========================================================
    // PROCESS SKILLS
    // ========================================================

    let skillsArray = [];

    if (skills) {
      if (Array.isArray(skills)) {
        skillsArray = skills;
      } else {
        skillsArray = String(skills)
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);
      }
    }

    // ========================================================
    // CREATE APPLICATION
    // ========================================================

    const application =
      await JobApplication.create({
        job: jobId,

        firstName: firstName.trim(),
        lastName: lastName.trim(),

        email: email.toLowerCase().trim(),

        phone: phone.trim(),

        alternatePhone:
          alternatePhone?.trim() || "",

        location: location.trim(),

        experience:
          experience?.trim() || "Fresher",

        currentCompany:
          currentCompany?.trim() || "",

        currentRole:
          currentRole?.trim() || "",

        expectedSalary:
          expectedSalary?.trim() || "",

        noticePeriod:
          noticePeriod?.trim() || "",

        education:
          education?.trim() || "",

        skills: skillsArray,

        coverLetter:
          coverLetter?.trim() || "",

        resume: {
          originalName: req.file.originalname,

          url: cloudinaryResult.secure_url,

          publicId: cloudinaryResult.public_id,

          mimeType: req.file.mimetype,

          size: req.file.size,
        },

        status: "Applied",
      });

    // ========================================================
    // RESPONSE
    // ========================================================

    const populatedApplication =
      await JobApplication.findById(
        application._id
      ).populate(
        "job",
        "title department location jobType"
      );

    return res.status(201).json({
      success: true,

      message:
        "Your application has been submitted successfully.",

      application: populatedApplication,
    });
  } catch (error) {
    console.error(
      "Apply for job error:",
      error
    );

    // Duplicate index protection
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "You have already applied for this job.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to submit job application.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

// ============================================================
// GET ALL APPLICATIONS - ADMIN
// GET /api/applications/admin
// ============================================================

export const getAllApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await JobApplication.find()
        .populate(
          "job",
          "title department location jobType"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(
      "Get applications error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch applications.",
    });
  }
};

// ============================================================
// GET SINGLE APPLICATION - ADMIN
// GET /api/applications/admin/:id
// ============================================================

export const getApplicationById = async (
  req,
  res
) => {
  try {
    const application =
      await JobApplication.findById(
        req.params.id
      ).populate(
        "job",
        "title department location jobType"
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(
      "Get application error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch application.",
    });
  }
};

// ============================================================
// UPDATE APPLICATION - ADMIN
// PATCH /api/applications/admin/:id
// ============================================================

export const updateApplication = async (
  req,
  res
) => {
  try {
    const {
      status,
      adminNotes,
      interviewDate,
    } = req.body;

    const application =
      await JobApplication.findById(
        req.params.id
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    if (status !== undefined) {
      const allowedStatuses = [
        "Applied",
        "Under Review",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid application status.",
        });
      }

      application.status = status;
    }

    if (adminNotes !== undefined) {
      application.adminNotes =
        adminNotes;
    }

    if (interviewDate !== undefined) {
      application.interviewDate =
        interviewDate || null;
    }

    await application.save();

    const updated =
      await JobApplication.findById(
        application._id
      ).populate(
        "job",
        "title department location jobType"
      );

    return res.status(200).json({
      success: true,
      message:
        "Application updated successfully.",
      application: updated,
    });
  } catch (error) {
    console.error(
      "Update application error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update application.",
    });
  }
};

// ============================================================
// DELETE APPLICATION - ADMIN
// DELETE /api/applications/admin/:id
// ============================================================

export const deleteApplication = async (
  req,
  res
) => {
  try {
    const application =
      await JobApplication.findById(
        req.params.id
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    // Delete resume from Cloudinary
    if (application.resume?.publicId) {
      try {
        await cloudinary.uploader.destroy(
          application.resume.publicId,
          {
            resource_type: "raw",
          }
        );
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary delete error:",
          cloudinaryError
        );
      }
    }

    await JobApplication.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Application deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete application error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete application.",
    });
  }
};

// ============================================================
// APPLICATION STATS - ADMIN
// GET /api/applications/admin/stats
// ============================================================

export const getApplicationStats = async (
  req,
  res
) => {
  try {
    const stats =
      await JobApplication.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    const result = {
      total: 0,
      Applied: 0,
      "Under Review": 0,
      Shortlisted: 0,
      Interview: 0,
      Selected: 0,
      Rejected: 0,
    };

    stats.forEach((item) => {
      result[item._id] = item.count;
      result.total += item.count;
    });

    return res.status(200).json({
      success: true,
      stats: result,
    });
  } catch (error) {
    console.error(
      "Application stats error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch application statistics.",
    });
  }
};