import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const {
    cartItems,
    cartTotal,
  } = useCart();

  const totalQuantity =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );

  return (
    <div
      style={{
        background: "#ffffff",
        border:
          "1px solid #e5e7eb",
        borderRadius: "20px",
        padding: "24px",
        position: "sticky",
        top: "30px",
      }}
    >
      <h2
        style={{
          margin: "0 0 22px",
          fontSize: "21px",
          fontWeight: "800",
          color: "#0f172a",
        }}
      >
        Order Summary
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: "14px",
          color: "#64748b",
        }}
      >
        <span>
          Items
        </span>

        <span>
          {totalQuantity}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: "14px",
          color: "#64748b",
        }}
      >
        <span>
          Subtotal
        </span>

        <span>
          ₹
          {cartTotal.toLocaleString(
            "en-IN"
          )}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: "20px",
          color: "#64748b",
        }}
      >
        <span>
          Shipping
        </span>

        <span>
          Calculated at checkout
        </span>
      </div>

      <div
        style={{
          borderTop:
            "1px solid #e5e7eb",
          paddingTop: "18px",
          marginBottom: "20px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <strong
          style={{
            fontSize: "18px",
            color: "#0f172a",
          }}
        >
          Total
        </strong>

        <strong
          style={{
            fontSize: "22px",
            color: "#0f172a",
          }}
        >
          ₹
          {cartTotal.toLocaleString(
            "en-IN"
          )}
        </strong>
      </div>

      <Link
        to="/checkout"
        style={{
          width: "100%",
          minHeight: "50px",
          borderRadius: "12px",
          background: "#0f172a",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
          gap: "9px",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: "700",
        }}
      >
        Proceed to Checkout
        <FaArrowRight size={12} />
      </Link>
    </div>
  );
};

export default CartSummary;