import React from "react";

const SizeGuide = ({ onClose }) => {
  const sizes = [
    ["S", "36", "28", "38"],
    ["M", "38", "30", "40"],
    ["L", "40", "32", "42"],
    ["XL", "42", "34", "44"],
    ["XXL", "44", "36", "46"],
  ];

  return (
    <div
      className="modal d-block"
      style={{
        background: "rgba(0,0,0,0.55)",
        zIndex: 9999,
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 overflow-hidden">
          <div className="modal-header">
            <h5
              className="modal-title"
              style={{
                color: "#071A36",
                fontWeight: 800,
              }}
            >
              Size Guide
            </h5>

            <button
              type="button"
              onClick={onClose}
              className="btn-close"
            />
          </div>

          <div className="modal-body">
            <p
              style={{
                fontSize: "13px",
                color: "#64748B",
              }}
            >
              Measurements are approximate and may vary slightly depending
              on the product style.
            </p>

            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest</th>
                    <th>Waist</th>
                    <th>Length</th>
                  </tr>
                </thead>

                <tbody>
                  {sizes.map((row) => (
                    <tr key={row[0]}>
                      {row.map((value, index) => (
                        <td key={index}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="rounded-3 p-3 mt-3"
              style={{
                background: "#F8FAFC",
                fontSize: "12px",
                color: "#64748B",
              }}
            >
              Please check your measurements before placing your order.
              For bulk orders, custom sizing can be discussed with our
              manufacturing team.
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn px-4"
              style={{
                background: "#071A36",
                color: "#fff",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;