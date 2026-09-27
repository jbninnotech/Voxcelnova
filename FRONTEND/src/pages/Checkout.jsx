import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiPlus,
  FiCheckCircle,
  FiTag,
  FiCreditCard,
  FiTruck,
  FiShoppingBag,
  FiShield,
  FiX,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { getAddresses, addAddress } from "../services/addressService";
import { createOrder, validateCouponApi } from "../services/orderService";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  // Addresses state
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  // New Address Form
  const [newAddr, setNewAddr] = useState({
    fullName: "",
    phone: "",
    houseFlat: "",
    street: "",
    area: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    addressType: "Home",
  });
  const [savingAddr, setSavingAddr] = useState(false);

  // Items to checkout (Buy Now item or Cart items)
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [isBuyNow, setIsBuyNow] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Order submission
  const [placingOrder, setPlacingOrder] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Initialize checkout items
  useEffect(() => {
    const buyNowData = sessionStorage.getItem("buyNowCheckout");
    if (buyNowData) {
      try {
        const item = JSON.parse(buyNowData);
        setCheckoutItems([item]);
        setIsBuyNow(true);
      } catch (err) {
        console.error("Invalid buy now state", err);
      }
    } else if (cartItems && cartItems.length > 0) {
      const items = cartItems.map((ci) => ({
        productId: ci.productId,
        productName: ci.name,
        image: ci.image,
        selectedSize: ci.size,
        color: ci.color,
        quantity: ci.quantity,
        price: ci.price,
        subtotal: ci.price * ci.quantity,
      }));
      setCheckoutItems(items);
      setIsBuyNow(false);
    } else {
      setCheckoutItems([]);
    }
  }, [cartItems]);

  // Load user saved addresses
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const data = await getAddresses();
      const list = data.addresses || [];
      setAddresses(list);
      if (list.length > 0) {
        const defaultAddr = list.find((a) => a.isDefault) || list[0];
        setSelectedAddressId(defaultAddr._id);
      }
    } catch (err) {
      console.error("Error loading addresses", err);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      setSavingAddr(true);
      const created = await addAddress({
        fullName: newAddr.fullName,
        phone: newAddr.phone,
        addressLine1: newAddr.houseFlat,
        addressLine2: newAddr.street,
        landmark: newAddr.area,
        city: newAddr.city,
        state: newAddr.state,
        postalCode: newAddr.pincode,
        country: newAddr.country,
        addressType: newAddr.addressType,
      });

      setShowAddAddressModal(false);
      setNewAddr({
        fullName: "",
        phone: "",
        houseFlat: "",
        street: "",
        area: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
        addressType: "Home",
      });

      await fetchAddresses();
      if (created?.address?._id) {
        setSelectedAddressId(created.address._id);
      }
    } catch (err) {
      alert(err.message || "Failed to save address");
    } finally {
      setSavingAddr(false);
    }
  };

  // Subtotal & Calculations
  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.subtotal || item.price * item.quantity), 0);
  const deliveryCharge = appliedCoupon?.code === "FREESHIP" ? 0 : subtotal > 1000 || subtotal === 0 ? 0 : 99;
  const discountAmount = appliedCoupon?.discount || 0;
  const totalAmount = Math.max(0, subtotal + deliveryCharge - discountAmount);

  // Apply Coupon
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    try {
      setCouponError("");
      setCouponLoading(true);
      const res = await validateCouponApi(couponCode.trim(), subtotal);
      setAppliedCoupon(res.coupon);
      setCouponCode("");
    } catch (err) {
      setCouponError(err.message || "Invalid coupon code.");
    } finally {
      setCouponLoading(false);
    }
  };

  // Place Order
  const handleProceedToPayment = async () => {
    setErrorMsg("");

    const selectedAddr = addresses.find((a) => a._id === selectedAddressId);
    if (!selectedAddr) {
      setErrorMsg("Please select a delivery address to proceed.");
      return;
    }

    if (!checkoutItems || checkoutItems.length === 0) {
      setErrorMsg("No items to checkout.");
      return;
    }

    try {
      setPlacingOrder(true);
      const orderPayload = {
        items: checkoutItems.map((item) => ({
          product: item.productId,
          productName: item.productName,
          image: item.image,
          selectedSize: item.selectedSize || item.size || "",
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal || item.price * item.quantity,
        })),
        shippingAddress: {
          fullName: selectedAddr.fullName,
          phone: selectedAddr.phone,
          houseFlat: selectedAddr.addressLine1 || selectedAddr.houseFlat || "",
          street: selectedAddr.addressLine2 || selectedAddr.street || "",
          area: selectedAddr.landmark || selectedAddr.area || "",
          city: selectedAddr.city,
          state: selectedAddr.state,
          country: selectedAddr.country || "India",
          pincode: selectedAddr.postalCode || selectedAddr.pincode,
          addressType: selectedAddr.addressType || "Home",
        },
        subtotal,
        deliveryCharge,
        discount: discountAmount,
        totalAmount,
        paymentMethod,
      };

      const res = await createOrder(orderPayload);
      if (res.success && res.order?._id) {
        if (isBuyNow) {
          sessionStorage.removeItem("buyNowCheckout");
        } else {
          clearCart();
        }
        navigate(`/order/${res.order._id}`);
      }
    } catch (err) {
      setErrorMsg(err.message || "Order creation failed. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!checkoutItems || checkoutItems.length === 0) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "70vh" }}>
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center text-primary"
          style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#EFF6FF" }}
        >
          <FiShoppingBag size={32} />
        </div>
        <h3 className="fw-bold" style={{ color: "#071A2F" }}>Your Checkout is Empty</h3>
        <p className="text-secondary mb-4">Please add products to your cart or choose Buy Now on a product.</p>
        <Link to="/products" className="btn btn-dark px-4 py-2 fw-semibold">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* BACK BUTTON & HEADER */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-link text-decoration-none p-0 text-secondary mb-3 d-inline-flex align-items-center gap-2 fw-semibold"
        >
          <FiArrowLeft /> Back
        </button>

        <h1 className="fw-bold mb-4" style={{ color: "#071A2F", fontSize: "34px" }}>
          Checkout {isBuyNow && <span className="badge bg-primary fs-6 ms-2">Direct Buy Now</span>}
        </h1>

        {errorMsg && (
          <div className="alert alert-danger py-3 px-4 mb-4 rounded-3" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="row g-4">
          {/* LEFT COLUMN: SECTIONS 1, 2 & 5 */}
          <div className="col-12 col-lg-7">
            {/* SECTION 1 — DELIVERY ADDRESS */}
            <div className="bg-white border rounded-4 p-4 mb-4 shadow-sm">
              <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3">
                <h5 className="fw-bold m-0 d-flex align-items-center gap-2" style={{ color: "#071A2F" }}>
                  <FiMapPin color="#2563EB" /> Section 1 — Delivery Address
                </h5>
                <button
                  type="button"
                  onClick={() => setShowAddAddressModal(true)}
                  className="btn btn-outline-primary btn-sm rounded-3 fw-bold d-inline-flex align-items-center gap-1"
                >
                  <FiPlus size={16} /> Add New Address
                </button>
              </div>

              {loadingAddresses ? (
                <div className="text-center py-3 text-secondary">Loading addresses...</div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-4 border rounded-3 bg-light">
                  <p className="text-secondary small mb-2">No saved address found.</p>
                  <button
                    type="button"
                    onClick={() => setShowAddAddressModal(true)}
                    className="btn btn-primary btn-sm fw-bold"
                  >
                    + Add Address Now
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddressId === addr._id;
                    return (
                      <div
                        key={addr._id}
                        onClick={() => setSelectedAddressId(addr._id)}
                        className={`p-3 rounded-3 border cursor-pointer ${
                          isSelected ? "border-primary bg-primary-subtle" : "bg-white"
                        }`}
                        style={{
                          cursor: "pointer",
                          borderColor: isSelected ? "#2563EB" : "#E2E8F0",
                          backgroundColor: isSelected ? "#EFF6FF" : "#FFFFFF",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <div className="fw-bold text-dark">{addr.fullName}</div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-secondary text-uppercase">{addr.addressType || "Home"}</span>
                            {isSelected && <FiCheckCircle color="#2563EB" size={18} />}
                          </div>
                        </div>
                        <div className="small text-secondary mb-1">Phone: {addr.phone}</div>
                        <div className="small text-secondary">
                          {addr.addressLine1 || addr.houseFlat}, {addr.addressLine2 || addr.street},{" "}
                          {addr.city}, {addr.state} - <strong>{addr.postalCode || addr.pincode}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SECTION 2 — ORDER SUMMARY */}
            <div className="bg-white border rounded-4 p-4 mb-4 shadow-sm">
              <h5 className="fw-bold mb-3 border-bottom pb-3" style={{ color: "#071A2F" }}>
                Section 2 — Order Summary ({checkoutItems.length} Item{checkoutItems.length > 1 ? "s" : ""})
              </h5>

              <div className="d-flex flex-column gap-3">
                {checkoutItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-center justify-content-between gap-3 pb-3 border-bottom"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image || "https://placehold.co/120x150?text=Product"}
                        alt={item.productName}
                        style={{
                          width: "70px",
                          height: "85px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          background: "#F1F5F9",
                          border: "1px solid #E2E8F0",
                        }}
                      />
                      <div>
                        <h6 className="fw-bold mb-1 text-dark">{item.productName}</h6>
                        <div className="text-secondary small">
                          Size: <strong>{item.selectedSize || "N/A"}</strong> | Qty: <strong>{item.quantity}</strong>
                        </div>
                        <div className="fw-bold text-primary mt-1">₹{item.price?.toLocaleString("en-IN")}</div>
                      </div>
                    </div>

                    <div className="text-end">
                      <div className="text-muted small">Subtotal</div>
                      <div className="fw-bold text-dark fs-5">
                        ₹{(item.subtotal || item.price * item.quantity)?.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5 — PAYMENT METHOD */}
            <div className="bg-white border rounded-4 p-4 mb-4 shadow-sm">
              <h5 className="fw-bold mb-3 border-bottom pb-3 d-flex align-items-center gap-2" style={{ color: "#071A2F" }}>
                <FiCreditCard color="#2563EB" /> Section 5 — Payment Method
              </h5>

              <div className="row g-3">
                {[
                  { id: "UPI", label: "UPI (Google Pay, PhonePe, Paytm)", icon: "📱" },
                  { id: "Credit Card", label: "Credit Card", icon: "💳" },
                  { id: "Debit Card", label: "Debit Card", icon: "💳" },
                  { id: "Net Banking", label: "Net Banking", icon: "🏦" },
                  { id: "Wallets", label: "Wallets", icon: "👛" },
                  { id: "Cash on Delivery", label: "Cash on Delivery (COD)", icon: "💵" },
                ].map((pm) => (
                  <div key={pm.id} className="col-12 col-md-6">
                    <div
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-3 rounded-3 border d-flex align-items-center gap-3 cursor-pointer ${
                        paymentMethod === pm.id ? "border-primary bg-primary-subtle" : "bg-white"
                      }`}
                      style={{
                        cursor: "pointer",
                        borderColor: paymentMethod === pm.id ? "#2563EB" : "#CBD5E1",
                        backgroundColor: paymentMethod === pm.id ? "#EFF6FF" : "#FFFFFF",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span className="fs-4">{pm.icon}</span>
                      <div className="fw-bold text-dark small flex-grow-1">{pm.label}</div>
                      {paymentMethod === pm.id && <FiCheckCircle color="#2563EB" size={18} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SECTIONS 3 & 4 */}
          <div className="col-12 col-lg-5">
            {/* SECTION 3 — COUPON */}
            <div className="bg-white border rounded-4 p-4 mb-4 shadow-sm">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#071A2F" }}>
                <FiTag color="#2563EB" /> Section 3 — Coupon
              </h5>

              {appliedCoupon ? (
                <div className="p-3 bg-success-subtle border border-success rounded-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fw-bold text-success">{appliedCoupon.code}</span>
                    <small className="d-block text-success-emphasis">{appliedCoupon.description}</small>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="btn btn-sm btn-link text-danger text-decoration-none"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="d-flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (e.g. NOVA10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="form-control rounded-3"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading || !couponCode.trim()}
                    className="btn btn-dark fw-bold px-3 rounded-3"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && <div className="text-danger small mt-2">{couponError}</div>}
            </div>

            {/* SECTION 4 — DELIVERY BREAKDOWN & PROCEED BUTTON */}
            <div className="bg-white border rounded-4 p-4 mb-4 shadow-sm position-sticky" style={{ top: "25px" }}>
              <h5 className="fw-bold mb-3 border-bottom pb-3" style={{ color: "#071A2F" }}>
                Section 4 — Delivery Breakdown
              </h5>

              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Subtotal</span>
                <strong className="text-dark">₹{subtotal.toLocaleString("en-IN")}</strong>
              </div>

              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Delivery Charge</span>
                <strong className={deliveryCharge === 0 ? "text-success" : "text-dark"}>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </strong>
              </div>

              {discountAmount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success fw-bold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <hr className="my-3" />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold fs-5" style={{ color: "#071A2F" }}>Total Amount</span>
                <span className="fw-bold fs-3" style={{ color: "#071A2F" }}>
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>

              {/* PRIMARY PROCEED BUTTON */}
              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={placingOrder}
                className="btn btn-primary w-100 py-3 fw-bold rounded-3 fs-5 shadow-sm d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: "#123F63", borderColor: "#123F63" }}
              >
                {placingOrder ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <FiShield size={22} />
                    <span>PROCEED TO PAYMENT</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ADD ADDRESS MODAL */}
      {showAddAddressModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold">Add New Delivery Address</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddAddressModal(false)}
                />
              </div>

              <form onSubmit={handleSaveAddress}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold">Phone</label>
                      <input
                        type="text"
                        required
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold">House / Flat No.</label>
                      <input
                        type="text"
                        required
                        value={newAddr.houseFlat}
                        onChange={(e) => setNewAddr({ ...newAddr, houseFlat: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold">Street / Road</label>
                      <input
                        type="text"
                        value={newAddr.street}
                        onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold">Area / Landmark</label>
                      <input
                        type="text"
                        value={newAddr.area}
                        onChange={(e) => setNewAddr({ ...newAddr, area: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold">City</label>
                      <input
                        type="text"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold">State</label>
                      <input
                        type="text"
                        required
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold">Pincode</label>
                      <input
                        type="text"
                        required
                        value={newAddr.pincode}
                        onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Address Type</label>
                      <select
                        value={newAddr.addressType}
                        onChange={(e) => setNewAddr({ ...newAddr, addressType: e.target.value })}
                        className="form-select"
                      >
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top">
                  <button
                    type="button"
                    className="btn btn-light border"
                    onClick={() => setShowAddAddressModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingAddr}
                    className="btn btn-primary fw-bold"
                  >
                    {savingAddr ? "Saving..." : "Save Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
