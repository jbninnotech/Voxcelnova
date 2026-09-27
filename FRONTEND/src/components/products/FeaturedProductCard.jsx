import React from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";

const FeaturedProductCard = ({
  product,
}) => {
  const image =
    product.thumbnail ||
    product.images?.[0]?.url ||
    "";

  const finalPrice =
    product.salePrice !== null &&
    product.salePrice !== undefined &&
    product.salePrice !== ""
      ? product.salePrice
      : product.price;

  const hasSale =
    product.salePrice !== null &&
    product.salePrice !== undefined &&
    product.salePrice !== "" &&
    Number(product.salePrice) <
      Number(product.price);

  return (
    <div className="featured-product-card">
      {/* IMAGE */}

      <div className="featured-product-image">

        {image ? (
          <img
            src={image}
            alt={product.name}
          />
        ) : (
          <div className="product-image-placeholder">
            <FiShoppingBag size={35} />
          </div>
        )}

        {/* FEATURED BADGE */}

        <div className="featured-badge">
          Featured
        </div>

        {/* SALE */}

        {hasSale && (
          <div className="sale-badge">
            Sale
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div className="featured-product-content">

        <div className="product-category">
          {product.category}
        </div>

        <h3>
          {product.name}
        </h3>

        {product.shortDescription && (
          <p>
            {product.shortDescription}
          </p>
        )}

        {/* PRICE */}

        <div className="product-price">

          <span className="current-price">
            ₹
            {Number(
              finalPrice
            ).toLocaleString("en-IN")}
          </span>

          {hasSale && (
            <span className="old-price">
              ₹
              {Number(
                product.price
              ).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* SIZES */}

        {product.sizes?.length > 0 && (
          <div className="product-sizes">

            {product.sizes
              .slice(0, 5)
              .map((size) => (
                <span key={size}>
                  {size}
                </span>
              ))}

          </div>
        )}

        {/* BUTTON */}

        <Link
          to={`/products/${product._id}`}
          className="product-view-button"
        >
          View Product

          <FiArrowRight size={16} />
        </Link>

      </div>
    </div>
  );
};

export default FeaturedProductCard;