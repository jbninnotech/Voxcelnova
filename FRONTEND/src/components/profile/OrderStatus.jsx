import React from "react";

export default function OrderStatus({ status = "Processing" }) {
  const getBadgeStyle = () => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return { background: "rgba(34, 197, 94, 0.15)", color: "#4ade80", border: "1px solid rgba(34, 197, 94, 0.3)" };
      case "shipped":
        return { background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.3)" };
      case "cancelled":
        return { background: "rgba(239, 68, 68, 0.15)", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.3)" };
      default:
        return { background: "rgba(234, 179, 8, 0.15)", color: "#facc15", border: "1px solid rgba(234, 179, 8, 0.3)" };
    }
  };

  return (
    <span
      style={{
        ...getBadgeStyle(),
        padding: "4px 12px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "capitalize",
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
}