import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${category.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        textAlign: "center",
      }}
      className="category-card"
    >

      <div
        className="category-image-box"
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          borderRadius: "30px",
          background: "#EEF1F4",
        }}
      >

        <img
          src={category.image}
          alt={category.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

      </div>


      <h5
        style={{
          marginTop: "15px",
          fontWeight: "600",
          color: "#222",
          fontSize: "18px",
        }}
      >
        {category.name}
      </h5>


      <style>
        {`

          .category-card {
            transition: 0.3s ease;
          }

          .category-image-box {
            transition: 0.3s ease;
          }

          .category-card:hover .category-image-box {
            transform: translateY(-7px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          }

          .category-card:hover h5 {
            color: #C58938;
          }

        `}
      </style>

    </div>
  );
};

export default CategoryCard;