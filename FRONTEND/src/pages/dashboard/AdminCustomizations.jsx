import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaEye,
  FaFileDownload,
  FaTrash,
  FaSyncAlt,
  FaFilter,
  FaBuilding,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTimes,
  FaCheck
} from "react-icons/fa";
import {
  getAllCustomizations,
  updateCustomizationStatus,
  updateCustomizationNotes,
  deleteCustomization
} from "../../services/customizationService";

const STATUS_OPTIONS = [
  "All",
  "New",
  "Reviewing",
  "Quotation Sent",
  "Sample In Progress",
  "Sample Approved",
  "In Production",
  "Completed",
  "Cancelled"
];

const STATUS_BADGES = {
  New: { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
  Reviewing: { bg: "#FEF3C7", color: "#D97706", border: "#FDE68A" },
  "Quotation Sent": { bg: "#F3E8FF", color: "#7E22CE", border: "#E9D5FF" },
  "Sample In Progress": { bg: "#E0E7FF", color: "#4338CA", border: "#C7D2FE" },
  "Sample Approved": { bg: "#ECFDF5", color: "#047857", border: "#A7F3D0" },
  "In Production": { bg: "#FEF9C3", color: "#A16207", border: "#FEF08A" },
  Completed: { bg: "#DCFCE7", color: "#15803D", border: "#86EFAC" },
  Cancelled: { bg: "#FEE2E2", color: "#B91C1C", border: "#FCA5A5" }
};

export default function AdminCustomizations() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, reviewing: 0, production: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState("");
  const [updating, setUpdating] = useState(false);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllCustomizations({
        search: search.trim() || undefined,
        status: statusFilter !== "All" ? statusFilter : undefined
      });

      // Safely extract the array regardless of backend structure
      const orderList = Array.isArray(res)
        ? res
        : res.data || res.customizations || [];

      setItems(orderList);

      if (res.stats) {
        setStats(res.stats);
      } else {
        setStats({
          total: orderList.length,
          new: orderList.filter((x) => x.status === "New").length,
          reviewing: orderList.filter((x) => x.status === "Reviewing").length,
          production: orderList.filter((x) => x.status === "In Production").length,
          completed: orderList.filter((x) => x.status === "Completed").length
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load customization orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  // Status Change Handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdating(true);
      await updateCustomizationStatus(id, newStatus);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  // Save Admin Notes
  const handleSaveNotes = async () => {
    if (!selectedOrder) return;
    try {
      setUpdating(true);
      await updateCustomizationNotes(selectedOrder._id, adminNoteInput);
      setSelectedOrder((prev) => ({ ...prev, adminNotes: adminNoteInput }));
      setItems((prev) =>
        prev.map((item) => (item._id === selectedOrder._id ? { ...item, adminNotes: adminNoteInput } : item))
      );
      alert("Admin notes saved.");
    } catch (err) {
      alert("Failed to save notes.");
    } finally {
      setUpdating(false);
    }
  };

  // Delete Record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this bulk inquiry?")) return;
    try {
      await deleteCustomization(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
      if (selectedOrder?._id === id) setSelectedOrder(null);
    } catch (err) {
      alert("Failed to delete record.");
    }
  };

  return (
    <div style={{ padding: "28px", background: "#F8FAFC", minHeight: "100vh" }}>
      {/* HEADER & QUICK STATS */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0F172A", margin: 0 }}>
              Bulk Uniform & Custom Orders
            </h2>
            <p style={{ color: "#64748B", fontSize: "14px", margin: "4px 0 0" }}>
              Manage institutional RFQs, manufacturing specs, size matrices, and client status.
            </p>
          </div>
          <button
            onClick={fetchOrders}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            <FaSyncAlt /> Refresh
          </button>
        </div>

        {/* QUICK STATS CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginTop: 20 }}>
          <div style={statCard}>
            <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 700 }}>TOTAL INQUIRIES</span>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A" }}>{stats.total || items.length}</div>
          </div>
          <div style={statCard}>
            <span style={{ fontSize: "12px", color: "#1D4ED8", fontWeight: 700 }}>NEW REQUESTS</span>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#1D4ED8" }}>{stats.new || 0}</div>
          </div>
          <div style={statCard}>
            <span style={{ fontSize: "12px", color: "#D97706", fontWeight: 700 }}>UNDER REVIEW</span>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#D97706" }}>{stats.reviewing || 0}</div>
          </div>
          <div style={statCard}>
            <span style={{ fontSize: "12px", color: "#A16207", fontWeight: 700 }}>IN PRODUCTION</span>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#A16207" }}>{stats.production || 0}</div>
          </div>
          <div style={statCard}>
            <span style={{ fontSize: "12px", color: "#15803D", fontWeight: 700 }}>COMPLETED</span>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#15803D" }}>{stats.completed || 0}</div>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div style={{ background: "#FFFFFF", padding: "16px 20px", borderRadius: 12, border: "1px solid #E2E8F0", marginBottom: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 14 }}>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 8, flex: 1, minWidth: 280 }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 360 }}>
            <FaSearch style={{ position: "absolute", left: 12, top: 12, color: "#94A3B8" }} />
            <input
              type="text"
              placeholder="Search by ID, School Name, City..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px 8px 36px",
                borderRadius: 8,
                border: "1px solid #CBD5E1",
                fontSize: "13px",
                outline: "none"
              }}
            />
          </div>
          <button type="submit" style={{ padding: "8px 16px", background: "#0052FF", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
            Search
          </button>
        </form>

        {/* STATUS FILTER PILLS */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto" }}>
          <FaFilter color="#64748B" size={12} />
          {STATUS_OPTIONS.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                fontSize: "12px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background: statusFilter === st ? "#0052FF" : "#F1F5F9",
                color: statusFilter === st ? "#FFFFFF" : "#475569"
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div style={{ background: "#FEE2E2", color: "#B91C1C", padding: 14, borderRadius: 8, marginBottom: 20, fontSize: "14px" }}>
          {error}
        </div>
      )}

      {/* DATA TABLE */}
      <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#64748B" }}>Loading orders...</div>
        ) : items.length === 0 ? (
          <div style={{ padding: 50, textAlign: "center", color: "#64748B" }}>
            <h4>No Customization Orders Found</h4>
            <p style={{ fontSize: "13px" }}>Orders submitted through the website will appear here in real time.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1.5px solid #E2E8F0", color: "#475569", fontWeight: 700 }}>
                <th style={{ padding: "12px 16px" }}>Request ID</th>
                <th style={{ padding: "12px 16px" }}>Institution / Client</th>
                <th style={{ padding: "12px 16px" }}>Contact</th>
                <th style={{ padding: "12px 16px" }}>Garments & Qty</th>
                <th style={{ padding: "12px 16px" }}>Delivery Date</th>
                <th style={{ padding: "12px 16px" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => {
                const badge = STATUS_BADGES[row.status] || { bg: "#F1F5F9", color: "#475569", border: "#CBD5E1" };
                const garmentText = Array.isArray(row.garmentTypes) ? row.garmentTypes.join(", ") : "Uniform items";

                return (
                  <tr key={row._id} style={{ borderBottom: "1px solid #F1F5F9", transition: "background 0.2s" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#0052FF" }}>
                      {row.requestId || "VN-CUS-NEW"}
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: 700, color: "#0F172A" }}>{row.institutionName}</div>
                      <small style={{ color: "#64748B" }}>{row.institutionType} • {row.city}, {row.state}</small>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <div>{row.contactPerson}</div>
                      <small style={{ color: "#64748B" }}>{row.phone}</small>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: 700 }}>{row.estimatedQuantity} pcs</div>
                      <small style={{ color: "#64748B", display: "block", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {garmentText}
                      </small>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      {row.expectedDeliveryDate ? new Date(row.expectedDeliveryDate).toLocaleDateString() : "Flexible"}
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row._id, e.target.value)}
                        style={{
                          background: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                          borderRadius: 6,
                          padding: "4px 8px",
                          fontWeight: 700,
                          fontSize: "12px",
                          cursor: "pointer",
                          outline: "none"
                        }}
                      >
                        {STATUS_OPTIONS.filter((s) => s !== "All").map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>

                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <button
                        onClick={() => {
                          setSelectedOrder(row);
                          setAdminNoteInput(row.adminNotes || "");
                        }}
                        style={{
                          padding: "6px 10px",
                          background: "#EFF6FF",
                          color: "#0052FF",
                          border: "none",
                          borderRadius: 6,
                          cursor: "pointer",
                          marginRight: 6
                        }}
                        title="View Full Specifications"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => handleDelete(row._id)}
                        style={{
                          padding: "6px 10px",
                          background: "#FEE2E2",
                          color: "#DC2626",
                          border: "none",
                          borderRadius: 6,
                          cursor: "pointer"
                        }}
                        title="Delete Inquiry"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* FULL DETAILS MODAL */}
      {selectedOrder && (
        <div style={modalBackdrop}>
          <div style={modalBox}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: 14 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#0F172A" }}>
                  Inquiry: {selectedOrder.requestId || selectedOrder._id}
                </h3>
                <small style={{ color: "#64748B" }}>Submitted on {new Date(selectedOrder.createdAt).toLocaleString()}</small>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ border: "none", background: "none", fontSize: 18, cursor: "pointer" }}>
                <FaTimes />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              {/* CLIENT DETAILS */}
              <div style={infoBlock}>
                <h5 style={{ margin: "0 0 10px", color: "#0052FF", fontSize: "14px" }}><FaBuilding /> Client Information</h5>
                <p><b>Institution:</b> {selectedOrder.institutionName} ({selectedOrder.institutionType})</p>
                <p><b>Contact Person:</b> {selectedOrder.contactPerson} - {selectedOrder.designation}</p>
                <p><b>Phone:</b> {selectedOrder.phone}</p>
                <p><b>Email:</b> {selectedOrder.email}</p>
                <p><b>Delivery Campus:</b> {selectedOrder.deliveryLocation}, {selectedOrder.city}, {selectedOrder.state}</p>
              </div>

              {/* SPECIFICATIONS */}
              <div style={infoBlock}>
                <h5 style={{ margin: "0 0 10px", color: "#0052FF", fontSize: "14px" }}>Manufacturing Specs</h5>
                <p><b>Category:</b> {selectedOrder.uniformCategory}</p>
                <p><b>Garments:</b> {Array.isArray(selectedOrder.garmentTypes) ? selectedOrder.garmentTypes.join(", ") : "N/A"}</p>
                <p><b>Total Units:</b> <span style={{ color: "#0052FF", fontWeight: 800 }}>{selectedOrder.estimatedQuantity} pcs</span></p>
                <p><b>Fabric Preference:</b> {selectedOrder.fabricPreference}</p>
                <p><b>Branding / Methods:</b> {Array.isArray(selectedOrder.customizationMethods) ? selectedOrder.customizationMethods.join(", ") : "None"}</p>
                <p><b>Logo Placement:</b> {selectedOrder.logoPosition || "Standard Chest"}</p>
              </div>
            </div>

            {/* SIZING TABLE */}
            <div style={{ marginTop: 16, background: "#F8FAFC", padding: 12, borderRadius: 8, border: "1px solid #E2E8F0" }}>
              <h5 style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 700 }}>Approximate Size Breakdown</h5>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, textAlign: "center" }}>
                {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
                  <div key={sz} style={{ background: "#fff", padding: "6px", borderRadius: 6, border: "1px solid #E2E8F0" }}>
                    <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 700 }}>{sz}</div>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: "#0052FF" }}>
                      {selectedOrder.sizes?.[sz] || 0}
                    </div>
                  </div>
                ))}
              </div>
              {selectedOrder.sizes?.Custom && (
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#475569" }}>
                  <b>Custom sizing notes:</b> {selectedOrder.sizes.Custom}
                </p>
              )}
            </div>

            {/* FILE ATTACHMENTS */}
            <div style={{ marginTop: 16 }}>
              <h5 style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 700 }}>Uploaded Artwork / Attachments</h5>
              <div style={{ display: "flex", gap: 12 }}>
                {selectedOrder.logoFile?.path ? (
                  <a
                    href={`http://localhost:5000/${selectedOrder.logoFile.path}`}
                    target="_blank"
                    rel="noreferrer"
                    style={fileBtn}
                  >
                    <FaFileDownload /> Logo Crest ({selectedOrder.logoFile.originalName || "Download"})
                  </a>
                ) : (
                  <span style={{ fontSize: "12px", color: "#94A3B8" }}>No Logo Uploaded</span>
                )}

                {selectedOrder.designFile?.path && (
                  <a
                    href={`http://localhost:5000/${selectedOrder.designFile.path}`}
                    target="_blank"
                    rel="noreferrer"
                    style={fileBtn}
                  >
                    <FaFileDownload /> Sample Sketch ({selectedOrder.designFile.originalName || "Download"})
                  </a>
                )}
              </div>
            </div>

            {/* ADMIN INTERNAL NOTES */}
            <div style={{ marginTop: 16 }}>
              <h5 style={{ margin: "0 0 6px", fontSize: "13px", fontWeight: 700 }}>Factory Internal Notes</h5>
              <textarea
                rows={3}
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                placeholder="Add notes about pricing quote sent, fabric mill availability, thread shades..."
                value={adminNoteInput}
                onChange={(e) => setAdminNoteInput(e.target.value)}
              />
              <button
                onClick={handleSaveNotes}
                disabled={updating}
                style={{ marginTop: 8, padding: "8px 18px", background: "#0F172A", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, fontSize: "12px", cursor: "pointer" }}
              >
                {updating ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// STYLES
const statCard = {
  background: "#FFFFFF",
  padding: "16px 20px",
  borderRadius: 10,
  border: "1px solid #E2E8F0"
};

const modalBackdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(15, 23, 42, 0.6)",
  backdropFilter: "blur(4px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  padding: 16
};

const modalBox = {
  background: "#FFFFFF",
  width: "100%",
  maxWidth: "760px",
  maxHeight: "90vh",
  borderRadius: 16,
  padding: "24px 28px",
  overflowY: "auto",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
};

const infoBlock = {
  background: "#F8FAFC",
  padding: "14px",
  borderRadius: 10,
  border: "1px solid #E2E8F0",
  fontSize: "13px",
  lineHeight: 1.6
};

const fileBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 14px",
  background: "#EFF6FF",
  color: "#0052FF",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "12px",
  border: "1px solid #BFDBFE"
};