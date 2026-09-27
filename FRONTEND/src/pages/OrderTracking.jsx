import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiTruck,
  FiMapPin,
  FiShield,
  FiAlertCircle,
} from "react-icons/fi";
import { getOrderById } from "../services/orderService";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getOrderById(orderId);
      setOrder(data.order);
    } catch (err) {
      setError(err.message || "Unable to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: "Pending", label: "Order Placed", desc: "Your order has been received" },
    { key: "Confirmed", label: "Confirmed", desc: "Verified and accepted by factory" },
    { key: "Processing", label: "Processing", desc: "Tailoring, printing, and packing" },
    { key: "Shipped", label: "Shipped", desc: "Dispatched from manufacturing hub" },
    { key: "OutForDelivery", label: "Out for Delivery", desc: "On the way with delivery partner" },
    { key: "Delivered", label: "Delivered", desc: "Successfully delivered to recipient" },
  ];

  const getStepIndex = (status) => {
    const s = String(status || "").toLowerCase();
    if (s === "cancelled") return -1;
    if (s.includes("deliv")) return 5;
    if (s.includes("out")) return 4;
    if (s.includes("ship")) return 3;
    if (s.includes("process")) return 2;
    if (s.includes("confirm")) return 1;
    return 0;
  };

  const formatPrice = (val) => Number(val || 0).toLocaleString("en-IN");

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "70vh" }}>
        <div className="spinner-border text-primary" role="status" />
        <p className="text-secondary mt-3">Loading order tracking...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "70vh" }}>
        <div className="mx-auto mb-3 text-danger">
          <FiAlertCircle size={44} />
        </div>
        <h3 className="fw-bold text-dark">Order Not Found</h3>
        <p className="text-secondary mb-4">{error || "Could not load order tracking information."}</p>
        <Link to="/profile" className="btn btn-dark px-4 py-2">
          Back to My Orders
        </Link>
      </div>
    );
  }

  const currentStepIdx = getStepIndex(order.orderStatus);
  const isCancelled = String(order.orderStatus).toLowerCase() === "cancelled";
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* BACK LINK */}
        <Link
          to="/profile"
          className="text-decoration-none text-secondary fw-semibold d-inline-flex align-items-center gap-2 mb-4"
        >
          <FiArrowLeft /> Back to Orders
        </Link>

        {/* HEADER CARD */}
        <div className="bg-white border rounded-4 p-4 mb-4 shadow-sm">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 border-bottom pb-3">
            <div>
              <span className="badge bg-primary text-uppercase px-3 py-2 mb-2" style={{ letterSpacing: "1px" }}>
                VOXCEL NOVA ORDER TRACKING
              </span>
              <h2 className="fw-bold mb-1" style={{ color: "#071A2F" }}>
                Order #{order._id.substring(order._id.length - 8).toUpperCase()}
              </h2>
              <div className="text-secondary small">Placed on {formattedDate}</div>
            </div>

            <div className="text-end">
              <div className="small text-muted mb-1">
                Payment Status: <span className="fw-bold text-dark">{order.paymentStatus}</span> ({order.paymentMethod})
              </div>
              <div>
                <span
                  className={`badge px-3 py-2 fs-6 ${
                    isCancelled ? "bg-danger" : "bg-success"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>
          </div>

          {/* TIMELINE STEPPER */}
          <div className="pt-4 pb-2">
            <h5 className="fw-bold mb-4" style={{ color: "#071A2F" }}>
              Order Status Timeline
            </h5>

            {isCancelled ? (
              <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3">
                <FiAlertCircle size={20} />
                <span>This order was cancelled. Please contact customer support for details.</span>
              </div>
            ) : (
              <div className="position-relative px-2">
                {/* Horizontal Stepper */}
                <div className="d-none d-md-flex align-items-center justify-content-between position-relative">
                  {/* Progress Line */}
                  <div
                    className="position-absolute bg-light-subtle"
                    style={{
                      top: "20px",
                      left: "30px",
                      right: "30px",
                      height: "4px",
                      backgroundColor: "#E2E8F0",
                      zIndex: 1,
                    }}
                  />
                  <div
                    className="position-absolute bg-primary"
                    style={{
                      top: "20px",
                      left: "30px",
                      width: `${(currentStepIdx / (steps.length - 1)) * 90}%`,
                      height: "4px",
                      backgroundColor: "#2563EB",
                      zIndex: 2,
                      transition: "width 0.5s ease",
                    }}
                  />

                  {steps.map((step, idx) => {
                    const isPassed = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div
                        key={step.key}
                        className="text-center position-relative"
                        style={{ zIndex: 3, flex: 1 }}
                      >
                        <div
                          className={`mx-auto d-flex align-items-center justify-content-center rounded-circle fw-bold ${
                            isCurrent
                              ? "bg-primary text-white shadow"
                              : isPassed
                              ? "bg-success text-white"
                              : "bg-white text-secondary border"
                          }`}
                          style={{
                            width: "42px",
                            height: "42px",
                            border: isCurrent ? "4px solid #BFDBFE" : "2px solid #E2E8F0",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {isPassed ? <FiCheckCircle size={18} /> : idx + 1}
                        </div>
                        <div className="fw-bold mt-2 small" style={{ color: isCurrent ? "#2563EB" : "#071A2F" }}>
                          {step.label}
                        </div>
                        <div className="text-secondary" style={{ fontSize: "11px" }}>
                          {step.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Vertical Stepper for Mobile */}
                <div className="d-flex d-md-none flex-column gap-3">
                  {steps.map((step, idx) => {
                    const isPassed = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div key={step.key} className="d-flex align-items-center gap-3">
                        <div
                          className={`d-flex align-items-center justify-content-center rounded-circle fw-bold ${
                            isCurrent
                              ? "bg-primary text-white"
                              : isPassed
                              ? "bg-success text-white"
                              : "bg-white text-secondary border"
                          }`}
                          style={{ width: "36px", height: "36px" }}
                        >
                          {isPassed ? <FiCheckCircle size={16} /> : idx + 1}
                        </div>
                        <div>
                          <div className="fw-bold small">{step.label}</div>
                          <div className="text-muted" style={{ fontSize: "11px" }}>
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ORDER DETAILS & ADDRESS GRID */}
        <div className="row g-4">
          {/* ITEMS LIST */}
          <div className="col-12 col-md-7">
            <div className="bg-white border rounded-4 p-4 shadow-sm">
              <h5 className="fw-bold mb-3 border-bottom pb-3" style={{ color: "#071A2F" }}>
                Ordered Products
              </h5>

              <div className="d-flex flex-column gap-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-center justify-content-between gap-3 pb-3 border-bottom"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image || "https://placehold.co/100x120?text=Apparel"}
                        alt={item.productName}
                        style={{
                          width: "65px",
                          height: "75px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          background: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                        }}
                      />
                      <div>
                        <div className="fw-bold text-dark">{item.productName}</div>
                        <div className="small text-secondary">
                          {item.size && <span className="me-2">Size: <strong>{item.size}</strong></span>}
                          <span>Qty: <strong>{item.quantity}</strong></span>
                        </div>
                        <div className="small text-muted mt-1">@ ₹{formatPrice(item.price)} each</div>
                      </div>
                    </div>

                    <div className="fw-bold text-dark fs-5">
                      ₹{formatPrice(item.subtotal || item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SHIPPING & SUMMARY */}
          <div className="col-12 col-md-5">
            {/* SHIPPING ADDRESS */}
            <div className="bg-white border rounded-4 p-4 mb-4 shadow-sm">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#071A2F" }}>
                <FiMapPin color="#2563EB" /> Shipping Address
              </h5>

              <div className="fw-bold text-dark mb-1">{order.shippingAddress?.fullName}</div>
              <div className="small text-secondary mb-2">Phone: {order.shippingAddress?.phone}</div>
              <div className="small text-secondary">
                {order.shippingAddress?.houseFlat}, {order.shippingAddress?.street},{" "}
                {order.shippingAddress?.area}, {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
                <strong>{order.shippingAddress?.pincode}</strong>
              </div>
            </div>

            {/* PAYMENT SUMMARY */}
            <div className="bg-white border rounded-4 p-4 shadow-sm">
              <h5 className="fw-bold mb-3 border-bottom pb-3" style={{ color: "#071A2F" }}>
                Payment Summary
              </h5>

              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Subtotal</span>
                <strong className="text-dark">₹{formatPrice(order.subtotal)}</strong>
              </div>

              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Delivery Charges</span>
                <span className={order.deliveryCharge === 0 ? "text-success fw-bold" : "text-dark"}>
                  {order.deliveryCharge === 0 ? "FREE" : `₹${formatPrice(order.deliveryCharge)}`}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success fw-bold">
                  <span>Discount</span>
                  <span>-₹{formatPrice(order.discount)}</span>
                </div>
              )}

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold fs-5" style={{ color: "#071A2F" }}>Total Paid</span>
                <span className="fw-bold fs-4" style={{ color: "#071A2F" }}>
                  ₹{formatPrice(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
