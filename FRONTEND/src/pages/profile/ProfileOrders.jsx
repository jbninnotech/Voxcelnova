import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiEye, FiClock, FiCheckCircle, FiTruck, FiXCircle } from "react-icons/fi";
import { getUserOrders } from "../../services/orderService";

export default function ProfileOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getUserOrders();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || "Failed to load order history.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (val) => Number(val || 0).toLocaleString("en-IN");

  const getStatusBadge = (status) => {
    const s = String(status || "Pending").toLowerCase();
    let bg = "#FFFBEB", color = "#B45309", border = "#FDE68A", label = status;

    if (s.includes("deliv")) {
      bg = "#ECFDF5"; color = "#047857"; border = "#A7F3D0"; label = "Delivered";
    } else if (s.includes("ship") || s.includes("out")) {
      bg = "#EFF6FF"; color = "#1D4ED8"; border = "#BFDBFE"; label = s.includes("out") ? "Out for Delivery" : "Shipped";
    } else if (s.includes("confirm") || s.includes("process")) {
      bg = "#F0FDF4"; color = "#15803D"; border = "#BBF7D0"; label = s.includes("confirm") ? "Confirmed" : "Processing";
    } else if (s.includes("cancel")) {
      bg = "#FEF2F2"; color = "#B91C1C"; border = "#FECACA"; label = "Cancelled";
    }

    return (
      <span
        style={{
          padding: "4px 12px",
          borderRadius: "99px",
          backgroundColor: bg,
          color,
          border: `1px solid ${border}`,
          fontSize: "12px",
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
        {label}
      </span>
    );
  };

  const getPaymentBadge = (paymentStatus) => {
    const isPaid = paymentStatus === "Paid";
    return (
      <span
        style={{
          padding: "3px 9px",
          borderRadius: "6px",
          backgroundColor: isPaid ? "#ECFDF5" : "#FFFBEB",
          color: isPaid ? "#047857" : "#B45309",
          fontSize: "11px",
          fontWeight: 700,
        }}
      >
        {paymentStatus || "Pending"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="text-secondary mt-2 small">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger py-3 px-4" role="alert">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-5">
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center text-primary"
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#EFF6FF",
          }}
        >
          <FiPackage size={28} />
        </div>
        <h4 className="fw-bold" style={{ color: "#071A2F" }}>No Orders Yet</h4>
        <p className="text-secondary small mb-4">
          When you place orders, they will appear here with full tracking history.
        </p>
        <button
          className="btn btn-dark px-4 py-2 fw-semibold"
          onClick={() => navigate("/products")}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="pb-3 mb-4 border-bottom d-flex align-items-center justify-content-between">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "#071A2F" }}>
            My Orders
          </h3>
          <p className="text-secondary small mb-0">
            View and track your previous clothing orders ({orders.length}).
          </p>
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="d-flex flex-column gap-4">
        {orders.map((order) => {
          const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <div
              key={order._id}
              className="card border shadow-sm rounded-4 overflow-hidden"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              {/* ORDER CARD HEADER */}
              <div
                className="card-header bg-light p-3 d-flex flex-wrap align-items-center justify-content-between gap-2"
                style={{ borderBottom: "1px solid #E2E8F0" }}
              >
                <div>
                  <div className="fw-bold" style={{ color: "#071A2F", fontSize: "14px" }}>
                    Order #{order._id.substring(order._id.length - 8).toUpperCase()}
                  </div>
                  <small className="text-muted" style={{ fontSize: "12px" }}>
                    Placed on {formattedDate}
                  </small>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="text-end">
                    <div className="small text-muted">Payment: {getPaymentBadge(order.paymentStatus)}</div>
                  </div>
                  <div>{getStatusBadge(order.orderStatus)}</div>
                </div>
              </div>

              {/* ORDER ITEMS */}
              <div className="card-body p-3">
                <div className="d-flex flex-column gap-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="d-flex align-items-center justify-content-between gap-3 pb-2"
                      style={{
                        borderBottom: idx !== order.items.length - 1 ? "1px solid #F1F5F9" : "none",
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={item.image || "https://placehold.co/100x120?text=Apparel"}
                          alt={item.productName}
                          style={{
                            width: "60px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            background: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                          }}
                        />
                        <div>
                          <div className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                            {item.productName}
                          </div>
                          <div className="text-muted small">
                            {item.size && <span className="me-2">Size: <strong>{item.size}</strong></span>}
                            <span>Qty: <strong>{item.quantity}</strong></span>
                            <span className="ms-2 text-dark font-monospace">@ ₹{formatPrice(item.price)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="fw-bold text-dark font-monospace" style={{ fontSize: "15px" }}>
                        ₹{formatPrice(item.subtotal || item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD FOOTER */}
              <div
                className="card-footer bg-white p-3 d-flex align-items-center justify-content-between border-top"
              >
                <div>
                  <span className="text-secondary small me-2">Total Amount:</span>
                  <strong style={{ fontSize: "18px", color: "#071A2F" }}>
                    ₹{formatPrice(order.totalAmount)}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="btn btn-dark d-inline-flex align-items-center gap-2 px-3 py-2"
                  style={{ borderRadius: "10px", fontSize: "13px" }}
                >
                  <FiEye size={15} />
                  <span>View Order</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}