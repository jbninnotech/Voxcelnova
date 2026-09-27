import React, { useState, useMemo } from "react";
import {
  FaBuilding,
  FaTshirt,
  FaPalette,
  FaRulerCombined,
  FaTruck,
  FaCheckCircle,
  FaPaperPlane,
  FaShieldAlt,
  FaPhoneAlt,
  FaBoxOpen
} from "react-icons/fa";
import { createCustomization } from "../../services/customizationService";

const GARMENTS = [
  "Collared Shirt", "Polo T-Shirt", "Round Neck Tee",
  "Formal Trousers", "Track Pants", "Skirt / Tunic",
  "Blazer / Coat", "Lab Coat", "Sports Jersey", "Hoodie / Jacket"
];

const FABRICS = [
  "Cotton Blend (Heavy Duty)",
  "100% Combed Cotton",
  "Micro-Poly Dry-Fit",
  "Poly-Viscose Suiting",
  "Heavy Twill"
];

const CUSTOMIZATION_METHODS = [
  "Embroidery Crest",
  "Screen Printing",
  "Digital DTF Print",
  "Heat Transfer",
  "Woven Patch"
];

export default function BulkOrderCustomization() {
  const [form, setForm] = useState({
    // 1. Institution & Client Details
    institutionName: "",
    institutionType: "School",
    contactPerson: "",
    designation: "Procurement Officer",
    phone: "",
    email: "",
    city: "",
    state: "",

    // 2. Product & Specs
    uniformCategory: "Regular Uniform",
    garmentTypes: ["Collared Shirt", "Formal Trousers"],
    fabricPreference: "Cotton Blend (Heavy Duty)",
    primaryColor: "#0052FF",
    secondaryColor: "#FFFFFF",
    logoPosition: "Left Chest",
    customizationMethods: ["Embroidery Crest"],
    sizes: { XS: 0, S: 40, M: 80, L: 60, XL: 20, XXL: 10, Custom: "" },

    // 3. Logistics & Delivery
    expectedDeliveryDate: "",
    deliveryLocation: "",
    packagingRequirement: "Individual Poly-Pack",
    additionalRequirements: ""
  });

  const [logoFile, setLogoFile] = useState(null);
  const [sampleFile, setSampleFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Live Auto-Calculation of Units from Sizes
  const totalUnits = useMemo(() => {
    const { Custom, ...standardSizes } = form.sizes;
    return Object.values(standardSizes).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
  }, [form.sizes]);

  // Bulk Tier Pricing Indicator
  const bulkTier = useMemo(() => {
    if (totalUnits >= 1000) return { label: "Factory Mega-Bulk Tier (Max Discount)", color: "#16a34a" };
    if (totalUnits >= 500) return { label: "Institutional Wholesale Tier", color: "#2563eb" };
    if (totalUnits >= 100) return { label: "Standard Bulk Tier", color: "#d97706" };
    return { label: "Minimum Batch Run", color: "#64748b" };
  }, [totalUnits]);

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Garment Chip Toggle
  const toggleGarment = (item) => {
    setForm((prev) => {
      const exists = prev.garmentTypes.includes(item);
      const updated = exists ? prev.garmentTypes.filter((g) => g !== item) : [...prev.garmentTypes, item];
      return { ...prev, garmentTypes: updated };
    });
  };

  // Customization Chip Toggle
  const toggleMethod = (method) => {
    setForm((prev) => {
      const exists = prev.customizationMethods.includes(method);
      const updated = exists ? prev.customizationMethods.filter((m) => m !== method) : [...prev.customizationMethods, method];
      return { ...prev, customizationMethods: updated };
    });
  };

  // Size Count Change
  const handleSizeChange = (sz, val) => {
    const count = Math.max(0, parseInt(val, 10) || 0);
    setForm((prev) => ({
      ...prev,
      sizes: { ...prev.sizes, [sz]: count }
    }));
  };

  // Direct Submission to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!form.institutionName.trim() || !form.contactPerson.trim() || !form.phone.trim() || !form.email.trim()) {
      setErrorMessage("Please complete all required fields in Section 1 (Institution Details).");
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    if (form.garmentTypes.length === 0) {
      setErrorMessage("Please select at least 1 garment type in Section 2.");
      return;
    }

    if (totalUnits < 1) {
      setErrorMessage("Please enter unit counts in the Sizing Matrix (Section 2).");
      return;
    }

    if (!form.expectedDeliveryDate || !form.deliveryLocation.trim()) {
      setErrorMessage("Please enter your Target Delivery Date and Campus Address in Section 3.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      // Append standard values
      Object.entries(form).forEach(([key, val]) => {
        if (key === "garmentTypes" || key === "customizationMethods" || key === "sizes") {
          formData.append(key, JSON.stringify(val));
        } else {
          formData.append(key, val);
        }
      });

      formData.append("estimatedQuantity", totalUnits);

      if (logoFile) formData.append("logo", logoFile);
      if (sampleFile) formData.append("design", sampleFile);

      const res = await createCustomization(formData);
      setSubmittedId(res?.requestId || "VN-BULK-" + Math.floor(100000 + Math.random() * 900000));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || err.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#F4F7FB", minHeight: "100vh", padding: "40px 16px 80px" }}>
      {/* PAGE HEADER */}
      <div style={{ maxWidth: "860px", margin: "0 auto 32px", textAlign: "center" }}>
        <span style={badgeStyle}>Factory-Direct Production</span>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0B192C", margin: "10px 0" }}>
          Bulk Uniform & Garment Order
        </h1>
        <p style={{ color: "#475569", fontSize: "15px", margin: 0 }}>
          Complete client details, choose garments and sizing, and transmit specifications directly to the manufacturing line.
        </p>
      </div>

      {submittedId ? (
        /* SUCCESS CONFIRMATION */
        <div style={{ maxWidth: "620px", margin: "40px auto", background: "#fff", borderRadius: "16px", padding: "40px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
          <FaCheckCircle size={54} color="#16a34a" />
          <h2 style={{ fontWeight: 800, color: "#0B192C", marginTop: "16px" }}>Order Request Received!</h2>
          <p style={{ color: "#64748B" }}>Your reference tracking ID is:</p>
          <div style={{ display: "inline-block", background: "#EFF6FF", color: "#0052FF", padding: "10px 22px", borderRadius: "8px", fontWeight: 800, fontSize: "18px", letterSpacing: "1px", marginBottom: "16px" }}>
            {submittedId}
          </div>
          <p style={{ color: "#475569", fontSize: "14px" }}>
            Our production supervisors are reviewing fabric availability and sizing requirements. A wholesale rate quote will be sent to <b>{form.email}</b> within 24 hours.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: "16px", background: "#0052FF", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}
          >
            Create Another Order
          </button>
        </div>
      ) : (
        /* SINGLE PAGE 3-PART FLOW */
        <form onSubmit={handleSubmit} style={{ maxWidth: "860px", margin: "0 auto" }}>
          {errorMessage && (
            <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "14px 18px", borderRadius: "10px", marginBottom: "20px", fontWeight: 600, fontSize: "14px", border: "1px solid #FCA5A5" }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {/* ========================================================
              PART 1: INSTITUTION & CLIENT FORM
          ========================================================= */}
          <div style={sectionBoxStyle}>
            <div style={stepHeaderStyle}>
              <span style={stepNumberBadge}>1</span>
              <div>
                <h3 style={stepTitle}>Institution & Client Contact</h3>
                <small style={{ color: "#64748B" }}>Official details for billing quotation and procurement contact</small>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>Institution / School Name *</label>
                <input
                  style={inputStyle}
                  name="institutionName"
                  placeholder="e.g. Hyderabad Model Public School"
                  value={form.institutionName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Organization Type</label>
                <select style={inputStyle} name="institutionType" value={form.institutionType} onChange={handleChange}>
                  <option value="School">K-12 School</option>
                  <option value="College">College / University</option>
                  <option value="Corporate">Corporate / Industry</option>
                  <option value="Healthcare">Hospital / Healthcare</option>
                  <option value="Sports">Sports Academy</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Contact Person Name *</label>
                <input
                  style={inputStyle}
                  name="contactPerson"
                  placeholder="e.g. R. K. Sharma"
                  value={form.contactPerson}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Designation / Role</label>
                <input
                  style={inputStyle}
                  name="designation"
                  placeholder="e.g. Purchase Head / Principal"
                  value={form.designation}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label style={labelStyle}>Mobile Phone / WhatsApp *</label>
                <input
                  style={inputStyle}
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Official Work Email *</label>
                <input
                  style={inputStyle}
                  name="email"
                  type="email"
                  placeholder="purchase@institution.edu"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>City *</label>
                <input style={inputStyle} name="city" placeholder="e.g. Hyderabad" value={form.city} onChange={handleChange} required />
              </div>

              <div>
                <label style={labelStyle}>State / Province *</label>
                <input style={inputStyle} name="state" placeholder="e.g. Telangana" value={form.state} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* ========================================================
              PART 2: PRODUCTS SELECTION & CUSTOMIZATION
          ========================================================= */}
          <div style={sectionBoxStyle}>
            <div style={stepHeaderStyle}>
              <span style={stepNumberBadge}>2</span>
              <div>
                <h3 style={stepTitle}>Product Selection & Sizing Matrix</h3>
                <small style={{ color: "#64748B" }}>Choose uniform items, shades, branding, and size distributions</small>
              </div>
            </div>

            {/* GARMENT SELECTION */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Select Uniform Items (Click all that apply) *</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {GARMENTS.map((item) => {
                  const active = form.garmentTypes.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleGarment(item)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: active ? "1.5px solid #0052FF" : "1.5px solid #CBD5E1",
                        background: active ? "#EFF6FF" : "#FFFFFF",
                        color: active ? "#0052FF" : "#334155"
                      }}
                    >
                      {active ? "✓ " : "+ "} {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FABRIC & UNIFORM TYPE */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>Uniform Classification</label>
                <select style={inputStyle} name="uniformCategory" value={form.uniformCategory} onChange={handleChange}>
                  <option value="Regular Uniform">Regular Daily Uniform</option>
                  <option value="Sports Uniform">Sports / Athletic Uniform</option>
                  <option value="Staff Uniform">Faculty / Staff Uniform</option>
                  <option value="House Uniform">House / Event Uniform</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Fabric Specification</label>
                <select style={inputStyle} name="fabricPreference" value={form.fabricPreference} onChange={handleChange}>
                  {FABRICS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* COLORS & BRANDING */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>Primary Color</label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="color"
                    name="primaryColor"
                    value={form.primaryColor}
                    onChange={handleChange}
                    style={{ width: "45px", height: "38px", border: "none", borderRadius: "8px", cursor: "pointer" }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>{form.primaryColor}</span>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Secondary / Accent Color</label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="color"
                    name="secondaryColor"
                    value={form.secondaryColor}
                    onChange={handleChange}
                    style={{ width: "45px", height: "38px", border: "none", borderRadius: "8px", cursor: "pointer" }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>{form.secondaryColor}</span>
                </div>
              </div>
            </div>

            {/* BRANDING METHODS */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Custom Branding Techniques</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {CUSTOMIZATION_METHODS.map((m) => {
                  const active = form.customizationMethods.includes(m);
                  return (
                    <button
                      type="button"
                      key={m}
                      onClick={() => toggleMethod(m)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: active ? "1.5px solid #0052FF" : "1px solid #CBD5E1",
                        background: active ? "#EFF6FF" : "#F8FAFC",
                        color: active ? "#0052FF" : "#475569"
                      }}
                    >
                      {active ? "✓ " : ""} {m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ARTWORK UPLOADS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={labelStyle}>School Crest / Logo (.PNG, .SVG, .PDF)</label>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg,.pdf"
                  style={fileInputStyle}
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                />
              </div>
              <div>
                <label style={labelStyle}>Reference Sample / Style Photo (Optional)</label>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  style={fileInputStyle}
                  onChange={(e) => setSampleFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            {/* SIZING MATRIX */}
            <div style={{ background: "#F8FAFC", padding: "16px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>Size Breakdown Matrix (Quantities per size)</label>
                <span style={{ fontSize: "12px", color: bulkTier.color, fontWeight: 700 }}>● {bulkTier.label}</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
                {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
                  <div key={sz} style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#475569" }}>{sz}</span>
                    <input
                      type="number"
                      min="0"
                      style={{ ...inputStyle, textAlign: "center", marginTop: "4px", padding: "8px" }}
                      value={form.sizes[sz]}
                      onChange={(e) => handleSizeChange(sz, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "12px" }}>
                <input
                  type="text"
                  placeholder="Special measurement notes (e.g., +2 inches extra shirt length for 15 pcs)"
                  style={inputStyle}
                  value={form.sizes.Custom}
                  onChange={(e) => setForm((prev) => ({ ...prev, sizes: { ...prev.sizes, Custom: e.target.value } }))}
                />
              </div>
            </div>
          </div>

          {/* ========================================================
              PART 3: LOGISTICS & SUBMIT ORDER
          ========================================================= */}
          <div style={sectionBoxStyle}>
            <div style={stepHeaderStyle}>
              <span style={stepNumberBadge}>3</span>
              <div>
                <h3 style={stepTitle}>Delivery Schedule & Order Confirmation</h3>
                <small style={{ color: "#64748B" }}>Destination campus address and target delivery timeline</small>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Target Delivery Date *</label>
                <input
                  type="date"
                  style={inputStyle}
                  name="expectedDeliveryDate"
                  value={form.expectedDeliveryDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Packaging Requirement</label>
                <select style={inputStyle} name="packagingRequirement" value={form.packagingRequirement} onChange={handleChange}>
                  <option value="Individual Poly-Pack">Individual Poly-Pack with Student Label</option>
                  <option value="Standard Carton Bulk">Standard Carton Bulk Packing</option>
                  <option value="Custom Box Packaging">Custom Branded Boxes</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Campus Delivery Address *</label>
              <input
                style={inputStyle}
                name="deliveryLocation"
                placeholder="Gate / Department / Complete institutional address with PIN code"
                value={form.deliveryLocation}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>Additional Stitching or Fabric Instructions</label>
              <textarea
                style={{ ...inputStyle, height: "70px", resize: "vertical" }}
                name="additionalRequirements"
                placeholder="e.g. Reinforced double-stitched buttons, moisture-wicking collars, side vents..."
                value={form.additionalRequirements}
                onChange={handleChange}
              />
            </div>

            {/* LIVE VOLUME SUMMARY BAR */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: "12px", padding: "16px 20px", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#1E40AF", textTransform: "uppercase" }}>Calculated Bulk Volume</span>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "#0052FF" }}>
                  {totalUnits} <span style={{ fontSize: "14px", fontWeight: 600 }}>Total Pieces</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#1E293B", display: "block" }}>
                  {form.garmentTypes.length} Garments Selected
                </span>
                <span style={{ fontSize: "12px", color: "#64748B" }}>
                  {form.fabricPreference}
                </span>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #0052FF 0%, #003ECC 100%)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "16px",
                fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0 8px 24px rgba(0, 82, 255, 0.28)"
              }}
            >
              <FaPaperPlane />
              {loading ? "Transmitting Specs to Factory..." : "Submit Bulk Order for Factory Quotation"}
            </button>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "16px", fontSize: "12px", color: "#64748B" }}>
              <span><FaShieldAlt color="#0052FF" /> Quality Checked Specs</span>
              <span>•</span>
              <span><FaPhoneAlt color="#0052FF" /> Bulk Support: +91 98765 43210</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

// STYLES
const sectionBoxStyle = {
  background: "#FFFFFF",
  borderRadius: "16px",
  border: "1.5px solid #E2E8F0",
  padding: "28px",
  marginBottom: "24px",
  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.03)"
};

const stepHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  marginBottom: "22px",
  paddingBottom: "12px",
  borderBottom: "1.5px solid #F1F5F9"
};

const stepNumberBadge = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  background: "#EFF6FF",
  color: "#0052FF",
  fontWeight: 800,
  fontSize: "17px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
};

const stepTitle = {
  margin: 0,
  fontSize: "17px",
  fontWeight: 800,
  color: "#0B192C"
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  color: "#334155",
  marginBottom: "6px"
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1.5px solid #CBD5E1",
  fontSize: "13px",
  outline: "none",
  color: "#1E293B",
  boxSizing: "border-box"
};

const fileInputStyle = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1.5px solid #CBD5E1",
  fontSize: "12px",
  background: "#F8FAFC",
  boxSizing: "border-box"
};

const badgeStyle = {
  background: "#EFF6FF",
  color: "#0052FF",
  padding: "6px 14px",
  borderRadius: "50px",
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase"
};