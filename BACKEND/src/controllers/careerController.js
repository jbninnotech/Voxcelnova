import Job from "../models/Job.js";

// =========================================================
// GET ALL ACTIVE JOBS
// =========================================================

export const getActiveJobs = async (req, res) => {
  try {
    const {
      department,
      location,
      jobType,
      search,
      featured,
    } = req.query;

    const filter = {
      isActive: true,
    };

    if (department) {
      filter.department = department;
    }

    if (location) {
      filter.location = location;
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          department: {
            $regex: search,
            $options: "i",
          },
        },
        {
          skills: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const jobs = await Job.find(filter)
      .sort({
        featured: -1,
        createdAt: -1,
      })
      .lean();

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get active jobs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs.",
    });
  }
};

// =========================================================
// GET SINGLE JOB
// =========================================================

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Get job error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch job.",
    });
  }
};

// =========================================================
// CREATE JOB - ADMIN
// =========================================================

export const createJob = async (req, res) => {
  try {
    const {
      title,
      slug,
      department,
      location,
      jobType,
      experience,
      salary,
      description,
      responsibilities,
      requirements,
      skills,
      education,
      openings,
      applicationDeadline,
      featured,
    } = req.body;

    if (
      !title ||
      !slug ||
      !department ||
      !location ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, slug, department, location and description are required.",
      });
    }

    const existingJob = await Job.findOne({
      slug: slug.toLowerCase(),
    });

    if (existingJob) {
      return res.status(409).json({
        success: false,
        message: "A job with this slug already exists.",
      });
    }

    const job = await Job.create({
      title,
      slug: slug.toLowerCase(),
      department,
      location,
      jobType,
      experience,
      salary,
      description,
      responsibilities,
      requirements,
      skills,
      education,
      openings,
      applicationDeadline,
      featured,
      createdBy: req.user?.id || null,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully.",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create job.",
    });
  }
};

// =========================================================
// UPDATE JOB - ADMIN
// =========================================================

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    const allowedFields = [
      "title",
      "slug",
      "department",
      "location",
      "jobType",
      "experience",
      "salary",
      "description",
      "responsibilities",
      "requirements",
      "skills",
      "education",
      "openings",
      "applicationDeadline",
      "isActive",
      "featured",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    if (job.slug) {
      job.slug = job.slug.toLowerCase();
    }

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.error("Update job error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update job.",
    });
  }
};

// =========================================================
// DELETE JOB - ADMIN
// =========================================================

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("Delete job error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete job.",
    });
  }
};

// =========================================================
// GET ALL JOBS - ADMIN
// =========================================================

export const getAllJobsAdmin = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("createdBy", "name email role")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Admin jobs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs.",
    });
  }
};