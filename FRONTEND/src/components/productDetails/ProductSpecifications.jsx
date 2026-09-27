import React from "react";

const ProductSpecifications = ({ product = {} }) => {
  const specifications = [
    ["Product Type", product.category || "Clothing"],
    ["Material", product.material || "Premium Fabric"],
    ["Brand", product.brand || "VOXCEL NOVA"],
    [
      "Available Sizes",
      product.sizes?.length
        ? product.sizes.join(", ")
        : "Available on request",
    ],
    [
      "Available Colors",
      product.colors?.length
        ? product.colors.join(", ")
        : "Available on request",
    ],
    ["Minimum Order", `${product.minimumOrder || 1} Pieces`],
    [
      "Customization",
      product.customizationAvailable === false
        ? "Not Available"
        : "Available",
    ],
  ];

  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0">
        <tbody>
          {specifications.map(([label, value]) => (
            <tr key={label}>
              <td
                style={{
                  width: "35%",
                  color: "#64748B",
                  fontSize: "13px",
                  padding: "15px 10px",
                }}
              >
                {label}
              </td>

              <td
                style={{
                  color: "#071A36",
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "15px 10px",
                }}
              >
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecifications;