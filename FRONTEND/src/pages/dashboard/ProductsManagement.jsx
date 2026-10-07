import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiEye,
  FiPackage,
} from "react-icons/fi";

import { getProducts, deleteProduct } from "../../services/productService";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      setProducts(response.products || []);
    } catch (error) {
      console.error("Failed to load products:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* =========================
     DELETE PRODUCT
  ========================= */

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(product._id);

      await deleteProduct(product._id);

      setProducts((prev) =>
        prev.filter((item) => item._id !== product._id)
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================
     CATEGORIES
  ========================= */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return uniqueCategories;
  }, [products]);

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchValue ||
        product.name
          ?.toLowerCase()
          .includes(searchValue) ||
        product.category
          ?.toLowerCase()
          .includes(searchValue) ||
        product.sku
          ?.toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        category === "all" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

      <div
        className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4"
      >
        <div>
          <h2
            className="fw-bold mb-1"
            style={{
              color: "#071A36",
              fontSize: "28px",
            }}
          >
            Products Management
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#64748B",
              fontSize: "14px",
            }}
          >
            Manage all products added to VOXCL NOVA.
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={loadProducts}
            disabled={loading}
            className="btn d-flex align-items-center gap-2"
            style={{
              background: "#FFFFFF",
              border: "1px solid #D9E2EC",
              color: "#334155",
              borderRadius: "10px",
              padding: "10px 15px",
            }}
          >
            <FiRefreshCw
              size={16}
              className={loading ? "spin" : ""}
            />

            Refresh
          </button>

          <Link
            to="/dashboard/products/add"
            className="btn d-flex align-items-center gap-2 text-white text-decoration-none"
            style={{
              background: "#0D6EFD",
              borderRadius: "10px",
              padding: "10px 17px",
              fontWeight: 600,
            }}
          >
            <FiPlus size={17} />

            Add Product
          </Link>
        </div>
      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <StatCard
            title="Total Products"
            value={products.length}
            icon={<FiPackage />}
          />
        </div>

        <div className="col-12 col-md-4">
          <StatCard
            title="Featured Products"
            value={
              products.filter(
                (product) => product.isFeatured
              ).length
            }
            icon={<FiEye />}
          />
        </div>

        <div className="col-12 col-md-4">
          <StatCard
            title="Low Stock"
            value={
              products.filter(
                (product) =>
                  Number(product.stock || 0) <= 10
              ).length
            }
            icon={<FiPackage />}
          />
        </div>
      </div>

      {/* =========================
          FILTER BAR
      ========================= */}

      <div
        className="card border-0 mb-4"
        style={{
          borderRadius: "14px",
          boxShadow:
            "0 4px 20px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div className="card-body">
          <div className="row g-3">
            {/* SEARCH */}

            <div className="col-12 col-lg-7">
              <div
                style={{
                  position: "relative",
                }}
              >
                <FiSearch
                  size={18}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform:
                      "translateY(-50%)",
                    color: "#94A3B8",
                  }}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product name, SKU or category..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  style={{
                    height: "45px",
                    paddingLeft: "45px",
                    borderRadius: "9px",
                    border:
                      "1px solid #D9E2EC",
                  }}
                />
              </div>
            </div>

            {/* CATEGORY */}

            <div className="col-12 col-lg-5">
              <select
                className="form-select"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                style={{
                  height: "45px",
                  borderRadius: "9px",
                  border:
                    "1px solid #D9E2EC",
                }}
              >
                <option value="all">
                  All Categories
                </option>

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          PRODUCTS TABLE
      ========================= */}

      <div
        className="card border-0"
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow:
            "0 4px 20px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div
          className="card-header bg-white d-flex justify-content-between align-items-center"
          style={{
            padding: "18px 20px",
            borderBottom:
              "1px solid #E8EEF5",
          }}
        >
          <div>
            <h5
              className="fw-bold mb-1"
              style={{ color: "#071A36" }}
            >
              All Products
            </h5>

            <small
              style={{ color: "#64748B" }}
            >
              Showing{" "}
              {filteredProducts.length} of{" "}
              {products.length} products
            </small>
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              style={{ color: "#0D6EFD" }}
            />

            <p
              className="mt-3 mb-0"
              style={{ color: "#64748B" }}
            >
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* EMPTY */

          <div className="text-center py-5 px-3">
            <FiPackage
              size={45}
              style={{
                color: "#CBD5E1",
              }}
            />

            <h5
              className="fw-bold mt-3"
              style={{
                color: "#334155",
              }}
            >
              No Products Found
            </h5>

            <p
              style={{
                color: "#64748B",
              }}
            >
              {products.length === 0
                ? "Start by adding your first product."
                : "Try changing your search or category filter."}
            </p>

            {products.length === 0 && (
              <Link
                to="/dashboard/products/add"
                className="btn text-white"
                style={{
                  background: "#0D6EFD",
                  borderRadius: "9px",
                }}
              >
                Add First Product
              </Link>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table
              className="table align-middle mb-0"
              style={{
                minWidth: "1050px",
              }}
            >
              <thead
                style={{
                  background: "#F8FAFC",
                }}
              >
                <tr>
                  <th className="px-4 py-3">
                    Product
                  </th>

                  <th>Category</th>

                  <th>SKU</th>

                  <th>Price</th>

                  <th>Stock</th>

                  <th>Status</th>

                  <th>Added</th>

                  <th className="text-end px-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(
                  (product) => (
                    <ProductRow
                      key={product._id}
                      product={product}
                      deletingId={deletingId}
                      onDelete={handleDelete}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

/* =================================
   STAT CARD
================================= */

const StatCard = ({
  title,
  value,
  icon,
}) => {
  return (
    <div
      className="card border-0 h-100"
      style={{
        borderRadius: "14px",
        boxShadow:
          "0 4px 20px rgba(15, 23, 42, 0.06)",
      }}
    >
      <div className="card-body d-flex align-items-center gap-3">
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "#EAF2FF",
            color: "#0D6EFD",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "21px",
          }}
        >
          {icon}
        </div>

        <div>
          <p
            className="mb-1"
            style={{
              color: "#64748B",
              fontSize: "13px",
            }}
          >
            {title}
          </p>

          <h4
            className="fw-bold mb-0"
            style={{
              color: "#071A36",
            }}
          >
            {value}
          </h4>
        </div>
      </div>
    </div>
  );
};

/* =================================
   PRODUCT ROW
================================= */

const ProductRow = ({
  product,
  deletingId,
  onDelete,
}) => {
  const image =
    product.images?.length > 0
      ? product.images[0].url
      : "";

  const price =
    product.salePrice !== null &&
    product.salePrice !== undefined &&
    product.salePrice !== ""
      ? product.salePrice
      : product.price;

  const stock = Number(product.stock || 0);

  const createdDate = product.createdAt
    ? new Date(
        product.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <tr>
      {/* PRODUCT */}

      <td className="px-4 py-3">
        <div className="d-flex align-items-center gap-3">
          <div
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#F1F5F9",
              flexShrink: 0,
            }}
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
                className="w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  color: "#94A3B8",
                }}
              >
                <FiPackage size={23} />
              </div>
            )}
          </div>

          <div>
            <div
              className="fw-bold"
              style={{
                color: "#0F172A",
                fontSize: "14px",
              }}
            >
              {product.name}
            </div>

            <div
              style={{
                color: "#94A3B8",
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              {product.images?.length || 0} image
              {product.images?.length === 1
                ? ""
                : "s"}
            </div>
          </div>
        </div>
      </td>

      {/* CATEGORY */}

      <td>
        <span
          style={{
            background: "#EFF6FF",
            color: "#2563EB",
            padding: "6px 10px",
            borderRadius: "7px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {product.category || "-"}
        </span>
      </td>

      {/* SKU */}

      <td>
        <span
          style={{
            color: "#64748B",
            fontSize: "13px",
          }}
        >
          {product.sku || "No SKU"}
        </span>
      </td>

      {/* PRICE */}

      <td>
        <div
          className="fw-bold"
          style={{
            color: "#0F172A",
          }}
        >
          ₹
          {Number(price).toLocaleString(
            "en-IN"
          )}
        </div>

        {product.salePrice &&
          Number(product.salePrice) <
            Number(product.price) && (
            <small
              style={{
                color: "#94A3B8",
                textDecoration:
                  "line-through",
              }}
            >
              ₹
              {Number(
                product.price
              ).toLocaleString("en-IN")}
            </small>
          )}
      </td>

      {/* STOCK */}

      <td>
        <span
          style={{
            color:
              stock <= 10
                ? "#DC2626"
                : "#16A34A",
            fontWeight: 600,
            fontSize: "13px",
          }}
        >
          {stock}
        </span>
      </td>

      {/* STATUS */}

      <td>
        {product.isFeatured ? (
          <span
            style={{
              background: "#FEF3C7",
              color: "#B45309",
              padding: "5px 9px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            FEATURED
          </span>
        ) : (
          <span
            style={{
              background: "#ECFDF5",
              color: "#15803D",
              padding: "5px 9px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            ACTIVE
          </span>
        )}
      </td>

      {/* DATE */}

      <td>
        <span
          style={{
            color: "#64748B",
            fontSize: "13px",
          }}
        >
          {createdDate}
        </span>
      </td>

      {/* ACTIONS */}

      <td className="text-end px-4">
        <div className="d-flex justify-content-end gap-2">
          {/* VIEW */}

          <Link
            to={`/products/${product.categorySlug}`}
            className="btn btn-sm"
            title="View"
            style={{
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F1F5F9",
              color: "#475569",
              borderRadius: "8px",
            }}
          >
            <FiEye size={16} />
          </Link>

          {/* EDIT */}

          <Link
            to={`/dashboard/products/edit/${product._id}`}
            className="btn btn-sm"
            title="Edit"
            style={{
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#EFF6FF",
              color: "#2563EB",
              borderRadius: "8px",
            }}
          >
            <FiEdit2 size={16} />
          </Link>

          {/* DELETE */}

          <button
            type="button"
            className="btn btn-sm"
            title="Delete"
            disabled={
              deletingId === product._id
            }
            onClick={() =>
              onDelete(product)
            }
            style={{
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#FEF2F2",
              color: "#DC2626",
              borderRadius: "8px",
              border: "none",
            }}
          >
            {deletingId === product._id ? (
              <span
                className="spinner-border spinner-border-sm"
              />
            ) : (
              <FiTrash2 size={16} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductsManagement;