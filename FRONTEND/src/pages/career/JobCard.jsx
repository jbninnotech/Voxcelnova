import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div
      className="h-100"
      style={{
        background: "#ffffff",
        borderRadius: "22px",
        border: "1px solid #e9edf5",
        padding: "28px",
        boxShadow:
          "0 12px 35px rgba(15,23,42,0.07)",
        transition: "0.3s",
      }}
    >
      {job.featured && (
        <span
          className="badge mb-3"
          style={{
            background:
              "linear-gradient(135deg,#f97316,#ea580c)",
            padding: "8px 13px",
            borderRadius: "50px",
          }}
        >
          Featured
        </span>
      )}

      <div
        className="mb-3"
        style={{
          width: "54px",
          height: "54px",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg,#111827,#2563eb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "22px",
        }}
      >
        💼
      </div>

      <h4
        style={{
          fontWeight: "700",
          color: "#111827",
          marginBottom: "8px",
        }}
      >
        {job.title}
      </h4>

      <div
        className="mb-3"
        style={{
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        {job.department}
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <span
          className="badge"
          style={{
            background: "#eff6ff",
            color: "#2563eb",
            padding: "8px 10px",
          }}
        >
          📍 {job.location}
        </span>

        <span
          className="badge"
          style={{
            background: "#f0fdf4",
            color: "#15803d",
            padding: "8px 10px",
          }}
        >
          {job.jobType}
        </span>
      </div>

      <p
        style={{
          color: "#64748b",
          fontSize: "14px",
          lineHeight: "1.7",
        }}
      >
        {job.description?.length > 130
          ? `${job.description.substring(
              0,
              130
            )}...`
          : job.description}
      </p>

      <div
        className="d-flex justify-content-between align-items-center mt-4"
      >
        <div>
          <small
            style={{
              color: "#94a3b8",
            }}
          >
            Experience
          </small>

          <div
            style={{
              fontWeight: "600",
              color: "#334155",
            }}
          >
            {job.experience}
          </div>
        </div>

        <Link
          to={`/careers/${job._id}`}
          className="btn"
          style={{
            background: "#111827",
            color: "#fff",
            borderRadius: "12px",
            padding: "10px 18px",
            fontWeight: "600",
          }}
        >
          View Job →
        </Link>
      </div>
    </div>
  );
};

export default JobCard;