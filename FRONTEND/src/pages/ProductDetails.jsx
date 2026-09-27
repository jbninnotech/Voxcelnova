import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiChevronRight,
  FiChevronLeft,
  FiHeart,
  FiHome,
  FiSend,
  FiCheck,
} from "react-icons/fi";

// API
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// Product Details Sub-Components
import ProductInfo from "../components/productDetails/ProductInfo";
import ProductHighlights from "../components/productDetails/ProductHighlights";
import ProductSpecifications from "../components/productDetails/ProductSpecifications";
import SizeGuide from "../components/productDetails/SizeGuide";
import ManufacturingInfo from "../components/productDetails/ManufacturingInfo";
import ProductFAQ from "../components/productDetails/ProductFAQ";
import RelatedProducts from "../components/productDetails/RelatedProducts";

// =======================================================
// APPLE-STYLE FLOATING GALLERY WITH STICKY SUPPORT
// =======================================================
const AppleProductGallery = ({
  images = [],
  productName = "Product",
  isWishlisted = false,
  onWishlist,
  onShare,
  copied = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Normalize image data
  const formattedImages = images.length
    ? images.map((img) => (typeof img === "string" ? img : img?.url || ""))
    : ["https://placehold.co/800x1000?text=No+Image"];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % formattedImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex(
      (prev) => (prev - 1 + formattedImages.length) % formattedImages.length
    );
  };

  return (
    <div className="apple-gallery-wrap">
      {/* FLOATING CORNER ICONS (MATCHING APPLE REFERENCE) */}
      <div className="apple-floating-actions">
        <button
          type="button"
          onClick={onWishlist}
          className={`apple-circle-action ${isWishlisted ? "active-heart" : ""}`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Wishlist"
        >
          <FiHeart
            size={19}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        <button
          type="button"
          onClick={onShare}
          className="apple-circle-action"
          title="Share product link"
          aria-label="Share"
        >
          <FiSend size={17} style={{ transform: "rotate(10deg) translate(-1px, 1px)" }} />
        </button>

        {copied && <div className="apple-copy-bubble">Link Copied!</div>}
      </div>

      {/* MAIN SHOWCASE CONTAINER (APPLE SOFT GREY #F5F5F7) */}
      <div className="apple-main-stage">
        <img
          key={selectedIndex}
          src={formattedImages[selectedIndex]}
          alt={`${productName} view ${selectedIndex + 1}`}
          className="apple-showcase-img"
        />

        {/* Previous / Next Arrows */}
        {formattedImages.length > 1 && (
          <>
            <button
              type="button"
              className="apple-nav-btn prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="apple-nav-btn next"
              onClick={handleNext}
              aria-label="Next image"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}

        {/* Counter Pill */}
        {formattedImages.length > 1 && (
          <div className="apple-counter-pill">
            {selectedIndex + 1} / {formattedImages.length}
          </div>
        )}
      </div>

      {/* HORIZONTAL THUMBNAIL SELECTOR STRIP */}
      {formattedImages.length > 1 && (
        <div className="apple-thumbnails-strip">
          {formattedImages.map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`apple-thumb-card ${selectedIndex === idx ? "active" : ""}`}
            >
              <img src={imgUrl} alt={`Thumb ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// =======================================================
// MAIN COMPONENT
// =======================================================
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Global Cart + Wishlist
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Product & UI States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [toastMessage, setToastMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getProductById(id);
        const fetchedProduct =
          response?.product || response?.data || response;

        if (!fetchedProduct?._id) throw new Error("Product not found");

        setProduct(fetchedProduct);
        setSelectedSize("");
        setSelectedColor("");

        const minOrder = Number(fetchedProduct.minimumOrderQuantity || 1);
        setQuantity(minOrder > 0 ? minOrder : 1);
      } catch (err) {
        setError(
          err?.response?.data?.message || err.message || "Unable to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      window.clearTimeout(window.__voxcelProductToastTimer);
    };
  }, [id]);

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(window.__voxcelProductToastTimer);
    window.__voxcelProductToastTimer = window.setTimeout(() => {
      setToastMessage("");
    }, 3500);
  };

  const handleAddToCart = ({
    product: selectedProduct,
    size,
    color,
    quantity: selectedQuantity,
  }) => {
    if (!selectedProduct?._id) return;

    try {
      addToCart({
        product: selectedProduct,
        size: size || "",
        color: color || "",
        quantity: Number(selectedQuantity) || 1,
      });

      showToast(`${selectedProduct.name} added to cart`);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err?.message || "Unable to add product to cart.");
    }
  };

  const handleBuyNow = ({
    product: selectedProduct,
    size,
    color,
    quantity: selectedQuantity,
  }) => {
    if (!selectedProduct?._id) return;

    if (selectedProduct.sizes?.length > 0 && !size) {
      alert("Please select a size before proceeding with Buy Now.");
      return;
    }

    const qty = Number(selectedQuantity) || 1;
    const stock = Number(selectedProduct.stock ?? 999);
    if (stock <= 0) {
      alert("This product is currently out of stock.");
      return;
    }
    if (qty > stock) {
      alert(`Only ${stock} item(s) available in stock.`);
      return;
    }

    const selectedPrice =
      selectedProduct.salePrice !== null &&
      selectedProduct.salePrice !== undefined &&
      Number(selectedProduct.salePrice) > 0
        ? Number(selectedProduct.salePrice)
        : Number(selectedProduct.price) || 0;

    const buyNowItem = {
      productId: selectedProduct._id,
      productName: selectedProduct.name,
      image:
        selectedProduct.thumbnail ||
        selectedProduct.images?.[0]?.url ||
        (typeof selectedProduct.images?.[0] === "string"
          ? selectedProduct.images[0]
          : ""),
      selectedSize: size || "",
      color: color || "",
      quantity: qty,
      price: selectedPrice,
      subtotal: selectedPrice * qty,
    };

    sessionStorage.setItem("buyNowCheckout", JSON.stringify(buyNowItem));

    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { fromBuyNow: true } });
    } else {
      navigate("/checkout");
    }
  };

  const handleWishlist = () => {
    if (!product?._id) return;

    const alreadyWishlisted = isInWishlist(product._id);
    toggleWishlist(product);

    showToast(
      alreadyWishlisted
        ? "Removed from wishlist"
        : `${product.name} added to wishlist`
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          url: window.location.href,
        });
      } catch (e) {
        /* dismissed */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center">
        <h3>Product Not Found</h3>
        <p className="text-muted">{error}</p>
        <Link to="/products" className="btn btn-dark">Browse All Products</Link>
      </div>
    );
  }

  const categoryName = product.category || "Collection";
  const categorySlug =
    product.categorySlug || String(categoryName).toLowerCase().replace(/\s+/g, "-");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "manufacturing", label: "Manufacturing" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="product-page-root">
      {/* ================= SCOPED CSS ================= */}
      <style>{`
        .product-page-root {
          background-color: #FAFAFC;
          color: #0F172A;
        }

        /* STICKY LEFT GALLERY COLUMN */
        .sticky-gallery-column {
          position: -webkit-sticky;
          position: sticky;
          top: 85px; /* Offset below your top navigation bar */
          align-self: flex-start; /* CRITICAL: Prevents stretching with right column */
          height: fit-content;
          z-index: 10;
        }

        @media (max-width: 991px) {
          .sticky-gallery-column {
            position: relative;
            top: 0;
          }
        }

        /* APPLE GALLERY STYLING */
        .apple-gallery-wrap {
          position: relative;
          width: 100%;
        }

        .apple-floating-actions {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .apple-circle-action {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1E293B;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .apple-circle-action:hover {
          background: #FFFFFF;
          transform: translateY(-2px) scale(1.05);
          color: #0F172A;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
        }

        .apple-circle-action.active-heart {
          color: #E11D48;
          background: #FFF1F2;
        }

        .apple-copy-bubble {
          position: absolute;
          right: 50px;
          top: 52px;
          background: #0F172A;
          color: #FFFFFF;
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 20px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .apple-main-stage {
          position: relative;
          background: #F5F5F7; /* Apple signature grey card */
          border-radius: 24px;
          overflow: hidden;
          width: 100%;
          height: 520px;
          max-height: calc(100vh - 170px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .apple-showcase-img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* High-end product showcase */
          padding: 24px;
          transition: transform 0.3s ease;
        }

        .apple-showcase-img:hover {
          transform: scale(1.03);
        }

        .apple-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0,0,0,0.06);
          color: #1E293B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          transition: all 0.2s ease;
          z-index: 5;
        }
        .apple-nav-btn:hover {
          background: #FFFFFF;
          transform: translateY(-50%) scale(1.08);
        }
        .apple-nav-btn.prev { left: 14px; }
        .apple-nav-btn.next { right: 14px; }

        .apple-counter-pill {
          position: absolute;
          bottom: 14px;
          right: 16px;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 50px;
        }

        /* Thumbnails Strip */
        .apple-thumbnails-strip {
          display: flex;
          gap: 12px;
          margin-top: 14px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .apple-thumb-card {
          width: 70px;
          height: 70px;
          border-radius: 14px;
          background: #F5F5F7;
          border: 2px solid transparent;
          overflow: hidden;
          padding: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .apple-thumb-card img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .apple-thumb-card.active {
          border-color: #0F172A;
          background: #FFFFFF;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        /* Toast Alert */
        .cart-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          background: #0F172A;
          color: #FFFFFF;
          border-radius: 12px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* ================= BREADCRUMBS ================= */}
      <div className="bg-white border-bottom py-3">
        <div className="container">
          <div className="d-flex align-items-center flex-wrap gap-2 small">
            <Link to="/" className="text-muted text-decoration-none d-flex align-items-center gap-1">
              <FiHome size={14} /> Home
            </Link>
            <FiChevronRight size={12} color="#94A3B8" />
            <Link to="/products" className="text-muted text-decoration-none">Products</Link>
            <FiChevronRight size={12} color="#94A3B8" />
            <Link to={`/products/${categorySlug}`} className="text-muted text-decoration-none">
              {categoryName}
            </Link>
            <FiChevronRight size={12} color="#94A3B8" />
            <span className="fw-bold text-dark">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ================= MAIN PRODUCT DETAIL ROW ================= */}
      <main className="container py-4 py-lg-5">
        <div className="row g-4 g-xl-5 align-items-start">
          
          {/* ===================================================
              LEFT: APPLE-STYLE FIXED / STICKY IMAGE GALLERY
          =================================================== */}
          <div className="col-12 col-lg-7 sticky-gallery-column">
            <AppleProductGallery
              images={product.images}
              productName={product.name}
              isWishlisted={isInWishlist(product?._id)}
              onWishlist={handleWishlist}
              onShare={handleShare}
              copied={copied}
            />
          </div>

          {/* ===================================================
              RIGHT: SCROLLABLE PRODUCT DETAILS & BUY ACTIONS
          =================================================== */}
          <div className="col-12 col-lg-5 ps-lg-3">
            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onBulkQuote={() =>
                alert(`Quotation request initiated for "${product.name}"`)
              }
              onSizeGuide={() => setShowSizeGuide(true)}
              isWishlisted={isInWishlist(product?._id)}
              onWishlist={handleWishlist}
            />
          </div>

        </div>
      </main>

      {/* ================= TABBED INFORMATION ================= */}
      <section className="container py-4">
        <div className="bg-white rounded-4 border p-4 p-md-5">
          <div className="d-flex gap-2 border-bottom pb-3 mb-4 overflow-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`btn btn-sm px-3 py-2 fw-semibold rounded-3 ${
                  activeTab === tab.id
                    ? "btn-dark"
                    : "btn-light text-secondary border-0"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-body">
            {activeTab === "description" && (
              <div style={{ maxWidth: "800px" }}>
                <h3 className="h5 fw-bold mb-3">About This Product</h3>
                <p className="text-secondary" style={{ lineHeight: 1.8 }}>
                  {product.description ||
                    "Expertly designed and manufactured using premium durable fabrics and materials."}
                </p>
              </div>
            )}
            {activeTab === "specifications" && <ProductSpecifications product={product} />}
            {activeTab === "manufacturing" && <ManufacturingInfo />}
            {activeTab === "faq" && <ProductFAQ />}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS & RELATED PRODUCTS */}
      <section className="container py-3">
        <ProductHighlights />
      </section>
      <section className="container py-4">
        <RelatedProducts product={product} />
      </section>

      {/* BOTTOM LINK */}
      <div className="container pb-5">
        <Link
          to={`/products/${categorySlug}`}
          className="text-decoration-none d-inline-flex align-items-center gap-2 fw-semibold text-primary"
        >
          <FiArrowLeft /> Back to {categoryName}
        </Link>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && <SizeGuide onClose={() => setShowSizeGuide(false)} />}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="cart-toast">
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#10B981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiCheck size={14} color="#fff" />
          </div>
          <span className="small">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;