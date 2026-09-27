import React from "react";

import {
  FaSearch
} from "react-icons/fa";


const ProductSearch = ({
  searchTerm,
  setSearchTerm
}) => {

  return (

    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "450px"
      }}
    >

      <FaSearch
        style={{
          position: "absolute",
          top: "50%",
          left: "18px",
          transform: "translateY(-50%)",
          color: "#777"
        }}
      />


      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        style={{
          width: "100%",
          padding: "14px 20px 14px 50px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          outline: "none"
        }}
      />

    </div>

  );

};


export default ProductSearch;