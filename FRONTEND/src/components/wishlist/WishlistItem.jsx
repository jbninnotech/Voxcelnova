import React from "react";
import {
  FaHeart,
  FaShoppingBag,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const WishlistItem = ({
  product,
}) => {
  const {
    removeFromWishlist,
  } = useWishlist();

  const {
    addToCart,
  } = useCart();

  const image =
    product.thumbnail ||
    product.images?.[0]?.url ||
    product.images?.[0] ||
    "";

  const price =
    Number(product.price) || 0;

  const salePrice =
    product.salePrice !== null &&
    product.salePrice !== undefined
      ? Number(product.salePrice)
      : null;

  const displayPrice =
    salePrice &&
    salePrice > 0 &&
    salePrice < price
      ? salePrice
      : price;

  return (
    <div
      style={{
        background: "#ffffff",
        border:
          "1px solid #e5e7eb",
        borderRadius: "18px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "280px",
          position: "relative",
          background: "#f1f5f9",
        }}
      >
        <Link
          to={`/products/product/${product._id}`}
        >
          {image ? (
            <img
              src={image}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                color: "#94a3b8",
              }}
            >
              No Image
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={() =>
            removeFromWishlist(
              product._id
            )
          }
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            background:
              "#ffffff",
            color: "#dc2626",
            cursor: "pointer",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
          }}
        >
          <FaHeart
            size={16}
          />
        </button>
      </div>

      <div
        style={{
          padding: "20px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: "#64748b",
            fontWeight: "700",
            textTransform:
              "uppercase",
            marginBottom: "6px",
          }}
        >
          {product.category}
        </div>

        <Link
          to={`/products/product/${product._id}`}
          style={{
            textDecoration:
              "none",
            color: "#0f172a",
          }}
        >
          <h3
            style={{
              margin:
                "0 0 10px",
              fontSize: "17px",
              fontWeight: "750",
            }}
          >
            {product.name}
          </h3>
        </Link>

        <div
          style={{
            fontSize: "19px",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom:
              "15px",
          }}
        >
          ₹
          {displayPrice.toLocaleString(
            "en-IN"
          )}
        </div>

        <Link
          to={`/products/product/${product._id}`}
          style={{
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            gap: "8px",
            minHeight: "44px",
            borderRadius: "10px",
            background:
              "#0f172a",
            color: "#ffffff",
            textDecoration:
              "none",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          <FaShoppingBag
            size={13}
          />
          View Product
        </Link>
      </div>
    </div>
  );
};

export default WishlistItem;