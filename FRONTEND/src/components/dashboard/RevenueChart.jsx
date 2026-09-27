function RevenueChart() {
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];

  const revenue = [55, 60, 68, 65, 75, 82];
  const units = [50, 58, 65, 62, 72, 80];

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #DDD9D0",
        borderRadius: "10px",
        padding: "22px",
        height: "100%",
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          paddingBottom: "18px",
          borderBottom: "1px dashed #DDD9D0",
        }}
      >
        <h5 className="fw-bold mb-0">
          Revenue & Units Shipped
        </h5>

        <small style={{ color: "#718096" }}>
          Last 6 months
        </small>
      </div>

      <div
        className="d-flex align-items-end justify-content-around"
        style={{
          height: "260px",
          borderBottom: "1px solid #E5E7EB",
          paddingTop: "20px",
        }}
      >
        {months.map((month, index) => (
          <div
            key={month}
            className="d-flex flex-column align-items-center"
            style={{ height: "100%" }}
          >
            <div
              className="d-flex align-items-end gap-1"
              style={{
                height: "220px",
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: `${revenue[index]}%`,
                  background: "#2855A4",
                  borderRadius: "4px 4px 0 0",
                }}
              />

              <div
                style={{
                  width: "18px",
                  height: `${units[index]}%`,
                  background: "#B47A1D",
                  borderRadius: "4px 4px 0 0",
                }}
              />
            </div>

            <small
              style={{
                marginTop: "8px",
                color: "#718096",
              }}
            >
              {month}
            </small>
          </div>
        ))}
      </div>

      <div
        className="d-flex gap-4 mt-3"
        style={{
          fontSize: "13px",
          color: "#718096",
        }}
      >
        <span>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              background: "#2855A4",
              marginRight: "7px",
            }}
          />

          Revenue (₹L)
        </span>

        <span>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              background: "#B47A1D",
              marginRight: "7px",
            }}
          />

          Units Shipped
        </span>
      </div>
    </div>
  );
}

export default RevenueChart;