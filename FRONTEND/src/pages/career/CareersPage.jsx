import React, { useState } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaHeartbeat,
  FaTshirt,
  FaGraduationCap,
  FaPlane,
  FaSearch,
  FaCheckCircle,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";

// OPEN ROLES DATA
const INITIAL_JOBS = [
  {
    id: 1,
    title: "B2B Corporate Apparel Sales Manager",
    department: "Sales",
    location: "New York, NY (Hybrid)",
    type: "Full-Time",
    experience: "3-5 Years",
    description:
      "Drive institutional uniform contracts with corporate enterprises, private school networks, and hotel chains.",
  },
  {
    id: 2,
    title: "Senior Textile & Uniform Designer",
    department: "Design",
    location: "Los Angeles, CA (On-site)",
    type: "Full-Time",
    experience: "4+ Years",
    description:
      "Engineer ergonomic, high-durability apparel patterns and fabric blends tailored for frontline teams.",
  },
  {
    id: 3,
    title: "E-Commerce Merchandiser & Growth Lead",
    department: "Marketing",
    location: "Remote",
    type: "Full-Time",
    experience: "2-4 Years",
    description:
      "Scale our digital storefront, oversee bulk-catalog merchandising, and optimize seasonal product launches.",
  },
  {
    id: 4,
    title: "Textile Quality & Production Supervisor",
    department: "Manufacturing",
    location: "Dallas, TX (Factory)",
    type: "Full-Time",
    experience: "5+ Years",
    description:
      "Maintain ISO standard compliance across stitching lines, fabric strength testing, and batch fulfillment.",
  },
  {
    id: 5,
    title: "Warehouse & Bulk Dispatch Coordinator",
    department: "Logistics",
    location: "Chicago, IL (On-site)",
    type: "Full-Time",
    experience: "1-3 Years",
    description:
      "Coordinate high-volume pallet packaging, freight coordination, and real-time inventory tracking.",
  },
  {
    id: 6,
    title: "Institutional Accounts Support Specialist",
    department: "Customer Success",
    location: "Remote",
    type: "Full-Time",
    experience: "1-2 Years",
    description:
      "Guide school boards, healthcare groups, and hospitality managers from size samples to final delivery.",
  },
];

const PERKS = [
  {
    icon: <FaTshirt />,
    title: "Wardrobe & Gear Allowance",
    desc: "Free seasonal workwear sets and generous 50% employee discounts across all retail & uniform lines.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Comprehensive Health",
    desc: "100% premium coverage for medical, dental, and vision for full-time employees and family dependents.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Growth & Education Stipend",
    desc: "$1,500 annual budget for fashion tech workshops, leadership credentials, and supply chain seminars.",
  },
  {
    icon: <FaPlane />,
    title: "Flexible PTO & Holidays",
    desc: "Generous paid vacation, floating holidays, and flexible remote work setups for eligible positions.",
  },
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeJob, setActiveJob] = useState(null); // Selected for application modal
  const [isSubmitted, setIsSubmitted] = useState(false);

  const departments = ["All", "Sales", "Design", "Marketing", "Manufacturing", "Logistics", "Customer Success"];

  const filteredJobs = INITIAL_JOBS.filter((job) => {
    const matchesDept = selectedDept === "All" || job.department === selectedDept;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setActiveJob(null);
    }, 2200);
  };

  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", color: "#0F172A" }}>
      {/* ================= HERO SECTION ================= */}
      <section
        className="py-5 text-center position-relative"
        style={{
          background: "linear-gradient(135deg, #EBF4FF 0%, #FFFFFF 50%, #F0F7FF 100%)",
          borderBottom: "1px solid rgba(0, 82, 255, 0.1)",
        }}
      >
        <div className="container py-5">
          <span
            className="badge px-3 py-2 text-uppercase mb-3 rounded-pill"
            style={{
              backgroundColor: "rgba(0, 82, 255, 0.1)",
              color: "#0066FF",
              letterSpacing: "1px",
              fontWeight: "700",
              fontSize: "12px",
            }}
          >
            We Are Hiring
          </span>

          <h1 className="display-4 fw-bold mb-3" style={{ color: "#071A2F" }}>
            Craft The Future Of <br />
            <span
              style={{
                background: "linear-gradient(90deg, #0066FF 0%, #00D2FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Apparel & Precision Workwear
            </span>
          </h1>

          <p className="text-secondary mx-auto mb-4" style={{ maxWidth: "620px", fontSize: "1.1rem" }}>
            Join a forward-thinking team producing and scaling premium apparel for schools, corporations, and hospitals worldwide.
          </p>

          {/* Quick Search */}
          <div className="d-flex justify-content-center">
            <div
              className="bg-white p-2 rounded-pill shadow-sm d-flex align-items-center w-100"
              style={{ maxWidth: "520px", border: "1px solid #E2E8F0" }}
            >
              <FaSearch className="text-muted ms-3 me-2" />
              <input
                type="text"
                className="form-control border-0 shadow-none bg-transparent"
                placeholder="Search by job title, department, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= PERKS SECTION ================= */}
      <section className="py-5">
        <div className="container py-3">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase" style={{ letterSpacing: "1px" }}>
              Employee Benefits
            </h6>
            <h2 className="fw-bold" style={{ color: "#071A2F" }}>
              Why Build Your Career With Us?
            </h2>
          </div>

          <div className="row g-4">
            {PERKS.map((perk, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div
                  className="p-4 bg-white rounded-4 h-100 shadow-sm border border-light"
                  style={{ transition: "transform 0.25s ease" }}
                >
                  <div
                    className="d-inline-flex p-3 rounded-3 mb-3"
                    style={{ backgroundColor: "rgba(0, 82, 255, 0.08)", color: "#0066FF", fontSize: "22px" }}
                  >
                    {perk.icon}
                  </div>
                  <h5 className="fw-bold mb-2">{perk.title}</h5>
                  <p className="text-secondary small mb-0" style={{ lineHeight: "1.6" }}>
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OPEN POSITIONS ================= */}
      <section className="py-5" style={{ backgroundColor: "#F1F5F9" }}>
        <div className="container py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: "#071A2F" }}>
                Open Positions
              </h2>
              <p className="text-secondary mb-0">
                Found {filteredJobs.length} open position{filteredJobs.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Department Filter Pills */}
            <div className="d-flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`btn btn-sm px-3 py-2 rounded-pill fw-semibold border-0 ${
                    selectedDept === dept ? "bg-primary text-white shadow-sm" : "bg-white text-secondary"
                  }`}
                  style={{ fontSize: "13px" }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          <div className="row g-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="col-12">
                  <div className="bg-white p-4 rounded-4 shadow-sm border border-light d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div style={{ maxWidth: "700px" }}>
                      <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                        <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-semibold">
                          {job.department}
                        </span>
                        <span className="text-muted small d-inline-flex align-items-center gap-1">
                          <FaMapMarkerAlt /> {job.location}
                        </span>
                        <span className="text-muted small d-inline-flex align-items-center gap-1">
                          <FaClock /> {job.type}
                        </span>
                      </div>

                      <h4 className="fw-bold mb-2 text-dark">{job.title}</h4>
                      <p className="text-secondary small mb-0">{job.description}</p>
                    </div>

                    <button
                      onClick={() => setActiveJob(job)}
                      className="btn btn-primary px-4 py-2.5 rounded-3 fw-semibold d-inline-flex align-items-center gap-2 text-nowrap"
                      style={{ backgroundColor: "#0066FF", borderColor: "#0066FF" }}
                    >
                      <span>Apply Now</span>
                      <FaArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5 bg-white rounded-4 shadow-sm">
                <FaBriefcase size={36} className="text-muted mb-3" />
                <h5 className="fw-bold">No positions found</h5>
                <p className="text-secondary small">Try changing your search terms or department filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= APPLICATION MODAL ================= */}
      {activeJob && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: "rgba(7, 26, 47, 0.65)", zIndex: 1050, backdropFilter: "blur(6px)" }}
        >
          <div
            className="bg-white rounded-4 shadow-lg p-4 p-md-5 w-100 position-relative animate__animated animate__fadeIn"
            style={{ maxWidth: "560px", maxHeight: "90vh", overflowY: "auto" }}
          >
            <button
              onClick={() => setActiveJob(null)}
              className="btn position-absolute top-0 end-0 m-3 text-secondary p-1 border-0"
            >
              <FaTimes size={18} />
            </button>

            {isSubmitted ? (
              <div className="text-center py-4">
                <FaCheckCircle size={55} className="text-success mb-3" />
                <h4 className="fw-bold">Application Received!</h4>
                <p className="text-secondary">
                  Thank you for applying for the <strong>{activeJob.title}</strong> role. Our recruitment team will review your credentials and get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <span className="badge bg-primary-subtle text-primary mb-2">{activeJob.department}</span>
                  <h4 className="fw-bold text-dark mb-1">Apply for Position</h4>
                  <p className="text-muted small mb-0">{activeJob.title} &bull; {activeJob.location}</p>
                </div>

                <form onSubmit={handleApplySubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Full Name *</label>
                    <input type="text" required placeholder="John Doe" className="form-control rounded-3" />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Email *</label>
                      <input type="email" required placeholder="john@example.com" className="form-control rounded-3" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Phone Number *</label>
                      <input type="tel" required placeholder="+1 (555) 000-0000" className="form-control rounded-3" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">LinkedIn / Portfolio URL</label>
                    <input type="url" placeholder="https://linkedin.com/in/..." className="form-control rounded-3" />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-semibold">Upload Resume / CV (PDF) *</label>
                    <input type="file" required accept=".pdf,.doc,.docx" className="form-control rounded-3" />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2.5 rounded-3 fw-semibold d-inline-flex justify-content-center align-items-center gap-2"
                    style={{ backgroundColor: "#0066FF", borderColor: "#0066FF" }}
                  >
                    <FaPaperPlane size={14} />
                    <span>Submit Application</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}