import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  getProductsByCategory,
} from "../services/productService";


const CategoryProducts = () => {

  const {
    categorySlug,
  } = useParams();


  const [
    products,
    setProducts,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  /* =====================================
     FETCH CATEGORY PRODUCTS
  ===================================== */

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          setLoading(true);

          setError("");

          const data =
            await getProductsByCategory(
              categorySlug
            );


          setProducts(
            data.products || []
          );

        } catch (error) {

          console.error(error);

          setError(
            error.response?.data?.message ||
            "Failed to load products"
          );

        } finally {

          setLoading(false);

        }

      };


    fetchProducts();

  }, [
    categorySlug,
  ]);


  /* =====================================
     FORMAT CATEGORY NAME
  ===================================== */

  const categoryName =
    categorySlug
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");


  /* =====================================
     LOADING
  ===================================== */

  if (loading) {

    return (

      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "70vh",
          background: "#F8F7F5",
        }}
      >

        <div
          className="text-center"
        >

          <div
            className="spinner-border"
            role="status"
            style={{
              color: "#082B73",
            }}
          />

          <p
            className="mt-3"
            style={{
              color: "#64748B",
            }}
          >
            Loading products...
          </p>

        </div>

      </div>

    );

  }


  /* =====================================
     ERROR
  ===================================== */

  if (error) {

    return (

      <div
        className="container"
        style={{
          padding:
            "80px 15px",
        }}
      >

        <div
          className="alert alert-danger text-center"
        >
          {error}
        </div>

      </div>

    );

  }


  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F8F7F5",
        padding:
          "50px 0 80px",
      }}
    >

      <div
        className="container"
      >


        {/* =========================
            BREADCRUMB
        ========================= */}

        <div
          className="mb-4"
        >

          <Link
            to="/products"
            style={{
              textDecoration:
                "none",
              color:
                "#64748B",
            }}
          >
            Products
          </Link>

          <span
            style={{
              margin:
                "0 10px",
              color:
                "#9CA3AF",
            }}
          >
            /
          </span>

          <span
            style={{
              color:
                "#082B73",
              fontWeight:
                "600",
            }}
          >
            {categoryName}
          </span>

        </div>


        {/* =========================
            HEADER
        ========================= */}

        <div
          className="text-center mb-5"
        >

          <span
            style={{
              color:
                "#C58938",
              fontWeight:
                "700",
              letterSpacing:
                "2px",
              fontSize:
                "13px",
            }}
          >
            PRODUCT COLLECTION
          </span>


          <h1
            className="fw-bold mt-3"
            style={{
              color:
                "#111827",
              fontSize:
                "clamp(35px, 5vw, 60px)",
            }}
          >
            {categoryName}
          </h1>


          <p
            style={{
              color:
                "#64748B",
              fontSize:
                "17px",
            }}
          >
            Explore our premium collection.
          </p>

        </div>


        {/* =========================
            PRODUCT COUNT
        ========================= */}

        <div
          className="mb-4"
          style={{
            color:
              "#64748B",
          }}
        >
          {products.length} Products Found
        </div>


        {/* =========================
            PRODUCTS GRID
        ========================= */}

        {products.length === 0 ? (

          <div
            className="text-center bg-white rounded-4 p-5"
          >

            <h3
              className="fw-bold"
            >
              No Products Available
            </h3>

            <p
              style={{
                color:
                  "#64748B",
              }}
            >
              Products will be added soon.
            </p>

          </div>

        ) : (

          <div
            className="row g-4"
          >

            {products.map(
              (product) => (

                <div
                  className="col-xl-3 col-lg-4 col-md-6"
                  key={
                    product._id
                  }
                >

                  <ProductCard
                    product={
                      product
                    }
                  />

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

};


export default CategoryProducts;


/* =====================================
   PRODUCT CARD
===================================== */

function ProductCard({
  product,
}) {

  return (

    <div
      className="card h-100 border-0"
      style={{
        borderRadius:
          "18px",
        overflow:
          "hidden",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >

      {/* IMAGE */}

      <div
        style={{
          height:
            "280px",
          overflow:
            "hidden",
          background:
            "#F1F3F5",
        }}
      >

        <img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/500x600"
          }
          alt={
            product.name
          }
          style={{
            width:
              "100%",
            height:
              "100%",
            objectFit:
              "cover",
          }}
        />

      </div>


      {/* PRODUCT INFO */}

      <div
        className="card-body"
      >

        <h5
          className="fw-bold"
          style={{
            color:
              "#111827",
          }}
        >
          {product.name}
        </h5>


        <p
          style={{
            color:
              "#6B7280",
            fontSize:
              "14px",
          }}
        >
          {product.shortDescription}
        </p>


        {/* PRICE */}

        <div
          className="d-flex align-items-center gap-2"
        >

          <span
            className="fw-bold"
            style={{
              color:
                "#082B73",
              fontSize:
                "18px",
            }}
          >
            ₹
            {
              product.salePrice > 0
                ? product.salePrice
                : product.price
            }
          </span>


          {
            product.salePrice > 0 && (

              <span
                style={{
                  color:
                    "#9CA3AF",
                  textDecoration:
                    "line-through",
                }}
              >
                ₹
                {
                  product.price
                }
              </span>

            )
          }

        </div>


        {/* BULK */}

        {
          product.isBulkAvailable && (

            <div
              className="mt-3"
            >

              <span
                className="badge"
                style={{
                  background:
                    "#EAF2FF",
                  color:
                    "#082B73",
                  padding:
                    "8px 10px",
                }}
              >
                Bulk Order Available
              </span>

            </div>

          )
        }

      </div>

    </div>

  );

}