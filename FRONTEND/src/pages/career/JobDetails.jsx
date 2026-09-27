import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { getJob } from "../../services/careerApi";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadJob = async () => {
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

    loadJob();
  }, [id]);

  if (loading) {
    return (
      <div
        className="text-center"
        style={{
          padding: "120px",
        }}
      >
        <div className="spinner-border" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="container"
        style={{
          padding: "100px 15px",
        }}
      >
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div
        className="container text-center"
        style={{
          padding: "100px 15px",
        }}
      >
        Job not found.
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        paddingBottom: "100px",
      }}
    >
      {/* HEADER */}

      <section
        style={{
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a)",
          padding:
            "80px 20px",
          color: "#fff",
        }}
      >
        <div className="container">
          <Link
            to="/careers"
            style={{
              color: "#bfdbfe",
              textDecoration:
                "none",
            }}
          >
            ← Back to Careers
          </Link>

          <div
            style={{
              marginTop: "35px",
            }}
          >
            <span
              className="badge mb-3"
              style={{
                background:
                  "#2563eb",
                padding: "9px 14px",
              }}
            >
              {job.department}
            </span>

            <h1
              style={{
                fontWeight: "800",
                fontSize:
                  "clamp(38px,5vw,64px)",
              }}
            >
              {job.title}
            </h1>

            <div
              className="d-flex flex-wrap gap-3"
              style={{
                color: "#cbd5e1",
              }}
            >
              <span>
                📍 {job.location}
              </span>

              <span>
                💼 {job.jobType}
              </span>

              <span>
                🎓 {job.experience}
              </span>

              <span>
                💰 {job.salary}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div
        className="container"
        style={{
          marginTop: "-30px",
          position: "relative",
        }}
      >
        <div className="row g-4">
          {/* MAIN */}

          <div className="col-lg-8">
            <div
              style={{
                background: "#fff",
                padding: "35px",
                borderRadius: "20px",
                boxShadow:
                  "0 10px 35px rgba(15,23,42,.06)",
              }}
            >
              <h3
                style={{
                  fontWeight: "750",
                }}
              >
                About the Role
              </h3>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.8",
                }}
              >
                {job.description}
              </p>

              <hr />

              <h4 className="mt-4">
                Responsibilities
              </h4>

              <ul
                style={{
                  color: "#475569",
                  lineHeight: "2",
                }}
              >
                {(
                  job.responsibilities ||
                  []
                ).map(
                  (
                    item,
                    index
                  ) => (
                    <li
                      key={index}
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>

              <h4 className="mt-5">
                Requirements
              </h4>

              <ul
                style={{
                  color: "#475569",
                  lineHeight: "2",
                }}
              >
                {(
                  job.requirements ||
                  []
                ).map(
                  (
                    item,
                    index
                  ) => (
                    <li
                      key={index}
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>

              <h4 className="mt-5">
                Skills
              </h4>

              <div className="d-flex flex-wrap gap-2">
                {(
                  job.skills || []
                ).map(
                  (
                    skill,
                    index
                  ) => (
                    <span
                      key={index}
                      style={{
                        padding:
                          "8px 14px",
                        borderRadius:
                          "50px",
                        background:
                          "#eff6ff",
                        color:
                          "#2563eb",
                        fontSize:
                          "14px",
                      }}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* APPLY */}

          <div className="col-lg-4">
            <div
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "20px",
                boxShadow:
                  "0 10px 35px rgba(15,23,42,.08)",
                position:
                  "sticky",
                top: "25px",
              }}
            >
              <h4
                style={{
                  fontWeight: "750",
                }}
              >
                Ready to Apply?
              </h4>

              <p
                style={{
                  color: "#64748b",
                }}
              >
                Take the next step in
                your career with Voxcel
                Nova.
              </p>

              <div
                className="mb-3"
                style={{
                  background:
                    "#f8fafc",
                  padding: "15px",
                  borderRadius:
                    "12px",
                }}
              >
                <small>
                  Openings
                </small>

                <strong
                  className="d-block"
                >
                  {job.openings}
                </strong>
              </div>

              <Link
                to={`/careers/${job._id}/apply`}
                className="btn w-100"
                style={{
                  background:
                    "#2563eb",
                  color: "#fff",
                  padding: "13px",
                  borderRadius:
                    "12px",
                  fontWeight:
                    "700",
                }}
              >
                Apply Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;