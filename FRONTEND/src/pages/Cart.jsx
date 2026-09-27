import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
  FiTag,
  FiCheck,
  FiX,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    deliveryCharge,
    discountAmount,
    finalTotal,
    appliedCoupon,
    removeFromCart,
    changeItemSize,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const formatPrice = (value) => {
    return Number(value || 0).toLocaleString("en-IN");
  };

  const getImage = (item) => {
    if (item?.image) return item.image;
    if (Array.isArray(item?.images)) {
      if (typeof item.images[0] === "string") return item.images[0];
      if (item.images[0]?.url) return item.images[0].url;
    }
    return "https://placehold.co/500x600?text=VOXCEL+NOVA";
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setCouponError("");
    setCouponLoading(true);

    const res = await applyCoupon(couponInput.trim());
    setCouponLoading(false);

    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F8FAFC",
          padding: "70px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            textAlign: "center",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "24px",
            padding: "70px 30px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 25px",
              borderRadius: "50%",
              background: "#EFF6FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2563EB",
            }}
          >
            <FiShoppingBag size={34} />
          </div>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "12px",
            }}
          >
            Your Cart is Empty
          </h1>

          <p
            style={{
              color: "#64748B",
              fontSize: "16px",
              marginBottom: "30px",
            }}
          >
            You haven't added any products to your cart yet.
          </p>

          <Link
            to="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#0F172A",
              color: "#FFFFFF",
              padding: "14px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Continue Shopping
            <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        padding: "45px 20px 80px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Back */}
        <Link
          to="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            color: "#475569",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: 600,
            marginBottom: "30px",
          }}
        >
          <FiArrowLeft />
          Continue Shopping
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "42px" }}>
          <h1
            style={{
              fontSize: "clamp(38px, 5vw, 60px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-2px",
              margin: 0,
            }}
          >
            Shopping Cart
          </h1>

          <p style={{ color: "#64748B", fontSize: "18px", marginTop: "8px" }}>
            Review your selected products and sizes before checkout.
          </p>
        </div>

        {/* Main Layout */}
        <div
          className="voxcel-cart-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 400px",
            gap: "30px",
            alignItems: "start",
          }}
        >
          {/* CART ITEMS */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "25px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: 750,
                    color: "#0F172A",
                  }}
                >
                  Cart Items ({cartItems.length})
                </h2>
                <div style={{ marginTop: "5px", color: "#64748B", fontSize: "13px" }}>
                  {cartCount} total unit{cartCount !== 1 ? "s" : ""}
                </div>
              </div>

              <button
                type="button"
                onClick={clearCart}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#DC2626",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Clear Cart
              </button>
            </div>

            {/* LIST */}
            <div style={{ padding: "0 30px" }}>
              {cartItems.map((item, index) => {
                const price = Number(item.price || 0);
                const quantity = Number(item.quantity || 1);
                const minimumOrderQuantity = Number(item.minimumOrderQuantity || 1);
                const stock = Number(item.stock || 999);
                const subtotal = price * quantity;
                const image = getImage(item);

                const availableSizes = Array.isArray(item.availableSizes) && item.availableSizes.length > 0
                  ? item.availableSizes
                  : ["S", "M", "L", "XL", "XXL"];

                return (
                  <div
                    key={item.cartItemId || `${item.productId}-${item.size}-${index}`}
                    style={{
                      display: "flex",
                      gap: "22px",
                      padding: "28px 0",
                      borderBottom:
                        index !== cartItems.length - 1 ? "1px solid #E2E8F0" : "none",
                    }}
                  >
                    {/* IMAGE */}
                    <div
                      style={{
                        width: "140px",
                        height: "160px",
                        flexShrink: 0,
                        borderRadius: "14px",
                        overflow: "hidden",
                        background: "#F1F5F9",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      <img
                        src={image}
                        alt={item.name || "Product"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>

                    {/* DETAILS */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "15px",
                        }}
                      >
                        <div>
                          {item.category && (
                            <div
                              style={{
                                color: "#2563EB",
                                fontSize: "11px",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                marginBottom: "4px",
                              }}
                            >
                              {item.category}
                            </div>
                          )}

                          <h3
                            style={{
                              margin: 0,
                              color: "#0F172A",
                              fontSize: "18px",
                              fontWeight: 750,
                              lineHeight: 1.35,
                            }}
                          >
                            {item.name || "Product"}
                          </h3>
                        </div>

                        {/* REMOVE BUTTON */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId || item.productId)}
                          style={{
                            width: "36px",
                            height: "36px",
                            flexShrink: 0,
                            borderRadius: "9px",
                            border: "1px solid #FECACA",
                            background: "#FEF2F2",
                            color: "#DC2626",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                          title="Remove item"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>

                      {/* SIZE SELECTOR & COLOR */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: "14px",
                          marginTop: "14px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>
                            Size:
                          </span>
                          <select
                            value={item.size || ""}
                            onChange={(e) =>
                              changeItemSize(item.cartItemId || item.productId, e.target.value)
                            }
                            style={{
                              padding: "4px 10px",
                              borderRadius: "8px",
                              border: "1px solid #CBD5E1",
                              background: "#F8FAFC",
                              color: "#0F172A",
                              fontSize: "13px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            {availableSizes.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>

                        {item.color && (
                          <span
                            style={{
                              padding: "4px 10px",
                              background: "#F8FAFC",
                              border: "1px solid #E2E8F0",
                              borderRadius: "7px",
                              fontSize: "12px",
                              color: "#475569",
                            }}
                          >
                            Color: <strong>{item.color}</strong>
                          </span>
                        )}

                        <span
                          style={{
                            fontSize: "11px",
                            color: stock > 0 ? "#16A34A" : "#DC2626",
                            fontWeight: 700,
                          }}
                        >
                          {stock > 0 ? `In Stock (${stock})` : "Out of stock"}
                        </span>
                      </div>

                      {/* QUANTITY & SUBTOTAL ROW */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "20px",
                          marginTop: "20px",
                        }}
                      >
                        {/* PRICE */}
                        <div>
                          <div style={{ color: "#64748B", fontSize: "12px" }}>Price</div>
                          <div style={{ color: "#0F172A", fontSize: "17px", fontWeight: 800 }}>
                            ₹{formatPrice(price)}
                          </div>
                        </div>

                        {/* QUANTITY CONTROLLER */}
                        <div>
                          <div style={{ color: "#64748B", fontSize: "12px", marginBottom: "4px" }}>
                            Quantity
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid #CBD5E1",
                              borderRadius: "9px",
                              overflow: "hidden",
                              background: "#FFFFFF",
                            }}
                          >
                            <button
                              type="button"
                              disabled={quantity <= minimumOrderQuantity}
                              onClick={() => decreaseQuantity(item.cartItemId || item.productId)}
                              style={{
                                width: "34px",
                                height: "34px",
                                border: "none",
                                background: "#F8FAFC",
                                color: quantity <= minimumOrderQuantity ? "#CBD5E1" : "#0F172A",
                                cursor: quantity <= minimumOrderQuantity ? "not-allowed" : "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <FiMinus size={13} />
                            </button>

                            <input
                              type="number"
                              min={minimumOrderQuantity}
                              max={stock}
                              value={quantity}
                              onChange={(e) => {
                                let val = Number(e.target.value);
                                if (val > stock) val = stock;
                                if (val < minimumOrderQuantity) val = minimumOrderQuantity;
                                updateQuantity(item.cartItemId || item.productId, val);
                              }}
                              style={{
                                width: "50px",
                                height: "34px",
                                border: "none",
                                outline: "none",
                                textAlign: "center",
                                fontWeight: 700,
                                color: "#0F172A",
                              }}
                            />

                            <button
                              type="button"
                              disabled={quantity >= stock}
                              onClick={() => increaseQuantity(item.cartItemId || item.productId)}
                              style={{
                                width: "34px",
                                height: "34px",
                                border: "none",
                                background: "#F8FAFC",
                                color: quantity >= stock ? "#CBD5E1" : "#0F172A",
                                cursor: quantity >= stock ? "not-allowed" : "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <FiPlus size={13} />
                            </button>
                          </div>
                        </div>

                        {/* SUBTOTAL */}
                        <div style={{ textAlign: "right" }}>
                          <div style={{ color: "#64748B", fontSize: "12px" }}>Subtotal</div>
                          <div style={{ color: "#0F172A", fontSize: "19px", fontWeight: 800 }}>
                            ₹{formatPrice(subtotal)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ORDER SUMMARY PANEL */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "24px",
              padding: "30px",
              position: "sticky",
              top: "25px",
            }}
          >
            <h2
              style={{
                margin: "0 0 24px",
                color: "#0F172A",
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              Order Summary
            </h2>

            {/* COUPON SECTION */}
            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#0F172A",
                  marginBottom: "8px",
                }}
              >
                <FiTag size={15} color="#2563EB" /> Have a Coupon?
              </label>

              {appliedCoupon ? (
                <div
                  style={{
                    padding: "10px 14px",
                    background: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 800, color: "#15803D", fontSize: "13px" }}>
                      {appliedCoupon.code}
                    </span>
                    <span style={{ fontSize: "12px", color: "#166534", marginLeft: "6px" }}>
                      ({appliedCoupon.description})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#DC2626",
                      cursor: "pointer",
                    }}
                    title="Remove coupon"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    placeholder="e.g. NOVA10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid #CBD5E1",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={couponLoading || !couponInput.trim()}
                    style={{
                      padding: "10px 18px",
                      background: "#0F172A",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: 700,
                      cursor: couponLoading ? "wait" : "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <div style={{ color: "#DC2626", fontSize: "12px", marginTop: "6px" }}>
                  {couponError}
                </div>
              )}
            </div>

            {/* BREAKDOWN */}
            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                  color: "#64748B",
                  fontSize: "15px",
                }}
              >
                <span>Subtotal</span>
                <strong style={{ color: "#0F172A" }}>₹{formatPrice(cartTotal)}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                  color: "#64748B",
                  fontSize: "15px",
                }}
              >
                <span>Delivery Charges</span>
                <span style={{ color: deliveryCharge === 0 ? "#16A34A" : "#0F172A", fontWeight: 700 }}>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                    color: "#16A34A",
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-₹{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div
                style={{
                  height: "1px",
                  background: "#E2E8F0",
                  margin: "18px 0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: 800, color: "#0F172A" }}>
                  Final Total
                </span>
                <span style={{ fontSize: "26px", fontWeight: 850, color: "#0F172A" }}>
                  ₹{formatPrice(finalTotal)}
                </span>
              </div>

              <Link
                to="/checkout"
                style={{
                  width: "100%",
                  minHeight: "56px",
                  borderRadius: "14px",
                  background: "#0F172A",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  fontSize: "16px",
                  fontWeight: 800,
                }}
              >
                Proceed to Checkout
                <FiArrowRight size={19} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;