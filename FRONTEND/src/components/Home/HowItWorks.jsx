import React from "react";
import {
  FaLayerGroup,
  FaCut,
  FaTshirt,
  FaCheckDouble,
} from "react-icons/fa";

const ManufacturingProcess = () => {
  const processSteps = [
    {
      number: "01",
      icon: <FaLayerGroup />,
      badge: "STEP 1",
      title: "Fabric Selection",
      description: "Handpicking premium, soft, and durable fabrics tested for zero shrinkage.",
    },
    {
      number: "02",
      icon: <FaCut />,
      badge: "STEP 2",
      title: "Precision Cutting",
      description: "Computerized laser cutting based on exact sizing patterns for a perfect fit.",
    },
    {
      number: "03",
      icon: <FaTshirt />,
      badge: "STEP 3",
      title: "Stitching & Branding",
      description: "High-speed industrial sewing, custom printing, and embroidery finishing.",
    },
    {
      number: "04",
      icon: <FaCheckDouble />,
      badge: "STEP 4",
      title: "Quality & Packing",
      description: "100% defect inspection, steam ironing, and neat packaging ready to ship.",
    },
  ];

  return (
    <>
      <style>
        {`
          .mfg-section {
            background-color: #FFFFFF !important;
            padding: clamp(50px, 6vw, 80px) 0;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
          }

          .mfg-container {
            max-width: 1320px;
            margin: 0 auto;
            padding: 0 clamp(20px, 4vw, 40px);
          }

          /* Header Styling - Completely Transparent Background & Black Text */
          .mfg-header {
            text-align: center;
            max-width: 650px;
            margin: 0 auto 50px auto;
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            border: none !important;
          }

          .mfg-headline {
            font-size: clamp(28px, 3.6vw, 40px);
            font-weight: 900;
            color: #000000 !important; /* Pure Black */
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 0 10px 0;
            letter-spacing: -0.6px;
            line-height: 1.2;
          }

          .mfg-subtext {
            color: #4B5563 !important;
            font-size: 15px;
            margin: 0;
            background: transparent !important;
          }

          .mfg-flow-wrapper {
            position: relative;
          }

          .mfg-desktop-line {
            position: absolute;
            top: 45px;
            left: 6%;
            right: 6%;
            height: 1px;
            background: #E5E7EB;
            z-index: 1;
          }

          /* Step Card */
          .mfg-step-card {
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 16px;
            padding: 26px 22px;
            position: relative;
            z-index: 2;
            height: 100%;
            display: flex;
            flex-direction: column;
            transition: all 0.25s ease;
          }

          .mfg-step-card:hover {
            transform: translateY(-4px);
            border-color: #0052FF;
            box-shadow: 0 12px 28px rgba(0, 82, 255, 0.08);
          }

          .mfg-node-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          /* Icon Box */
          .mfg-circle-node {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0052FF;
            font-size: 18px;
            transition: all 0.25s ease;
          }

          .mfg-step-card:hover .mfg-circle-node {
            background: #0052FF;
            color: #FFFFFF;
            border-color: #0052FF;
          }

          .mfg-step-number {
            font-size: 20px;
            font-weight: 800;
            color: #9CA3AF;
            letter-spacing: -0.5px;
          }

          /* Outline Badge */
          .mfg-badge-chip {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.8px;
            color: #0052FF;
            background: transparent;
            border: 1px solid rgba(0, 82, 255, 0.25);
            padding: 2px 8px;
            border-radius: 4px;
            display: inline-block;
            margin-bottom: 12px;
            width: fit-content;
          }

          .mfg-step-title {
            color: #000000;
            font-size: 18px;
            font-weight: 800;
            margin: 0 0 8px;
          }

          .mfg-step-desc {
            color: #4B5563;
            font-size: 13.5px;
            line-height: 1.55;
            margin: 0;
          }

          @media (max-width: 991px) {
            .mfg-desktop-line {
              display: none;
            }
          }
        `}
      </style>

      <section className="mfg-section">
        <div className="mfg-container">
          {/* Transparent Header with Pure Black Text */}
          <div className="mfg-header">
            <h2 className="mfg-headline">Our Production Process</h2>
            
          </div>

          {/* Steps Flow */}
          <div className="mfg-flow-wrapper">
            <div className="mfg-desktop-line" />

            <div className="row g-3 g-lg-4">
              {processSteps.map((step, index) => (
                <div className="col-12 col-sm-6 col-lg-3" key={index}>
                  <div className="mfg-step-card">
                    <div className="mfg-node-row">
                      <div className="mfg-circle-node">{step.icon}</div>
                      <span className="mfg-step-number">{step.number}</span>
                    </div>

                    <span className="mfg-badge-chip">{step.badge}</span>
                    <h3 className="mfg-step-title">{step.title}</h3>
                    <p className="mfg-step-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManufacturingProcess;