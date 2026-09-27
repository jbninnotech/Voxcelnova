import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const EmptyWishlist = () => {
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
          background: "#fff1f2",
          color: "#dc2626",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
          marginBottom: "20px",
        }}
      >
        <FaHeart size={28} />
      </div>

      <h2
        style={{
          margin:
            "0 0 10px",
          fontSize: "25px",
          color: "#0f172a",
        }}
      >
        Your wishlist is empty
      </h2>

      <p
        style={{
          margin:
            "0 0 25px",
          color: "#64748b",
        }}
      >
        Save your favorite
        products here for
        later.
      </p>

      <Link
        to="/products"
        style={{
          background: "#0f172a",
          color: "#ffffff",
          padding:
            "13px 24px",
          borderRadius: "10px",
          textDecoration:
            "none",
          fontWeight: "700",
          fontSize: "14px",
        }}
      >
        Explore Products
      </Link>
    </div>
  );
};

export default EmptyWishlist;