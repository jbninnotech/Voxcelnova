import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const EmptyCart = () => {
  return (
    <div
      style={{
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:
          "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "#f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
          marginBottom: "20px",
          color: "#64748b",
        }}
      >
        <FaShoppingBag
          size={28}
        />
      </div>

      <h2
        style={{
          margin: "0 0 10px",
          fontSize: "25px",
          color: "#0f172a",
        }}
      >
        Your cart is empty
      </h2>

      <p
        style={{
          margin: "0 0 25px",
          color: "#64748b",
        }}
      >
        Explore our collection
        and find something you
        love.
      </p>

      <Link
        to="/products"
        style={{
          background: "#0f172a",
          color: "#ffffff",
          padding:
            "13px 24px",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "700",
          fontSize: "14px",
        }}
      >
        Explore Products
      </Link>
    </div>
  );
};

export default EmptyCart;