import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaLayerGroup,
  FaWarehouse,
  FaPlus,
  FaArrowRight,
  FaExclamationTriangle,
  FaShoppingBag,
  FaChartLine,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import StatsCard from "../../components/dashboard/StatsCard";

import {
  getProducts,
} from "../../services/productService";


export default function Dashboard() {

  const navigate = useNavigate();

  /* =========================
     STATE
  ========================= */

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =========================
     LOAD PRODUCTS
  ========================= */

  useEffect(() => {
    loadProducts();
  }, []);


  const loadProducts = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await getProducts();

      console.log(
        "Dashboard Products:",
        response
      );

      setProducts(
        Array.isArray(response?.products)
          ? response.products
          : []
      );

    } catch (error) {

      console.error(
        "Dashboard Products Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to load products."
      );

      setProducts([]);

    } finally {

      setLoading(false);

    }
  };


  /* =========================
     STATISTICS
  ========================= */

  const statistics = useMemo(() => {

    const totalProducts =
      products.length;


    /*
      Your current Product model may not
      have isActive.

      Therefore consider every product
      with stock > 0 as active.
    */

    const activeProducts =
      products.filter(
        (product) =>
          Number(product.stock || 0) > 0
      ).length;


    const categorySet =
      new Set(
        products
          .map(
            (product) =>
              product.categorySlug ||
              product.category
          )
          .filter(Boolean)
      );


    const totalStock =
      products.reduce(
        (total, product) =>
          total +
          Number(product.stock || 0),
        0
      );


    const lowStock =
      products.filter(
        (product) => {

          const stock =
            Number(product.stock || 0);

          return stock > 0 && stock <= 10;

        }
      ).length;


    const outOfStock =
      products.filter(
        (product) =>
          Number(product.stock || 0) === 0
      ).length;


    return {
      totalProducts,
      activeProducts,
      categories: categorySet.size,
      totalStock,
      lowStock,
      outOfStock,
    };

  }, [products]);


  /* =========================
     CATEGORY BREAKDOWN
  ========================= */

  const categoryData = useMemo(() => {

    const categoryMap = {};

    products.forEach((product) => {

      const category =
        product.category ||
        "Uncategorized";

      categoryMap[category] =
        (categoryMap[category] || 0) + 1;

    });


    return Object.entries(categoryMap)
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 6);

  }, [products]);


  /* =========================
     RECENT PRODUCTS
  ========================= */

  const recentProducts =
    products.slice(0, 6);


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div style={styles.page}>

        <div style={styles.loadingContainer}>

          <div
            className="spinner-border"
            role="status"
            style={{
              color: "#2563EB",
            }}
          />

          <p style={styles.loadingText}>
            Loading dashboard...
          </p>

        </div>

      </div>

    );

  }


  /* =========================
     DASHBOARD
  ========================= */

  return (

    <div style={styles.page}>

      {/* =========================
          HEADER
      ========================= */}

      <div style={styles.header}>

        <div>

          <div style={styles.eyebrow}>
            VOXCL NOVA
          </div>

          <h1 style={styles.title}>
            Dashboard
          </h1>

          <p style={styles.subtitle}>
            Monitor your clothing business,
            products and inventory.
          </p>

        </div>


        <div style={styles.headerActions}>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/products"
              )
            }
            style={styles.secondaryButton}
          >
            <FaBoxOpen />

            Manage Products
          </button>


          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/products/add"
              )
            }
            style={styles.primaryButton}
          >
            <FaPlus />

            Add Product
          </button>

        </div>

      </div>


      {/* =========================
          ERROR
      ========================= */}

      {error && (

        <div style={styles.errorBox}>

          <FaExclamationTriangle />

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={loadProducts}
            style={styles.retryButton}
          >
            Retry
          </button>

        </div>

      )}


      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="row g-4">

        <div className="col-sm-6 col-xl-3">

          <StatsCard
            title="Total Products"
            value={statistics.totalProducts}
            subtitle="All products"
            icon={<FaBoxOpen />}
          />

        </div>


        <div className="col-sm-6 col-xl-3">

          <StatsCard
            title="Active Products"
            value={statistics.activeProducts}
            subtitle="Currently in stock"
            icon={<FaCheckCircle />}
          />

        </div>


        <div className="col-sm-6 col-xl-3">

          <StatsCard
            title="Categories"
            value={statistics.categories}
            subtitle="Product categories"
            icon={<FaLayerGroup />}
          />

        </div>


        <div className="col-sm-6 col-xl-3">

          <StatsCard
            title="Total Stock"
            value={statistics.totalStock}
            subtitle="Available inventory"
            icon={<FaWarehouse />}
          />

        </div>

      </div>


      {/* =========================
          INVENTORY ALERTS
      ========================= */}

      <div className="row g-4 mt-1">

        <div className="col-md-6 col-xl-4">

          <div style={styles.alertCard}>

            <div
              style={{
                ...styles.alertIcon,
                background:
                  "rgba(245,158,11,0.12)",
                color: "#F59E0B",
              }}
            >
              <FaExclamationTriangle />
            </div>

            <div>

              <span style={styles.alertLabel}>
                Low Stock
              </span>

              <strong style={styles.alertValue}>
                {statistics.lowStock}
              </strong>

              <small style={styles.alertText}>
                Products need attention
              </small>

            </div>

          </div>

        </div>


        <div className="col-md-6 col-xl-4">

          <div style={styles.alertCard}>

            <div
              style={{
                ...styles.alertIcon,
                background:
                  "rgba(239,68,68,0.12)",
                color: "#EF4444",
              }}
            >
              <FaWarehouse />
            </div>

            <div>

              <span style={styles.alertLabel}>
                Out of Stock
              </span>

              <strong style={styles.alertValue}>
                {statistics.outOfStock}
              </strong>

              <small style={styles.alertText}>
                Products unavailable
              </small>

            </div>

          </div>

        </div>


        <div className="col-md-12 col-xl-4">

          <div style={styles.alertCard}>

            <div
              style={{
                ...styles.alertIcon,
                background:
                  "rgba(37,99,235,0.12)",
                color: "#2563EB",
              }}
            >
              <FaChartLine />
            </div>

            <div>

              <span style={styles.alertLabel}>
                Inventory Status
              </span>

              <strong style={styles.statusText}>
                {statistics.totalStock > 0
                  ? "Healthy"
                  : "Empty"}
              </strong>

              <small style={styles.alertText}>
                Current inventory overview
              </small>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          MAIN GRID
      ========================= */}

      <div className="row g-4 mt-1">


        {/* =========================
            RECENT PRODUCTS
        ========================= */}

        <div className="col-xl-8">

          <div style={styles.sectionCard}>

            <div style={styles.sectionHeader}>

              <div>

                <h3 style={styles.sectionTitle}>
                  Recent Products
                </h3>

                <p style={styles.sectionSubtitle}>
                  Recently added products
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/dashboard/products"
                  )
                }
                style={styles.viewButton}
              >
                View All

                <FaArrowRight />

              </button>

            </div>


            {recentProducts.length === 0 ? (

              <div style={styles.emptyState}>

                <div style={styles.emptyIcon}>
                  <FaShoppingBag />
                </div>

                <h4>
                  No products yet
                </h4>

                <p>
                  Start adding products to
                  your catalog.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/dashboard/products/add"
                    )
                  }
                  style={styles.primaryButton}
                >
                  <FaPlus />

                  Add First Product
                </button>

              </div>

            ) : (

              <div className="row g-3">

                {recentProducts.map(
                  (product) => {

                    const image =
                      product.images?.[0]?.url ||
                      product.thumbnail?.url ||
                      "";


                    return (

                      <div
                        className="col-md-6"
                        key={product._id}
                      >

                        <div
                          style={
                            styles.productCard
                          }
                        >

                          {/* IMAGE */}

                          <div
                            style={
                              styles.productImageWrapper
                            }
                          >

                            {image ? (

                              <img
                                src={image}
                                alt={
                                  product.name
                                }
                                style={
                                  styles.productImage
                                }
                              />

                            ) : (

                              <div
                                style={
                                  styles.noImage
                                }
                              >
                                <FaBoxOpen />
                              </div>

                            )}

                          </div>


                          {/* INFO */}

                          <div
                            style={
                              styles.productInfo
                            }
                          >

                            <div
                              style={
                                styles.productCategory
                              }
                            >
                              {product.category ||
                                "Product"}
                            </div>


                            <h4
                              style={
                                styles.productName
                              }
                            >
                              {product.name}
                            </h4>


                            <div
                              style={
                                styles.productBottom
                              }
                            >

                              <strong
                                style={
                                  styles.price
                                }
                              >
                                ₹
                                {Number(
                                  product.price ||
                                  0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>


                              <span
                                style={
                                  product.stock > 0
                                    ? styles.stockBadge
                                    : styles.outStockBadge
                                }
                              >
                                {product.stock > 0
                                  ? `${product.stock} in stock`
                                  : "Out of stock"}
                              </span>

                            </div>

                          </div>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            )}

          </div>

        </div>


        {/* =========================
            CATEGORIES
        ========================= */}

        <div className="col-xl-4">

          <div style={styles.sectionCard}>

            <div style={styles.sectionHeader}>

              <div>

                <h3 style={styles.sectionTitle}>
                  Categories
                </h3>

                <p style={styles.sectionSubtitle}>
                  Products by category
                </p>

              </div>

            </div>


            {categoryData.length === 0 ? (

              <div style={styles.smallEmpty}>
                No categories available.
              </div>

            ) : (

              <div>

                {categoryData.map(
                  ([category, count]) => (

                    <div
                      key={category}
                      style={
                        styles.categoryRow
                      }
                    >

                      <div
                        style={
                          styles.categoryLeft
                        }
                      >

                        <div
                          style={
                            styles.categoryIcon
                          }
                        >
                          <FaLayerGroup />
                        </div>

                        <span>
                          {category}
                        </span>

                      </div>


                      <span
                        style={
                          styles.categoryCount
                        }
                      >
                        {count}
                      </span>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </div>


      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <div style={styles.quickCard}>

        <div>

          <div style={styles.quickEyebrow}>
            QUICK ACTIONS
          </div>

          <h3 style={styles.quickTitle}>
            Manage your clothing catalog
          </h3>

          <p style={styles.quickText}>
            Add products, update inventory
            and manage your categories.
          </p>

        </div>


        <div style={styles.quickActions}>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/products/add"
              )
            }
            style={styles.primaryButton}
          >
            <FaPlus />
            Add Product
          </button>


          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/products"
              )
            }
            style={styles.secondaryButton}
          >
            <FaBoxOpen />
            Products
          </button>

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = {

  page: {
    minHeight: "100%",
    background: "#F4F7FB",
    padding: "30px",
  },


  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },


  eyebrow: {
    color: "#2563EB",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "2px",
    marginBottom: "6px",
  },


  title: {
    margin: 0,
    color: "#071A36",
    fontSize: "32px",
    fontWeight: 800,
  },


  subtitle: {
    color: "#64748B",
    margin: "7px 0 0",
    fontSize: "14px",
  },


  headerActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },


  primaryButton: {
    border: "none",
    background: "#2563EB",
    color: "#fff",
    borderRadius: "9px",
    padding: "11px 16px",
    fontSize: "13px",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
  },


  secondaryButton: {
    border: "1px solid #D7DFEA",
    background: "#fff",
    color: "#183153",
    borderRadius: "9px",
    padding: "11px 16px",
    fontSize: "13px",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
  },


  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#FFF1F2",
    border: "1px solid #FECDD3",
    color: "#BE123C",
    padding: "13px 15px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "13px",
  },


  retryButton: {
    marginLeft: "auto",
    border: "none",
    background: "#BE123C",
    color: "#fff",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
  },


  alertCard: {
    background: "#fff",
    border: "1px solid #E5EAF1",
    borderRadius: "14px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },


  alertIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "17px",
    flexShrink: 0,
  },


  alertLabel: {
    display: "block",
    color: "#64748B",
    fontSize: "12px",
    marginBottom: "3px",
  },


  alertValue: {
    display: "block",
    color: "#071A36",
    fontSize: "22px",
    lineHeight: 1.2,
  },


  statusText: {
    display: "block",
    color: "#16A34A",
    fontSize: "18px",
    lineHeight: 1.3,
  },


  alertText: {
    display: "block",
    color: "#94A3B8",
    fontSize: "11px",
    marginTop: "3px",
  },


  sectionCard: {
    background: "#fff",
    border: "1px solid #E5EAF1",
    borderRadius: "16px",
    padding: "22px",
    height: "100%",
  },


  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },


  sectionTitle: {
    color: "#071A36",
    fontSize: "17px",
    fontWeight: 750,
    margin: 0,
  },


  sectionSubtitle: {
    color: "#94A3B8",
    fontSize: "12px",
    margin: "4px 0 0",
  },


  viewButton: {
    border: "none",
    background: "transparent",
    color: "#2563EB",
    fontSize: "12px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "7px",
    cursor: "pointer",
  },


  productCard: {
    border: "1px solid #E7ECF2",
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
    gap: "12px",
    minHeight: "115px",
  },


  productImageWrapper: {
    width: "90px",
    height: "95px",
    borderRadius: "9px",
    overflow: "hidden",
    background: "#F1F5F9",
    flexShrink: 0,
  },


  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },


  noImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94A3B8",
    fontSize: "22px",
  },


  productInfo: {
    minWidth: 0,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },


  productCategory: {
    color: "#2563EB",
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: ".6px",
    marginBottom: "5px",
  },


  productName: {
    color: "#172B4D",
    fontSize: "14px",
    fontWeight: 650,
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },


  productBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    marginTop: "10px",
  },


  price: {
    color: "#071A36",
    fontSize: "14px",
  },


  stockBadge: {
    background: "#ECFDF5",
    color: "#047857",
    borderRadius: "5px",
    padding: "4px 7px",
    fontSize: "9px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },


  outStockBadge: {
    background: "#FEF2F2",
    color: "#DC2626",
    borderRadius: "5px",
    padding: "4px 7px",
    fontSize: "9px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },


  categoryRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #EEF2F6",
  },


  categoryLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#334155",
    fontSize: "13px",
    fontWeight: 550,
  },


  categoryIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "#EFF6FF",
    color: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },


  categoryCount: {
    background: "#F1F5F9",
    color: "#475569",
    padding: "4px 9px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 700,
  },


  emptyState: {
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },


  emptyIcon: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "#EFF6FF",
    color: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    marginBottom: "15px",
  },


  emptyStateH4: {
  color: "#172B4D",
},

  smallEmpty: {
    color: "#94A3B8",
    textAlign: "center",
    padding: "35px 10px",
    fontSize: "13px",
  },


  quickCard: {
    marginTop: "25px",
    background:
      "linear-gradient(135deg, #071A36 0%, #102E57 100%)",
    borderRadius: "16px",
    padding: "25px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "25px",
    flexWrap: "wrap",
  },


  quickEyebrow: {
    color: "#60A5FA",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1.5px",
    marginBottom: "6px",
  },


  quickTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
  },


  quickText: {
    color: "#AFC0D8",
    fontSize: "13px",
    margin: "7px 0 0",
  },


  quickActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },


  loadingContainer: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },


  loadingText: {
    color: "#64748B",
    fontSize: "13px",
    marginTop: "15px",
  },

};