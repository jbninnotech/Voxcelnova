import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getJob,
  applyForJob,
} from "../../services/careerApi";

const ApplyJob = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [job, setJob] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      alternatePhone: "",
      location: "",
      experience: "Fresher",
      currentCompany: "",
      currentRole: "",
      expectedSalary: "",
      noticePeriod: "",
      education: "",
      skills: "",
      coverLetter: "",
      resume: null,
    });

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await getJob(id);

        setJob(
          data.job ||
            data.data
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        files?.length
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      if (!form.resume) {
        throw new Error(
          "Please upload your resume."
        );
      }

      const formData =
        new FormData();

      formData.append(
        "jobId",
        id
      );

      Object.entries(form).forEach(
        ([key, value]) => {
          if (
            value !== null &&
            value !== ""
          ) {
            formData.append(
              key,
              value
            );
          }
        }
      );

      const data =
        await applyForJob(
          formData
        );

      setMessage(
        data.message ||
          "Application submitted successfully."
      );

      setTimeout(() => {
        navigate(
          `/careers/${id}`
        );
      }, 2500);

    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" />
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding:
          "70px 15px 100px",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "900px",
        }}
      >
        <Link
          to={`/careers/${id}`}
          style={{
            textDecoration:
              "none",
            color: "#2563eb",
          }}
        >
          ← Back to Job
        </Link>

        <div
          className="mt-4"
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding:
              "35px",
            boxShadow:
              "0 12px 40px rgba(15,23,42,.07)",
          }}
        >
          <div className="mb-4">
            <span
              className="badge"
              style={{
                background:
                  "#eff6ff",
                color:
                  "#2563eb",
                padding:
                  "8px 12px",
              }}
            >
              {job?.department}
            </span>

            <h1
              className="mt-3"
              style={{
                fontWeight:
                  "800",
              }}
            >
              Apply for{" "}
              {job?.title}
            </h1>

            <p
              style={{
                color: "#64748b",
              }}
            >
              Complete the form below
              to submit your application.
            </p>
          </div>

          {message && (
            <div className="alert alert-success">
              {message}
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form
            onSubmit={
              handleSubmit
            }
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  First Name *
                </label>

                <input
                  name="firstName"
                  value={
                    form.firstName
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Last Name *
                </label>

                <input
                  name="lastName"
                  value={
                    form.lastName
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Phone *
                </label>

                <input
                  name="phone"
                  value={
                    form.phone
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Location *
                </label>

                <input
                  name="location"
                  value={
                    form.location
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Experience
                </label>

                <input
                  name="experience"
                  value={
                    form.experience
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Current Company
                </label>

                <input
                  name="currentCompany"
                  value={
                    form.currentCompany
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Current Role
                </label>

                <input
                  name="currentRole"
                  value={
                    form.currentRole
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Expected Salary
                </label>

                <input
                  name="expectedSalary"
                  value={
                    form.expectedSalary
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Notice Period
                </label>

                <input
                  name="noticePeriod"
                  value={
                    form.noticePeriod
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Education *
                </label>

                <input
                  name="education"
                  value={
                    form.education
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Skills
                </label>

                <input
                  name="skills"
                  value={
                    form.skills
                  }
                  onChange={
                    handleChange
                  }
                  className="form-control"
                  placeholder="React, Node.js, Manufacturing..."
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Cover Letter
                </label>

                <textarea
                  name="coverLetter"
                  value={
                    form.coverLetter
                  }
                  onChange={
                    handleChange
                  }
                  rows="5"
                  className="form-control"
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Resume *
                </label>

                <input
                  type="file"
                  name="resume"
                  onChange={
                    handleChange
                  }
                  className="form-control"
                  accept=".pdf,.doc,.docx"
                  required
                />

                <small
                  className="text-muted"
                >
                  PDF, DOC or DOCX
                  · Maximum 5MB
                </small>
              </div>

              <div className="col-12 mt-4">
                <button
                  type="submit"
                  disabled={
                    submitting
                  }
                  className="btn w-100"
                  style={{
                    background:
                      "#111827",
                    color: "#fff",
                    padding:
                      "14px",
                    borderRadius:
                      "12px",
                    fontWeight:
                      "700",
                  }}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Application →"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;