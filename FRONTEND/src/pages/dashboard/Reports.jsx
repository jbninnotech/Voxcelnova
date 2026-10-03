import React, { useEffect, useState } from "react";
import {
  FiTrendingUp,
  FiPackage,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";
import api from "../../services/api";

export default function Reports() {
  const [range, setRange] = useState("30days");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    fetchReportStats();
  }, [range]);

  const fetchReportStats = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/reports/stats?range=${range}`);
      if (res.data?.success) {
        setReportData(res.data.data);
      }
    } catch (err) {
      console.error("Fetch reports error:", err);
      setError(err?.response?.data?.message || err.message || "Failed to load report analytics.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (val) => Number(val || 0).toLocaleString("en-IN");

  const filterOptions = [
    { label: "Today", value: "today" },
    { label: "7 Days", value: "7days" },
    { label: "30 Days", value: "30days" },
    { label: "This Month", value: "thisMonth" },
    { label: "Last Month", value: "lastMonth" },
    { label: "3 Months", value: "3months" },
    { label: "6 Months", value: "6months" },
    { label: "This Year", value: "thisYear" },
  ];

  const summary = reportData || {
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalCustomers: 0,
    productSales: [],
    orderDistribution: [],
  };

  // Compute maximum units sold for bar chart scaling
  const maxUnits = Math.max(...(summary.productSales?.map((p) => p.unitsSold) || [1]), 1);

  // Compute total orders for donut center
  const distributionTotal = summary.orderDistribution?.reduce((acc, curr) => acc + (curr.count || 0), 0) || 1;

  return (
    <div className="p-3 p-md-4" style={{ backgroundColor: "var(--bg-main, #F4F8FE)", minHeight: "100vh" }}>
      {/* HEADER & FILTERS */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <span
            className="badge px-3 py-2 text-uppercase mb-2"
            style={{
              backgroundColor: "var(--bg-badge-tint, #E8F5FE)",
              color: "var(--color-cobalt, #0052FF)",
              letterSpacing: "1px",
              borderRadius: "8px",
              border: "1px solid var(--border-subtle)",
            }}
          >
            ENTERPRISE ANALYTICS & REPORTS
          </span>
          <h2 className="fw-bold mb-1" style={{ color: "var(--text-title, #071838)" }}>
            Business Performance Dashboard
          </h2>
          <p className="small mb-0" style={{ color: "var(--text-body, #495E7C)" }}>
            Real-time breakdown of factory order fulfillment, product demand, and sales revenue.
          </p>
        </div>

        {/* TIME RANGE SELECTOR */}
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border"
            style={{ borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-card)" }}
          >
            <FiFilter color="var(--color-cobalt, #0052FF)" />
            <span className="small fw-bold text-secondary text-nowrap">Filter Period:</span>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="form-select form-select-sm border-0 fw-bold bg-transparent text-dark"
              style={{ cursor: "pointer", width: "130px" }}
            >
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={fetchReportStats}
            className="btn btn-outline-secondary btn-sm p-2 rounded-3"
            title="Refresh Metrics"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger py-2 px-3 mb-3 rounded-3" role="alert">
          {error}
        </div>
      )}

      {/* SUMMARY METRIC CARDS */}
      <div className="row g-3 mb-4">
        {/* TOTAL PRODUCTS */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="p-3 bg-white rounded-4 border d-flex align-items-center justify-content-between"
            style={{ borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-card)" }}
          >
            <div>
              <small className="text-secondary fw-semibold">Total Products</small>
              <h3 className="fw-bold mb-0 mt-1" style={{ color: "var(--text-title, #071838)" }}>
                {loading ? "..." : summary.totalProducts}
              </h3>
            </div>
            <div
              className="p-3 rounded-3"
              style={{ backgroundColor: "var(--bg-badge-tint)", color: "var(--color-cobalt)" }}
            >
              <FiPackage size={22} />
            </div>
          </div>
        </div>

        {/* TOTAL ORDERS */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="p-3 bg-white rounded-4 border d-flex align-items-center justify-content-between"
            style={{ borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-card)" }}
          >
            <div>
              <small className="text-secondary fw-semibold">Total Orders ({range})</small>
              <h3 className="fw-bold mb-0 mt-1" style={{ color: "var(--text-title, #071838)" }}>
                {loading ? "..." : summary.totalOrders}
              </h3>
            </div>
            <div
              className="p-3 rounded-3"
              style={{ backgroundColor: "var(--bg-badge-tint)", color: "var(--color-cobalt)" }}
            >
              <FiShoppingBag size={22} />
            </div>
          </div>
        </div>

        {/* TOTAL REVENUE */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="p-3 bg-white rounded-4 border d-flex align-items-center justify-content-between"
            style={{ borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-card)" }}
          >
            <div>
              <small className="text-secondary fw-semibold">Total Revenue</small>
              <h3 className="fw-bold mb-0 mt-1" style={{ color: "var(--color-cobalt, #0052FF)" }}>
                {loading ? "..." : `₹${formatPrice(summary.totalRevenue)}`}
              </h3>
            </div>
            <div className="p-3 rounded-3 bg-success-subtle text-success">
              <FiDollarSign size={22} />
            </div>
          </div>
        </div>

        {/* TOTAL CUSTOMERS */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="p-3 bg-white rounded-4 border d-flex align-items-center justify-content-between"
            style={{ borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-card)" }}
          >
            <div>
              <small className="text-secondary fw-semibold">Registered Clients</small>
              <h3 className="fw-bold mb-0 mt-1" style={{ color: "var(--text-title, #071838)" }}>
                {loading ? "..." : summary.totalCustomers}
              </h3>
            </div>
            <div className="p-3 rounded-3 bg-info-subtle text-info-emphasis">
              <FiUsers size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* SECONDARY PIPELINE METRICS */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="p-3 bg-white rounded-4 border d-flex align-items-center gap-3">
            <div className="p-3 rounded-circle bg-warning-subtle text-warning-emphasis">
              <FiClock size={20} />
            </div>
            <div>
              <small className="text-secondary">Pending Orders</small>
              <h4 className="fw-bold mb-0 text-warning">{summary.pendingOrders}</h4>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3 bg-white rounded-4 border d-flex align-items-center gap-3">
            <div className="p-3 rounded-circle bg-success-subtle text-success">
              <FiCheckCircle size={20} />
            </div>
            <div>
              <small className="text-secondary">Completed / Delivered</small>
              <h4 className="fw-bold mb-0 text-success">{summary.completedOrders}</h4>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="p-3 bg-white rounded-4 border d-flex align-items-center gap-3">
            <div className="p-3 rounded-circle bg-danger-subtle text-danger">
              <FiXCircle size={20} />
            </div>
            <div>
              <small className="text-secondary">Cancelled Orders</small>
              <h4 className="fw-bold mb-0 text-danger">{summary.cancelledOrders}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="row g-4">
        {/* BAR CHART: PRODUCT SALES */}
        <div className="col-12 col-lg-7">
          <div
            className="p-4 bg-white rounded-4 border h-100"
            style={{ borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-card)" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-0" style={{ color: "var(--text-title, #071838)" }}>
                  Top Product Demand & Units Sold
                </h5>
                <small className="text-secondary">Breakdown by total units ordered</small>
              </div>
              <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill">
                BAR GRAPH
              </span>
            </div>

            {loading ? (
              <div className="text-center py-5 text-muted">Loading product sales chart...</div>
            ) : !summary.productSales || summary.productSales.length === 0 ? (
              <div className="text-center py-5 text-muted">No product sales data recorded for this period.</div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {summary.productSales.map((item, idx) => {
                  const percent = Math.round((item.unitsSold / maxUnits) * 100);

                  return (
                    <div key={idx}>
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="fw-bold text-dark text-truncate" style={{ maxWidth: "240px" }}>
                          {item.name}
                        </span>
                        <span className="fw-semibold text-secondary">
                          <strong>{item.unitsSold} units</strong> (₹{formatPrice(item.revenue)})
                        </span>
                      </div>
                      <div
                        className="progress"
                        style={{ height: "14px", borderRadius: "10px", backgroundColor: "#F1F5F9" }}
                      >
                        <div
                          className="progress-bar rounded-pill"
                          role="progressbar"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: "var(--color-cobalt, #0052FF)",
                            boxShadow: "var(--shadow-glow)",
                            transition: "width 0.6s ease",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* DONUT CHART: ORDER STATUS DISTRIBUTION */}
        <div className="col-12 col-lg-5">
          <div
            className="p-4 bg-white rounded-4 border h-100"
            style={{ borderColor: "var(--border-subtle)", boxShadow: "var(--shadow-card)" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-0" style={{ color: "var(--text-title, #071838)" }}>
                  Order Pipeline Distribution
                </h5>
                <small className="text-secondary">Distribution across order statuses</small>
              </div>
              <span className="badge bg-info-subtle text-info-emphasis px-3 py-1 rounded-pill">
                DONUT CHART
              </span>
            </div>

            {loading ? (
              <div className="text-center py-5 text-muted">Loading order distribution chart...</div>
            ) : (
              <div className="d-flex flex-column align-items-center">
                {/* SVG DONUT CHART */}
                <div className="position-relative mb-4" style={{ width: "180px", height: "180px" }}>
                  <svg width="180" height="180" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F1F5F9" strokeWidth="16" />
                    {summary.orderDistribution.reduce((acc, item, i) => {
                      if (!item.count) return acc;
                      const percentage = item.count / distributionTotal;
                      const strokeDasharray = `${percentage * 251.2} 251.2`;
                      const strokeDashoffset = -acc.totalOffset;

                      acc.elements.push(
                        <circle
                          key={i}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke={item.color}
                          strokeWidth="16"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          transform="rotate(-90 50 50)"
                          style={{ transition: "all 0.5s ease" }}
                        />
                      );
                      acc.totalOffset += percentage * 251.2;
                      return acc;
                    }, { elements: [], totalOffset: 0 }).elements}
                  </svg>
                  <div
                    className="position-absolute top-50 start-50 translate-middle text-center"
                    style={{ pointerEvents: "none" }}
                  >
                    <div className="fs-4 fw-bold" style={{ color: "var(--text-title, #071838)" }}>
                      {summary.totalOrders}
                    </div>
                    <div className="text-muted" style={{ fontSize: "10px", textTransform: "uppercase" }}>
                      Orders
                    </div>
                  </div>
                </div>

                {/* LEGEND */}
                <div className="w-100 d-flex flex-column gap-2">
                  {summary.orderDistribution.map((item, idx) => (
                    <div key={idx} className="d-flex align-items-center justify-content-between small">
                      <div className="d-flex align-items-center gap-2">
                        <span
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: item.color,
                          }}
                        />
                        <span className="fw-semibold text-dark">{item.name}</span>
                      </div>
                      <span className="fw-bold">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
