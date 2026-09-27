import React from "react";

const colorMap = {
  black: "#000000",
  white: "#FFFFFF",
  navy: "#172554",
  "navy blue": "#172554",
  blue: "#2563EB",
  red: "#DC2626",
  green: "#16A34A",
  grey: "#6B7280",
  gray: "#6B7280",
  yellow: "#EAB308",
  orange: "#F97316",
  brown: "#78350F",
  beige: "#D6C6A5",
  maroon: "#7F1D1D",
  purple: "#7E22CE",
  pink: "#EC4899",
};

const ColorSelector = ({
  colors = [],
  selectedColor,
  onColorChange,
}) => {
  if (!colors.length) return null;

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#071A36",
          }}
        >
          Select Color
        </span>

        {selectedColor && (
          <span
            style={{
              fontSize: "13px",
              color: "#64748B",
            }}
          >
            {selectedColor}
          </span>
        )}
      </div>

      <div className="d-flex flex-wrap gap-3">
        {colors.map((color) => {
          const colorKey = String(color).toLowerCase().trim();

          const backgroundColor =
            colorMap[colorKey] || color;

          const isSelected =
            selectedColor?.toLowerCase() === colorKey;

          return (
            <button
              type="button"
              key={color}
              onClick={() => onColorChange(color)}
              title={color}
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "42px",
                height: "42px",
                background: backgroundColor,
                border: isSelected
                  ? "3px solid #0D6EFD"
                  : "2px solid #E2E8F0",
                boxShadow: isSelected
                  ? "0 0 0 3px rgba(13,110,253,0.12)"
                  : "none",
                cursor: "pointer",
              }}
            >
              {isSelected && (
                <span
                  style={{
                    color:
                      colorKey === "white" ||
                      colorKey === "yellow"
                        ? "#071A36"
                        : "#fff",
                    fontWeight: 800,
                    fontSize: "14px",
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;