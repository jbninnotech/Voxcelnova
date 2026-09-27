import { fabricStock } from "../../data/dashboardData";

function FabricStock() {
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
        className="d-flex justify-content-between align-items-center mb-4"
        style={{
          paddingBottom: "18px",
          borderBottom: "1px dashed #DDD9D0",
        }}
      >
        <h5 className="fw-bold mb-0">
          Fabric Stock on Hand
        </h5>

        <small style={{ color: "#718096" }}>
          4 materials
        </small>
      </div>

      {fabricStock.map((fabric) => (
        <div
          key={fabric.name}
          className="mb-4"
        >
          <div className="d-flex justify-content-between mb-2">

            <div className="d-flex align-items-center gap-2">

              <span
                style={{
                  width: "11px",
                  height: "11px",
                  borderRadius: "2px",
                  background: fabric.color,
                }}
              />

              <span
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {fabric.name}
              </span>

            </div>

            <span
              style={{
                fontSize: "13px",
                color: "#718096",
              }}
            >
              {fabric.percentage}%
            </span>

          </div>

          <div
            className="progress"
            style={{
              height: "8px",
              background: "#E9E7E1",
            }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${fabric.percentage}%`,
                background: fabric.color,
                borderRadius: "10px",
              }}
            />
          </div>

        </div>
      ))}
    </div>
  );
}

export default FabricStock;