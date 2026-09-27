import React, {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import ProductSearch from "../../components/products/ProductSearch";

import ProductCard from "../../components/Products/ProductCard";

import {
  getProductsByCategory
} from "../../services/productService";


const CategoryProducts = () => {

  const { categorySlug } = useParams();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {

    fetchProducts();

  }, [categorySlug]);


  const fetchProducts = async () => {

    try {

      setLoading(true);

      const data =
        await getProductsByCategory(categorySlug);

      setProducts(data.products);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };


  const categoryName = categorySlug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");


  const filteredProducts =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );


  if (loading) {

    return (

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "80vh"
        }}
      >

        <div
          className="spinner-border"
          role="status"
        />

      </div>

    );

  }


  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F8F7F5",
        padding: "50px 0 80px",
      }}
    >

      <div className="container">


        {/* BREADCRUMB */}

        <div className="mb-4">

          <span
            style={{
              color: "#777"
            }}
          >
            Products
          </span>

          <span
            style={{
              margin: "0 8px"
            }}
          >
            /
          </span>

          <span
            style={{
              color: "#082B73",
              fontWeight: "600"
            }}
          >
            {categoryName}
          </span>

        </div>


        {/* HEADER */}

        <div className="row align-items-center mb-5">


          <div className="col-lg-6">

            <p
              style={{
                color: "#C58938",
                fontWeight: "700",
                letterSpacing: "2px",
              }}
            >
              PRODUCT COLLECTION
            </p>


            <h1
              style={{
                fontWeight: "800",
                color: "#111",
              }}
            >
              {categoryName}
            </h1>


            <p
              style={{
                color: "#6B7280"
              }}
            >
              Explore our premium {categoryName.toLowerCase()}
              collection with custom and bulk ordering options.
            </p>

          </div>


          <div
            className="col-lg-6 d-flex justify-content-lg-end"
          >

            <ProductSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

          </div>

        </div>


        {/* PRODUCT COUNT */}

        <p
          style={{
            color: "#6B7280"
          }}
        >
          Showing {filteredProducts.length} products
        </p>


        {/* PRODUCTS */}

        <div className="row g-4">

          {filteredProducts.map((product) => (

            <div
              className="col-12 col-sm-6 col-lg-3"
              key={product._id}
            >

              <ProductCard
                product={product}
              />

            </div>

          ))}

        </div>


        {/* EMPTY */}

        {filteredProducts.length === 0 && (

          <div
            className="text-center py-5"
          >

            <h4>
              No Products Found
            </h4>

          </div>

        )}

      </div>

    </div>

  );

};


export default CategoryProducts;