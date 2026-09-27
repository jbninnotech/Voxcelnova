import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiMapPin,
  FiUser,
  FiPackage,
  FiX,
  FiShield,
} from "react-icons/fi";
import { getAllOrdersAdmin, updateOrderStatusAdmin } from "../../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filters & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Selected Order for Details Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllOrdersAdmin(search, statusFilter);
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      setError("");
      const res = await updateOrderStatusAdmin(orderId, newStatus);
      setSuccess(`Order #${orderId.substring(orderId.length - 6)} status updated to ${newStatus}`);
      fetchOrders();

      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(res.order);
      }

      setTimeout(() => setSuccess(""), 3500);
    } catch (err) {
      setError(err.message || "Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleManualOnlinePaymentAttempt = () => {
    alert(
      "SECURITY RESTRICTION: Admin cannot manually mark an online payment as verified without valid transaction verification authorization!"
    );
  };

  const formatPrice = (val) => Number(val || 0).toLocaleString("en-IN");

  const statusOptions = [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "OutForDelivery",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="p-3 p-md-4">
      {/* TITLE */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#071A2F" }}>
            Admin Order Management
          </h2>
          <p className="text-secondary small mb-0">
            View customer apparel orders, filter pipeline statuses, and review shipping details.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2 rounded-3"
        >
          <FiRefreshCw /> Refresh List
        </button>
      </div>

      {/* NOTIFICATIONS */}
      {success && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-3 rounded-3" role="alert">
          <FiCheckCircle size={18} /> <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 mb-3 rounded-3" role="alert">
          <FiAlertCircle size={18} /> <span>{error}</span>
        </div>
      )}

      {/* FILTERS & SEARCH ROW */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
        <form onSubmit={handleSearchSubmit} className="row g-3 align-items-center">
          {/* SEARCH BAR */}
          <div className="col-12 col-md-6 col-lg-7">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <FiSearch color="#64748B" />
              </span>
              <input
                type="text"
                placeholder="Search by Order ID, Customer Name, or Email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control border-start-0 py-2"
              />
              <button type="submit" className="btn btn-dark fw-bold px-3">
                Search
              </button>
            </div>
          </div>

          {/* STATUS FILTER */}
          <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center gap-2">
            <label className="fw-semibold small text-secondary text-nowrap d-flex align-items-center gap-1">
              <FiFilter /> Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select py-2 fw-semibold"
            >
              <option value="ALL">All Statuses</option>
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {/* ORDERS TABLE */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light border-bottom">
              <tr style={{ fontSize: "12.5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Products</th>
                <th className="py-3 px-3">Size</th>
                <th className="py-3 px-3">Qty</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Order Status</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13.5px" }}>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-5 text-muted">
                    <div className="spinner-border spinner-border-sm me-2 text-primary" />
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-5 text-muted">
                    No orders matching your search criteria.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const firstItem = order.items?.[0];
                  const itemNames = order.items?.map((i) => i.productName).join(", ");
                  const sizes = Array.from(new Set(order.items?.map((i) => i.size).filter(Boolean))).join(", ") || "-";
                  const totalQty = order.items?.reduce((acc, i) => acc + (i.quantity || 1), 0);
                  const isPaid = order.paymentStatus === "Paid";
                  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr key={order._id}>
                      {/* ORDER ID */}
                      <td className="px-3 fw-bold text-primary font-monospace">
                        #{order._id.substring(order._id.length - 8).toUpperCase()}
                      </td>

                      {/* CUSTOMER */}
                      <td className="px-3">
                        <div className="fw-bold text-dark">{order.user?.name || order.shippingAddress?.fullName || "Guest"}</div>
                        <div className="text-muted small">{order.user?.email || order.shippingAddress?.phone}</div>
                      </td>

                      {/* PRODUCTS */}
                      <td className="px-3" style={{ maxWidth: "200px" }}>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={firstItem?.image || "https://placehold.co/80x80?text=Apparel"}
                            alt="Product"
                            style={{
                              width: "36px",
                              height: "44px",
                              objectFit: "cover",
                              borderRadius: "6px",
                              border: "1px solid #E2E8F0",
                            }}
                          />
                          <div className="text-truncate small fw-semibold text-dark" title={itemNames}>
                            {itemNames}
                          </div>
                        </div>
                      </td>

                      {/* SIZE */}
                      <td className="px-3">
                        <span className="badge bg-light text-dark border fw-bold">{sizes}</span>
                      </td>

                      {/* QTY */}
                      <td className="px-3 fw-bold">{totalQty}</td>

                      {/* AMOUNT */}
                      <td className="px-3 fw-bold text-dark">₹{formatPrice(order.totalAmount)}</td>

                      {/* PAYMENT */}
                      <td className="px-3">
                        <span
                          className={`badge ${
                            isPaid ? "bg-success-subtle text-success border border-success-subtle" : "bg-warning-subtle text-warning-emphasis border border-warning-subtle"
                          } px-2 py-1`}
                        >
                          {order.paymentStatus}
                        </span>
                        <div className="text-muted" style={{ fontSize: "11px" }}>{order.paymentMethod}</div>
                      </td>

                      {/* ORDER STATUS DROPDOWN */}
                      <td className="px-3">
                        <select
                          value={order.orderStatus}
                          disabled={updatingId === order._id}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="form-select form-select-sm fw-bold border-secondary-subtle"
                          style={{ fontSize: "12px", width: "135px" }}
                        >
                          {statusOptions.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* DATE */}
                      <td className="px-3 text-muted small">{formattedDate}</td>

                      {/* ACTION */}
                      <td className="px-3 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="btn btn-sm btn-outline-dark d-inline-flex align-items-center gap-1 rounded-3"
                        >
                          <FiEye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom bg-light">
                <div>
                  <h5 className="modal-title fw-bold text-dark">
                    Order Details #{selectedOrder._id.substring(selectedOrder._id.length - 8).toUpperCase()}
                  </h5>
                  <small className="text-muted">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                  </small>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                />
              </div>

              <div className="modal-body p-4">
                {/* CUSTOMER & SHIPPING INFO */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <h6 className="fw-bold mb-2 text-dark d-flex align-items-center gap-2">
                        <FiUser color="#2563EB" /> Customer Information
                      </h6>
                      <div className="small fw-semibold">{selectedOrder.user?.name || selectedOrder.shippingAddress?.fullName}</div>
                      <div className="small text-muted">{selectedOrder.user?.email || "No email"}</div>
                      <div className="small text-muted">Phone: {selectedOrder.shippingAddress?.phone}</div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <h6 className="fw-bold mb-2 text-dark d-flex align-items-center gap-2">
                        <FiMapPin color="#2563EB" /> Shipping Address
                      </h6>
                      <div className="small text-secondary">
                        {selectedOrder.shippingAddress?.houseFlat}, {selectedOrder.shippingAddress?.street},{" "}
                        {selectedOrder.shippingAddress?.area}, {selectedOrder.shippingAddress?.city},{" "}
                        {selectedOrder.shippingAddress?.state} - <strong>{selectedOrder.shippingAddress?.pincode}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ORDERED ITEMS */}
                <h6 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
                  <FiPackage color="#2563EB" /> Ordered Items ({selectedOrder.items?.length})
                </h6>

                <div className="table-responsive mb-4">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light small">
                      <tr>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="small">
                      {selectedOrder.items?.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={item.image || "https://placehold.co/80x80?text=Apparel"}
                                alt={item.productName}
                                style={{ width: "40px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
                              />
                              <span className="fw-semibold text-dark">{item.productName}</span>
                            </div>
                          </td>
                          <td><span className="badge bg-light text-dark border">{item.size || "-"}</span></td>
                          <td className="fw-bold">{item.quantity}</td>
                          <td>₹{formatPrice(item.price)}</td>
                          <td className="fw-bold">₹{formatPrice(item.subtotal || item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* FINANCIAL SUMMARY */}
                <div className="row g-3 align-items-center border-top pt-3">
                  <div className="col-12 col-md-6">
                    <div className="small text-muted mb-1">
                      Payment Method: <strong>{selectedOrder.paymentMethod}</strong>
                    </div>
                    <div className="small text-muted mb-2">
                      Payment Status: <span className="badge bg-secondary">{selectedOrder.paymentStatus}</span>
                    </div>

                    {/* Online Payment Verification Warning */}
                    {!["Cash on Delivery", "COD"].includes(selectedOrder.paymentMethod) && (
                      <button
                        type="button"
                        onClick={handleManualOnlinePaymentAttempt}
                        className="btn btn-outline-warning btn-sm fw-bold d-inline-flex align-items-center gap-1"
                      >
                        <FiShield /> Manual Online Payment Verification Guard
                      </button>
                    )}
                  </div>

                  <div className="col-12 col-md-6 text-end">
                    <div className="small text-secondary mb-1">Subtotal: ₹{formatPrice(selectedOrder.subtotal)}</div>
                    <div className="small text-secondary mb-1">Delivery: ₹{formatPrice(selectedOrder.deliveryCharge)}</div>
                    <div className="small text-secondary mb-2">Discount: -₹{formatPrice(selectedOrder.discount)}</div>
                    <div className="fs-5 fw-bold text-dark">
                      Total Amount: ₹{formatPrice(selectedOrder.totalAmount)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light">
                <button
                  type="button"
                  className="btn btn-secondary fw-semibold"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
