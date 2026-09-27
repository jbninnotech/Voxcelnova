import { productionLines } from "../../data/dashboardData";

function ProductionLines() {
  return (
    <div
      className="mt-4"
      style={{
        background: "#fff",
        border: "1px solid #DDD9D0",
        borderRadius: "10px",
        padding: "22px",
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{
          paddingBottom: "18px",
          borderBottom: "1px dashed #DDD9D0",
        }}
      >
        <h5 className="fw-bold mb-0">
          Production Lines
        </h5>

        <small style={{ color: "#718096" }}>
          6 Running · 1 Idle
        </small>
      </div>

      {productionLines.map((item) => (
        <div
          key={item.line}
          className="row align-items-center g-3 py-3"
          style={{
            borderBottom: "1px solid #EEEAE3",
          }}
        >
          <div className="col-12 col-md-5">

            <div
              style={{
                fontWeight: "600",
                marginBottom: "7px",
              }}
            >
              {item.line} — {item.product}
            </div>

            <span
              style={{
                background: "#EDF1F7",
                color: "#607087",
                padding: "5px 10px",
                borderRadius: "20px",
                fontSize: "11px",
              }}
            >
              {item.stage}
            </span>

          </div>

          <div className="col-9 col-md-5">

            <div className="d-flex align-items-center gap-2">

              <div
                className="progress flex-grow-1"
                style={{ height: "8px" }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${item.progress}%`,
                    background: "#2855A4",
                  }}
                />
              </div>

              <small>
                {item.progress}%
              </small>

            </div>

          </div>

          <div className="col-3 col-md-2 text-md-end">

            <span
              style={{
                padding: "7px 12px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: "600",
                background:
                  item.status === "Running"
                    ? "#E2F3ED"
                    : item.status === "Slow"
                    ? "#FFF3DB"
                    : "#E8EDF9",

                color:
                  item.status === "Running"
                    ? "#247157"
                    : item.status === "Slow"
                    ? "#A76C16"
                    : "#2855A4",
              }}
            >
              {item.status}
            </span>

          </div>

        </div>
      ))}
    </div>
  );
}

export default ProductionLines;