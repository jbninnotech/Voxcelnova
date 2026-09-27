function StatCard({
  title,
  value,
  subtitle,
  color,
}) {
  return (
    <div className="col-12 col-sm-6 col-xl-3">

      <div
        style={{
          background: "#fff",
          border: "1px solid #DDD9D0",
          borderTop: `3px solid ${color}`,
          borderRadius: "10px",
          padding: "22px",
          minHeight: "145px",
          height: "100%",
        }}
      >
        <p
          style={{
            color: "#667085",
            fontSize: "14px",
            marginBottom: "12px",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#263548",
          }}
        >
          {value}
        </h2>

        <div
          style={{
            color,
            fontSize: "13px",
            fontWeight: "600",
            marginTop: "10px",
          }}
        >
          ↑ {subtitle}
        </div>
      </div>

    </div>
  );
}

export default StatCard;