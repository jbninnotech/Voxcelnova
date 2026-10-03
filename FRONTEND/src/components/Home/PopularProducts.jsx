import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaArrowRight, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { getProducts, getTrendingProducts } from "../../services/productService";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const PopularProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      let res = await getTrendingProducts();
      let list = res?.products || res?.data || res || [];

      if (!Array.isArray(list) || list.length === 0) {
        const allRes = await getProducts();
        list = allRes?.products || allRes?.data || allRes || [];
      }

      if (Array.isArray(list) && list.length > 0) {
        setProducts(list.slice(0, 4));
      } else {
        // Fallback default array if backend has no products yet
        setProducts([
          {
            _id: "prod-1",
            category: "Wovens",
            name: "Classic Oxford Poplin Shirt",
            description: "100% combed cotton, 120 GSM ultra-breathable weave.",
            price: 1499,
            salePrice: 1199,
            rating: 4.8,
            badge: "Best Seller",
            thumbnail: "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=800&q=80",
          },
          {
            _id: "prod-2",
            category: "Knits",
            name: "Cotton Jersey Crew Polo",
            description: "Single jersey, 160 GSM premium elastane blend.",
            price: 999,
            salePrice: 799,
            rating: 4.7,
            badge: "Popular",
            thumbnail: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=800&q=80",
          },
          {
            _id: "prod-3",
            category: "Denim",
            name: "Rigid Selvedge Denim Jacket",
            description: "14oz authentic ring-spun deep indigo structure.",
            price: 2999,
            salePrice: 2499,
            rating: 4.9,
            badge: "Heavy Duty",
            thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
          },
          {
            _id: "prod-4",
            category: "Technical",
            name: "Ripstop Technical Hoodie",
            description: "Water-resistant, 180 GSM tear-proof composite.",
            price: 2499,
            salePrice: 1999,
            rating: 4.6,
            badge: "Engineered",
            thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
          },
        ]);
      }
    } catch (err) {
      console.warn("Featured products fetch warning:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart({ product, quantity: 1 });
  };

  const handleToggleWishlist = (e, product) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const formatPrice = (val) => Number(val || 0).toLocaleString("en-IN");

  return (
    <section className="vw-popular-section py-5 position-relative overflow-hidden" style={{ backgroundColor: "var(--bg-main, #F4F8FE)" }}>
      <style>{`
        .vw-popular-section {
          background-color: var(--bg-main, #F4F8FE);
        }

        .vw-title {
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          font-weight: 800;
          color: var(--text-title, #071838);
          line-height: 1.2;
        }

        .vw-gradient-text {
          color: var(--color-cobalt, #0052FF);
        }

        .vw-subtitle {
          color: var(--text-body, #495E7C);
          font-size: 1rem;
          max-width: 580px;
        }

        .vw-catalog-btn {
          background: var(--bg-surface, #FFFFFF);
          border: 1px solid var(--border-subtle, rgba(0, 82, 255, 0.14));
          color: var(--color-cobalt, #0052FF);
          padding: 10px 22px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-card);
        }

        .vw-catalog-btn:hover {
          color: #FFFFFF;
          background: var(--color-cobalt, #0052FF);
          box-shadow: var(--shadow-glow);
          transform: translateY(-2px);
        }

        .vw-product-card {
          background: var(--bg-surface, #FFFFFF);
          border-radius: 18px;
          border: 1px solid var(--border-subtle, rgba(0, 82, 255, 0.14));
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.35s ease;
          box-shadow: var(--shadow-card, 0 12px 32px rgba(0, 48, 143, 0.06));
          cursor: pointer;
        }

        .vw-product-card:hover {
          transform: translateY(-8px);
          border-color: var(--border-hover, rgba(0, 212, 255, 0.60));
          box-shadow: 0 16px 36px rgba(0, 82, 255, 0.12);
        }

        .vw-img-container {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #F8FAFC;
        }

        .vw-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .vw-product-card:hover .vw-card-img {
          transform: scale(1.06);
        }

        .vw-card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--bg-badge-tint, #E8F5FE);
          border: 1px solid var(--border-subtle, rgba(0, 82, 255, 0.14));
          color: var(--color-cobalt, #0052FF);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          z-index: 2;
        }

        .vw-wishlist-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 5;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .vw-wishlist-btn:hover {
          transform: scale(1.1);
          background: #FFFFFF;
          color: #EF4444;
        }

        .vw-wishlist-btn.active {
          color: #EF4444;
          background: #FFF1F2;
        }

        .vw-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .vw-category {
          color: var(--color-cobalt, #0052FF);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 6px;
        }

        .vw-item-title {
          color: var(--text-title, #071838);
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 6px;
          line-height: 1.35;
        }

        .vw-desc {
          color: var(--text-body, #495E7C);
          font-size: 0.83rem;
          line-height: 1.5;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .vw-price-wrap {
          margin-top: auto;
          margin-bottom: 14px;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .vw-price-val {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-title, #071838);
        }

        .vw-old-price {
          color: var(--text-muted, #6B82A0);
          text-decoration: line-through;
          font-size: 0.9rem;
        }

        .vw-btn-group {
          display: flex;
          gap: 8px;
        }

        .vw-details-btn {
          flex: 1;
          background: var(--bg-badge-tint, #E8F5FE);
          border: 1px solid var(--border-subtle);
          color: var(--color-cobalt, #0052FF);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 8px 10px;
          border-radius: 8px;
          text-decoration: none;
          text-align: center;
          transition: all 0.25s ease;
        }

        .vw-details-btn:hover {
          background: var(--color-cobalt, #0052FF);
          color: #FFFFFF;
        }

        .vw-cart-btn {
          background: var(--color-cobalt, #0052FF);
          border: none;
          color: #FFFFFF;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .vw-cart-btn:hover {
          background: var(--color-cobalt-hover, #003ECC);
          box-shadow: var(--shadow-glow);
        }
      `}</style>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
          <div>
            <span
              className="badge px-3 py-2 text-uppercase mb-2"
              style={{
                backgroundColor: "var(--bg-badge-tint, #E8F5FE)",
                color: "var(--color-cobalt, #0052FF)",
                letterSpacing: "1.2px",
                fontWeight: "700",
                fontSize: "11px",
                borderRadius: "8px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              FEATURED COLLECTION
            </span>

            <h2 className="vw-title mb-2">
              Popular <span className="vw-gradient-text">This Season</span>
            </h2>

            <p className="vw-subtitle mb-0">
              High-tensile, industrial-spec fabrics engineered for longevity and exceptional finish.
            </p>
          </div>

          <Link to="/products" className="vw-catalog-btn">
            <span>View Full Catalog</span>
            <FaArrowRight style={{ fontSize: "0.8rem" }} />
          </Link>
        </div>

        {/* Product Cards Row */}
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="small text-secondary mt-2">Loading featured products...</p>
            </div>
          ) : (
            products.map((product) => {
              const isWish = isInWishlist(product._id);
              const imgUrl =
                product.thumbnail ||
                product.images?.[0]?.url ||
                (typeof product.images?.[0] === "string" ? product.images[0] : "") ||
                "https://placehold.co/600x800?text=Apparel";

              const finalPrice =
                product.salePrice && Number(product.salePrice) > 0
                  ? Number(product.salePrice)
                  : Number(product.price || 0);

              const originalPrice = Number(product.price || 0);

              return (
                <div className="col-12 col-sm-6 col-lg-3" key={product._id}>
                  <div
                    className="vw-product-card"
                    onClick={() => navigate(`/products/${product._id}`)}
                    onMouseEnter={() => setHoveredCard(product._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Image frame */}
                    <div className="vw-img-container">
                      <span className="vw-card-badge">{product.category || product.badge || "Featured"}</span>

                      <button
                        type="button"
                        onClick={(e) => handleToggleWishlist(e, product)}
                        className={`vw-wishlist-btn ${isWish ? "active" : ""}`}
                        title={isWish ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        {isWish ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
                      </button>

                      <img
                        src={imgUrl}
                        alt={product.name}
                        className="vw-card-img"
                        loading="lazy"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="vw-card-body">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="vw-category">{product.category || "Apparel"}</div>
                        <div className="d-flex align-items-center gap-1 text-warning small fw-bold">
                          <FaStar size={12} /> {product.rating || 4.8}
                        </div>
                      </div>

                      <h3 className="vw-item-title">{product.name}</h3>
                      <p className="vw-desc">{product.description}</p>

                      {/* Price Row */}
                      <div className="vw-price-wrap">
                        <span className="vw-price-val">₹{formatPrice(finalPrice)}</span>
                        {product.salePrice > 0 && originalPrice > finalPrice && (
                          <span className="vw-old-price">₹{formatPrice(originalPrice)}</span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="vw-btn-group">
                        <Link
                          to={`/products/${product._id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="vw-details-btn"
                        >
                          Details
                        </Link>

                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, product)}
                          className="vw-cart-btn"
                          title="Add to Cart"
                        >
                          <FaShoppingCart style={{ fontSize: "0.8rem" }} />
                          <span>Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;