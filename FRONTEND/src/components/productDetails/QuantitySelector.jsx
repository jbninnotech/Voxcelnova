import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const QuantitySelector = ({
  quantity = 1,
  onQuantityChange,
  min = 1,
  max = 9999,
}) => {
  const decrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="mb-4">
      <div
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#071A36",
          marginBottom: "12px",
        }}
      >
        Quantity
      </div>

      <div
        className="d-flex align-items-center"
        style={{
          width: "150px",
          height: "48px",
          border: "1px solid #CBD5E1",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <button
          type="button"
          onClick={decrease}
          disabled={quantity <= min}
          className="border-0 bg-transparent d-flex align-items-center justify-content-center"
          style={{
            width: "48px",
            height: "100%",
            color: quantity <= min ? "#CBD5E1" : "#071A36",
          }}
        >
          <FiMinus size={16} />
        </button>

        <div
          className="flex-grow-1 text-center"
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#071A36",
          }}
        >
          {quantity}
        </div>

        <button
          type="button"
          onClick={increase}
          disabled={quantity >= max}
          className="border-0 bg-transparent d-flex align-items-center justify-content-center"
          style={{
            width: "48px",
            height: "100%",
            color: quantity >= max ? "#CBD5E1" : "#071A36",
          }}
        >
          <FiPlus size={16} />
        </button>
      </div>

      <div
        className="mt-2"
        style={{
          fontSize: "12px",
          color: "#64748B",
        }}
      >
        Minimum order: {min} piece{min > 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default QuantitySelector;