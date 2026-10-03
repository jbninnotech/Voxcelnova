import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiEye, FiClock, FiCheckCircle, FiTruck, FiXCircle, FiTrash2, FiAlertCircle } from "react-icons/fi";
import { getUserOrders, cancelUserOrder, softDeleteUserOrder } from "../../services/orderService";

export default function ProfileOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  // Modal State for Soft Delete Confirmation
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      setActionLoading(true);
      setError("");
      await cancelUserOrder(orderId);
      setActionSuccess(`Order cancelled successfully.`);
      fetchOrders();
      setTimeout(() => setActionSuccess(""), 3500);
    } catch (err) {
      setError(err.message || "Failed to cancel order.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmSoftDelete = async () => {
    if (!deleteTargetId) return;

    try {
      setActionLoading(true);
      setError("");
      await softDeleteUserOrder(deleteTargetId);
      setActionSuccess("Order removed from history.");
      setDeleteTargetId(null);
      fetchOrders();
      setTimeout(() => setActionSuccess(""), 3500);
    } catch (err) {
      setError(err.message || "Failed to remove order.");
    } finally {
      setActionLoading(false);
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

  return (
    <div>
      {/* HEADER */}
      <div className="pb-3 mb-4 border-bottom d-flex align-items-center justify-content-between">
        <div>
          <h3 className="fw-bold mb-1" style={{ color: "var(--text-title, #071838)" }}>
            My Orders
          </h3>
          <p className="text-secondary small mb-0">
            View and track your previous clothing orders ({orders.length}).
          </p>
        </div>
      </div>

      {actionSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-3 rounded-3" role="alert">
          <FiCheckCircle size={18} /> <span>{actionSuccess}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 mb-3 rounded-3" role="alert">
          <FiAlertCircle size={18} /> <span>{error}</span>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center text-primary"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "var(--bg-badge-tint, #E8F5FE)",
            }}
          >
            <FiPackage size={28} />
          </div>
          <h4 className="fw-bold" style={{ color: "var(--text-title, #071838)" }}>No Orders Yet</h4>
          <p className="text-secondary small mb-4">
            When you place orders, they will appear here with full tracking history.
          </p>
          <button
            className="btn text-white px-4 py-2 fw-semibold"
            style={{ backgroundColor: "var(--color-cobalt, #0052FF)", borderRadius: "10px" }}
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {orders.map((order) => {
            const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            const normStatus = String(order.orderStatus || "").toLowerCase();
            const canCancel = normStatus.includes("pending") || normStatus.includes("confirm");

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

                {/* CARD FOOTER WITH ACTIONS */}
                <div className="card-footer bg-white p-3 d-flex flex-wrap align-items-center justify-content-between gap-3 border-top">
                  <div>
                    <span className="text-secondary small me-2">Total Amount:</span>
                    <strong style={{ fontSize: "18px", color: "var(--text-title, #071838)" }}>
                      ₹{formatPrice(order.totalAmount)}
                    </strong>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    {/* Track Order Button */}
                    <button
                      type="button"
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="btn btn-outline-primary d-inline-flex align-items-center gap-2 px-3 py-2"
                      style={{ borderRadius: "10px", fontSize: "13px", fontWeight: "600" }}
                    >
                      <FiTruck size={15} />
                      <span>Track Order</span>
                    </button>

                    {/* Cancel Order (if allowed) */}
                    {canCancel && (
                      <button
                        type="button"
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={actionLoading}
                        className="btn btn-outline-danger d-inline-flex align-items-center gap-2 px-3 py-2"
                        style={{ borderRadius: "10px", fontSize: "13px", fontWeight: "600" }}
                      >
                        <FiXCircle size={15} />
                        <span>Cancel Order</span>
                      </button>
                    )}

                    {/* Safe Remove / Delete from user history */}
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(order._id)}
                      className="btn btn-light text-muted border d-inline-flex align-items-center gap-1 px-2 py-2"
                      title="Remove from order history"
                      style={{ borderRadius: "10px", fontSize: "13px" }}
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CONFIRMATION MODAL FOR SOFT DELETE ORDER */}
      {deleteTargetId && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark">Remove Order from History</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteTargetId(null)} />
              </div>
              <div className="modal-body p-4">
                <p className="text-secondary mb-0" style={{ fontSize: "14.5px", lineHeight: "1.6" }}>
                  Are you sure you want to remove this order from your order history?
                </p>
                <small className="text-muted d-block mt-2">
                  (Note: This removes the order from your personal list while preserving administrative records for tax and warranty verification).
                </small>
              </div>
              <div className="modal-footer bg-light">
                <button
                  type="button"
                  className="btn btn-secondary fw-semibold px-3 py-2"
                  onClick={() => setDeleteTargetId(null)}
                  disabled={actionLoading}
                  style={{ borderRadius: "8px", fontSize: "13px" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger fw-semibold px-3 py-2"
                  onClick={handleConfirmSoftDelete}
                  disabled={actionLoading}
                  style={{ borderRadius: "8px", fontSize: "13px" }}
                >
                  {actionLoading ? "Removing..." : "Confirm Remove"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}