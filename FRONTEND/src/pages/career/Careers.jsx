import React, {
  useEffect,
  useState,
} from "react";

import JobCard from "../career/JobCard";

import { getJobs } from "../../services/careerApi";

const Careers = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [jobType, setJobType] =
    useState("");

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getJobs({
        search,
        department,
        jobType,
      });

      setJobs(
        data.jobs ||
          data.data ||
          []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#f8fafc,#ffffff)",
      }}
    >
      {/* HERO */}

      <section
        style={{
          background:
            "linear-gradient(135deg,#0f172a,#172554,#1e3a8a)",
          padding:
            "100px 20px 90px",
          color: "#fff",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "1100px",
          }}
        >
          <div
            className="text-center"
          >
            <div
              style={{
                display:
                  "inline-block",
                padding:
                  "8px 16px",
                borderRadius:
                  "50px",
                background:
                  "rgba(255,255,255,0.1)",
                border:
                  "1px solid rgba(255,255,255,0.15)",
                marginBottom:
                  "20px",
                fontSize: "14px",
              }}
            >
              VOXCEL NOVA CAREERS
            </div>

            <h1
              style={{
                fontSize:
                  "clamp(42px,6vw,72px)",
                fontWeight: "800",
                lineHeight: "1.05",
                marginBottom:
                  "20px",
              }}
            >
              Build the future
              <br />
              <span
                style={{
                  color: "#60a5fa",
                }}
              >
                with Voxcel Nova.
              </span>
            </h1>

            <p
              style={{
                maxWidth: "700px",
                margin:
                  "0 auto",
                color:
                  "#cbd5e1",
                fontSize: "18px",
                lineHeight:
                  "1.7",
              }}
            >
              Join our manufacturing
              and technology team and
              help us build innovative
              clothing solutions for
              businesses and communities.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER */}

      <div
        className="container"
        style={{
          marginTop: "-35px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="row g-3"
          style={{
            background: "#fff",
            padding: "22px",
            borderRadius: "20px",
            boxShadow:
              "0 15px 45px rgba(15,23,42,0.12)",
          }}
        >
          <div className="col-lg-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={{
                padding: "13px 16px",
                borderRadius: "12px",
              }}
            />
          </div>

          <div className="col-lg-3">
            <select
              className="form-select"
              value={department}
              onChange={(e) =>
                setDepartment(
                  e.target.value
                )
              }
              style={{
                padding: "13px",
                borderRadius: "12px",
              }}
            >
              <option value="">
                All Departments
              </option>

              <option value="Production">
                Production
              </option>

              <option value="Sales">
                Sales
              </option>

              <option value="Marketing">
                Marketing
              </option>

              <option value="Technology">
                Technology
              </option>

              <option value="HR">
                Human Resources
              </option>

              <option value="Operations">
                Operations
              </option>
            </select>
          </div>

          <div className="col-lg-2">
            <select
              className="form-select"
              value={jobType}
              onChange={(e) =>
                setJobType(
                  e.target.value
                )
              }
              style={{
                padding: "13px",
                borderRadius: "12px",
              }}
            >
              <option value="">
                All Types
              </option>

              <option value="Full Time">
                Full Time
              </option>

              <option value="Part Time">
                Part Time
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Contract">
                Contract
              </option>
            </select>
          </div>

          <div className="col-lg-2">
            <button
              onClick={loadJobs}
              className="btn w-100"
              style={{
                height: "50px",
                background:
                  "#111827",
                color: "#fff",
                borderRadius:
                  "12px",
                fontWeight:
                  "600",
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* JOBS */}

      <section
        className="container"
        style={{
          padding:
            "70px 15px 100px",
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <div>
            <h2
              style={{
                fontWeight: "800",
                color: "#111827",
              }}
            >
              Open Positions
            </h2>

            <p
              style={{
                color: "#64748b",
              }}
            >
              Find your next opportunity.
            </p>
          </div>

          <span
            style={{
              color: "#64748b",
            }}
          >
            {jobs.length} positions
          </span>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              style={{
                color: "#2563eb",
              }}
            />
          </div>
        )}

        {error && (
          <div
            className="alert alert-danger"
          >
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          jobs.length === 0 && (
            <div
              className="text-center py-5"
              style={{
                background: "#fff",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "50px",
                }}
              >
                🔍
              </div>

              <h4>
                No jobs found
              </h4>

              <p
                style={{
                  color: "#64748b",
                }}
              >
                Try changing your
                search filters.
              </p>
            </div>
          )}

        <div className="row g-4">
          {jobs.map((job) => (
            <div
              className="col-md-6 col-lg-4"
              key={job._id}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Careers;