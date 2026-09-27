import React from "react";
import { Link } from "react-router-dom";
import WishlistItem from "../components/wishlist/WishlistItem";
import EmptyWishlist from "../components/wishlist/EmptyWishlist";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const {
    wishlistItems,
    clearWishlist,
  } = useWishlist();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding:
          "55px 20px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/products"
          style={{
            textDecoration:
              "none",
            color: "#64748b",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          ← Continue Shopping
        </Link>

        <div
          style={{
            margin:
              "15px 0 35px",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "flex-end",
            gap: "20px",
          }}
        >
          <div>
            <h1
              style={{
                margin:
                  "0 0 5px",
                fontSize:
                  "clamp(30px, 5vw, 44px)",
                fontWeight: "900",
                color:
                  "#0f172a",
              }}
            >
              My Wishlist
            </h1>

            <p
              style={{
                margin: 0,
                color:
                  "#64748b",
              }}
            >
              Your favorite
              VOXCEL NOVA
              products.
            </p>
          </div>

          {wishlistItems.length >
            0 && (
            <button
              type="button"
              onClick={
                clearWishlist
              }
              style={{
                border:
                  "none",
                background:
                  "transparent",
                color:
                  "#dc2626",
                cursor:
                  "pointer",
                fontWeight:
                  "700",
                fontSize:
                  "13px",
              }}
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistItems.length ===
        0 ? (
          <EmptyWishlist />
        ) : (
          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: "24px",
            }}
            className="wishlist-grid"
          >
            {wishlistItems.map(
              (product) => (
                <WishlistItem
                  key={
                    product._id
                  }
                  product={
                    product
                  }
                />
              )
            )}
          </div>
        )}
      </div>

      <style>
        {`
          @media (max-width: 1000px) {
            .wishlist-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 700px) {
            .wishlist-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 480px) {
            .wishlist-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Wishlist;