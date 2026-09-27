import React, { useEffect, useState } from "react";
import {
  FiHeart,
  FiTrash2,
  FiShoppingBag,
  FiAlertCircle,
} from "react-icons/fi";

import {
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getWishlist();
      setWishlist(data.wishlist || []);
    } catch (err) {
      setError(err.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);
      await removeFromWishlist(productId);
      setWishlist((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (err) {
      setError(err.message || "Failed to remove item");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <>
      {/* Keyframe animations and interactive hover effects */}
      <style>{`
        @keyframes fadeInCard {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseEmptyIcon {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        .wishlist-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 16px;
        }

        .wishlist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(7, 26, 47, 0.1) !important;
        }

        .wishlist-img-wrapper img {
          transition: transform 0.4s ease;
        }

        .wishlist-card:hover .wishlist-img-wrapper img {
          transform: scale(1.06);
        }

        .trash-btn {
          transition: all 0.2s ease-in-out;
        }

        .trash-btn:hover {
          background-color: #EF4444 !important;
          color: #ffffff !important;
          transform: scale(1.1);
        }
      `}</style>

      <div>
        {/* Header Section */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-3 mb-4 border-bottom">
          <div>
            <span
              className="text-uppercase fw-bold"
              style={{
                fontSize: "11px",
                letterSpacing: "1.4px",
                color: "#123F63",
              }}
            >
              COLLECTION
            </span>
            <h3 className="fw-bold mb-1" style={{ color: "#071A2F" }}>
              My Wishlist
            </h3>
            <p className="text-secondary small mb-0">
              Products you have saved for later.
            </p>
          </div>

          {/* Item Count Badge */}
          <div
            className="d-inline-flex align-items-center gap-2 px-3 py-2"
            style={{
              backgroundColor: "rgba(18, 63, 99, 0.08)",
              color: "#123F63",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "13px",
            }}
          >
            <FiHeart size={16} />
            <span>
              {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className="alert alert-danger d-flex align-items-center gap-2 border-0 shadow-sm"
            role="alert"
            style={{ borderRadius: "12px" }}
          >
            <FiAlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Loading Spinner State */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              role="status"
              style={{ color: "#123F63", width: "2.8rem", height: "2.8rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mt-3 small">Loading your wishlist...</p>
          </div>
        ) : wishlist.length === 0 ? (
          /* Empty State */
          <div
            className="text-center py-5 px-3"
            style={{
              borderRadius: "16px",
              backgroundColor: "#F8FAFC",
              border: "1px dashed #CBD5E1",
              animation: "fadeInCard 0.3s ease-out",
            }}
          >
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "rgba(18, 63, 99, 0.08)",
                color: "#123F63",
                animation: "pulseEmptyIcon 2.5s ease-in-out infinite",
              }}
            >
              <FiHeart size={32} />
            </div>
            <h5 className="fw-bold mb-1" style={{ color: "#071A2F" }}>
              Your wishlist is empty
            </h5>
            <p className="text-secondary small mb-0">
              Save your favorite clothing products here while shopping.
            </p>
          </div>
        ) : (
          /* Product Grid */
          <div className="row g-3 g-md-4">
            {wishlist.map((product, index) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-lg-4"
                style={{
                  animation: `fadeInCard 0.35s ease-out forwards ${index * 0.06}s`,
                }}
              >
                <div
                  className="card h-100 border-0 shadow-sm wishlist-card overflow-hidden"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  {/* Image Container with Floating Action */}
                  <div
                    className="position-relative overflow-hidden wishlist-img-wrapper"
                    style={{
                      height: "240px",
                      backgroundColor: "#F1F5F9",
                    }}
                  >
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-100 h-100 object-fit-cover"
                      />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                        <FiShoppingBag size={40} style={{ opacity: 0.35 }} />
                      </div>
                    )}

                    {/* Delete Floating Button */}
                    <button
                      type="button"
                      className="trash-btn btn btn-light border-0 shadow-sm position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(4px)",
                        color: "#64748B",
                        zIndex: 2,
                      }}
                      title="Remove from wishlist"
                      disabled={removingId === product._id}
                      onClick={() => handleRemove(product._id)}
                    >
                      {removingId === product._id ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                        />
                      ) : (
                        <FiTrash2 size={16} />
                      )}
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <div>
                      {product.category && (
                        <span
                          className="text-uppercase fw-semibold"
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.5px",
                            color: "#64748B",
                          }}
                        >
                          {product.category}
                        </span>
                      )}

                      <h6
                        className="fw-bold text-truncate mt-1 mb-2"
                        style={{ color: "#0F2942" }}
                        title={product.name}
                      >
                        {product.name}
                      </h6>
                    </div>

                    <div className="pt-2 border-top d-flex justify-content-between align-items-center mt-2">
                      <div
                        className="fw-bold"
                        style={{
                          fontSize: "17px",
                          color: "#123F63",
                        }}
                      >
                        ₹{Number(product.price || 0).toLocaleString("en-IN")}
                      </div>

                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#ECFDF5",
                          color: "#059669",
                          fontSize: "11px",
                          fontWeight: "600",
                          borderRadius: "6px",
                          padding: "5px 8px",
                        }}
                      >
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;