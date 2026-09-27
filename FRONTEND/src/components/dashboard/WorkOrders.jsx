import { workOrders } from "../../data/dashboardData";

function WorkOrders() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #DDD9D0",
        borderRadius: "10px",
        padding: "22px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">

        <h5 className="fw-bold mb-0">
          Recent Work Orders
        </h5>

        <button
          style={{
            border: "none",
            background: "transparent",
            color: "#2855A4",
            fontWeight: "600",
          }}
        >
          View All
        </button>

      </div>

      <div className="table-responsive">

        <table className="table align-middle">

          <thead>
            <tr style={{ color: "#718096" }}>
              <th>Work Order</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Deadline</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {workOrders.map((order) => (
              <tr key={order.id}>

                <td
                  style={{
                    color: "#2855A4",
                    fontWeight: "700",
                  }}
                >
                  {order.id}
                </td>

                <td>{order.product}</td>

                <td>{order.quantity}</td>

                <td>{order.deadline}</td>

                <td>

                  <div className="d-flex align-items-center gap-2">

                    <div
                      className="progress"
                      style={{
                        width: "70px",
                        height: "7px",
                      }}
                    >
                      <div
                        className="progress-bar"
                        style={{
                          width: `${order.progress}%`,
                          background: "#2855A4",
                        }}
                      />
                    </div>

                    <small>
                      {order.progress}%
                    </small>

                  </div>

                </td>

                <td>

                  <span
                    style={{
                      background: "#EDF1F7",
                      color: "#506174",
                      padding: "6px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                    }}
                  >
                    {order.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default WorkOrders;