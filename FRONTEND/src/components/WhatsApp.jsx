import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "918143324349";
  const message = encodeURIComponent(
    "Hello 👋 I would like to know more about your services."
  );

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      {/* Keyframe animation for bulking/floating up and down */}
      <style>{`
        @keyframes bulkUpDown {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-7px) scale(1.08);
          }
        }
        .whatsapp-float-btn {
          animation: bulkUpDown 2s ease-in-out infinite;
        }
        .whatsapp-float-btn:hover {
          animation-play-state: paused;
          transform: scale(1.15) !important;
        }
      `}</style>

      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="whatsapp-float-btn position-fixed d-flex align-items-center justify-content-center"
        style={{
          right: "20px",
          bottom: "20px",
          width: "50px",          // Smaller size (was 74px)
          height: "50px",         // Smaller size (was 74px)
          borderRadius: "50%",
          background: "#25D366",
          color: "#fff",
          textDecoration: "none",
          zIndex: 9999,
          boxShadow: "0 6px 20px rgba(37, 211, 102, 0.4)",
          transition: "all 0.25s ease",
        }}
      >
        {/* Smaller icon (was 40) */}
        <FaWhatsapp size={28} />
      </a>
    </>
  );
};

export default WhatsAppButton;