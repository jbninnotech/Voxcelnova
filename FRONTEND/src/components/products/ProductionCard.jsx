import React from "react";

import {
  FaShoppingCart,
  FaHeart,
  FaEye
} from "react-icons/fa";


const ProductCard = ({
  product
}) => {

  return (

    <div
      className="product-card"
      style={{
        background: "#FFFFFF",
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid #EEEEEE",
        height: "100%",
      }}
    >


      {/* IMAGE */}

      <div
        style={{
          height: "280px",
          position: "relative",
          overflow: "hidden",
          background: "#F3F4F6"
        }}
      >

        <img
          src={product.images?.[0]}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />


        {/* BADGE */}

        {product.isBulkAvailable && (

          <span
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              background: "#082B73",
              color: "#FFF",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "11px",
            }}
          >
            BULK ORDER
          </span>

        )}


        {/* ACTIONS */}

        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >

          <button className="product-action">
            <FaHeart />
          </button>

          <button className="product-action">
            <FaEye />
          </button>

        </div>

      </div>


      {/* CONTENT */}

      <div
        style={{
          padding: "20px"
        }}
      >

        <p
          style={{
            color: "#C58938",
            fontSize: "13px",
            fontWeight: "600"
          }}
        >
          {product.category}
        </p>


        <h5
          style={{
            fontWeight: "700"
          }}
        >
          {product.name}
        </h5>


        <p
          style={{
            color: "#777",
            fontSize: "14px"
          }}
        >
          {product.description}
        </p>


        <div
          className="d-flex justify-content-between align-items-center"
        >

          <div>

            <strong
              style={{
                color: "#082B73",
                fontSize: "20px"
              }}
            >
              ₹{product.price}
            </strong>

          </div>


          <button
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              border: "none",
              background: "#082B73",
              color: "#FFF"
            }}
          >
            <FaShoppingCart />
          </button>

        </div>

      </div>


      <style>
        {`

          .product-card {
            transition: 0.3s;
          }

          .product-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          }

          .product-action {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: white;
          }

        `}
      </style>

    </div>

  );

};


export default ProductCard;