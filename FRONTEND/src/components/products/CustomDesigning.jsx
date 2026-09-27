import React from "react";
import {
FaWhatsapp,
FaPalette,
FaTshirt,
FaClock,
FaCheckCircle,
} from "react-icons/fa";

const CustomDesigning = ({
phoneNumber = "919652984415",
prefilledMessage = "Hello! I'm interested in custom uniform designs.",
bgImage = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1920&auto=format&fit=crop",
}) => {
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    prefilledMessage
  )}`;

const perks = [
{
icon: <FaPalette />,
text: "Free Design Mockups",
},
{
icon: <FaTshirt />,
text: "Custom Logo Embroidery",
},
{
icon: <FaClock />,
text: "Quick Turnaround Time",
},
{
icon: <FaCheckCircle />,
text: "Flexible Minimum Quantities",
},
];

return (
<section
style={{
minHeight: "500px",
padding: "80px 20px",
textAlign: "center",
backgroundImage: `linear-gradient(
          rgba(135, 105, 196, 0.92),
          rgba(84, 128, 179, 0.92)
        ), url(${bgImage})`,
backgroundSize: "cover",
backgroundPosition: "center",
}}
> <div className="container">
<div
style={{
display: "inline-flex",
alignItems: "center",
gap: "8px",
padding: "8px 18px",
borderRadius: "30px",
background: "#ffffff",
color: "#1464D2",
fontWeight: "700",
marginBottom: "20px",
}}
> <FaPalette />
BESPOKE TAILORING & CUSTOM BRANDING </div>

    <h2
      style={{
        color: "#082B73",
        fontSize: "clamp(2rem, 4vw, 3.5rem)",
        fontWeight: "800",
      }}
    >
      Need Custom Uniform Designs?
    </h2>

    <p
      style={{
        maxWidth: "750px",
        margin: "20px auto",
        color: "#1E3A8A",
        fontSize: "1.1rem",
        lineHeight: "1.7",
      }}
    >
      Let's create the perfect apparel for your institution or team.
      Send us your design ideas, color codes, or logos on WhatsApp
      for immediate samples and quotes.
    </p>

    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px 35px",
        borderRadius: "50px",
        background: "#25D366",
        color: "#ffffff",
        textDecoration: "none",
        fontWeight: "700",
        fontSize: "1.1rem",
        marginTop: "15px",
      }}
    >
      <FaWhatsapp size={25} />
      Chat on WhatsApp
    </a>

    <div
      className="d-flex flex-wrap justify-content-center gap-3"
      style={{
        marginTop: "40px",
      }}
    >
      {perks.map((perk, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 18px",
            background: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            fontWeight: "600",
          }}
        >
          <span style={{ color: "#1464D2" }}>
            {perk.icon}
          </span>

          {perk.text}
        </div>
      ))}
    </div>
  </div>
</section>

);
};

export default CustomDesigning;
