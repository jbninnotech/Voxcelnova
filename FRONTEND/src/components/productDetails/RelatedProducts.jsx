import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import { FiArrowUpRight } from "react-icons/fi";

const RelatedProducts = ({ product }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        const response = await getProducts();

        const allProducts = Array.isArray(response)
          ? response
          : response?.products || response?.data || [];

        const related = allProducts
          .filter(
            (item) =>
              item._id !== product?._id &&
              item.categorySlug === product?.categorySlug
          )
          .slice(0, 4);

        setProducts(related);
      } catch (error) {
        console.error("Related Products Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (product) {
      loadRelatedProducts();
    }
  }, [product]);

  if (loading || !products.length) {
    return null;
  }

  return (
    <section className="mt-5">
      <div className="d-flex align-items-end justify-content-between mb-4">
        <div>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#0D6EFD",
              fontWeight: 800,
              marginBottom: "6px",
            }}
          >
            You May Also Like
          </div>

          <h3
            className="mb-0"
            style={{
              fontSize: "25px",
              fontWeight: 800,
              color: "#071A36",
            }}
          >
            Related Products
          </h3>
        </div>

        <Link
          to={`/products/${product.categorySlug}`}
          className="text-decoration-none d-flex align-items-center gap-1"
          style={{
            color: "#0D6EFD",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          View All
          <FiArrowUpRight />
        </Link>
      </div>

      <div className="row g-4">
        {products.map((item) => {
          const image = item.images?.[0]?.url;

          const currentPrice =
            item.salePrice !== undefined &&
            item.salePrice !== null &&
            item.salePrice !== ""
              ? item.salePrice
              : item.price;

          return (
            <div className="col-6 col-lg-3" key={item._id}>
              <Link
                to={`/products/product/${item._id}`}
                className="text-decoration-none"
              >
                <div
                  className="h-100 rounded-4 overflow-hidden"
                  style={{
                    background: "#fff",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <div
                    style={{
                      height: "250px",
                      background: "#F8FAFC",
                    }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={item.name}
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <div
                      style={{
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: "#64748B",
                        marginBottom: "6px",
                      }}
                    >
                      {item.category}
                    </div>

                    <h6
                      style={{
                        color: "#071A36",
                        fontWeight: 700,
                        fontSize: "14px",
                        minHeight: "40px",
                      }}
                    >
                      {item.name}
                    </h6>

                    <div
                      style={{
                        color: "#071A36",
                        fontWeight: 800,
                      }}
                    >
                      ₹{Number(currentPrice).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedProducts;